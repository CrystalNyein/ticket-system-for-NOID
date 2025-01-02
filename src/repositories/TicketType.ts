import { TicketTypeCreateAttributes } from '../interfaces/TicketType';
import { TicketTypeModel } from '../models';
import { Op } from 'sequelize';

class TicketTypeRepository {
  async create(ticketTypeData: Partial<TicketTypeModel>) {
    return await TicketTypeModel.create(ticketTypeData as TicketTypeCreateAttributes);
  }
  async findAll() {
    return await TicketTypeModel.findAll();
  }
  async findById(id: string) {
    return await TicketTypeModel.findByPk(id);
  }
  async update(id: string, updatedData: Partial<TicketTypeModel>) {
    return await TicketTypeModel.update(updatedData, { where: { id } });
  }
  async delete(id: string) {
    return await TicketTypeModel.destroy({ where: { id } });
  }
  async search(search: string) {
    return await TicketTypeModel.findAll({ where: { [Op.or]: [{ name: { [Op.like]: `%${search}%` } }, { type_code: { [Op.like]: `%${search}%` } }] } });
  }
}
export const ticketTypeRepository = new TicketTypeRepository();
