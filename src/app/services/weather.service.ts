import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private city = new BehaviorSubject<any>('Tampico');
  private modal = new BehaviorSubject<any>(false);
  constructor(private http: HttpClient) { }

  setCity(city: string): void{
    this.city.next(city);
  }

  getCity(): Observable<any>{
    return this.city.asObservable();
  }
  setModal(open: boolean): void{
    this.modal.next(open);
  }

  getModal(): Observable<any>{
    return this.modal.asObservable();
  }

  getCurrentWeather(city: string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=aa53e98b39d729f4187d9fb714fdf880`);
    // return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=es&appid=aa53e98b39d729f4187d9fb714fdf880`);
  }
  
  getAllDay(city: string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=aa53e98b39d729f4187d9fb714fdf880`);
  }


}
