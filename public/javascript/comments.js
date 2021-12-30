if (document.readyState !== "loading") {
  initialize();
  }
  else {
    document.addEventListener("DOMContentLoaded", () => {
      initialize();
  });
}


//get the elements we need 
function initialize() {
    document.getElementById("comment-form").addEventListener("submit", onSubmit);
    document.getElementById("logout").removeEventListener("click", logout);
    document.getElementById("logout").addEventListener("click", logout);
    console.log(document.getElementById("authorspan").innerHTML, localStorage.getItem("user"));
    if (document.getElementById("authorspan").innerHTML !== localStorage.getItem("user")) {
        document.getElementById("edit-button").style.display = "none";
        document.getElementById("edit-button").classList.add("hidden");
    }
    else {
        document.getElementById("edit-button").addEventListener("click", ()=>{
            console.log("right to edit :)");
        });
    }
}

//catch user wanting to post a comment
function onSubmit(event) {
    event.preventDefault();
    const authToken = localStorage.getItem("auth_token");
    console.log("authtoken: ", authToken);
    if (!authToken) {
      alert("Please login before commenting");
      return;
    }
    const formData = new FormData(event.target);
    formData.append("username", localStorage.getItem("user"));
    //console.log("FORM DATA:", formData, localStorage.getItem("user"));
    fetch(`/threads/comments/${formData.title}`, {
        method: "POST",
        body: formData
    }).then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = `/threads/comments/${data.title}`
        }
        else {
          window.location.href = "/"
        }
      });
};

//redirect edit requests
function onEdit(thread) {
    window.location= `/threads/edit/${thread}`
}

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
