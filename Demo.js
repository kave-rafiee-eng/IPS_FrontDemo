const data = [
    { Order: 1, SlabNumber: "A4564SA", LocationX: 10, LocationY: 20, TargetX: 30, TargetY: 40, color: "#9AA7DA" , height : 20 , fontSize:"15px" },
    { Order: 2, SlabNumber: "A45SDSA", LocationX: 10, LocationY: 20, TargetX: 30, TargetY: 40, color: "#9AA7DA" , height : 20 , fontSize:"15px" },
    { Order: 3, SlabNumber: "A45FSSA", LocationX: 10, LocationY: 20, TargetX: 30, TargetY: 40, color: "#9AA7DA" , height : 20 , fontSize:"15px" },

    { Order: 4, SlabNumber: "A4564SA", LocationX: 10, LocationY: 20, TargetX: 30, TargetY: 40, color: "#203864" , height : 20 , fontSize:"15px" },


    { Order: 0, SlabNumber: "A4564SA", LocationX: 10, LocationY: 20, TargetX: 30, TargetY: 40, color: "#ffffffff" , height : 60 , fontSize:"40px" },

    { Order: -1, SlabNumber: "A4564SA", LocationX: 10, LocationY: 20, TargetX: 30, TargetY: 40, color: "#FEEE01" , height : 20 , fontSize:"15px" },

    { Order: 3, SlabNumber: "A4564SA", LocationX: 10, LocationY: 20, TargetX: 30, TargetY: 40, color: "#03AB4F" , height : 20 , fontSize:"15px" },

    { Order: 3, SlabNumber: "A4564SA", LocationX: 10, LocationY: 20, TargetX: 30, TargetY: 40, color: "#FD0003" , height : 20 , fontSize:"15px" },

];


const tbody = document.querySelector("#myTable tbody");

data.forEach(row => {
  const tr = document.createElement("tr");
  if(row.color) tr.style.backgroundColor = row.color;
  if(row.height) tr.style.height = row.height + "px";
  if(row.fontSize) tr.style.fontSize = row.fontSize;


  // اضافه کردن ستون‌ها
  const cells = [
    row.Order,
    row.SlabNumber,
    row.LocationX,
    row.LocationY,
    row.TargetX,
    row.TargetY
  ];

    cells.forEach((cellData, index) => {
    const td = document.createElement("td");

    if (index === 0 ) { // ستون SlabNumber

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
    else if (index === 1) { // ستون SlabNumber
        const div = document.createElement("div");
        div.textContent = cellData;
        div.style.backgroundColor = "black";
        div.style.color = "white";
        div.style.padding = "1px 1px"; 
        div.style.borderRadius = "4px";
        div.style.display = "inline-block";
        div.style.margin = '4px';
        td.appendChild(div);
    } else {

        td.textContent = cellData;

        if( row.color === "#ffffffff" )td.style.color = "black";
        else td.style.color = "white";
        
    }

    tr.appendChild(td);
    });

  tbody.appendChild(tr);
});