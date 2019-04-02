export const MESSAGES = {
  EMPTY: '구매할 물품이 없습니다.',
  SOLDOUT: '재고가 없습니다.',
  LACK: '돈이 부족합니다.',
  SUCCESS: '구매가 정상적을 처리되었습니다.'
};

let totalPrice = 0;

export class VendingMachine {
  constructor(name='', price=0, charge=0) {
    this.name = name;
    this.price = parseInt(price);
    this.charge = parseInt(charge);
  }

  addBasket() {
    this.addPrice();
    return this._addBasketTmpl(this.name, this.price);
  }

  removeBasket(){
    this.distractPrice();
  }

  resetTotalPrice(){
    totalPrice = 0;
  }

  getTotalPrice(){
    return totalPrice;
  }

  addPrice(){
    totalPrice = totalPrice + this.price;
  }

  distractPrice(){
    totalPrice = totalPrice - this.price;
  }

  payCharge(){
    let resultMsg = '';

    if(totalPrice == 0){
      resultMsg = MESSAGES.EMPTY;
    } else if(totalPrice > this.charge){
      resultMsg = `${MESSAGES.LACK}  부족한 금액: ${totalPrice - this.charge}`;
    }else{
      let change = this.charge - totalPrice;
      let changeArr = this._calChange(change);
      resultMsg = `${MESSAGES.SUCCESS} 거스름돈은 ${change} 으로 500원 ${changeArr[0]}개, 100원 ${changeArr[1]}개, 50원 ${changeArr[2]}개, 10원 ${changeArr[3]}개 입니다.`;
      this.resetTotalPrice();
    }

    return resultMsg;
  }

  _calChange(changeParam) {
    let change = changeParam;
    let changeArr = [500, 100, 50, 10];
    let result = [];

    for(var i = 0; i< changeArr.length; i++){
      result.push(Math.floor(change / changeArr[i]));
      change = change % changeArr[i];
    }
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