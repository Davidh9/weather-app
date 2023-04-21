import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class HeaderComponent  implements OnInit {
  city: string = 'Tampico';
  showInput: boolean = false;

  constructor( private ws: WeatherService) { }

  ngOnInit() {
    this.getCity();
  }

  getCity(){
    this.ws.getCity().subscribe({
      next: (res) => {
        this.city = res;
      }
    });
  }

  show(){
    this.showInput = !this.showInput;
  }

  onInput(ev: any){
    this.showInput = false;
    if(ev){
      const cityCap = ev.target!.value[0].toUpperCase() +  ev.target!.value.slice(1).toLowerCase(); 
      this.ws.setCity(cityCap);
      return;
    }
    this.city = 'Tampico'

  }
}
