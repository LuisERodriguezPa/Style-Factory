const btnToggle = document.querySelector(".btn-toggle");
const sidebar = document.querySelector(".sidebar");

btnToggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});   


const links = document.querySelectorAll(".nav-link");

links.forEach(link => {
  link.addEventListener("click", function () {

    // Quitar active de todos
    links.forEach(l => l.classList.remove("active"));

    // Agregar active al clickeado
    this.classList.add("active");

  });
});

fetch("components/navbarAdmin/navbarAdmin.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("navbarAdmin-placeholder").innerHTML = html;

    initSidebar(); 
  });