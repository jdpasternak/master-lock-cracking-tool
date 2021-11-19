// Possible Combinations Modal
var displayCombinationsModal = new bootstrap.Modal(
  document.getElementById("displayCombinationsModal")
);

/* 
    generateThirdNumber(array)
*/
var generateThirdNumber = (stickies) => {
  let thirdNumber;
  let digitCounts = {};
  let lastDigits = stickies.map((i) => {
    return i[i.length - 1];
  });
  let stickiesInt = stickies.map((i) => {
    return Number(i);
  });
  console.log(`stickiesInt: ${stickiesInt}`);
  lastDigits.forEach((i) => {
    if (!Object.keys(digitCounts).includes(i)) {
      digitCounts[i] = 1;
    } else {
      digitCounts[i]++;
    }
  });
  let unique;
  Object.keys(digitCounts).forEach((i) => {
    if (digitCounts[i] == 1) {
      unique = Number(i);
    }
  });
  console.log(`unique number: ${unique}`);
  stickiesInt.forEach((i) => {
    if ((i - unique) % 10 == 0) {
      console.log(`Third number: ${i}`);
      thirdNumber = i;
    }
  });
  return thirdNumber;
};

var calculateMagicNumber = (thirdNumber) => {
  return thirdNumber % 4;
};

var generateFirstNumberPossibilities = (magicNumber, thirdNumber) => {
  let firstNumberPossibilities = [];
  let workingNumber = magicNumber;
  while (workingNumber < 40 - 4) {
    workingNumber += 4;
    if (
      thirdNumber - 2 != workingNumber &&
      thirdNumber + 2 != workingNumber &&
      thirdNumber != workingNumber
    ) {
      firstNumberPossibilities.push(workingNumber);
    }
  }
  return firstNumberPossibilities;
};

var generateSecondNumberPossibilities = (magicNumber) => {
  let secondNumberPossibilities = [];
  let workingNumber;
  if (magicNumber < 2) workingNumber = magicNumber + 2;
  else workingNumber = magicNumber - 2;
  secondNumberPossibilities.push(workingNumber);
  while (workingNumber < 40 - 4) {
    workingNumber += 4;
    secondNumberPossibilities.push(workingNumber);
  }
  return secondNumberPossibilities;
};

var generateCombinations = (
  firstNumberPossibilities,
  secondNumberPossibilities,
  thirdNumber
) => {
  let count = 0;
  let combinations = [];
  firstNumberPossibilities.forEach((i) => {
    secondNumberPossibilities.forEach((j) => {
      var combo = [i, j, thirdNumber];
      combinations.push(combo);
      count++;
    });
  });

  // Feedback on how many combinations resulted
  console.log(`Reduced to ${count} possible combinations.`);
  console.log(
    `${count} combinations could take up to ${((10 * count) / 60).toFixed(
      1
    )} minutes to crack.`
  );

  return combinations;
};

// Returns an array of sticky numbers but only whole numbers
var getStickies = () => {
  var inputEls = document.querySelectorAll("input");
  var stickyNums = [];
  inputEls.forEach((i) => {
    var num = i.value;
    if (num === "" || num > 39 || num < 0) {
      // TODO: Generate a warning
      return false;
    }
    stickyNums.push(i.value);
  });
  console.log(stickyNums);

  // Iterate through inputs and return only whole numbers
  var wholeStickyNums = [];
  stickyNums.forEach((n) => {
    if (n % 1 === 0) {
      wholeStickyNums.push(n);
    }
  });
  console.log(wholeStickyNums);

  return wholeStickyNums;
};

var displayCombinations = (combinations) => {
  var possibleCombinationsEl = document
    .getElementById("possibleCombinations")
    .querySelector(".row");
  possibleCombinationsEl.innerHTML = "";
  var combinationsCounter = 0;
  combinations.forEach((c) => {
    var comboCard = document.createElement("div");
    comboCard.className = "card mb-2";
    var HTMLContent = `<div class="card-body row">
        <div class="col-6 col-sm-10 d-flex align-items-center">
          <span
            class="material-icons-outlined text-muted"
            title="Rotate Counterclockwise"
          >
            rotate_left </span
          ><span class="fs-2">${c[0]}</span>
          <span
            class="material-icons-outlined text-muted"
            title="Rotate Clockwise"
          >
            rotate_right </span
          ><span class="fs-2">${c[1]}</span>
          <span
            class="material-icons-outlined text-muted"
            title="Rotate Counterclockwise"
            > rotate_left </span>
          <span class="fs-2">${c[2]}</span>
        </div>
        <div class="col-6 col-sm-2 text-center">
          <span
            class="material-icons-outlined btn btn-success"
            data-bs-toggle="tooltip"
            title="Mark this combination as attempted"
          >
            check
          </span>
        </div>
      </div>`;
    comboCard.innerHTML = HTMLContent;
    possibleCombinationsEl.appendChild(comboCard);
    var attemptedBtn = comboCard.querySelector(".btn");
    attemptedBtn.addEventListener("click", markAttempted);
    combinationsCounter++;
  });
  console.log(`${combinationsCounter} total possible combinations`);
};

var markAttempted = (evt) => {
  console.log(evt.target.parentNode.parentNode.parentNode);
  var possibleCombinationsEl = document
    .getElementById("possibleCombinations")
    .querySelector(".row");
  var comboCard = evt.target.parentNode.parentNode.parentNode;
  possibleCombinationsEl.appendChild(comboCard);
  comboCard.classList.toggle("attempted");
  evt.target.classList.add("disabled");
};

var run = (event) => {
  event.preventDefault();

  let stickies = getStickies();
  console.log(stickies);

  let thirdNumber = generateThirdNumber(stickies);
  console.log(generateThirdNumber(stickies));
  let magicNumber = calculateMagicNumber(thirdNumber);
  let firstNumberPossibilities = generateFirstNumberPossibilities(
    magicNumber,
    thirdNumber
  );
  let secondNumberPossibilities =
    generateSecondNumberPossibilities(magicNumber);
  let combinations = generateCombinations(
    firstNumberPossibilities,
    secondNumberPossibilities,
    thirdNumber
  );
  displayCombinations(combinations);
  console.log(
    `Third number: ${thirdNumber}\nMagic Number: ${magicNumber}\nFirst Number Possibilities: ${firstNumberPossibilities}\nSecond Number Possibilities: ${secondNumberPossibilities}`
  );

  displayCombinationsModal.toggle();
};

var generateCombinationsButtonEl = document.getElementById(
  "generateCombinations"
);
generateCombinationsButtonEl.addEventListener("click", run);

// TESTING
// var dummyNum = 1;
// document.querySelectorAll("input").forEach((i) => {
//   if (dummyNum % 3 === 0 || dummyNum === 10) {
//     i.value = dummyNum;
//   } else {
//     i.value = dummyNum + 0.5;
//   }
//   dummyNum++;
// });

// displayCombinations([
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ]);
// displayCombinationsModal.toggle();
// END TESTING
