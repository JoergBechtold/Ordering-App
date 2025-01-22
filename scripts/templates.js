function templateGeneratedDishesCardHtml(j, newPrice, nameKey, descriptionKey) {
  return /*html*/ `
      <div id="single_dishes_card${j}" class="single-dishes-card">
             <h2><b>${nameKey}</b></h2>
             <span><b>${newPrice}€</b></span>
             <span>
              ${descriptionKey}
             </span>
             <div id="add_dishes_btn${j}" class="add-dishes-btn">
               <img onclick="addDishToBasket('${newPrice}', '${nameKey}')" src="assets/icons/icon-orange-plus-50.png" alt="Gericht hinzufühen Btn" />
             </div>
           </div>
  `;
}
