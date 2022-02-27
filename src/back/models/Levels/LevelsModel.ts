import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model
} from 'sequelize';
import sequelize from '../../database/database';

class LevelsModel extends Model<
    InferAttributes<LevelsModel>,
    InferCreationAttributes<LevelsModel>
> {
    declare id: CreationOptional<number>;

    declare description: string;
}

LevelsModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'levels'
    }
);

export default LevelsModel;
