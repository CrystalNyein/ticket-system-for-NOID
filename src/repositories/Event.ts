import { EventCreateAttributes } from '../interfaces/Event';
import { EventModel } from '../models';

class EventRepository {
  async create(eventData: EventCreateAttributes) {
    return await EventModel.create(eventData);
  }
  // Find all events with optional filters, pagination, and sorting
  async findAll(filters: any) {
    return await EventModel.findAll(filters);
  }
  async findById(id: string) {
    return await EventModel.findByPk(id);
  }
  async update(id: string, updatedData: Partial<EventModel>) {
    return await EventModel.update(updatedData, { where: { id } });
  }
  async delete(id: string) {
    return await EventModel.destroy({ where: { id } });
  }
}
export const eventRepository = new EventRepository();
