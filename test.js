import HashMap from "./hashMap.js";
import hash from "./hash.js";

const test = HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hats", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lioness", "golden");
test.set("liodfgsdsd2qwerweqfewefwness", "golden");
test.set("moon", "silver");
test.set("eAssddsssjJYyPFj=", "silsdgf");
// test.set("grape", "green");
// test.set("ice £$%cream", "white");

console.log("buckets", test.bucketsUsed());
// console.log(test.view());

// console.log(test.remove("ice cream"));
console.log("buckets", test.bucketsUsed());

// console.log(test.view());

console.log(test.length());

test.clear();
test.set("moon", "silver");
test.set("lioness", "golden");
console.log(test.view());
console.log("buckets", test.bucketsUsed());
