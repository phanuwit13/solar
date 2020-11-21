import { Component } from "@angular/core";
import * as firebase from "firebase";
import { snapshotToArray } from "../../environments/environment";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  item = [];
  connectStatus = ["ไม่มีการเชื่อมต่อ", "เชื่อมต่ออุปกรณ์"];
  inputText: string = "";
  ref = firebase.database().ref("/");
  timeDate = "";
  temp: number;

  constructor() {
    this.ref.on("value", resp => {
      this.item = snapshotToArray(resp);
    });
    this.run();
  }

  addItem(item) {
    if (item != undefined && item != null) {
      let newItem = this.ref.push();
      newItem.set(item);
      this.inputText = "";
    }
  }
  async delItem(key) {
    firebase
      .database()
      .ref("/" + key)
      .remove();
  }

  run() {
    setInterval(async () => {
      let t = new Date();
      this.timeDate =
        t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
      this.temp = await this.randomMath();
    }, 1000);
  }
  randomMath() {
    return Math.floor(Math.random() * 3);
  }
}
