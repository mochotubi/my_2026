const home = document.getElementById("home");
const editor = document.getElementById("editor");
const viewer = document.getElementById("viewer");

const page = document.getElementById("page");
const list = document.getElementById("list");
const viewContent = document.getElementById("viewContent");

let revistas = JSON.parse(localStorage.getItem("revistas")) || [];

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

// 💾 GUARDAR COMO REVISTA
function saveMagazine() {
  // convertir inputs en texto bonito
  const blocks = document.querySelectorAll(".block");

  blocks.forEach(block => {
    const input = block.querySelector("input, textarea");

    if (input) {
      const text = input.value;

      if (block.classList.contains("quote")) {
        block.innerHTML = `<p>"${text}"</p>`;
      } else if (input.tagName === "INPUT") {
        block.innerHTML = `<h1>${text}</h1>`;
      } else {
        block.innerHTML = `<p>${text}</p>`;
      }
    }
  });

  revistas.push({
    id: Date.now(),
    contenido: page.innerHTML
  });

  localStorage.setItem("revistas", JSON.stringify(revistas));

  goHome();
}

// 📚 LISTA DE REVISTAS
function renderList() {
  list.innerHTML = "";

  revistas.forEach(r => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h2>Revista</h2>
      <button onclick="openMagazine(${r.id})">Abrir</button>
    `;
    list.appendChild(div);
  });
}

// 📖 VER REVISTA
function openMagazine(id) {
  const revista = revistas.find(r => r.id === id);

  viewContent.innerHTML = revista.contenido;

  home.style.display = "none";
  viewer.style.display = "block";
}

// iniciar
goHome();

window.newMagazine = newMagazine;
window.addTitle = addTitle;
window.addText = addText;
window.addImage = addImage;
window.addQuote = addQuote;
window.saveMagazine = saveMagazine;
window.openMagazine = openMagazine;
window.goHome = goHome;
