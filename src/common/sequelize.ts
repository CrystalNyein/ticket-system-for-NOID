import { Sequelize } from 'sequelize';
import { DBConfig } from '../interfaces/DBConfig';
import config from '../config/config.js'; // Path to the config file
import * as dotenv from 'dotenv';
dotenv.config(); // Load .env variables
const environment = process.env.NODE_ENV || 'development';
const dbConfig = config[environment as keyof typeof config];
export default new Sequelize(dbConfig as DBConfig);

// export default new Sequelize(database.database, database.username, database.password, {
//   dialect: database.dialect as Dialect,
//   dialectModule: pg,
//   host: database.host,
//   port: database.port,
//   pool: database.pool,
//   logging: database.logging ? (msg, execTime) => logger.debug(`${msg} [${execTime} ms]`) : false,
//   benchmark: database.logging,
// });
