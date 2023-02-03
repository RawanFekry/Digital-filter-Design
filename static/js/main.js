let canvas = document.getElementById("realtimecanvas");
let realtimechart1 = document.getElementById("chart1");
var flag1= false;
var flag2= false;
var time= [];
var csv_x= [];
var realtimeX= [];
var realtimeY= [];
canvas.style.background = "#2f308f";
canvas.addEventListener("mousemove", mousemove);
// Define First Layout

var layout = {
    paper_bgcolor:"#f4f4f4",
    plot_bgcolor:"#f4f4f4",
    autosize: true, 
    margin: {
      l: 40,
      r: 0,
      b: 30,
      t: 30,
      pad: 0
    },
    xaxis: {title: "Time(ms)",titlefont: { size:10, color: 'black'},
        tickfont: {
            size: 10,
            color: 'black'}},
    yaxis: {
        //range: [2, 5],
        titlefont: { size:10, color: 'black' ,automargin:true},
        title: "Magnitude(volt)"},
        
    title: {
    text:"Unfiltered Signal",
    font: {
        size: 15
    }
    }
  };
// Define Second Layout
  var layout2 = {
    paper_bgcolor:"#efefef",
    plot_bgcolor:"#efefef",
    autosize: true,
    margin: {
      l: 40,
      r: 10,
      b: 30,
      t: 30,
      pad: 0
    },
    xaxis: {title: "Time(ms)",titlefont: { size:10, color: 'black'},
        tickfont: {
            size: 10,
            color: 'black'}},
    yaxis: {
        titlefont: { size:10, color: 'black'},
        title: "Magnitude(volt)"},
    title: {
    text:"Filtered Signal",
    font: {
        size: 15
    }
    }
  };
// Define config
let config = { 
    responsive: true, 
    };




// Get current mouse position
function mousemove(event){

    let x= event.offsetX;
    let y= event.offsetY;
    realtimeX.push(x);
    realtimeY.push(y);

}


// clear arrays
canvas.addEventListener("click", function(event){
    //flag2= false;
    realtimeX=[];
    realtimeY=[];
})



// Read csv file
function read_csv(){
  //flag2= true;
  var amplitude= [];
  var file= document.getElementById("csv").files[0]
  Papa.parse(file, {
      header : true,
      skipEmptyLines: true,
      complete : function(results, file) {  
          //console.log("Result", results.data)
          //console.log(results.data[0].time)
          for (i=0; i< results.data.length; i++){
              time.push(results.data[i].time);
              amplitude.push(results.data[i].amplitude);

          }
          console.log("Parsing Completed");
          realtimeX= amplitude;
          console.log(realtimeX)
        }
  });

  // Plot csv data
  var newArray= realtimeX.slice(0,29);
  Plotly.newPlot('chart1', [{
    y: newArray,
    mode: 'lines',
    line: {color: '#80CAF6'}
  }], layout, config);

  var cnt = 0;
  let i = 30;
  var interval = setInterval(function() {
    // var y = realtimeX[i]
    // newArray = newArray.concat(y)
    realtimeX.splice(0, 1)
    var data_update = {
      y: [realtimeX.slice(0,29)]
    };

    Plotly.update('chart1', data_update)
    // if(++i === 10000) clearInterval(interval);
    if(++cnt === 10000) clearInterval(interval);
  }, 1000); 


  // Plot csv filtered data
  var newArray2= realtimeX.slice(0,29);
  Plotly.newPlot('chart2', [{
    y: newArray2,
    mode: 'lines',
    line: {color: '#80CAF6'}
  }], layout2, config);

  var cnt2 = 0;
  let i2= 30;
  var interval2 = setInterval(function() {

    // var y = realtimeX[i2]
    // newArray2 = newArray2.concat(y)
    //realtimeX.splice(0, 1)

    var data_update2 = {
        y: [realtimeX]
      };

    Plotly.update('chart2', data_update2)
    //i2++;
    if(++cnt2 === 10000) clearInterval(interval2);
  }, 0.000001); 

} 




// Plot signal
Plotly.newPlot('chart1', [{
  y: realtimeX,
  mode: 'lines',
  line: {color: '#80CAF6'}
}], layout, config);

var cnt = 0;
var interval = setInterval(function() {

  realtimeX.splice(0, 1)
  var data_update = {
    y: [realtimeX]
  };

  Plotly.update('chart1', data_update)

  if(++cnt === 100) clearInterval(interval);
}, 1000); 





// Plot filtered signal
Plotly.newPlot('chart2', [{
  y: realtimeX,
  mode: 'lines',
  line: {color: '#80CAF6'}
}], layout2, config);

var cnt2 = 0;
var interval2 = setInterval(function() {

  realtimeX.splice(0, 1)

  var data_update2 = {
      y: [realtimeX]
    };

  Plotly.update('chart2', data_update2)
  if(++cnt2 === 100) clearInterval(interval2);
}, 1000); 
  




// // Plot signal from csv file
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









   
    



// var realtimeX= 0;
// var realtimeY= 0;
// var n = 5001;
// var time = Array.from({length: n}, (item, index) => index);
// console.log(time);
// const CSV =  "https://raw.githubusercontent.com/chris3edwards3/exampledata/master/plotlyJS/line.csv";



// // Plot generated signal
// var time = new Date();
// var data = [{
//   //x: [time],
//   y: [realtimeX],
//   mode: 'lines',
//   line: {color: '#80CAF6'}
// }];
// // Define Layout
// var layout = {
//     options: {
//         scales:{x: {type: 'realtime'} }
//     },
       
//     autosize: false,
//     width: 400,
//     height: 300,
//     xaxis: {title: "Time()",titlefont: { size:10, color: 'black'},
//         tickfont: {
//             size: 10,
//             color: 'black'}},
//     yaxis: {
//         //automargin: true,
//         titlefont: { size:10, color: 'black'},
//         title: "Magnitude(volt)"},
//     title: {
//     text:"Unfiltered Signal",
//     font: {
//         size: 15
//     }
//     }
//   };
// // Define config
//   let config = { 
//         responsive: true, 
//         };

// Plotly.newPlot('chart1', data,layout,config);
// var cnt = 0;
// var interval = setInterval(function() {
//   var update = {
//   y: [[realtimeX]]
//   }

//   Plotly.extendTraces('chart1', update, [0])

//   if(++cnt === 100) clearInterval(interval);

// }, 1000);
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