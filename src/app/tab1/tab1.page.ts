import { Component } from '@angular/core'
import * as firebase from 'firebase'
import { snapshotToArray } from '../../environments/environment'
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  item = []
  connectStatus = ['ไม่มีการเชื่อมต่อ', 'เชื่อมต่ออุปกรณ์']
  chargeStatus = ['ชาร์จปกติ', 'ชาร์จผิดพลาด']
  inputText: string = ''
  ref = firebase.database().ref('/')
  timeDate = ''
  Date = ''
  oldMinutes = 0
  months_th_mini = [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.',
  ]

  constructor() {}
  ngOnInit() {
    this.oldMinutes = new Date().getMinutes()
    this.ref.on('value', (resp) => {
      this.item = snapshotToArray(resp)
      // console.log(this.item)
    })

    this.run()
  }

  addItem(item) {
    if (item != undefined && item != null) {
      let newItem = this.ref.push()
      newItem.set(item)
      this.inputText = ''
    }
  }
  async delItem(key) {
    firebase
      .database()
      .ref('/' + key)
      .remove()
  }

  async upItem(key, item) {
    firebase
      .database()
      .ref('test/' + key)
      .set(item)
  }

  run() {
    setInterval(async () => {
      let t = new Date()
      let s: any = t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds()
      this.timeDate = this.getTime() + ':' + s
      this.Date =
        t.getDate() +
        ' ' +
        this.months_th_mini[t.getMonth()] +
        ' ' +
        t.getFullYear()
      if (t.getMinutes() != this.oldMinutes) {
        this.oldMinutes = t.getMinutes()
        this.upItem('currentDate', this.getDate())
        this.upItem('currentTime', this.getTime())
      }
    }, 1000)
  }
  randomMath() {
    return Math.floor(Math.random() * 3)
  }
  getTime() {
    let t = new Date()
    let h: any = t.getHours()
    let m: any = t.getMinutes()
    if (h < 10) {
      h = '0' + h
    }
    if (m < 10) {
      m = '0' + m
    }
    return h + ':' + m
  }
  getDate() {
    let t = new Date()
    let d: any = t.getDate()
    let m: any = t.getMonth() + 1
    let y: any = t.getFullYear()
    if (d < 10) {
      d = '0' + d
    }
    if (m < 10) {
      m = '0' + m
    }
    return d + '-' + m + '-' + y
  }
}
