let currencysign = "$";
var productid;
const urlParams = new URLSearchParams(window.location.search);
productid = urlParams.get("id");

function getProductList() {
  const productitem = Promise.resolve(
    fetch("https://fakestoreapi.com/products/" + productid).then((res) =>
      res.json()
    )
  );
  productitem
    .then((value) => {
      console.log(value.id);
      var title = value.title;
      var price = value.price;
      var description = value.description;
      var imagesrc = value.image;
      var rating = value.rating;
      let rate, count;
      if (Object.keys(rating).length) {
        $.each(rating, function (key, value) {
          rate = rating.rate;
          count = rating.count;
        });
      }

      $(".productimage__container img").attr("src", imagesrc);
      $("#productTitle").text(title);
      $("#product--price").text(price);
      $(".product--descripton").text(description);
      $("#rating").text(currencysign + rate);
      $("#product--count").text("(" + count + ")");
    })
    .catch((err) => {
      console.log(err);
    });
}

function addtocart() {
  $("#addtocart").click(function () {
    let qty = $("#product__qty").val();
    let item = {};
    let jsonObj = [];
    if (localStorage.getItem("productcart") != null)
      jsonObj = JSON.parse(localStorage.getItem("productcart"));
    item["prod_id"] = productid;
    item["prod_qty"] = qty;
    jsonObj.push(item);
    localStorage.setItem("productcart", JSON.stringify(jsonObj));
    if (!isNaN($("#product__qty").val()) && $("#product__qty").val() !== "") {
      window.location.replace("cart.html");
    } else {
      $("#product__qty").addClass("error");
    }
  });
}
$(function () {
  getProductList();
  addtocart();
});
