import{Module}from'@nestjs/common';import{TypeOrmModule}from'@nestjs/typeorm';import{WeatherSearch}from'./weather-search.entity';import{WeatherService}from'./weather.service';import{WeatherController}from'./weather.controller';
@Module({imports:[TypeOrmModule.forFeature([WeatherSearch])],controllers:[WeatherController],providers:[WeatherService]})export class WeatherModule{}
