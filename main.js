
function generateThirdNumber(stickies) {
    let thirdNumber;
    let digitCounts = {}
    let lastDigits = stickies.map( (i) => {
        return i[i.length-1];
    })
    // console.log(lastDigits);
    let stickiesInt = stickies.map( i => {
        return Number(i);
    })
    console.log(`stickiesInt: ${stickiesInt}`);
    lastDigits.forEach( i => {
        if (!Object.keys(digitCounts).includes(i)) {
            digitCounts[i] = 1;
        } else {
            digitCounts[i]++;
        }
    });
    let unique;
    Object.keys(digitCounts).forEach( i => {
        // console.log(`Key: ${i}, Value: ${digitCounts[i]}`);
        if (digitCounts[i] == 1) {
            // console.log(`${i} is unique`);
            unique = Number(i);
        }
    });
    console.log(`unique number: ${unique}`);
    stickiesInt.forEach( i => {
        if ((i - unique) % 10 == 0) {
            console.log(`Third number: ${i}`);
            thirdNumber = i;
        }
    });
    return thirdNumber;
}

function calculateMagicNumber(thirdNumber) {
    return thirdNumber % 4;
}

function generateFirstNumberPossibilities(magicNumber, thirdNumber) {
    let firstNumberPossibilities = [];
    let workingNumber = magicNumber;
    while (workingNumber < (40 - 4)) {
        workingNumber += 4;
        if (thirdNumber - 2 != workingNumber && thirdNumber + 2 != workingNumber && thirdNumber != workingNumber) {
            firstNumberPossibilities.push(workingNumber);
        }
    }
    return firstNumberPossibilities;
}

function generateSecondNumberPossibilities(magicNumber) {
    let secondNumberPossibilities = []
    let workingNumber;
    if (magicNumber < 2)
        workingNumber = magicNumber + 2;
    else
        workingNumber = magicNumber - 2;
    secondNumberPossibilities.push(workingNumber)
    while (workingNumber < (40 - 4)) {
        workingNumber += 4;
        secondNumberPossibilities.push(workingNumber);
    }
    return secondNumberPossibilities;
}

function generateCombinations(firstNumberPossibilities, secondNumberPossibilities, thirdNumber) {
    let count = 0;
    let combinations = []
    firstNumberPossibilities.forEach( (i) => {
        secondNumberPossibilities.forEach( (j) => {
            console.log(`${i}-${j}-${thirdNumber}`);
            combinations.push(`${i}-${j}-${thirdNumber}`);
            count++;
        });
    });
    console.log(`Reduced to ${count} possible combinations.`);
    console.log(`${count} combinations could take up to ${((10*count)/60).toFixed(1)} minutes to crack.`);
    return combinations;
}

// Sample data, using 36 for third number
let magicNumber = calculateMagicNumber(36);
let firstNumberPossibilities = generateFirstNumberPossibilities(magicNumber, 36);
let secondNumberPossibilities = generateSecondNumberPossibilities(magicNumber);
let combinations = generateCombinations(firstNumberPossibilities, secondNumberPossibilities, 36)

const comboForm = document.createElement("form");
document.querySelector("body").append(comboForm);

function displayCombinations(combinations) {
    comboForm.innerHTML = "";
    combinations.forEach( (i) => {
        const container = document.createElement("div");
        
        const combo = document.createElement("input");
        combo.setAttribute("type","checkbox");
        combo.setAttribute("value",i);
        combo.setAttribute("name",i);
        combo.setAttribute("id",i);
    
        const comboLabel = document.createElement("label");
        comboLabel.setAttribute("for", i);
        comboLabel.innerHTML = i;
    
        combo.addEventListener("change", event => {
            console.log(event.target);
            document.querySelector(`label[for="${i}"]`).parentNode.setAttribute("hidden","true");
        });
        
        container.append(combo);
        container.append(comboLabel);
        comboForm.append(container);
        
    });
}

function getStickies() {
    let stickies = document.querySelector("#stickies").value.split("\n");
    let error = document.createElement("div");
    error.className = "error";
    error.innerHTML = "Must submit exactly 12 sticky numbers!"
    error.setAttribute("display","hidden");
    document.querySelector("form").append(error)
    if (stickies.length < 12 || stickies.length > 12) {
        error.setAttribute("display","hidden")
    }
    // error.setAttribute("display","hidden");
    let temp = [];
    stickies.forEach( (i) => {
        if (!i.includes(".5")) {
            temp.push(i);
        }
    })
    // console.log(temp);
    return temp;
}

document.querySelector("button").addEventListener("click", event => {
    event.preventDefault();

    let stickies = getStickies();
    console.log(stickies);
    
    // TODO - Check for uniqueness
    
    // TODO - 
    let thirdNumber = generateThirdNumber(stickies);
    console.log(generateThirdNumber(stickies));
    let magicNumber = calculateMagicNumber(thirdNumber);
    let firstNumberPossibilities = generateFirstNumberPossibilities(magicNumber, thirdNumber);
    let secondNumberPossibilities = generateSecondNumberPossibilities(magicNumber);
    let combinations = generateCombinations(firstNumberPossibilities, secondNumberPossibilities, thirdNumber);
    displayCombinations(combinations);
    console.log(`Third number: ${thirdNumber}\nMagic Number: ${magicNumber}\nFirst Number Possibilities: ${firstNumberPossibilities}\nSecond Number Possibilities: ${secondNumberPossibilities}`)
});

// displayCombinations(combinations);