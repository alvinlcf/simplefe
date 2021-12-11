import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { responseFormat, TableauDTO } from '../_models';
import { map } from 'rxjs/operators';

@Injectable()
export class TrackerService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
            , 'Access-Control-Allow-Origin': '*'
            , 'Access-Control-Allow-Credentials': 'true'
            , 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            , 'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
        })
    }

    constructor(private httpClient: HttpClient) { }

    getName(name): Observable<TableauDTO[]> {
        
        return this.httpClient.get<responseFormat>("/reports/name/"+name, this.httpOptions)
            .pipe(map((response: responseFormat) => response.dataList as TableauDTO[]))
            ;
    }

    getTableauTicket(tableauDTO: any): Observable<any> {
        return this.httpClient.post<any>("/reports/getTableauTicket", tableauDTO, this.httpOptions)
            .pipe(map((response: responseFormat) => response.dataList as TableauDTO[]))
            // .pipe(catchError(this.handleError))
            ;
    }




}
