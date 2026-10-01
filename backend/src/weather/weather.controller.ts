import{Controller,Get,Query}from'@nestjs/common';import{WeatherService}from'./weather.service';
@Controller('weather')export class WeatherController{
 constructor(private service:WeatherService){}
 @Get()search(@Query('city')city:string){return this.service.search(city);}
 @Get('history')history(){return this.service.history();}
}
