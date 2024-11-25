let siteName = document.getElementById("site-name");
let siteUrl = document.getElementById("site-url");
let addBtn = document.getElementById("submit-btn");
let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
let table = document.querySelector(".mytable tbody");
let popUp = document.querySelector(".pop-up");
let close = document.querySelector(".close");
if (bookmarks === null) {
  bookmarks = [];
}
addBtn.addEventListener("click", () => {
  validteUrl();
  validateName();
  let site = {
    url: siteUrl.value,
    name: siteName.value,
  };
  if (
    siteUrl.classList.contains("is-valid") &&
    siteName.classList.contains("is-valid")
  ) {
    bookmarks.push(site);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks(site, bookmarks.length - 1);
    siteName.value = "";
    siteUrl.value = "";
  } else {
    console.log("not valid");
    popUp.classList.remove("d-none");
    popUp.classList.add("d-block");
  }
});

function displayBookmarks(bookmark, index) {
  table.innerHTML += `
            <tr>
            <td>
            ${index + 1}
            </td>
            <td>
               ${bookmark.name}
            </td>
            <td>
              <button class="btn green-button" href = "${
                bookmark.url
              }" onclick ="visit('${bookmark.url}')">
                <i class="fa-solid fa-eye"
                ></i>
                Visit
              </button>
            </td>
            <td>
              <button class="btn btn-danger remove" onclick = "remove(${index})">
                <i class="fa-solid fa-trash-can">
                </i>
                Delete
              </button>
            </td>
          </tr>`;
}

function update() {
  let i = 0;
  table.innerHTML = "";
  bookmarks.forEach((bookmark) => {
    displayBookmarks(bookmark, i++);
  });
}

document.addEventListener("DOMContentLoaded", update);

function remove(index) {
  console.log(index);
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  update();
}

function validteUrl() {
  let regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
  if (regex.test(siteUrl.value)) {
    siteUrl.classList.remove("is-invalid");
    siteUrl.classList.add("is-valid");
  } else {
    siteUrl.classList.remove("is-valid");
    siteUrl.classList.add("is-invalid");
  }
}

function validateName() {
  let regex = /\w{3,}/;
  if (regex.test(siteName.value)) {
    siteName.classList.remove("is-invalid");
    siteName.classList.add("is-valid");
  } else {
    siteName.classList.remove("is-valid");
    siteName.classList.add("is-invalid");
  }
}

function visit(url) {
  let regex = /^(https:|http:)\/\//;
  if (regex.test(url)) {
    window.open(url);
  } else {
    window.open("https://" + url);
  }
}

siteName.addEventListener("input", validateName);
siteUrl.addEventListener("input", validteUrl);

close.addEventListener("click", (e) => {
  popUp.classList.remove("d-block");
  popUp.classList.add("d-none");
  e.stopPropagation();
});

document.querySelector(".pop-up-content").addEventListener("click", (e) => {
  popUp.classList.remove("d-none");
  popUp.classList.add("d-block");
  e.stopPropagation();
});
popUp.addEventListener("click", (e) => {
  popUp.classList.remove("d-block");
  popUp.classList.add("d-none");
});
