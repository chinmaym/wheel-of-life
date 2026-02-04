export const CATEGORIES = [
  {
    key: 'health',
    label: 'Health',
    emoji: '💪',
    questions: [
      'How often do you exercise or move your body?',
      'Are you sleeping well and feeling rested?',
      'How would you rate your energy levels day-to-day?',
    ],
    levels: [
      { range: '1–3', label: 'Struggling', description: 'Frequent illness, no exercise, poor sleep, low energy' },
      { range: '4–6', label: 'Getting by', description: 'Inconsistent habits, some good days but often tired' },
      { range: '7–8', label: 'Healthy', description: 'Regular exercise, decent sleep, generally feeling good' },
      { range: '9–10', label: 'Thriving', description: 'Peak energy, strong habits, feel great physically' },
    ],
  },
  {
    key: 'career',
    label: 'Career',
    emoji: '💼',
    questions: [
      'Do you feel engaged and motivated at work?',
      'Are you growing and learning in your role?',
      'Does your work align with your long-term goals?',
    ],
    levels: [
      { range: '1–3', label: 'Stuck', description: 'Dreading work, no growth, feeling trapped or lost' },
      { range: '4–6', label: 'Coasting', description: 'It pays the bills but lacks excitement or direction' },
      { range: '7–8', label: 'Fulfilled', description: 'Enjoy most days, learning, clear path forward' },
      { range: '9–10', label: 'On fire', description: 'Love what you do, meaningful impact, strong momentum' },
    ],
  },
  {
    key: 'finances',
    label: 'Finances',
    emoji: '💰',
    questions: [
      'Can you comfortably cover your monthly expenses?',
      'Are you saving or investing for the future?',
      'Do you feel in control of your money?',
    ],
    levels: [
      { range: '1–3', label: 'Stressed', description: 'Living paycheck to paycheck, debt causing anxiety' },
      { range: '4–6', label: 'Managing', description: 'Bills are paid but little savings, some worry' },
      { range: '7–8', label: 'Comfortable', description: 'Saving regularly, manageable debt, feeling secure' },
      { range: '9–10', label: 'Abundant', description: 'Financial freedom, strong savings, no money stress' },
    ],
  },
  {
    key: 'relationships',
    label: 'Relationships',
    emoji: '❤️',
    questions: [
      'Do you have close friends you can count on?',
      'Are you happy with your romantic relationship (or being single)?',
      'Do you feel socially connected and supported?',
    ],
    levels: [
      { range: '1–3', label: 'Isolated', description: 'Lonely, lacking connection, strained relationships' },
      { range: '4–6', label: 'Mixed', description: 'Some connections but wanting deeper or more relationships' },
      { range: '7–8', label: 'Connected', description: 'Good friendships, healthy relationships, feel supported' },
      { range: '9–10', label: 'Deeply fulfilled', description: 'Rich social life, deep bonds, truly loved and valued' },
    ],
  },
  {
    key: 'family',
    label: 'Family',
    emoji: '👨‍👩‍👧‍👦',
    questions: [
      'How is your relationship with close family members?',
      'Do you spend enough quality time with family?',
      'Do you feel supported by your family?',
    ],
    levels: [
      { range: '1–3', label: 'Strained', description: 'Conflicts, distance, lack of communication' },
      { range: '4–6', label: 'Okay', description: 'Functional but could be closer or more present' },
      { range: '7–8', label: 'Strong', description: 'Regular contact, mutual support, enjoy time together' },
      { range: '9–10', label: 'Unbreakable', description: 'Deep bonds, always there for each other, true harmony' },
    ],
  },
  {
    key: 'personal_growth',
    label: 'Personal Growth',
    emoji: '🌱',
    questions: [
      'Are you actively learning new things?',
      "Do you feel like you're becoming a better version of yourself?",
      'Are you stepping outside your comfort zone?',
    ],
    levels: [
      { range: '1–3', label: 'Stagnant', description: 'Stuck in old patterns, no new learning, feeling flat' },
      { range: '4–6', label: 'Dabbling', description: 'Some interest in growth but inconsistent effort' },
      { range: '7–8', label: 'Growing', description: 'Reading, learning, reflecting regularly, making progress' },
      { range: '9–10', label: 'Transforming', description: 'Rapid growth, pushing limits, deeply self-aware' },
    ],
  },
  {
    key: 'fun',
    label: 'Fun & Recreation',
    emoji: '🎉',
    questions: [
      'Do you make time for hobbies and things you enjoy?',
      'When was the last time you did something just for fun?',
      'Do you feel a good balance between work and play?',
    ],
    levels: [
      { range: '1–3', label: 'All work', description: 'No hobbies, no downtime, life feels like a grind' },
      { range: '4–6', label: 'Occasional', description: 'Some fun but often pushed aside by obligations' },
      { range: '7–8', label: 'Balanced', description: 'Regular hobbies, social activities, enjoy your free time' },
      { range: '9–10', label: 'Living fully', description: 'Plenty of joy, adventure, laughter in daily life' },
    ],
  },
  {
    key: 'spirituality',
    label: 'Spirituality',
    emoji: '🧘',
    questions: [
      'Do you feel a sense of purpose or meaning in life?',
      'Do you have practices that ground you (meditation, prayer, nature)?',
      'Do you feel at peace with yourself?',
    ],
    levels: [
      { range: '1–3', label: 'Disconnected', description: 'Feeling lost, no sense of purpose, inner turmoil' },
      { range: '4–6', label: 'Searching', description: 'Some awareness but lacking consistent practice or clarity' },
      { range: '7–8', label: 'Grounded', description: 'Regular practice, sense of purpose, mostly at peace' },
      { range: '9–10', label: 'Deeply aligned', description: 'Strong inner peace, clear purpose, feel connected to something bigger' },
    ],
  },
]
