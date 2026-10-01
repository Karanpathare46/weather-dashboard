import{HttpException,Injectable}from'@nestjs/common';import{InjectRepository}from'@nestjs/typeorm';import{Repository}from'typeorm';import{WeatherSearch}from'./weather-search.entity';
@Injectable()
export class WeatherService{
 constructor(@InjectRepository(WeatherSearch)private repo:Repository<WeatherSearch>){}
 async search(city:string){
  const q=(city||'').trim();if(!q)throw new HttpException('City is required',400);
  const g=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=1&language=en&format=json`);
  if(!g.ok)throw new HttpException('Geocoding provider unavailable',502);
  const gd:any=await g.json();if(!gd.results?.length)throw new HttpException('City not found',404);
  const place=gd.results[0];
  const w=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`);
  if(!w.ok)throw new HttpException('Weather provider unavailable',502);
  const wd:any=await w.json();
  const code=wd.current.weather_code;
  const condition=code===0?'Clear sky':code<=3?'Partly cloudy':code<=48?'Fog':code<=67?'Rain':code<=77?'Snow':'Storm';
  const result={city:place.name,country:place.country_code,temperature:wd.current.temperature_2m,condition,humidity:wd.current.relative_humidity_2m,windSpeed:wd.current.wind_speed_10m};
  await this.repo.save(this.repo.create(result));
  return result;
 }
 history(){return this.repo.find({order:{createdAt:'DESC'},take:20});}
}
