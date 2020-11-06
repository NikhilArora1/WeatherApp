import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable()
export class AppService {
    private weatherApi;
    private apiKey;
    constructor(private http: HttpClient) {
        this.weatherApi = 'http://api.openweathermap.org/data/2.5/weather'
        this.apiKey = 'dbf8e659bff8e8b438d3eb9f3afaa00f';
    }

    getWeather(zip) {
        return this.http.get(`${this.weatherApi}?zip=${zip}&appid=${this.apiKey}&units=Imperial`)
        .pipe(
            catchError(this.handleError)
        );
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}
