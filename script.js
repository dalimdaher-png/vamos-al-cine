/* ============================================================
   PANTALLAS
   ============================================================ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.add('hidden');
    s.classList.remove('active', 'fade-in');
  });
  const target = document.getElementById(id);
  target.classList.remove('hidden');
  target.classList.add('active', 'fade-in');
  window.scrollTo(0, 0);
}

/* ============================================================
   ANIMACIÓN TELÓN
   ============================================================ */
function playTelón() {
  const overlay = document.getElementById('curtain-overlay');
  const left    = document.getElementById('curtain-left');
  const right   = document.getElementById('curtain-right');

  // Mostrar telón cerrado instantáneamente
  overlay.classList.remove('hidden');

  // Mostrar la pantalla pregunta detrás del telón, luego abrir
  setTimeout(() => {
    showScreen('screen-question');
    void left.offsetWidth; // fuerza reflow para que la transición funcione
    left.classList.add('open');
    right.classList.add('open');
  }, 120);

  // Una vez abierto, ocultar el overlay (ya está fuera de pantalla)
  setTimeout(() => {
    overlay.classList.add('hidden');
    left.classList.remove('open');
    right.classList.remove('open');
  }, 1050);
}

/* ============================================================
   CONFETTI
   ============================================================ */
function launchConfetti() {
  const container = document.getElementById('confetti-container');
  const colors = ['#FFD336','#FF6B6B','#4ECDC4','#45B7D1','#96E6A1','#FFEAA7','#DDA0DD','#98D8C8'];
  const shapes = ['2px','50%','0'];

  for (let i = 0; i < 70; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    const size = Math.random() * 7 + 6;
    piece.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size * (Math.random() * 1.5 + 0.5)}px;
      background-color: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${shapes[Math.floor(Math.random() * shapes.length)]};
      animation-delay: ${Math.random() * 0.8}s;
      animation-duration: ${Math.random() * 1.4 + 1}s;
    `;
    container.appendChild(piece);
  }

  // Limpiar después de la animación
  setTimeout(() => {
    container.innerHTML = '';
  }, 4000);
}

/* ============================================================
   EVENTOS
   ============================================================ */
document.getElementById('btn-open').addEventListener('click', () => {
  playTelón();
});

document.getElementById('btn-yes').addEventListener('click', () => {
  showScreen('screen-yes');
  setTimeout(launchConfetti, 300);
});

document.getElementById('btn-no').addEventListener('click', () => {
  showScreen('screen-no');
});

document.getElementById('btn-reconsider').addEventListener('click', () => {
  showScreen('screen-question');
});
