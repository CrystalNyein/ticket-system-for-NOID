import { Sequelize } from 'sequelize';
import env from '../config/env';

const { database } = env;

export default new Sequelize(database);

// export default new Sequelize(database.database, database.username, database.password, {
//   dialect: database.dialect as Dialect,
//   dialectModule: pg,
//   host: database.host,
//   port: database.port,
//   pool: database.pool,
//   logging: database.logging ? (msg, execTime) => logger.debug(`${msg} [${execTime} ms]`) : false,
//   benchmark: database.logging,
// });
