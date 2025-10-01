let image = document.querySelectorAll("img");
console.log(image);
let price = document.querySelectorAll(".price");
console.log(price);
let name = document.querySelectorAll(".name");
console.log(name);
let description = document.querySelectorAll(".description");
console.log(description);
let number = document.querySelector(".numbers");
console.log(number);
let message = document.querySelector(".message");
console.log(message);
let adding = document.querySelectorAll(".adding");
console.log(adding);
let add = document.querySelector(".add");
let text = document.querySelector(".Text");
let totalPrice = document.querySelector(".total-price-product");
let btnConfirm = document.querySelector(".btn-Confirm");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");
const btnClose = document.querySelector(".btn-close");

console.log(text);
console.log(totalPrice);
console.log(btnConfirm);

let dataJson;
async function getData() {
  await fetch("data.json")
    .then((api) => {
      return api.json();
    })
    .then((data) => {
      dataJson = data;
      console.log(data || "not found");
      image.forEach((element, index) => {
        element.src = data[index].image.desktop;
      });
      name.forEach((element, index) => {
        element.textContent = data[index].category;
      });
      description.forEach((element, index) => {
        element.textContent = data[index].name;
      });
      price.forEach((element, index) => {
        element.textContent = data[index].price;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
getData();

const addingBtns = document.querySelectorAll(".adding");

addingBtns.forEach((btn) => {
  if (!btn.textContent.trim()) btn.textContent = "Add to Cart";
});

addingBtns.forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    if (btn.classList.contains("active")) return;

    btn.classList.add("active");
    let currentQuantity = cartItems[index]?.quantity || 0;
    btn.innerHTML = `
    <div class="product-added">
      <button  data-id="${index}"  onclick = "removeFromCart(this.id)"    id="${index}" type="button" class="minus" aria-label="minus">-</button>
      <span class="num">${currentQuantity}</span>
      <button data-id="${index}" onclick = "addToCart(this.id)"    id="${index}" type="button" class="plus" aria-label="plus">+</button>
    </div>
      `;
    const minus = btn.querySelector(".minus");
    const plus = btn.querySelector(".plus");
    const numSpan = btn.querySelector(".num");

    const getVal = () => Number(numSpan.textContent) || 0;
    const setVal = (v) => {
      numSpan.textContent = String(v);
    };

    minus.addEventListener("click", (ev) => {
      ev.stopPropagation();
      let v = getVal();
      if (v > 0) {
        v--;
        setVal(v);
        total();
      }
    });

    plus.addEventListener("click", (ev) => {
      ev.stopPropagation();
      let v = getVal();

      v++;
      setVal(v);
      message.style.display = "none";
      total();
    });
  });
});
document.addEventListener("click", () => {
  document.querySelectorAll(".adding.active").forEach((btn) => {
    btn.classList.remove("active");
    btn.innerHTML = "Add to Cart";
  });
});
let cartItems = {};
let newId;
let quantity;
function addToCart(id) {
  let product = dataJson[id];

  if (!cartItems[id]) {
    cartItems[id] = {
      name: product.name,
      price: product.price,
      quantity: 1,
      total: product.price * 1,
      image: product.image.desktop,
    };
  } else {
    cartItems[id].quantity++;
    cartItems[id].total = cartItems[id].price * cartItems[id].quantity;
  }
  updateCartItem(id, cartItems[id].quantity);
  emptyCart();
  renderCart();
}
function removeFromCart(id) {
  if (cartItems[id]) {
    cartItems[id].quantity--;
    if (cartItems[id].quantity === 0) {
      delete cartItems[id];
    } else {
      cartItems[id].total = cartItems[id].price * cartItems[id].quantity;
    }
  }
  renderCart();
}

function updateCartItem(id, quantity) {
  if (cartItems[id]) {
    cartItems[id].quantity = quantity;
    cartItems[id].total = cartItems[id].price * quantity;
    renderCart();
  }
}

function renderCart() {
  let minus = document.querySelectorAll(".minus");
  minus.forEach((element) => {
    element.addEventListener("click", (e) => {
      emptyCart();
    });
  });

  add.innerHTML = "";
  Object.keys(cartItems).forEach((id) => {
    let item = cartItems[id];
    add.innerHTML += `
      <div class="cart-content ${id}">
        <p class="product-name">${item.name}</p>
        <div class="product-info">
          <span data-id="${id}" class="product-number">${item.quantity}x</span>
          <span class="product-price">${item.price}$</span>
          <span class="product-total">${item.total}$</span>
        </div>
      </div>
    `;
  });
}
let billPrice;
function emptyCart() {
  let cartContent = document.querySelectorAll(".cart-content");
  let items = cartContent.length > 0;
  if (items) {
    text.textContent = "Order Total";

    btnConfirm.textContent = "Order Confirm";
    btnConfirm.classList.add("on");
    let totalItemPrice = Object.values(cartItems).reduce((acc, e) => {
      return acc + e.total;
    }, 0);
    billPrice = totalItemPrice;

    totalPrice.textContent = `$${totalItemPrice || 0}`;
  } else {
    totalPrice.textContent = "";
    btnConfirm.textContent = "";
    text.textContent = "";
    btnConfirm.classList.remove("on");
    message.style.display = "block";
  }
}

emptyCart();

function total() {
  let productNumber = document.querySelectorAll(".product-number");
  let product = Array.from(productNumber).map((element) => {
    return Number(element.textContent.replace(/\D/g, "")) || 0;
  });

  let max = product.reduce((acc, e) => {
    return +acc + +e;
  }, 0);
  number.textContent = `Your Cart(${max})`;
}

btnConfirm.addEventListener("click", () => {
  Toastify({
    text: "Item added to cart!",
    duration: 2000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      borderRadius: "0",
      width: "150px",
      height: "60px",
      display: "flex",
      flexDirection: "column",
      textAlign: "center",
      justifyContent: "center",
      margin: "0 auto",
      alignItem: "center",
    },
  }).showToast();
  backdrop.classList.remove("hidden");
  modal.classList.remove("hidden");
  if (
    !backdrop.classList.contains("hidden") &&
    !modal.classList.contains("hidden")
  ) {
    let listProduct = document.querySelector(".list-products");
    console.log(listProduct);
    Object.keys(cartItems).forEach((id) => {
      let item = cartItems[id];
      listProduct.innerHTML += `
        <div class="cart-list">
         <div class="product-info">
            <img src="${item.image}" alt="" />
            <div>
              <p>${item.name}</p>
              <span>${item.quantity}x</span>
              <span>${item.price}$</span>
            </div>
          </div>
          <p>${item.total}$</p>
        </div>
    `;
      const bill = document.querySelector(".bill");
      bill.textContent = `$${billPrice}`;
    });
  }
});

btnClose.addEventListener("click", () => {
  backdrop.classList.add("hidden");
  modal.classList.add("hidden");
  location.reload();
});
total();

document.querySelector(".btn-Confirm").addEventListener("click", () => {});
