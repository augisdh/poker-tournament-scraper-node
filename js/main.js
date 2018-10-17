"use strict";

const player = document.querySelector(".player-name");
const tournament = document.querySelector(".tournament-name");
const lookUpBtn = document.querySelector(".search-btn");

function getResults(){
    (player.value !== "" && tournament.value !== "") ? console.log({player, tournament}) : console.log("Player and tournament fields must be filled");
}

lookUpBtn.addEventListener("click", getResults);