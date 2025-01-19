import { TicketScanCreateAttributes } from '../interfaces/TicketScan';
import { TicketScanModel } from '../models';

class TicketScanRepository {
  async create(ticketScanData: TicketScanCreateAttributes) {
    return await TicketScanModel.create(ticketScanData);
  }
  async findAll(filters: any) {
    return await TicketScanModel.findAll(filters);
  }
  async findByTicketIdAndDate(ticketId: string, date: string) {
    return await TicketScanModel.findOne({
      where: {
        ticketId,
        scanDate: date,
      },
    });
  }
}
export const ticketScanRepository = new TicketScanRepository();
