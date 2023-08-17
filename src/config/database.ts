import {
    Sequelize
  } from 'sequelize-typescript';


  import Geo from '../models/models';
const sequelize = new Sequelize({
    database: 'db_va',
    dialect: 'postgres',
    username: 'psql',
    password: '123456',
    host: 'localhost',
    port: 5435,
  });

  sequelize.addModels([Geo]);

export default sequelize