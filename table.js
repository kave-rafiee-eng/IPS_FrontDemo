
class TableRow {

  constructor( order , slabNumber , x1 , y1 , x2 , y2 , color , height , fontSize ){

    this.order = order;
    this.slabNumber = slabNumber;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.color = color;
    this.height = height;
    this.fontSize = fontSize;

  }
}

function applyInsetShadowHexDarker(element, hexColor, opacity = 0.4, factor = 0.8) {

    const r = parseInt(hexColor.substr(1,2),16);
    const g = parseInt(hexColor.substr(3,2),16);
    const b = parseInt(hexColor.substr(5,2),16);

    const rDark = Math.floor(r * factor);
    const gDark = Math.floor(g * factor);
    const bDark = Math.floor(b * factor);

    element.style.boxShadow = `inset 0 0 5px rgba(${rDark}, ${gDark}, ${bDark}, ${opacity})`;
}

function tableShow( data ){

  let tbody = document.querySelector("#myTable tbody");

  while (tbody.firstChild) {
    tbody.firstChild.remove();
    }

  data.forEach(row => {
    const tr = document.createElement("tr");
    if(row.color) tr.style.backgroundColor = row.color;
    if(row.height) tr.style.height = row.height + "px";
    if(row.fontSize) tr.style.fontSize = row.fontSize;

    const cells = [
      row.order,
      row.slabNumber,
      row.x1,
      row.y1,
      row.x2,
      row.y2
    ];

      cells.forEach((cellData, index) => {
      const td = document.createElement("td");

      if ( index == 0 & row.color != '#ffffff' ) {
          const div = document.createElement("div");
          //div.className = "badge bg-primary rounded-pill";
          div.textContent = cellData;
          div.style.backgroundColor = "#040677ff";
          div.style.color = "white";
          div.style.padding = "1px 10px"; 
          div.style.borderRadius = "4px";
          div.style.display = "inline-block";
          div.style.margin = '4px';
          td.appendChild(div);

      }
      else if (index == 0 & row.color == '#ffffff' ) {

          const div = document.createElement("div");
          //div.className = "badge bg-primary rounded-pill";
          div.textContent = cellData;
          div.style.backgroundColor = "#ccccccff";
          div.style.color = "black";
          div.style.fontSize = '20px';
          div.style.padding = "1px 10px"; 
          div.style.borderRadius = "4px";
          div.style.display = "inline-block";
          div.style.margin = '4px';
          td.appendChild(div);

      } 
      else if (index === 1) {
          const div = document.createElement("div");
          div.textContent = cellData;
          div.style.backgroundColor = "black";
          div.style.color = "white";
          div.style.padding = "1px 1px"; 
          div.style.borderRadius = "4px";
          div.style.display = "inline-block";
          div.style.margin = '4px';
          td.appendChild(div);
      } 
      else {

        if( row.color == '#ffffff' && cellData!= 0){
            td.textContent = cellData;
        }
        else td.textContent = '';
 
        if( row.color != '#ffffff' ){
            td.textContent = cellData;
        }
        

        if( row.color != '#ffffff')applyInsetShadowHexDarker( td , row.color , 50)
        if( row.color === "#ffffff" )td.style.color = "black";
        else td.style.color = "white";
          
      }

      tr.appendChild(td);
      });

    tbody.appendChild(tr);
  });

}
