/*The API poller for the background checks
  This will poll the api periodically, waiting for
  score changes. When the score changes, it will alert
  the user.*/

console.log("calling");
window.apiPoll = new APIPoll();
console.log("polling");
window.apiPoll.poll();
console.log("polled");
