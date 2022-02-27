import { Sequelize } from 'sequelize';
import cls from 'cls-hooked';

const namespace = cls.createNamespace('transaction-namespace');

// eslint-disable-next-line react-hooks/rules-of-hooks
Sequelize.useCLS(namespace);
const sequelize = new Sequelize('gazin', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

export default sequelize;
