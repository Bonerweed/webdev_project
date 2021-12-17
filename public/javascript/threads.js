if (document.readyState !== "loading") {
  initialize();
  }
  else {
    document.addEventListener("DOMContentLoaded", () => {
      initialize();
  });
}

function initialize() {
  document.getElementById("create-new").addEventListener("click", createNew);
  //document.getElementById("logout").addEventListener("click", logout);
}


function createNew(event) {
  event.preventDefault();
  const authToken = localStorage.getItem("auth_token");
  console.log("authtoken: ", authToken);
  if (!authToken) {
    alert("Please login before creating threads");
    return;
  }
  window.location.href = "/threads/create"
}


function showThread(title) {
  //console.log(title);
  fetch(`/threads/comments/${title}`, {})
  .then((response) => response.json())
  .then( (data) => {
    console.log("HERES DATA: ", data);
  })
  .catch((e) => {
      console.log("error" + e);
  });
    /*.then((page) => {
        document.getElementById("content").innerHTML = page;
    })
    */
  //window.location.href = `/threads/comments/${title}`;
}
