let jsonObj = [];
var subtototal;
if (localStorage.getItem("productcart") != null) {
  jsonObj = JSON.parse(localStorage.getItem("productcart"));
  $.each(jsonObj, function (key, cartvalue) {
    const productitem = Promise.resolve(
      fetch(
        "https://fakestoreapi.com/products/" + cartvalue.prod_id
      ).then((res) => res.json())
    );
    productitem.then((value) => {
      var title = value.title;
      var price = value.price;
      var imagesrc = value.image;
      var qty = cartvalue.prod_qty;
      var id = cartvalue.prod_id;
      subtototal = subtototal + price * qty;
      var elementblock1 =
        "<div class='itemgroup-imagecontent col-lg-6'><a href='productdetail.html?id=" +
        id +
        "' class='py-1 mr-2 col-5 px-0'><img src=" +
        imagesrc +
        " alt='image' aria-label='product image'" +
        key +
        "></a>";

      var elementblock2 =
        "<div class='col-6 px-0'><h6 class='productcart__item--title paddingtb-1'>" +
        title +
        "</h6><div><span>Size:</span><span class='productcart__item--size'>Large</span></div><div><span>Color:</span><span class='productcart__item--color'>Purple</span></div><div><span class='productcart__item--price'>$" +
        price +
        "</span></div></div>";
      var elementblock3 =
        "<div class='col-1 pr-0 d-lg-none'><span id='boot-icon' class='bi bi-three-dots' style='font-size: 18px; color: rgb(128, 128, 128);'></span></div></div>";
      var imageblock = elementblock1 + elementblock2 + elementblock3;

      var qtyelementblock =
        "<div class='itemgroup-quantity col-lg-3 d-flex justify-content-center'><div class='product--quantity'><button onclick='decrement()'>-</button><input id='product__qty' type='number' min='0' max='100' value=" +
        qty +
        " aria-label='quantity'><button onclick='increment()'>+</button></div></div>";

      var etdblock =
        "<div class='itemgroup-option col-lg-3 px-0'><div id='cart__itm--edit'><img src='resources/images/icons/edit.svg' alt='edit product' style='width: 1.5em'/><span>Edit Icon </span></div><div id='cart__itm--remove'><img src='resources/images/icons/delete.svg' alt='delete item' style='width: 1.5em'/><span>Remove </span></div><div id='cart__itm--saveforlater'><img src='resources/images/icons/heart.svg' alt='save for later' style='width: 1.5em'/><span>Save for Later </span></div></div>";
      var itemblock =
        "<div class='productcart__item--details d-flex'>" +
        imageblock +
        qtyelementblock +
        etdblock +
        "</div>";
      $("#productcart__container--items").append(itemblock);
    });
  });
  $("#subtotal").text(subtototal);
}
