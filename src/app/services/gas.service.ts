import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  snapshotChanges,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class GasService {
  items!: AngularFireList<any>;
  gasContent!: AngularFireList<any>;
  gasLevel!: AngularFireList<any>;
  // infos: any = [];
  // ref = this.db.database.ref('/gasValue/');

  constructor(private db: AngularFireDatabase) {
    // this.ref.on('value', (snapshot) => {
    //   snapshot.forEach((childSnapshot) => {
    //     let childData = childSnapshot.val();
    //     this.infos.push(childData);
    //   });
    // });
    // this.db.database.ref('/gasValue/').on('value', (snapshot) => {
    //   let a = snapshot.child('gasContent');
    //   console.log(a);
    //   let b = a.child('state').val();
    //   b as string;
    //   console.log(b);
    //   let c = a.child('value').val();
    //   c as number;
    //   console.log(c > 50 ? 'high' : 'low');
    // });
  }

  getItems() {
    this.items = this.db.list('/gasValue/');
    return this.items;
  }

  getGasContent() {
    this.gasContent = this.db.list('/gasValue/gasContent/');
    return this.gasContent;
  }

  getGasLevel() {
    this.gasLevel = this.db.list('/gasValue/gasLevel/');
    return this.gasLevel;
  }
}
