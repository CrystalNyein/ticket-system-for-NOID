// Function to generate a unique 5-digit ticket code
export const generateRandomTicketCode = (): string => {
  return String(Math.floor(1 + Math.random() * 99998).toString()).padStart(5, '0'); // Generate a 5-digit random number
};
