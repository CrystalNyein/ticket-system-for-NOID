import { Request, Response } from 'express';
import { ticketTypeRepository } from '../repositories/TicketType';
import ResponseWrapper from '../utils/ResponseWrapper';

// Create a new ticketType
export const createTicketType = async (req: Request, res: Response): Promise<any> => {
  try {
    const ticketType = await ticketTypeRepository.create(req.body);
    return ResponseWrapper.success(res, ticketType, 'TicketType created successfully', 201);
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Get all ticketTypes
export const getAllTicketTypes = async (req: Request, res: Response): Promise<any> => {
  try {
    const ticketTypes = await ticketTypeRepository.findAll();
    return ResponseWrapper.success(res, ticketTypes, 'TicketTypes retrieved successfully');
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Get ticketType by ID
export const getTicketTypeById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const ticketType = await ticketTypeRepository.findById(id);
    if (!ticketType) {
      return ResponseWrapper.error(res, 'TicketType not found', 404);
    }
    return ResponseWrapper.success(res, ticketType, 'TicketType retrieved successfully');
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Update an ticketType
export const updateTicketType = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const [updatedRows] = await ticketTypeRepository.update(id, req.body);
    if (updatedRows === 0) {
      return ResponseWrapper.error(res, 'TicketType not found', 404);
    }
    const updatedTicketType = await ticketTypeRepository.findById(id);
    return ResponseWrapper.success(res, updatedTicketType, 'TicketType updated successfully');
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Delete an ticketType
export const deleteTicketType = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deleted = await ticketTypeRepository.delete(id);
    if (!deleted) {
      return ResponseWrapper.error(res, 'TicketType not found', 404);
    }
    return ResponseWrapper.success(res, null, 'TicketType deleted successfully', 204);
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Search ticketTypes by name or code
export const searchTicketTypes = async (req: Request, res: Response): Promise<any> => {
  try {
    const { search } = req.query;
    if (!search) {
      return ResponseWrapper.error(res, 'Search query is required', 400);
    }
    const ticketTypes = await ticketTypeRepository.search(search as string);
    return ResponseWrapper.success(res, ticketTypes, 'TicketTypes searched succesfully.');
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};
