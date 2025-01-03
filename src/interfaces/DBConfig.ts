import { Dialect } from 'sequelize';

export interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  logging: boolean;
}

// Define a type for the environment-specific configurations
export interface Config {
  development: DBConfig;
  production: DBConfig;
}
