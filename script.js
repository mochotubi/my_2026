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

  localStorage.setItem("myDiaryPage", page.innerHTML);
  alert("Revista guardada ✨");
  }
