const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.image;
    //by destructuring product object
    const { rate, count } = product.rating

    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div style="height: 430px;" class="single-product bg-light bg-gradient p-4">
      <img class="product-image" src=${image}></img>
      <h4>${product.title.slice(0, 30)}</h4>
      <p>Category: ${product.category}</p>
      <h5 class="m-3"><span class="me-3"><i class="fas fa-user"></i> ${count}</span><span><i class="fas fa-star"></i> ${rate}</span></h5>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success rounded-3 me-2">add to cart</button>
      <button onclick='showDetails(${product.price},${rate})' class="btn btn-danger rounded-3" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

const showDetails = (price, rating) => {
  console.log(price, rating)

  document.getElementById("modal-body").innerHTML = `
     <div class='p-3'>
        <p>Rating: ${Array.from(Array(parseInt(rating)).keys()).map(() => "<i class='bi bi-star-fill text-warning'></i>")}</p>
        <h2>Price: $ ${price}</h2>
     </div>
`;

}


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  // console.log(price, typeof price)

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);

  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  // const convertPrice = value;
  const total = convertedOldPrice + convertPrice;
  console.log(total, typeof total)
  //  document.getElementById(id).innerText = Math.round(total);
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {

  console.log(
    getInputValue("price"),
    getInputValue("delivery-charge"),
    getInputValue("total-tax")
  );

  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");

  console.log(grandTotal)
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
