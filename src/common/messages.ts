import { generateBulkTickets } from '../controllers/Ticket';

export default {
  httpMessages: {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not found',
    409: 'Conflict',
    422: 'Unprocessable Entity',
    500: 'Internal Server Error',
    544: 'Unknown HTTP Error',
  },
  auth: {
    loginFail: 'Either email or password is incorrect. Please try again',
    loginSuccess: 'Login successful',
    userNotFound: 'User not found',
    noTokenProvided: 'No token provided',
    invalidToken: 'Invalid or expired token',
    tokenRequired: 'Authorization token is required',
    permissionDenied: 'Permission denied',
    noPermission: 'You do not have permission to access this resource',
    createUser: 'Only admin can create a new user.',
    viewUser: 'Only admin can view all users.',
    getUser: 'You are not authorized to access this user.',
    updateUser: 'You are not authorized to update this user.',
    deleteUser: 'Only admin can delete a user.',
  },
  model: {
    created: (modelName: string) => `${modelName} created successfully`,
    updated: (modelName: string) => `${modelName} updated successfully`,
    retrieved: (modelName: string) => `${modelName} retrieved successfully`,
    deleted: (modelName: string) => `${modelName} deleted successfully`,
    notFound: (modelName: string) => `${modelName} not found`,
    conflict: (modelName: string, columnName: string) => `${modelName} with this ${columnName} already exists`,
  },
  error: {
    noFileUpload: 'No file uploaded',
    missingMetadata: 'Missing required metadata: eventId and ticketTypeCode',
  },
  event: {
    noRecent: 'There is no recent event.',
  },
  ticket: {
    error: {
      generateTicket: (message: string) => `Error generating ticket: ${message}`,
      generateBulkTickets: (message: string) => `Error generating bluk tickets: ${message}`,
      invalidFieldsEdit: (fields: string) => `Invalid fields: ${fields}`,
      scan: (error: string) => `Error scanning ticket: ${error}`,
      invalidQR: 'Invalid QR code data.',
      eventNotActive: 'The event is not active for today',
      alreadyScanned: 'This ticket has already been used for today',
      noTicketScanData: 'There is no ticket scan data related to this qr code',
      invalid: 'This ticket is invalid',
    },
    warning: {
      partialSuccess: 'Some tickets failed to generate',
      partialImportSuccess: 'Some ticket codes are failed to import',
    },
    success: {
      scanned: 'Ticket scanned successfully.',
    },
  },
  template: {
    found: 'Ticket Template exists on the server',
    notFound: 'Ticket Template does not exist on the server',
  },
};
