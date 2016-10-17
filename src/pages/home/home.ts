import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {Geofence, Geolocation}  from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  image: string = 'assets/default.jpg';
 
  constructor(public navCtrl: NavController, private platform: Platform) {
    this.platform.ready().then(
      () => this.startGeofence()
    )
  }
  
  setGeofence(location) {
    let geofence = {
      id:             "boundary",
      latitude:       location.coords.latitude,
      longitude:      location.coords.longitude,
      radius:         100,
      transitionType: Geofence.TransitionType.EXIT,
      notification: {
        id:             1,
        title:          "Here There Be Dragons",
        text:           "BACK TO YOUR DESK DEVELOPER...or else",
        openAppOnClick: true
      }
    }

    Geofence.addOrUpdate(geofence).then(
      fenceData => console.log('Added Geofence:\n' + fenceData)
    );

    Geofence.onTransitionReceived().subscribe(
      () => {
        this.image = 'assets/crossed.jpg';

        Geofence.remove(geofence.id).then(
          () => console.log('Geofence removed')
        );
      }
    );
  }

  startGeofence () {
    Geofence.initialize().then(
      () => Geolocation.getCurrentPosition().then(
        location => this.setGeofence(location)
      )
    )
  }
}
