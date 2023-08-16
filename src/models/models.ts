import {
    Table,
    Column,
    Model,
    DataType,
    PrimaryKey,
    AutoIncrement,
  } from 'sequelize-typescript';

@Table({tableName: 'geo'})
export class Geo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  customerId!: string;

  @Column(DataType.STRING)
  roadName!: string;

  @Column(DataType.DOUBLE)
  latitude!: number;

  @Column(DataType.DOUBLE)
  longtitude!: number;
}

export default Geo;