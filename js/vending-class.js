export const MESSAGES = {
  EMPTY: '구매할 물품이 없습니다.',
  SOLDOUT: '재고가 없습니다.',
  LACK: '돈이 부족합니다.',
  SUCCESS: '구매가 정상적을 처리되었습니다.'
};

// export let totalPrice = 0;

export class VendingMachine {

  constructor() {
    this.name = '';
    this.price = 0;
    this.charge = 0;
    this.totalPrice = 0;
  }

  addBasket() {
    this._addPrice();
    console.log(this.totalPrice);
    return this._addBasketTmpl(this.name, this.price);
  }

  removeBasket(){
    this._distractPrice();
  }

  payCharge(){
    let resultMsg = '';

    if(this.totalPrice == 0){
      resultMsg = MESSAGES.EMPTY;
    } else if(this.totalPrice > this.charge){
      resultMsg = `${MESSAGES.LACK}  부족한 금액: ${this.totalPrice - this.charge}`;
    }else{
      let change = this.charge - this.totalPrice;
      let changeArr = this._calChange(change);
      resultMsg = `${MESSAGES.SUCCESS} 거스름돈은 ${change} 으로 500원 ${changeArr[0]}개, 100원 ${changeArr[1]}개, 50원 ${changeArr[2]}개, 10원 ${changeArr[3]}개 입니다.`;
      this._resetTotalPrice();
    }

    return resultMsg;
  }

  purchage(name, price){
      this.name = name;
      this.price = price;
  }

  _resetTotalPrice(){
    this.totalPrice = 0;
  }

  _addPrice(){
    this.totalPrice = this.totalPrice + this.price;
  }

  _distractPrice(){
    this.totalPrice = this.totalPrice - this.price;
  }

  _calChange(changeParam) {
    let change = changeParam;
    let changeArr = [500, 100, 50, 10];
    let result = [];


    changeArr.forEach(function (coin, index) {
      result.push(Math.floor(change / coin));
      change = change % coin;
    });

    return result;
  }

  _addBasketTmpl(name, price){
    let template = `<li>
                    <span class="inner">
                     ${name} | ${price}
                    </span>
                    <button class="btn_cancel" data-price="${price}">-</button>
                   </li>`;
    return template;
  }

}