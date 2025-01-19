import ConflictError from '../common/errors/types/ConflictError';
import NotFoundError from '../common/errors/types/NotFoundError';
import { buildFilters } from '../common/helpers/buildFilters';
import messages from '../common/messages';
import { TicketTemplateCreateAttributes } from '../interfaces/TicketTemplate';
import { TicketTemplateModel } from '../models';
import { ticketTemplateRepository } from '../repositories/TicketTemplate';

class TicketTemplateService {
  // Create a new ticketTemplate
  async createTicketTemplate(ticketTemplateData: TicketTemplateCreateAttributes) {
    // Create the ticketTemplate using the repository
    const newTicketTemplate = await ticketTemplateRepository.create(ticketTemplateData);
    return newTicketTemplate;
  }

  // Get all ticketTemplates
  async getAllTicketTemplates(query: any) {
    const filters = buildFilters(query, TicketTemplateModel.filterableColumns, TicketTemplateModel.searchableColumns);

    // Fetch ticketTemplates with generated filters
    const ticketTemplates = await ticketTemplateRepository.findAll(filters);
    if (!ticketTemplates || ticketTemplates.length === 0) {
      throw new NotFoundError(messages.model.notFound('Ticket Types'));
    }
    return ticketTemplates;
  }

  // Get ticketTemplate by ID
  async getTicketTemplateById(id: string) {
    const ticketTemplate = await ticketTemplateRepository.findById(id);
    if (!ticketTemplate) {
      throw new NotFoundError(messages.model.notFound('Ticket Type'));
    }
    return ticketTemplate;
  }

  // Update an existing ticketTemplate by ID
  async updateTicketTemplate(id: string, updatedData: Partial<TicketTemplateModel>) {
    const ticketTemplate = await ticketTemplateRepository.findById(id);
    if (!ticketTemplate) {
      throw new NotFoundError(messages.model.notFound('Ticket Template'));
    }

    const [updatedRows] = await ticketTemplateRepository.update(id, updatedData);
    if (updatedRows === 0) {
      throw new NotFoundError(messages.model.notFound('Ticket Template'));
    }
    // Fetch the updated ticketTemplate to return the full entity
    const updatedTicketTemplate = await this.getTicketTemplateById(id);
    return updatedTicketTemplate;
  }

  // Delete an ticketTemplate by ID
  async deleteTicketTemplate(id: string) {
    const ticketTemplate = await ticketTemplateRepository.findById(id);
    if (!ticketTemplate) {
      throw new NotFoundError(messages.model.notFound('Ticket Template'));
    }
    await ticketTemplateRepository.delete(id);
    return { id };
  }
  // Check an ticketTemplate
  async checkTicketTemplate(eventId: string, ticketTypeCode: string) {
    const ticketTemplate = await ticketTemplateRepository.checkTemplate(eventId, ticketTypeCode);
    return ticketTemplate;
  }
}
export const ticketTemplateService = new TicketTemplateService();
