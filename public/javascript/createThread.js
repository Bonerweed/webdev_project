if (document.readyState !== "loading") {
    initialize();
  }
  else {
    document.addEventListener("DOMContentLoaded", () => {
      initialize();
  });
};

//get elements we need to lsiten to
function initialize() {
  document.getElementById("creation-form").addEventListener("submit", onSubmit);
  document.getElementById("logout").removeEventListener("click", logout);
  document.getElementById("logout").addEventListener("click", logout);
};

//listen to the request to submit a new thread, send to backend
function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("user", localStorage.getItem("user"));
    fetch("/threads/create", {
        method: "POST",
        body: formData
    }).then((response) => response.json())
      .then((data) => {
        if (data.success) {
            //reload the thread list
            window.location.href = "/threads/list"
        }
        else {
            //redirect the user the main view should things go bad
            window.location.href = "/"
        }
      });
};

function storeToken(key, token) {
    localStorage.setItem(key, token);
};

function logout() {
  console.log("logging out");
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
  localStorage.removeItem("admin_token");
  window.location = "/";
};
