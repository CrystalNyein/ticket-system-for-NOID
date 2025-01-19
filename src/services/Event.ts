import ConflictError from '../common/errors/types/ConflictError';
import NotFoundError from '../common/errors/types/NotFoundError';
import { buildFilters } from '../common/helpers/buildFilters';
import messages from '../common/messages';
import { EventCreateAttributes } from '../interfaces/Event';
import { EventModel } from '../models';
import { eventRepository } from '../repositories/Event';

class EventService {
  // Helper function to check for conflicts in event name
  async checkEventConflicts(eventData: Partial<EventModel>, isUpdate: boolean = false) {
    // Check if a event with the same name already exists
    const existingEvent = await eventRepository.findAll({
      where: { name: eventData.name },
    });
    if (existingEvent.length > 0 && (!isUpdate || existingEvent[0].id !== eventData.id)) {
      throw new ConflictError(messages.model.conflict('Event', 'name'));
    }
  }
  // Create a new event
  async createEvent(eventData: EventCreateAttributes) {
    // Check for conflicts name before creating the event
    await this.checkEventConflicts(eventData);

    // Create the event using the repository
    const newEvent = await eventRepository.create(eventData);
    return newEvent;
  }

  // Get all events
  async getAllEvents(query: any) {
    const filters = buildFilters(query, EventModel.filterableColumns, EventModel.searchableColumns);

    // Fetch events with generated filters
    const events = await eventRepository.findAll(filters);
    // if (!events || events.length === 0) {
    //   throw new NotFoundError(messages.model.notFound('Events'));
    // }
    return events;
  }

  // Get event by ID
  async getEventById(id: string) {
    const event = await eventRepository.findById(id);
    if (!event) {
      throw new NotFoundError(messages.model.notFound('Event'));
    }
    return event;
  }

  // Update an existing event by ID
  async updateEvent(id: string, updatedData: Partial<EventModel>) {
    const event = await eventRepository.findById(id);
    if (!event) {
      throw new NotFoundError(messages.model.notFound('Event'));
    }
    // Check for conflicts name before updating the event
    await this.checkEventConflicts(updatedData, true);

    const [updatedRows] = await eventRepository.update(id, updatedData);
    if (updatedRows === 0) {
      throw new NotFoundError(messages.model.notFound('Event'));
    }
    // Fetch the updated event to return the full entity
    const updatedEvent = await this.getEventById(id);
    return updatedEvent;
  }

  // Delete an event by ID
  async deleteEvent(id: string) {
    const event = await eventRepository.findById(id);
    if (!event) {
      throw new NotFoundError(messages.model.notFound('Event'));
    }
    await eventRepository.delete(id);
    return { id };
  }
}
export const eventService = new EventService();
