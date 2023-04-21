import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonModal, IonicModule } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { WeatherService } from 'src/app/services/weather.service';
import { DegreesPipe } from 'src/app/pipes/degrees.pipe';
import { HoursPipe } from 'src/app/pipes/hours.pipe';
import { MilesPipe } from 'src/app/pipes/miles.pipe';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HeaderComponent, DegreesPipe, HoursPipe, MilesPipe],
})
export class MainPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
  @ViewChild(IonContent) content!: IonContent;
  city: string = 'Tampico';
  dataSource: any = {};
  dataSourceAllDay: any[] = [];
  nextDays: any[] = [];
  date: string = '';
  status: string = '';
  icon: string = '';
  speed: string = '';
  humidity: string = '';
  visibility: number = 0;
  pressure: string = '';
  degrees: number = 0;
  dataSelectedDay: any[] = [];
  constructor(private ws: WeatherService) { }

  ngOnInit() {
    this.getCity();
    this.getModalState();
  }
  
  getModalState(){
    this.ws.getModal().subscribe({
      next: (res) => {
        if(res){
          this.modal.isOpen = false;
        }
      }
    });
  }

  getCity(){
    this.ws.getCity().subscribe({
      next: (res) => {
        this.nextDays = [];
        this.city = res;
        this.getCurrent();
        this.getAll();
      }
    });
  }

  getCurrent(){
    this.ws.getCurrentWeather(this.city).subscribe(
      {
        next: (res) => {
          this.dataSource = res;
          if(this.dataSource){
            this.icon = this.dataSource.weather[0].icon;
            this.degrees = this.dataSource.main.temp;
            this.status = this.dataSource.weather[0].description[0].toUpperCase() + this.dataSource.weather[0].description.slice(1).toLowerCase(); 
            this.date = new Date().toDateString();
            this.speed = this.dataSource.wind.speed;
            this.humidity = this.dataSource.main.humidity;
            this.visibility = this.dataSource.visibility;
            this.pressure = this.dataSource.main.pressure;
          }
        }
      }
    )
  }

  getAll(){
    this.ws.getAllDay(this.city).subscribe(
      {
        next: (res: any) => {
          this.dataSourceAllDay = res.list;
          if(this.dataSource){
            this.dataSourceAllDay.forEach((item, index) => {
              if(index % 4 == 0 && index%8 !== 0){
                this.nextDays.push(item);
              }
            })
          }

        }
      }
    )
  }

  open(day: string){
    this.dataSelectedDay = this.dataSourceAllDay.filter((item) => item.dt_txt.split(" ")[0] === day.split(" ")[0]);
    this.ws.setModal(true);
    this.modal.isOpen = true;
  }

  close() {
    this.ws.setModal(true);
  }


  scrollToBottom(){
    this.content.scrollToBottom(500);
  }
  scrollToTop(){
    this.content.scrollToTop(500);
  }
}
