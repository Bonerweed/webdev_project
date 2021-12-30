if (document.readyState !== "loading") {
    initialize();
  }
  else {
    document.addEventListener("DOMContentLoaded", () => {
      initialize();
  });
};

function initialize() {
  document.getElementById("login-form").addEventListener("submit", onSubmit);
};

//user tries to log in
function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    //console.log(formData);
    //send ddata to backend, wait for response
    fetch("/users/login", {
        method: "POST",
        body: formData
    }).then((response) => response.json())
    .then((data) => {
          //store username for easier access
        if (data.username) {
            storeToken("user", data.username);
        }
        //store generated token
        if (data.token) {
            storeToken("auth_token", data.token);
            window.location.href="/";
        }
        else {
            if (data.message) {
                document.getElementById("error").innerHTML = data.message;
            }  else {
                document.getElementById("error").innerHTML = "something went wrong";
            }
        }
    });
};

function storeToken(key, token) {
    localStorage.setItem(key, token);
};
