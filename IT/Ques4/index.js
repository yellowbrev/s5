wrapper=document.querySelector('.wrapper');

function insertRow(i,tableStart,tableEnd ){
    
    let row=document.createElement('div');
    row.classList.add("times"+i);
    row.classList.add("eachRow");
    for (let j = tableStart; j <= tableEnd; j++) {
        let individual=document.createElement('div')
        individual.innerHTML=i*j;
        individual.classList.add("individualCell")
        row.appendChild(individual)
    }
    wrapper.appendChild(row);
}

i=1;
const tableStart=2;
const tableEnd=10;
var id=setInterval(()=>{
    insertRow(i,tableStart,tableEnd)
    i+=1;
    if(i==11){
        clearInterval(id);
    }
},1000);


