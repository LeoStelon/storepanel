// Token from local Storage
var token = localStorage.getItem("token");

//Deliverboys
var deliveryBoys = [];

window.onload = async () => {
  var orderstab = document.querySelector("a#orderstab");
  orderstab.click();
  dashboard();
  await updateDeliveryBoys();
  updateAvailableOrders();
  updateMyOrders();
};

//Remove later if requirement is not needed
function dashboard() {
  var tempName = localStorage.getItem("first_name"); //Check Here
  var widget_heading = document.querySelector(".widget-heading");
  widget_heading.textContent = tempName;
  fetch(
    "https://api-ecommerce.datavivservers.in/mobile_api/VendorManagementDetails/",
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
      const { first_name } = data.data[0];
      widget_heading.textContent = first_name;
    });
}

// Updates delivery boys in the table
async function updateDeliveryBoys() {
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
      //Deletes loading td when data fetched
      document.getElementById("deliveryboysTable").deleteRow(1);

      //Function to update rows in table
      updateRows(data.data);
    });
}

function updateRows(deliveryboys) {
  deliveryBoys = [];
  var table = document.getElementById("deliveryboysTable");
  deliveryboys.forEach((element) => {
    var idcell = `<td style="text-align:center">#${element.delivery_boyId}</td>`;
    var namecell = `<td>
    <div class="widget-content p-0">
          <div class="widget-content-wrapper">
          <div class="widget-content-left mr-3">
              <div class="widget-content-left">
              <img
              width="40"
                  class="rounded-circle"
                  src="assets/images/user.png"
                  alt=""
                />
                </div>
            </div>
            <div class="widget-content-left flex2">
              <div class="widget-heading">${element.delivery_full_name}</div>
              <div class="widget-subheading opacity-7">${
                element.delivery_address1 +
                "," +
                element.delivery_address2 +
                "," +
                element.delivery_pincode
              }</div>
              </div>
              </div>
        </div>
      </td>`;
    var phonecell = `<td class="text-center">${element.delivery_mob_no}
    </td>`;
    var tr = table.insertRow();
    var cell1 = tr.insertCell(0);
    var cell2 = tr.insertCell(1);
    var cell3 = tr.insertCell(2);
    cell1.innerHTML = idcell;
    cell2.innerHTML = namecell;
    cell3.innerHTML = phonecell;
    deliveryBoys.push(element.delivery_full_name);
  });
}

//Update Available Orders table
async function updateAvailableOrders() {
  //Table reference
  var table = document.getElementById("ordersTable");
  try {
    await fetch(
      "https://api-ecommerce.datavivservers.in/mobile_api/OrderAcceptAndRejectByVendors/",
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
        //Deletes loading td when data fetched
        document.getElementById("ordersTable").deleteRow(1);

        //Iterate and updates dom with orders
        if (data.data.length == 0) {
          var tr = table.insertRow();
          tr.innerHTML = `<td style="text-align:center;" colspan="4">No Orders</td>`;
        } else {
          data.data.forEach((element) => {
            var idcell = `<td>${element.order_id}</td>`;
            var paystatuscell = `<td>${
              element.payment_status ? "paid" : "not paid"
            }</td>`;
            var orderstatuscell = `<td>${element.order_status}</td>`;
            var tr = table.insertRow();
            var cell1 = tr.insertCell(0);
            var cell2 = tr.insertCell(1);
            var cell3 = tr.insertCell(2);
            var cell4 = tr.insertCell(3);
            cell1.innerHTML = idcell;
            cell2.innerHTML = paystatuscell;
            cell3.innerHTML = orderstatuscell;
            cell4.innerHTML = `<a target="_blank" href="http://127.0.0.1:5500/order.html?view=false&orderid=${element.order_id}">
            View Details
        </a>`;
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
}

// My Orders
async function updateMyOrders(){
   //Table reference
   var table = document.getElementById("myordersTable");
   try {
     await fetch(
       "https://api-ecommerce.datavivservers.in/mobile_api/VendorsAllOrders/",
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
         console.log(data)
        //  //Deletes loading td when data fetched
         document.getElementById("myordersTable").deleteRow(1);
 
         //Iterate and updates dom with orders
         if (data.data.length == 0) {
           var tr = table.insertRow();
           tr.innerHTML = `<td style="text-align:center;" colspan="4">No Orders</td>`;
         } else {
           data.data.forEach((element) => {
             var idcell = `<td>${element.order_id}</td>`;
             var paystatuscell = `<td>${
               element.payment_status ? "paid" : "not paid"
             }</td>`;
             var orderstatuscell = `<td>${element.order_status}</td>`;
             var tr = table.insertRow();
             var cell1 = tr.insertCell(0);
             var cell2 = tr.insertCell(1);
             var cell3 = tr.insertCell(2);
             var cell4 = tr.insertCell(3);
             cell1.innerHTML = idcell;
             cell2.innerHTML = paystatuscell;
             cell3.innerHTML = orderstatuscell;
             cell4.innerHTML = `<a target="_blank" href="http://127.0.0.1:5500/order.html?view=true&orderid=${element.order_id}">
             View Details
         </a>`;
           });
         }
       });
   } catch (error) {
     console.log(error);
   }
}