import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  locations = ['94105', '10001', 'Tokyo'];
  weathers = [];
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.locations.forEach(location => {
      this.getWeather(location);
    });
  }

  getWeather(location): void {
    let typeOfInput: string;
    if (Number(location)) {
      typeOfInput = 'zip';
    } else {
      typeOfInput = 'city';
    }
    this.appService.getWeather(location, typeOfInput).subscribe((res: any) => {
      const locationDate = this.getLocationTime(res.timezone);
      const weather = {
        name: res.name,
        date: locationDate.toDateString(),
        time: locationDate.getHours() + ':' + locationDate.getMinutes() + ':' + locationDate.getSeconds(),
        description: res.weather[0].description,
        temperature: res.main
      };
      this.weathers.push(weather);
      console.log(`For ${weather.name}`);
      console.log(`Weather in ${weather.name} at ${weather.time} - ${weather.description}`);
      console.log(`Temperature in Fahrenheit`, weather.temperature);
      console.log('-----------------------------');
    });
  }

  getLocationTime(timezone): Date {
      const currentDate = new Date(); // get the current time
      const currentTzOffset = -currentDate.getTimezoneOffset() / 60; // in hours
      const deltaTzOffset = (timezone / 3600) - currentTzOffset; // timezone diff
      const nowTimestamp = currentDate.getTime(); // get the number of milliseconds since unix epoch
      const deltaTzOffsetMilli = deltaTzOffset * 1000 * 60 * 60; // convert hours to milliseconds (tzOffsetMilli*1000*60*60)
      const outputDate = new Date(nowTimestamp + deltaTzOffsetMilli);
      return outputDate;
  }
}
