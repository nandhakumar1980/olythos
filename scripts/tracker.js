/**
 * OLYTHOS - Tracker & Application Engine
 * Manages Workout Planner, Rest Timer, Nutrition Calculator, Progress PRs & Pantheon Alignment
 */

const STORAGE_KEYS = {
  WORKOUT_LOGS: 'olythos_workout_logs',
  PRS: 'olythos_prs',
  NUTRITION_PROFILE: 'olythos_nutrition_profile',
  JOURNAL: 'olythos_stoic_journal',
  CUSTOM_ROUTINE: 'olythos_active_routine'
};

class OlythosTracker {
  constructor() {
    this.logs = this.load(STORAGE_KEYS.WORKOUT_LOGS, []);
    this.prs = this.load(STORAGE_KEYS.PRS, {
      squat: 140,
      deadlift: 180,
      bench: 110,
      press: 70,
      pullups: 18,
      mileTime: "5:45"
    });
    this.journal = this.load(STORAGE_KEYS.JOURNAL, []);
    this.timerInterval = null;
    this.timerRemaining = 0;
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn("Storage load error:", e);
      return fallback;
    }
  }

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
  }

  logWorkout(workoutData) {
    const entry = {
      id: 'log_' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...workoutData
    };
    this.logs.unshift(entry);
    this.save(STORAGE_KEYS.WORKOUT_LOGS, this.logs);
    return entry;
  }

  updatePR(exercise, value) {
    this.prs[exercise] = value;
    this.save(STORAGE_KEYS.PRS, this.prs);
  }

  saveReflection(text, prompt) {
    const entry = {
      id: 'journal_' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      prompt,
      text
    };
    this.journal.unshift(entry);
    this.save(STORAGE_KEYS.JOURNAL, this.journal);
    return entry;
  }

  calculateMacros({ age, weightKg, heightCm, gender, goal, intensity }) {
    // Harris-Benedict & Athletic Adjustment
    let bmr;
    if (gender === 'female') {
      bmr = 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * age);
    } else {
      bmr = 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * age);
    }

    const activityMultipliers = {
      moderate: 1.45,
      heavy: 1.65,
      olympian: 1.85
    };
    const tdee = Math.round(bmr * (activityMultipliers[intensity] || 1.55));

    let targetCalories = tdee;
    let proteinPerKg = 2.0;
    let fatRatio = 0.28;

    if (goal === 'hypertrophy') {
      targetCalories += 350; // Spartan Bulk
      proteinPerKg = 2.2;
    } else if (goal === 'shred') {
      targetCalories -= 450; // Thermopylae Deficit
      proteinPerKg = 2.4;
      fatRatio = 0.25;
    } else if (goal === 'endurance') {
      targetCalories += 150;
      proteinPerKg = 1.8;
      fatRatio = 0.24;
    }

    const proteinGrams = Math.round(weightKg * proteinPerKg);
    const fatCalories = targetCalories * fatRatio;
    const fatGrams = Math.round(fatCalories / 9);
    const carbCalories = targetCalories - (proteinGrams * 4) - fatCalories;
    const carbGrams = Math.max(80, Math.round(carbCalories / 4));
    const waterLitres = (weightKg * 0.04).toFixed(1);

    const result = {
      targetCalories,
      proteinGrams,
      carbGrams,
      fatGrams,
      waterLitres,
      tdee
    };

    this.save(STORAGE_KEYS.NUTRITION_PROFILE, result);
    return result;
  }

  getPantheonScores() {
    // Generate scores based on PRs and workout logs
    const completedCount = this.logs.length;
    const zeusPower = Math.min(99, Math.round((this.prs.deadlift / 220) * 80 + (completedCount * 1.5)));
    const athenaSkill = Math.min(99, Math.round((this.prs.pullups / 25) * 85 + (completedCount * 1.2)));
    const apolloHarmony = Math.min(99, Math.round(((this.prs.bench + this.prs.press) / 200) * 80 + (completedCount * 1.1)));
    const poseidonEndurance = Math.min(99, Math.round(75 + (completedCount * 2)));
    const hermesSpeed = 82 + Math.min(15, completedCount);

    return {
      zeus: Math.max(50, zeusPower),
      athena: Math.max(55, athenaSkill),
      apollo: Math.max(52, apolloHarmony),
      poseidon: Math.max(60, poseidonEndurance),
      hermes: Math.max(58, hermesSpeed)
    };
  }

  startRestTimer(seconds, onTick, onComplete) {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerRemaining = seconds;
    if (onTick) onTick(this.timerRemaining);

    this.timerInterval = setInterval(() => {
      this.timerRemaining--;
      if (onTick) onTick(this.timerRemaining);

      if (this.timerRemaining <= 0) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        if (window.sanctuaryAudio) {
          window.sanctuaryAudio.playTempleBowlChime(587.33); // D5 chime
        }
        if (onComplete) onComplete();
      }
    }, 1000);
  }

  cancelRestTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}

window.olythosTracker = new OlythosTracker();
