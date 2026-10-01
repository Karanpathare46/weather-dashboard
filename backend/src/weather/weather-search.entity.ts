import{Column,CreateDateColumn,Entity,PrimaryGeneratedColumn}from'typeorm';
@Entity('weather_searches')export class WeatherSearch{
 @PrimaryGeneratedColumn('uuid')id:string;
 @Column({length:100})city:string;
 @Column()country:string;
 @Column('float')temperature:number;
 @Column({length:120})condition:string;
 @Column('int')humidity:number;
 @Column('float')windSpeed:number;
 @CreateDateColumn()createdAt:Date;
}
