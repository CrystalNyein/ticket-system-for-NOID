import { Request, Response } from 'express';
import { eventRepository } from '../repositories/Event';
import { eventSerializer } from '../serializers/Event';
import ResponseWrapper from '../utils/ResponseWrapper';

// Create a new event
export const createEvent = async (req: Request, res: Response): Promise<any> => {
  try {
    const event = await eventRepository.create(req.body);
    return ResponseWrapper.success(res, eventSerializer.serialize(event), 'Event created successfully', 201);
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Get all events
export const getAllEvents = async (req: Request, res: Response): Promise<any> => {
  try {
    const events = await eventRepository.findAll();
    return ResponseWrapper.success(res, eventSerializer.serializeMany(events), 'Events retrieved successfully');
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Get event by ID
export const getEventById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const event = await eventRepository.findById(id);
    if (!event) {
      return ResponseWrapper.error(res, 'Event not found', 404);
    }
    return ResponseWrapper.success(res, eventSerializer.serialize(event), 'Event retrieved successfully');
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Update an event
export const updateEvent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const [updatedRows] = await eventRepository.update(id, req.body);
    if (updatedRows === 0) {
      return ResponseWrapper.error(res, 'Event not found', 404);
    }
    const updatedEvent = await eventRepository.findById(id);
    return ResponseWrapper.success(res, eventSerializer.serialize(updatedEvent!), 'Event updated successfully');
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Delete an event
export const deleteEvent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const deleted = await eventRepository.delete(id);
    if (!deleted) {
      return ResponseWrapper.error(res, 'Event not found', 404);
    }
    return ResponseWrapper.success(res, null, 'Event deleted successfully', 204);
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Search events by name or code
export const searchEvents = async (req: Request, res: Response): Promise<any> => {
  try {
    const { search } = req.query;
    if (!search) {
      return ResponseWrapper.error(res, 'Search query is required', 400);
    }
    const events = await eventRepository.search(search as string);
    return ResponseWrapper.success(res, eventSerializer.serializeMany(events), 'Events searched succesfully.');
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};
