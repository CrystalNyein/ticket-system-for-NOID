// Function to generate a unique 4-digit ticket code
export const generateRandomTicketCode = (): string => {
  return String(Math.floor(1000 + Math.random() * 9000).toString()).padStart(4, '0'); // Generate a 4-digit random number
};
