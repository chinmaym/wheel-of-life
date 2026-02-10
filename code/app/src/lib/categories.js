export const CATEGORIES = [
  {
    key: 'health',
    label: 'Health',
    emoji: '💪',
    questions: [
      {
        text: 'How often do you exercise or move your body?',
        answers: [
          { label: 'Rarely or never', value: 2 },
          { label: '1–2 times a week', value: 5 },
          { label: '3–4 times a week', value: 8 },
          { label: 'Daily or almost daily', value: 10 },
        ],
      },
      {
        text: 'How well are you sleeping?',
        answers: [
          { label: 'Poorly — often tired and unrested', value: 2 },
          { label: 'Hit or miss — some good nights, some bad', value: 5 },
          { label: 'Generally well — feel rested most days', value: 8 },
          { label: 'Excellent — consistent, deep sleep', value: 10 },
        ],
      },
      {
        text: 'How would you describe your energy levels day-to-day?',
        answers: [
          { label: 'Very low — dragging through the day', value: 2 },
          { label: 'Moderate — enough to get by', value: 5 },
          { label: 'Good — energized most of the time', value: 8 },
          { label: 'High — I feel vibrant and alive', value: 10 },
        ],
      },
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
      {
        text: 'How engaged and motivated do you feel at work?',
        answers: [
          { label: 'Disengaged — dreading most days', value: 2 },
          { label: 'Going through the motions', value: 5 },
          { label: 'Mostly engaged — enjoy what I do', value: 8 },
          { label: 'Deeply motivated — work energizes me', value: 10 },
        ],
      },
      {
        text: 'Are you growing and learning in your role?',
        answers: [
          { label: 'No growth — feeling stagnant', value: 2 },
          { label: 'Some learning but not enough', value: 5 },
          { label: 'Steadily developing new skills', value: 8 },
          { label: 'Rapid growth — learning constantly', value: 10 },
        ],
      },
      {
        text: 'Does your work align with your long-term goals?',
        answers: [
          { label: 'Not at all — feels like a dead end', value: 2 },
          { label: 'Somewhat — but unclear direction', value: 5 },
          { label: 'Mostly — I can see a path forward', value: 8 },
          { label: 'Perfectly — exactly where I want to be', value: 10 },
        ],
      },
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
      {
        text: 'Can you comfortably cover your monthly expenses?',
        answers: [
          { label: 'No — constantly stressed about bills', value: 2 },
          { label: 'Barely — living paycheck to paycheck', value: 5 },
          { label: 'Yes — with some room to spare', value: 8 },
          { label: 'Easily — expenses are well managed', value: 10 },
        ],
      },
      {
        text: 'Are you saving or investing for the future?',
        answers: [
          { label: 'Not at all — no savings', value: 2 },
          { label: 'A little — but inconsistently', value: 5 },
          { label: 'Regularly — building a solid cushion', value: 8 },
          { label: 'Aggressively — well on track for goals', value: 10 },
        ],
      },
      {
        text: 'How in control do you feel of your finances?',
        answers: [
          { label: 'Out of control — debt or anxiety', value: 2 },
          { label: 'Somewhat — but lack a clear plan', value: 5 },
          { label: 'In control — I budget and track', value: 8 },
          { label: 'Fully in command — confident and free', value: 10 },
        ],
      },
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
      {
        text: 'Do you have close friends you can truly count on?',
        answers: [
          { label: 'No — I feel quite alone', value: 2 },
          { label: 'A few — but we\'re not very close', value: 5 },
          { label: 'Yes — I have a solid circle', value: 8 },
          { label: 'Absolutely — deep, reliable friendships', value: 10 },
        ],
      },
      {
        text: 'How satisfied are you with your romantic life?',
        answers: [
          { label: 'Unhappy or lonely', value: 2 },
          { label: 'It\'s okay but something\'s missing', value: 5 },
          { label: 'Good — I feel connected and cared for', value: 8 },
          { label: 'Deeply fulfilled and in love', value: 10 },
        ],
      },
      {
        text: 'Do you feel socially connected and supported?',
        answers: [
          { label: 'Isolated — rarely see people', value: 2 },
          { label: 'Some connection but want more', value: 5 },
          { label: 'Well connected — good social life', value: 8 },
          { label: 'Thriving — rich, meaningful connections', value: 10 },
        ],
      },
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
      {
        text: 'How is your relationship with close family members?',
        answers: [
          { label: 'Strained or distant', value: 2 },
          { label: 'Functional but could be better', value: 5 },
          { label: 'Good — we get along well', value: 8 },
          { label: 'Excellent — deep love and respect', value: 10 },
        ],
      },
      {
        text: 'Do you spend enough quality time with family?',
        answers: [
          { label: 'Rarely or never', value: 2 },
          { label: 'Not as much as I\'d like', value: 5 },
          { label: 'Regularly — we make time for each other', value: 8 },
          { label: 'Plenty — family is a priority', value: 10 },
        ],
      },
      {
        text: 'Do you feel supported by your family?',
        answers: [
          { label: 'Not at all — on my own', value: 2 },
          { label: 'Somewhat — but it\'s complicated', value: 5 },
          { label: 'Yes — they\'re there when I need them', value: 8 },
          { label: 'Completely — unconditional support', value: 10 },
        ],
      },
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
      {
        text: 'Are you actively learning new things?',
        answers: [
          { label: 'No — stuck in old routines', value: 2 },
          { label: 'Occasionally — when I get around to it', value: 5 },
          { label: 'Yes — I read, take courses, or explore', value: 8 },
          { label: 'Constantly — I\'m a learning machine', value: 10 },
        ],
      },
      {
        text: 'Do you feel like you\'re becoming a better version of yourself?',
        answers: [
          { label: 'No — I feel stuck or regressing', value: 2 },
          { label: 'Slowly — some progress but inconsistent', value: 5 },
          { label: 'Yes — I can see meaningful growth', value: 8 },
          { label: 'Absolutely — transforming in real ways', value: 10 },
        ],
      },
      {
        text: 'How often do you step outside your comfort zone?',
        answers: [
          { label: 'Almost never — I stick to what I know', value: 2 },
          { label: 'Rarely — but I think about it', value: 5 },
          { label: 'Regularly — I push my boundaries', value: 8 },
          { label: 'Frequently — I seek out challenges', value: 10 },
        ],
      },
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
      {
        text: 'Do you make time for hobbies and things you enjoy?',
        answers: [
          { label: 'Never — no time or energy for fun', value: 2 },
          { label: 'Rarely — life gets in the way', value: 5 },
          { label: 'Regularly — I protect my fun time', value: 8 },
          { label: 'Always — joy is a daily priority', value: 10 },
        ],
      },
      {
        text: 'When was the last time you did something just for fun?',
        answers: [
          { label: 'Can\'t remember — it\'s been too long', value: 2 },
          { label: 'A few weeks ago', value: 5 },
          { label: 'This past week', value: 8 },
          { label: 'Today or yesterday', value: 10 },
        ],
      },
      {
        text: 'How\'s your work-life balance?',
        answers: [
          { label: 'All work, no play', value: 2 },
          { label: 'Leaning too much toward work', value: 5 },
          { label: 'Pretty balanced — I make time for both', value: 8 },
          { label: 'Excellent — I live a full, joyful life', value: 10 },
        ],
      },
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
      {
        text: 'Do you feel a sense of purpose or meaning in life?',
        answers: [
          { label: 'No — feeling lost or aimless', value: 2 },
          { label: 'Vaguely — searching for direction', value: 5 },
          { label: 'Yes — I have a clear sense of purpose', value: 8 },
          { label: 'Deeply — my life feels profoundly meaningful', value: 10 },
        ],
      },
      {
        text: 'Do you have practices that ground you (meditation, prayer, nature, journaling)?',
        answers: [
          { label: 'No — nothing consistent', value: 2 },
          { label: 'Sometimes — but I fall off the wagon', value: 5 },
          { label: 'Regularly — I have a routine that works', value: 8 },
          { label: 'Daily — it\'s a core part of who I am', value: 10 },
        ],
      },
      {
        text: 'Do you feel at peace with yourself?',
        answers: [
          { label: 'Rarely — inner turmoil is common', value: 2 },
          { label: 'Sometimes — it comes and goes', value: 5 },
          { label: 'Mostly — I feel centered and calm', value: 8 },
          { label: 'Deeply — strong inner peace and acceptance', value: 10 },
        ],
      },
    ],
    levels: [
      { range: '1–3', label: 'Disconnected', description: 'Feeling lost, no sense of purpose, inner turmoil' },
      { range: '4–6', label: 'Searching', description: 'Some awareness but lacking consistent practice or clarity' },
      { range: '7–8', label: 'Grounded', description: 'Regular practice, sense of purpose, mostly at peace' },
      { range: '9–10', label: 'Deeply aligned', description: 'Strong inner peace, clear purpose, feel connected to something bigger' },
    ],
  },
]

/**
 * Calculate scores from answers for all categories.
 * @param {Object} answers - { categoryKey: [answerIndex, ...], ... }
 * @returns {Object} scores - { categoryKey: number, ... }
 */
export function calculateScoresFromAnswers(answers) {
  const scores = {}
  for (const [categoryKey, answerIndices] of Object.entries(answers)) {
    const category = CATEGORIES.find((c) => c.key === categoryKey)
    if (!category) continue
    const values = answerIndices.map(
      (idx, qIdx) => category.questions[qIdx].answers[idx].value
    )
    const avg = values.reduce((a, b) => a + b, 0) / values.length
    scores[categoryKey] = Math.round(avg * 10) / 10
  }
  return scores
}
