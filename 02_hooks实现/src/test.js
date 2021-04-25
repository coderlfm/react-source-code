function fn(args) {
  Array.prototype.slice.call(arguments,2)
  console.log(args);
}

fn(', ', 'a', 'b', 'c')