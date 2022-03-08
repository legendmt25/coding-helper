const readline = require('readline');const readLine = readline.createInterface({  input: process.stdin,  output: process.stdout,});readLine.question('', (line) => {  console.log(main(JSON.parse(`[${line}]`)));  readLine.close();});const main = (args) => {  return twoSum(args[0], args[1]);};
//returns array
const twoSum = (nums, target) => {
    let map = new Map();
    let arr = [];
    nums.forEach((el, index) => map.set(el, map.has(el) ? map.get(el).concat([index]) : [index]));
    map.forEach((val, key) => {
        if(target - key == key) {
            if(map.get(key).length > 1) {
                arr.push(map.get(key).shift(), map.get(target-key).shift());
            }
        } else if (map.has(target - key) && map.get(target - key).length > 0) {
            arr.push(map.get(key).shift(), map.get(target-key).shift());
        }
    });
    return null;
};