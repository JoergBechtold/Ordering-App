function renderAllDishes() {
  let dishesCardBurgerRef = document.getElementById('dishes_cards_burger');
  let dishesCardSupplementRef = document.getElementById('dishes_cards_supplement');
  let dishesCardDrinksRef = document.getElementById('dishes_cards_drinks');
  let categories = ['burger', 'supplement', 'drinks'];

  showNoValueInBasketScreen(); //check if basket empty or not

  emptyTheContainerInnerHtml(dishesCardBurgerRef, dishesCardSupplementRef, dishesCardDrinksRef);

  processDishesByCategory(categories, dishesCardBurgerRef, dishesCardSupplementRef, dishesCardDrinksRef);
}

function processDishesByCategory(categories, dishesCardBurgerRef, dishesCardSupplementRef, dishesCardDrinksRef) {
  for (let i = 0; i < categories.length; i++) {
    let category = categories[i];
    let categoriesMultipleContent = dishes[i][category];

    for (let j = 0; j < categoriesMultipleContent.length; j++) {
      let newPrice = changeThePrice(i, j, category);

      if (category === 'burger') {
        declareKeysForCategorie(j, categoriesMultipleContent, newPrice, dishesCardBurgerRef); // dishes for burger
      }
      if (category === 'supplement') {
        declareKeysForCategorie(j, categoriesMultipleContent, newPrice, dishesCardSupplementRef); // dishes for supplement
      }
      if (category === 'drinks') {
        declareKeysForCategorie(j, categoriesMultipleContent, newPrice, dishesCardDrinksRef); // dishes for drink
      }
    }
  }
}

function declareKeysForCategorie(j, category, newPrice, idRef) {
  let nameKey = category[j].name;
  let descriptionKey = category[j].description;

  idRef.innerHTML += templateGeneratedDishesCardHtml(j, newPrice, nameKey, descriptionKey, category);
}

//Button Section for Basket
function switchToDelivery() {
  let deliveryOption = document.getElementById('delivery');
  let pickupOption = document.getElementById('pickup');

  if (!deliveryOption.classList.contains('active')) {
    deliveryOption.classList.add('active');
    pickupOption.classList.remove('active');
  }
}

function switchToPickup() {
  let deliveryOption = document.getElementById('delivery');
  let pickupOption = document.getElementById('pickup');

  if (!pickupOption.classList.contains('active')) {
    pickupOption.classList.add('active');
    deliveryOption.classList.remove('active');
  }
}

//no value in basket
function showNoValueInBasketScreen() {
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

function addDishToBasket(newPrice, nameKey) {
  let newBasketDish = {
    basketDishName: [nameKey],
    basketDishPrice: [newPrice],
    amount: 1,
  };

  basket.push(newBasketDish);
  showNoValueInBasketScreen();
  renderBasket();
}

function renderBasket() {
  let basketDishesContainerRef = document.getElementById('basket_single_dish_container');
  basketDishesContainerRef.innerHTML = '';

  for (let b = 0; b < basket.length; b++) {
    basketDishesContainerRef.innerHTML += bla(b);
  }
}
