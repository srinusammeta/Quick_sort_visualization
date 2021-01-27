// QuickSort Visualization
// Srinu_sammeta
// Sandeep_palla

let a = [];
let w = 12;

let states = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  a = new Array(floor(width / w));
  for (let i = 0; i < a.length; i++) {
    a[i] = random(height);
    states[i] = -1;
  }
  quickSort(a, 0, a.length - 1);
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr, start, end);
  states[index] = -1;

  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {
  for (let i = start; i < end; i++) {
    states[i] = 1;
  }

  let pivotValue = arr[end];
  let pivotIndex = start;
  states[pivotIndex] = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
      states[pivotIndex] = -1;
      pivotIndex++;
      states[pivotIndex] = 0;
    }
  }
  await swap(arr, pivotIndex, end);

  for (let i = start; i < end; i++) {
    if (i != pivotIndex) {
      states[i] = -1;
    }
  }

  return pivotIndex;
}

function draw() {
  background(0);

  for (let i = 0; i < a.length; i++) {
    noStroke();
    if (states[i] == 0) {
      fill('#8B0000');
    } else if (states[i] == 1) {
      fill('#4169E1');
    } else {
      fill('#006400');
    }
    rect(i * w, height - a[i], w, a[i]);
  }
}

async function swap(arr, a, b) {
  await sleep(50);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}