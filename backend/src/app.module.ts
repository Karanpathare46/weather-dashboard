import {Module}from'@nestjs/common';import{TypeOrmModule}from'@nestjs/typeorm';import{WeatherSearch}from'./weather/weather-search.entity';import{WeatherModule}from'./weather/weather.module';
@Module({imports:[TypeOrmModule.forRoot({type:'postgres',url:process.env.DATABASE_URL,entities:[WeatherSearch],synchronize:true}),WeatherModule]})export class AppModule{}
