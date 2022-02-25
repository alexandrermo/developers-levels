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
    declare created_at: CreationOptional<Date>;
    declare updated_at: CreationOptional<Date | null>;
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
        tableName: 'levels',
        timestamps: false
    }
);

export default LevelsModel;
