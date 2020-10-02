// Token from local Storage
var token = localStorage.getItem("token");

//Deliverboys
var deliveryBoys = [];
var calendar1;
var calendar2;
document.getElementById("calendar1").addEventListener("change", function () {
  var date = new Date(this.value)
  calendar1=date.getDate()+'/'+(parseInt(date.getMonth())+1).toString()+'/'+date.getFullYear();
});
document.getElementById("calendar2").addEventListener("change", function () {
  var date = new Date(this.value)
  calendar2=date.getDate()+'/'+(parseInt(date.getMonth())+1).toString()+'/'+date.getFullYear();
});

window.onload = async () => {
  var orderstab = document.querySelector("a#stocktab");
  orderstab.click();
  dashboard();
  await updateDeliveryBoys();
  updateAvailableOrders();
  updateMyOrders();
  updateAnalysisToday();
  document.getElementById("checkreport").addEventListener("click", () => {
    updateAnalysisDate();
  });
  updateStocks();
};

function dashboard() {
  var tempName = localStorage.getItem("first_name"); //Check Here
  var widget_heading = document.querySelector(".widget-heading");
  widget_heading.textContent = tempName;
  fetch(
    "https://api-ecommerce.datavivservers.in/mobile_api/VendorStoreDetails/",
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
      document.querySelector(".app-header-left>p.storename").innerHTML +=
        data.data[0].store_name;
      document.querySelector(".app-header-left>p.storeaddress").innerHTML +=
        data.data[0].address;
      document.querySelector("p.storecontact").innerHTML +=
        data.data[0].contact_no1;
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

// Genrates and Update Rows in Deliverboys Table
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
        generateRows(data.data, table);
      });
  } catch (error) {
    console.log(error);
  }
}

// My Orders
async function updateMyOrders() {
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
        //Deletes loading td when data fetched
        document.getElementById("myordersTable").deleteRow(1);

        //Iterate and updates dom with orders
        generateRows(data.data, table);
      });
  } catch (error) {
    console.log(error);
  }
}

//Row Generator for Table Orders
function generateRows(data, table) {
  if (data.length == 0) {
    var tr = table.insertRow();
    tr.innerHTML = `<td style="text-align:center;" colspan="4">No Orders</td>`;
  } else {
    data.forEach((element) => {
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
}

//Analytics part
// Sales Summary For Today
async function updateAnalysisToday() {
  try {
    await fetch(
      "https://api-ecommerce.datavivservers.in/mobile_api/StoreAnalysisForDay/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "token " + token,
        },
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("analysis order").innerHTML =
          data.data.total_orders;
        document.getElementById("analysis amount").innerHTML =
          data.data.total_sale_amount;
        document.getElementById("analysis deliveries").innerHTML =
          data.data.total_deliveries;
        document.getElementById("analysis pickup").innerHTML =
          data.data.total_order_pick_up;
        document.querySelector(".analysis.today").style.display = "block";
      });
  } catch (error) {
    console.log(error);
  }
}

// Sales Summary For Today
async function updateAnalysisDate() {
  if (calendar1 == null || calendar2 == null) {
    return alert("Please select the dates");
  }
  document.getElementById("loader1").style.display = "block";
  try {
    await fetch(
      "https://api-ecommerce.datavivservers.in/mobile_api/StoreAnalysisBasedOnDates/",
      {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "token " + token,
        },
        body: JSON.stringify({
          startDate: calendar1,
          endDate: calendar2
        }),
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        document.getElementById('pastorderAnalysis').style.display='flex';
        document.getElementById("analysis salesamount").innerHTML =
        data.data.total_sale_amount;
        document.getElementById("analysis sales").innerHTML =
        data.data.total_no_sales;

        document.getElementById("loader1").style.display = "none";
      });
  } catch (error) {
    console.log(error);
  }
}

// Stock Tab
async function updateStocks() {
  //Table reference
  var table = document.getElementById("stockTable");
  var tr = table.insertRow(1);
  tr.innerHTML=`<td style="text-align:center;" colspan="5">loading...</td>`;
  try {
    await fetch(
      "https://api-ecommerce.datavivservers.in/mobile_api/GetOnlyVendorStockDetails/",
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
        table.deleteRow(1)

        //Iterate and updates dom with orders
        console.log(data)
        if (data.data.length == 0) {
          var tr = table.insertRow();
          tr.innerHTML = `<td style="text-align:center;" colspan="4">No Orders</td>`;
        } else {
          data.data.forEach((element) => {
            var idcell = `<td>${element.product_Id}</td>`;
            var namecell = `<td>${
              element.product_name ? "paid" : "not paid"
            }</td>`;
            var pricecell = `<td>${element.product_price}</td>`;
            var descriptioncell = `<td>${element.product_description}</td>`;
            var tr = table.insertRow();
            var cell1 = tr.insertCell(0);
            var cell2 = tr.insertCell(1);
            var cell3 = tr.insertCell(2);
            var cell4 = tr.insertCell(3);
            var cell5 = tr.insertCell(4);
            cell1.innerHTML = idcell;
            cell2.innerHTML = namecell;
            cell3.innerHTML = pricecell;
            cell4.innerHTML = descriptioncell;
            cell5.innerHTML = `<a target="_blank" href="http://127.0.0.1:5500/order.html?view=true&orderid=${element.order_id}">
            View Details
        </a>`;
          });
        }
      });
  } catch (error) {
    console.log(error);
  }
}