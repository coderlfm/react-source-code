
const arr = {
  id: 1,
  name: '牛肉',
  child: [
    {

      id: 2,
      name: '麻辣',
      child: [
        {

          id: 3,
          name: '蛋炒饭'
        }
      ]
    }
  ]
}

// function fn(id, data) {

//   if (data.id === id) {
//     return data.name;

//   } else if (data.child) {
//     return fn(id, data.child);

//   } else {

//     for (let index = 0; index < data.length; index++) {
//       const item = data[index];
//       if (id === item.id) {
//         return item.name
//       } else {
//         return fn(id, item.child)
//       }
//     }
//   }

// }

function fn(id, data) {

  for (let index = 0; index < data.length; index++) {
    const item = data[index];
    
    if (id === item.id) {
      return item.name
    } else {
      return fn(id, item.child)
    }
  }

}

console.log(fn(2, [arr]));