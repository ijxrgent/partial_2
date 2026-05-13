import dotenv from "dotenv";
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";

import routes from "../routes/index";
import { sequelize } from "../database/db";

dotenv.config();

export class App {

  public app: Application;

  constructor(private port?: number | string) {

    this.app = express();

    this.settings();
    this.middlewares();
    this.routes();
    this.dbConnection();

  }

  private settings(): void {

    this.app.set("port", this.port || process.env.PORT || 4002);

  }

  private middlewares(): void {

    this.app.use(morgan("dev"));
    this.app.use(cors());

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));

  }

  private routes(): void {

    this.app.get("/", (_req, res) => {
      res.json({
        message: "API funcionando correctamente 🚗"
      });
    });

    this.app.use("/api", routes);

  }

  private async dbConnection(): Promise<void> {

    try {

      await sequelize.authenticate();

      console.log("✅ Conexión exitosa a la BD");

      await sequelize.sync();

      console.log("📦 Base de datos sincronizada");

    } catch (error) {

      console.error("❌ Error de conexión:", error);

    }

  }

  async listen() {

    await this.app.listen(this.app.get("port"));

    console.log(
      `🚀 Servidor ejecutándose en puerto ${this.app.get("port")}`
    );

  }

}