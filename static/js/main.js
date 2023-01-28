let canvas = document.getElementById("realtimecanvas");
var context = canvas.getContext('2d');
var realtimeX= [];
var realtimeY= [];

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