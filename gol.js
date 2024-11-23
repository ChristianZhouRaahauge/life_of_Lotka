const rows = 50;
const cols = rows;  //for now must be quadratic

dt=0.01;    //the time step. 
alpha=1.3;  //the prey growth rate
beta=-0.5;   //the prey loss rate due to predators
gamma=-0.8; //the predator natural growth (extinction) rate
delta=0.6;  //the predator growth rate due to predation

started=false;
watch_prey=true;    //decides if the graphics should track prey or predators
//2dArrays
//first make 1d arrays, then put arrays inside them
currprey=new Array(rows);
currpredator=new Array(rows);

changeprey=new Array(rows);
changepredator=new Array(rows);

sumprey=new Array(rows);
sumpredator=new Array(rows);

barriers=new Array(rows);       //for places where there can be no animals

for (var i = 0; i <rows; i++) {     //create arrays with arrays inside, i.e. matrices
        currprey[i]=new Array(cols);
        currpredator[i]=new Array(cols);

        changeprey[i]=new Array(cols);
        changepredator[i]=new Array(cols);

        sumprey[i]=new Array(cols);
        sumpredator[i]=new Array(cols);

        barriers[i]=new Array(cols);
}


function rofs(x){    //a function to quickly handle matrix indexes that are negative or overflowing
    if (x>=0 && x<rows) {   //fine
        return x;
    }else if(x<0){  //negative
        return rows+x;
    }else if(x>=rows){  //overflowing
        return x-rows;
    }
}

function adjust(input){
    //a function to adjust alpha, beta, gamma and so forth
     switch(input){

        case 'am':
            alpha-=0.1;
            document.getElementById("avalue").innerHTML = alpha.toPrecision(3);
        break;
        case 'ap':
            alpha+=0.1;
            document.getElementById("avalue").innerHTML = alpha.toPrecision(3);
        break
        case 'bm':
            beta-=0.1;
            document.getElementById("bvalue").innerHTML = beta.toPrecision(3);
        break;
        case 'bp':
            beta+=0.1;
            document.getElementById("bvalue").innerHTML = beta.toPrecision(3);
        break;
        case 'cm':
            gamma-=0.1;
            document.getElementById("cvalue").innerHTML = gamma.toPrecision(3);
        break;
        case 'cp':
            gamma+=0.1;
            document.getElementById("cvalue").innerHTML = gamma.toPrecision(3);
        break;
        case 'dm':
            delta-=0.1;
            document.getElementById("dvalue").innerHTML = delta.toPrecision(3);
        break;
        case 'dp':
            delta+=0.1;
            document.getElementById("dvalue").innerHTML = delta.toPrecision(3);
        break;
     }
}






function clearworld(){      //clear the world and sets everything equal to zero.
    for (var i = 0; i < rows; i++) {
        for(var j=0; j< cols; j++){
            currprey[i][j]=0;
            currpredator[i][j]=0;

            changeprey[i][j]=0;
            changepredator[i][j]=0;

            sumprey[i][j]=0;
            sumpredator[i][j]=0;

            barriers[i][j]=0;
        }
    }
}

function populateworld(){   //first just a random starting point
    for (var i = 0; i < rows; i++) {
        for(var j=0; j< cols; j++){
            currprey[i][j]=Math.random()*0.4;
            currpredator[i][j]=Math.random()*0.2;

        }
    }
}

function sumpopulations(){  //notice it leaves the edges at zero
    for (var i = 0; i<rows; i++) {
        for(var j=0; j<cols; j++){
            sumprey[i][j]=0;
            sumpredator[i][j]=0;
            for(var k=-1; k<2; k++){
                for (var l=-1; l<2 ; l++){

                    sumprey[i][j]+=currprey[rofs(i+k)][rofs(j+l)];  //summing all neighbours
                    sumpredator[i][j]+=currpredator[rofs(i+k)][rofs(j+l)];
                    
                }
            }
        }
    }

    //now for the edges

}

function growth(){              //calculates growth rates and applies them
    for (var i = 0; i <rows; i++) {
        for(var j=0; j<cols; j++) {
            if(barriers[i][j]!=1){      //don't update on barriers
                changeprey[i][j]=alpha*sumprey[i][j]+beta*sumpredator[i][j]*sumprey[i][j];
                changepredator[i][j]=gamma*currpredator[i][j]*9+delta*sumpredator[i][j]*sumprey[i][j];
                currprey[i][j]+=changeprey[i][j]*dt;
                if(currprey[i][j]<0){   
                    currprey[i][j]=0;
                }
                currpredator[i][j]+=changepredator[i][j]*dt;
                    if(currpredator[i][j]<0){
                currpredator[i][j]=0;
                }
            }
        }
    }
}

function updateworld(){
    //a function which updates the colors of the world
    let cell='';
    if(watch_prey){
    for (var i=0; i<rows; i++){
        for(var j=0; j<cols; j++){
            if(barriers[i][j]!=1){
            cell=document.getElementById(i+'_'+j);
                    let q=Math.ceil(currprey[i][j]*10); //so a value of 0.345 would give a q of 3 
                    if(q>10){q=10};     //only goes to 1.0 due to color consideration

                    cell.setAttribute('class','prey'+q);
            }
                
        }
    }
    }else{
        for (var i=0; i<rows; i++){
            for(var j=0; j<cols; j++){
                if(barriers[i][j]!=1){
                    cell=document.getElementById(i+'_'+j);
                    let q=Math.ceil(currpredator[i][j]*10); //so a value of 0.2 would give q=2
                    if(q>10){q=10}
                    
                    cell.setAttribute('class','pred'+q);
                }
                
             }
        }

    }
}


function nextstep(){
    sumpopulations();
    growth();
    updateworld();
    if(started){
        timer=setTimeout(nextstep,50);
    }
    //console.log("nr 30: prey="+currprey[30][30]+", predator="+currpredator[30][30]);
}

function startstop(){

    let button=document.querySelector('#btnstartstop');

    if(!started){   //it hasn't started yet
        started=true;
        button.value="Pause the Game";
        nextstep();
    }else{
        started=false;
        button.value="Start the Game";
        clearTimeout(timer);
    }

    updateworld();
}

function resetworld(){
    clearworld();
    populateworld();
}

function shiftview(){
    let button=document.querySelector('#btnshiftview');

    if(watch_prey){
        watch_prey=false;
        button.value="Watch prey";
    }else{
        watch_prey=true;
        button.value="Watch predators";
    }

    updateworld();
}

function createWorld() {
    let world = document.querySelector('#world');
    
    let tbl = document.createElement('table');
    tbl.setAttribute('id','worldgrid');for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement('td');
            cell.setAttribute('id', i + '_' + j);
            cell.setAttribute('class', 'someprey');
            cell.addEventListener('click',cellClick);            
            tr.appendChild(cell);
        }
        tbl.appendChild(tr);
    }
    world.appendChild(tbl);
}


function cellClick() {
    let loc = this.id.split("_");
    let i = Number(loc[0]);//Get i
    let j = Number(loc[1]);//Get j// Toggle cell alive or dead

    if(barriers[i][j]==0){

        currprey[i][j]=0;
        currpredator[i][j]=0;
        barriers[i][j]=1;     //erect a barrier and remove all other life.
        
        this.setAttribute('class', 'barrier');
    }else{
        barriers[i][j]=0;
    }
    updateworld();
   
       
    
}

window.onload=()=>{
    createWorld();
    clearworld();
    populateworld();

    document.getElementById("avalue").innerHTML = alpha.toPrecision(3);
    document.getElementById("bvalue").innerHTML = beta.toPrecision(3);
    document.getElementById("cvalue").innerHTML = gamma.toPrecision(3);
    document.getElementById("dvalue").innerHTML = delta.toPrecision(3);


    
}




