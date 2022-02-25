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
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date | null>;
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
        },
        created_at: {
            type: DataTypes.DATE
        },
        updated_at: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize,
        tableName: 'developers',
        timestamps: false
    }
);

LevelsModel.hasMany(DevelopersModel, {
    sourceKey: 'id',
    foreignKey: {
        name: 'level_id',
        allowNull: false
    },
    as: 'level'
});

export default DevelopersModel;
