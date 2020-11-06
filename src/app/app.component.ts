import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  private zip = '10001';
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.getWeather(this.zip).subscribe((res: any) => {
      const temp = res.main;
      const time = new Date(res.dt * 1000).toTimeString();
      console.log(`Weather in ${res.name} at ${time} is expected to be ${res.weather[0].description}`);
      console.log(`Temperature in Fahrenheit`, temp);
      console.log('-----------------------------');
    });
  }
}
