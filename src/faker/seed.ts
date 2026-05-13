// src/faker/seed.ts

import { sequelize } from '../database/db.js';

import '../models/business/Car.js';
import '../models/business/Tuition.js';

import { seedCars } from './seed/cars.seed.js';
import { seedTuitions } from './seed/tuition.seed.js';

async function seed() {

  try {

    console.log("Iniciando seed...");

    // Recrea tablas
    await sequelize.sync({ force: true });

    // Orden importante
    await seedCars();
    await seedTuitions();

    console.log("Seed completado");
    process.exit(0);

  } catch (error) {

    console.error("Error en seed:", error);
    process.exit(1);

  }

}

seed();