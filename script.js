console.log('Happy developing ✨')

// DICHIARAZIONE VARIABILI GLOBALI
let p = []; //ARRAY PROCESSI
let at = []; //ARRAY TEMPO DI ARRIVO
let bt = []; //ARRAY TEMPO DI BURST
let rbt = []; //ARRAY TEMPO DI BURST RIMANENTE
let pr = []; //ARRAY PRIORITÀ
function inputProcess() {
  p.push(document.getElementById("pid").value);
  at.push(parseInt(document.getElementById("arrival").value));
  bt.push(parseInt(document.getElementById("burst").value));
  pr.push(parseInt(document.getElementById("priority").value));
}

/* FUNZIONE RESET
 La tabella dei processi viene sostituita con una tabella vuota
 Il contenuto dei div relativi all'output viene cancellato
*/
function reset(){
  p = [];
at = [];
bt = [];
rbt = [];
pr = [];

   let tableEl = document.getElementById("idTable");
   let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
   let newTBodyEl = document.createElement('tbody');

   tableEl.replaceChild(newTBodyEl, oldTBodyEl);
   document.getElementById("output").style.display = "none";
}
function sortByArrival() {
  for (let i = 0; i < at.length - 1; i++) {
    for (let j = i + 1; j < at.length; j++) {
      if (at[i] > at[j]) {
        [at[i], at[j]] = [at[j], at[i]];
        [bt[i], bt[j]] = [bt[j], bt[i]];
        [p[i], p[j]] = [p[j], p[i]];
        [pr[i], pr[j]] = [pr[j], pr[i]];
      }
    }
  }
}

function start(){
   let i;
   rbt = [...bt];
   // si inseriscono nel corpo della tabella i dati dei processi 
   let tableEl = document.getElementById("idTable");
   let oldTBodyEl = tableEl.getElementsByTagName('tbody')[0];
   let newTBodyEl = document.createElement("tbody");
  sortByArrival();

   for(i=0; i<p.length; i++) {
       const trEl = newTBodyEl.insertRow();
       let tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(p[i]));
       tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(at[i]));
       tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(bt[i]));
       tdEl = trEl.insertCell();
       tdEl.id = "idP" + i;
       tdEl.appendChild(document.createTextNode(rbt[i]));
       tdEl = trEl.insertCell();
       tdEl.appendChild(document.createTextNode(pr[i]));
   }
   tableEl.replaceChild(newTBodyEl, oldTBodyEl);
   document.getElementById("output").style.display = "block";
  drawGantt();

}
function drawGantt() {
  let gantt = document.querySelector(".progress");
  gantt.innerHTML = "";

  let total = 0;
  for (let i = 0; i < bt.length; i++) total += bt[i];

  for (let i = 0; i < p.length; i++) {
    let bar = document.createElement("div");
    bar.className = "progress-bar";
    bar.style.width = (bt[i] / total * 100) + "%";
    bar.innerText = p[i];
    gantt.appendChild(bar);
  }
}





