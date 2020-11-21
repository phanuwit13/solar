export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBIFENQ3epjonyFagKeUuDL0v2Yz3DdQSA",
  authDomain: "pro-solar.firebaseapp.com",
  databaseURL: "https://pro-solar.firebaseio.com",
  projectId: "pro-solar",
  storageBucket: "pro-solar.appspot.com",
  messagingSenderId: "645656744850",
  appId: "1:645656744850:web:462afcfb3ad08766ada74b",
  measurementId: "G-S45V21KDGF"
  }
};
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
