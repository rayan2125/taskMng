const { DataTypes } = require ("sequelize");
const sequelize = require ("../config/db.js");
const User = require ("./authModels.js");

const Task = sequelize.define(
  "tasks",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in_progress", "done"),
      defaultValue: "pending",
    },
  },
  {
    tableName: "tasks",
    timestamps: true, 
    indexes: [
      {
        unique: true,
        fields: ["user_id", "title"], 
      },
    ],
  }
);

// Relations
Task.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(Task, { foreignKey: "user_id" });

module.exports = Task;
