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
  ticket: {
    error: {
      generateTicket: (message: string) => `Error generating ticket: ${message}`,
      generateBulkTickets: (message: string) => `Error generating bluk tickets: ${message}`,
      invalidFieldsEdit: (fields: string) => `Invalid fields: ${fields}`,
    },
  },
};
