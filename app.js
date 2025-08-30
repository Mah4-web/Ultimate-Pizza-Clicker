console.log("Hello World, I Am Building My First Clicking (IDLE) Game!",);

const upgradesContainer = document.getElementById("upgrades");
const sliceCountDisplay = document.getElementById("slices");
const spsDisplay = document.getElementById("sps");

// starting values for pizza count and cps (either or)
let pizzaCount = 0;
let slicePerSecond = 0;

// Update UI
function updateUI() {
  sliceCountDisplay.textContent = Math.floor(pizzaCount);
  spsDisplay.textContent = slicePerSecond;
}

// Handle clicking the pizza image
document.getElementById("pizza").addEventListener("click", () => {
  pizzaCount++;
  updateUI();
});

// Add passive income from upgrades
setInterval(() => {
  pizzaCount += slicePerSecond / 10; // Add every 100ms
  updateUI();
}, 100);

// Fetch and display upgrades
async function getUpgrades() {
  const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades");
  const data = await response.json();

  // Replace "Cookie" with "Pizza Slice"
  const pizzaData = JSON.stringify(data).replaceAll("Cookie", "Pizza Slice");
  const pizzaUpgrades = JSON.parse(pizzaData);

  // Create upgrade buttons
  pizzaUpgrades.forEach(upgrade => {
    const button = document.createElement("button");
    button.textContent = `${upgrade.name} (+${upgrade.increase}) - ${upgrade.cost} slices`;
    button.classList.add("upgrade-btn");

    button.addEventListener("click", () => {
      if (pizzaCount >= upgrade.cost) {
        pizzaCount -= upgrade.cost;
        slicePerSecond += upgrade.increase;
        button.disabled = true;
        button.textContent = `✅ Purchased: ${upgrade.name}`;
        updateUI();
      } else {
        alert("Not enough pizza slices!");
      }
    });

    upgradesContainer.appendChild(button);
  });
}

getUpgrades();
//=======================================================
//shop upgrades
//fetch the upgrades from the API

// async function getUpgrades() {
//     const response = await fetch("https://cookie-upgrade-api.vercel.app/api/upgrades")
//     const data = await response.json();
//     console.log(data);

//   // Replace all "Cookie" with "Pizza Slice" in the entire JSON string
//     const pizzaData = JSON.stringify(data).replaceAll("Cookie", "Pizza Slice");

//   // Convert it back to a real JavaScript object/array
//     const pizzaUpgrades = JSON.parse(pizzaData);

//     console.log("Pizza Slice Upgrades:", pizzaUpgrades);
// }

// getUpgrades();

  

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