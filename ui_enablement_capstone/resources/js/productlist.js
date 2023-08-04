let currencysign = "$";

function getProductcaListByCategory(productcategory) {
  var productitem;
  if (productcategory == "all") {
    productitem = Promise.resolve(
      fetch("https://fakestoreapi.com/products").then((res) => res.json())
    );
  } else {
    productitem = Promise.resolve(
      fetch(
        "https://fakestoreapi.com/products/category/" + productcategory
      ).then((res) => res.json())
    );
  }

  productitem
    .then((value) => {
      var totalitem = Object.keys(value).length;
      $("#totalitem").text(totalitem + " Results");
      $.each(value, function (key, value) {
        console.log(value.id);
        var title = value.title;
        var price = value.price;
        var description = value.description;
        var imagesrc = value.image;
        var category = value.category;
        var id = value.id;
        var prod__item =
          "<div class='item " +
          category.replace(/["'\s]/g, "") +
          "'><a href='productdetail.html?id=" +
          id +
          "'><img src=" +
          imagesrc +
          " alt=''><h6>" +
          title +
          "</h6></a><p class='itemprice'>$" +
          price +
          "</p><i class='bi bi-suit-heart'></i></div>";
        $("#product--list").append(prod__item);
        $("#product__item--list h1").text(category);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

function productFilter() {
  $("input[type=checkbox]").change(function () {
    if ($(this).is(":checked")) {
      getProductcaListByCategory(this.value);
    } else {
      $("." + this.value.replace(/["'\s]/g, "")).remove();
    }
  });
}

$(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productcategory = urlParams.get("category");

  getProductcaListByCategory(productcategory);
  productFilter();
});
