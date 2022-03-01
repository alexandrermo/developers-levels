import { Sequelize } from 'sequelize';
import cls from 'cls-hooked';

import env from '../../../env.json';

const namespace = cls.createNamespace('transaction-namespace');

// eslint-disable-next-line react-hooks/rules-of-hooks
Sequelize.useCLS(namespace);
let sequelize;
if (env.dialect === 'mysql') {
    sequelize = new Sequelize(env.mysqlSchema, 'root', env.mysqlPassword, {
        host: env.mysqlHost,
        dialect: 'mysql',
        port: env.mysqlPort,
        storage: '../../../database/databaseSqlite.db'
    });
} else {
    sequelize = new Sequelize('', '', '', {
        dialect: 'sqlite',
        storage: './database/databaseSqlite.db'
    });
}

export default sequelize;
