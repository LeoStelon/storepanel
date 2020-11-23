// Token
var token=localStorage.getItem('AUTH_TOKEN') 
if(token==null){
  alert('Please login to continue!')
  window.location.replace("index.html");
}
window.onload = () => {
  document.querySelector("a#dashboardtab").click();
  getAnalytics1();
  getAnalytics2();
  getAnalytics3();
  getVendorList();
  getDeliveryBoys();
  getStores();
  getCustomers();
  getProductsCategory();
  getProducts();
  getAllOffers();
  getAllCurrentOrders();
};

async function getAnalytics1() {
  $(document).ready(function () {
    var url =
      "https://api-ecommerce.datavivservers.in/mobile_api/OverAllStoresMostOrders/";
    var i;
      fetch(url, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          var responseObj = data.data;
          for (var  i = 0; i < responseObj.length; i++) {
            var userId = responseObj[i].userId;
            var tr = $('<tr/>');
            tr.append("<td>" + responseObj[i].store_name + "</td>");
            tr.append("<td>" + responseObj[i].popular_name + "</td>");
            tr.append("<td>" + responseObj[i].total_orders + "</td>");
            $('#orderoverallListTableId').append(tr);
          }
        });
  });
}

async function getAnalytics2() {
  $(document).ready(function () {
    var url =
      "https://api-ecommerce.datavivservers.in/mobile_api/StoresMostOrders/";
    var i;
      fetch(url, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          var responseObj = data.data;
          for ( i = 0; i < responseObj.length; i++) {
            userId = responseObj[i].Id;
            tr = $('<tr/>');
            tr.append("<td>" + responseObj[i].store_name + "</td>");
            tr.append("<td>" + responseObj[i].popular_name + "</td>");
            tr.append("<td>" + responseObj[i].total_orders + "</td>");
            tr.append("<td class='trigbutton'><button type='button' class='btn btn-outline-info' id='"+i+"' onclick='clickme("+userId+")' >Add Offers</button></td>");
            $('#orderListTableId').append(tr);
          }
      });
  });
}

async function getAnalytics3() {
  $(document).ready(function () {
    var url =
      "https://api-ecommerce.datavivservers.in/mobile_api/UserOfferDetails/";
      fetch(url, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          var responseObj = data.data;
          for (var i = 0; i < responseObj.length; i++) {
            var tr = $("<tr/>");
            tr.append("<td>" + responseObj[i].user_full_name + "</td>");
            tr.append("<td>" + responseObj[i].offer_offer_title_name + "</td>");
            tr.append("<td>" + responseObj[i].user_mob + "</td>");
            tr.append("<td>" + responseObj[i].offer_promocode + "</td>");
            tr.append("<td>" + responseObj[i].offer_discription + "</td>");
            var id = responseObj[i].id;

            tr.append(
              `"<td class='trigbutton'><button type='button' class='btn btn-outline-info ${"offassignedListTableId"+i}' id='` +
                id +
                `'>Delete</button></td>"`
            );
            $("#offassignedListTableId").append(tr);
            $(document).on("click", ".offassignedListTableId" + i, function () {
              var id = $(this).attr("id");
              fetch("https://api-ecommerce.datavivservers.in/mobile_api/UserOfferDetails/" +
              id,{
                method:"DELETE"
              }).then(resp=>resp.json())
              .then(res=>{
                alert("Record deleted");
                window.location.reload()
              })
            });
          }
        });
  });
}

async function getVendorList() {
  $(document).ready(function () {
    var url =
      "https://api-ecommerce.datavivservers.in/mobile_api/GetAllvendorsDetails/";
    var i;
      fetch(url, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          var responseObj = data.data;
          for (i = 0; i < responseObj.length; i++) {
            var vendorId = responseObj[i].vendor_id;
            var venstoreStatus = responseObj[i].get_vendor_store;
            var tr = $("<tr/>");
            tr.append("<td>" + responseObj[i].first_name + "</td>");
            tr.append("<td>" + responseObj[i].last_name + "</td>");
            tr.append("<td>" + responseObj[i].userName + "</td>");
            tr.append(`${
								venstoreStatus
									? `<td class='trigbutton'><button type='button' class='btn btn-outline-info' id=${i} onclick='window.location.href="ViewVendorStore.html?vendorId=${vendorId}"'>View Store</button></td>`
									: `<td class='trigbutton'><button type='button' class='btn btn-outline-info'>No Store</button></td>`
							}`
						);
            $("#venListTableId").append(tr);
          }
        });
  });
}

async function getDeliveryBoys() {
  $(document).ready(function () {
    var url =
      "https://api-ecommerce.datavivservers.in/mobile_api/GetAllDeliveryBoyDetails/";
    var i;
      fetch(url, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          var responseObj = data.data;
          for ( i = 0; i < responseObj.length; i++) {
          var deliveryBoyID = responseObj[i].deliveryBoyId;
          var tr = $('<tr/>');
          tr.append("<td>" + responseObj[i].full_name + "</td>");
          tr.append("<td>" + responseObj[i].mob_no + "</td>");
          tr.append(`<td class='trigbutton'><button type='button' class='btn btn-outline-info' id='${i}' onclick='window.location.href="DeliveryboylistaccordingVendors.html?deliveryBoyID=${deliveryBoyID}"'>Check Assigned Vendors</button></td>`);
          $('#delboyListTableId').append(tr);
          }
        });
  });
}

async function getStores() {
  $(document).ready(function () {
    var url =
      "https://api-ecommerce.datavivservers.in/mobile_api/AllVendorStoreDetails/";
    var i;
      fetch(url, {
        method: "get",
			})
				.then((res) => res.json())
				.then((data) => {
					var responseObj = data.data;
					for (i = 0; i < responseObj.length; i++) {
						var vendorId = responseObj[i].vendor_Id;
						var ventableId = responseObj[i].vendor_table_id;
						var tr = $("<tr/>");
						tr.append("<td>" + responseObj[i].store_name + "</td>");
						tr.append("<td>" + responseObj[i].city + "</td>");
						tr.append("<td>" + responseObj[i].address + "</td>");
						tr.append("<td>" + responseObj[i].contact_person + "</td>");
						tr.append("<td>" + responseObj[i].contact_no1 + "</td>");
						tr.append("<td>" + responseObj[i].vendor_userName + "</td>");
						tr.append(`<div style="display:flex;">
            <td class='trigbutton'><button type='button' class='btn btn-outline-info' id='${i}' onclick='window.location.href="AddVendorStoreProducts.html?vendorId=${ventableId}"'>Add Product</button></td>
            <td class='trigbutton'><button type='button' class='btn btn-outline-info' id='${i}' onclick='window.location.href="GetExistingProductList(venId).html?vendorId=${vendorId}&ventableID=${ventableId}"'>Check Existing Products</button></td>
            <td class='trigbutton'><button type='button' class='btn btn-outline-info' id='${i}' onclick='window.location.href="AssignDeliveryBoytoVendor.html?ventableId=${ventableId}"'>Add Delivery Boy</button></td>
          </div>`);
						tr.append(`<div>
          <td class='trigbutton'><button type='button' class='btn btn-outline-info' id='${i}' onclick='window.location.href="assignVendorToStore.html?id=${responseObj[i].id}"'>Update Vendors</button></td>
          <td class='trigbutton'><button type='button' class='btn btn-outline-info' id='refresh-${i}'>Refresh Inventory</button></td>
          </div>`);
						$("#storeListTableId").append(tr);
					}
					// Refresh Inventory Button
					responseObj.forEach((obj, i) => {
						document
							.getElementById(`refresh-${i}`)
							.addEventListener("click", (e) => {
                console.log(obj.id)
								refreshInventory(e.target,obj.id);
							});
					});
				});
  });
}

// Refresh Inventory
async function refreshInventory(button,id){
	button.innerText = "loading...";
	fetch(
		`https://api-ecommerce.datavivservers.in/mobile_api/updateInventoryView/${id}/`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: "token " + token,
			},
		}
	)
		.then((res) => res.json())
		.then((res) => {
			button.innerText = "Refresh Inventory";
			alert(res.data);
		});
}

async function getCustomers() {
  $(document).ready(function () {
    var url =
      "https://api-ecommerce.datavivservers.in/mobile_api/GetMostOrderedCustomer/";
    var i;
      fetch(url, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          var responseObj = data.data;
          for ( i = 0; i < responseObj.length; i++) {
          var userId = responseObj[i].id;
          var tr = $('<tr/>');
          tr.append("<td>" + responseObj[i].full_name + "</td>");
          tr.append("<td>" + responseObj[i].userName + "</td>");
          tr.append("<td>" + responseObj[i].total_orders + "</td>");
          tr.append(`<td class='trigbutton'><button type='button' class='btn btn-outline-info' id='${i}' onclick='window.open("AddOfferstoCustomers.html?userId=${userId}")' >Add Offers</button></td>`);
          $('#customerListTableId').append(tr);
          } 
        });
  });
}

async function getProductsCategory() {
  $(document).ready(function () {
    var url =
      "https://api-ecommerce.datavivservers.in/mobile_api/ProductCategoryDetails/";
      fetch(url, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          var responseObj = data.data;
          for (var i = 0; i < responseObj.length; i++) {
            var Id = responseObj[i].id;
            var catId = responseObj[i].id;
            var vendorId =responseObj[i].vendor_Id
            var ventableId = responseObj[i].vendor_table_id;
            var tr = $('<tr/>');
            tr.append("<td>" + responseObj[i].category_name + "</td>");
            tr.append("<td>" + responseObj[i].category_description + "</td>");
            tr.append(`<td><img height=60 src="https://api-ecommerce.datavivservers.in${responseObj[i].product_thumbnail}"></img></td>`);
            tr.append(`"<td class='trigbutton'><button type='button' class='btn btn-outline-info ${catId}' id='`+i+`'>Update</button></td>"`);
            tr.append(`"<td class='trigbutton'><button type='button' class='btn btn-outline-info ${i}' id='`+catId+`'>Delete</button></td>"`);
            $('#productscatListTableId').append(tr);
            $(document).on('click','.'+i,function(){
              var id = $(this).attr('id'); 
              fetch("https://api-ecommerce.datavivservers.in/mobile_api/ProductCategoryDetails/" +
              id,{
                method:"DELETE"
              }).then(resp=>resp.json())
              .then(res=>{
                console.log(res)
                alert("Record deleted");
                window.location.reload()
              })
            }); 
            $(document).on('click','.'+catId,function(){
              var i = $(this).attr('id'); 
              window.location.href="UpdateProductCategories.html?i="+i;
          });               

          }
        });
  });
}

async function getProducts() {
  $(document).ready(function () {
    var i;
    var url =
      "https://api-ecommerce.datavivservers.in/mobile_api/productDetailsView/";
      fetch(url, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          var responseObj = data.data;
          for ( i = 0; i < responseObj.length; i++) {
            var j = i;
            var updateObj = responseObj[i];
            var prodId = responseObj[i].id;
            var vendorId =responseObj[i].vendor_Id
            var ventableId = responseObj[i].vendor_table_id;
            var tr = $('<tr/>');
            tr.append("<td>" + responseObj[i].product_name + "</td>");
            tr.append("<td>" + responseObj[i].product_description + "</td>");
            tr.append("<td>" + responseObj[i].product_price + "</td>");
            tr.append("<td>" + responseObj[i].product_status + "</td>");
            tr.append(`<td><img height=60 alt=${responseObj[i].product_name} src="https://api-ecommerce.datavivservers.in${responseObj[i].product_images}"></img></td>`);
            tr.append(`"<td class='trigbutton'><button type='button' class='btn btn-outline-info prod${prodId}'  id='`+i+`'>Update</button></td>"`);
            tr.append(`"<td class='trigbutton'><button type='button' class='btn btn-outline-info ${i}' id='`+prodId+`'>Delete</button></td>"`);
            $('#productsListTableId').append(tr);
            $(document).on('click','.'+i,function(){
              var id = $(this).attr('id'); 
              fetch("https://api-ecommerce.datavivservers.in/mobile_api/productDetailsView/" +
              id,{
                method:"DELETE"
              }).then(resp=>resp.json())
              .then(res=>{
                console.log(res)
                alert("Record deleted");
                window.location.reload()
              })
            }); 
            $(document).on('click','.prod'+prodId,function(){
              var i = $(this).attr('id'); 
              window.location.href="UpdateProduct.html?i="+i;
            });                
          } 
        });
  });
}

async function getAllOffers() {
  $(document).ready(function () {
    var i;
    var url =
      "https://api-ecommerce.datavivservers.in/mobile_api/OfferDetails/";
      fetch(url, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          var responseObj = data.data;
          for ( i = 0; i < responseObj.length; i++) {
            var j = i;
            var updateObj = responseObj[i];
            var offerId = responseObj[i].id;
            var vendorId =responseObj[i].vendor_Id;
            var tr = $('<tr/>');
            tr.append("<td>" + responseObj[i].offer_title_name + "</td>");
            tr.append("<td>" + responseObj[i].promo_code + "</td>");
            tr.append("<td>" + responseObj[i].offer_description + "</td>");
            tr.append("<td>" + responseObj[i].offer_start_date + "</td>");
            tr.append("<td>" + responseObj[i].offer_end_date  + "</td>");
            tr.append(`"<td class='trigbutton'><button type='button' class='btn btn-outline-info offer${offerId}'  id='`+i+`'>Update</button></td>"`);
            tr.append(`"<td class='trigbutton'><button type='button' class='btn btn-outline-info offer${i}' id='`+offerId+`'>Delete</button></td>"`);
            console.log(vendorId);
            $('#offerListTableId').append(tr);
            $(document).on('click','.offer'+i,function(){
              var id = $(this).attr('id'); 
              fetch("https://api-ecommerce.datavivservers.in/mobile_api/OfferDetails/" +
              id,{
                method:"DELETE"
              }).then(resp=>resp.json())
              .then(res=>{
                console.log(res)
                alert("Offer deleted");
                window.location.href="dashboard.html";
              })
            }); 
            $(document).on('click','.offer'+offerId,function(){
              var i = $(this).attr('id'); 
              window.location.href="UpdateOffer.html?i="+i;
            });                
          } 
        });
  });
}
async function getAllCurrentOrders() {
  $(document).ready(function () {
    var url =
      "https://api-ecommerce.datavivservers.in/mobile_api/CurrentPlaceOrders/";
      fetch(url, {
        method: "get",
      })
        .then((res) => res.json())
        .then((data) => {
          var responseObj = data.data;
          for ( var i = 0; i < responseObj.length; i++) {
            var orderId = responseObj[i].order_id;
            var Oid = responseObj[i].id;
            var vendorId = responseObj[i].vendor_Id;
            var tr = $('<tr/>');
            tr.append("<td>" + responseObj[i].user_full_name + "</td>");
            tr.append("<td>" + responseObj[i].vendor_first_name+" "+responseObj[i].vendor_last_name+ "</td>");
            tr.append(`"<td class='trigbutton'><button type='button' class='btn btn-outline-info ${i}'  id='`+orderId+`'>View Order Details</button></td>"`);
            tr.append(`"<td class='trigbutton'><button type='button' class='btn btn-outline-info ${orderId}'  id='`+orderId+`'>Accept Order</button></td>"`);
            tr.append(`"<td class='trigbutton'><button type='button' class='btn btn-outline-info offer${Oid}' id='`+orderId+`'>Cancel Order</button></td>"`);
            $('#CurrentPlaceOrdersId').append(tr);
           
            $(document).on('click','.offer'+Oid,function(){
              var id = $(this).attr('id'); 
              fetch("https://api-ecommerce.datavivservers.in/mobile_api/OrderCancelByAdmin/" ,
              {
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify({
                  order_Id: id
              }) 
              }).then(resp=>resp.text())
              .then(res=>{
                console.log(res)
                alert("Order Cancelled");
                window.location.href="dashboard.html";
              })
            }); 
            $(document).on('click','.'+orderId,function(){
              var id = $(this).attr('id'); 
              console.log(id);
              fetch("https://api-ecommerce.datavivservers.in/mobile_api/OrderAcceptByAdmin/" ,
              {
                method:"POST",
                headers:{
                  "Content-Type":"application/json"
                },
                body:JSON.stringify({
                order_Id: id
              })             
              }).then(resp=>resp.json())
              .then(res=>{
                console.log(res)
                alert("Order Accepted");
                window.location.href="dashboard.html";
              })
            });   
            $(document).on('click','.'+i,function(){
              var id = $(this).attr('id'); 
              console.log(id);
                window.location.href="OrderDetails.html?id="+id;
              
            });                    
          } 
        });
  });
}



