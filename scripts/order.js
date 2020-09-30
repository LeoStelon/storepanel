// Token from local Storage
var token = localStorage.getItem("token");

// Params instance
let searchParams = new URLSearchParams(window.location.search);

// Order ID
var orderid = searchParams.get("orderid");
//View mode
var view=searchParams.get('view')
if(view){
  document.getElementById('actions').style.display='none';
}

window.onload = async () => {
  await getorder();
  await getDeliveryBoys();
  document.getElementById("loader").style.display = "none";
  document.querySelector(".content").style.display = "inherit";

  //Function for Accept and Reject Button
  document.querySelector(".assign").addEventListener("click", (e) => {
    assign(true);
  });
  document.querySelector(".reject").addEventListener("click", (e) => {
    assign(false);
  });
};

async function getorder() {
  fetch(
    "https://api-ecommerce.datavivservers.in/mobile_api/AllOrdersDetailsForVendorByOrderId/",
    {
      method: "POST",
      body: JSON.stringify({
        order_Id: orderid,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "token " + token,
      },
    }
  )
    .then((res) => res.json())
    .then((response) => {
      var data = response.data;
      var address =
        data.ShippingAddress.address1 +
        ", " +
        data.ShippingAddress.address2 +
        ", " +
        data.ShippingAddress.pincode;
      document.querySelector(".orderid>p.dynamic").innerHTML =
        data.orderDetails.order_id;
      document.querySelector(".fullname>p.dynamic").innerHTML =
        data.UserDetails.full_name;
      document.querySelector(".address>p.dynamic").innerHTML = address;
      document.querySelector(".subtotal>p.dynamic").innerHTML =
        data.orderDetails.get_cart_sub_total;
      document.querySelector(".grandtotal>p.dynamic").innerHTML =
        data.orderDetails.grandTotal;
      document.querySelector(".status>p.dynamic").innerHTML =
        data.orderDetails.order_status;
      document.querySelector(".orderedat>p.dynamic").innerHTML =
        data.orderDetails.created_at;

      // Iterate all images
      data.products.forEach((element) => {
        var ref = document.querySelector(".productimages");
        var img = productImage(element.product_images, element.product_price);
        ref.innerHTML += img;
      });
      console.log(data);
    });
}

// Updates delivery boys in the table
async function getDeliveryBoys() {
  await fetch(
    "https://api-ecommerce.datavivservers.in/mobile_api/GetAllDeliveryBoyDetailsForVendor/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "token " + token,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      var boySelect = document.getElementById("agent");
      data.data.forEach((element) => {
        boySelect.options[boySelect.options.length] = new Option(
          element.delivery_full_name,
          element.delivery_boyId
        );
      });
    });
}

//Product Image(HTML component)
function productImage(src, price) {
  return `<div style="margin:8px;padding: 8px;border: 1px solid lightgray;border-radius: 5px; align-items: center;display: flex;flex-direction: column;">
    <img
      height="75"
      src="https://api-ecommerce.datavivservers.in${src}"
      alt="prod 1"
    />
    <p>Price : ₹ ${price}</p>
  </div>`;
}

function test(status) {
  console.log(status);
}

//Accept or Reject
async function assign(status) {
  await fetch(
    "https://api-ecommerce.datavivservers.in/mobile_api/OrderAcceptAndRejectByVendors/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "token " + token,
      },
      body: JSON.stringify({
        vendor_accept_status: status,
        order_Id: orderid,
      }),
    }
  )
    .then((res) => res.json())
    .then(async (data) => {
      if (data.code == 200) {
        if (status) {
          //Reference to Select
          var select = document.getElementById("agent");

          await fetch(
            "https://api-ecommerce.datavivservers.in/mobile_api/ShowAllBookOrdersToVendors/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "token " + token,
              },
              body: JSON.stringify({
                order_Id: orderid,
                delivery_boy_Id: select.value,
              }),
            }
          )
            .then((res) => res.json())
            .then(async (data) => {
              if (data.code == 200) {
                alert("Order has been assigned to the Delivery Boy.");
              }
            });
        } else {
          alert("This order won't be shown again to you. Thank You.");
        }
      } else {
        alert("Oops, Please try again.");
      }
    });
}
