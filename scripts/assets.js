window.onscroll = checkStickyPosition;

function checkStickyPosition() {
  let categories = document.getElementById('categories');
  // let links = document.getElementsByClassName('links');
  let rect = categories.getBoundingClientRect();

  if (rect.top <= 0) {
    categories.classList.add('scrolled-effect');
    // links.classList.add('scrolled-effect');
  } else {
    categories.classList.remove('scrolled-effect');
    // links.classList.remove('scrolled-effect');
  }
}

function emptyTheContainerInnerHtml(dishesCardBurgerRef, dishesCardSupplementRef, dishesCardDrinkstRef) {
  dishesCardBurgerRef.innerHTML = '';
  dishesCardSupplementRef.innerHTML = '';
  dishesCardDrinkstRef.innerHTML = '';
}

function changeThePrice(i, j) {
  let toFixedPrice = dishes[i].menus[j].singlePrice.toFixed(2);
  let newPrice = toFixedPrice.replace('.', ',');
  return newPrice;
}

// function changeThePrice(i, j, category) {
//   let toFixedPrice = dishes[i][category][j].singlePrice.toFixed(2);
//   let newPrice = toFixedPrice.replace('.', ',');
//   return newPrice;
// }

function checkTotalPriceAndDeliveryCosts() {
  if (totalPrice - deliveryCosts < 5) {
    totalPrice = 0;
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

function dishToTrash(b) {
  basket.splice(b, 1);
  renderBasket();
  checkIfBasketEmpty();
}
