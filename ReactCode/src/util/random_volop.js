//may or may not finsh this.
let fs = require('fs')
let defaultNum = 10
let numVolops = process.argv.length === 3 ? process.argv[2] : defaultNum

let addressArray = (function(){
  return fs.readFileSync('./addresses.txt','utf8').split('\n')
})()

function getNRandomArray(arr,n){
  let selected = []
  while(selected.length < n){
    let randomEle = arr[Math.floor(Math.random()*arr.length-1)]
    if(selected.indexOf(randomEle) == -1){
     selected.push(randomEle)
    }
  }
  return selected
}

let randomElements = getNRandomArray(addressArray,10)

console.log(randomElements)
