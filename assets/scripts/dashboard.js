window.onload = () => {
  dashboard();
  updateDeliveryBoys();
};

// Token from local Storage
var token = localStorage.getItem("token");

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
function updateDeliveryBoys() {
  fetch(
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
      updateRows(  data.data);

      console.log(data);
    });

  // var table = document.getElementById("deliveryboysTable");
  // var tr = table.insertRow();
  // tr.innerHTML = tablerow;
}

function updateRows(deliveryboys){
  deliveryboys.forEach(element => {
    var idcell=`<td style="text-align:center">#${element.delivery_boyId}</td>`
    var namecell=`<td>
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
              <div class="widget-subheading opacity-7">${element.delivery_address1,element.delivery_address2}</div>
              </div>
              </div>
        </div>
      </td>`;
    var phonecell=`<td class="text-center">${element.delivery_mob_no}
    </td>`;
    var table = document.getElementById("deliveryboysTable");
    var tr = table.insertRow();
    var cell1=tr.insertCell(0)
    var cell2=tr.insertCell(1)
    var cell3=tr.insertCell(2)
    cell1.innerHTML=idcell;
    cell2.innerHTML=namecell;
    cell3.innerHTML=phonecell;
  });
}