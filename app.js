// Constructor function for Drinks
function Drink(name, sugar, ice) {
  this.name = name;
  this.sugar = sugar;
  this.ice = ice;
}
Drink.prototype.price = function () {
  switch (this.name) {
    case "Black Tea":
    case "Oolong Tea":
    case "Baozong Tea":
    case "Green Tea":
      return 30;
    case "Bubble Milk Tea":
    case "Lemon Green Tea":
      return 50;
    case "Black Tea Latte":
    case "Matcha Latte":
      return 55;
    default:
      alert("No this drink");
  }
};
// AlphaPos Constructor Function
function AlphaPos() {}
const alphaPos = new AlphaPos();

// 新增飲料
const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]');
addDrinkButton.addEventListener("click", () => {
  // 1. 取得店員選擇的飲料品項、甜度、冰塊選項內容
  const drinkName = alphaPos.getCheckedValue("drink");
  const ice = alphaPos.getCheckedValue("ice");
  const sugar = alphaPos.getCheckedValue("sugar");
  // console.log(`${drinkName}, ${ice}, ${sugar}`)

  // 2. 如果沒有選擇飲料品項，跳出提示
  if (!drinkName) {
    alert("Please choose at least one item.");
    return;
  }
  // 3. 建立飲料實例，並取得飲料價格
  const drink = new Drink(drinkName, sugar, ice);
  // 4. 將飲料實例產生成左側訂單區的畫面
  alphaPos.addDrink(drink);
});

// let allDrinksOptions = document.querySelectorAll('input[name="drink"]')
// allDrinksOptions.forEach(function(option){
// 	if(option.checked){console.log(`${option.value}:${option.checked}`)}
// })

// let allIceOptions = document.querySelectorAll('input[name="ice"]')
// allIceOptions.forEach(function(option){
// 	if (option.checked){console.log(`${option.value}:${option.checked}`)}
// });

// let allSugarOptions = document.querySelectorAll('input[name="sugar"]')
// allSugarOptions.forEach(function(option){
// 	if (option.checked){console.log(`${option.value}:${option.checked}`)}
// })

// 上面三個可以濃縮成下方，利用Constructor來表達，再放到上方EventListener去觸發

AlphaPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = "";
  document.querySelectorAll(`[name=${inputName}]`).forEach((item) => {
    if (item.checked) {
      selectedOption = item.value;
    }
  });
  return selectedOption;
};

const orderLists = document.querySelector("[data-order-lists]"); // 拿到左側爛位，準備填入右側輸出的訂單卡片
AlphaPos.prototype.addDrink = function (drink) {
  const orderListsCard = `
    <div class="card mb-3">
    <div class="card-body pt-3 pr-3">
      <div class="text-right">
        <span data-alpha-pos="delete-drink">×</span>
      </div>
      <h6 class="card-title mb-1">${drink.name}</h6>
      <div class="card-text">${drink.ice}</div>
      <div class="card-text">${drink.sugar}</div>
    </div>
    <div class="card-footer text-right py-2">
      <div class="card-text text-muted">$ <span data-drink-price>${drink.price()}</span></div>
    </div>
  </div>
  `;
  orderLists.insertAdjacentHTML("afterbegin", orderListsCard);
};

// 刪除左側卡片
orderLists.addEventListener("click", (event) => {
  let isDeleteButton = event.target.matches('[data-alpha-pos="delete-drink"]');
  if (!isDeleteButton) {
    return;
  }
  alphaPos.deleteDrink(event.target.parentElement.parentElement.parentElement);
});

AlphaPos.prototype.deleteDrink = function (target) {
  target.remove();
};

//結帳並顯示總金額
AlphaPos.prototype.checkout = function () {
  let totalAmount = 0;

  document.querySelectorAll("[data-drink-price]").forEach(function (drink) {
    totalAmount += Number(drink.textContent);
  });
  return totalAmount;
};

const checkoutButton = document.querySelector('[data-alpha-pos="checkout"]');
checkoutButton.addEventListener("click", function () {
  // 1. 計算訂單總金額
  alert(`Total amount of drinks：$${alphaPos.checkout()}`);
  // 2. 清空訂單
  alphaPos.clearOrder(orderLists);
});

//清空訂單
AlphaPos.prototype.clearOrder = function (target) {
  target.querySelectorAll(".card").forEach(function (card) {
    card.remove();
  });
};
