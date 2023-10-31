let input = document.querySelector("input");
let resetbtn = document.querySelector(".reset");
let selectType = document.querySelector('select');
let filtrbtn = document.querySelector(".filterbtn");
let cardscontainer = document.querySelector(".allPokemons");

resetbtn.addEventListener("click",()=>{
    window.location.reload();
})

// let fetchdata = fetch(`https://pokeapi.co/api/v2/type/`);

// let pokearray = [];

async function fetchPokemon(){
  
  for (let i=1;i<151;i++){
    let fetchdata = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let result = await fetchdata.json();
    new_data(result,i);
    // typegenerate(result);
    // fetchPokemon();
  }

}
fetchPokemon();


function new_data(pok,i){

  let contains=document.createElement("div");
  let name=pok.species.name;
  // console.log(name);

  let image=pok.sprites.front_default
  // console.log(image);

  let typesof=pok.types[0].type.name;
  console.log(typesof);

  // console.log(pok);
  let abl=""
  pok.abilities.forEach(e=>{
      abl=abl+" "+e.ability.name
  })

   contains.classList.add("outer_card");
   contains.innerHTML=
  `<div class="card_conatiner">
    <div class="front_card">
      <p class="number">#${i}</p>
      <img
        src=${image}
        alt="pokemon"
      />
      <p class="name">${name}</p>
      <p class="type">${typesof}</p>
    </div>
    <div class="backcard">
    <p class="numbe2">#${i}</p>
      <img src=${image} alt="Bulbasaur" />
      <p class="name">${name}</p>
      <p class="Abilities">Abilities:${abl}</p>
    </div>
  </div>`

  cardscontainer.appendChild(contains);

}