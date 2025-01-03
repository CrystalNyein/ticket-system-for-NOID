import { Request, Response } from 'express';
import { eventRepository } from '../repositories/Event';
import { eventSerializer } from '../serializers/Event';
import ResponseWrapper from '../utils/ResponseWrapper';
import { eventService } from '../services/Event';
import messages from '../common/messages';

// Create a new event
export const createEvent = async (req: Request, res: Response): Promise<any> => {
  try {
    const event = await eventService.createEvent(req.body);
    return ResponseWrapper.success(res, eventSerializer.serialize(event), messages.model.created('Event'), 201);
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Get all events
export const getAllEvents = async (req: Request, res: Response): Promise<any> => {
  try {
    const events = await eventService.getAllEvents(req.query);
    return ResponseWrapper.success(res, eventSerializer.serializeMany(events), messages.model.retrieved('Events'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Get event by ID
export const getEventById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const event = await eventService.getEventById(id);
    return ResponseWrapper.success(res, eventSerializer.serialize(event), messages.model.retrieved('Event'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Update an event
export const updateEvent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const updatedEvent = await eventService.updateEvent(id, req.body);
    return ResponseWrapper.success(res, eventSerializer.serialize(updatedEvent), 'Event updated successfully');
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Delete an event
export const deleteEvent = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await eventService.deleteEvent(id);
    return ResponseWrapper.success(res, result, messages.model.deleted('Event'), 204);
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};
