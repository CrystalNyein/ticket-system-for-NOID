import { Request, Response } from 'express';
import ResponseWrapper from '../utils/ResponseWrapper';
import { ticketTemplateService } from '../services/TicketTemplate';
import messages from '../common/messages';
import { TicketTemplateCreateAttributes } from '../interfaces/TicketTemplate';
import path from 'path';

// Create a new ticketTemplate
export const createTicketTemplate = async (req: Request, res: Response): Promise<any> => {
  try {
    const { file } = req;
    const { eventId, ticketTypeCode } = req.body;
    if (!file) {
      return ResponseWrapper.error(res, messages.error.noFileUpload, 400);
    }
    if (!eventId || !ticketTypeCode) {
      return ResponseWrapper.error(res, messages.error.missingMetadata, 400);
    }

    // Prepare Ticket Template data
    const ticketTemplateData: TicketTemplateCreateAttributes = {
      eventId,
      ticketTypeCode,
      filename: file.filename,
      path: file.path,
    };

    const ticketTemplate = await ticketTemplateService.createTicketTemplate(ticketTemplateData);
    return ResponseWrapper.success(res, ticketTemplate, messages.model.created('Template'), 201);
  } catch (error) {
    return ResponseWrapper.error(res, error, 400);
  }
};

// Get all ticketTemplates
export const getAllTicketTemplates = async (req: Request, res: Response): Promise<any> => {
  try {
    const ticketTemplates = await ticketTemplateService.getAllTicketTemplates(req.query);
    return ResponseWrapper.success(res, ticketTemplates, messages.model.retrieved('TicketTemplates'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Get ticketTemplate by ID
export const getTicketTemplateById = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const ticketTemplate = await ticketTemplateService.getTicketTemplateById(id);
    return ResponseWrapper.success(res, ticketTemplate, messages.model.retrieved('TicketTemplate'));
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Delete an ticketTemplate
export const deleteTicketTemplate = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const result = await ticketTemplateService.deleteTicketTemplate(id);
    return ResponseWrapper.success(res, result, messages.model.deleted('TicketTemplate'), 204);
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};

// Check template
export const checkTicketTemplate = async (req: Request, res: Response): Promise<any> => {
  try {
    const { eventId, ticketTypeCode } = req.body;
    const template = await ticketTemplateService.checkTicketTemplate(eventId as string, ticketTypeCode as string);
    if (template) {
      return ResponseWrapper.success(res, { templateExists: true, template: template }, messages.template.found);
    } else {
      return ResponseWrapper.success(res, { templateExists: false }, messages.template.notFound);
    }
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};
