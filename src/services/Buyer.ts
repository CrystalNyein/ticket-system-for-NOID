import { buyerRepository } from '../repositories/Buyer';

class BuyerService {
  async findOrCreateBuyer(name: string, phone: string, email: string) {
    try {
      // Search for an existing buyer by name and phone
      const existingBuyer = await buyerRepository.findByNameAndPhone(name, phone);

      if (existingBuyer) {
        // Check if the email needs to be updated
        if (email && existingBuyer.email !== email) {
          await buyerRepository.update(existingBuyer.id, { email });
          existingBuyer.email = email; // Update local instance
        }
        return existingBuyer;
      }
      // Create a new buyer if no match is found
      const newBuyer = await buyerRepository.create({ name, phone, email });
      return newBuyer;
    } catch (error) {
      throw new Error(`Error in findOrCreateBuyer: ${(error as Error).message}`);
    }
  }
}
export const buyerSerivce = new BuyerService();
