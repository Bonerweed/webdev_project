if (document.readyState !== "loading") {
  initialize();
  }
  else {
    document.addEventListener("DOMContentLoaded", () => {
      initialize();
  });
}

//these will help showing only a number of threads at once
let CurrentPage = 0;
let Threads;
let ThreadTable;

function initialize() {
  document.getElementById("create-new").addEventListener("click", createNew);

  //reset the logout function
  let old_logout = document.getElementById("logout");
  let new_logout = old_logout.cloneNode(true);
  old_logout.parentNode.replaceChild(new_logout, old_logout);

  //get the thread list to visually shuffle it around
  document.getElementById("logout").addEventListener("click", logout);
  ThreadTable = document.getElementsByTagName("tbody");
  Threads = ThreadTable[0].childNodes;
  renderThreads();
}


//send auth token to backend to create a thread
function createNew(event) {
  event.preventDefault();
  const authToken = localStorage.getItem("auth_token");
  console.log("authtoken: ", authToken);
  if (!authToken) {
    alert("Please login before creating threads");
    return;
  }
  //window.location.href = "/threads/create"
  fetch("/threads/create/auth", {
      method: "GET",
      headers: {
          "authorization": "Bearer " + authToken
      }
  }).then((response) => {
      if (response.redirected) {
            window.location.href = response.url;
        }
  });
}

//redirect to the chose thread
function showThread(title) {
  window.location.href = `/threads/comments/${title}`;
}
//remove the thread if authorized
function nukeThread(title) {
    const authToken = localStorage.getItem("auth_token");
    console.log("authtoken: ", authToken);
    if (!authToken) {
      alert("Please login as administrator before nuking threads");
      return;
    }
    //send request to backen, wait for result
    fetch(`/threads/nuke/${title}`, {
        method: "POST",
        headers: {
            "authorization": "Bearer " + authToken
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            alert(data.messeage);
        }
        else {
            alert(data.messeage);
            window.location.href = "/threads/list"
        }
    });
}
//show the next ten threads
function forwardTen() {
    if (((Threads.length-1) - CurrentPage * 10) > 0) {
        ++CurrentPage;
        renderThreads();
    }
    
}
//show the previous ten threads
function backTen() {
    if (CurrentPage > 0) {
        --CurrentPage;
        renderThreads();
    }
}
//function that hides or shows threads based on current page
function renderThreads() {
    for (let i = 1; i < (Threads.length); i++) {
        if (i >= (CurrentPage * 10 + 1) && i < CurrentPage * 10 + 11) {
            Threads[i].style.display = "";
        }
        else {
            Threads[i].style.display = "none";
        }
    }
}

function logout() {
  console.log("logging out");
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user");
  localStorage.removeItem("admin_token");
  console.log(window.location.href);
  window.location= "/";
};
