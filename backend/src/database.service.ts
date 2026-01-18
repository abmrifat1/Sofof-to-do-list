import { Injectable, OnModuleInit } from "@nestjs/common";
import { Sequelize } from "sequelize";
@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    await this.sequelize.sync();
  }
}