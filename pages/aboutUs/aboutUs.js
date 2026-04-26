fetch('/components/navbar/navbar.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('header').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el navbar:', err));


fetch('../../components/footer/footer.html')
    .then(res => res.text())
    .then(html => {
        document.getElementById('footer-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Error cargando el footer:', err));

    document.querySelectorAll(".team-card").forEach(card => {
  card.querySelector(".rol").addEventListener("click", () => {
    card.classList.toggle("active");
  });
});