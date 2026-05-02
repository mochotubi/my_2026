document.addEventListener("DOMContentLoaded", () => {

  // TODO tu código aquí dentro 👇

});const home = document.getElementById("home");
const editor = document.getElementById("editor");
const viewer = document.getElementById("viewer");

const page = document.getElementById("page");
const list = document.getElementById("list");
const viewContent = document.getElementById("viewContent");

let revistas = JSON.parse(localStorage.getItem("revistas")) || [];

// 📚 VARIABLES LIBRO
let currentPage = 0;
let currentPages = [];

// 🧠 CAMBIAR VISTAS
function goHome() {
  home.style.display = "block";
  editor.style.display = "none";
  viewer.style.display = "none";
  renderList();
}

function newMagazine() {
  page.innerHTML = "";
  home.style.display = "none";
  editor.style.display = "block";
}

// ✍️ BLOQUES
function addTitle() {
  const block = document.createElement("div");
  block.className = "block";
  block.innerHTML = '<input placeholder="Título">';
  page.appendChild(block);
}

function addText() {
  const block = document.createElement("div");
  block.className = "block";
  block.innerHTML = '<textarea placeholder="Texto..."></textarea>';
  page.appendChild(block);
}

function addImage() {
  const block = document.createElement("div");
  block.className = "block";

  const input = document.createElement("input");
  input.type = "file";

  input.onchange = function () {
    const reader = new FileReader();
    reader.onload = function (e) {
      block.innerHTML = `<img src="${e.target.result}">`;
    };
    reader.readAsDataURL(input.files[0]);
  };

  block.appendChild(input);
  page.appendChild(block);
}

function addQuote() {
  const block = document.createElement("div");
  block.className = "block quote";
  block.innerHTML = '<textarea placeholder="Frase..."></textarea>';
  page.appendChild(block);
}

// 💾 GUARDAR
function saveMagazine() {

  const date = document.getElementById("date")?.value || "";
  const time = document.getElementById("time")?.value || "";

  const blocks = document.querySelectorAll(".block");

  let pages = [];

  blocks.forEach(block => {
    const input = block.querySelector("input, textarea");

    if (input) {
      let text = input.value;

      if (block.classList.contains("quote")) {
        pages.push(`<p>"${text}"</p>`);
      } else if (input.tagName === "INPUT") {
        pages.push(`<h1>${text}</h1>`);
      } else {
        pages.push(`<p>${text}</p>`);
      }
    } else {
      pages.push(block.innerHTML);
    }
  });

  revistas.push({
    id: Date.now(),
    fecha: date,
    hora: time,
    pages: pages
  });

  localStorage.setItem("revistas", JSON.stringify(revistas));

  goHome();
}

// 📚 LISTA
function renderList() {
  list.innerHTML = "";

  revistas.forEach(r => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h2>${r.fecha || "Sin fecha"}</h2>
      <p>${r.hora || ""}</p>
      <button onclick="openMagazine(${r.id})">Abrir</button>
    `;

    list.appendChild(div);
  });
}

// 📖 VER REVISTA
function openMagazine(id) {
  const revista = revistas.find(r => r.id === id);

  currentPages = revista.pages;
  currentPage = 0;

  showPage();

  home.style.display = "none";
  viewer.style.display = "block";
}

function showPage() {
  viewContent.innerHTML = `
    <div class="book-page">
      ${currentPages[currentPage] || ""}
      <p style="text-align:center; margin-top:20px;">
        Página ${currentPage + 1} / ${currentPages.length}
      </p>
    </div>
  `;
}

// 👉 swipe
let startX = 0;

viewContent.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

viewContent.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (endX < startX - 50 && currentPage < currentPages.length - 1) {
    currentPage++;
    showPage();
  }

  if (endX > startX + 50 && currentPage > 0) {
    currentPage--;
    showPage();
  }
});

// 🚀 INICIO
goHome();

// 🔥 CONECTAR BOTONES
window.newMagazine = newMagazine;
window.addTitle = addTitle;
window.addText = addText;
window.addImage = addImage;
window.addQuote = addQuote;
window.saveMagazine = saveMagazine;
window.openMagazine = openMagazine;
window.goHome = goHome;


