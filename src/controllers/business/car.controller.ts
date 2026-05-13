// src/controllers/car.controller.ts

import { Request, Response } from "express";
import { Car, CarI } from "../../models/business/Car";

export class CarController {

  // GET ALL
  public async getAllCars(req: Request, res: Response) {
    try {

      const cars: CarI[] = await Car.findAll();

      res.status(200).json({ cars });

    } catch (error: any) {

      console.error(error);

      res.status(500).json({
        error: "Error fetching cars"
      });

    }
  }

  // GET BY ID
  public async getCarById(req: Request, res: Response) {

    try {

      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          error: "Invalid ID"
        });
      }

      const car = await Car.findByPk(id);

      if (car) {

        res.status(200).json(car);

      } else {

        res.status(404).json({
          error: "Car not found"
        });

      }

    } catch (error: any) {

      console.error(error);

      res.status(500).json({
        error: "Error fetching car"
      });

    }
  }

  // CREATE
  public async createCar(req: Request, res: Response) {

    try {

      const {
        marca,
        clase,
        modelo,
        cilindraje,
        capacidad
      } = req.body;

      const body: CarI = {
        marca,
        clase,
        modelo,
        cilindraje,
        capacidad
      };

      const newCar = await Car.create({ ...body });

      res.status(201).json(newCar);

    } catch (error: any) {

      console.error(error);

      res.status(400).json({
        error: error.message
      });

    }
  }

  // UPDATE
  public async updateCar(req: Request, res: Response) {

    try {

      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          error: "Invalid ID"
        });
      }

      const {
        marca,
        clase,
        modelo,
        cilindraje,
        capacidad
      } = req.body;

      const carExist = await Car.findByPk(id);

      if (!carExist) {

        return res.status(404).json({
          error: "Car not found"
        });

      }

      const body: CarI = {
        marca,
        clase,
        modelo,
        cilindraje,
        capacidad
      };

      await carExist.update(body);

      res.status(200).json(carExist);

    } catch (error: any) {

      console.error(error);

      res.status(400).json({
        error: error.message
      });

    }
  }

  // DELETE
  public async deleteCar(req: Request, res: Response) {

    try {

      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          error: "Invalid ID"
        });
      }

      const carToDelete = await Car.findByPk(id);

      if (carToDelete) {

        await carToDelete.destroy();

        res.status(200).json({
          message: "Car deleted successfully"
        });

      } else {

        res.status(404).json({
          error: "Car not found"
        });

      }

    } catch (error: any) {

      console.error(error);

      res.status(500).json({
        error: "Error deleting car"
      });

    }
  }
}