// Generating a Random Array of Integers
function generateRandomArray(length) {
    let arr = Array.from({length}, () => Math.floor(Math.random() * length) + 3);
    console.log(arr);
    return arr;
}

// Generating a Random Array of Integers
function generateRandomBarsArray(length) {
  let arr = Array.from({length}, () => {
    return {
      value : Math.floor(Math.random() * length) + 3,
      sorted : false
    }
    // elementValue = Math.floor(Math.random() * length) + 3;
    // elementColor = 
  });
  console.log(arr);
  return arr;
}

// Creating the bblSort function
function bubbleSort(arr){
    
    for(var i = 0; i < arr.length; i++){
       
      // Last i elements are already in place 
      for(var j = 0; j < ( arr.length - i -1 ); j++){
         
        // Checking if the item at present iteration
        // is greater than the next iteration
        if(arr[j] > arr[j+1]){
           
          // If the condition is true then swap them
          var temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j+1] = temp
        }
      }
    }
}

// Merge sort algorithm
function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}
  
function merge(left, right) {
    let result = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}
  
// Selection Sort Algorithm
function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
      }
    }
    return arr;
}
  
// Measuring the Execution Time of an Algorithm
function executionTime(algorithm, arrayLength, printSortedArr = false) {
    console.log("Execution time for " + algorithm + " : " + arrayLength + " elements")
    const arr = generateRandomArray(arrayLength);
    // Start the timer
    const start = performance.now();
  
    // Run your Algorithm here
    switch(algorithm) {
        case 'MergeSort':
            mergeSort(arr);
          break;
        case 'SelectionSort':
            selectionSort(arr);
          break;
        case 'BubbleSort':
            bubbleSort(arr);
          break;
        default:
            bubbleSort(arr);
    }
  
    // Stop the timer
    const end = performance.now();
    // Calculate the time taken in milliseconds
    const timeTaken = end - start;
    // Print the time taken to the console
    console.log(`Time taken: ${timeTaken} milliseconds`);
    
    if (printSortedArr) {
        console.log(arr);
    }
}
  
// Measure Memory Usage of an Algorithm
function memoryUsage(algorithm, arrayLength, printSortedArr = false) {
    console.log("Memory usage for " + algorithm + " : " + arrayLength + " elements")
    const arr = generateRandomArray(arrayLength);

    // Inspect the memory before
    const startMemory = process.memoryUsage().heapUsed;
  
    // Run your Algorithm here
    switch(algorithm) {
        case 'MergeSort':
            mergeSort(arr);
          break;
        case 'SelectionSort':
            selectionSort(arr);
          break;
        case 'BubbleSort':
            bubbleSort(arr);
          break;
        default:
            bubbleSort(arr);
    }
  
    // Inspect the memory After
    const endMemory = process.memoryUsage().heapUsed;
  
    // Calculate the time taken in milliseconds
    //const timeTaken = end - start;
  
    // Calculate the memory usage
    const memoryUsage = endMemory - startMemory;
  
    // Print the used memory to the console
    console.log(`Memory usage: ${memoryUsage} bytes`);
    console.log(`Memory usage: ${memoryUsage/ 1024 / 1024} MB`);

    if (printSortedArr) {
        console.log(arr);
    }
}