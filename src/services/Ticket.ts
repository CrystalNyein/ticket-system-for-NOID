import NotFoundError from '../common/errors/types/NotFoundError';
import { buildFilters } from '../common/helpers/buildFilters';
import messages from '../common/messages';
import { TicketCreateAttributes } from '../interfaces/Ticket';
import { TicketModel } from '../models';
import { eventRepository } from '../repositories/Event';
import { ticketRepository } from '../repositories/Ticket';
import { generateQRCode } from '../utils/qrUtils';
import { generateRandomTicketCode } from '../utils/ticketUtils';
import { buyerSerivce } from './Buyer';
import { ticketTemplateService } from './TicketTemplate';
import xlsx from 'xlsx';
import fs from 'fs';
import { TTicketSaleRows } from '../common/types';
import dayjs from 'dayjs';
import { ticketScanRepository } from '../repositories/TicketScan';
import { buyerRepository } from '../repositories/Buyer';

class TicketService {
  // Method to generate a single ticket (prepare ticket data)
  async generateTicket(eventId: string, ticketTypeCode: string, ticketTemplatePath: string): Promise<TicketCreateAttributes> {
    try {
      // Find the event by its ID
      const event = await eventRepository.findById(eventId);
      if (!event) {
        throw new NotFoundError(messages.model.notFound('Event'));
      }

      // Generate unique ticket code
      const ticketCode = await this.generateUniqueTicketCode(eventId, ticketTypeCode); // Generate unique ticket code

      // Create the ticket data for this ticket
      const newTicket: TicketCreateAttributes = {
        eventId: eventId,
        ticketCode: ticketCode,
        ticketTypeCode: ticketTypeCode,
        status: 'available',
        buyerId: null,
        qrCodePath: null,
      };

      // Generate QR Code
      const qrCodeFilePath = await generateQRCode(event.name, eventId, ticketTypeCode, ticketCode, ticketTemplatePath);
      newTicket.qrCodePath = qrCodeFilePath;

      return newTicket;
    } catch (error) {
      throw new Error(messages.ticket.error.generateTicket((error as Error).message));
    }
  }

  // Method to create and save the ticket in the database
  async createTicket(ticketData: TicketCreateAttributes) {
    return await ticketRepository.create(ticketData);
  }

  // Get all tickets
  async getAllTickets(query: any) {
    const filters = buildFilters(query, TicketModel.filterableColumns, TicketModel.searchableColumns);

    // Fetch tickets with generated filters
    const tickets = await ticketRepository.findAll(filters);
    if (!tickets || tickets.length === 0) {
      throw new NotFoundError(messages.model.notFound('Tickets'));
    }
    return tickets;
  }

  // Get ticket by eventId, ticketTypeCode, code
  async getTicketByUniqueConstraint(eventId: string, ticketTypeCode: string, ticketCode: string) {
    const ticket = await ticketRepository.findByCode(eventId, ticketTypeCode, ticketCode);
    return ticket;
  }

  // Get ticket by ID
  async getTicketById(id: string) {
    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      throw new NotFoundError(messages.model.notFound('Ticket'));
    }
    return ticket;
  }

  // Get ticket details by QR
  async getTicketByQR(qrData: string) {
    try {
      // Step 1: Parse the QR Code data
      const [eventId, ticketTypeCode, ticketCode] = qrData.split(':');
      if (!eventId || !ticketTypeCode || !ticketCode) {
        throw new Error(messages.ticket.error.invalidQR);
      }

      // Step 2: Find the ticket by ticketCode and validate
      const ticket = await ticketRepository.findByCode(eventId, ticketTypeCode, ticketCode);
      if (!ticket) {
        throw new NotFoundError(messages.model.notFound('Ticket'));
      }

      // Step 3: Validate event dates
      const event = await eventRepository.findById(eventId);
      if (!event) {
        throw new NotFoundError(messages.model.notFound('Event'));
      }

      const currentDate = dayjs();
      const eventStartDate = dayjs(event.startDate);
      const eventEndDate = dayjs(event.endDate);

      if (currentDate.isBefore(eventStartDate) || currentDate.isAfter(eventEndDate)) {
        throw new Error(messages.ticket.error.eventNotActive);
      }

      // Step 4: Check for existing scan record for today
      const ticketScan = await ticketScanRepository.findByTicketIdAndDate(ticket.id, currentDate.format('YYYY-MM-DD'));

      if (!ticketScan) {
        throw new Error(messages.ticket.error.noTicketScanData);
      }

      // Step 6: Fetch buyer data if available
      const buyer = await buyerRepository.findById(ticket.buyerId);

      return {
        ticket,
        buyer,
        ticketScan,
      };
    } catch (error) {
      throw new Error(messages.ticket.error.scan((error as Error).message));
    }
  }

  // Update an existing ticket by ID
  async updateTicket(id: string, updatedData: Partial<TicketModel>) {
    // Only allow status and buyer_id to be updated
    const allowedFields = ['status', 'buyerId'];
    const invalidFields = Object.keys(updatedData).filter((key) => !allowedFields.includes(key));

    if (invalidFields.length > 0) {
      throw new Error(messages.ticket.error.invalidFieldsEdit(invalidFields.join(', ')));
    }

    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      throw new NotFoundError(messages.model.notFound('Ticket'));
    }
    const [updatedRows] = await ticketRepository.update(id, updatedData);
    if (updatedRows === 0) {
      throw new NotFoundError(messages.model.notFound('Ticket'));
    }
    // Fetch the updated ticket to return the full entity
    const updatedTicket = await this.getTicketById(id);
    return updatedTicket;
  }

  // Delete an ticket by ID
  async deleteTicket(id: string) {
    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      throw new NotFoundError(messages.model.notFound('Ticket'));
    }
    await ticketRepository.delete(id);
    return { id };
  }

  // Method to generate and save bulk tickets
  async generateBulkTickets(eventId: string, ticketTypeCode: string, totalCount: number, ticketTemplate: string) {
    try {
      const ticketTemplatePath = await ticketTemplateService.getTicketTemplateById(ticketTemplate);

      // Prepare an array to collect errors for failed tickets
      const failedTickets: any[] = [];
      // Prepare an array to hold the ticket data
      const createdTickets: TicketModel[] = [];
      for (let i = 0; i < totalCount; i++) {
        try {
          const ticket = await this.generateTicket(eventId, ticketTypeCode, ticketTemplatePath.path);
          const createdTicket = await this.createTicket(ticket);
          createdTickets.push(createdTicket);
        } catch (error) {
          // Log the error and continue with the next ticket
          failedTickets.push({ index: i, error });
          console.error(`Error creating ticket ${i}:`, (error as Error).message);
        }
      }
      return { createdTickets, failedTickets };
    } catch (error) {
      throw new Error(messages.ticket.error.generateBulkTickets((error as Error).message));
    }
  }

  // Function to generate a unique ticket code
  generateUniqueTicketCode = async (eventId: string, ticketTypeCode: string): Promise<string> => {
    let uniqueTicketCode = '';
    let isUnique = false;
    while (!isUnique) {
      uniqueTicketCode = generateRandomTicketCode();
      isUnique = await ticketRepository.isTicketCodeUnique(eventId, ticketTypeCode, uniqueTicketCode);
    }
    return uniqueTicketCode;
  };

  // Process Excel File
  processExcelFile = async (filePath: string, eventId: string) => {
    // Find the event by its ID
    const event = await eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundError(messages.model.notFound('Event'));
    }

    // Load the Excel file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheet = workbook.Sheets[sheetName];

    // Convert the sheet to JSON
    const data: TTicketSaleRows[] = xlsx.utils.sheet_to_json(sheet);

    const updatedTickets: TicketModel[] = [];
    const failedTickets: any[] = [];
    // Process each row
    for (const row of data) {
      const buyerName = row['Buyer Name'];
      const buyerPhone = row['Buyer Phone'];
      const buyerEmail = row['Buyer Email'];
      const ticketCode = row['Ticket Code'];

      const tickets = await this.updateTicketSales(eventId, ticketCode, buyerName, buyerPhone, buyerEmail);

      updatedTickets.push(...tickets.updatedTickets);
      failedTickets.push(...tickets.failedTickets);
    }
    // Delete the file after processing
    fs.unlinkSync(filePath);
    return { updatedTickets, failedTickets };
  };

  // Door Sale Tickets
  updateTicketSales = async (eventId: string, ticketCode: string, buyerName: string, buyerPhone: string, buyerEmail: string) => {
    // Find the event by its ID
    const event = await eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundError(messages.model.notFound('Event'));
    }
    const ticketCodes = ticketCode.split(',');
    const updatedTickets: TicketModel[] = [];
    // Prepare an array to collect errors for failed tickets
    const failedTickets: any[] = [];

    // Check or create buyer
    const buyer = await buyerSerivce.findOrCreateBuyer(buyerName, buyerPhone, buyerEmail);

    // Loop ticketCodes to update each ticket status
    for (const code of ticketCodes) {
      const ticketTypeCode = code.trim().slice(0, -5); // Extract everything except the last 5 characters
      const ticketCode = code.trim().slice(-5); // Extract the last 5 characters

      // Update ticket status and assign buyer
      const ticket = await this.getTicketByUniqueConstraint(eventId, ticketTypeCode, ticketCode);
      if (!ticket) {
        failedTickets.push(ticketCode);
      } else {
        const updatedTicket = await this.updateTicket(ticket.id, {
          status: 'sold',
          buyerId: buyer.id,
        });
        updatedTickets.push(updatedTicket);
      }
    }
    return { updatedTickets, failedTickets };
  };

  // Get Ticket Statistics By Date
  getTicketStatsByDate = async (startDate: Date, endDate: Date) => {
    const ticketCount = await ticketRepository.getTicketCountByPeriod(startDate, endDate);
    const soldTicketCount = await ticketRepository.getTicketCountByPeriod(startDate, endDate, true);
    return { ticketCount, soldTicketCount };
  };
  // Get Ticket Statistics By Event
  getTicketStatsByEvent = async (eventId: string) => {
    const ticketCount = await ticketRepository.getTicketCount(eventId);
    const soldTicketCount = await ticketRepository.getSoldTicketCount(eventId);
    return { ticketCount, soldTicketCount };
  };
  // Get Ticket Statistics By TicketTypeCode and Event
  getTicketSummary = async () => {
    const tickets = await ticketRepository.getTicketCountsByTicketCodeAndEvent();
    return tickets;
  };
  // Delete Tickets by Event and/or TicketTypeCode
  deleteTicketsByEventAndType = async (eventId: string, ticketTypeCode: string) => {
    const result = await ticketRepository.deleteTicketsByEventAndType(eventId, ticketTypeCode);
    return result;
  };
}
export const ticketService = new TicketService();
