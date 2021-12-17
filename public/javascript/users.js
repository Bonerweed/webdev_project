if (document.readyState !== "loading") {
  initialize();
  }
  else {
    document.addEventListener("DOMContentLoaded", () => {
      initialize();
  });
}

function initialize() {
  document.getElementById("list").addEventListener("click", listOfUsers);
  document.getElementById("logout").removeEventListener("click", logout);
  document.getElementById("logout").addEventListener("click", logout);
}


function listOfUsers(event) {
  event.preventDefault();
  const authToken = localStorage.getItem("auth_token");
  console.log("authtoken: ", authToken);
  if (!authToken) {
    return;
  }
  fetch("/users/list", {
      method: "GET",
      headers: {
          "authorization": "Bearer " + authToken
      }
  }).then((response) => response.text())
    .then((page) => {
        document.getElementById("content").innerHTML = page;
    })
    .catch((e) => {
        console.log("error" + e);
    });
}

function removeUser(event) {
  event.preventDefault();
  const adminToken = localStorage.getItem("admin_token");
  if (!adminToken) {
    return;
  }
  fetch("/users/removeUser", {
    method: "GET",
    headers: {
      "adminpriviledges": adminToken
    }
  }).then((response) => response.json())
    .then((data) => {
      if (data.success) {
        listOfUsers();
      }
      else {
        console.log("something went wrong with removal response");
        window.location.href = "/";
      }
    });
}


function logout() {
  console.log("logging out");
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
  localStorage.removeItem("admin_token");
  window.location.href = "/";
};
