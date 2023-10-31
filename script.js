let input = document.querySelector("input");
let resetbtn = document.querySelector(".reset");
let selectType = document.querySelector('select');
let filtrbtn = document.querySelector(".filterbtn");
let cardscontainer = document.querySelector(".allPokemons");
let filtertype = document.querySelector("#filtertype");

resetbtn.addEventListener("click",()=>{
    window.location.reload();
})

// let fetchdata = fetch(`https://pokeapi.co/api/v2/type/`);



//----------------------fetching data with loop -----------------------------//
let newarray = [];
async function fetchPokemon(){
  
  for (let i=1;i<151;i++){
    let fetchdata = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let result = await fetchdata.json();
    new_data(result,i);
    typegenerate(result);
    // fetchPokemon();
  }

}
fetchPokemon();

//--------------------------create all divs for all pokemons------------------------------//
function new_data(pok,i){

  let contains=document.createElement("div");
  let name=pok.species.name;

  let image=pok.sprites.front_default
  let typesof=pok.types[0].type.name;

  let ablity=""
  pok.abilities.forEach(e=>{
    ablity=ablity+" "+e.ability.name
  })

   contains.classList.add("outer_card");
   contains.innerHTML=
  `<div class="cardConatiner">
    <div class="front_card">
      <p class="number">#${i}</p>
      <img
        src=${image}
        alt="pokemon"
        class="fimg"
      />
      <p class="name">${name}</p>
      <p class="type">${typesof}</p>
    </div>
    <div class="backcard">
    <p class="numbe2">#${i}</p>
      <img src=${image} alt="Bulbasaur" class="bimg"/>
      <p class="name">${name}</p>
      <p class="Abilities">Abilities:${ablity}</p>
    </div>
  </div>`

  cardscontainer.appendChild(contains);
  newarray.push(contains);
}

let filterarray = [];


//---------------------------------filter with searching -----------------------//
input.addEventListener("input",(e)=>{
  console.log(e.target.value);
  newarray.forEach(element => {
    finalcard=element;
    let poketype=finalcard.children[0].children[0].children[2].innerText;
    console.log(poketype);
    if (poketype.startsWith(e.target.value)){
    filterarray.push(element);
    }
  });
  cardscontainer.replaceChildren(...filterarray);
  filterarray = [];
})


let pokearray = [];
//-------------------create options in select input----------------------//
function typegenerate(pokemons){
    
  let types= pokemons.types[0].type.name
   
  if(!pokearray.includes(types)){
    pokearray.push(`${types}`)
    let selectoptn=document.createElement("option");
    selectoptn.setAttribute("value",`${types}`);
    selectoptn.innerText=types;
    filtertype.appendChild(selectoptn)
        
  }
}

//----------------------filter with types ---------------------------//

filtrbtn.addEventListener("click", (e)=>{
  e.preventDefault();
  let Sval = filtertype.value;
  // console.log(Sval);
  newarray.forEach((ele) => {
    console.log(ele);
    let findtype = ele.children[0].children[0].children[3].textContent;
    // console.log(findtype);
    if(findtype == Sval){
      filterarray.push(ele);
    }
  });
  cardscontainer.replaceChildren(...filterarray);
  filterarray = [];
})
