"use strict";

let totalPlayed = null;
let totalCash = null;
let tournamentBuyIn = 1;

const player = document.querySelector(".player-name");
const tournament = document.querySelector(".tournament-name");
const lookUpBtn = document.querySelector(".search-btn");
const table = document.querySelector(".results");

const loadJSON = () => {
  fetch('json/data.json').
    then((res) => res.json()).
      then((data) => {
        calculateWinnings(data);
        console.log({totalPlayed, totalCash, winnings: (totalCash - (totalPlayed * tournamentBuyIn)).toFixed(2)})
      }).
      catch(error => console.log(`Error: ${error}`))
}

loadJSON();

const calculateWinnings = array => {
  const tournamentCount = array.map(section => section.length).
    reduce((accLength, valLength) => accLength + valLength);
  totalPlayed = tournamentCount.toFixed(2);

  const sectionsTotalCash = array.map(section => section.reduce((accSection, valSection) => accSection + valSection)).
    reduce((acc, val) => acc + val);
  totalCash = sectionsTotalCash.toFixed(2);
}

const tableHTML = `
  <thead>
    <tr>
      <th>Player name</th>
      <th>Tournament name</th>
      <th>Total games played</th>
      <th>ITM %</th>
      <th>Total money won</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>$1.00 NL Hold'em [180 Players]</td>
      <td>191</td>
      <td>25</td>
      <td class="green">$9999</td>
    </tr>
  </tbody>
`;

function getResults(){
  (player.value !== "" && tournament.value !== "") ? console.log({player, tournament}) : console.log("Player and tournament fields must be filled");
}

lookUpBtn.addEventListener("click", getResults);