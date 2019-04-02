import $ from 'jquery';
import {totalPrice, MESSAGES, VendingMachine} from './vending-class'

const $MACHINE = $('#jappangi');
const $purchaseBtn = $MACHINE.find('.btn_purchase');
const $listBasket = $MACHINE.find('.wrap_basket .list_basket');
const $totalPriceElem = $MACHINE.find('.wrap_price .total_price');
const $alertElem = $MACHINE.find('.wrap_result .txt_alert');
const $chargeForm = $MACHINE.find('.form_charge');


//purchase
$purchaseBtn.on('click', (e) => {
  let $target = $(e.target),
      $parentTarget = $target.parent('.link_product'),
      name = $parentTarget.find('.tit_product').text(),
      price = parseInt($parentTarget.find('.label_price').text());

  if(price === 0){
    $alertElem.text(MESSAGES.SOLDOUT);
    return false;
  }

  let machine = new VendingMachine(name, price);
  $listBasket.append(machine.addBasket());
  $alertElem.text('');
  $totalPriceElem.text(totalPrice);
});

//cancel
$listBasket.on('click', '.btn_cancel', (e) => {
  let $target = $(e.target);
  let price = $(e.target).data('price');
  let machine = new VendingMachine('',price ,0);
  let $parentItem = $target.parent('li');

  $parentItem.remove();
  machine.removeBasket();
  $totalPriceElem.text(totalPrice);
});

//payment
$chargeForm.keypress(e =>{
  let key = e.which;
  if(key == 13){
    let charge = $(e.target).val();
    let machine = new VendingMachine('',0,charge);
    let result = machine.payCharge();

    $alertElem.text(result);
    $totalPriceElem.text(totalPrice);
    $chargeForm.val('');
    $listBasket.find('li').remove();
  }
});
