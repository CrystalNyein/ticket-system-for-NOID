import { TicketTemplateCreateAttributes } from '../interfaces/TicketTemplate';
import { EventModel, TicketTemplateModel } from '../models';

class TicketTemplateRepository {
  async create(ticketTemplateData: TicketTemplateCreateAttributes) {
    return await TicketTemplateModel.create(ticketTemplateData);
  }
  // Find all ticketTemplates with optional filters, pagination, and sorting
  async findAll(filters: any) {
    return await TicketTemplateModel.findAll({
      ...filters,
      include: [
        {
          model: EventModel,
          as: 'event',
        },
      ],
    });
  }
  async findById(id: string) {
    return await TicketTemplateModel.findByPk(id);
  }
  async update(id: string, updatedData: Partial<TicketTemplateModel>) {
    return await TicketTemplateModel.update(updatedData, { where: { id } });
  }
  async delete(id: string) {
    const template = await this.findById(id);
    if (!template) throw new Error('Template not found');
    return await template.destroy();
  }
  async checkTemplate(eventId: string, ticketTypeCode: string) {
    return await TicketTemplateModel.findOne({ where: { eventId, ticketTypeCode } });
  }
}
export const ticketTemplateRepository = new TicketTemplateRepository();
