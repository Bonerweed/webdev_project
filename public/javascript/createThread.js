if (document.readyState !== "loading") {
    initialize();
  }
  else {
    document.addEventListener("DOMContentLoaded", () => {
      initialize();
  });
};

function initialize() {
  document.getElementById("creation-form").addEventListener("submit", onSubmit);
  document.getElementById("logout").removeEventListener("click", logout);
  document.getElementById("logout").addEventListener("click", logout);
};

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    console.log(formData);
    formData.username = localStorage.getItem("user");
    console.log(formData);
    fetch("/threads/create", {
        method: "POST",
        body: formData
    }).then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/threads/list"
        }
        else {
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
  window.location.href = "/";
};
