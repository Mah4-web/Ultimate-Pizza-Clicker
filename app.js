console.log("Hello World, I Am Building My First Clicking (IDLE) Game!",);

//default starting values for cookie count and cps (either or)
let cookieCount = 0;
let cps = 0;

// const stats = {
//   cookieCount: 0,
//   cps: 0,
// };

//if there is data in local storage, update stats with this data, so the user picks it up where they left off

//=======================================================
//shop upgrades
//fetch the upgrades from the API

async function getUpgrades() {
    const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades")
    const data = await response.json();
    console.log(data);
}
//API url: 

//To create multiple elements in a more convenient way, loops are your friend.
// create DOM elements to contain the upgrades data
// create an element
// assign the value to its text content
// append it to the DOM
// after you complete this task, you should see the upgrades on your website

//====================================================
//the interval
setInterval(function () {
  cookieCount += cps; //cookieCount = cookieCount + cps
  //update the text content in the DOM with the new values
  //save the new values in local storage
}, 1000);