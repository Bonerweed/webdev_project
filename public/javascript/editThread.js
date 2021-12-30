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

//listen to submit, send form data to backend
function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("username", localStorage.getItem("user"));
    fetch(`/threads/edit/`, {
        method: "POST",
        body: formData
    }).then((response) => response.json())
      .then((data) => {
        if (data.success) {
            //reload the thread on success
            window.location.href = `/threads/comments/${data.title}`
        }
        else {
            window.location.href = "/threads/list"
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
