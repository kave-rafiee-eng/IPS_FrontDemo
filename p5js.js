let LocWidth = 10 * 100; // real-world scale

const craneR = 30;
const slabR = 50;
const targetR = 70;

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

function setup() {
  let container = select('#canvas-container');
  let cnv = createCanvas(container.width, container.height);
  cnv.parent(container);

  craneCircle = new Circle(100, 100, 30 , color( 52, 172, 224 ) );

  slabCircle = new Circle(200, 200, 50 , color(50, 50, 50) );

  targetCircle = new Circle(300, 300, 70 , color(245,245,245) );

}

function draw() {
  background(245); // light gray background

  // Draw guide lines
  drawGuidelines();

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

    } else {
      drawStatus("Out of range", color(180, 0, 0));
      F_take=0; 
      F_put=0;
    }

  }


  targetCircle.show();

  slabCircle.show();
  craneCircle.show();




}

// Draw horizontal and vertical guide lines
function drawGuidelines() {
  stroke(100, 100, 100, 100);
  strokeWeight(1);
  let x = mapLoc(craneCircle.x);
  let y = mapLoc(craneCircle.y);
  let r = craneCircle.r;

  rectMode(CENTER);
  rect( x , height/2 , r, height);

  //line(x, y, x, 0); // vertical
  //line(x, y, 0, y); // horizontal
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

// Move small circle with mouse
/*function mouseDragged() {

  smallCircle.update(map( mouseX, 0 , width , 0 , LocWidth ), map( mouseY, 0 , width , 0 , LocWidth ));
}*/

function mouseClicked() {
  //console.log("click")
}