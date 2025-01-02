import { Request, Response } from 'express';
import { ticketRepository } from '../repositories/Ticket';
import { ticketServices } from '../services/Ticket';
import ResponseWrapper from '../utils/ResponseWrapper';

// Create a new ticket
export const createTicket = async (req: Request, res: Response): Promise<any> => {
  try {
    const ticket = await ticketRepository.create(req.body);
    return ResponseWrapper.success(res, ticket, 'Ticket created successfully', 201);
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Get all tickets
export const getAllTickets = async (req: Request, res: Response): Promise<any> => {
  try {
    const tickets = await ticketRepository.findAll();
    return ResponseWrapper.success(res, tickets, 'Tickets retrieved successfully');
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Get ticket by ID
export const getTicketById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const ticket = await ticketRepository.findById(id);
    if (!ticket) {
      return ResponseWrapper.error(res, 'Ticket not found', 404);
    }
    return ResponseWrapper.success(res, ticket, 'Ticket retrieved successfully');
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Update an ticket
export const updateTicket = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const [updatedRows] = await ticketRepository.update(id, req.body);
    if (updatedRows === 0) {
      return ResponseWrapper.error(res, 'Ticket not found', 404);
    }
    const updatedTicket = await ticketRepository.findById(id);
    return ResponseWrapper.success(res, updatedTicket, 'Ticket updated successfully');
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Delete an ticket
export const deleteTicket = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deleted = await ticketRepository.delete(id);
    if (!deleted) {
      return ResponseWrapper.error(res, 'Ticket not found', 404);
    }
    return ResponseWrapper.success(res, null, 'Ticket deleted successfully', 204);
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Generate bulk tickets
export const generateBulkTickets = async (req: Request, res: Response): Promise<any> => {
  const { eventId, ticketTypeCode, totalCount, ticketTemplatePath } = req.body;
  try {
    // Call the service to generate bulk tickets
    const tickets = await ticketServices.generateBulkTickets(eventId, ticketTypeCode, totalCount, ticketTemplatePath);
    return ResponseWrapper.success(res, tickets, 'Tickets generated successfully', 201);
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};
