import $ from 'jquery';

let totalPrice = 0;

class VendingMachine {

  constructor(name, price) {
    this.name = name;
    this.price = parseInt(price);
  }

  addBasket() {
    this.addPrice();
    return this._addBasketTmpl(this.name, this.price);
  }

  addPrice(){
    totalPrice = totalPrice + this.price;
  }

  _addBasketTmpl(name, price){
    let template = `<li>
                    <span class="inner">
                     ${name} | ${price}
                    </span>
                    <button class="btn_cancel">-</button>
                   </li>`;
    return template;
  }

}

const $MACHINE = $('#jappangi');
const $purchaseBtn = $MACHINE.find('.btn_purchase');
const $wrapBasket = $MACHINE.find('.wrap_basket');
const $wrapPrice = $MACHINE.find('.wrap_price');
const $wrapResult = $MACHINE.find('.wrap_result');
const MESSAGES = {
  SOLDOUT: '재고가 없습니다.',
  LACK: '잔돈이 부족합니다.',
  SUCCESS: '구매가 정상적을 처리되었습니다.'
};

//구매
$purchaseBtn.on('click', (e) => {
  e.preventDefault();

  let $target = $(e.target),
      $parentTarget = $target.parent('.link_product'),
      name = $parentTarget.find('.tit_product').text(),
      price = parseInt($parentTarget.find('.label_price').text());

  if(price === 0){
    $wrapResult.find('.txt_alert').text(MESSAGES.SOLDOUT);
    return false;
  }

  let machine = new VendingMachine(name, price);
  $wrapBasket.find('.list_basket').append(machine.addBasket());
  $wrapPrice.find('.total_price').text(totalPrice);
  $wrapResult.find('.txt_alert').text('');
});

//장바구니 취소
