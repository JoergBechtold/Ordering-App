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
      } else if (category === 'supplement') {
        declareKeysForCategorie(j, categoriesMultipleContent, newPrice, dishesCardSupplementRef); // dishes for supplement
      } else if (category === 'drinks') {
        declareKeysForCategorie(j, categoriesMultipleContent, newPrice, dishesCardDrinksRef); // dishes for drink
      }
    }
  }
}

function declareKeysForCategorie(j, category, newPrice, idRef) {
  let nameKey = category[j].name;
  let descriptionKey = category[j].description;

  idRef.innerHTML += templateGeneratedDishesCardHtml(j, newPrice, nameKey, descriptionKey);
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

  if (basket.dish === '') {
    noValueInBasketRef.style.display = 'flex';
  }
}

function addDishToBasket(newPrice, nameKey) {
  let newPriceForArray = newPrice.replace(',', '.');
  basket.dish.push(nameKey), basket.price.push(newPriceForArray);

  basket.totalPrice = +basket.totalPrice + +newPriceForArray;

  console.log(basket);
}
