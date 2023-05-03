'use strict'

 export const storage = {
  saveToStorage,
  loadFromStorage,
  example,
  // number
}


function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key)
  return JSON.parse(val)
}

let number = example(10)
console.log(number);

function example(num){
  num+=10
  return num
}

// ************************************************* RONI SECTION

console.log("print('hey')", print('hey'))

function print(text) {
  console.log("text:", text)
}