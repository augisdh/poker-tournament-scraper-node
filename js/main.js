"use strict";

const player = document.querySelector(".player-name");
const tournament = document.querySelector(".tournament-name");
const lookUpBtn = document.querySelector(".search-btn");
const table = document.querySelector(".results");

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