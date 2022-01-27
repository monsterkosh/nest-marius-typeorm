import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'db',
  entities: ['dist/src/**/*.entity.js'],
  // should NOT use true in production.
  synchronize: true,
  // install globaly ts-node and typeorm && add line to package.sjon
  // migrations are sql scripts that represents the changes that you
  // want to run in your database
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
};

export default config;
