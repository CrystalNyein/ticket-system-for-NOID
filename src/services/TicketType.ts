import ConflictError from '../common/errors/types/ConflictError';
import NotFoundError from '../common/errors/types/NotFoundError';
import { buildFilters } from '../common/helpers/buildFilters';
import messages from '../common/messages';
import { TicketTypeCreateAttributes } from '../interfaces/TicketType';
import { TicketTypeModel } from '../models';
import { ticketTypeRepository } from '../repositories/TicketType';

class TicketTypeService {
  // Helper function to check for conflicts in ticket type name and code
  async checkTicketTypeConflicts(ticketTypeData: Partial<TicketTypeModel>, isUpdate: boolean = false) {
    // Check if a ticketType with the same name already exists
    const existingTicketTypeByName = await ticketTypeRepository.findAll({
      where: { name: ticketTypeData.name },
    });
    if (existingTicketTypeByName.length > 0 && (!isUpdate || existingTicketTypeByName[0].id !== ticketTypeData.id)) {
      throw new ConflictError(messages.model.conflict('Ticket Type', 'name'));
    }

    // Check if a ticketType with the same type code already exists
    const existingTicketTypeByCode = await ticketTypeRepository.findAll({
      where: { type_code: ticketTypeData.typeCode },
    });
    if (existingTicketTypeByCode.length > 0 && (!isUpdate || existingTicketTypeByCode[0].id !== ticketTypeData.id)) {
      throw new ConflictError(messages.model.conflict('Ticket Type', 'code'));
    }
  }

  // Create a new ticketType
  async createTicketType(ticketTypeData: TicketTypeCreateAttributes) {
    // Check for conflicts (name and code) before creating the ticket type
    await this.checkTicketTypeConflicts(ticketTypeData);
    // Create the ticketType using the repository
    const newTicketType = await ticketTypeRepository.create(ticketTypeData);
    return newTicketType;
  }

  // Get all ticketTypes
  async getAllTicketTypes(query: any) {
    const filters = buildFilters(query, TicketTypeModel.filterableColumns, TicketTypeModel.searchableColumns);

    // Fetch ticketTypes with generated filters
    const ticketTypes = await ticketTypeRepository.findAll(filters);
    if (!ticketTypes || ticketTypes.length === 0) {
      throw new NotFoundError(messages.model.notFound('Ticket Types'));
    }
    return ticketTypes;
  }

  // Get ticketType by ID
  async getTicketTypeById(id: string) {
    const ticketType = await ticketTypeRepository.findById(id);
    if (!ticketType) {
      throw new NotFoundError(messages.model.notFound('Ticket Type'));
    }
    return ticketType;
  }

  // Update an existing ticketType by ID
  async updateTicketType(id: string, updatedData: Partial<TicketTypeModel>) {
    const ticketType = await ticketTypeRepository.findById(id);
    if (!ticketType) {
      throw new NotFoundError(messages.model.notFound('Ticket Type'));
    }

    // Check for conflicts (name and code) before creating the ticket type
    await this.checkTicketTypeConflicts(updatedData, true);

    const [updatedRows] = await ticketTypeRepository.update(id, updatedData);
    if (updatedRows === 0) {
      throw new NotFoundError(messages.model.notFound('Ticket Type'));
    }
    // Fetch the updated ticketType to return the full entity
    const updatedTicketType = await this.getTicketTypeById(id);
    return updatedTicketType;
  }

  // Delete an ticketType by ID
  async deleteTicketType(id: string) {
    const ticketType = await ticketTypeRepository.findById(id);
    if (!ticketType) {
      throw new NotFoundError(messages.model.notFound('Ticket Type'));
    }
    await ticketTypeRepository.delete(id);
    return { id };
  }
}
export const ticketTypeService = new TicketTypeService();
