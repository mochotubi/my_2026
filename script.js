document.addEventListener("DOMContentLoaded", () => {

  const page = document.getElementById("page");

  function addTitle() {
    const block = document.createElement("div");
    block.className = "block";
    block.innerHTML = '<input placeholder="Título...">';
    page.appendChild(block);
  }

  function addText() {
    const block = document.createElement("div");
    block.className = "block";
    block.innerHTML = '<textarea placeholder="Escribe aquí..."></textarea>';
    page.appendChild(block);
  }

  function addImage() {
    const block = document.createElement("div");
    block.className = "block";

    const input = document.createElement("input");
    input.type = "file";

    input.onchange = function () {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        block.innerHTML = `<img src="${e.target.result}">`;
      };

      reader.readAsDataURL(file);
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

  function savePage() {
    localStorage.setItem("myDiaryPage", page.innerHTML);
    alert("Guardado ✨");
  }

  function loadPage() {
    const saved = localStorage.getItem("myDiaryPage");
    if (saved) {
      page.innerHTML = saved;
    }
  }

  // 👇 MUY IMPORTANTE
  window.addTitle = addTitle;
  window.addText = addText;
  window.addImage = addImage;
  window.addQuote = addQuote;
  window.savePage = savePage;

  loadPage();
});
