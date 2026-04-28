// Datos de los estilistas disponibles y sus horarios de disponibilidad
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

// ============================================================
// ESTADO GLOBAL DEL COMPONENTE
// ============================================================
let selectedStylist = null;
let selectedDate = null;
let selectedTime = null;
let currentYear = 2026;
let currentMonth = 3; // 0-based: April = 3

// Nombres de meses y días usados para mostrar el calendario
const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
const dayNames = ["D", "L", "M", "M", "J", "V", "S"];

// ============================================================
// RENDER ESTILISTAS
// ============================================================
// Renderiza las tarjetas de estilistas dentro del grid principal
function renderStylists() {
    const grid = document.getElementById('stylistsListContainer');
    grid.innerHTML = estilistas.map(e => {
        const isSel = selectedStylist && selectedStylist.id === e.id;
        const avatarHtml = e.foto
            ? `<img src="${e.foto}" alt="${e.nombre}" />`
            : `<span>${getInitials(e.nombre)}</span>`;
        return `
        <div class="stylist-card${isSel ? ' selected' : ''}" data-stylist-id="${e.id}">
            <div class="check-icon">...</div>
            <div class="avatar">${avatarHtml}</div>
            <div class="stylist-name">${e.nombre}</div>
            <div class="stylist-spec">${e.especialidad}</div>
        </div>`;
    }).join('');
}

function getInitials(name) {
    return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

// Se ejecuta al seleccionar un estilista: muestra el calendario y reinicia selección de fecha/hora
function selectStylist(id) {
    selectedStylist = estilistas.find(e => e.id === id);
    selectedDate = null;
    selectedTime = null;
    renderStylists();
    document.getElementById('bookingSectionDivider').style.display = '';
    document.getElementById('bookingStepSection').style.display = '';
    document.getElementById('reservationConfirmSection').style.display = 'none';
    updateStepDots(2);
    renderCalendar();
    renderTimes(null);
}

// ============================================================
// RENDERIZADO DEL CALENDARIO
// ============================================================
// Obtiene las fechas disponibles según el estilista seleccionado
function getAvailableDates() {
    if (!selectedStylist) return new Set();
    return new Set(Object.keys(selectedStylist.disponibilidad));
}

// Dibuja el calendario mensual y marca los días disponibles/seleccionados
function renderCalendar() {
    document.getElementById('calendarMonthLabel').textContent =
        monthNames[currentMonth] + ' ' + currentYear;

    const available = getAvailableDates();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    let html = dayNames.map(d => `<div class="calendar-day-name">${d}</div>`).join('');

    for (let i = 0; i < firstDay; i++) {
        html += `<div class="calendar-day"></div>`;
    }

    for (let d = 1; d <= daysInMonth; d++) {
        const mm = String(currentMonth + 1).padStart(2, '0');
        const dd = String(d).padStart(2, '0');
        const dateStr = `${currentYear}-${mm}-${dd}`;
        const isAvail = available.has(dateStr);
        const isSel = selectedDate === dateStr;

        let cls = 'calendar-day';
        if (isAvail) cls += ' available';
        if (isSel) cls += ' selected-day';

        html += `<div class="${cls}"${isAvail ? ` data-date="${dateStr}"` : ''}>${d}</div>`;
    }

    document.getElementById('calendarDaysGrid').innerHTML = html;
}

// Maneja la selección de un día en el calendario
function selectDate(dateStr) {
    selectedDate = dateStr;
    selectedTime = null;
    renderCalendar();
    renderTimes(dateStr);
    document.getElementById('reservationConfirmSection').style.display = 'none';

    const [y, m, d] = dateStr.split('-');
    document.getElementById('selectedBookingDateDisplay').textContent =
        `${parseInt(d)} de ${monthNames[parseInt(m) - 1]}`;
}

// ============================================================
// RENDERIZADO DE HORARIOS
// ============================================================
// Muestra la lista de horarios para la fecha elegida o un mensaje inicial
function renderTimes(dateStr) {
    const container = document.getElementById('bookingTimesContainer');

    if (!dateStr || !selectedStylist) {
        container.innerHTML = `
        <div class="placeholder-message">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            Selecciona un día disponible
        </div>`;
        document.getElementById('selectedBookingDateDisplay').textContent = '—';
        return;
    }

    const times = selectedStylist.disponibilidad[dateStr] || [];

    if (!times.length) {
        container.innerHTML = `<div class="placeholder-message">Sin horarios este día</div>`;
        return;
    }

    container.innerHTML = `
      <div class="times-grid">
        ${times.map(t => `
          <button class="time-btn${selectedTime === t ? ' selected-time' : ''}"
                  data-time="${t}">${t}</button>
        `).join('')}
      </div>`;
}

// Selecciona un horario y actualiza la sección de confirmación
function selectTime(time) {
    selectedTime = time;
    renderTimes(selectedDate);
    renderConfirm();
    updateStepDots(3);
}

// ============================================================
// CONFIRMACIÓN DE RESERVA
// ============================================================
// Genera la tarjeta final con el resumen de la reserva
function renderConfirm() {
    if (!selectedStylist || !selectedDate || !selectedTime) return;

    const [y, m, d] = selectedDate.split('-');
    const fechaLegible = `${parseInt(d)} de ${monthNames[parseInt(m) - 1]} ${y}`;

    document.getElementById('reservationConfirmSection').style.display = '';
    document.getElementById('reservationConfirmCard').innerHTML = `
      <div class="confirm-summary">
        <div class="confirm-avatar">
          ${selectedStylist.foto ? `<img src="${selectedStylist.foto}" alt="${selectedStylist.nombre}" />` : `<span>${getInitials(selectedStylist.nombre)}</span>`}
        </div>
        <div class="confirm-details">
          <div class="confirm-name">${selectedStylist.nombre} &mdash; ${selectedStylist.especialidad}</div>
          <div class="confirm-datetime">${fechaLegible} &nbsp;·&nbsp; ${selectedTime} hrs</div>
        </div>
      </div>
      <button class="confirm-btn" type="button">Confirmar reserva</button>`;

    document.getElementById('reservationConfirmSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Acción final al confirmar la reserva: muestra una notificación toast
function confirmarReserva() {
    showToast(`¡Reserva confirmada con ${selectedStylist.nombre} el ${selectedDate} a las ${selectedTime}!`);
}

// ============================================================
// FUNCIONES AUXILIARES
// ============================================================
// Actualiza el estado visual de los puntos de pasos superiores
function updateStepDots(active) {
    for (let i = 1; i <= 3; i++) {
        const dot = document.getElementById('bookingStepDot' + i);
        if (!dot) continue;
        dot.className = 'booking-step-dot' + (i < active ? ' done' : i === active ? ' active' : '');
    }
}

// Muestra y oculta el toast de confirmación con animación
function showToast(msg) {
    const toast = document.getElementById('reservationToast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
}

// ============================================================
// NAVEGACIÓN DEL CALENDARIO
// ============================================================
// Botón para ir al mes anterior
const previousMonthBtn = document.getElementById('calendarPreviousMonthButton');
if (previousMonthBtn) {
    previousMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) { currentMonth = 11; currentYear--; }
        selectedDate = null; selectedTime = null;
        renderCalendar();
        renderTimes(null);
        document.getElementById('reservationConfirmSection').style.display = 'none';
    });
}

// Botón para ir al mes siguiente
const nextMonthBtn = document.getElementById('calendarNextMonthButton');
if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) { currentMonth = 0; currentYear++; }
        selectedDate = null; selectedTime = null;
        renderCalendar();
        renderTimes(null);
        document.getElementById('reservationConfirmSection').style.display = 'none';
    });
}

const stylistsContainer = document.getElementById('stylistsListContainer');
if (stylistsContainer) {
    stylistsContainer.addEventListener('click', event => {
        const card = event.target.closest('.stylist-card');
        if (!card || !card.dataset.stylistId) return;
        selectStylist(Number(card.dataset.stylistId));
    });
}

const calendarDaysGrid = document.getElementById('calendarDaysGrid');
if (calendarDaysGrid) {
    calendarDaysGrid.addEventListener('click', event => {
        const day = event.target.closest('.calendar-day.available');
        if (!day || !day.dataset.date) return;
        selectDate(day.dataset.date);
    });
}

const bookingTimesContainer = document.getElementById('bookingTimesContainer');
if (bookingTimesContainer) {
    bookingTimesContainer.addEventListener('click', event => {
        const button = event.target.closest('.time-btn');
        if (!button || !button.dataset.time) return;
        selectTime(button.dataset.time);
    });
}

const reservationConfirmCard = document.getElementById('reservationConfirmCard');
if (reservationConfirmCard) {
    reservationConfirmCard.addEventListener('click', event => {
        const button = event.target.closest('.confirm-btn');
        if (!button) return;
        confirmarReserva();
    });
}

// ============================================================
// INIT
// ============================================================
renderStylists();