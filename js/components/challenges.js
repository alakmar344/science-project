/**
 * ATOMVERSE - Quick Challenges Component
 * 15 interactive MCQs & True/False questions strictly from in-app content.
 * Instant feedback with verified one-line explanations, session-only score, and zero timers.
 */

window.ATOMVERSE = window.ATOMVERSE || {};

window.ATOMVERSE.Challenges = (function () {
  let currentIndex = 0;
  // Array storing user answers: { selectedIndex, isCorrect }
  let userResponses = [];

  function render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const questions = window.ATOMVERSE_DATA.QUESTIONS || [];
    if (userResponses.length !== questions.length) {
      userResponses = new Array(questions.length).fill(null);
    }

    container.innerHTML = `
      <div class="section-header">
        <div class="section-badge"><span class="badge badge-amber">Knowledge Verification</span></div>
        <h2 class="section-title">Quick Challenges</h2>
        <p class="section-desc">Test your understanding of atomic theory, chemical bonding, subatomic particles, and historical milestones. Instant feedback with verified explanations — no timer, learn at your own pace.</p>
      </div>

      <div class="challenges-wrapper card">
        <!-- Progress Bar & Score Header -->
        <div class="challenges-header">
          <div class="score-display">
            <span class="score-label">Session Score:</span>
            <span id="challenge-score" class="score-val text-amber">0 / ${questions.length} (0%)</span>
          </div>

          <!-- Question Pills Navigator -->
          <div class="question-navigator" id="question-navigator">
            ${questions.map((q, idx) => `
              <button class="q-pill ${idx === 0 ? 'current' : ''}" data-index="${idx}" title="Question ${idx + 1}">
                ${idx + 1}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Question Card Box -->
        <div class="challenge-stage" id="challenge-stage">
          <!-- Injected by renderQuestion() -->
        </div>

        <!-- Challenge Footer Actions -->
        <div class="challenge-footer">
          <button id="q-prev-btn" class="btn btn-ghost btn-sm" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
            Previous
          </button>
          <div class="q-counter-label" id="q-counter-label">Question 1 of ${questions.length}</div>
          <button id="q-next-btn" class="btn btn-primary btn-sm">
            Next
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    `;

    bindEvents();
    renderQuestion(0);
  }

  function renderQuestion(index) {
    const questions = window.ATOMVERSE_DATA.QUESTIONS || [];
    currentIndex = Math.max(0, Math.min(index, questions.length - 1));
    const q = questions[currentIndex];
    const response = userResponses[currentIndex];

    // Update Counter Label
    const counterLabel = document.getElementById("q-counter-label");
    if (counterLabel) counterLabel.textContent = `Question ${currentIndex + 1} of ${questions.length}`;

    // Update Prev/Next Buttons
    const prevBtn = document.getElementById("q-prev-btn");
    const nextBtn = document.getElementById("q-next-btn");
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) {
      if (currentIndex === questions.length - 1) {
        nextBtn.innerHTML = `Finish & View Summary <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      } else {
        nextBtn.innerHTML = `Next <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>`;
      }
    }

    // Update Question Navigator Pills
    document.querySelectorAll(".q-pill").forEach((pill, idx) => {
      pill.classList.toggle("current", idx === currentIndex);
      const resp = userResponses[idx];
      if (resp !== null) {
        pill.classList.toggle("correct", resp.isCorrect);
        pill.classList.toggle("incorrect", !resp.isCorrect);
      }
    });

    const stage = document.getElementById("challenge-stage");
    if (!stage) return;

    stage.innerHTML = `
      <div class="q-meta-row">
        <span class="badge badge-olive">${q.category}</span>
        <span class="q-type-badge">${q.type === 'tf' ? 'True / False' : 'Multiple Choice'}</span>
      </div>

      <h3 class="q-text">${q.question}</h3>

      <div class="options-grid">
        ${q.options.map((opt, optIdx) => {
          let optClass = "option-btn";
          let iconHtml = "";

          if (response !== null) {
            optClass += " locked";
            if (optIdx === q.correctIndex) {
              optClass += " opt-correct";
              iconHtml = `<svg class="opt-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>`;
            } else if (optIdx === response.selectedIndex) {
              optClass += " opt-incorrect";
              iconHtml = `<svg class="opt-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>`;
            }
          }

          const optLetter = String.fromCharCode(65 + optIdx);
          return `
            <button class="${optClass}" data-opt-index="${optIdx}" ${response !== null ? 'disabled' : ''}>
              <span class="opt-letter">${optLetter}</span>
              <span class="opt-text">${opt}</span>
              ${iconHtml}
            </button>
          `;
        }).join('')}
      </div>

      ${response !== null ? `
        <div class="feedback-banner ${response.isCorrect ? 'fb-correct' : 'fb-incorrect'}">
          <div class="fb-header">
            ${response.isCorrect ? `
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
              <strong>Correct!</strong>
            ` : `
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>
              <strong>Not quite.</strong>
            `}
          </div>
          <p class="fb-explanation">${q.explanation}</p>
        </div>
      ` : ''}
    `;

    // Bind option clicks
    stage.querySelectorAll(".option-btn:not(.locked)").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const optIdx = parseInt(e.currentTarget.getAttribute("data-opt-index"), 10);
        handleAnswer(optIdx);
      });
    });
  }

  function handleAnswer(selectedOptIdx) {
    const questions = window.ATOMVERSE_DATA.QUESTIONS || [];
    const q = questions[currentIndex];
    const isCorrect = selectedOptIdx === q.correctIndex;

    userResponses[currentIndex] = {
      selectedIndex: selectedOptIdx,
      isCorrect: isCorrect
    };

    updateScore();
    renderQuestion(currentIndex);
  }

  function updateScore() {
    const questions = window.ATOMVERSE_DATA.QUESTIONS || [];
    const answered = userResponses.filter(r => r !== null);
    const correct = userResponses.filter(r => r && r.isCorrect).length;
    const pct = answered.length > 0 ? Math.round((correct / answered.length) * 100) : 0;

    const scoreEl = document.getElementById("challenge-score");
    if (scoreEl) {
      scoreEl.textContent = `${correct} / ${questions.length} (${pct}%)`;
    }
  }

  function showSummary() {
    const questions = window.ATOMVERSE_DATA.QUESTIONS || [];
    const correctCount = userResponses.filter(r => r && r.isCorrect).length;
    const answeredCount = userResponses.filter(r => r !== null).length;
    const pct = Math.round((correctCount / questions.length) * 100);

    let rankTitle = "Atom Apprentice";
    if (pct === 100) rankTitle = "Atomverse Grand Master ⚛️";
    else if (pct >= 80) rankTitle = "Distinguished Nuclear Scholar 🌟";
    else if (pct >= 60) rankTitle = "Proficient Molecular Explorer 🔬";

    const stage = document.getElementById("challenge-stage");
    if (!stage) return;

    stage.innerHTML = `
      <div class="summary-container">
        <div class="summary-badge-pill">${rankTitle}</div>
        <h3 class="summary-score-title">${correctCount} of ${questions.length} Correct</h3>
        <div class="summary-pct-ring">${pct}% Accuracy</div>
        <p class="summary-subtext">You answered ${answeredCount} of ${questions.length} challenges in this study session.</p>

        <div class="summary-actions">
          <button id="summary-retry-btn" class="btn btn-primary btn-sm">Reset & Retry Challenge</button>
          <button id="summary-review-btn" class="btn btn-outline btn-sm">Review Questions</button>
        </div>
      </div>
    `;

    document.getElementById("summary-retry-btn")?.addEventListener("click", () => {
      userResponses = new Array(questions.length).fill(null);
      updateScore();
      renderQuestion(0);
    });

    document.getElementById("summary-review-btn")?.addEventListener("click", () => {
      renderQuestion(0);
    });
  }

  function bindEvents() {
    const prevBtn = document.getElementById("q-prev-btn");
    const nextBtn = document.getElementById("q-next-btn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) renderQuestion(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const questions = window.ATOMVERSE_DATA.QUESTIONS || [];
        if (currentIndex < questions.length - 1) {
          renderQuestion(currentIndex + 1);
        } else {
          showSummary();
        }
      });
    }

    document.querySelectorAll(".q-pill").forEach(pill => {
      pill.addEventListener("click", (e) => {
        const idx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
        renderQuestion(idx);
      });
    });
  }

  return {
    render: render
  };
})();
