function renderAllDishes() {
  let dishesCardBurgerRef = document.getElementById('dishes_cards_burger');
  let dishesCardSupplementRef = document.getElementById('dishes_cards_supplement');
  let dishesCardDrinksRef = document.getElementById('dishes_cards_drinks');
  let categories = ['burger', 'supplement', 'drinks'];

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

function declareKeysForCategorie(j, categorie, newPrice, idRef) {
  let nameKey = categorie[j].name;
  let descriptionKey = categorie[j].description;

  idRef.innerHTML += templateGeneratedDishesCardHtml(newPrice, nameKey, descriptionKey);
}
