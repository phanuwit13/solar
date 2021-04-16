import { Component, OnInit } from '@angular/core'
import * as firebase from 'firebase'
import { snapshotToArray } from '../../environments/environment'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  public status = false
  item: any
  ref = firebase.database().ref('/')
  lowVolteBatt: number = 0
  lowCurrentBatt = 0
  timeStart = '11:12'
  timeStop = '01:00'
  enableTime = false
  lowCurrentSolar = 0
  lowVolteSolar = 0
  constructor() {}

  async ngOnInit() {
    this.ref.on('value', (resp) => {
      this.item = snapshotToArray(resp)
      if (this.item[0].enable == 1) {
        this.status = false
      } else {
        this.status = true
      }
      // console.log(this.item[0])
    })
    this.connectFirebase(this.ref).then((res) => {
      this.item = res
      if (res[0].enable == 1) {
        this.status = false
      } else {
        this.status = true
      }
      // console.log(res)
      this.lowCurrentBatt = res[0].lowCurrentBatt
      this.lowCurrentSolar = res[0].lowCurrentSolar
      this.lowVolteBatt = res[0].lowVolteBatt
      this.lowVolteSolar = res[0].lowVolteSolar
      this.enableTime = res[0].enableTime
      this.timeStart = res[0].timeStart
      this.timeStop = res[0].timeStop
    })
  }

  connectFirebase(ref) {
    var item = []
    return new Promise(function (resolve, reject) {
      ref.on('value', (resp) => {
        item = snapshotToArray(resp)
        resolve(item)
      })
    })
  }

  async upItem(key, item) {
    firebase
      .database()
      .ref('test/' + key)
      .set(parseFloat(item))
  }

  async upTime(key, item) {
    firebase
      .database()
      .ref('test/' + key)
      .set(item)
  }

  setStatus() {
    this.status = !this.status
    // console.log(this.status)

    if (this.status == true) {
      this.upItem('enable', 0)
    } else {
      this.upItem('enable', 1)
    }
  }
  setEnableTime() {
    // console.log(this.enableTime)

    if (this.enableTime == false) {
      this.upItem('enableTime', 0)
    } else {
      this.upItem('enableTime', 1)
    }
  }
}
