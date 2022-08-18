// Write your JavaScript code here!

// const { pickPlanet } = require("./scriptHelper");

// const { pickPlanet } = require("./scriptHelper");

// const { myFetch } = require("./scriptHelper");

window.addEventListener("load", function () {
  let listedPlanets;
  let listedPlanetsResponse = myFetch();
  listedPlanetsResponse
    .then(function (result) {
      listedPlanets = result;
    })
    .then(function () {
      let selectedPlanets = pickPlanet(listedPlanets);
      addDestinationInfo(
        document,
        selectedPlanets.name,
        selectedPlanets.diameter,
        selectedPlanets.star,
        selectedPlanets.distance,
        selectedPlanets.moons,
        selectedPlanets.image
      );

      let form = document.querySelector("form");

      form.addEventListener("submit", function (event) {
        event.preventDefault();

        const pilot = document.getElementsByName("pilotName")[0];
        const coPilot = document.getElementsByName("copilotName")[0];
        const fuelLevel = document.getElementsByName("fuelLevel")[0];
        const cargoMass = document.getElementsByName("cargoMass")[0];

        formSubmission(document, pilot, coPilot, fuelLevel, cargoMass);
      });
    });
});
