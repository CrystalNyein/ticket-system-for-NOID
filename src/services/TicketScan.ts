import dayjs from 'dayjs';
import NotFoundError from '../common/errors/types/NotFoundError';
import messages from '../common/messages';
import { eventRepository } from '../repositories/Event';
import { ticketRepository } from '../repositories/Ticket';
import { ticketScanRepository } from '../repositories/TicketScan';
import { TicketScanCreateAttributes } from '../interfaces/TicketScan';
import { buyerRepository } from '../repositories/Buyer';

class TicketScanService {
  // Method to handle ticket scanning
  async scanTicket(qrData: string) {
    try {
      // Step 1: Parse the QR Code data
      const [eventId, ticketTypeCode, ticketCode] = qrData.split(':');
      if (!eventId || !ticketTypeCode || !ticketCode) {
        throw new Error(messages.ticket.error.invalidQR);
      }

      // Step 2: Find the ticket by ticketCode and validate
      const ticket = await ticketRepository.findByCode(eventId, ticketTypeCode, ticketCode);
      if (!ticket) {
        throw new NotFoundError(messages.model.notFound('Ticket'));
      }
      if (ticket.status !== 'sold') {
        throw new Error(messages.ticket.error.invalid);
      }

      // Step 3: Validate event dates
      const event = await eventRepository.findById(eventId);
      if (!event) {
        throw new NotFoundError(messages.model.notFound('Event'));
      }

      const currentDate = dayjs();
      const eventStartDate = dayjs(event.startDate);
      const eventEndDate = dayjs(event.endDate);

      if (currentDate.isBefore(eventStartDate) || currentDate.isAfter(eventEndDate)) {
        throw new Error(messages.ticket.error.eventNotActive);
      }

      // Step 4: Check for existing scan record for today
      const existingScan = await ticketScanRepository.findByTicketIdAndDate(ticket.id, currentDate.format('YYYY-MM-DD'));

      if (existingScan) {
        throw new Error(messages.ticket.error.alreadyScanned);
      }

      // Step 5: Create a new scan record
      const newScan: TicketScanCreateAttributes = {
        ticketId: ticket.id,
        scanDate: currentDate.toDate(),
      };
      await ticketScanRepository.create(newScan);

      // Step 6: Fetch buyer data if available
      const buyer = await buyerRepository.findById(ticket.buyerId);

      return {
        ticket,
        buyer,
      };
    } catch (error) {
      throw new Error(messages.ticket.error.scan((error as Error).message));
    }
  }
}
export const ticketScanService = new TicketScanService();
