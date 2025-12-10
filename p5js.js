let LocWidth = 10 * 100; // real-world scale

let craneR = 0;
let slabR = 0;
let targetR = 0;

function mapLoc(loc) {
  return map(loc, 0, LocWidth, 0, width);
}

// Circle class
class Circle {
  constructor(x, y, r , color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
  }

  show() {
    push();
    fill(this.color);
    stroke(50, 50, 50, 180);
    strokeWeight(2);
    ellipse(mapLoc(this.x), mapLoc(this.y), mapLoc(this.r) * 2);
    pop();
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }

  isInside(other) {
    let d = dist(this.x, this.y, other.x, other.y);
    return d + this.r <= other.r;
  }
}

function windowResized() {

  let container = select('#canvas-container');
  resizeCanvas(container.width-6, container.height);
}

function setup() {

  let container = select('#canvas-container');
  let cnv = createCanvas(container.width-6, container.height);
  cnv.parent(container);

  craneR = width/25;
  slabR = craneR*1.5;
  targetR = slabR*1.5;

  craneCircle = new Circle(100, 100, craneR , color( 52, 172, 224 ) );

  slabCircle = new Circle(200, 200, slabR , color(50, 50, 50) );

  targetCircle = new Circle(300, 300, targetR , color(0,0,0,100) );

}

function draw() {
  background(245); // light gray background

  let container = select('#canvas-container');

  noFill();
  stroke(0,0,0);
  strokeWeight(4);
  rect( width/2 , height/2 , width ,  height )
  // Draw guide lines


  if( currentOrder.slabid != "" ){

    targetCircle.r = targetR;

    targetCircle.update( currentOrder.x2 , currentOrder.y2 )
  
    currentOrder.x1 = craneCircle.x;
    currentOrder.y1 = craneCircle.y;

    slabCircle.update( craneCircle.x , craneCircle.y )
    // Small circle: crane
    if (craneCircle.isInside(targetCircle)) {

      drawStatus("Ready to push!", color(0, 150, 0));

      if( F_put ){ F_put=0;
        logs.push( new Log( craneCircle.x , craneCircle.y , currentOrder.x2 , currentOrder.y2 , currentOrder.slabid ,logStatus.GREEN) );

        currentOrder.x1 = 0;
        currentOrder.x2 = 0;
        currentOrder.y1 = 0;
        currentOrder.y2 = 0;
        currentOrder.slabid = "";
      }

    } else {

      if( F_put ){ F_put=0;
        logs.push( new Log( craneCircle.x , craneCircle.y , currentOrder.x2 , currentOrder.y2 , currentOrder.slabid ,logStatus.YELLOW) );

        currentOrder.x1 = 0;
        currentOrder.x2 = 0;
        currentOrder.y1 = 0;
        currentOrder.y2 = 0;
        currentOrder.slabid = "";
      }

      drawStatus("Out of target", color(180, 0, 0));

    }

  }
  else{

    targetCircle.r = 0;

    // targer = order 0
    if( orders.length == 0 ){
      slabCircle.r = 0;
    }
    else {
      slabCircle.update( orders[0].x1 , orders[0].y1 )
      slabCircle.r = slabR;
    }
    
  
    if (craneCircle.isInside(slabCircle)) {
      drawStatus("Ready to load!", color(0, 150, 0));

      if( F_take == 1 ){ F_take=0;
        currentOrder = JSON.parse(JSON.stringify( orders[0] ));
        orders.shift();
      }

      F_put=0;

    } else {

      drawStatus("Out of range", color(180, 0, 0));
      F_take=0; 
      F_put=0;

    }

  }

  //targetCircle.show();
  drawTarget();

    drawSlab();

  drawGuidelines();

  //slabCircle.show();


  if( weightLogic )craneCircle.color = color(255,0,0);
  else craneCircle.color = color(0,0,255)
  craneCircle.show();

  drawGuidCircle();

}

function drawTarget(){

  stroke(0, 0, 0, 100);
  strokeWeight(2);

  fill(0,170,0,70)

  let x = mapLoc( targetCircle.x );
  let y = mapLoc( targetCircle.y );

  rect( x , y , targetCircle.r , targetCircle.r  )

  push();
  noFill();
  stroke(50, 50, 50, 180);
  strokeWeight(2);
  //ellipse(mapLoc(slabCircle.x), mapLoc(slabCircle.y), mapLoc(slabCircle.r) * 2);
  pop();

}

// Draw horizontal and vertical guide lines
function drawGuidelines() {
  stroke(100, 100, 100, 100);
  strokeWeight(1);
  //noFill();
  fill(150,150,150,40)

  let x = mapLoc(craneCircle.x);
  let y = mapLoc(craneCircle.y);
  let r = craneCircle.r;

  rectMode(CENTER);
  rect( x-r+r/4 , height/2 , r/2, height);

    rect( x+r-r/4 , height/2 , r/2, height);

  fill(150,150,150,255)

  rect( x , y , r*2, r*2);

  strokeWeight(2);

}

function drawGuidCircle(){

  stroke(255, 255, 255, 255);
  strokeWeight(2);

  fill(255,255,255)

  let x = mapLoc(craneCircle.x);
  let y = mapLoc(craneCircle.y);
  let r = craneCircle.r;

  line(x, y, x+r/2-4, y); // vertical
  line(x, y, x-r/2+4, y); // horizontal

  line(x, y, x, y+r/2-4); // vertical
  line(x, y, x, y-r/2+4); // horizontal*/

  /*push();
  fill(0,0,0);
  stroke(0, 50);
  strokeWeight(1);
  textSize(22);
  textStyle(BOLD);
  text(Math.floor(weight/1000)+" ton", x+r, y);
  pop();*/


}

// Draw status text
function drawStatus(txt, col) {
  push();
  fill(col);
  stroke(0, 50);
  strokeWeight(1);
  textSize(22);
  textStyle(BOLD);
  text(txt, 15, 30);
  pop();
}

function drawSlab(){

  stroke(0, 0, 0, 255);
  strokeWeight(2);

  fill(0,0,0)

  let x = mapLoc( slabCircle.x );
  let y = mapLoc( slabCircle.y );

  rect( x , y , slabCircle.r , slabCircle.r*1.5  )

  push();
  noFill();
  stroke(50, 50, 50, 180);
  strokeWeight(2);
  //ellipse(mapLoc(slabCircle.x), mapLoc(slabCircle.y), mapLoc(slabCircle.r) * 2);
  pop();

}

// Move small circle with mouse
/*function mouseDragged() {

  smallCircle.update(map( mouseX, 0 , width , 0 , LocWidth ), map( mouseY, 0 , width , 0 , LocWidth ));
}*/

function mouseClicked() {
  //console.log("click")
}