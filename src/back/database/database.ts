import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('gazin', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

export default sequelize;
