import dotenv from 'dotenv';
import { DBConfig } from '../interfaces/DBConfig';

export enum Environment {
  Production = 'production',
  Development = 'development',
}
dotenv.config();
const database: DBConfig = {
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'rootpassword',
  database: process.env.NODE_ENV === Environment.Development ? process.env.DB_NAME_DEV || 'qr_ticket_system_dev' : process.env.DB_NAME_PROD || 'qr_ticket_system_prod',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  logging: process.env.NODE_ENV === Environment.Development,
};

export default {
  appName: process.env.APP_NAME || 'BabyBook',
  appPort: process.env.APP_PORT || 8080,
  /**
   * Application environment mode either development or production or test
   */
  environment: process.env.NODE_ENV || Environment.Development,

  /**
   * Database connection for each environment
   */
  database,

  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,

  salt: process.env.SALT || '10',
};
