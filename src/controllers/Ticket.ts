import { Request, Response } from 'express';
import { ticketRepository } from '../repositories/Ticket';
import { ticketService } from '../services/Ticket';
import ResponseWrapper from '../utils/ResponseWrapper';
import messages from '../common/messages';

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
    const { eventId, ticketTypeCode, totalCount, ticketTemplatePath } = req.body;
    // Call the service to generate bulk tickets
    const tickets = await ticketService.generateBulkTickets(eventId, ticketTypeCode, totalCount, ticketTemplatePath);
    return ResponseWrapper.success(res, tickets, messages.model.created('Tickets'), 201);
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};
