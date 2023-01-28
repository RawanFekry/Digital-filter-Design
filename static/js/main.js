let canvas = document.getElementById("realtimecanvas");
let realtimechart1 = document.getElementById("chart1");
var context = canvas.getContext('2d');
var realtimeX= 0;
var realtimeY= 0;
var n = 5001;
var time = Array.from({length: n}, (item, index) => index);
console.log(time);
// const CSV =  "https://raw.githubusercontent.com/chris3edwards3/exampledata/master/plotlyJS/line.csv";
canvas.style.background = "#ff8";
canvas.addEventListener("mousemove", mousemove);


// Get current mouse position
function mousemove(event){

    let x= event.offsetX;
    let y= event.offsetY;
    realtimeX= x;
    realtimeY= y;
    console.log(realtimeX)
    console.log(realtimeY)

}


// Plot generated signal
var time = new Date();
var data = [{
  //x: [time],
  y: [realtimeX],
  mode: 'lines',
  line: {color: '#80CAF6'}
}];
// Define Layout
var layout = {
    autosize: false,
    width: 400,
    height: 300,
    xaxis: {title: "Time()",titlefont: { size:10, color: 'black'},
        tickfont: {
            size: 10,
            color: 'black'}},
    yaxis: {
        //automargin: true,
        titlefont: { size:10, color: 'black'},
        title: "Magnitude(volt)"},
    title: {
    text:"Unfiltered Signal",
    font: {
        size: 15
    }
    }
  };
// Define config
  let config = { 
            responsive: true,
        };

Plotly.newPlot('chart1', data,layout,config);
var cnt = 0;
var interval = setInterval(function() {
  var time = new Date();
  var update = {
  y: [[realtimeX]]
  }

  Plotly.extendTraces('chart1', update, [0])

  if(++cnt === 100) clearInterval(interval);

}, 1000);




// Plot signal from csv file
// function plotFromCSV() {
//     Plotly.d3.csv(CSV, function(err, rows) {
//         console.log(rows);
//         processData(rows);
//     });
// }


// function processData(allRows) {
//     let x = [];
//     let y = [];
//     let row;

//     let i = 0;
//     while (i < allRows.length) {
//         row = allRows[i];
//         x.push(row["time"]);
//         y.push(row["magnitude"]);
//         i += 1;
//     }
    
//     console.log("X", x);
//     console.log("Y", y);

//     makePlotly(x, y);
// }


// function makePlotly(x, y) {
//     let traces = [
//         {
//             x: x,
//             y: y,
//             line: {
//                 color: "#387fba",
//                 width: 2
//             }
//         },
//     ];

//     let layout = {
//         title: "Basic Line Chart",
//         yaxis: {
//             range: [0, 100]
//         },
//         xaxis: {
//             // tickformat: "%d/%m/%y"
//         },
//     };

//     //https://plot.ly/javascript/configuration-options/
//     let config = { 
//         responsive: true,
//         // staticPlot: true,
//         // editable: true
//     };

//     Plotly.newPlot("chart1", traces, layout, config);
// }

// plotFromCSV();









   
    



// setInterval(function() {
//      Plotly.extendTraces("chart1", data , [0])
//    }, 200);
    // margin: {
    //     l: 50,
    //     r: 50,
    //     b: 100,
    //     t: 100,
    //     pad: 4
    //   },
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