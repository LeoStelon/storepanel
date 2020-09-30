window.onload = function () {
  //Login page
  if (window.location.href == "http://127.0.0.1:5500/") {
    // Change here(url)
    //Changed the condition link
    var loginbtn = document.querySelector(".l-btn");
    loginbtn.addEventListener("click", (e) => {
      e.preventDefault();
      login();
    });
  }

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
              console.log("reached here");
              var { first_name } = data.data[0];
              localStorage.setItem("first_name", first_name);
              var test = localStorage.getItem("first_name");
              console.log("first name: " + test);
              window.location.replace("http://127.0.0.1:5500/dashboard.html"); // Change here(url)
            } else console.log("Authorization Denied");
          })
          .catch(function (error) {
            console.error(error);
          });
      });
  }
  //Main Dashboard
};
