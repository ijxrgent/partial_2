import { DataTypes, Model } from "@sequelize/core";
import { sequelize } from "../../database/db.js";

export interface CarI {
  id?: number;
  marca: string;
  clase: string;
  modelo: number;
  cilindraje: string;
  capacidad: number;
}

export class Car extends Model {
  public id!: number;
  public marca!: string;
  public clase!: string;
  public modelo!: number;
  public cilindraje!: string;
  public capacidad!: number;
}

Car.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    marca: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La marca no puede estar vacía" },
      },
    },

    clase: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La clase no puede estar vacía" },
      },
    },

    modelo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "El modelo debe ser un número" },
      },
    },

    cilindraje: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "El cilindraje no puede estar vacío" },
      },
    },

    capacidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "La capacidad debe ser un número entero" },
      },
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: false,
  }
);