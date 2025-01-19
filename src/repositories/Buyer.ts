import { BuyerCreateAttributes } from '../interfaces/Buyer';
import { BuyerModel } from '../models';

class BuyerRepository {
  // Create a new buyer
  async create(buyerData: BuyerCreateAttributes) {
    return await BuyerModel.create(buyerData);
  }
  // Find a buyer by name and phone
  async findByNameAndPhone(name: string, phone: string) {
    return await BuyerModel.findOne({ where: { name, phone } });
  }
  // Find buyer by ID
  async findById(id: string) {
    return await BuyerModel.findByPk(id);
  }
  async update(id: string, data: Partial<BuyerModel>) {
    return await BuyerModel.update(data, { where: { id } });
  }
}
export const buyerRepository = new BuyerRepository();
