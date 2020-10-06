// Params instance
let searchParams = new URLSearchParams(window.location.search);

// Order ID
var deliveryboyid = searchParams.get("deliveryboyid");

// Token from local Storage
var token = localStorage.getItem("token");

// Lat and Long
var lat=localStorage.getItem('vendorLocationLat')
var lon=localStorage.getItem('vendorLocationLon')

if(lat==null || lon==null){
    alert('Your location is not set,please logout and login again!')
    window.close()
}

fetch(
  "https://api-ecommerce.datavivservers.in/mobile_api/GetDeliveryBoyLocationById/",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "token " + token,
    },
    body: JSON.stringify({
      delivery_boy_Id: deliveryboyid,
    }),
  }
).then(res=>res.json())
.then(resp=>{
    location.replace(`https://www.google.com/maps/dir/?api=1&origin=${lat},${lon}&destination=${resp.data.delivery_lat},${resp.data.delivery_lon}`)
});
