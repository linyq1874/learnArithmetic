let i = 0;

function timedCount() {
  i = i + 1;
  if(i > 10) {
    self.close();
  }
  postMessage(i);
  setTimeout(timedCount, 1000);
}
timedCount();

// onmessage = function (e) {
//   console.log('worker', e);
//   // if(e.data.length > 1) {
//   //   postMessage(e.data[1] - e.data[0])
//   // }
// }

importScripts('./importTest')

// console.log(im);
