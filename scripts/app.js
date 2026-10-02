/**
 * OLYTHOS — Main Application Controller
 * Handles Navigation, Pantheon Routine Execution, Rest Timers,
 * Exercise Filtering & Modals, Nutrition Calculations, and Progress Updates.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize state
  let currentActiveRoutineKey = 'zeus';
  let activeFilterCategory = 'all';
  let searchQuery = '';

  // Elements
  const navElement = document.querySelector('.sanctuary-nav');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const routineSelector = document.getElementById('routine-selector');
  const routineBoard = document.getElementById('routine-board-container');
  const exerciseGrid = document.getElementById('exercise-card-grid');
  const exerciseFilterButtons = document.querySelectorAll('.filter-pill-btn');
  const exerciseSearchInput = document.getElementById('exercise-search-input');
  const modalOverlay = document.getElementById('exercise-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  // Nutrition Form
  const nutritionForm = document.getElementById('nutrition-calc-form');
  const calValue = document.getElementById('res-calories');
  const proteinValue = document.getElementById('res-protein');
  const carbsValue = document.getElementById('res-carbs');
  const fatsValue = document.getElementById('res-fats');
  const waterValue = document.getElementById('res-water');

  // Oracle Quote
  const oracleQuoteText = document.getElementById('oracle-quote-text');
  const oracleAuthor = document.getElementById('oracle-author');
  const consultOracleBtn = document.getElementById('consult-oracle-btn');

  // Journal
  const journalInput = document.getElementById('journal-input');
  const saveJournalBtn = document.getElementById('save-journal-btn');
  const journalLogList = document.getElementById('journal-log-list');

  // PR Form
  const prSquat = document.getElementById('pr-squat');
  const prDeadlift = document.getElementById('pr-deadlift');
  const prBench = document.getElementById('pr-bench');
  const prPress = document.getElementById('pr-press');
  const prPullups = document.getElementById('pr-pullups');
  const savePrBtn = document.getElementById('save-pr-btn');

  // Delphic Stoic Quotes Database
  const STOIC_QUOTES = [
    { quote: "No man has the right to be an amateur in the matter of physical training. It is a shame for a man to grow old without seeing the beauty and strength of which his body is capable.", author: "Socrates" },
    { quote: "You have power over your mind - not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius" },
    { quote: "First say to yourself what you would be; and then do what you have to do.", author: "Epictetus" },
    { quote: "We suffer more often in imagination than in reality. Endure the iron, master the mind.", author: "Seneca" },
    { quote: "He who overcomes himself is the mightiest warrior.", author: "Greek Proverb" },
    { quote: "Come back with your shield, or on it.", author: "Spartan Mother to her Hoplite Son" },
    { quote: "Arete is not an act, but a habit of excellence forged under the heat of contest.", author: "Aristotle" }
  ];

  /* --------------------------------------------------------------------------
     1. Page-View Single Page Router (One-by-one Views)
     -------------------------------------------------------------------------- */
  const pageViews = document.querySelectorAll('.page-view');
  const navPageLinks = document.querySelectorAll('.nav-page-link');
  const navLinksContainer = document.querySelector('.nav-links');

  function navigateToPage(pageRoute) {
    if (!pageRoute) pageRoute = 'home';
    pageRoute = pageRoute.replace(/^#/, '');

    const targetPage = document.getElementById(`page-${pageRoute}`);
    if (!targetPage) return;

    // Hide all pages, reveal only target page
    pageViews.forEach(view => {
      view.classList.remove('active-page');
    });
    targetPage.classList.add('active-page');

    // Update active highlight on nav links
    navPageLinks.forEach(link => {
      if (link.dataset.route === pageRoute) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile nav drawer if open
    if (navLinksContainer && window.innerWidth <= 1024) {
      navLinksContainer.style.display = 'none';
    }

    // Scroll to top of newly opened page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Update URL hash without scrolling
    if (window.location.hash !== `#${pageRoute}`) {
      history.pushState(null, '', `#${pageRoute}`);
    }
  }

  // Intercept click on any nav-page-link
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.nav-page-link');
    if (link && link.dataset.route) {
      e.preventDefault();
      navigateToPage(link.dataset.route);
    }
  });

  // Handle clicking deity cards in Pantheon to switch to Training
  document.querySelectorAll('.deity-select-trigger').forEach(card => {
    card.addEventListener('click', () => {
      const deity = card.dataset.deity;
      if (deity && PANTHEON_ROUTINES[deity]) {
        if (routineSelector) {
          routineSelector.value = deity;
        }
        renderActiveRoutine(deity);
        navigateToPage('training');
        showToast(`Entered ${PANTHEON_ROUTINES[deity].name} protocol.`);
      }
    });
  });

  // Listen to browser Back/Forward hash changes
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (hash) navigateToPage(hash);
  });

  // Navigation scroll bar effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navElement.classList.add('scrolled');
    } else {
      navElement.classList.remove('scrolled');
    }

    const heroBg = document.querySelector('.hero-environment-canvas');
    if (heroBg && window.scrollY < 900) {
      heroBg.style.transform = `scale(1.02) translateY(${window.scrollY * 0.14}px)`;
    }
  });

  // Mobile nav toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  if (mobileNavToggle && navLinksContainer) {
    mobileNavToggle.addEventListener('click', () => {
      const isVisible = navLinksContainer.style.display === 'flex';
      navLinksContainer.style.display = isVisible ? 'none' : 'flex';
      navLinksContainer.style.flexDirection = 'column';
      navLinksContainer.style.position = 'absolute';
      navLinksContainer.style.top = '100%';
      navLinksContainer.style.left = '0';
      navLinksContainer.style.width = '100%';
      navLinksContainer.style.background = '#0D0E10';
      navLinksContainer.style.padding = '1.5rem';
    });
  }

  // Initial route check from URL hash
  const initialHash = window.location.hash.slice(1) || 'home';
  navigateToPage(initialHash);

  /* --------------------------------------------------------------------------
     2. Sanctuary Ambient Audio Engine
     -------------------------------------------------------------------------- */
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (window.sanctuaryAudio) {
        const isNowPlaying = window.sanctuaryAudio.toggle();
        if (isNowPlaying) {
          audioToggleBtn.classList.add('active');
          audioToggleBtn.querySelector('.audio-text').textContent = 'Ambiance: On';
          showToast('Sanctuary winds & Dorian lyre awakened.');
        } else {
          audioToggleBtn.classList.remove('active');
          audioToggleBtn.querySelector('.audio-text').textContent = 'Sanctuary Audio';
          showToast('Sanctuary ambiance stilled.');
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     3. Pantheon Workout Routine Renderer & Runner
     -------------------------------------------------------------------------- */
  function renderActiveRoutine(routineKey) {
    const routine = PANTHEON_ROUTINES[routineKey];
    if (!routine || !routineBoard) return;

    currentActiveRoutineKey = routineKey;

    let exercisesHtml = '';
    routine.exercises.forEach((item, index) => {
      const exercise = OLYTHOS_EXERCISES.find(e => e.id === item.exerciseId);
      if (!exercise) return;

      exercisesHtml += `
        <div class="routine-exercise-item" id="routine-ex-${index}" data-exercise-id="${exercise.id}">
          <img src="${exercise.image}" alt="${exercise.title}" class="routine-exercise-thumb" loading="lazy">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.2rem;">
              <span class="meta-pill" style="font-size: 0.65rem;">STAGE 0${index + 1}</span>
              <span style="font-family: var(--font-serif); font-size: 0.72rem; color: var(--color-gold-antique);">${exercise.greekTitle}</span>
            </div>
            <h4 style="font-size: 1.15rem; color: var(--color-ivory); margin-bottom: 0.25rem;">${exercise.title}</h4>
            <p style="font-size: 0.85rem; color: var(--color-limestone-dark);">${exercise.recommendedSets} • Target: ${item.targetWeight}</p>
            
            <div style="margin-top: 0.6rem; display: flex; align-items: center; gap: 0.8rem;">
              <button class="btn-stone-outline start-rest-btn" data-rest="${item.restSeconds}" style="padding: 0.35rem 0.8rem; font-size: 0.72rem;">
                <span class="icon">⏱️</span> Rest ${item.restSeconds}s
              </button>
              <button class="btn-stone-outline view-lore-btn" data-exercise-id="${exercise.id}" style="padding: 0.35rem 0.8rem; font-size: 0.72rem;">
                Form & Lore
              </button>
            </div>
          </div>
          <div style="text-align: center;">
            <label style="display: block; font-size: 0.68rem; color: var(--color-gold-bright); margin-bottom: 0.3rem;">COMPLETE</label>
            <input type="checkbox" class="exercise-log-checkbox" data-index="${index}">
          </div>
        </div>
      `;
    });

    routineBoard.innerHTML = `
      <div class="active-routine-header">
        <div>
          <span class="active-routine-greek">${routine.greekName}</span>
          <h3 class="active-routine-title">${routine.name}</h3>
          <p style="max-width: 550px; font-size: 0.95rem; color: var(--color-limestone); margin-top: 0.3rem;">${routine.subtitle}</p>
        </div>
        <div class="routine-meta-pills">
          <span class="meta-pill">⏱️ ${routine.duration}</span>
          <span class="meta-pill">⚡ ${routine.intensity}</span>
          <span class="meta-pill">🏛️ ${routine.focus}</span>
        </div>
      </div>

      <div id="rest-timer-display" class="rest-timer-banner" style="display: none;">
        <div>
          <span style="font-size: 0.72rem; letter-spacing: 0.15em; color: var(--color-gold-antique); text-transform: uppercase;">Temple Rest Period</span>
          <div class="timer-countdown" id="timer-countdown-text">00:00</div>
        </div>
        <button id="cancel-timer-btn" class="btn-stone-outline" style="padding: 0.4rem 0.85rem; font-size: 0.75rem;">Cancel Rest</button>
      </div>

      <div class="routine-exercise-list">
        ${exercisesHtml}
      </div>

      <div style="margin-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; border-top: 1px solid rgba(200, 163, 89, 0.2); padding-top: 1.5rem;">
        <span style="font-size: 0.85rem; color: var(--color-limestone);">Honor your ancestors. Maintain sacred form throughout every repetition.</span>
        <button id="complete-protocol-btn" class="btn-olympian">
          <span>🏛️</span> Record & Complete Protocol
        </button>
      </div>
    `;

    // Attach Rest Timer events
    document.querySelectorAll('.start-rest-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const seconds = parseInt(btn.dataset.rest, 10);
        triggerRestCountdown(seconds);
      });
    });

    // Attach View Lore events
    document.querySelectorAll('.view-lore-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.exerciseId;
        openExerciseModal(id);
      });
    });

    // Checkbox styling
    document.querySelectorAll('.exercise-log-checkbox').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const itemBox = document.getElementById(`routine-ex-${chk.dataset.index}`);
        if (chk.checked) {
          itemBox.classList.add('completed');
          if (window.sanctuaryAudio) window.sanctuaryAudio.playTempleBowlChime(440);
        } else {
          itemBox.classList.remove('completed');
        }
      });
    });

    // Complete Protocol event
    const completeBtn = document.getElementById('complete-protocol-btn');
    if (completeBtn) {
      completeBtn.addEventListener('click', () => {
        const completedExercises = document.querySelectorAll('.exercise-log-checkbox:checked').length;
        const total = routine.exercises.length;

        const entry = window.olythosTracker.logWorkout({
          routineName: routine.name,
          deity: routine.deity,
          completedItems: `${completedExercises} / ${total} Exercises Complete`,
          focus: routine.focus
        });

        showToast(`Protocol inscribed to Pantheon logs! (${entry.completedItems})`);
        updateProgressDashboard();
      });
    }
  }

  function triggerRestCountdown(seconds) {
    const banner = document.getElementById('rest-timer-display');
    const text = document.getElementById('timer-countdown-text');
    const cancelBtn = document.getElementById('cancel-timer-btn');
    if (!banner || !text) return;

    banner.style.display = 'flex';

    window.olythosTracker.startRestTimer(
      seconds,
      (rem) => {
        const mins = Math.floor(rem / 60);
        const secs = rem % 60;
        text.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      },
      () => {
        text.textContent = "REST COMPLETE — STEP FORWARD";
        showToast("Rest elapsed! Take up the weight.");
        setTimeout(() => {
          banner.style.display = 'none';
        }, 3000);
      }
    );

    if (cancelBtn) {
      cancelBtn.onclick = () => {
        window.olythosTracker.cancelRestTimer();
        banner.style.display = 'none';
      };
    }
  }

  if (routineSelector) {
    routineSelector.addEventListener('change', (e) => {
      renderActiveRoutine(e.target.value);
    });
  }

  // Initial routine render
  renderActiveRoutine('zeus');

  /* --------------------------------------------------------------------------
     4. Exercise Library Renderer, Filtering & Search
     -------------------------------------------------------------------------- */
  function renderExerciseLibrary() {
    if (!exerciseGrid) return;

    const filtered = OLYTHOS_EXERCISES.filter(ex => {
      const matchesCategory = (activeFilterCategory === 'all') || 
                              (ex.category === activeFilterCategory) || 
                              (ex.muscleGroup === activeFilterCategory) ||
                              (ex.deity === activeFilterCategory);

      const matchesSearch = !searchQuery || 
                            ex.title.toLowerCase().includes(searchQuery) ||
                            ex.targetMuscles.some(m => m.toLowerCase().includes(searchQuery)) ||
                            ex.greekTitle.toLowerCase().includes(searchQuery);

      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      exerciseGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--color-limestone-dark);">
          <p style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--color-gold-antique);">No exercises found in this sanctuary wing.</p>
          <p style="font-size: 0.9rem; margin-top: 0.5rem;">Try adjusting your search terms or category filters.</p>
        </div>
      `;
      return;
    }

    exerciseGrid.innerHTML = filtered.map(ex => `
      <div class="exercise-card" data-exercise-id="${ex.id}">
        <div class="exercise-card-image-box">
          <img src="${ex.image}" alt="${ex.title}" class="exercise-card-image" loading="lazy">
          <span class="exercise-card-badge">${ex.deity.toUpperCase()}</span>
        </div>
        <div class="exercise-card-body">
          <span style="font-family: var(--font-serif); font-size: 0.72rem; color: var(--color-gold-antique); margin-bottom: 0.2rem;">${ex.greekTitle}</span>
          <h4 class="exercise-card-title">${ex.title}</h4>
          <p class="exercise-card-lore">${ex.lore}</p>
          <div class="exercise-card-footer">
            <span style="font-size: 0.75rem; color: var(--color-limestone); text-transform: uppercase;">${ex.equipment}</span>
            <span style="font-family: var(--font-serif); font-size: 0.75rem; color: var(--color-gold-bright); font-weight: 700;">EXPLORE →</span>
          </div>
        </div>
      </div>
    `).join('');

    // Attach card click handlers
    document.querySelectorAll('.exercise-card').forEach(card => {
      card.addEventListener('click', () => {
        openExerciseModal(card.dataset.exerciseId);
      });
    });
  }

  // Filter Buttons
  exerciseFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      exerciseFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilterCategory = btn.dataset.filter;
      renderExerciseLibrary();
    });
  });

  // Search Input
  if (exerciseSearchInput) {
    exerciseSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderExerciseLibrary();
    });
  }

  // Initial Exercise Render
  renderExerciseLibrary();

  /* --------------------------------------------------------------------------
     5. Exercise Modal (Biomechanics & Historical Lore)
     -------------------------------------------------------------------------- */
  function openExerciseModal(exerciseId) {
    const exercise = OLYTHOS_EXERCISES.find(e => e.id === exerciseId);
    if (!exercise || !modalOverlay) return;

    const modalBody = document.getElementById('modal-content-container');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-header-hero">
        <img src="${exercise.image}" alt="${exercise.title}">
        <div class="modal-header-gradient"></div>
        <div style="position: absolute; bottom: 1.5rem; left: 2.25rem; z-index: 5;">
          <span style="font-family: var(--font-serif); font-size: 0.8rem; letter-spacing: 0.18em; color: var(--color-gold-bright);">${exercise.greekTitle}</span>
          <h2 style="font-size: 1.8rem; color: var(--color-ivory); margin-top: 0.2rem;">${exercise.title}</h2>
        </div>
      </div>
      <div class="modal-body-content">
        <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem;">
          <span class="meta-pill">🏛️ Deity: ${exercise.deity.toUpperCase()}</span>
          <span class="meta-pill">⚡ Tier: ${exercise.difficulty}</span>
          <span class="meta-pill">🎯 Group: ${exercise.muscleGroup.toUpperCase()}</span>
          <span class="meta-pill">🛡️ Equipment: ${exercise.equipment}</span>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 0.95rem; color: var(--color-gold-antique); margin-bottom: 0.5rem; letter-spacing: 0.1em;">ANCIENT HISTORICAL ORIGIN</h4>
          <p style="font-size: 0.95rem; line-height: 1.65; color: var(--color-limestone);">${exercise.lore}</p>
        </div>

        <div style="margin-bottom: 2rem;">
          <h4 style="font-size: 0.95rem; color: var(--color-gold-antique); margin-bottom: 0.75rem; letter-spacing: 0.1em;">BIOMECHANICAL EXECUTION CUES</h4>
          <ol style="padding-left: 1.25rem; color: var(--color-ivory-soft); font-size: 0.95rem; line-height: 1.8;">
            ${exercise.cues.map(cue => `<li>${cue}</li>`).join('')}
          </ol>
        </div>

        <div style="background: rgba(22, 26, 20, 0.7); border: 1px solid rgba(200, 163, 89, 0.25); border-radius: var(--radius-stone); padding: 1.25rem; margin-bottom: 2rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-family: var(--font-serif); font-size: 0.75rem; color: var(--color-gold-bright);">PRIMARY TARGET MUSCLES</span>
            <span style="font-family: var(--font-serif); font-size: 0.75rem; color: var(--color-limestone);">RECOMMENDED SETS</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.9rem; color: var(--color-ivory);">${exercise.targetMuscles.join(', ')}</span>
            <span style="font-size: 0.9rem; color: var(--color-gold-bright); font-weight: 700;">${exercise.recommendedSets}</span>
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 1rem;">
          <button class="btn-stone-outline" onclick="document.getElementById('exercise-modal-overlay').classList.remove('active')">Close</button>
          <button class="btn-olympian" id="modal-add-to-workout-btn">Add to Active Protocol</button>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');

    // Add to Active Protocol button
    const addBtn = document.getElementById('modal-add-to-workout-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        showToast(`"${exercise.title}" queued for training.`);
        modalOverlay.classList.remove('active');
      });
    }
  }

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  /* --------------------------------------------------------------------------
     6. Nutrition Macro Engine
     -------------------------------------------------------------------------- */
  if (nutritionForm) {
    nutritionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const age = parseInt(document.getElementById('nutri-age').value, 10);
      const weightKg = parseFloat(document.getElementById('nutri-weight').value);
      const heightCm = parseFloat(document.getElementById('nutri-height').value);
      const gender = document.getElementById('nutri-gender').value;
      const goal = document.getElementById('nutri-goal').value;
      const intensity = document.getElementById('nutri-intensity').value;

      const results = window.olythosTracker.calculateMacros({
        age, weightKg, heightCm, gender, goal, intensity
      });

      if (calValue) calValue.textContent = results.targetCalories;
      if (proteinValue) proteinValue.textContent = results.proteinGrams + 'g';
      if (carbsValue) carbsValue.textContent = results.carbGrams + 'g';
      if (fatsValue) fatsValue.textContent = results.fatGrams + 'g';
      if (waterValue) waterValue.textContent = results.waterLitres + 'L';

      showToast('Sacred Greek Macro Fuel blueprint calculated.');
    });
  }

  /* --------------------------------------------------------------------------
     7. Philosophy & Stoic Oracle Generator
     -------------------------------------------------------------------------- */
  if (consultOracleBtn) {
    consultOracleBtn.addEventListener('click', () => {
      const random = STOIC_QUOTES[Math.floor(Math.random() * STOIC_QUOTES.length)];
      if (oracleQuoteText) {
        oracleQuoteText.style.opacity = 0;
        setTimeout(() => {
          oracleQuoteText.textContent = `"${random.quote}"`;
          oracleAuthor.textContent = `— ${random.author}`;
          oracleQuoteText.style.opacity = 1;
        }, 200);
      }
      if (window.sanctuaryAudio) window.sanctuaryAudio.playTempleBowlChime(528);
    });
  }

  // Journal Entry Logger
  function renderJournal() {
    if (!journalLogList) return;
    const entries = window.olythosTracker.journal;
    if (entries.length === 0) {
      journalLogList.innerHTML = `<p style="font-size: 0.85rem; color: var(--color-text-muted); font-style: italic; padding: 1rem;">No stoic reflections inscribed yet. Record today's mental discipline above.</p>`;
      return;
    }
    journalLogList.innerHTML = entries.map(item => `
      <div class="journal-log-item">
        <div class="journal-log-date">${item.date}</div>
        <div class="journal-log-text">${item.text}</div>
      </div>
    `).join('');
  }

  if (saveJournalBtn && journalInput) {
    saveJournalBtn.addEventListener('click', () => {
      const text = journalInput.value.trim();
      if (!text) return;
      window.olythosTracker.saveReflection(text, "Daily Stoic Contemplation");
      journalInput.value = '';
      renderJournal();
      showToast('Reflection inscribed to personal sanctuary scrolls.');
    });
  }
  renderJournal();

  /* --------------------------------------------------------------------------
     8. Progress Dashboard & Personal Records
     -------------------------------------------------------------------------- */
  function updateProgressDashboard() {
    const prs = window.olythosTracker.prs;
    if (prSquat) prSquat.value = prs.squat;
    if (prDeadlift) prDeadlift.value = prs.deadlift;
    if (prBench) prBench.value = prs.bench;
    if (prPress) prPress.value = prs.press;
    if (prPullups) prPullups.value = prs.pullups;

    // Pantheon scores
    const scores = window.olythosTracker.getPantheonScores();
    const zeusFill = document.getElementById('pantheon-bar-zeus');
    const athenaFill = document.getElementById('pantheon-bar-athena');
    const apolloFill = document.getElementById('pantheon-bar-apollo');
    const poseidonFill = document.getElementById('pantheon-bar-poseidon');
    const hermesFill = document.getElementById('pantheon-bar-hermes');

    if (zeusFill) {
      zeusFill.style.width = scores.zeus + '%';
      document.getElementById('val-zeus').textContent = scores.zeus + ' / 100';
    }
    if (athenaFill) {
      athenaFill.style.width = scores.athena + '%';
      document.getElementById('val-athena').textContent = scores.athena + ' / 100';
    }
    if (apolloFill) {
      apolloFill.style.width = scores.apollo + '%';
      document.getElementById('val-apollo').textContent = scores.apollo + ' / 100';
    }
    if (poseidonFill) {
      poseidonFill.style.width = scores.poseidon + '%';
      document.getElementById('val-poseidon').textContent = scores.poseidon + ' / 100';
    }
    if (hermesFill) {
      hermesFill.style.width = scores.hermes + '%';
      document.getElementById('val-hermes').textContent = scores.hermes + ' / 100';
    }

    // Render Workout Logs Table
    const logsContainer = document.getElementById('workout-history-tbody');
    if (logsContainer) {
      const logs = window.olythosTracker.logs;
      if (logs.length === 0) {
        logsContainer.innerHTML = `
          <tr>
            <td colspan="4" style="text-align: center; color: var(--color-text-muted); padding: 1.5rem;">
              No completed protocols logged yet. Enter the Training Grounds to begin.
            </td>
          </tr>
        `;
      } else {
        logsContainer.innerHTML = logs.map(l => `
          <tr>
            <td style="color: var(--color-gold-bright); font-family: var(--font-serif);">${l.date}</td>
            <td style="color: var(--color-ivory); font-weight: 600;">${l.routineName}</td>
            <td style="color: var(--color-limestone);">${l.focus}</td>
            <td style="color: var(--color-gold-antique); font-size: 0.8rem;">${l.completedItems}</td>
          </tr>
        `).join('');
      }
    }
  }

  if (savePrBtn) {
    savePrBtn.addEventListener('click', () => {
      window.olythosTracker.updatePR('squat', parseFloat(prSquat.value) || 0);
      window.olythosTracker.updatePR('deadlift', parseFloat(prDeadlift.value) || 0);
      window.olythosTracker.updatePR('bench', parseFloat(prBench.value) || 0);
      window.olythosTracker.updatePR('press', parseFloat(prPress.value) || 0);
      window.olythosTracker.updatePR('pullups', parseInt(prPullups.value, 10) || 0);

      updateProgressDashboard();
      showToast('Personal Records enshrined.');
    });
  }

  // Initial dashboard load
  updateProgressDashboard();

  /* --------------------------------------------------------------------------
     Toast Notification Helper
     -------------------------------------------------------------------------- */
  function showToast(message) {
    let toast = document.getElementById('temple-toast-banner');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'temple-toast-banner';
      toast.className = 'temple-toast';
      toast.innerHTML = `<span class="toast-icon">🏛️</span><span id="toast-message-text"></span>`;
      document.body.appendChild(toast);
    }
    const msgSpan = document.getElementById('toast-message-text');
    if (msgSpan) msgSpan.textContent = message;

    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }
  window.showToast = showToast;
});
