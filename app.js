//this is version 7/Final 2 of moody-kitten
//need to add feature that functionality persists through page refresh

//import { randomNumGenerator1orNeg1} from './randomNumGenerator.js';

document.getElementById('btn-add-kitten')
  .disabled = true;
document.getElementById('input-add-kitten')
  .disabled = true;



console.log("Page Refresh");

//initialize kittens


let affectionCount = undefined;
let mood = '';
let cssMoodStyle = '';









/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];


//let kittenPlayer = [];
let kittenToPlay = '';


/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */


function addKitten(event) {

  event.preventDefault();

  let form = event.target;

  console.log('Made it here');



  let kName = form.kittenName.value;
  console.log(`The name of the kitten is ${kName}`);


  let imageUrl = getKittenUrl(kName);

  console.log(imageUrl);

  loadKittens();


  //create kitten object

  let kitten =
  {
    id: generateId(),
    name: kName,
    image: imageUrl,
    mood: 'TOLERANT',
    affection: 5

  }

  console.log(`Name of the kitten: ${kitten.name}`);
  console.log(`Id of the kitten: ${kitten.id}`);
  console.log(`Url image of the kitten: ${kitten.image}`)
    ;
  console.log(`Mood of the kitten: ${kitten.mood}`);
  console.log(`Affection level of the kitten: ${kitten.affection}`);


  kittens.push(kitten);
  saveKittens();
  drawKittens();

  document.getElementById("input-add-kitten").value = "";

}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {



  window.localStorage.setItem("kittens", JSON.stringify(kittens));

}

function deleteKitten(kittenID) {
  loadKittens();

  kittens = kittens.filter(kitten => kitten.id !== kittenID);

  saveKittens();


  if (kittens.length !== 0) {
    drawKittens();
  }
  else {
    document.getElementById("kittens-list").innerHTML = null;
  }


}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {


  let storedKittens = JSON.parse(window.localStorage.getItem("kittens"));

  if (storedKittens !== null) {
    kittens = storedKittens;
  }

}
/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {

  loadKittens();

  let kittenListElement = document.getElementById('kittens-list');

  let kittenList = '';

  kittenList = kittens.map(kitten =>

    `
      <fieldset class = "fieldset-kittens">
        <div>
          <p>${kitten.name}</p>
          <img class = "img-kitten" src='${kitten.image}'>
          <span>
            <button class = "btn-play" onclick="getKittenToPlay('${kitten.id}')">Play with ${kitten.name}!
            </button>
          </span>
        </div>
        <hr/>
        <div class="delete-button">
          <label class = "label-delete">Throw <span>${kitten.name}</span> in the trash</label>
          <button class = "btn-delete-kitten" onclick = "deleteKitten('${kitten.id}')">
            <span>
              <img  class = "img-cat-trash" src = "cat_trash_can_crop.jpg">
            </span>
          </button>
        </div>
      </fieldset>
      `
  ).reduce((x, y) => x + y);

  kittenListElement.innerHTML = kittenList;

}


function getKittenToPlay(kittenID) {
  loadKittens();

  let kittenPlayer = kittens.filter(kitten => kitten.id === kittenID)

  kittenToPlay =
    `
    <fieldset class = "fieldset-kittens">
      <div>
        <p>${kittenPlayer[0].name}</p>
        <img  class = "img-kitten ${kittenPlayer[0].mood}" src='${kittenPlayer[0].image}'/>
      </div>
      <div>
        <label>Current Affection Level </label>
          <input id = "text-affection" class = "text-affection" type="text"/>
      </div>
      <div>
        <label>Current Mood</label>
        <input id = "text-mood" class = "text-mood" type = "text">
      </div>
      <hr/>
      <div>
        <button id= "btn-pet" class = "btn-pet-kitten" onclick = "pet('${kittenPlayer[0].id}')">
          <span>Pet the Kitten</span>
        </button>
      </div>
      <hr/>
      <div>
        <button id ="btn-catnip" class = "btn-pet-kitten" onclick = "catnip('${kittenPlayer[0].id}')">
          <span>Give the Kitten Some Catnip OR Reset Mood/Affection to Defaults</span>
        </button>
      </div>
      <hr/>
      <div>
        <button class = "btn-pet-kitten" onclick = "startOver()">
          <span>View the List of Kittens</span>
        </button>
      </div>
      
    </fieldset>
    `
  document.getElementById("kittens-list").innerHTML = kittenToPlay;

  document.getElementById("kittens-list").hidden = false;

  document.getElementById("text-mood").value = kittenPlayer[0].mood;

  document.getElementById("text-affection").value = kittenPlayer[0].affection;



  //need to add button with button click event
}

function pet(kittenID) {

  loadKittens();


  let kittenPlayer = kittens.filter(kitten => kitten.id === kittenID);

  affectionCount = kittenPlayer[0].affection;
  moode = kittenPlayer[0].mood;



  let oneOrNegOne = randomNumGenerator1orNeg1();

  affectionCount += oneOrNegOne;


  affection = '';

  //cssMoodStyle = 'TOLERANT';

  switch (true) {
    case affectionCount > 6:
      mood = 'HAPPY';
      cssMoodStyle = 'HAPPY';
      break;
    case affectionCount >= 4:
      mood = 'TOLERANT';
      cssMoodStyle = 'TOLERANT';
      break;
    case affectionCount > 0:
      mood = 'ANGRY';
      cssMoodStyle = 'ANGRY'
      break;
    case affectionCount <= 0:
      mood = `${kittenPlayer[0].name.toUpperCase()} RAN AWAY! QUIT OR START OVER.`
      cssMoodStyle = 'GONE';
      document.getElementById("btn-pet").hidden = true;
      document.getElementById("btn-catnip").hidden = true;
      break;

  }

  kittenPlayer[0].mood = cssMoodStyle;



  document.getElementById('text-mood').value = mood;
  document.getElementById('text-affection').value = affectionCount;


  updateKittenPlayer(kittenPlayer, mood, affectionCount);

  updateKittens(kittenPlayer, mood, affectionCount);


}

function updateKittenPlayer(kittenPlayer, mood, affectionCount) {
  console.log(`in updateKittenPlayer`);




  kittenToPlay =
    `
    <fieldset class = "fieldset-kittens">
      <div>
        <p>${kittenPlayer[0].name}</p>
        <img  class = "img-kitten ${kittenPlayer[0].mood}" src='${kittenPlayer[0].image}'/>
      </div>
      <div>
        <label>Current Affection Level </label>
          <input id = "text-affection" class = "text-affection" type="text"/>
      </div>
      <div>
        <label>Current Mood</label>
        <input id = "text-mood" class = "text-mood" type = "text">
      </div>
      <hr/>
      <div>
        <button id= "btn-pet" class = "btn-pet-kitten" onclick = "pet('${kittenPlayer[0].id}')">
          <span>Pet the Kitten</span>
        </button>
      </div>
      <hr/>
      <div>
        <button id ="btn-catnip"class = "btn-pet-kitten" onclick = "catnip('${kittenPlayer[0].id}')">
          <span>Give the Kitten Some Catnip OR Reset Mood/Affection to Defaults</span>
        </button>
      </div>
      <hr/>
      <div>
        <button class = "btn-pet-kitten" onclick = "startOver()">
          <span>View the List of Kittens</span>
        </button>
      </div>
      
    </fieldset>
    `


  document.getElementById("kittens-list").innerHTML = kittenToPlay;

  document.getElementById("text-mood").value = mood;

  document.getElementById("text-affection").value = affectionCount;

  if (affectionCount <= 0) {
    document.getElementById("btn-pet").hidden = true;
    document.getElementById("btn-catnip").hidden = true;

  }

  console.log(kittenPlayer[0].id)



}



function updateKittens(kittenPlayer, mood, affectionCount) {
  console.log(`Inside updateKittens`);
  console.log(kittenPlayer[0].id)

  let kittenToUpdate = kittens.filter(kitten => kitten.id === kittenPlayer[0].id);

  console.log(`kittenToUpdate[0].id is ${kittenToUpdate[0].id}`);

  kittens.forEach(kitten => {
    if (kitten.id === kittenToUpdate[0].id) {
      kitten.mood = kittenToUpdate[0].mood;
      kitten.affection = affectionCount;
    }
  });

  saveKittens();

}


/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(kittenID) {

  loadKittens();

  console.log(`Inside catnip`)

  console.log(kittenID);


  let kittenPlayer = kittens.filter(kitten => kitten.id === kittenID);

  console.log(kittenPlayer[0].id)

  affectionCount = 5;

  kittenPlayer[0].affection = affectionCount;
  kittenPlayer[0].mood = "TOLERANT"


  //document.getElementById('text-affection').value = affectionCount;
  //document.getElementById('text-mood').value = mood;

  kittenToPlay =
    `
    <fieldset class = "fieldset-kittens">
      <div>
        <p>${kittenPlayer[0].name}</p>
        <img  class = "img-kitten ${kittenPlayer[0].mood}" src='${kittenPlayer[0].image}'/>
      </div>
      <div>
        <label>Current Affection Level </label>
          <input id = "text-affection" class = "text-affection" type="text"/>
      </div>
      <div>
        <label>Current Mood</label>
        <input id = "text-mood" class = "text-mood" type = "text">
      </div>
      <hr/>
      <div>
        <button id= "btn-pet" class = "btn-pet-kitten" onclick = "pet('${kittenPlayer[0].id}')">
          <span>Pet the Kitten</span>
        </button>
      </div>
      <hr/>
      <div>
        <button id ="btn-catnip" class = "btn-pet-kitten" onclick = "catnip('${kittenPlayer[0].id}')">
          <span>Give the Kitten Some Catnip OR Reset Mood/Affection to Defaults</span>
        </button>
      </div>
      <hr/>
      <div>
        <button class = "btn-pet-kitten" onclick = "startOver()">
          <span>View the List of Kittens</span>
        </button>
      </div>
      
    </fieldset>
    `

  document.getElementById("kittens-list").innerHTML = kittenToPlay;
  document.getElementById('text-affection').value = affectionCount;
  document.getElementById('text-mood').value = "TOLERANT"


  updateKittens(kittenPlayer, mood, affectionCount);

}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
//function setKittenMood(kitten) { }

function getStarted() {

  document.getElementById("welcome").remove();

  document.getElementById('btn-add-kitten')
    .disabled = false;
  document.getElementById('input-add-kitten')
    .disabled = false;

  loadKittens();

  if (kittens.length !== 0) {
    drawKittens();

  }
}

function startOver() {

  if (kittens.length !== 0) {
    drawKittens();
  }

  //affectionCount = 5;
  //mood = 'TOLERANT';




}


/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );

}

function getKittenUrl(kittenname) {

  console.log(`Made it to getKittenUrl`);

  let kittenUrl = `https://robohash.org/${kittenname}?set=set4`

  console.log(kittenUrl)

  return kittenUrl;
}

/*using a 40% chance up/60% chance down*/
function randomNumGenerator1orNeg1() {
  let generatedNumber = Math.random();
  console.log(generatedNumber);

  if (generatedNumber <= 0.4) {
    return 1;
  }
  else {
    return -1;
  }


}

