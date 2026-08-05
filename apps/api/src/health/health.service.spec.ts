import type { Pool } from "pg";

import { DATABASE_POOL } from "../database/database.constants";
import { HealthService } from "./health.service";

describe("HealthService", () => {
  it("reports that PostgreSQL is available after a successful query", async () => {
    const query = jest.fn().mockResolvedValue({ rows: [{ ok: 1 }] });
    const service = new HealthService({ query } as unknown as Pool);

    await expect(service.check()).resolves.toEqual({
      status: "ok",
      database: "up",
    });
    expect(query).toHaveBeenCalledWith("SELECT 1 AS ok");
    expect(DATABASE_POOL).toBe("DATABASE_POOL");
  });
});
