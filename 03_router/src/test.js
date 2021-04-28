const arr = [109, 4, 2, 29, 15, 22];

function sort(arr) {
  return arr.sort((a, b) => String(a) + String(b))
}
console.log(sort(arr));