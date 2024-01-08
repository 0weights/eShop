// /**
//  * @param {number[]} height
//  * @return {number}
//  */
// let height = [1,8,6,2,5,4,8,25,7];
// var maxArea = function(height) {
//   let x = {
//       idx : 0,
//       val: 0
//   }
//   let y = {
//       idx: 0,
//       val: 0
//   };
//   let first = {
//       idx : 0,
//       val: height[0]
//   }
//   let last = {
//       idx: height.length - 1,
//       val: height[height.length - 1]
//   };

//   for(let i =0; i < height.length; i++){
//       if(height[i] > x.val){
//           y.idx = x.idx;
//           y.val = x.val;
//           x.idx = i;
//           x.val = height[i];
//       }
//   }
//   let max = 0;
//   let arr = [x, y, first, last];
//   console.log(arr)
//   for(let i = 0 ; i < arr.length ; i++){
//     for(let j = i+1 ; j < arr.length ; j++){
//       console.log(arr[i], arr[j]);
//       let heightt = Math.min(arr[i].val, arr[j].val);
//       let width = Math.abs(arr[i].idx - arr[j].idx);
//       let product = width * heightt
//       max = Math.max(max, product);
//     }
//   }

//   return max;
// };

// console.log(maxArea(height));
let x = [1, 2]
for(let i = )