// Define global variables
let array = [];
let arraySize = 50;
let barHeightScale = 6;
let speed = 1000;
let barWidth = 20;
let detaultBarColor, selectedBarColor, sortedBarColor;
let myPromise;

// Array Size Slider
var arraySizeSlider = document.getElementById("rangeSlider");
var arraySizeSliderOutput = document.getElementById("rangeSliderValue");
arraySizeSliderOutput.innerHTML = arraySizeSlider.value; // Display the default slider value
arraySizeSlider.oninput = function() {
  // Update the current slider value (each time you drag the slider handle)
  arraySizeSliderOutput.innerHTML = this.value;
}

// Scale height Slider Handler
var scaleHeightSlider = document.getElementById("rangeHeightScale");
var scaleHeightSliderOutput = document.getElementById("rangeHeightScaleValue");
scaleHeightSliderOutput.innerHTML = scaleHeightSlider.value; // Display the default slider value

scaleHeightSlider.oninput = function() {
  // Update the current slider value (each time you drag the slider handle)
  scaleHeightSliderOutput.innerHTML = this.value;
}

// Speed Slider Handler
var speedSlider = document.getElementById("rangeSpeed");
var speedSliderOutput = document.getElementById("rangeSpeedValue");
speedSliderOutput.innerHTML = speedSlider.value; // Display the default slider value

speedSlider.oninput = function() {
  // Update the current slider value (each time you drag the slider handle)
  speedSliderOutput.innerHTML = this.value;
}

// Bar Width Slider Handler
var barWidthSlider = document.getElementById("barWidth");
var barWidthSliderOutput = document.getElementById("barWidthValue");
barWidthSliderOutput.innerHTML = barWidthSlider.value; // Display the default slider value

barWidthSlider.oninput = function() {
  // Update the current slider value (each time you drag the slider handle)
  barWidthSliderOutput.innerHTML = this.value;
}



//////////////////////////////////////////////////// functions
function resetConfigurations() {
  array = [];
  arraySize = 50;
  barHeightScale = 6;
  detaultBarColor = "#00bfff";
  selectedBarColor = "#ff0026";
  sortedBarColor = "#ff7300";
  speed = 1000;
  barWidth = 20;
  
  arraySizeSlider.value = arraySize;
  arraySizeSliderOutput.innerHTML = arraySize;
  scaleHeightSlider.value = barHeightScale;
  scaleHeightSliderOutput.innerHTML = barHeightScale;
  speedSlider.value = speed;
  speedSliderOutput.innerHTML = speed;
  barWidthSlider.value = barWidth;
  barWidthSliderOutput.innerHTML = barWidth;

  document.getElementById("defaultBarColor").value = detaultBarColor;
  document.getElementById("selectedBarColor").value = selectedBarColor;
  document.getElementById("sortedBarColor").value = sortedBarColor;

}

function setGlobalVariables() {
  arraySize = arraySizeSlider.value;
  barHeightScale = scaleHeightSlider.value;
  speed = speedSlider.value;
  barWidth = barWidthSlider.value;
  detaultBarColor = document.getElementById("defaultBarColor").value;
  selectedBarColor = document.getElementById("selectedBarColor").value;
  sortedBarColor = document.getElementById("sortedBarColor").value;
}

// Buttons
let randomizeButton = document.getElementById("randomizeButton");
let solveButton = document.getElementById("solveButton");
let resetButton = document.getElementById("resetButton");

// Buttons handlers
randomizeButton.onclick = ()=> {
  setGlobalVariables();
  array = generateRandomBarsArray(arraySize, detaultBarColor);
  renderBars();
}

solveButton.onclick = ()=> {
  let selectedAlgorithm = document.getElementById("algorithmsList").value ;

  solveButton.disabled=true;
  randomizeButton.disabled=true;
  switch(selectedAlgorithm) {
      case 'BUBBLE':
          bubbleSort();
        break;
      case 'SELECTION':
          selectionSort(array);
        break;
      case 'INSERTION':
        insertionSort(array);
        break;
      default:
        bubbleSort();
  }
  
}

resetButton.onclick = ()=> {
  location.reload();
}
var bar1,bar2;
function setSelectedBars(index1,index2){
      bar1 = document.querySelectorAll(".bar")[index1];
      bar2 = document.querySelectorAll(".bar")[index2];
      bar1.style.backgroundColor = selectedBarColor; // Highlight the two columns being compared
      bar2.style.backgroundColor = selectedBarColor;
}

function resetSelectedBars(){
      bar1.style.backgroundColor = detaultBarColor; // Reset the background color of the two columns
      bar2.style.backgroundColor = detaultBarColor;
}

// Bubble Sort Algorithm
async function bubbleSort() {
  
  for (let i = 0; i < array.length - 1; i++) {
    
    for (let j = 0; j < array.length - i - 1; j++) {
      
      setSelectedBars(j,j+1);

      myPromise = await new Promise((resolve) => setTimeout(resolve, speed)); // Add a delay of 100 milliseconds

      if (array[j].value > array[j + 1].value) {
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        renderBars(); // Update the visualization after each swap
      }

      resetSelectedBars();
      
    }
    array[array.length -1 - i].sorted = true;
    if (i==array.length - 2) { // last iteration
      array[0].sorted = true;
    }
    renderBars(); 
  }
}

// Selection Sort Algorithm
async function selectionSort(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      setSelectedBars(j,minIndex)
      myPromise = await new Promise((resolve) => setTimeout(resolve, speed)); // Add a delay of 100 milliseconds

      if (arr[j].value < arr[minIndex].value) {
        minIndex = j;
      }
      resetSelectedBars();
    }
    if (minIndex !== i) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
    arr[i].sorted = true;
    if (i==array.length - 2) { // last iteration
      array[arr.length-1].sorted = true;
    }
    renderBars(); 
  }
  return arr;
}

// Insertion Sort
async function insertionSort (arr) {
  const len = arr.length
  for (let i = 1; i < len; i++) {
    let j;
    const tmp = arr[i] // Copy of the current element.

    /* Check through the sorted part and compare with the number in tmp. If large, shift the number */
    for (j = i - 1; j >= 0 ; j--) {
      setSelectedBars(j,i);
      myPromise = await new Promise((resolve) => setTimeout(resolve, speed)); // Add a delay of 100 milliseconds

      if(arr[j].value > tmp.value) {
        
        // Shift the number
        arr[j + 1] = arr[j];
        renderBars(); // Update the visualization after each swap
        resetSelectedBars();
      }
    }
    // Insert the copied number at the correct position
    // in sorted part.
    arr[j + 1] = tmp;
    arr[i].sorted=true;
    renderBars(); 
  }
}
// Render bars function
function renderBars() {
  const bars = document.getElementById("bars");
  bars.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement("div");
    bar.innerHTML = array[i].value ;
    bar.classList.add("bar");
    
    bar.style.backgroundColor = array[i].sorted ? sortedBarColor : detaultBarColor;
    bar.style.width = barWidth + "px";
    bar.style.height = array[i].value * barHeightScale + "px"; // Scale the height of the bars
    bars.appendChild(bar);
  }

  // Add a delay of 50 milliseconds between each rendering
  setTimeout(() => {
    requestAnimationFrame(() => {});
  }, 50);
}
