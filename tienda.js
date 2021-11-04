const addToShoppingCartButtons = document.querySelectorAll(".addToCart")

addToShoppingCartButtons.forEach(addCartButton => {
          addCartButton.addEventListener("click", e => {
                    addTocartCliked(e);
          });
});

const comprarButton = document.querySelector(".comprarButton");
comprarButton.addEventListener("click", e => {
          comprarButtonClicked(e);
});

const shoppingCartItemsContainer = document.querySelector(".shoppingCartItemsContainer");

const addTocartCliked = e => {
          const button = e.target;

          const item = button.closest(".item");
          itemTitle = item.querySelector(".item-title").textContent;
          itemPrice = item.querySelector(".item-price").textContent;
          itemImage = item.querySelector(".item-image").src;

          addItemToshoppingCart(itemTitle, itemPrice, itemImage);

}

const addItemToshoppingCart = (itemTitle, itemPrice, itemImage) => {

          const elementsTitle = shoppingCartItemsContainer.getElementsByClassName("shoppingCartItemTitle");

          for (let i = 0; i < elementsTitle.length; i++) {
                    if (elementsTitle[i].innerText === itemTitle) {
                              const elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector(".shoppingCartItemQuantity");
                              elementQuantity.value++;
                              updateShoppingCartTotal();
                              return
                    }
          }


          const shoppingCartRow = document.createElement("div");
          const shoppingCartContent = `
          <div class="row shoppingCartItem">
          <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
              <img src=${itemImage} class="shopping-cart-image">
              <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
            </div>
          </div>
          <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
              <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
          </div>
          <div class="col-4">
            <div
              class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
              <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number" value="1">
              <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
          </div>
        </div>
  `;

          shoppingCartRow.innerHTML = shoppingCartContent;
          shoppingCartItemsContainer.append(shoppingCartRow);

          shoppingCartRow.querySelector(".buttonDelete").addEventListener("click", e => {
                    removeShoppingCartItem(e);
          });

          shoppingCartRow.querySelector(".shoppingCartItemQuantity").addEventListener("change", e => {
                    quantityChange(e);
          });

          updateShoppingCartTotal();
}

const updateShoppingCartTotal = e => {
          let total = 0;
          const shoppingCartTotal = document.querySelector(".shoppingCartTotal");
          const shoppingCartItems = document.querySelectorAll(".shoppingCartItem");

          shoppingCartItems.forEach(shoppingCartItem => {
                    const shoppingCartItemPriceElement = shoppingCartItem.querySelector(".shoppingCartItemPrice");
                    const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace("€", ""));

                    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector(".shoppingCartItemQuantity");
                    const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
                    total += shoppingCartItemPrice * shoppingCartItemQuantity;
          });
          shoppingCartTotal.innerHTML = `${total.toFixed(2)}€`;
}

const removeShoppingCartItem = e => {
          const buttonCliked = e.target;
          buttonCliked.closest(".shoppingCartItem").remove();
          updateShoppingCartTotal();
}

const quantityChange = e => {
          const input = e.target;
          input.value <= 0 ? input.value = 1 : null;
          updateShoppingCartTotal();
}

const comprarButtonClicked = e => {
          console.log("🚀", e)
          shoppingCartItemsContainer.innerHTML = "";
          updateShoppingCartTotal();
}