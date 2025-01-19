import { Request, Response } from 'express';
import { ticketScanService } from '../services/TicketScan';
import ResponseWrapper from '../utils/ResponseWrapper';
import messages from '../common/messages';

export const scanTicket = async (req: Request, res: Response): Promise<any> => {
  try {
    const { qrData } = req.body; // Expecting QR code data in request body
    const result = await ticketScanService.scanTicket(qrData);
    return ResponseWrapper.success(res, result, messages.ticket.success.scanned);
  } catch (error) {
    return ResponseWrapper.error(res, error);
  }
};
