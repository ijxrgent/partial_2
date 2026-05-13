// src/controllers/tuition.controller.ts

import { Request, Response } from "express";

import { Tuition, TuitionI } from "../../models/business/Tuition";
import { Car } from "../../models/business/Car";

export class TuitionController {

  // GET ALL
  public async getAllTuitions(req: Request, res: Response) {

    try {

      const tuitions = await Tuition.findAll({
        include: [
          {
            model: Car,
          },
        ],
      });

      res.status(200).json({ tuitions });

    } catch (error: any) {

      console.error(error);

      res.status(500).json({
        error: "Error fetching tuitions",
      });

    }
  }

  // GET BY ID
  public async getTuitionById(req: Request, res: Response) {

    try {

      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          error: "Invalid ID",
        });
      }

      const tuition = await Tuition.findByPk(id, {
        include: [
          {
            model: Car,
          },
        ],
      });

      if (tuition) {

        res.status(200).json(tuition);

      } else {

        res.status(404).json({
          error: "Tuition not found",
        });

      }

    } catch (error: any) {

      console.error(error);

      res.status(500).json({
        error: "Error fetching tuition",
      });

    }
  }

  // CREATE
  public async createTuition(req: Request, res: Response) {

    try {

      const {
        date_matricula,
        ciudad,
        pago,
        car_id,
      } = req.body;

      const body: TuitionI = {
        date_matricula,
        ciudad,
        pago,
        car_id,
      };

      const newTuition = await Tuition.create({ ...body });

      res.status(201).json(newTuition);

    } catch (error: any) {

      console.error(error);

      res.status(400).json({
        error: error.message,
      });

    }
  }

  // UPDATE
  public async updateTuition(req: Request, res: Response) {

    try {

      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          error: "Invalid ID",
        });
      }

      const tuitionExist = await Tuition.findByPk(id);

      if (!tuitionExist) {

        return res.status(404).json({
          error: "Tuition not found",
        });

      }

      const {
        date_matricula,
        ciudad,
        pago,
        car_id,
      } = req.body;

      const body: TuitionI = {
        date_matricula,
        ciudad,
        pago,
        car_id,
      };

      await tuitionExist.update(body);

      res.status(200).json(tuitionExist);

    } catch (error: any) {

      console.error(error);

      res.status(400).json({
        error: error.message,
      });

    }
  }

  // DELETE
  public async deleteTuition(req: Request, res: Response) {

    try {

      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          error: "Invalid ID",
        });
      }

      const tuitionToDelete = await Tuition.findByPk(id);

      if (tuitionToDelete) {

        await tuitionToDelete.destroy();

        res.status(200).json({
          message: "Tuition deleted successfully",
        });

      } else {

        res.status(404).json({
          error: "Tuition not found",
        });

      }

    } catch (error: any) {

      console.error(error);

      res.status(500).json({
        error: "Error deleting tuition",
      });

    }
  }
}