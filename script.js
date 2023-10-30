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
    for (let i=1;i<=150;i++){
        let fetchdata = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let result = await fetchdata.json();
        console.log(result);
         // let array = result.results;
         // console.log(array);
        new_data(result,i);
        typegenerate(result);
    }

}
fetchPokemon();


function new_data(pokemon,i){

  let contains=document.createElement("div");
  let name=pokemon.species.name;
  // console.log(name);

  let image=pokemon.sprites.front_default
  // console.log(image);

  let typesof=pokemon.types[0].type.name;
  console.log(typesof);

  // console.log(pokemon);
  let abl=""
  pokemon.abilities.forEach(e=>{
      abl=abl+" "+e.ability.name
  })

   // console.log(abl);
   contains.classList.add("outer_card_container");
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
      <img src=${image} alt="Bulbasaur" />
      <p class="name">${name}</p>
      <p class="Abilities">Abilities:${abl}</p>
    </div>
  </div>
    `
  cardscontainer.appendChild(contains);

}


let arrOftype=[];

function options(pokemon){
        
  let types= pokemon.types[0].type.name
       
  if(!arrOftype.includes(types)){
    arrOftype.push(`${types}`)
    let option=document.createElement("option");
    option.setAttribute("value",`${types}`);
    option.innerText=types;
    document.querySelector(".type-filter").appendChild(option) 
  }
}