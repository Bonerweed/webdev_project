if (document.readyState !== "loading") {
  initialize();
  }
  else {
    document.addEventListener("DOMContentLoaded", () => {
      initialize();
  });
}

function initialize() {
  //document.getElementById("list").addEventListener("click", listOfUsers);
  let old_logout = document.getElementById("logout");
  let new_logout = old_logout.cloneNode(true);
  old_logout.parentNode.replaceChild(new_logout, old_logout);
  //document.getElementById("logout").removeEventListener("click", logout);
  document.getElementById("logout").addEventListener("click", logout);
}

//Old request for list of users, no longer supported
/*function listOfUsers(event) {
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
}*/

//old call for removal of user, no longer supported

/*function removeUser(event) {
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
}*/


function logout() {
  console.log("logging out");
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
  localStorage.removeItem("admin_token");
  window.location.href = "/";
};
