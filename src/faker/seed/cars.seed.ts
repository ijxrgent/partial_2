// src/faker/seeds/cars.seed.ts
import { fakerES as faker } from '@faker-js/faker';
import { Car } from '../../models/business/Car.js';
import { SEED_COUNT } from '../config.js';

export async function seedCars() {

  console.log("Cars...");

  const marcas = [
    "Toyota",
    "Mazda",
    "Chevrolet",
    "Renault",
    "Kia",
    "Hyundai",
    "Nissan",
    "Ford"
  ];

  const clases = [
    "Sedan",
    "SUV",
    "Camioneta",
    "Hatchback",
    "Pickup"
  ];

  const cilindrajes = [
    "1000cc",
    "1200cc",
    "1400cc",
    "1600cc",
    "1800cc",
    "2000cc"
  ];

  for (let i = 0; i < SEED_COUNT; i++) {

    await Car.create({
      marca: faker.helpers.arrayElement(marcas),

      clase: faker.helpers.arrayElement(clases),

      modelo: faker.number.int({
        min: 2000,
        max: 2026
      }),

      cilindraje: faker.helpers.arrayElement(cilindrajes),

      capacidad: faker.number.int({
        min: 2,
        max: 7
      }),
    });
  }
}