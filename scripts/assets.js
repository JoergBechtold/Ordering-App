window.onscroll = checkStickyPosition;

function checkStickyPosition() {
  let categories = document.getElementById('categories');
  // let links = document.getElementsByClassName('links');
  let rect = categories.getBoundingClientRect();

  if (rect.top <= 0) {
    categories.classList.add('scrolled-effect');
    // links.classList.add('scrolled-effect');
  } else {
    categories.classList.remove('scrolled-effect');
    // links.classList.remove('scrolled-effect');
  }
}

function emptyTheContainerInnerHtml(dishesCardBurgerRef, dishesCardSupplementRef, dishesCardDrinkstRef) {
  dishesCardBurgerRef.innerHTML = '';
  dishesCardSupplementRef.innerHTML = '';
  dishesCardDrinkstRef.innerHTML = '';
}

function changeThePrice(i, j, category) {
  let toFixedPrice = dishes[i][category][j].singlePrice.toFixed(2);
  let newPrice = toFixedPrice.replace('.', ',');
  return newPrice;
}
