document.addEventListener("DOMContentLoaded", () => {

  function savePage() {
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

  function savePage() {
  let revistas = JSON.parse(localStorage.getItem("revistas")) || [];

  const nuevaRevista = {
    id: Date.now(),
    contenido: page.innerHTML,
    fecha: new Date().toLocaleDateString()
  };

  revistas.push(nuevaRevista);

  localStorage.setItem("revistas", JSON.stringify(revistas));

  alert("Revista guardada 📖");

  window.location.href = "home.html"; // 👈 volver a portadas
}
  alert("Revista guardada ✨");
  }
