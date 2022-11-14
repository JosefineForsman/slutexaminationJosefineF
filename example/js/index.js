const BASE_URL = 'https://fathomless-shelf-54969.herokuapp.com'; // URL till APIet
const slider = document.querySelector(".slider"); // Info page about the planets
const btn = document.querySelector("button");
const section = document.querySelector('section');
const planetElems = document.querySelectorAll('figure');
const sun = document.querySelector('#Solen');
let ListOfPlanets = '';
let el='';

// This function gives me the API-KEY.
async function getKey(){
    const response = await fetch(`${BASE_URL}/keys`, { method: 'POST' });
    if (response.status === 200) {
        const data = await response.json();
        return data.key; 
      } else {
        // If something went wrong
        console.error("ERROR");
      }
}
// This function makes the sun yellow again
function makeSunYellow (){
    sun.style.backgroundColor = "#FFD029";
}
// This function toggle the slider to show and hide.
function toggleSlider() {
    slider.classList.toggle("show");
}
// This function clean the info page for the planets when next is accuring.
function updateDom(){
    section.innerHTML ='';
    el ='';
}
// Button that takes me back to homepage.
btn.addEventListener("click", () => {
    toggleSlider();
    makeSunYellow();
    });
    
    // This function gives all information about each planet and gives them an index.
    async function getPlanets(){
    const key = await getKey();
    const response = await fetch(`${BASE_URL}/bodies`, {
        method: 'GET',
        headers: {'x-zocom': key} 
    });
    
    ListOfPlanets = await response.json();
  
    for (let i =0; i<planetElems.length; i++){
        planetElems[i].addEventListener('click', async () =>{
            
            toggleSlider();
            updateDom();
            
            el =`
            <section> 
                <h1>${ListOfPlanets.bodies[i].name}</h1> 
                <h4>${ListOfPlanets.bodies[i].latinName}</h4>
                <p class="info">${ListOfPlanets.bodies[i].desc}</h4>
                <hr class="line1"/> 
                <h3 class="Omkretsrubrik">OMKRETS: </h3>
                <p class="Omkrets">${ListOfPlanets.bodies[i].circumference}</p>
                <h3 class="MaxTempRubirk">MAX TEMPERATUR: </h3>
                <p class="Maxtemperatur">${ListOfPlanets.bodies[i].temp.day}</p>
                <h3 class="MinTempRubrik">MIN TEMPERATUR: </h3>
                <p class="Mintemperatur">${ListOfPlanets.bodies[i].temp.night}</p>
                <h3 class="KilometerRubrik">KM FRÅN SOLEN: </h3>
                <p class="Kilometers">${ListOfPlanets.bodies[i].distance}</p>
                <hr class="line2"/>
                <h3 class="MoonsRubrik">MÅNAR: </h3>
                <p class="moons"></p>
            </section>`
            
            section.insertAdjacentHTML('beforeend', el);
            
            // Loop that loops out right moon to each planet in to a div.
            let moons = ListOfPlanets.bodies[i].moons
            for (let index = 0; index < moons.length; index++) {
                let moons = `<div class="moon">${ListOfPlanets.bodies[i].moons[index]}</div>`
                document.querySelector(`.moons`).insertAdjacentHTML(`beforeend`, moons)

            } // Changes the sun to right color for each planet.
            if (ListOfPlanets.bodies[i].id=== 0)
            {
                sun.style.backgroundColor = "#FFD029";
            }
            if (ListOfPlanets.bodies[i].id ===1){
                sun.style.backgroundColor = "#888888";
            }
            if (ListOfPlanets.bodies[i].id ===2){
                sun.style.backgroundColor = "#E7CDCD";
            }
            if (ListOfPlanets.bodies[i].id ===3){
                sun.style.backgroundColor = "#428ED4";
            }
            if (ListOfPlanets.bodies[i].id ===4){
                sun.style.backgroundColor = "#EF5F5F";
            }
            if (ListOfPlanets.bodies[i].id ===5){
                sun.style.backgroundColor = "#E29468";
            }
            if (ListOfPlanets.bodies[i].id ===6){
                sun.style.backgroundColor = "#C7AA72";
            }
            if (ListOfPlanets.bodies[i].id ===7){
                sun.style.backgroundColor = "#C9D4F1";
            }
            if (ListOfPlanets.bodies[i].id ===8){
                sun.style.backgroundColor = "#7A91A7";
            }
        })
        
    }
}      
getPlanets();