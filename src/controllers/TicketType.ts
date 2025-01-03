import { Request, Response } from 'express';
import ResponseWrapper from '../utils/ResponseWrapper';
import { ticketTypeService } from '../services/TicketType';
import messages from '../common/messages';

// Create a new ticketType
export const createTicketType = async (req: Request, res: Response): Promise<any> => {
  try {
    const ticketType = await ticketTypeService.createTicketType(req.body);
    return ResponseWrapper.success(res, ticketType, messages.model.created('TicketType'), 201);
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Get all ticketTypes
export const getAllTicketTypes = async (req: Request, res: Response): Promise<any> => {
  try {
    const ticketTypes = await ticketTypeService.getAllTicketTypes(req.query);
    return ResponseWrapper.success(res, ticketTypes, messages.model.retrieved('TicketTypes'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Get ticketType by ID
export const getTicketTypeById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const ticketType = await ticketTypeService.getTicketTypeById(id);
    return ResponseWrapper.success(res, ticketType, messages.model.retrieved('TicketType'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Update an ticketType
export const updateTicketType = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const updatedTicketType = await ticketTypeService.updateTicketType(id, req.body);
    return ResponseWrapper.success(res, updatedTicketType, 'TicketType updated successfully');
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Delete an ticketType
export const deleteTicketType = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await ticketTypeService.deleteTicketType(id);
    return ResponseWrapper.success(res, result, messages.model.deleted('TicketType'), 204);
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};
