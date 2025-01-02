import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME_DEV || 'qr_ticket_system_dev',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME_PROD || 'qr_ticket_system_prod',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  },
};

export default config;
