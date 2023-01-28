let canvas = document.getElementById("realtimecanvas");
let realtimechart1 = document.getElementById("chart1");
let realtimechart2 = document.getElementById("chart2");
var context = canvas.getContext('2d');
var realtimeX= [];
var realtimeY= [];
// const CSV =  "https://raw.githubusercontent.com/chris3edwards3/exampledata/master/plotlyJS/line.csv";
canvas.style.background = "#ff8";
canvas.addEventListener("mousemove", mousemove);

function mousemove(event){

    let x= event.offsetX;
    let y= event.offsetY;
    realtimeX.push(x);
    realtimeY.push(y);
    console.log(realtimeX)
    console.log(realtimeY)

}



function plotFromCSV() {
    Plotly.d3.csv(CSV, function(err, rows) {
        console.log(rows);
        processData(rows);
    });
}


function processData(allRows) {
    let x = [];
    let y1 = [];
    let y2 = [];
    let row;

    let i = 0;
    while (i < allRows.length) {
        row = allRows[i];
        x.push(row["time"]);
        y.push(row["magnitude"]);
        i += 1;
    }
    
    console.log("X", x);
    console.log("Y", y);

    makePlotly(x, y);
}


function makePlotly(x, y) {
    let traces = [
        {
            x: x,
            y: y,
            name: "A",
            line: {
                color: "#387fba",
                width: 2
            }
        },
    ];

    let layout = {
        title: "Basic Line Chart",
        yaxis: {
            range: [0, 100]
        },
        xaxis: {
            // tickformat: "%d/%m/%y"
        },
    };

    //https://plot.ly/javascript/configuration-options/
    let config = { 
        responsive: true,
        // staticPlot: true,
        // editable: true
    };

    Plotly.newPlot(realtimechart1, traces, layout, config);
}

plotFromCSV();






setInterval(function() {
    Plotly.extendTraces(realtimechart1, [{y: realtimeX}] , [0])
  }, 200);



   
    




// window_width = window.innerWidth;
// window_height = window.innerHeight;
// var window_width = 200;
// var window_height = 80;
// canvas.width = window_width;
// canvas.height = window_height;
// canvas.addEventListener("click", function(event){
//     let x= event.offsetX;
//     let y= event.offsetY;
//     realtimeX.push(x);
//     realtimeY.push(y);
// })