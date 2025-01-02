import { TicketCreateAttributes } from '../interfaces/Ticket';
import { eventRepository } from '../repositories/Event';
import { ticketRepository } from '../repositories/Ticket';
import { generateQRCode } from '../utils/qrUtils';
import { generateRandomTicketCode } from '../utils/ticketUtils';

class TicketServices {
  // Method to generate and save bulk tickets
  async generateBulkTickets(eventId: string, ticketTypeCode: string, totalCount: number, ticketTemplatePath: string): Promise<any[]> {
    try {
      // Find the event by its ID
      const event = await eventRepository.findById(eventId);
      if (!event) {
        throw new Error('Event not found');
      }

      // Prepare an array to hold the ticket data
      const ticketData: TicketCreateAttributes[] = [];
      const ticketCreatedCount = await ticketRepository.getTicketCountByEventAndType(eventId, ticketTypeCode);
      for (let i = 0; i < totalCount - ticketCreatedCount; i++) {
        const ticketCode = await this.generateUniqueTicketCode(eventId, ticketTypeCode); // Generate unique ticket code

        // Create the ticket data for this ticket
        const newTicket: TicketCreateAttributes = {
          event_id: eventId,
          ticket_code: ticketCode,
          ticket_type_code: ticketTypeCode,
          status: 'available',
          buyer_id: null,
          qr_code_path: null,
        };

        // Generate QR Code
        const qrCodeFilePath = await generateQRCode(event.name, eventId, ticketTypeCode, ticketCode, ticketTemplatePath);
        newTicket.qr_code_path = qrCodeFilePath;

        // Add the ticket data (with the QR code path if needed)
        ticketData.push(newTicket);
      }
      // Save all the tickets to the database in bulk
      return await ticketRepository.createBulkTickets(ticketData);
    } catch (error) {
      throw new Error(`Error generating bulk tickets: ${(error as Error).message}`);
    }
  }

  // Function to generate a unique ticket code
  generateUniqueTicketCode = async (eventId: string, ticketTypeCode: string): Promise<string> => {
    let uniqueTicketCode = '';
    let isUnique = false;
    while (!isUnique) {
      uniqueTicketCode = generateRandomTicketCode();
      isUnique = await ticketRepository.isTicketCodeUnique(eventId, ticketTypeCode, uniqueTicketCode);
    }
    return uniqueTicketCode;
  };
}
export const ticketServices = new TicketServices();
