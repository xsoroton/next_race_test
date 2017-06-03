import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RacePage } from '../race/race';
import { ApiDataService } from '../../providers/api-data-service';
import { Observable } from "rxjs";

const recordsLimit: number = 5;
export const updateTimer: number = 5;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  getNext;
  timer;
  subscription;

  constructor(public navCtrl: NavController, public apiDataService: ApiDataService) {

    this.timer = Observable.timer(0, updateTimer * 1000);
    this.subscription = this.timer.subscribe(t => {
      apiDataService.getNext(recordsLimit).then(races => {
        console.log(races);
        this.getNext = races;
      });
    });
  }

  showRace(raceID) {
    this.navCtrl.setRoot(RacePage, {raceID});
    this.subscription.unsubscribe();
  }
}
