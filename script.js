function renderAllDishes() {
  let dishesCardBurgerRef = document.getElementById('dishes_cards_burger');
  let dishesCardSupplementRef = document.getElementById('dishes_cards_supplement');
  let dishesCardDrinksRef = document.getElementById('dishes_cards_drinks');
  // let categories = ['burger', 'supplement', 'drinks'];

  checkIfBasketEmpty(); //check if basket empty or not

  emptyTheContainerInnerHtml(dishesCardBurgerRef, dishesCardSupplementRef, dishesCardDrinksRef);

  processDishesByCategory(dishesCardBurgerRef, dishesCardSupplementRef, dishesCardDrinksRef);

  // processDishesByCategory(categories, dishesCardBurgerRef, dishesCardSupplementRef, dishesCardDrinksRef);
  renderBasket();
}

function processDishesByCategory(dishesCardBurgerRef, dishesCardSupplementRef, dishesCardDrinksRef) {
  for (let i = 0; i < dishes.length; i++) {
    // let category = dishes[i];
    let dishesCategory = dishes[i].category;
    // let categoryMenus = category;

    for (let j = 0; j < dishes[i].menus.length; j++) {
      // let singelMenu = dishes[i].menus[j];
      let newPrice = changeThePrice(i, j);

      if (dishesCategory === 'Burger') {
        declareKeysForCategorie(i, j, dishesCategory, newPrice, dishesCardBurgerRef); // dishes for burger
      }
      if (dishesCategory === 'Supplement') {
        declareKeysForCategorie(i, j, dishesCategory, newPrice, dishesCardSupplementRef); // dishes for supplement
      }
      if (dishesCategory === 'Drinks') {
        declareKeysForCategorie(i, j, dishesCategory, newPrice, dishesCardDrinksRef); // dishes for drink
      }
    }
  }
}

function declareKeysForCategorie(i, j, dishesCategory, newPrice, idRef) {
  let nameKey = dishes[i].menus[j].name;
  let descriptionKey = dishes[i].menus[j].description;

  idRef.innerHTML += templateGeneratedDishesCardHtml(i, dishesCategory, j, newPrice, nameKey, descriptionKey);
}

// function declareKeysForCategorie(j, category, newPrice, idRef) {
//   let nameKey = category[j].name;
//   let descriptionKey = category[j].description;

//   idRef.innerHTML += templateGeneratedDishesCardHtml(j, newPrice, nameKey, descriptionKey, category);
// }

//Button Section for Basket
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
    totalPrice = Number(totalPrice) + Number(deliveryCostsValue);
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
      totalPrice = Number(totalPrice) - Number(deliveryCostsValue);
      isDeliveryCostAdded = false;
    }

    checkTotalPriceAndDeliveryCosts(); // in assets.js folder
  }

  payBtn();
}

function addDishToBasket(i, dishesCategory, j, newPrice, nameKey) {
  let newBasketDish = {
    basketCategory: dishesCategory,
    basketDishName: nameKey,
    basketDishPrice: newPrice,
    amount: 1,
  };
  // let basketIndexOf = basket.indexOf(nameKey);
  // if (basketIndexOf == -1) {
  //   basket.push(newBasketDish);
  // } else {
  //   basket.amount++;
  // }

  // let isInBasket = basket.find((meal) => meal.basketDishName == nameKey);

  // if (!isInBasket) {
  //   basket.push(newBasketDish);
  // } else {
  //   basket[j].amount++;
  // }

  if (basket == '') {
    basket.push(newBasketDish);
  } else {
    for (let index = 0; index < basket.length; index++) {
      let basketIndexOf = basket[index].basketDishName.indexOf(nameKey);
      if (basketIndexOf == -1) {
        basket.push(newBasketDish);
        break;
      } else {
        basket[index]['amount']++;
      }
    }
  }

  checkIfBasketEmpty();
  renderBasket();
}

function renderBasket() {
  let basketDishesContainerRef = document.getElementById('basket_single_dish_container');
  basketDishesContainerRef.innerHTML = '';

  for (let b = 0; b < basket.length; b++) {
    basketDishesContainerRef.innerHTML += templateGeneratedBasketHtml(b);
  }

  allrenderFunctionsForBasket();
}

function renderPrice() {
  for (let p = 0; p < basket.length; p++) {
    let basketPrice = basket[p].basketDishPrice;

    totalPrice + basketPrice;
  }
}

function payBtn() {
  let payBtnRef = document.getElementById('pay_btn');
  payBtnRef.innerHTML = `<b>Bezahlen (${totalPrice}€)</b>`;
}

function minimumOrder() {
  let minimumOrderRef = document.getElementById('minum_order');
  minimumOrderRef.innerHTML = '';
  minimumOrderRef.innerHTML += `Noch <b>${minimumOrderValue}€</b> bis der Mindestbestellwert erreicht ist`;
}

function deliveryCosts() {
  let deliveryCostsRef = document.getElementById('delivery_costs_span');
  deliveryCostsRef.innerHTML = '';
  deliveryCostsRef.innerHTML += `${deliveryCostsValue}€`;
}

function showSubtotal() {
  let subtotalSpanRef = document.getElementById('subtotal_span');
  subtotalSpanRef.innerHTML = '';
  subtotalSpanRef.innerHTML += `${subtotal}€`;
}

function showTotalPrice() {
  let totalPriceRef = document.getElementById('total_price_span');
  totalPriceRef.innerHTML = '';
  totalPriceRef.innerHTML += `<b>${totalPrice}€</b>`;
}

function allrenderFunctionsForBasket() {
  minimumOrder();
  payBtn();
  deliveryCosts();
  showSubtotal();
  showTotalPrice();
}
