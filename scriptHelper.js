// Write your helper functions here!

try {
  require("isomorphic-fetch");
} catch (e) {
  //do nothing
}

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  document.getElementById("missionTarget").innerHTML = `

                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
   `;
}

function validateInput(testInput) {
  if (testInput === "") {
    return "Empty";
  } else if (isNaN(Number(testInput))) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

function formSubmission(document, pilot, copilot, fuelLevel, cargoMass) {
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let visibile = document.querySelector("#faultyItems");
  let launchStatus = document.getElementById("launchStatus");

  if (
    validateInput(copilot.value) === "Empty" ||
    validateInput(pilot.value) === "Empty" ||
    validateInput(fuelLevel.value) === "Empty" ||
    validateInput(cargoMass.value) === "Empty"
  ) {
    alert("All input required!");
  } else if (validateInput(copilot.value) === "Is a Number") {
    alert("Make sure to enter valid information for each field!");
  } else if (validateInput(pilot.value) === "Is a Number") {
    alert("Make sure to enter valid information for each field!");
  } else if (validateInput(fuelLevel.value) === "Not a Number") {
    alert("Make sure to enter valid information for each field!");
  } else if (validateInput(cargoMass.value) === "Not a Number") {
    alert("Make sure to enter valid information for each field!");
  }

  pilotStatus.innerHTML = `${pilot.value} is ready for launch`;
  copilotStatus.innerHTML = `${copilot.value} is ready for launch`;

  if (
    Number(fuelLevel.value) < 10000 &&
    validateInput(fuelLevel.value) !== "Empty"
  ) {
    visibile.style.visibility = "visible";
    fuelStatus.innerHTML = "Not enough fuel for the journey";
    launchStatus.innerHTML = "Shuttle not ready for launch";
    launchStatus.style.color = "red";
  } else if (
    Number(cargoMass.value) > 10000 &&
    validateInput(cargoMass.value) !== "Empty"
  ) {
    visibile.style.visibility = "visible";
    cargoStatus.innerHTML = "Too much Mass for the shuttle to take off";
    launchStatus.innerHTML = "Shuttle not ready for launch";
    launchStatus.style.color = "red";
  } else if (
    Number(cargoMass.value) < 10000 &&
    Number(fuelLevel.value) > 10000 &&
    validateInput(cargoMass.value) !== "Empty" &&
    validateInput(fuelLevel.value) !== "Empty"
  ) {
    visibile.style.visibility = "visible";
    launchStatus.style.color = "green";
    launchStatus.innerHTML = "Shuttle ready for launch";
  }
}

async function myFetch() {
  let planetsReturned;

  planetsReturned = await fetch(
    "https://handlers.education.launchcode.org/static/planets.json"
  ).then(function (response) {
    if (response.status >= 400) {
      throw new Error("Bad response");
    } else {
      return response.json();
    }
  });

  return planetsReturned;
}

function pickPlanet(planets) {
  // myFetch[Math.random()*7].name;

  return planets[Math.floor(Math.random() * planets.length)];
}

try {
  module.exports.addDestinationInfo = addDestinationInfo;
  module.exports.validateInput = validateInput;
  module.exports.formSubmission = formSubmission;
  module.exports.pickPlanet = pickPlanet;
  module.exports.myFetch = myFetch;
} catch (e) {}
