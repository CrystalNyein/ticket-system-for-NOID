import { EventCreateAttributes } from '../interfaces/Event';
import { EventModel } from '../models';
import { Op } from 'sequelize';

class EventRepository {
  async create(eventData: Partial<EventModel>) {
    return await EventModel.create(eventData as EventCreateAttributes);
  }
  async findAll() {
    return await EventModel.findAll();
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
  async search(search: string) {
    return await EventModel.findAll({ where: { [Op.or]: [{ name: { [Op.like]: `%${search}%` } }] } });
  }
}
export const eventRepository = new EventRepository();
