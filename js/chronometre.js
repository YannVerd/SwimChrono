// ------------------------DOM declare ---------------------
const myChrono = document.getElementById("chrono");
const myH1 = document.getElementsByTagName('h1')[1];
const btn_start = document.getElementById('start');
const btn_stop = document.getElementById('stop');
const btn_reset = document.getElementById('reset');
const btn_lap = document.getElementById('lap');
const btn_keep = document.getElementById('keep');
const myArt = document.getElementsByTagName('article')[0];
const myLaps = document.getElementById('list_laps');
const btn_clear = document.getElementById('clear');

// ------------------------declare variables -------------------
let list_lap = [];

let sec = 0;
let min = 0;
let hrs = 0;
let mls = 0.
let t; //for the method setInterval
let lap_on = false;

let cntr_lap = 0; //counter for event;

// --------------------------managment of time variable----------------------
function tick(){
    mls++
    if(mls >= 99){
        mls=0;
        sec++;
        if(sec >= 60){
            sec = 0;
            min++
        }
    }   
   
}
function display_mls(testedTime){ //focntion for rewrite the mls variable
    let myVar;
    if(testedTime > 9){
        myVar = testedTime;
    }else{
        myVar = "0" + testedTime;
    }
    return myVar;
}

// display
function timer(){
    tick();
    
    myH1.innerHTML= (min > 9 ? min : "0" + min)
            + ":" + (sec > 9 ? sec : "0" + sec)
            + "." + display_mls(mls);
 
}

function display_listLap(){ // display list lap
    list_lap[cntr_lap] = myH1.innerText;
    const myP = document.createElement('p');
    myP.textContent = list_lap[cntr_lap];
    myP.style.textAlign = "center";
    myP.style.width = "40%";
    myP.style.margin = "auto";
    myP.style.backgroundColor = "cadetblue";
    myChrono.appendChild(myP);
}

function rm_elmt(elmt){ // delete display's lap
    const ELMT = document.getElementsByTagName(elmt);
    
    for(i=ELMT.length - 1; i >= 0; i--){
        ELMT[i].remove();
    }
}

// ----------------------event managment----------------------------------

btn_start.addEventListener("click",() =>{
    t = setInterval(() => {timer(), 10});
    btn_start.style.display = "none";
}); 

btn_stop.addEventListener("click", () =>{
    console.log("stop");
    clearInterval(t);
    btn_start.style.display = "block";
    if(lap_on){
        btn_keep.style.display = "block";
    }
});

btn_reset.addEventListener("click", () =>{
    clearInterval(t);
    myH1.textContent = "00:00.00";
    btn_start.style.display = "block";
    btn_keep.style.display = "none";

    rm_elmt("p");

    mls = 0; sec = 0 ; min = 0; hrs = 0; cntr_lap=0; // reset variables
    list_lap = [];
    lap_on = false;
});

btn_lap.addEventListener("click", () =>{ // will be an object for athletes managment ( name ; categorie; event and time by event)
    display_listLap();
    cntr_lap++;
    
    lap_on = true;
});

btn_keep.addEventListener("click", () =>{
    const row = document.createElement('tr');
    
   
   list_lap.forEach((lap) => {
        const col = document.createElement('td');
        col.style.border = "solid black 1px";
        col.style.fontSize = "1rem";
        col.style.backgroundColor = "darkcyan";
        col.style.marginRight = "2rem";
        col.innerText = lap;
        row.appendChild(col);
   });
    myLaps.appendChild(row);

    rm_elmt("p");

});

btn_clear.addEventListener("click", () => {
    rm_elmt("tr");
    rm_elmt("td");

});


