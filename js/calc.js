// function Calc() {
//
// }
//
// Calc.prototype = {
//   constructor: Calc,
//   add: function(a, b) {
//     return a + b;
//   }
//
// };
//
// const calc = new Calc();
// const result = calc.add(1,2);
// console.log(result);


class Calc {
  constructor(a,b){
    this.a = a;
    this.b = b;
  }

  add(){
    return this.a + this.b;
  }

  subtract(){
    return this.a - this.b;
  }

  multiply(){
    return this.a * this.b;
  }

  divide(){
    return this.a / this.b;
  }
}

//Calc를 확장해서 쓸수있는 class
class AdvanceCalc extends Calc{
  constructor(a,b){
    super(a,b);
    this.c = 10;
  }
  pow() {
    return Math.pow(this.a, this.b);
  }

  add(){
    return this.a + this.b + this.c;
  }
}

const calc = new AdvanceCalc(4,2);
console.log(calc.add());
console.log(calc.subtract());
console.log(calc.multiply());
console.log(calc.divide());
console.log(calc.pow());