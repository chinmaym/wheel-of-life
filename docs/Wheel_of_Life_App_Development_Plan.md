# Wheel of Life App - Development Plan

## Project Overview
A minimal MVP app that helps users check in on 8 life areas, visualize balance through a wheel chart, and identify neglected areas of their life.

---

## 1. Core Features (MVP)

### 1.1 Check-in Feature
- **Frequency**: Customizable (daily, weekly, monthly)
- **Questionnaire**:
  - 8 life categories: Health, Career, Finances, Relationships, Family, Personal Growth, Fun/Recreation, Spirituality
  - Each category: 1 simple question (e.g., "How satisfied are you with your health?")
  - Scale: 1-10 or 5-point Likert scale
- **Time to complete**: ~2 minutes

### 1.2 Wheel Visualization
- **Chart type**: Radar/Spider chart (wheel format)
- **Display**: Shows current scores for all 8 categories
- **Insight**: Immediately shows imbalances and neglected areas
- **Data view**: Can toggle between current snapshot and historical trends

### 1.3 Data Persistence
- **Minimal MVP**: Local storage (web) / Device storage (mobile)
- **Future**: Cloud storage with user accounts
- **Tracking**: Store timestamp + scores for each check-in

### 1.4 History
- Last 10-12 check-ins visible as a simple list
- Can see how scores have changed over time

---

## 2. Technology Stack (Recommended)

### Frontend - Web
- **Framework**: React (Vite for fast build)
- **Styling**: Tailwind CSS
- **Charts**: Recharts or Chart.js (for wheel/radar chart)
- **State Management**: React Context (minimal for MVP)
- **Storage**: LocalStorage (browser)

### Frontend - Mobile
- **Framework**: React Native (with Expo for faster development)
- **Alternative**: Flutter (if you prefer)
- **Charts**: react-native-svg or react-native-skia
- **Storage**: AsyncStorage (React Native) or device file system

### Backend (Optional for MVP)
- **For MVP**: Not strictly needed (client-side only)
- **If needed later**:
  - Node.js + Express or Python + FastAPI
  - Firebase or Supabase (easiest for quick deployment)
  - PostgreSQL or MongoDB for database

---

## 3. Database Schema (When Backend is Added)

```
USERS
- id (UUID)
- created_at
- updated_at

LIFE_CATEGORIES
- id (UUID)
- name (Health, Career, etc.)
- icon/color
- display_order

CHECK_INS
- id (UUID)
- user_id (FK)
- created_at
- category_id (FK)
- score (1-10)

USER_SETTINGS
- id (UUID)
- user_id (FK)
- check_in_frequency (daily/weekly/monthly)
- reminder_enabled (boolean)
- reminder_time
```

---

## 4. User Flow

1. **First Time User**
   - Opens app → Sees intro/onboarding explaining "Wheel of Life"
   - Option to do first check-in immediately or skip

2. **During Check-in**
   - User sees one category at a time or all 8 on one screen
   - Answers: "How satisfied are you with [category]?" (1-10 scale)
   - Can review before submitting

3. **Post Check-in**
   - Wheel chart displays with current scores
   - Highlighted: Lowest scoring areas (neglected areas)
   - Suggestion: "You rated Family 3/10 - consider dedicating time this week"

4. **History View**
   - See past check-ins
   - Optional: Simple trend lines showing improvement/decline

---

## 5. UI/UX Layout

### Web Layout
```
┌─────────────────────────┐
│   Wheel of Life         │
├─────────────────────────┤
│                         │
│   [Wheel Chart]         │
│                         │
├─────────────────────────┤
│ ✓ Latest Check-in: 2h ago
│ [New Check-in] [History]
└─────────────────────────┘
```

### Mobile Layout
```
┌──────────────────┐
│ Wheel of Life    │
├──────────────────┤
│  [Wheel Chart]   │
├──────────────────┤
│ Latest: 2h ago   │
│ [+ New Check-in] │
│ [View History]   │
└──────────────────┘
```

---

## 6. Development Phases

### Phase 1: Core Web App (Weeks 1-2)
- [ ] Set up React + Vite project
- [ ] Build check-in form component (8 questions)
- [ ] Integrate chart library for wheel visualization
- [ ] Implement LocalStorage for data persistence
- [ ] Basic styling with Tailwind
- [ ] Test end-to-end flow

### Phase 2: Mobile App (Weeks 3-4)
- [ ] Create React Native Expo project
- [ ] Port check-in form to mobile
- [ ] Integrate chart library for mobile
- [ ] AsyncStorage for persistence
- [ ] Test on iOS and Android simulators

### Phase 3: Polish & Testing (Week 5)
- [ ] Add basic animations/transitions
- [ ] Test across devices/browsers
- [ ] Fix bugs and UX issues
- [ ] Launch MVP

---

## 7. Key Decisions to Make

1. **Scale preference**: 1-10 or 1-5? (1-10 gives more granularity, 1-5 simpler)
2. **Check-in UI**: One question at a time (carousel) or all 8 on one page?
3. **Notifications**: Should the app remind users to check in?
4. **Dark mode**: Include from the start?
5. **Monetization**: Free forever or premium features later?

---

## 8. Nice-to-Have Features (Post-MVP)

- Push notifications/reminders
- User accounts and cloud sync
- Weekly/monthly summary emails
- AI-generated insights ("You're neglecting Finance, here are tips...")
- Share wheel with accountability partner
- Goal setting for low-scoring areas
- Dark mode
- Multiple languages

---

## 9. Success Metrics (MVP)

- Users complete a check-in in <3 minutes
- Wheel chart clearly shows imbalances
- Users can see their progress over time
- App works seamlessly on web and mobile

---

## Next Steps

1. **Discuss**: Review these recommendations - any changes?
2. **Setup**: Set up the development environment (Node.js, React, etc.)
3. **Design**: Create detailed wireframes (use Figma or similar)
4. **Build**: Start with the web app core
5. **Test**: Get early feedback before mobile version

---

Would you like me to:
- Create detailed wireframes?
- Set up the initial project structure?
- Dive deeper into any specific section?
