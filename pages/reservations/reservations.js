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
          <div class="card card-estilista" id="card-estilista-${est.id}" onclick="seleccionarEstilista(${est.id})">
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

// ════════════════════════════════════════════════════════════════════
// ESTADO DEL MÓDULO DE FECHA Y HORA
// ════════════════════════════════════════════════════════════════════
const estado = {
  estilista: null,   // Objeto estilista activo
  fecha: null,   // Fecha elegida "YYYY-MM-DD"
  hora: null,   // Hora elegida "HH:MM"
  anio: 2026,   // Año visible en el calendario
  mes: 3,      // Mes visible (0-based: Abril = 3)
};

const MESES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const DIAS_SEM = ["D", "L", "M", "M", "J", "V", "S"];


// ════════════════════════════════════════════════════════════════════
// seleccionarEstilista(id)
//
// Se llama desde el onclick de cada card del carousel.
// Busca el estilista en el array y arranca el flujo de fecha/hora.
// ════════════════════════════════════════════════════════════════════
function seleccionarEstilista(id) {
  // Encuentra el estilista en el array por su id
  const estilista = estilistas.find((e) => e.id === id);
  if (!estilista) return;

  // Muestra la sección de fecha y hora (estaba oculta con display:none)
  document.getElementById("seccionCalendario").style.display = "block";

  // Hace scroll suave hasta la sección del calendario
  document.getElementById("seccionCalendario").scrollIntoView({ behavior: "smooth" });

  // Inicializa el módulo de fecha/hora con el estilista elegido
  initFechaHora(estilista);
}


// ════════════════════════════════════════════════════════════════════
// initFechaHora(estilista)
//
// Reinicia el estado interno y renderiza el calendario
// con la disponibilidad del estilista recibido.
// ════════════════════════════════════════════════════════════════════
function initFechaHora(estilista) {
  // Guarda el estilista y limpia la selección anterior
  estado.estilista = estilista;
  estado.fecha = null;
  estado.hora = null;

  // Oculta la confirmación anterior al cambiar de estilista
  const confirmWrapper = document.getElementById("confirmacionServicioWrapper");
  if (confirmWrapper) confirmWrapper.style.display = "none";

  // Resetea la etiqueta de fecha y el panel de horas
  document.getElementById("horasFechaLabel").textContent = "Selecciona un día disponible";
  document.getElementById("horasGrid").innerHTML =
    `<p class="text-muted" style="font-size:13px;">Los horarios aparecerán al elegir una fecha.</p>`;

  // Renderiza el calendario con los días disponibles del estilista
  renderCalendario();
}


// ════════════════════════════════════════════════════════════════════
// renderCalendario()
//
// Genera el HTML del grid de días para el mes/año activos.
// Marca como "disponible" solo los días que están en la
// propiedad disponibilidad del estilista activo.
// ════════════════════════════════════════════════════════════════════
function renderCalendario() {
  // Actualiza la etiqueta del mes (ej: "Abril 2026")
  document.getElementById("calMonthLabel").textContent =
    `${MESES[estado.mes]} ${estado.anio}`;

  // Extrae el Set de fechas disponibles del estilista activo
  // Si no hay estilista, el Set queda vacío y todos los días van en gris
  const diasDisponibles = estado.estilista
    ? new Set(Object.keys(estado.estilista.disponibilidad))
    : new Set();

  // Día de semana del 1er día del mes (0=Dom … 6=Sáb)
  const primerDia = new Date(estado.anio, estado.mes, 1).getDay();
  // Cantidad de días del mes
  const diasDelMes = new Date(estado.anio, estado.mes + 1, 0).getDate();

  // Empieza el HTML con los nombres de días de la semana
  let html = DIAS_SEM.map((d) => `<div class="cal-nombre-dia">${d}</div>`).join("");

  // Celdas vacías hasta llegar al día correcto de la semana
  for (let i = 0; i < primerDia; i++) {
    html += `<div class="cal-dia"></div>`;
  }

  // Genera una celda por cada día del mes
  for (let d = 1; d <= diasDelMes; d++) {
    const mm = String(estado.mes + 1).padStart(2, "0");
    const dd = String(d).padStart(2, "0");
    const fechaStr = `${estado.anio}-${mm}-${dd}`; // "YYYY-MM-DD"

    const estaDisponible = diasDisponibles.has(fechaStr);
    const estaSeleccionado = estado.fecha === fechaStr;

    // Construye clases según el estado del día
    let clases = "cal-dia";
    if (estaDisponible) clases += " disponible";
    if (estaSeleccionado) clases += " seleccionado";

    // Solo los días disponibles tienen onclick
    const click = estaDisponible
      ? `onclick="seleccionarFecha('${fechaStr}')"`
      : "";

    html += `<div class="${clases}" ${click}>${d}</div>`;
  }

  document.getElementById("calGrid").innerHTML = html;
}


// ════════════════════════════════════════════════════════════════════
// seleccionarFecha(fechaStr)
//
// Se llama al hacer clic en un día disponible del calendario.
// Actualiza el estado y carga las horas de esa fecha.
// ════════════════════════════════════════════════════════════════════
function seleccionarFecha(fechaStr) {
  estado.fecha = fechaStr;
  estado.hora = null; // Resetea la hora al cambiar de fecha

  // Re-renderiza el calendario para mostrar el día resaltado
  renderCalendario();

  // Muestra la fecha en texto legible encima de los botones de hora
  const [anio, mes, dia] = fechaStr.split("-");
  document.getElementById("horasFechaLabel").textContent =
    `${parseInt(dia)} de ${MESES[parseInt(mes) - 1]} de ${anio}`;

  // Carga los botones de hora para la fecha elegida
  renderHoras(fechaStr);
}


// ════════════════════════════════════════════════════════════════════
// renderHoras(fechaStr)
//
// Lee el array de horas desde estilista.disponibilidad[fechaStr]
// y genera un botón por cada hora disponible.
// ════════════════════════════════════════════════════════════════════
function renderHoras(fechaStr) {
  const contenedor = document.getElementById("horasGrid");

  // Obtiene las horas disponibles para esa fecha
  // Si la clave no existe (no debería pasar), retorna array vacío
  const horas = estado.estilista.disponibilidad[fechaStr] ?? [];

  if (horas.length === 0) {
    contenedor.innerHTML = `<p class="text-muted" style="font-size:13px;">No hay horarios disponibles.</p>`;
    return;
  }

  // Genera un botón por cada hora
  // Si la hora coincide con la activa, agrega la clase "seleccionado"
  contenedor.innerHTML = horas
    .map(
      (hora) => `
        <button
          class="btn-hora${estado.hora === hora ? " seleccionado" : ""}"
          onclick="seleccionarHora('${hora}')">
          ${hora}
        </button>`
    )
    .join("");
}


// ════════════════════════════════════════════════════════════════════
// seleccionarHora(hora)
//
// Se llama al hacer clic en un botón de hora.
// Guarda la hora en el estado, actualiza los botones
// y muestra el resumen de la reserva.
// ════════════════════════════════════════════════════════════════════
function seleccionarHora(hora) {
  estado.hora = hora;

  // Re-renderiza las horas para resaltar la seleccionada
  renderHoras(estado.fecha);

  if (window.ConfirmacionServicio) {
    window.ConfirmacionServicio.actualizarServicio("CORTE BÁSICO", 50000);
    window.ConfirmacionServicio.actualizarProfesional(estado.estilista.nombre);
    const [anio, mes, dia] = estado.fecha.split("-");
    const fechaLegible = `${dia}/${mes}/${anio}`;
    window.ConfirmacionServicio.actualizarFechaHora(fechaLegible, estado.hora);
  }

  const confirmWrapper = document.getElementById("confirmacionServicioWrapper");
  if (confirmWrapper) confirmWrapper.style.display = "block";

  // Dispara un evento personalizado que puedes escuchar desde
  // cualquier otro módulo de tu proyecto:
  //
  //   document.addEventListener("fechaHoraSeleccionada", (e) => {
  //     const { estilista, fecha, hora } = e.detail;
  //     // → Aquí habilitas el paso siguiente, envías a tu API, etc.
  //   });
  document.dispatchEvent(
    new CustomEvent("fechaHoraSeleccionada", {
      detail: {
        estilista: estado.estilista,
        fecha: estado.fecha,   // "YYYY-MM-DD"
        hora: estado.hora,    // "HH:MM"
      },
    })
  );
}


// ════════════════════════════════════════════════════════════════════
// NAVEGACIÓN DEL CALENDARIO (botones < > de mes)
// Al cambiar de mes se resetea la fecha y hora elegidas.
// ════════════════════════════════════════════════════════════════════
document.getElementById("prevMonth").addEventListener("click", () => {
  estado.mes--;
  if (estado.mes < 0) { estado.mes = 11; estado.anio--; }

  // Resetea selección al cambiar de mes
  estado.fecha = null;
  estado.hora = null;

  renderCalendario();
  document.getElementById("horasFechaLabel").textContent = "Selecciona un día disponible";
  document.getElementById("horasGrid").innerHTML =
    `<p class="text-muted" style="font-size:13px;">Los horarios aparecerán al elegir una fecha.</p>`;
});

document.getElementById("nextMonth").addEventListener("click", () => {
  estado.mes++;
  if (estado.mes > 11) { estado.mes = 0; estado.anio++; }

  estado.fecha = null;
  estado.hora = null;

  renderCalendario();
  document.getElementById("horasFechaLabel").textContent = "Selecciona un día disponible";
  document.getElementById("horasGrid").innerHTML =
    `<p class="text-muted" style="font-size:13px;">Los horarios aparecerán al elegir una fecha.</p>`;
});

