function templateGeneratedDishesCardHtml(j, newPrice, nameKey, descriptionKey, category) {
  return /*html*/ `
      <div id="single_dishes_card${j}" class="single-dishes-card">
             <h2><b>${nameKey}</b></h2>
             <span><b>${newPrice}€</b></span>
             <span>
              ${descriptionKey}
             </span>
             <div id="add_dishes_btn${j}" class="add-dishes-btn">
               <!-- <img onclick="addDishToBasket(${j}, ${category})" src="assets/icons/icon-orange-plus-50.png" alt="Gericht hinzufühen Btn" /> -->
               <img onclick="addDishToBasket(${j},'${newPrice}', '${nameKey}')" src="assets/icons/icon-orange-plus-50.png" alt="Gericht hinzufühen Btn" />
             </div>
           </div>
  `;
}

function templateGeneratedBasketHtml(b) {
  return /*html*/ `
  <div id="basket_single_dish${b}"  class="basket-single-dish">
              <div class="basket-single-dishes-name-price">
                <span class="basket-single-dish-name">${basket[b].basketDishName}</span>
                <span class="basket-single-dish-price">${basket[b].basketDishPrice}€</span>
              </div>
              <div class="basket-single-dish-amount-container">
                <div class="basket-single-dish-amount">
                  <img id="dish_to_trash" onclick="dishToTrash(${b})" src="assets/icons/icon-trash-96.png" alt="Mülleimer Icon" />
                  <img src="assets/icons/icon-minus-96.png" alt="Minus Icon" />
                  <span class="basket-single-dish-amount-span"><b>${basket[b].amount}</b></span>
                  <img src="assets/icons/icon-plus-96.png" alt="Plus icon" />
                </div>
              </div>
            </div>
`;
}
