// src/models/business/Tuition.ts

import { DataTypes, Model } from "@sequelize/core";
import { sequelize } from "../../database/db";

import { Car } from "./Car";

export interface TuitionI {
  id?: number;
  date_matricula: Date;
  ciudad: string;
  pago: number;
  car_id: number;
}

export class Tuition extends Model {
  public id!: number;
  public date_matricula!: Date;
  public ciudad!: string;
  public pago!: number;
  public car_id!: number;
}

Tuition.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    date_matricula: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La fecha de matrícula no puede estar vacía" },
        isDate: { args:true, msg: "Debe ser una fecha válida" },
      },
    },

    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "La ciudad no puede estar vacía" },
      },
    },

    pago: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: "El pago debe ser un número entero" },
      },
    },

    car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: Car,
        key: "id",
  },
},
  },
  {
    sequelize,
    modelName: "Tuition",
    tableName: "tuitions",
    timestamps: false,
  }
);

// RELACIONES

Car.hasMany(Tuition, {
  foreignKey: "car_id",
});

Tuition.belongsTo(Car, {
  foreignKey: "car_id",
});