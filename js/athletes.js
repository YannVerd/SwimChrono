// ------------------constructors objects Structure-----------------
class athlete{
    
    constructor(name, categorie, comp){
        this._name = name;
        this._categorie = categorie;
        this._my_compets = [];
        this._comp = this._my_compets.push(comp); // object comp

        list_athl.push(this);
    }
    
}

class comp{
    
    constructor(compet_name, date, type_pool, tests){
        this._compet_name = compet_name;
        this._date = date;
        this._type_pool = type_pool; // type of pool (25 or 50 meters)
        this._list_tests = [];
        this._tests = this._list_tests.push(tests); //list of object test
    }

    
}

class tests{
    
    constructor(name, dist_test, times){
    this._name_test = name;
    this._dist_test = dist_test;
    this._list_times = [];
    this._times = this._list_times.push(times); // // list of object times
    }
}
class times{
    constructor(name_time, array){
        this._name_time = name_time;
        this._array = array;
    }
}

let list_athl = [];

//-------initialize for testing--------------------------------

const serie = new times("serie", []);
const mannequin = new tests("mannequin", 50, serie);
const mannequin_palme = new tests("mannequin palme", 50, serie)
const chp_france = new comp("Championnat de france", 24_10_23, 50, mannequin)
const chp_region = new comp("Championnat Régional ", 27_10_23, 25, mannequin_palme)
const Luz = new athlete("Luz", "Junior", chp_france);
const Nanou = new athlete("Nanou", "Cadette", chp_france);
chp_france.tests = mannequin_palme;
Luz._my_compets.push(chp_region);
console.log(Luz)

///--------------------- Managment of Select Option--------------------------

let mySelect_athl = document.getElementsByName('athl_select')[0];


for(i=0; i < list_athl.length; i++){
    let myOption = document.createElement('option');
    myOption.innerText = list_athl[i]._name;
    myOption.id = list_athl[i]._name;
    myOption.value = list_athl[i]._name
    myOption.className = "athl_option";
    mySelect_athl.appendChild(myOption);
}

// -----------------Display Selected Athlete's times------------------------
let myAthlDataSection = document.getElementById('datas_athl');  // get the section with datas_athl's id
let myAthl_option = document.getElementsByClassName('athl_option'); // get the value option list of the select button

    mySelect_athl.addEventListener("change", () => {
        rm_elmt("td");
        rm_elmt("tr");
        
        let n = 0; // var for retrieve the selected athlete
        for(i=0; i < list_athl.length; i++){  // search the index with de same value as the Select button
            if(mySelect_athl.value == list_athl[i]._name){
                n = i; // index that correspond at the object we would find
                
            }
        }

        //--- create table for any comp
        // loop for display a div with the title and list of test of the competion
        for(i=0; i < list_athl[n]._my_compets.length; i++){
            
            let divComp = document.createElement('div');
            let tableData = document.createElement('table');
            let row = document.createElement('tr'); // create row for display data
            let myTh = document.createElement('th'); // create cell for display compet name
            let myTitleComp = document.createElement('h2'); // title for the div od data
            let divTest = document.createElement('div'); // for div each tests
            let titleTest = document.createElement('h3'); // title of tests in div
            titleTest.style.textAlign = "center"
            
            divComp.appendChild(myTitleComp); // attch title to the div
            divComp.appendChild(divTest); 
            

            // add textint the title
            myTitleComp.innerText = list_athl[n]._name+ " - " + list_athl[n]._my_compets[i]._compet_name;                                
            // loop for display list test
            let currentComp = list_athl[n]._my_compets[i];
            
            for(j=0; j < currentComp._list_tests.length; j++){
                console.log(currentComp._list_tests[j])
                titleTest.innerText = currentComp._list_tests[j]._name_test;
                divTest.appendChild(titleTest);

                let currentTest = currentComp._list_tests[j]
                for(r= 0; r < currentTest._list_times.length; r++){
                    let row = document.createElement('tr');
                    tableData.appendChild(row)
                    let titleTime = document.createElement('td');
                    titleTime.innerText = currentTest._list_times[r]._name_time;
                    row.appendChild(titleTime);

                }
            }
            divTest.appendChild(tableData); //attach table to the divTest
            myAthlDataSection.appendChild(divComp)
        }
    });


