import { UserAttributes, UserCreateAttributes } from '../interfaces/User';
import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '../common/sequelize';
import { TUserRole } from '../common/types';

class UserModel extends Model<UserAttributes | UserCreateAttributes> {
  declare id: string;
  declare name: string;
  declare email: string;
  declare password: string;
  declare role: TUserRole;

  declare readonly created_at: Date;
  declare readonly updated_at: Date;
  static filterableColumns = [];
  static searchableColumns = ['name', 'email'];

  // Instance method to compare passwords
  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
  // Adding a getter to exclude the password
  public toJSON() {
    const values = { ...this.get() };
    delete values.password; // Remove password from JSON response
    return values;
  }
}
UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Ensures that the email is valid
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100], // Minimum length of 8 characters
      },
    },
    role: {
      type: DataTypes.ENUM('admin', 'event_manager', 'staff'),
      allowNull: false,
      defaultValue: 'staff',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  },
);
// Hook to hash password before saving
UserModel.beforeCreate(async (user) => {
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

export default UserModel;
