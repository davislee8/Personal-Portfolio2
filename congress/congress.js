import { senators } from "../data/senators.js";
import { representatives } from "../data/representatives.js";

const allCongressMembers = [...senators, ...representatives]; // modern way to combine arrays.. like a badass

const senatorDiv = document.querySelector(".senatorsDiv");
const seniorityHeading = document.querySelector(".seniority");
const header = document.querySelector("header");

// const loyaltyList = document.querySelector('.loyaltyList')

function simplifiedSenators() {
  return senators.map((senator) => {
    const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `;
    return {
      id: senator.id,
      name: `${senator.first_name}${middleName}${senator.last_name}`,
      party: senator.party,
      gender: senator.gender,
      imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
      seniority: +senator.seniority,
      missedVotesPct: senator.missed_votes_pct,
      loyaltyPct: senator.votes_with_party_pct,
    };
  });
}

const simpleSenators = simplifiedSenators();

function populateSenatorDiv(senatorArray) {
  while (senatorDiv.firstChild) {
    senatorDiv.removeChild(senatorDiv.firstChild);
  }
  senatorArray.forEach((senator) => {
    const senFigure = document.createElement("figure");
    const figImg = document.createElement("img");
    const figCaption = document.createElement("figcaption");
    const partyAffiliation = document.createElement("h4")

    figImg.src = senator.imgURL;
    figCaption.textContent = senator.name;
    partyAffiliation.textContent = senator.party;

    senFigure.appendChild(figImg);
    senFigure.appendChild(figCaption);
    senatorDiv.appendChild(senFigure);
    senFigure.appendChild(partyAffiliation);
  });
}

populateSenatorDiv(simpleSenators);

// const mostSeniorMember = simplifiedSenators().reduce((acc, senator) => {
//     return acc.seniority > senator.seniority ? acc : senator
// })

// const biggestMissedVotesPct = simplifiedSenators().reduce((acc, senator) => acc.missedVotesPct > senator.missedVotesPct ? acc : senator)

// const biggestVacationerList = simplifiedSenators().filter(senator => senator.missedVotesPct === biggestMissedVotesPct.missedVotesPct).map(senator => senator.name).join(' and ')

// filtering Is Added Below //

console.log(simpleSenators);

const democrats = simpleSenators.filter((senators) => senators.party === "D");

const democratsButton = document.createElement("button");
democratsButton.textContent = "Democrats";
democratsButton.addEventListener("click", () => {
  populateSenatorDiv(democrats);
});

header.appendChild(democratsButton);

const republicans = simpleSenators.filter((senators) => senators.party === "R");

const republicansButton = document.createElement("button");
republicansButton.textContent = "Republicans";
republicansButton.addEventListener("click", () => {
  populateSenatorDiv(republicans);
});

header.appendChild(republicansButton);

const maleSenators = simpleSenators.filter(
  (senators) => senators.gender === "M"
);

const maleSenatorsButton = document.createElement("button");
maleSenatorsButton.textContent = "Male Senators";
maleSenatorsButton.addEventListener("click", () => {
  populateSenatorDiv(maleSenators);
});

header.appendChild(maleSenatorsButton);

const femaleSenators = simpleSenators.filter(
  (senators) => senators.gender === "F"
);

const femaleSenatorsButton = document.createElement("button");
femaleSenatorsButton.textContent = "Female Senators";
femaleSenatorsButton.addEventListener("click", () => {
  populateSenatorDiv(femaleSenators);
});

header.appendChild(femaleSenatorsButton);

const seniorityAboveEight = simpleSenators.filter(
  (senators) => senators.seniority > 8
);

const seniorityAboveEightButton = document.createElement("button");
seniorityAboveEightButton.textContent = "Senators Above 8 seniority";
seniorityAboveEightButton.addEventListener("click", () => {
  populateSenatorDiv(seniorityAboveEight);
});

header.appendChild(seniorityAboveEightButton);




const seniorityBelowEight = simpleSenators.filter(
  (senators) => senators.seniority < 8
);

const seniorityBelowEightButton = document.createElement("button");
seniorityBelowEightButton.textContent = "Senators Below 8 seniority";
seniorityBelowEightButton.addEventListener("click", () => {
  populateSenatorDiv(seniorityBelowEight);
});

header.appendChild(seniorityBelowEightButton);

