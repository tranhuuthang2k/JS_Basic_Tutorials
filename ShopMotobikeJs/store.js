if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  let addtocartButton = document.getElementsByClassName("shop-item-button");
  for (let index = 0; index < addtocartButton.length; index++) {
    addtocartButton[index].addEventListener("click", addtocart);
  }
}

deleteProduct = () => {
  document.getElementsByClassName("cart-rows")[0].remove();
  updateCartTotal();
};
showNumber = () => {
  if (event.target.value <= 0) {
    event.target.value = 1;
  }
  updateCartTotal();
};
addtocart = () => {
  let shop_item = event.target.parentElement.parentElement;
  let nameProduct =
    shop_item.getElementsByClassName("shop-item-title")[0].innerText;
  let priceProduct =
    shop_item.getElementsByClassName("shop-item-price")[0].innerText;
  let imageProduct = shop_item.getElementsByClassName("shop-item-image")[0].src;
  showProduct(nameProduct, priceProduct, imageProduct);
  updateCartTotal();
};
showProduct = (nameProduct, priceProduct, imageProduct) => {
  let createDiv = document.createElement("div");
  let cart_items = document.getElementsByClassName("cart-items")[0];
  let cart_item_title = document.getElementsByClassName("cart-item-title");
  let cartRow = document.getElementsByClassName("cart-rows");
  for (let index = 0; index < cart_item_title.length; index++) {
    if (cart_item_title[index].innerText == nameProduct) {
      let quantity = cartRow[index].getElementsByClassName(
        "cart-quantity-input"
      )[0];
      quantity.value++;
      return;
    }
  }
  createDiv.innerHTML = `<div class="cart-rows">
  <div class="cart-item cart-column">
      <img class="cart-item-image" src="${imageProduct}" width="100" height="100">
      <span class="cart-item-title">${nameProduct}</span>
  </div>
  <span class="cart-price cart-column">${priceProduct}</span>
  <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1">
      <button class="btn btn-danger" type="button">REMOVE</button>
  </div>
</div>`;
  cart_items.appendChild(createDiv);
  //   Delete product
  createDiv
    .getElementsByClassName("btn btn-danger")[0]
    .addEventListener("click", deleteProduct);
  //  update quality
  //cách 1
  let cart_numbers = document.getElementsByClassName("cart-quantity-input");
  for (let index = 0; index < cart_numbers.length; index++) {
    console.log(cart_numbers[index]);
    cart_numbers[index].addEventListener("change", showNumber);
  }
  //cách 2
  createDiv
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", showNumber);
};
updateCartTotal = () => {
  let car_rows = document.getElementsByClassName("cart-rows");
  let Total = 0;
  for (let index = 0; index < car_rows.length; index++) {
    let price = car_rows[index]
      .getElementsByClassName("cart-price")[0]
      .textContent.replace("$", "");
    let quantity = car_rows[index].getElementsByClassName(
      "cart-quantity-input"
    )[0].value;
    Total = Total + price * quantity;
  }
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + Math.round(Total * 100);
};
