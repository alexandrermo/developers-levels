import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute
} from 'sequelize';
import sequelize from '../../database/database';
import LevelsModel from '../Levels/LevelsModel';

class DevelopersModel extends Model<
    InferAttributes<DevelopersModel, { omit: 'level' }>,
    InferCreationAttributes<DevelopersModel, { omit: 'level' }>
> {
    declare id: CreationOptional<number>;

    declare name: string;

    declare sex: string;

    declare birthday: Date;

    declare hobby: string | null;

    declare level?: NonAttribute<LevelsModel>;
}

DevelopersModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        sex: {
            type: DataTypes.CHAR(1),
            allowNull: false
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        hobby: {
            type: DataTypes.STRING(100)
        }
    },
    {
        sequelize,
        tableName: 'developers'
    }
);

const foreignKey = {
    name: 'levelId',
    allowNull: false
};

const aliasLevels = 'level';

LevelsModel.hasMany(DevelopersModel, {
    sourceKey: 'id',
    foreignKey,
    as: aliasLevels
});
DevelopersModel.belongsTo(LevelsModel, {
    foreignKey,
    as: aliasLevels
});

export default DevelopersModel;
