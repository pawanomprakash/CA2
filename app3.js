function displayresults(){
    let timetaken=document.getElementById("timetaken");
    let noofclicks=document.getElementById("noofclicks");

    timetaken.textContent=localStorage.getItem('timetaken')+'s';
    noofclicks.textContent=localStorage.getItem('noofclicks');
    
}
displayresults();

//winlossstatements
let lossStatements=["","",""]


