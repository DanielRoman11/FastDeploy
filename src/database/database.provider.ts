import { constants } from '../common/constants';
import { DataSource } from 'typeorm';

export const databaseProvider = [
  {
    provide: constants.DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: process.env.NODE_ENV == 'dev',
      });

      return dataSource.initialize();
    },
  },
];
