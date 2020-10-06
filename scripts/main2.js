var token=localStorage.getItem('token');
if(token){
  location.replace('dashboard.html')
}

window.onload = function () {
  //Login page
  var loginbtn = document.querySelector(".l-btn");
  loginbtn.addEventListener("click", (e) => {
    e.preventDefault();
    login();
  });

  function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    const url =
      "https://api-ecommerce.datavivservers.in/mobile_api/api-token-auth/";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then((data) => {
        // const token = data.token.token
        const token = "45de8d1498c0d749e17af89099a0426357e63f21";
        localStorage.setItem("token", token);
        console.log("token " + `${token}`);
        fetch(
          "https://api-ecommerce.datavivservers.in/mobile_api/VendorManagementDetails/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "token " + `${token}`,
            },
          }
        )
          .then(function (res) {
            return res.json();
          })
          .then((data) => {
            var message = data.message;
            if (message == "OK") {
              console.log(data);
              var { first_name, vendor_id } = data.data[0];
              localStorage.setItem("first_name", first_name);
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  localStorage.setItem('vendorLocationLat',position.coords.latitude)
                  localStorage.setItem('vendorLocationLon',position.coords.longitude)
                  fetch(
                    "https://api-ecommerce.datavivservers.in/mobile_api/AddVendorLatLon/",
                    {
                      method: "Post",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: "token " + token,
                      },
                      body: JSON.stringify({
                        vendor_Id: vendor_id,
                        vendor_lat: position.coords.latitude,
                        vendor_lon: position.coords.longitude,
                      }),
                    }
                  ).then((res) =>
                    res.json().then((res) => {
                      if (res.code != 200) {
                        return alert(
                          "Location is required to access the site, Try again"
                        );
                      }
                      window.location.replace(
                        "dashboard.html"
                      ); // Change here(url)
                    })
                  );
                });
              } else {
                alert(
                  "Geolocation is not supported by this browser.Try in another browser"
                );
              }
            } else console.log("Authorization Denied");
          })
          .catch(function (error) {
            console.error(error);
          });
      });
  }
  //Main Dashboard
};
