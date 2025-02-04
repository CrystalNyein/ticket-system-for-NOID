import { Request, Response } from 'express';
import { ticketRepository } from '../repositories/Ticket';
import { ticketService } from '../services/Ticket';
import ResponseWrapper from '../utils/ResponseWrapper';
import messages from '../common/messages';
import { eventRepository } from '../repositories/Event';
import NotFoundError from '../common/errors/types/NotFoundError';

// Create a new ticket (generate and save it)
export const createTicket = async (req: Request, res: Response): Promise<any> => {
  try {
    const { eventId, ticketTypeCode, ticketTemplatePath } = req.body;
    const ticket = await ticketService.generateTicket(eventId, ticketTypeCode, ticketTemplatePath);
    const createdTicket = await ticketService.createTicket(ticket);
    return ResponseWrapper.success(res, ticket, messages.model.created('Ticket'), 201);
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Get all tickets with optional filtering
export const getAllTickets = async (req: Request, res: Response): Promise<any> => {
  try {
    const tickets = await ticketService.getAllTickets(req.query);
    return ResponseWrapper.success(res, tickets, messages.model.retrieved('Tickets'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Get ticket by ID
export const getTicketById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const ticket = await ticketService.getTicketById(id);
    return ResponseWrapper.success(res, ticket, messages.model.retrieved('Ticket'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Update an ticket by ID
export const updateTicket = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const updatedTicket = await ticketService.updateTicket(id, req.body);
    return ResponseWrapper.success(res, updatedTicket, messages.model.updated('Ticket'));
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Delete an ticket by ID
export const deleteTicket = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await ticketService.deleteTicket(id);
    return ResponseWrapper.success(res, result, messages.model.deleted('Ticket'), 204);
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Generate bulk tickets
export const generateBulkTickets = async (req: Request, res: Response): Promise<any> => {
  try {
    const { eventId, ticketTypeCode, totalCount, ticketTemplate } = req.body;
    // Fetch event details to check isRandom
    const event = await eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundError(messages.model.notFound('Event'));
    }

    let createdTickets, failedTickets;
    if (event.isRandom) {
      // Call the service to generate bulk tickets
      ({ createdTickets, failedTickets } = await ticketService.generateBulkTickets(eventId, ticketTypeCode, totalCount, ticketTemplate));
    } else {
      // Call the service to generate bulk tickets
      ({ createdTickets, failedTickets } = await ticketService.generateBulkTicketsBySequence(eventId, ticketTypeCode, totalCount, ticketTemplate));
    }
    return ResponseWrapper.success(
      res,
      { createdTickets, failedTickets },
      failedTickets.length > 0 ? messages.ticket.warning.partialSuccess : messages.model.created('Tickets'),
      failedTickets.length > 0 ? 206 : 201,
    );
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

export const uploadAndProcessExcel = async (req: Request, res: Response): Promise<any> => {
  try {
    const eventId = req.body.eventId;
    const { file } = req; // Path of the uploaded file
    if (!file) {
      return ResponseWrapper.error(res, messages.error.noFileUpload, 400);
    }
    if (!eventId) {
      return ResponseWrapper.error(res, messages.error.missingMetadata, 400);
    }
    // Fetch event details to check isRandom
    const event = await eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundError(messages.model.notFound('Event'));
    }
    let updatedTickets, failedTickets;
    if (event.isRandom) {
      ({ updatedTickets, failedTickets } = await ticketService.processExcelFile(file.path, eventId));
    } else {
      ({ updatedTickets, failedTickets } = await ticketService.processExcelFileBySequence(file.path, eventId));
    }
    return ResponseWrapper.success(
      res,
      { updatedTickets, failedTickets },
      failedTickets.length > 0 ? messages.ticket.warning.partialImportSuccess : messages.model.updated('Tickets'),
      failedTickets.length > 0 ? 206 : 201,
    );
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

export const updateDoorSaleTickets = async (req: Request, res: Response): Promise<any> => {
  try {
    const { eventId, buyerName, buyerPhone, buyerEmail } = req.body;
    // Fetch event details to check isRandom
    const event = await eventRepository.findById(eventId);
    if (!event) {
      throw new NotFoundError(messages.model.notFound('Event'));
    }
    let updatedTickets, failedTickets;
    if (event.isRandom) {
      const { ticketCode } = req.body;
      ({ updatedTickets, failedTickets } = await ticketService.updateTicketSales(eventId, ticketCode, buyerName, buyerPhone, buyerEmail));
    } else {
      const { ticketTypeCode, ticketFrom, ticketTo } = req.body;
      ({ updatedTickets, failedTickets } = await ticketService.updateTicketSalesBySequence(eventId, ticketTypeCode, ticketFrom, ticketTo, buyerName, buyerPhone, buyerEmail));
    }
    return ResponseWrapper.success(
      res,
      { updatedTickets, failedTickets },
      failedTickets.length > 0 ? messages.ticket.warning.partialImportSuccess : messages.model.updated('Tickets'),
      failedTickets.length > 0 ? 206 : 201,
    );
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

export const getTicketByQR = async (req: Request, res: Response): Promise<any> => {
  try {
    const { qrData } = req.body; // Expecting QR code data in request body
    const result = await ticketService.getTicketByQR(qrData);
    return ResponseWrapper.success(res, result, messages.ticket.success.scanned);
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};
// Get Ticket Stats by Date
export const getTicketStatsByDate = async (req: Request, res: Response): Promise<any> => {
  try {
    const { startDate, endDate } = req.body;
    const result = await ticketService.getTicketStatsByDate(startDate, endDate);
    return ResponseWrapper.success(res, result, messages.model.retrieved('Ticket Stats'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Get Ticket Stats by Event
export const getTicketStatsByEvent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { eventId } = req.body;
    const result = await ticketService.getTicketStatsByEvent(eventId);
    return ResponseWrapper.success(res, result, messages.model.retrieved('Ticket Stats'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Get Ticket Statistics by TicketTypeCode and Event
export const getTicketSummary = async (req: Request, res: Response): Promise<any> => {
  try {
    const tickets = await ticketService.getTicketSummary();
    return ResponseWrapper.success(res, tickets, messages.model.retrieved('Ticket Summary'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Delete Tickets by Event and/or Ticket Type
export const deleteTicketsByEventAndType = async (req: Request, res: Response): Promise<any> => {
  try {
    const { eventId, ticketTypeCode } = req.query;
    const result = await ticketService.deleteTicketsByEventAndType(eventId as string, ticketTypeCode as string);
    return ResponseWrapper.success(res, result, messages.model.deleted(result + ' ticket(s)'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};
