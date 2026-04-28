fetch("/components/navbar/navbar.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("header").innerHTML = html;
  })
  .catch((err) => console.error("Error cargando el navbar:", err));

fetch("../../components/footer/footer.html")
  .then((res) => res.text())
  .then((html) => {
    document.getElementById("footer-placeholder").innerHTML = html;
  })
  .catch((err) => console.error("Error cargando el footer:", err));

const estilistas = [
  {
    id: 1,
    nombre: "Ana García",
    especialidad: "Colorimetría",
    foto: "https://res.cloudinary.com/diq2bkb49/image/upload/v1777336588/Sty1_wj2bmn.png",
    disponibilidad: {
      "2026-04-28": ["09:00", "10:00", "14:00", "15:00"],
      "2026-04-29": ["09:00", "11:00", "16:00"],
      "2026-04-30": ["10:00", "13:00", "17:00"],
      "2026-05-02": ["09:00", "10:00", "11:00"],
      "2026-05-03": ["14:00", "15:00", "16:00"],
    },
  },
  {
    id: 2,
    nombre: "Laura Martínez",
    especialidad: "Cortes y peinados",
    foto: "https://res.cloudinary.com/diq2bkb49/image/upload/v1777336622/Sty2_z1upkm.png",
    disponibilidad: {
      "2026-04-28": ["08:00", "09:00", "11:00"],
      "2026-04-29": ["10:00", "12:00", "15:00"],
      "2026-04-30": ["09:00", "11:00", "14:00"],
      "2026-05-02": ["13:00", "15:00", "17:00"],
      "2026-05-03": ["09:00", "10:00", "12:00"],
    },
  },
  {
    id: 3,
    nombre: "Camila Rodríguez",
    especialidad: "Tratamientos capilares",
    foto: "https://res.cloudinary.com/diq2bkb49/image/upload/v1777336764/Sty3_hk8sdy.png",
    disponibilidad: {
      "2026-04-28": ["10:00", "12:00", "16:00"],
      "2026-04-29": ["09:00", "13:00", "15:00"],
      "2026-04-30": ["11:00", "14:00", "18:00"],
      "2026-05-02": ["08:00", "09:00", "10:00"],
      "2026-05-03": ["13:00", "14:00", "15:00"],
    },
  },
  {
    id: 4,
    nombre: "Valentina López",
    especialidad: "Alisados y keratina",
    foto: "https://res.cloudinary.com/diq2bkb49/image/upload/v1777336831/Sty4_yhgjef.png",
    disponibilidad: {
      "2026-04-28": ["09:00", "11:00", "13:00"],
      "2026-04-29": ["10:00", "12:00", "16:00"],
      "2026-04-30": ["08:00", "10:00", "12:00"],
      "2026-05-02": ["14:00", "16:00", "18:00"],
      "2026-05-03": ["09:00", "11:00", "13:00"],
    },
  },
  {
    id: 5,
    nombre: "Daniel Herrera",
    especialidad: "Corte caballero y barba",
    foto: "https://res.cloudinary.com/diq2bkb49/image/upload/v1777336977/Sty5_wnafrw.png",
    disponibilidad: {
      "2026-04-28": ["09:00", "10:00", "11:00", "15:00"],
      "2026-04-29": ["10:00", "12:00", "14:00"],
      "2026-04-30": ["09:00", "11:00", "13:00"],
      "2026-05-02": ["08:00", "09:00", "10:00"],
      "2026-05-03": ["16:00", "17:00", "18:00"],
    },
  },
  {
    id: 6,
    nombre: "Santiago Ruiz",
    especialidad: "Barbería clásica y perfilado de barba",
    foto: "https://res.cloudinary.com/diq2bkb49/image/upload/v1777337017/Sty6_vgztvb.png",
    disponibilidad: {
      "2026-04-28": ["08:00", "09:00", "12:00"],
      "2026-04-29": ["11:00", "13:00", "15:00"],
      "2026-04-30": ["10:00", "12:00", "14:00"],
      "2026-05-02": ["09:00", "11:00", "13:00"],
      "2026-05-03": ["14:00", "16:00", "18:00"],
    },
  },
];

const carouselInner = document.getElementById("carouselInner");
let cantCards = 4;

for (let i = 0; i < estilistas.length; i += cantCards) {
  const grupo = estilistas.slice(i, i + cantCards);

  const item = document.createElement("div");
  item.className = "carousel-item " + (i === 0 ? "active" : "");

  let row = '<div class="row">';

  grupo.forEach((est) => {
    row += `
        <div class="col-md-3">
          <div class="card card-estilista">
            <img src="${est.foto}" class="card-img-top">
            <div class="card-body text-center">
              <h5>${est.nombre}</h5>
              <p class="text-purple">${est.especialidad}</p>
            </div>
          </div>
        </div>
      `;
  });
  row += "</div>";
  item.innerHTML = row;
  carouselInner.appendChild(item);
}


