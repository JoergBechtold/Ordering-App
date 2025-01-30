function templateRenderDishesHtml(indexDishes) {
  return /*html*/ `
     <div id="${dishes[indexDishes].category}" class="headline-categories-over-single-dish-card">
          <h1>${dishes[indexDishes].category}</h1>
          <div id="dishes_card_${indexDishes}" class="dishes-cards-burger">
            
          </div>
        </div>
  `;
}

function templateRenderMenusHtml(indexDishes, indexMenus, newPrice) {
  return /*html*/ `
    <div id="single_menus_card_${indexDishes}_${indexMenus}" class="single-dishes-card">
              <h2><b>${dishes[indexDishes].menus[indexMenus].name}</b></h2>
              <span><b>${newPrice}€</b></span>
              <span> ${dishes[indexDishes].menus[indexMenus].description} </span>
              <div id="add_dishes_btn" class="add-dishes-btn">
                <img
                  onclick="addMenuToBasket(${indexDishes}, ${indexMenus}, ${newPrice})"
                  src="assets/icons/icon-orange-plus-50.png"
                  alt="Gericht hinzufühen Btn"
                />
              </div>
  `;
}

function templateGeneratedBasketHtml(indexBasket, basketPriceComma) {
  return /*html*/ `
  <div id="basket_single_dish${indexBasket}"  class="basket-single-dish">
              <div class="basket-single-dishes-name-price">
                <span class="basket-single-dish-name">${basket[indexBasket].basketDishName}</span>
                <span class="basket-single-dish-price">${basketPriceComma}€</span>
              </div>
              <div class="basket-single-dish-amount-container">
                <div class="basket-single-dish-amount">
                  <img id="dish_to_trash" onclick="dishToTrash(${indexBasket})" src="assets/icons/icon-trash-96.png" alt="Mülleimer Icon" />
                  <img onclick="minusAmount(${indexBasket})" src="assets/icons/icon-minus-96.png" alt="Minus Icon" />
                  <span class="basket-single-dish-amount-span"><b>${basket[indexBasket].amount}</b></span>
                  <img onclick="plusAmount(${indexBasket})" src="assets/icons/icon-plus-96.png" alt="Plus icon" />
                </div>
              </div>
            </div>
`;
}
