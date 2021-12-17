if (document.readyState !== "loading") {
  initialize();
  }
  else {
    document.addEventListener("DOMContentLoaded", () => {
      initialize();
  });
}

function initialize() {
  document.getElementById("logout").removeEventListener("click", logout);
  document.getElementById("logout").addEventListener("click", logout);
}

function logout() {
  console.log("logging out");
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
  localStorage.removeItem("admin_token");
  window.location.href = "/";
};
