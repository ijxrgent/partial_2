// src/faker/seeds/tuitions.seed.ts
import { fakerES as faker } from '@faker-js/faker';

import { Tuition } from '../../models/business/Tuition.js';
import { Car } from '../../models/business/Car.js';

import { SEED_COUNT } from '../config.js';

export async function seedTuitions() {

  console.log("Tuitions...");

  const ciudades = [
    "Bogotá",
    "Cali",
    "Medellín",
    "Barranquilla",
    "Cartagena",
    "Pasto",
    "Popayán",
    "Bucaramanga"
  ];

  const cars = await Car.findAll();

  for (let i = 0; i < SEED_COUNT; i++) {

    const randomCar =
      cars[faker.number.int({
        min: 0,
        max: cars.length - 1
      })];

    await Tuition.create({

      date_matricula: faker.date.past(),

      ciudad: faker.helpers.arrayElement(ciudades),

      pago: faker.number.int({
        min: 200000,
        max: 2000000
      }),

      car_id: randomCar.id,
    });
  }
}