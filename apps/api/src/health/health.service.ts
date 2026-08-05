import { Inject, Injectable } from "@nestjs/common";
import type { Pool } from "pg";

import { DATABASE_POOL } from "../database/database.constants";

export type HealthStatus = {
  status: "ok";
  database: "up";
};

@Injectable()
export class HealthService {
  constructor(@Inject(DATABASE_POOL) private readonly databasePool: Pool) {}

  async check(): Promise<HealthStatus> {
    await this.databasePool.query("SELECT 1 AS ok");

    return {
      status: "ok",
      database: "up",
    };
  }
}
