function renderDishes() {
  let dishesContainerRef = document.getElementById('dishes_container');

  for (let indexDishes = 0; indexDishes < dishes.length; indexDishes++) {
    dishesContainerRef.innerHTML += templateRenderDishesHtml(indexDishes); // in templates.js
    renderMenus(indexDishes);
  }

  checkIfBasketEmpty();
  renderBasket();
}

function renderMenus(indexDishes) {
  let dishesCardRef = document.getElementById(`dishes_card_${indexDishes}`);
  for (let indexMenus = 0; indexMenus < dishes[indexDishes].menus.length; indexMenus++) {
    let newPrice = changeThePrice(indexDishes, indexMenus); // in assets.js

    dishesCardRef.innerHTML += templateRenderMenusHtml(indexDishes, indexMenus, newPrice); // in templates.js
  }
}

function switchToDelivery() {
  let deliveryOptionRef = document.getElementById('delivery');
  let pickupOptionRef = document.getElementById('pickup');
  let deliveryCostsRef = document.getElementById('delivery_costs');
  let minimunOrderContainerRef = document.getElementById('minimum_order_container');

  if (!deliveryOptionRef.classList.contains('active')) {
    deliveryOptionRef.classList.add('active');
    pickupOptionRef.classList.remove('active');
    deliveryCostsRef.style.display = 'flex';
    minimunOrderContainerRef.style.display = 'flex';

    if (roundNewMinimumOrderComma < 0) {
      minimunOrderContainerRef.style.display = 'none';
    }
    if (isDeliveryCostAdded === true) {
      deliveryCosts = 5;
      isDeliveryCostAdded = false;
    }

    roundTotalPrice = Math.round(totalPrice * 100) / 100;
    totalPriceComma = roundTotalPrice.toFixed(2).replace('.', ',');
  }
  totalPrice = checkIfPickupOrDelivery(); // in assets.js
  checkMinimumOrderValueIsReached(newMinimumOrder); // in assets.js
  updateAllPrices();
}

function switchToPickup() {
  let deliveryOptionRef = document.getElementById('delivery');
  let pickupOptionRef = document.getElementById('pickup');
  let deliveryCostsRef = document.getElementById('delivery_costs');
  let minimunOrderContainerRef = document.getElementById('minimum_order_container');

  if (!pickupOptionRef.classList.contains('active')) {
    pickupOptionRef.classList.add('active');
    deliveryOptionRef.classList.remove('active');
    deliveryCostsRef.style.display = 'none';
    minimunOrderContainerRef.style.display = 'none';

    if (isDeliveryCostAdded === false) {
      deliveryCosts = 0;
      isDeliveryCostAdded = true;
    }
  }
  totalPrice = checkIfPickupOrDelivery(); // in assets.js
  checkMinimumOrderValueIsReached(newMinimumOrder); // in assets.js
  updateAllPrices();
}

function addMenuToBasket(indexDishes, indexMenus, newPrice) {
  let menuName = dishes[indexDishes].menus[indexMenus].name;
  let newBasketDish = {
    basketDishName: menuName,
    basketDishPrice: newPrice,
    amount: 1,
  };

  let indexAddToBasket = basket.findIndex((menu) => {
    return menu.basketDishName === newBasketDish.basketDishName;
  });

  if (indexAddToBasket === -1) {
    basket.push(newBasketDish);
  } else {
    if (basket[indexAddToBasket]['amount'] < 10) {
      basket[indexAddToBasket]['amount']++;
    }
  }

  checkIfBasketEmpty(); // in assets.js
  renderBasket();
}

function renderBasket() {
  let basketDishesContainerRef = document.getElementById('basket_single_dish_container');
  basketDishesContainerRef.innerHTML = '';

  totalPrice = 0;
  subtotal = 0;

  for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
    let basketPrice = basket[indexBasket]['basketDishPrice'];
    let basketamounts = basket[indexBasket]['amount'];

    let basketPriceComma = basketPrice.toFixed(2).replace('.', ',');
    subtotal = subtotal + basketPrice * basketamounts;
    newMinimumOrder = minimumOrder - subtotal;

    checkMinimumOrderValueIsReached(newMinimumOrder); // in assets.js
    basketDishesContainerRef.innerHTML += templateGeneratedBasketHtml(indexBasket, basketPriceComma);
  }

  totalPrice = checkIfPickupOrDelivery(); // in assets.js

  updateAllPrices();
}

function checkTotalPriceAndDeliveryCosts() {
  return totalPriceFormatted - deliveryCosts;
}

function payBtn() {
  let payBtnRef = document.getElementById('pay_btn');

  let roundPayPrice = Math.round(totalPrice * 100) / 100;
  roundPayPriceComma = roundPayPrice.toFixed(2).replace('.', ',');
  payBtnRef.innerHTML = `<b>Bezahlen (${roundPayPriceComma}€)</b>`;
}

function showMinimumOrder() {
  let minimumOrderRef = document.getElementById('minum_order');
  let roundNewMinimumOrder = Math.round(newMinimumOrder * 100) / 100;
  roundNewMinimumOrderComma = roundNewMinimumOrder.toFixed(2).replace('.', ',');
  minimumOrderRef.innerHTML = '';
  minimumOrderRef.innerHTML += `Noch <b>${roundNewMinimumOrderComma}€</b> bis der Mindestbestellwert erreicht ist`;
}

function showDeliveryCosts() {
  let deliveryCostsRef = document.getElementById('delivery_costs_span');
  deliveryCostsRef.innerHTML = '';
  deliveryCostsRef.innerHTML += `${deliveryCosts}€`;
}

function showSubtotal() {
  let subtotalSpanRef = document.getElementById('subtotal_span');
  let subtotalRound = Math.round(subtotal * 100) / 100;
  subtotalRoundComma = subtotalRound.toFixed(2).replace('.', ',');
  subtotalSpanRef.innerHTML = '';
  subtotalSpanRef.innerHTML += `${subtotalRoundComma}€`;
}

function showTotalPrice() {
  let totalPriceRef = document.getElementById('total_price_span');
  let totalPriceRound = Math.round(totalPrice * 100) / 100;
  totalPriceComma = totalPriceRound.toFixed(2).replace('.', ',');
  totalPriceRef.innerHTML = '';
  totalPriceRef.innerHTML += `<b>${totalPriceComma}€</b>`;
}

function updateAllPrices() {
  payBtn();
  showMinimumOrder();
  showDeliveryCosts();
  showSubtotal();
  showTotalPrice();
}

function orderCompleteBtn() {
  let orderCompleteRef = document.getElementById('order_complete');
  orderCompleteRef.style.display = 'flex';
}
