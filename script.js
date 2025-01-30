function renderDishes() {
  let dishesContainerRef = document.getElementById('dishes_container');

  for (let indexDishes = 0; indexDishes < dishes.length; indexDishes++) {
    dishesContainerRef.innerHTML += templateRenderDishesHtml(indexDishes); // in templates.js
    renderMenus(indexDishes);
  }

  checkIfBasketEmpty(); //check if basket empty or not
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
    totalPriceFormatted = Number(totalPriceFormatted) + Number(deliveryCostsValue);
    isDeliveryCostAdded = true;
  }

  payBtn();
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

    if (isDeliveryCostAdded === true) {
      totalPriceFormatted = totalPrice - deliveryCostsValue;
      isDeliveryCostAdded = false;
    }

    checkTotalPriceAndDeliveryCosts(); // in assets.js folder
  }

  payBtn();
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
    basket[indexAddToBasket]['amount']++;
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
    let price = basket[indexBasket]['basketDishPrice'];
    let amounts = basket[indexBasket]['amount'];

    let priceComma = price.toFixed(2).replace('.', ',');
    let priceAsNumber = parseFloat(price.toFixed(2));

    subtotal = calculatesTotalSubtotal(priceAsNumber, amounts, subtotal);

    newMinimumOrderValue = minimumOrderValue - subtotal;

    roundNewMinimumOrderValue = Math.round(newMinimumOrderValue * 100) / 100;

    basketDishesContainerRef.innerHTML += templateGeneratedBasketHtml(indexBasket, priceComma);
  }
  totalPrice = subtotal + deliveryCostsValue;
  totalPriceFormatted = totalPrice.toFixed(2).replace(',', '.');

  allrenderFunctionsForBasket(subtotal);
}

function payBtn() {
  let payBtnRef = document.getElementById('pay_btn');
  payBtnRef.innerHTML = `<b>Bezahlen (${totalPriceFormatted}€)</b>`;
}

function minimumOrder() {
  let minimumOrderRef = document.getElementById('minum_order');

  minimumOrderRef.innerHTML = '';
  minimumOrderRef.innerHTML += `Noch <b>${roundNewMinimumOrderValue}€</b> bis der Mindestbestellwert erreicht ist`;
}

function deliveryCosts() {
  let deliveryCostsRef = document.getElementById('delivery_costs_span');
  deliveryCostsRef.innerHTML = '';
  deliveryCostsRef.innerHTML += `${deliveryCostsValue}€`;
}

function showSubtotal(subtotal) {
  showSubtotalRounder = Math.round(subtotal * 100) / 100;
  let subtotalSpanRef = document.getElementById('subtotal_span');
  subtotalSpanRef.innerHTML = '';
  subtotalSpanRef.innerHTML += `${showSubtotalRounder}€`;
}

function showTotalPrice() {
  let totalPriceRef = document.getElementById('total_price_span');
  totalPriceRef.innerHTML = '';
  totalPriceRef.innerHTML += `<b>${totalPriceFormatted}€</b>`;
}

function allrenderFunctionsForBasket(subtotal) {
  minimumOrder();
  payBtn();
  deliveryCosts();
  checkMinimumOrderValueIsReached();
  showSubtotal(subtotal);
  showTotalPrice();
}

function orderCompleteBtn() {
  let orderCompleteRef = document.getElementById('order_complete');
  orderCompleteRef.style.display = 'flex';
}
