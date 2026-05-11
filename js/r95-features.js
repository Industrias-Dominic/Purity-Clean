/**
 * R95 Features — Smart Reminder, Quiz, Clima, Insignias, Social Counter, Before/After Slider
 * Issue: DOMAA-908
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     1. SMART REMINDER SEQUENCE
     ───────────────────────────────────────────── */
  var REMINDER_CONFIG = {
    firstReminder: {
      days: 60,
      title: 'Tu sofá necesita atención',
      subtitle: 'Han pasado 60 días desde tu última limpieza',
      cta: 'Reservar ahora'
    },
    secondReminder: {
      days: 90,
      title: 'Oferta especial para ti',
      subtitle: '15% de descuento en tu próxima limpieza',
      cta: 'Reclamar 15% off'
    },
    thirdReminder: {
      days: 120,
      title: '¿Todo bien? Te extrañamos',
      subtitle: 'Tus muebles han pasado mucho tiempo sin sanitización',
      cta: 'Volver a reservar'
    }
  };

  function daysSinceDate(dateStr) {
    var then = new Date(dateStr);
    var now = new Date();
    return Math.floor((now - then) / (1000 * 60 * 60 * 24));
  }

  function getReminderLevel() {
    var lastBooking = localStorage.getItem('purity_last_booking');
    if (!lastBooking) return null;
    var days = daysSinceDate(lastBooking);
    if (days >= 120) return REMINDER_CONFIG.thirdReminder;
    if (days >= 90) return REMINDER_CONFIG.secondReminder;
    if (days >= 60) return REMINDER_CONFIG.firstReminder;
    return null;
  }

  function showReminder() {
    var reminder = getReminderLevel();
    if (!reminder) return;
    var badge = document.getElementById('reminder-badge');
    if (!badge) return;
    var title = badge.querySelector('.reminder-title');
    var subtitle = badge.querySelector('.reminder-subtitle');
    var cta = badge.querySelector('#reminder-cta');
    var dismiss = badge.querySelector('.reminder-dismiss');
    if (title) title.textContent = reminder.title;
    if (subtitle) subtitle.textContent = reminder.subtitle;
    if (cta) cta.textContent = reminder.cta;
    badge.hidden = false;
    badge.setAttribute('aria-hidden', 'false');
    trackEvent('reminder_badge_shown', { props: { level: reminder.days + 'd' } });
    if (cta) {
      cta.addEventListener('click', function () {
        trackEvent('reminder_cta_clicked');
        badge.hidden = true;
        var bookingSection = document.getElementById('reservas') || document.getElementById('booking');
        if (bookingSection) bookingSection.scrollIntoView({ behavior: 'smooth' });
      });
    }
    if (dismiss) {
      dismiss.addEventListener('click', function () {
        badge.hidden = true;
        trackEvent('reminder_dismissed');
        localStorage.setItem('purity_reminder_dismissed', Date.now().toString());
      });
    }
  }

  function initReminder() {
    var dismissed = localStorage.getItem('purity_reminder_dismissed');
    if (dismissed) {
      var daysSinceDismiss = Math.floor((Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24));
      if (daysSinceDismiss < 7) return;
    }
    var lastBooking = localStorage.getItem('purity_last_booking');
    if (!lastBooking) return;
    var reminder = getReminderLevel();
    if (!reminder) return;
    var delay = Math.random() * 8000 + 4000;
    setTimeout(showReminder, delay);
  }

  /* ─────────────────────────────────────────────
     2. QUIZ DE DIAGNÓSTICO VISUAL
     ───────────────────────────────────────────── */
  var QUIZ_QUESTIONS = [
    {
      question: '¿Cuánto tiempo hace que no limpias tus muebles tapizados?',
      key: 'time',
      options: [
        { label: 'Menos de 3 meses', value: 1, icon: 'fa-face-smile' },
        { label: '3–6 meses', value: 2, icon: 'fa-face-meh' },
        { label: 'Más de 6 meses', value: 3, icon: 'fa-face-frown' }
      ]
    },
    {
      question: '¿Tienes mascotas en casa?',
      key: 'pets',
      options: [
        { label: 'No', value: 0, icon: 'fa-ban' },
        { label: '1–2 mascotas', value: 1, icon: 'fa-paw' },
        { label: '3+ mascotas', value: 2, icon: 'fa-paw' }
      ]
    },
    {
      question: '¿Hay manchas visibles en sofás o colchones?',
      key: 'stains',
      options: [
        { label: 'Sin manchas', value: 0, icon: 'fa-check' },
        { label: 'Algunas manchas', value: 1, icon: 'fa-droplet' },
        { label: 'Manchas到处都是', value: 2, icon: 'fa-droplet' }
      ]
    },
    {
      question: '¿Se perciben olores desagradables?',
      key: 'smell',
      options: [
        { label: 'Sin olores', value: 0, icon: 'fa-check' },
        { label: 'Ligeramente', value: 1, icon: 'fa-wind' },
        { label: 'Sí, notablemente', value: 2, icon: 'fa-smog' }
      ]
    },
    {
      question: '¿Vives en una zona de alta contaminación de Bogotá?',
      key: 'pollution',
      options: [
        { label: 'No estoy seguro', value: 0, icon: 'fa-circle-question' },
        { label: 'Zona urbana', value: 1, icon: 'fa-city' },
        { label: 'Zona industrial/vía principal', value: 2, icon: 'fa-industry' }
      ]
    }
  ];

  var quizState = {
    currentStep: 0,
    answers: {},
    scores: { time: 0, pets: 0, stains: 0, smell: 0, pollution: 0 }
  };

  function calculateDeterioration() {
    var total = Object.values(quizState.scores).reduce(function (a, b) { return a + b; }, 0);
    if (total >= 8) return 'high';
    if (total >= 4) return 'medium';
    return 'low';
  }

  function getResultContent(level) {
    var results = {
      low: {
        title: '¡Tu mueble está en buen estado!',
        body: 'Sigue así. Una limpieza de mantenimiento cada 3-6 meses mantiene todo bajo control.',
        cta: 'Agendar mantenimiento',
        badge: 'state-good',
        score: 'level-low'
      },
      medium: {
        title: 'Tu mueble necesita atención',
        body: 'Con el nivel de uso y condiciones actuales, te recomendamos una limpieza profunda pronto.',
        cta: 'Reservar con 10% off',
        badge: 'state-warning',
        score: 'level-medium'
      },
      high: {
        title: 'Tu mueble requiere atención urgente',
        body: 'Acumulación de bacterias, ácaros y humedad. Una sanitización profesional es necesaria.',
        cta: 'Reservar ahora',
        badge: 'state-urgent',
        score: 'level-high'
      }
    };
    return results[level] || results.medium;
  }

  function renderQuizStep() {
    var quizEl = document.getElementById('quiz-diagnostico');
    var stepEl = quizEl ? quizEl.querySelector('.quiz-step') : null;
    var progressFill = quizEl ? quizEl.querySelector('.quiz-progress-fill') : null;
    var questionEl = quizEl ? quizEl.querySelector('.quiz-question') : null;
    var resultEl = quizEl ? quizEl.querySelector('.quiz-result') : null;

    if (!quizEl) return;

    var total = QUIZ_QUESTIONS.length;
    var current = quizState.currentStep;

    if (stepEl) stepEl.textContent = 'Pregunta ' + (current + 1) + '/' + total;
    if (progressFill) progressFill.style.width = ((current / total) * 100) + '%';

    if (current < total) {
      var q = QUIZ_QUESTIONS[current];
      if (questionEl) {
        questionEl.hidden = false;
        var h3 = questionEl.querySelector('h3');
        if (h3) h3.textContent = q.question;
        var optionsContainer = questionEl.querySelector('.quiz-options');
        if (optionsContainer) {
          optionsContainer.innerHTML = '';
          q.options.forEach(function (opt) {
            var btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.setAttribute('data-value', opt.value);
            btn.setAttribute('data-key', q.key);
            btn.innerHTML = '<i class="fa-solid ' + opt.icon + '" aria-hidden="true"></i><span>' + opt.label + '</span>';
            btn.addEventListener('click', function () {
              quizState.answers[q.key] = opt.value;
              quizState.scores[q.key] = opt.value;
              quizState.currentStep++;
              trackEvent('quiz_answer', { props: { question: q.key, value: opt.value } });
              renderQuizStep();
            });
            optionsContainer.appendChild(btn);
          });
        }
      }
      if (resultEl) resultEl.hidden = true;
    } else {
      showQuizResult();
    }
  }

  function showQuizResult() {
    var quizEl = document.getElementById('quiz-diagnostico');
    var questionEl = quizEl ? quizEl.querySelector('.quiz-question') : null;
    var resultEl = quizEl ? quizEl.querySelector('.quiz-result') : null;
    if (!resultEl) return;

    if (questionEl) questionEl.hidden = true;
    resultEl.hidden = false;

    var level = calculateDeterioration();
    var result = getResultContent(level);
    var titleEl = resultEl.querySelector('h3');
    var bodyEl = resultEl.querySelector('.quiz-result-body');
    var ctaEl = resultEl.querySelector('.quiz-cta .btn');
    var badgeEl = resultEl.querySelector('.quiz-result-badge');
    var scoreEl = resultEl.querySelector('.quiz-score');

    if (titleEl) titleEl.textContent = result.title;
    if (bodyEl) bodyEl.textContent = result.body;
    if (ctaEl) ctaEl.textContent = result.cta;
    if (badgeEl) badgeEl.className = 'quiz-result-badge ' + result.badge;
    if (scoreEl) scoreEl.innerHTML = 'Nivel de deterioro: <strong class="' + result.score + '">' + level.toUpperCase() + '</strong>';

    if (ctaEl) {
      ctaEl.addEventListener('click', function () {
        trackEvent('quiz_cta_clicked', { props: { level: level } });
      });
    }

    if (quizEl) {
      var progressFill = quizEl.querySelector('.quiz-progress-fill');
      if (progressFill) progressFill.style.width = '100%';
      var stepEl = quizEl.querySelector('.quiz-step');
      if (stepEl) stepEl.textContent = 'Resultado';
    }

    trackEvent('quiz_completed', { props: { level: level } });
  }

  function initQuiz() {
    var quizEl = document.getElementById('quiz-diagnostico');
    if (!quizEl) return;
    var triggerBtn = document.getElementById('quiz-trigger');
    var closeBtn = quizEl.querySelector('.quiz-close');
    var restartBtn = quizEl.querySelector('#quiz-restart');

    if (triggerBtn) {
      triggerBtn.addEventListener('click', function () {
        quizState.currentStep = 0;
        quizState.answers = {};
        quizState.scores = { time: 0, pets: 0, stains: 0, smell: 0, pollution: 0 };
        quizEl.hidden = false;
        quizEl.setAttribute('aria-hidden', 'false');
        quizEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        trackEvent('quiz_started');
        renderQuizStep();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        quizEl.hidden = true;
        quizEl.setAttribute('aria-hidden', 'true');
      });
    }

    if (restartBtn) {
      restartBtn.addEventListener('click', function () {
        quizState.currentStep = 0;
        quizState.answers = {};
        quizState.scores = { time: 0, pets: 0, stains: 0, smell: 0, pollution: 0 };
        renderQuizStep();
        trackEvent('quiz_restarted');
      });
    }
  }

  /* ─────────────────────────────────────────────
     3. WIDGET ALERTA METEOROLÓGICA
     ───────────────────────────────────────────── */
  var CLIMA_DATA = {
    lluvias: {
      message: 'Temporada de lluvias en Bogotá',
      icon: 'cloud-rain',
      effects: [
        'Los sofás absorben 35% más humedad',
        'Los colchones acumulan bacteria en clima húmedo',
        'Los ácaros se multiplican 2× en época de lluvias'
      ],
      recommendation: 'Protege tu hogar con sanitización antes de la temporada'
    },
    contaminacion: {
      message: 'Niveles altos de contaminación',
      icon: 'smog',
      effects: [
        'El polvo contaminado se deposita en muebles',
        'Alérgenos se concentran en tapicerías'
      ],
      recommendation: 'Reduce alérgenos en casa con limpieza profunda'
    },
    normal: {
      message: 'Ideal para limpieza',
      icon: 'sun',
      effects: [
        'Condiciones óptimas para secado rápido',
        'Los muebles se benefician de limpieza en época seca'
      ],
      recommendation: 'Este es el mejor momento para programar tu limpieza'
    }
  };

  function getCurrentSeason() {
    var month = new Date().getMonth();
    if (month >= 3 && month <= 10) return 'lluvias';
    if (month === 11 || month === 0 || month === 1) return 'normal';
    return 'normal';
  }

  function getPollutionLevel() {
    var stored = localStorage.getItem('purity_污染_level');
    if (stored) {
      var daysSince = (Date.now() - parseInt(stored)) / (1000 * 60 * 60 * 24);
      if (daysSince < 3) return 'contaminacion';
    }
    return null;
  }

  function initClimaWidget() {
    var widget = document.getElementById('clima-widget');
    if (!widget) return;

    var data = CLIMA_DATA[getCurrentSeason()] || CLIMA_DATA.normal;
    var pollution = getPollutionLevel();
    if (pollution) data = CLIMA_DATA[pollution];

    var iconEl = widget.querySelector('.clima-icon');
    var msgEl = widget.querySelector('.clima-message');
    var effectsEl = widget.querySelector('.clima-effects');
    var recEl = widget.querySelector('.clima-recommendation-text');

    if (iconEl) {
      iconEl.innerHTML = '<i class="fa-solid fa-' + data.icon + '" aria-hidden="true"></i>';
    }
    if (msgEl) msgEl.textContent = data.message;
    if (effectsEl) {
      effectsEl.innerHTML = '';
      data.effects.forEach(function (effect) {
        var li = document.createElement('li');
        li.innerHTML = '<i class="fa-solid fa-couch" aria-hidden="true"></i> ' + effect;
        effectsEl.appendChild(li);
      });
    }
    if (recEl) recEl.textContent = data.recommendation;

    var dismiss = widget.querySelector('.clima-dismiss');
    if (dismiss) {
      dismiss.addEventListener('click', function () {
        widget.hidden = true;
        localStorage.setItem('purity_clima_dismissed', Date.now().toString());
      });
    }

    var dismissed = localStorage.getItem('purity_clima_dismissed');
    if (dismissed) {
      var daysSinceDismiss = Math.floor((Date.now() - parseInt(dismissed)) / (1000 * 60 * 60 * 24));
      if (daysSinceDismiss < 3) widget.hidden = true;
    }
  }

  /* ─────────────────────────────────────────────
     4. SISTEMA DE INSIGNIAS RECOMPENSA
     ───────────────────────────────────────────── */
  var INSIGNIAS_CONFIG = [
    {
      id: 'first-cleaning',
      name: 'Primera limpieza',
      icon: 'star',
      check: function () {
        var bookings = parseInt(localStorage.getItem('purity_booking_count') || '0');
        return bookings >= 1;
      }
    },
    {
      id: 'home-care',
      name: 'Hogar cuidado',
      icon: 'house-chimney',
      check: function () {
        var bookings = parseInt(localStorage.getItem('purity_booking_count') || '0');
        return bookings >= 3;
      }
    },
    {
      id: 'ambassador',
      name: 'Embajador',
      icon: 'trophy',
      check: function () {
        var referred = localStorage.getItem('purity_referrals_completed');
        return referred === 'true';
      }
    },
    {
      id: 'zone-master',
      name: 'Zona dominada',
      icon: 'map-location-dot',
      check: function () {
        var zones = localStorage.getItem('purity_zones_visited');
        if (!zones) return false;
        return zones.split(',').length >= 3;
      }
    },
    {
      id: 'eco-warrior',
      name: 'Guerrero eco',
      icon: 'leaf',
      check: function () {
        return localStorage.getItem('purity_eco_choice') === 'true';
      }
    }
  ];

  function initInsignias() {
    var panel = document.getElementById('insignias-panel');
    if (!panel) return;

    var grid = panel.querySelector('.insignias-grid');
    if (!grid) return;

    grid.innerHTML = '';
    INSIGNIAS_CONFIG.forEach(function (ins) {
      var earned = ins.check();
      var card = document.createElement('div');
      card.className = 'insignia-card' + (earned ? ' earned' : ' locked');
      card.innerHTML =
        '<div class="insignia-icon' + (earned ? '' : ' locked') + '">' +
        '<i class="fa-solid fa-' + ins.icon + '" aria-hidden="true"></i>' +
        '</div>' +
        '<span class="insignia-name">' + ins.name + '</span>' +
        (earned
          ? '<span class="insignia-date">Logrado</span>'
          : '<span class="insignia-unlock">Pendiente</span>');
      grid.appendChild(card);
    });

    var earnedCount = INSIGNIAS_CONFIG.filter(function (i) { return i.check(); }).length;
    trackEvent('insignias_viewed', { props: { earned: earnedCount, total: INSIGNIAS_CONFIG.length } });
  }

  /* ─────────────────────────────────────────────
     5. CONTADOR SOCIAL EN VIVO
     ───────────────────────────────────────────── */
  function updateSocialCounter() {
    var counterEl = document.getElementById('social-counter');
    var numberEl = counterEl ? counterEl.querySelector('.counter-number') : null;
    if (!numberEl) return;

    var stored = localStorage.getItem('purity_social_counter');
    var data = stored ? JSON.parse(stored) : { baseCount: 847, lastUpdate: Date.now() };

    var daysSince = (Date.now() - data.lastUpdate) / (1000 * 60 * 60 * 24);
    var increment = Math.floor(daysSince * 0.7);
    var currentCount = data.baseCount + increment;

    numberEl.textContent = currentCount;

    var totalEl = counterEl ? counterEl.querySelector('.counter-total') : null;
    if (totalEl) totalEl.textContent = currentCount;
  }

  function initSocialCounter() {
    var counterEl = document.getElementById('social-counter');
    if (!counterEl) return;
    updateSocialCounter();
    setInterval(updateSocialCounter, 60000);
  }

  /* ─────────────────────────────────────────────
     6. SLIDER COMPARADOR ANTES/DESPUÉS
     ───────────────────────────────────────────── */
  function initComparador() {
    var comparador = document.getElementById('comparador-wrapper');
    if (!comparador) return;

    var slider = comparador.querySelector('.comparador-slider');
    var afterImg = comparador.querySelector('.comparador-after');
    if (!slider || !afterImg) return;

    var isDragging = false;

    function updatePosition(clientX) {
      var rect = comparador.getBoundingClientRect();
      var x = clientX - rect.left;
      var percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      afterImg.style.clipPath = 'inset(0 ' + (100 - percent) + '% 0 0)';
      slider.style.left = percent + '%';
    }

    slider.addEventListener('mousedown', function (e) {
      isDragging = true;
      e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
      if (isDragging) updatePosition(e.clientX);
    });

    document.addEventListener('mouseup', function () {
      if (isDragging) {
        isDragging = false;
        trackEvent('comparador_used');
      }
    });

    slider.addEventListener('touchstart', function (e) {
      isDragging = true;
    });

    slider.addEventListener('touchmove', function (e) {
      if (isDragging && e.touches[0]) {
        updatePosition(e.touches[0].clientX);
      }
    });

    slider.addEventListener('touchend', function () {
      isDragging = false;
    });

    updatePosition(rect.left + rect.width / 2);
  }

  /* ─────────────────────────────────────────────
     INIT ALL
     ───────────────────────────────────────────── */
  function initR95() {
    initReminder();
    initQuiz();
    initClimaWidget();
    initInsignias();
    initSocialCounter();
    initComparador();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initR95);
  } else {
    initR95();
  }

})();
