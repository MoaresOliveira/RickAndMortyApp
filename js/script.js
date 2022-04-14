const thumbContainer = document.querySelector("body .container");
const blurDiv = document.querySelector("body .blurDiv");
const card = document.querySelector("body .card");
const cardName = card.querySelector(".name");
const cardImage = card.querySelector(".profile");
const cardInfoStatus = card.querySelector(".info .status");
const cardInfoSpecies = card.querySelector(".info .species");
const cardInfoGender = card.querySelector(".info .gender");
const cardInfoOrigin = card.querySelector(".info .origin span");
const baseUrl = "https://rickandmortyapi.com/api/character"
let next = "";


async function fetchAPI(page = null){
    let reponse = await fetch(page ==null? baseUrl : page);
    let objectJson = reponse.json();
    objectJson.then(json =>{
        thumbGenerator(json.results);
        next = json.info.next;
    });
}

async function fetchCharacter(characterUrl){
    let reponse = await fetch(characterUrl);
    let objectJson = reponse.json();
    objectJson.then(json =>{
        showCard(json);
    });
}

function loadMore(){
    fetchAPI(next);
}

function thumbGenerator(characterList){
    for(let i = 0; i < characterList.length; i++){
        let item = `<div class="item" onclick="fetchCharacter('${baseUrl+"/"+characterList[i].id}')">
                        <img src="${characterList[i].image}" width="60" alt="Character ${characterList[i].name} from the show Rick and Morty" class="thumb">
                        <h3 class="name">${characterList[i].name}</h3>
                    </div> `
        thumbContainer.innerHTML += item;
    }
}

function showCard(json){
    cardName.textContent = json.name;
    cardImage.setAttribute('src', json.image);
    cardInfoStatus.style.color = json.status == 'Alive'? '#0ff': json.status == 'Dead'? '#b00': '#ccc';
    cardInfoStatus.textContent = json.status;
    cardInfoSpecies.textContent = json.species;
    cardInfoGender.textContent = json.gender;
    cardInfoOrigin.textContent = json.origin.name;
    console.log(card.style)
    card.classList.remove("hidden")
    blurDiv.classList.remove("hidden")
}

function hide(){
    card.classList.add("hidden")
    blurDiv.classList.add("hidden")
}