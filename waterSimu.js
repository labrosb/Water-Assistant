// global variables
var tapState;
var consumedAmount;
var tapFloseSpeed;
var waterVolumn;
var myTimeInterval;
var uiOutput;
var flowFactor;
// System definition
TAP_OPEN = true;
TAP_CLOSE = false;
FLOW_RATE = 0.0125;
FLUSH_RATE = 13;

// Instanitiate
window.onload = function(){
    tapState = TAP_CLOSE;
    tapFloseSpeed = 0.5;
    consumedAmount = 0;
    waterVolumn = 0;
    flowFactor = 0;
    // properties binding
    uiOutput = document.getElementById("outputRegion");

    consumptionNumber = 0;
    startTimer();
}

function startTimer(){
    if(myTimeInterval == undefined)
        myTimeInterval = setInterval(function(){ myTimer() } , 100);
    tapState = TAP_OPEN;
}

function stopTimer(){
    if(myTimeInterval != null)
    {
        clearInterval(myTimeInterval);
        console.log("Clear timer called");
        tapState = TAP_CLOSE;
        myTimeInterval = undefined;
    }
}

// Timer event function
function myTimer() {
    consumedAmount += FLOW_RATE * flowFactor;
    uiOutput.innerHTML = consumedAmount.toFixed(2);
    saveData();
}

function flushWater(){
    consumedAmount += FLUSH_RATE;  
    
    if(tapState == TAP_CLOSE)
        forceUpdate();
}

function reset(){
    consumedAmount = 0;

    if(tapState == TAP_CLOSE)
        forceUpdate();
}

function forceUpdate()
{
    document.getElementById('outputRegion').innerHTML = consumedAmount.toFixed(2);
    saveData();
}

function showCursor(obj){
    obj.innerHTML = "&#9656;" + obj.innerHTML + "&#9666;";
}

function removeCustor(obj) {
   obj.innerHTML = obj.innerHTML.substring(1, obj.innerHTML.length - 1);
}

function saveData()
{
    localStorage.setItem("ws_consumption", consumedAmount);
}