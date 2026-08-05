import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool } from "pg";

import { DATABASE_POOL } from "./database.constants";

@Module({
  providers: [
    {
      provide: DATABASE_POOL,
      inject: [ConfigService],
      useFactory: (config: ConfigService): Pool =>
        new Pool({
          connectionString: config.get<string>(
            "DATABASE_URL",
            "postgresql://octopus:octopus@localhost:5433/octopus_expertise",
          ),
        }),
    },
  ],
  exports: [DATABASE_POOL],
})
export class DatabaseModule {}
