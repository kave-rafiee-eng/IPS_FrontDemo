
let weight = 0;
let F_take;
let F_put;
let weightLogic = 0;
let weightLogicEdge = 0;

function load_end(){

    startConnect();

}
window.addEventListener("load", load_end);

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateLocation(data){

  craneCircle.update( data.locX , data.locY);

  document.getElementById("locX").innerHTML = data.locX;
  document.getElementById("locY").innerHTML = data.locX;

  document.getElementById("speedX").innerHTML = data.speedX/100;
  if( Math.abs( data.speedX/100 ) > 0 )document.getElementById("speedX").style.background = "red";
  else document.getElementById("speedX").style.background = "black";

  document.getElementById("speedY").innerHTML = data.speedY/100;
  if( Math.abs( data.speedY/100 ) > 0 )document.getElementById("speedY").style.background = "red";
  else document.getElementById("speedY").style.background = "black";


 // weight = Math.floor( data.W*0.95 + weight*0.05 ) ;

  weight = data.W;
  if( weightLogic == 0 ){
    if( weight > 12000 )weightLogic=1;
  }
  else{
    if( weight < 8000 )weightLogic=0;
  }
  

  if( weightLogicEdge != weightLogic ){
    if( weightLogic == 1 && weightLogicEdge == 0 ){
      F_take = 1;
    }
    else if( weightLogic == 0 && weightLogicEdge == 1 ){
      F_put = 1;
    }
  }

  weightLogicEdge  = weightLogic;

  document.getElementById("weight").innerHTML = weight ;
  if( weightLogic == 0 ) document.getElementById("weight").style.background = "blue";
    else document.getElementById("weight").style.background = "red";

}


let tableRows = [];

class Order {
  constructor(x1, y1, x2 , y2 , slabid) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.slabid= slabid;
  }
}

class Log {
  constructor(x1, y1, x2 , y2 , slabid , status ) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.slabid= slabid;
    this.status = status;
  }
}

//-------------------------------------

const tableTest = [
  
 { Order: 1, SlabNumber: "A4564SA", LocationX: 10, LocationY: 20, TargetX: 30, TargetY: 40, color: "#9AA7DA" , height : 20 , fontSize:"15px" },
  { Order: 4, SlabNumber: "A4564SA", LocationX: 10, LocationY: 20, TargetX: 30, TargetY: 40, color: "#203864" , height : 20 , fontSize:"15px" },


  { Order: 0, SlabNumber: "A4564SA", LocationX: 10, LocationY: 20, TargetX: 30, TargetY: 40, color: "#504545ff" , height : 60 , fontSize:"40px" },

  { Order: -1, SlabNumber: "A4564SA", LocationX: 10, LocationY: 20, TargetX: 30, TargetY: 40, color: "#FEEE01" , height : 20 , fontSize:"15px" },

  { Order: 3, SlabNumber: "A4564SA", LocationX: 10, LocationY: 20, TargetX: 30, TargetY: 40, color: "#03AB4F" , height : 20 , fontSize:"15px" },

  { Order: 3, SlabNumber: "A4564SA", LocationX: 10, LocationY: 20, TargetX: 30, TargetY: 40, color: "#FD0003" , height : 20 , fontSize:"15px" },

];

function orderGen(){
  
  let cols = randomInt(1, 9);
  let row  = randomInt(1, 5);

  let colsTarget, rowTarget;

  do {
    colsTarget = randomInt(1, 9);
    rowTarget  = randomInt(1, 5);
  } while (colsTarget === cols && rowTarget === row);

  orders.push( new Order( cols*100 , row*100 , colsTarget*100 , rowTarget*100 , "sl"+randomInt( 1234 , 9999)) )

}

let orders = [];

let currentOrder = new Order( 0 , 0 , 0 , 0 , "" )
const logStatus = Object.freeze({
  RED: 0,
  GREEN: 1,
  YELLOW: 2,
});

let logs = [];

for( let i=0; i<1; i++ )orderGen();
/*orders.push( new Order( 0 , 0 , 1 , 1 , "aaa"))
orders.push( new Order( 0 , 0 , 2 , 2 , "bbb"))
orders.push( new Order( 0 , 0 , 3 , 3 , "ccc"))
orders.push( new Order( 0 , 0 , 4 , 4 , "ddd"))
*/
/*
logs.push( new Log(0,0,1,1,"sd",logStatus.RED));
logs.push( new Log(0,0,1,1,"sd",logStatus.GREEN));
logs.push( new Log(0,0,1,1,"sd",logStatus.YELLOW));
*/


function tableManage(){

  tableRows.length = 0;

  // orders
  orders.slice().reverse().forEach((order, index) => {

    if ( index == orders.length-1 ){
      tableRows.push(
          new TableRow(
              orders.length - index,
              order.slabid,
              order.x1, order.y1,
              order.x2, order.y2,
              "#203864",
              20,
              "15px"
          )
      );
    }
    else{
      tableRows.push(
          new TableRow(
              orders.length - index,
              order.slabid,
              order.x1, order.y1,
              order.x2, order.y2,
              "#9AA7DA",
              20,
              "15px"
          )
      );
    }

  });


  tableRows.push(
      new TableRow(
          "slab",
          currentOrder.slabid,
          currentOrder.x1, currentOrder.y1,
          currentOrder.x2, currentOrder.y2,
          "#ffffff",
          60,
          "40px"
      )
  );

  logs.slice().reverse().forEach((log, index) => {

    if ( log.status == logStatus.GREEN )bgColor="#03AB4F";
    else if ( log.status == logStatus.RED )bgColor="#FD0003";
    else if ( log.status == logStatus.YELLOW )bgColor="#d4c601ff";
    else bgColor="#03AB4F";

    tableRows.push(
        new TableRow(
             - index -1 ,
            log.slabid,
            log.x1, log.y1,
            log.x2, log.y2,
            bgColor,
            20,
            "15px"
        )
    );

  });

  tableShow(tableRows);

}

const timerId = setInterval(() => {
  tableManage();
}, 40);


