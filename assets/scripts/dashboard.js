window.onload = () => {
  dashboard();
};

function dashboard() {
  var token = localStorage.getItem("token");
  var tempName = localStorage.getItem("first_name"); //Check Here
  var widget_heading = document.querySelector(".widget-heading");
  console.log(tempName);
  widget_heading.textContent = tempName;
  // console.log(widget_heading);
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
      console.log(data);
      const { first_name } = data.data[0];
      widget_heading.textContent = first_name;
    });
}
