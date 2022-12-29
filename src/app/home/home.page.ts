import { Component, OnInit, ViewChild } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CardComponent } from '../components/card/card.component';
import { GasService } from '../services/gas.service';
// import {
//   Push,
//   PushObject,
//   PushOptions,
// } from '@awesome-cordova-plugins/push/ngx';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  tankState: string = '';
  gasState: string = '';
  tankValue!: number;
  gasValue!: number;
  gasClass: any;
  tankClass: any;
  ipAddress!: string;
  port!: string;

  cardComponent!: CardComponent;

  constructor(
    private gasService: GasService,
    private alertController: AlertController // private push: Push // private inAppBrowser: InAppBrowser
  ) {}

  ngOnInit() {
    /* Firebase */
    this.fetchItems();
    // let gasValues = this.fetchItems();
    // gasValues.snapshotChanges().subscribe((actions) => {
    //   // actions.forEach((action) => {
    //   //   let a = action.payload.val();
    //   //   let array = new Array(a);
    //   //   console.log(array);
    //   // });
    //   let gasContent = actions[0].payload.val();
    //   let gasValue = actions[1].payload.val();
    //   console.log(
    //     'Tank State: ',
    //     gasContent.state,
    //     'Tank Content: ',
    //     gasContent.value
    //   );
    //   console.log(
    //     'Gas State: ',
    //     gasValue.state,
    //     'Gas Content: ',
    //     gasValue.value
    //   );
    // });

    this.fetchGasContent();
    let gasContent = this.fetchGasContent();
    gasContent.snapshotChanges().subscribe((actions) => {
      let tankState = actions[0].payload.val();
      let tankValue = actions[1].payload.val();
      this.tankState = tankState;
      this.tankValue = tankValue;

      if (this.tankValue <= 10) {
        this.tankClass = 'dangerous';
        this.alert(
          'Tank Content Alert!',
          'Tank is empty, please buy a new one.'
        );
      } else if (this.tankValue <= 20) {
        this.tankClass = 'warning';
        this.alert(
          'Tank Content Alert!',
          'Tank is almost empty. It is recommended to order a new one.'
        );
      } else {
        this.tankClass = '';
      }
    });

    this.fetchGasLevel();
    let gasLevel = this.fetchGasLevel();
    gasLevel.snapshotChanges().subscribe((actions) => {
      let gasState = actions[0].payload.val();
      let gasValue = actions[1].payload.val();
      this.gasState = gasState;
      this.gasValue = gasValue;

      if (this.gasValue >= 50) {
        this.gasClass = 'dangerous';
        this.alert(
          'Gas Leakage Alert!',
          'Gas is leaking! Please ventilate your surroundings.'
        );
      } else {
        this.gasClass = '';
      }
    });

    /* End of Firebase */

    /* Push Notif */
    // this.push.hasPermission().then((res: any) => {
    //   if (res.isEnabled) {
    //     console.log('We have permission to send push notifications');
    //   } else {
    //     console.log('We do not have permission to send push notifications');
    //   }
    // });

    // // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
    // this.push
    //   .createChannel({
    //     id: 'testchannel1',
    //     description: 'My first test channel',
    //     // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
    //     importance: 3,
    //     //badge is used to if badge appears on the app icon see https://developer.android.com/reference/android/app/NotificationChannel.html#setShowBadge(boolean).
    //     //false = no badge on app icon.
    //     //true = badge on app icon
    //     badge: false,
    //   })
    //   .then(() => console.log('Channel created'));

    // // Delete a channel (Android O and above)
    // this.push
    //   .deleteChannel('testchannel1')
    //   .then(() => console.log('Channel deleted'));

    // // Return a list of currently configured channels
    // this.push
    //   .listChannels()
    //   .then((channels) => console.log('List of channels', channels));

    // // to initialize push notifications

    // const options: PushOptions = {
    //   android: {},
    //   ios: {
    //     alert: 'true',
    //     badge: true,
    //     sound: 'false',
    //   },
    //   windows: {},
    //   browser: {
    //     pushServiceURL: 'http://push.api.phonegap.com/v1/push',
    //   },
    // };

    // const pushObject: PushObject = this.push.init(options);

    // pushObject
    //   .on('notification')
    //   .subscribe((notification: any) =>
    //     console.log('Received a notification', notification)
    //   );

    // pushObject
    //   .on('registration')
    //   .subscribe((registration: any) =>
    //     console.log('Device registered', registration)
    //   );

    // pushObject
    //   .on('error')
    //   .subscribe((error) => console.error('Error with Push plugin', error));
    /* End of Push Notif */
  }

  fetchItems() {
    return this.gasService.getItems();
  }

  fetchGasContent() {
    return this.gasService.getGasContent();
  }
  fetchGasLevel() {
    return this.gasService.getGasLevel();
  }

  async alert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  connectToCamera() {
    let url = 'http://' + this.ipAddress + ':' + this.port + '/video';
    window.open(url, '_system', 'location=yes');
    console.log(this.ipAddress + ':' + this.port);
  }
}
