import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Injectable()
export class ApiDataService {
  data;

  constructor(public http: Http) { }

  public getNext(limit) : Promise<Object> {
    return new Promise((resolve) => {
      this.getAPIdata().subscribe(
        response => {
          // Sort
          let orderObject = _.orderBy(response.races, ['endDate'], ['asc']);
          // DO NOT TRUST API, CHECK DATES
          for (let key in orderObject) {
            if (new Date(orderObject[key].endDate) < new Date(Date.now())) {
              delete orderObject.key;
            }
          }
          // trim to limit
          let limitObject = _.dropRight(orderObject, limit);
          // map typeName
          let mapedObject = _.map(limitObject, function (element) {
            return _.assign({}, element, {
              typeName: _.find(response.raceType, function (o) {
                return o.id === element.raceTypeID;
              }).typeName
            });
          });

          return resolve(mapedObject);
        });
    });
  }

  public getRace(id) : Promise<Object> {
    return new Promise((resolve) => {
      this.getAPIdata().subscribe(
        response => {
          let race = _.find(response.races, function (o) {
            return o.id === id;
          });

          // map competitors
          let competitors = _.map(race.competitors, value =>
              _.assign({},  _.find(response.competitors, function (o) {
                 return o.id === value;
             })
          ));

          let mapedObject = _.extend(
            race, {
              typeName: _.find(response.raceType, function (o) {
                return o.id === race.raceTypeID;
              }).typeName,
              locationName: _.find(response.locations, function (o) {
                return o.id === race.locationID;
              }).locationName,
              competitors: competitors
          });

          return resolve(mapedObject);
        });
    });
  }

  private getAPIdata() {
    return this.http.request('../assets/data.json')
      .map(response => {
        this.data = response.json();
        return response.json();
      }).catch(this.handleError);
  }

  /**
   * Handle Error
   *
   * @param error
   * @returns {any}
   */
  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    // die
    return Observable.throw(errMsg);
  }

}
