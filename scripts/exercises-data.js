/**
 * OLYTHOS - Exercise Knowledge Base
 * Classical Greek Athletic Disciplines & Biomechanics
 */

const OLYTHOS_EXERCISES = [
  {
    id: "atlas-deadlift",
    title: "Atlas Stone Conventional Deadlift",
    greekTitle: "Πέτρος του Άτλαντος",
    deity: "zeus",
    category: "strength",
    muscleGroup: "back",
    targetMuscles: ["Erector Spinae", "Gluteus Maximus", "Hamstrings", "Trapezius"],
    difficulty: "Advanced",
    equipment: "Barbell / Heavy Stone",
    image: "assets/images/exercise_strength_discus.jpg",
    lore: "In Greek mythology, Atlas was condemned to hold up the celestial heavens for eternity. Ancient Olympic athletes in Olympia and Nemea trained by lifting massive inscribed river stones, some weighing over 300 pounds.",
    cues: [
      "Hinge hips back with a neutral spine, gripping the bar just outside your shins.",
      "Anchor your feet into the earth as if sinking into temple limestone.",
      "Drive through the midfoot and push the floor away, locking hips and glutes at apex.",
      "Control the descent without bouncing."
    ],
    recommendedSets: "4 sets × 5 reps (Heavy Power)",
    tips: "Keep lats packed down toward your hips like a bronze breastplate."
  },
  {
    id: "spartan-overhead-press",
    title: "Spartan Phalanx Overhead Press",
    greekTitle: "Πίεση των Σπαρτιατών",
    deity: "zeus",
    category: "strength",
    muscleGroup: "shoulders",
    targetMuscles: ["Anterior Deltoids", "Triceps Brachii", "Upper Pectorals", "Core"],
    difficulty: "Intermediate",
    equipment: "Barbell / Kettlebells",
    image: "assets/images/zeus_mountain_sanctuary.jpg",
    lore: "Spartan hoplites held heavy bronze-faced aspis shields aloft during prolonged formation clashes. Overhead stability was literally the line between survival and ruin.",
    cues: [
      "Grip slightly outside shoulders with forearms vertical.",
      "Squeeze glutes and brace your abdomen like a solid marble column.",
      "Press straight up, tucking chin slightly until bar clears, then head through.",
      "Lock elbows overhead in full control with shoulders active."
    ],
    recommendedSets: "4 sets × 6-8 reps",
    tips: "Do not hyperextend lumbar; brace your midsection tightly."
  },
  {
    id: "palaestra-bar-dip",
    title: "Palaestra Parallel Bar Dip",
    greekTitle: "Βύθιση της Παλαίστρας",
    deity: "athena",
    category: "calisthenics",
    muscleGroup: "chest",
    targetMuscles: ["Pectoralis Major", "Triceps", "Anterior Deltoid"],
    difficulty: "Intermediate",
    equipment: "Parallel Bars / Calisthenic Rig",
    image: "assets/images/exercise_calisthenics_art.jpg",
    lore: "Palaestra training grounds were dedicated to Athena and Hermes, where young Greeks conditioned their upper bodies using timber beams to develop battle-ready pushing power.",
    cues: [
      "Mount parallel bars with wrists straight and shoulders depressed.",
      "Slight forward torso lean (15-20 degrees) to emphasize chest fibers.",
      "Lower under control until shoulders dip just below elbow crease.",
      "Drive upward powerfully through palms to full lockout."
    ],
    recommendedSets: "4 sets × 8-12 reps",
    tips: "Avoid shrugging shoulders at bottom; keep scapulae retracted and depressed."
  },
  {
    id: "athenian-pullup",
    title: "Athenian Tactical Pull-Up",
    greekTitle: "Έλξη των Αθηναίων",
    deity: "athena",
    category: "calisthenics",
    muscleGroup: "back",
    targetMuscles: ["Latissimus Dorsi", "Biceps", "Rhomboids", "Brachialis"],
    difficulty: "Intermediate",
    equipment: "Pull-Up Bar / Rings",
    image: "assets/images/athena_olive_sanctuary.jpg",
    lore: "Athenian trireme rowers and acrobats developed back musculature through continuous vertical and horizontal pulling maneuvers across ships and siege fortifications.",
    cues: [
      "Full dead-hang grip slightly wider than shoulder width.",
      "Initiate by depressing and retracting shoulder blades.",
      "Pull chest directly to bar without kicking or swinging.",
      "Pause for 1 second at top, then lower with a strict 3-second eccentric."
    ],
    recommendedSets: "4 sets × 6-10 reps",
    tips: "Drive elbows down and back toward your back pockets."
  },
  {
    id: "olympic-hoplite-sprint",
    title: "Hoplitodromos Stadium Sprints",
    greekTitle: "Οπλιτοδρομία",
    deity: "hermes",
    category: "speed",
    muscleGroup: "legs",
    targetMuscles: ["Quadriceps", "Hamstrings", "Calves", "Cardiovascular"],
    difficulty: "Advanced",
    equipment: "Open Track / Hill",
    image: "assets/images/exercise_speed_sprint.jpg",
    lore: "The Hoplitodromos was an Olympic foot race where athletes sprinted two lengths of the stadium wearing greaves, helmet, and bearing an 18-pound bronze shield.",
    cues: [
      "Explosive start driving out of deep triple flexion (ankle, knee, hip).",
      "Drive knees high with dorsiflexed toes.",
      "Pump arms rhythmically from hip pocket to eye level.",
      "Sustain maximal effort for 40-100m bursts with active recovery walks."
    ],
    recommendedSets: "6-8 sprints × 60 meters (90s rest)",
    tips: "Stay relaxed in the jaw and neck; channel raw kinetic efficiency."
  },
  {
    id: "poseidon-trident-row",
    title: "Poseidon T-Bar / Cable Oar Row",
    greekTitle: "Κωπηλασία του Ποσειδώνος",
    deity: "poseidon",
    category: "strength",
    muscleGroup: "back",
    targetMuscles: ["Latissimus Dorsi", "Teres Major", "Middle Trapezius", "Posterior Delts"],
    difficulty: "Intermediate",
    equipment: "Barbell / Row Machine",
    image: "assets/images/poseidon_coastal_temple.jpg",
    lore: "Rowing across the storm-tossed Aegean Sea required enduring back stamina. Athletes honored Poseidon by conditioning the pulling muscles that tamed the waves.",
    cues: [
      "Set torso at 45 degrees with knees softly unlocked.",
      "Pull handle into lower sternum, squeezing shoulder blades together.",
      "Hold peak contraction for a heartbeat of quiet control.",
      "Extend arms smoothly, feeling deep lat stretch at bottom."
    ],
    recommendedSets: "4 sets × 10 reps",
    tips: "Keep ribcage proud and avoid jerking torso upward."
  },
  {
    id: "delphi-mobility-flow",
    title: "Pythian Temple Ground Mobility",
    greekTitle: "Κινητικότητα των Δελφών",
    deity: "apollo",
    category: "mobility",
    muscleGroup: "mobility",
    targetMuscles: ["Hip Capsule", "Thoracic Spine", "Hamstrings", "Ankles"],
    difficulty: "All Levels",
    equipment: "Mat / Stone Floor",
    image: "assets/images/exercise_mobility_art.jpg",
    lore: "At Delphi, supplicants and athletes underwent ritual cleansing and deep mobility conditioning in olive groves before entering the Pythian Games competition.",
    cues: [
      "Transition smoothly between deep 90/90 hip switches and cossack lunges.",
      "Breathe through diaphragmatic nasal cycles, syncing movement with exhales.",
      "Hold deep squat for 60 seconds, gently prying knees open with elbows.",
      "Perform thoracic spine rotations to unlock posture for heavy lifting."
    ],
    recommendedSets: "3 rounds × 8-10 minutes",
    tips: "Focus on joint lubrication and calm nervous system regulation."
  },
  {
    id: "apollo-incline-press",
    title: "Apollonian Incline Marble Press",
    greekTitle: "Επικλινής Πίεση του Απόλλωνος",
    deity: "apollo",
    category: "strength",
    muscleGroup: "chest",
    targetMuscles: ["Upper Pectoralis", "Anterior Deltoid", "Triceps"],
    difficulty: "Intermediate",
    equipment: "Dumbbells / Incline Bench",
    image: "assets/images/apollo_golden_courtyard.jpg",
    lore: "Apollo represented the ideal of Kalokagathia—harmonious balance, proportion, and golden ratio aesthetics. The upper chest shelf gives the classical Greek torso its iconic heroic silhouette.",
    cues: [
      "Set bench between 30 to 45 degrees.",
      "Retract scapulae and plant feet firmly on the ground.",
      "Lower dumbbells with elbows tucked at roughly 60 degrees from torso.",
      "Press upward and slightly inward along an arc, keeping tension on upper pecs."
    ],
    recommendedSets: "4 sets × 8-10 reps",
    tips: "Do not let shoulders roll forward at the bottom."
  },
  {
    id: "leonidas-barbell-squat",
    title: "Leonidas Spartan Back Squat",
    greekTitle: "Κάθισμα του Λεωνίδα",
    deity: "ares",
    category: "strength",
    muscleGroup: "legs",
    targetMuscles: ["Quadriceps", "Gluteus Maximus", "Adductors", "Core"],
    difficulty: "Advanced",
    equipment: "Barbell & Squat Rack",
    image: "assets/images/training_olympic_ground.jpg",
    lore: "King Leonidas of Sparta demanded absolute physical resilience from his warriors. The ability to endure heavy axial loads created immovable spear-walls at Thermopylae.",
    cues: [
      "Place bar across mid-traps (high-bar) or rear delts (low-bar).",
      "Take a shoulder-width stance with toes flared 15-30 degrees.",
      "Take a deep diaphragmatic breath and brace abdominal wall.",
      "Squat smoothly below parallel while driving knees outward over toes.",
      "Drive out of the hole with hips and chest ascending simultaneously."
    ],
    recommendedSets: "5 sets × 5 reps",
    tips: "Maintain vertical torso posture and keep heels glued to the floor."
  },
  {
    id: "discobolus-rotational-chop",
    title: "Discobolus Cable Rotational Power",
    greekTitle: "Ισχύς του Δισκοβόλου",
    deity: "apollo",
    category: "strength",
    muscleGroup: "core",
    targetMuscles: ["Internal & External Obliques", "Transverse Abdominis", "Hip Rotators"],
    difficulty: "Intermediate",
    equipment: "Cable Pulley / Medicine Ball",
    image: "assets/images/hero_sanctuary_dawn.jpg",
    lore: "Immortalized in Myron's famous 5th-century BC sculpture, the discus thrower embodies spiral kinetic energy transfer from feet through the core and into the throwing hand.",
    cues: [
      "Stand perpendicular to cable tower with athletic athletic stance.",
      "Rotate hips and torso together, pivoting back foot like a thrower.",
      "Drive rotation from hips and obliques, keeping arms long and strong.",
      "Control return path slowly to resist centrifugal momentum."
    ],
    recommendedSets: "3 sets × 12 reps per side",
    tips: "Power generates from the floor through hip internal rotation."
  },
  {
    id: "spartan-shield-carry",
    title: "Spartan Shield Farmer's Walk",
    greekTitle: "Μεταφορά Ασπίδος",
    deity: "ares",
    category: "strength",
    muscleGroup: "core",
    targetMuscles: ["Forearms & Grip", "Trapezius", "Core Stabilizers", "Calves"],
    difficulty: "Intermediate",
    equipment: "Heavy Dumbbells / Trap Bar / Stones",
    image: "assets/images/philosophy_marble_hall.jpg",
    lore: "Spartan mothers famously told their sons marching to battle: 'Come back with your shield, or on it.' Carrying heavy loads over distance built unflinching fortitude.",
    cues: [
      "Deadlift two heavy implements with strict form.",
      "Pack shoulders down and back, chest tall, ribs tucked.",
      "Take short, deliberate, heel-to-toe strides in a straight path.",
      "Resist any sideways sway or torso bending."
    ],
    recommendedSets: "4 rounds × 40 meters",
    tips: "Crush the handles as if your grip was cast in solid bronze."
  },
  {
    id: "olympic-box-bounds",
    title: "Hermes Explosive Plyometric Jumps",
    greekTitle: "Άλματα του Ερμού",
    deity: "hermes",
    category: "speed",
    muscleGroup: "legs",
    targetMuscles: ["Quadriceps", "Glutes", "Fast-Twitch Muscle Fibers"],
    difficulty: "Advanced",
    equipment: "Plyometric Box / Stone Ledge",
    image: "assets/images/training_olympic_ground.jpg",
    lore: "In honor of winged-foot Hermes, Greek long jumpers (halma) competed using stone weights (halteres) to slingshot their bodies further through the air.",
    cues: [
      "Hinge hips back in athletic stance with arms loaded behind.",
      "Explode upward through triple extension, driving arms forward.",
      "Land softly on box like a feline, absorbing impact in quarter-squat.",
      "Step down carefully one foot at a time."
    ],
    recommendedSets: "5 sets × 5 jumps",
    tips: "Focus on maximal vertical acceleration and quiet, soft landings."
  }
];

// Pre-configured Pantheon Routines
const PANTHEON_ROUTINES = {
  zeus: {
    id: "zeus-routine",
    name: "Zeus Sovereign Power & Iron Will",
    greekName: "Κυριαρχία του Διός",
    subtitle: "Heavy compound strength, raw neural recruitment, and monumental power.",
    deity: "Zeus",
    focus: "Axial Loading & Maximal Strength",
    duration: "65 min",
    intensity: "9.5 / 10",
    bg: "assets/images/zeus_mountain_sanctuary.jpg",
    exercises: [
      { exerciseId: "atlas-deadlift", sets: 4, reps: "5", targetWeight: "85% 1RM", restSeconds: 150 },
      { exerciseId: "spartan-overhead-press", sets: 4, reps: "6", targetWeight: "80% 1RM", restSeconds: 120 },
      { exerciseId: "leonidas-barbell-squat", sets: 4, reps: "5", targetWeight: "85% 1RM", restSeconds: 180 },
      { exerciseId: "spartan-shield-carry", sets: 3, reps: "40m", targetWeight: "Heavy", restSeconds: 90 }
    ]
  },
  athena: {
    id: "athena-routine",
    name: "Athena Tactical Calisthenics & Strategy",
    greekName: "Στρατηγική της Αθηνάς",
    subtitle: "Precise body control, relative strength, and flawless biomechanical form.",
    deity: "Athena",
    focus: "Gymnasia Calisthenics & Relative Strength",
    duration: "50 min",
    intensity: "8.5 / 10",
    bg: "assets/images/athena_olive_sanctuary.jpg",
    exercises: [
      { exerciseId: "athenian-pullup", sets: 4, reps: "8-10", targetWeight: "Bodyweight / +10kg", restSeconds: 90 },
      { exerciseId: "palaestra-bar-dip", sets: 4, reps: "10-12", targetWeight: "Bodyweight", restSeconds: 75 },
      { exerciseId: "discobolus-rotational-chop", sets: 3, reps: "12 each", targetWeight: "Moderate", restSeconds: 60 },
      { exerciseId: "delphi-mobility-flow", sets: 2, reps: "10 min", targetWeight: "Mobility", restSeconds: 45 }
    ]
  },
  apollo: {
    id: "apollo-routine",
    name: "Apollo Golden Proportion & Aesthetics",
    greekName: "Αρμονία του Απόλλωνος",
    subtitle: "Kalokagathia hypertrophy, classical shoulder-to-waist ratio, and posture.",
    deity: "Apollo",
    focus: "Hypertrophy, Symmetry & Postural Arete",
    duration: "60 min",
    intensity: "8.0 / 10",
    bg: "assets/images/apollo_golden_courtyard.jpg",
    exercises: [
      { exerciseId: "apollo-incline-press", sets: 4, reps: "8-10", targetWeight: "75% 1RM", restSeconds: 90 },
      { exerciseId: "poseidon-trident-row", sets: 4, reps: "10-12", targetWeight: "75% 1RM", restSeconds: 90 },
      { exerciseId: "discobolus-rotational-chop", sets: 3, reps: "15 each", targetWeight: "Moderate", restSeconds: 60 },
      { exerciseId: "spartan-shield-carry", sets: 3, reps: "50m", targetWeight: "Moderate", restSeconds: 75 }
    ]
  },
  poseidon: {
    id: "poseidon-routine",
    name: "Poseidon Hydro-Endurance & Back Power",
    greekName: "Ισχύς του Ποσειδώνος",
    subtitle: "Relentless pulling stamina, thick posterior chain, and fluid joint resiliency.",
    deity: "Poseidon",
    focus: "Posterior Chain, Grip & Muscular Stamina",
    duration: "55 min",
    intensity: "8.8 / 10",
    bg: "assets/images/poseidon_coastal_temple.jpg",
    exercises: [
      { exerciseId: "poseidon-trident-row", sets: 5, reps: "10", targetWeight: "75% 1RM", restSeconds: 75 },
      { exerciseId: "athenian-pullup", sets: 4, reps: "Max-2", targetWeight: "Bodyweight", restSeconds: 90 },
      { exerciseId: "atlas-deadlift", sets: 3, reps: "8", targetWeight: "70% 1RM", restSeconds: 120 },
      { exerciseId: "delphi-mobility-flow", sets: 2, reps: "8 min", targetWeight: "Fluid Flow", restSeconds: 45 }
    ]
  },
  hermes: {
    id: "hermes-routine",
    name: "Hermes Winged Speed & Explosive Agility",
    greekName: "Ταχύτης του Ερμού",
    subtitle: "Fast-twitch plyometrics, acceleration sprints, and lightning footwork.",
    deity: "Hermes",
    focus: "Speed, Fast-Twitch Recruitment & Conditioning",
    duration: "45 min",
    intensity: "9.0 / 10",
    bg: "assets/images/training_olympic_ground.jpg",
    exercises: [
      { exerciseId: "olympic-box-bounds", sets: 5, reps: "5", targetWeight: "Explosive", restSeconds: 90 },
      { exerciseId: "olympic-hoplite-sprint", sets: 6, reps: "60m", targetWeight: "Max Sprint", restSeconds: 120 },
      { exerciseId: "delphi-mobility-flow", sets: 2, reps: "10 min", targetWeight: "Active Recovery", restSeconds: 60 }
    ]
  }
};
