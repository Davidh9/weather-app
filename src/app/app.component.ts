import { Component } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { HeaderComponent } from './components/header/header.component';
import { WeatherService } from './services/weather.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, HeaderComponent, HttpClientModule],
  providers: [WeatherService]
})
export class AppComponent {
  constructor(private platform: Platform, private ws: WeatherService) {
    this.platform.backButton.subscribeWithPriority(1, () => {
      this.ws.setModal(false);
    });
  }
}
