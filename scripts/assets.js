window.onscroll = checkStickyPosition;

function checkStickyPosition() {
  let categories = document.getElementById('categories_content');
  let rect = categories.getBoundingClientRect();

  if (rect.top <= 0) {
    categories.classList.add('scrolled-effect');
  } else {
    categories.classList.remove('scrolled-effect');
  }
}

function changeThePrice(indexDishes, indexMenus) {
  let toFixedPrice = dishes[indexDishes].menus[indexMenus].singlePrice.toFixed(2);
  let newPrice = parseFloat(toFixedPrice.replace(',', '.'));
  return newPrice;
}

function checkMinimumOrderValueIsReached(newMinimumOrder) {
  let minimunOrderContainerRef = document.getElementById('minimum_order_container');
  payBtnRef = document.getElementById('pay_btn');
  if (newMinimumOrder < 0) {
    minimunOrderContainerRef.style.display = 'none';
    payBtnRef.disabled = false;
  } else {
    minimunOrderContainerRef.style.display = 'flex';
    payBtnRef.disabled = true;
  }
}

//no value in basket
function checkIfBasketEmpty() {
  let noValueInBasketRef = document.getElementById('no_value_in_basket_container');
  let basketDishesContainerRef = document.getElementById('basket_dishes_container');

  if (basket.length === 0) {
    noValueInBasketRef.style.display = 'flex';
    basketDishesContainerRef.style.display = 'none';
  } else {
    noValueInBasketRef.style.display = 'none';
    basketDishesContainerRef.style.display = 'flex';
  }
}

function plusAmount(b) {
  if (basket[b]['amount'] < 10) {
    basket[b]['amount']++;
    renderBasket();
  }
}

function minusAmount(b) {
  if (basket[b]['amount'] > 1) {
    basket[b]['amount']--;
    renderBasket();
  }
}

function dishToTrash(b) {
  basket.splice(b, 1);
  renderBasket();
  checkIfBasketEmpty();
  if (basket.length === 0) {
    totalPrice = 0;
    subtotal = 0;
    minimumOrderValue = 25.0;
  }
}

function checkIfPickuoOrDelivery() {
  return (totalPrice = subtotal + deliveryCosts);
}
