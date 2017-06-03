import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { HomePage, updateTimer } from '../home/home';
import { ApiDataService } from '../../providers/api-data-service';
import { Observable } from "rxjs";

@Component({
  selector: 'page-race',
  templateUrl: 'race.html',
})
export class RacePage {

  raceID;
  race;
  timer;
  subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public apiDataService: ApiDataService) {
    this.raceID = navParams.get('raceID');
    this.timer = Observable.timer(0, updateTimer * 1000);
    this.subscription = this.timer.subscribe(t => {
      apiDataService.getRace(this.raceID).then(race => {
        console.log(race);
        this.race = race;
      });
    });
  }

  showHome() {
    this.navCtrl.setRoot(HomePage);
    this.subscription.unsubscribe();
  }

  betLoader(){
    let loading = this.loadingCtrl.create({
      content: 'Betting Now, In Progress...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }

}
