function renderDishes() {
  let dishesContainerRef = document.getElementById('dishes_container');

  for (let indexDishes = 0; indexDishes < dishes.length; indexDishes++) {
    dishesContainerRef.innerHTML += templateRenderDishesHtml(indexDishes); // in templates.js
    renderMenus(indexDishes);
  }
  checkBasketEmptyRenderBasket();
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
    setDeliveryOptionActiveRef(pickupOptionRef, deliveryOptionRef, deliveryCostsRef, minimunOrderContainerRef);

    if (roundNewMinimumOrderComma < 0) {
      minimunOrderContainerRef.style.display = 'none';
    }
    if (isDeliveryCostAdded === true) {
      deliveryCosts = 5;
      isDeliveryCostAdded = false;
    }
    totalPriceRoundComma();
  }
  updateOrderDetails(newMinimumOrder);
}

function setDeliveryOptionActiveRef(pickupOptionRef, deliveryOptionRef, deliveryCostsRef, minimunOrderContainerRef) {
  deliveryOptionRef.classList.add('active');
  pickupOptionRef.classList.remove('active');
  deliveryCostsRef.style.display = 'flex';
  minimunOrderContainerRef.style.display = 'flex';
}

function switchToPickup() {
  let deliveryOptionRef = document.getElementById('delivery');
  let pickupOptionRef = document.getElementById('pickup');
  let deliveryCostsRef = document.getElementById('delivery_costs');
  let minimunOrderContainerRef = document.getElementById('minimum_order_container');

  if (!pickupOptionRef.classList.contains('active')) {
    setPickupOptionActiveRef(pickupOptionRef, deliveryOptionRef, deliveryCostsRef, minimunOrderContainerRef);

    if (isDeliveryCostAdded === false) {
      deliveryCosts = 0;
      isDeliveryCostAdded = true;
    }
  }
  updateOrderDetails(newMinimumOrder);
}

function totalPriceRoundComma() {
  roundTotalPrice = Math.round(totalPrice * 100) / 100;
  totalPriceComma = roundTotalPrice.toFixed(2).replace('.', ',');
  return totalPriceComma;
}

function updateOrderDetails() {
  totalPrice = checkIfPickupOrDelivery();
  checkMinimumOrderValueIsReached(newMinimumOrder);
  updateAllPrices();
}

function setPickupOptionActiveRef(pickupOptionRef, deliveryOptionRef, deliveryCostsRef, minimunOrderContainerRef) {
  pickupOptionRef.classList.add('active');
  deliveryOptionRef.classList.remove('active');
  deliveryCostsRef.style.display = 'none';
  minimunOrderContainerRef.style.display = 'none';
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

  checkBasketEmptyRenderBasket();
}

function renderBasket() {
  let amountIconBasketResponsiveRef = document.getElementById('amount_icon_basket_responsive');
  let totalPriceResponsiveBtnRef = document.getElementById('total_price_responsive_btn');
  let basketDishesContainerRef = document.getElementById('basket_single_dish_container');
  basketDishesContainerRef.innerHTML = '';

  setValueToZero();

  loobRenderBasketItems(basketDishesContainerRef);

  amountIconBasketResponsiveRef.innerHTML = `${totalAmount}`;

  totalPrice = checkIfPickupOrDelivery(); // in assets.js

  updateAllPrices();
  totalPriceResponsiveBtnRef.innerHTML = `${totalPriceComma}€`;
}

function loobRenderBasketItems(basketDishesContainerRef) {
  for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
    let basketPrice = basket[indexBasket]['basketDishPrice'];
    let basketamounts = basket[indexBasket]['amount'];

    let basketPriceComma = basketPrice.toFixed(2).replace('.', ',');

    calculateSubtotalNewMinumumOrder(basketPrice, basketamounts);

    totalAmount += basketamounts;

    checkMinimumOrderValueIsReached(newMinimumOrder); // in assets.js

    basketDishesContainerRef.innerHTML += templateGeneratedBasketHtml(indexBasket, basketPriceComma);
  }
}

function calcAmountPlusBasketLength(basketamounts) {
  let amountPlusBasketLength = basketamounts + basket.length;
  return amountPlusBasketLength;
}

function calculateSubtotalNewMinumumOrder(basketPrice, basketamounts) {
  subtotal = subtotal + basketPrice * basketamounts;
  newMinimumOrder = minimumOrder - subtotal;
}

function checkBasketEmptyRenderBasket() {
  checkIfBasketEmpty(); // in assets.js
  renderBasket();
}

function setValueToZero() {
  totalPrice = 0;
  subtotal = 0;
  totalAmount = 0;
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
  resetAllValuesToZero();
  deleteBasketArray();
  renderBasket();
  updateAllPrices();
  checkIfBasketEmpty();
}

function showResponsiveBasket() {
  let basketContainerRef = document.getElementById('basket_container');
  let responsiveBtnShowBasketRef = document.getElementById('responsive_btn_show_basket');
  let closeBasketBtnRef = document.getElementById('close_basket_btn');

  responsiveBtnShowBasketRef.classList.add('d-none');
  closeBasketBtnRef.style.display = 'flex';
  document.body.classList.add('no-scroll');
  basketContainerRef.classList.add('responsive-view-basket');
}

function closeBasketBtn() {
  let basketContainerRef = document.getElementById('basket_container');
  let responsiveBtnShowBasketRef = document.getElementById('responsive_btn_show_basket');
  let closeBasketBtnRef = document.getElementById('close_basket_btn');
  let orderCompleteRef = document.getElementById('order_complete');

  responsiveBtnShowBasketRef.classList.remove('d-none');
  closeBasketBtnRef.style.display = 'none';
  document.body.classList.remove('no-scroll');
  basketContainerRef.classList.remove('responsive-view-basket');
  orderCompleteRef.style.display = 'none';
}
