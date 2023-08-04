let cartitems = localStorage.getItem("productcart");
if (cartitems != null && cartitems != "" && JSON.parse(cartitems).length > 0)
  $(".dot").text(JSON.parse(localStorage.getItem("productcart")).length);
else $(".operations_cart--text span").removeClass("dot");
