# Wheel of Life - User Flows & Wireframes

## Quick Navigation
- [User Flow Diagrams](#user-flow-diagrams)
- [Wireframe Descriptions](#wireframe-descriptions)
- [State Management](#state-management)
- [Error Scenarios](#error-scenarios)

---

## User Flow Diagrams

### Flow 1: New User - First Time Using App

```
┌─────────────────┐
│  Open App       │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│  App Check: Existing Data?      │
└────────┬────────────────────────┘
         │
         ├─ NO: Show Onboarding
         │       Explain "Wheel of Life"
         │
         ▼
┌─────────────────────────────────┐
│  User Taps "Start Check-in"     │
│  or "Skip to Dashboard"         │
└────────┬────────────────────────┘
         │
         ├─ Start Check-in → [Flow 2]
         │
         ├─ Skip → [Show Empty Dashboard]
         │         "No check-ins yet"
         │
         └─ Learn More → [Info Screen]
```

### Flow 2: Complete a Check-in

```
┌──────────────────────────┐
│  Home Screen             │
│  [+ New Check-in] Button │
└─────────────┬────────────┘
              │
              ▼
┌──────────────────────────────────┐
│  Check-in Form                   │
│  ┌──────────────────────────┐   │
│  │ 🏥 Health        [1][2]… │   │
│  │ 💼 Career        [1][2]… │   │
│  │ 💰 Finances      [1][2]… │   │
│  │ ... (8 categories total) │   │
│  └──────────────────────────┘   │
│  [Submit Check-in]               │
└─────────────┬────────────────────┘
              │
              ▼ (User rates all 8)
┌──────────────────────────────────┐
│  Save to LocalStorage            │
│  Calculate overall score:        │
│  Average of all 8 ratings        │
└─────────────┬────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│  Display Wheel Chart             │
│  ┌──────────────────────────┐   │
│  │     [Radar Chart]        │   │
│  │   All 8 areas shown      │   │
│  └──────────────────────────┘   │
│                                  │
│  Insight: "Family needs          │
│  attention (3/10)"               │
│                                  │
│  [View History] [Another Check]  │
└──────────────────────────────────┘
```

### Flow 3: View Check-in History

```
┌─────────────────────────┐
│  Home Screen            │
│  [View History] Button  │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────────────┐
│  History List                   │
│  ┌─────────────────────────┐   │
│  │ Today (2:30 PM)         │   │
│  │ Score: 7.2/10           │   │
│  │ [Tap to expand]         │   │
│  ├─────────────────────────┤   │
│  │ Yesterday (6:45 PM)     │   │
│  │ Score: 6.8/10           │   │
│  │ [Tap to expand]         │   │
│  ├─────────────────────────┤   │
│  │ 2 days ago (10:15 AM)   │   │
│  │ Score: 6.5/10           │   │
│  └─────────────────────────┘   │
│                                 │
│  [Back to Home]                 │
└─────────────────────────────────┘

Optional - Expand Item:
┌─────────────────────────────────┐
│  Check-in Details: Today        │
│  ┌─────────────────────────┐   │
│  │ Health:     6/10  🟡    │   │
│  │ Career:     7/10  🟡    │   │
│  │ Finances:   5/10  🟡    │   │
│  │ Relationships: 8/10 🟢  │   │
│  │ Family:     3/10  🔴    │   │
│  │ Personal Growth: 6/10 🟡│   │
│  │ Fun:        7/10  🟡    │   │
│  │ Spirituality: 4/10 🔴   │   │
│  └─────────────────────────┘   │
└─────────────────────────────────┘
```

### Flow 4: Navigate between Screens (Simple)

```
         [Home/Dashboard]
              │ ▲
      ┌───────┼───────┐
      │       │       │
      ▼       ▼       │
  [Check-in] [History]
```

---

## Wireframe Descriptions

### Screen 1: Home/Dashboard - Detailed Wireframe

```
╔═══════════════════════════════════╗
║ ◄ Wheel of Life (Status Bar)      ║
╠═══════════════════════════════════╣
║                                   ║
║  Your Life Balance                ║ ← H2, #1f2937
║  Last check-in: 2 hours ago       ║ ← Small text, #6b7280
║                                   ║
║  ┌─────────────────────────────┐  ║
║  │                             │  ║
║  │    [Radar/Wheel Chart]      │  ║
║  │    8 life areas with        │  ║
║  │    current scores           │  ║
║  │    Height: 300-350px        │  ║
║  │                             │  ║
║  └─────────────────────────────┘  ║
║                                   ║
║  ┌─────────────────────────────┐  ║
║  │ [+ New Check-in] [History]  │  ║ ← 2 columns, gap 12px
║  └─────────────────────────────┘  ║
║                                   ║
║  Quick Insights (Optional):       ║ ← Section label
║  🔴 Family: 3/10 - Needs work    ║ ← Status badge
║  🟡 Finance: 5/10 - Improving    ║ ← Status badge
║                                   ║
║  [Scroll to see more]             ║
║                                   ║
╚═══════════════════════════════════╝

Desktop Layout (2 columns):
┌──────────────┬──────────────┐
│ Wheel Chart  │ Wheel Chart  │
│ (Left: 60%)  │ (Right: 40%) │
└──────────────┴──────────────┘

Mobile Layout (1 column):
┌──────────────┐
│ Wheel Chart  │
│ (100% width) │
├──────────────┤
│ Insights     │
│ (Scrollable) │
└──────────────┘
```

**Components:**
- **Header**: "Your Life Balance" (H2, 24px, weight 600)
- **Subheader**: "Last check-in: X time ago" (14px, #6b7280)
- **Chart Container**: Min 300px height, centered, with padding
- **Buttons**: Two-column grid, gap 12px
  - Primary: "+ New Check-in"
  - Secondary: "View History"
- **Insights Section**: Optional, shows 2-3 lowest-scoring areas

---

### Screen 2: Check-in Form - Detailed Wireframe

```
╔═══════════════════════════════════╗
║ ◄ Life Check-in (Status Bar)      ║
╠═══════════════════════════════════╣
║                                   ║
║  Life Check-in                    ║ ← H1, center-aligned
║  Rate your satisfaction (1-10)    ║ ← Subtext, center
║                                   ║
║  ┌─────────────────────────────┐  ║
║  │ 🏥 Health                   │  ║ ← Category + emoji
║  │                             │  ║
║  │ [1][2][3][4][5][6][7][8]   │  ║ ← Scale buttons
║  │ [9][10]                     │  ║
║  │                             │  ║
║  └─────────────────────────────┘  ║
║                                   ║
║  ┌─────────────────────────────┐  ║
║  │ 💼 Career                   │  ║
║  │                             │  ║
║  │ [1][2][3][4][5][6][7][8]   │  ║
║  │ [9][10]                     │  ║
║  │                             │  ║
║  └─────────────────────────────┘  ║
║                                   ║
║  ... (repeat for all 8)           ║
║                                   ║
║  [────────────────────────────]   ║ ← Submit button (full width)
║      Submit Check-in              ║
║  [────────────────────────────]   ║
║                                   ║
╚═══════════════════════════════════╝

Scale Button States:
┌────────┐ ← Default
│   5    │
└────────┘

┌────────┐ ← Hover
│   5    │ (text: #667eea)
└────────┘ (border: #667eea)

┌────────┐ ← Selected
│   5    │ (text: white, weight: 600)
└────────┘ (background: #667eea, border: #667eea)
```

**Components:**
- **Header**: "Life Check-in" (H2, 24px)
- **Instructions**: "Rate your satisfaction (1-10)" (14px, #6b7280)
- **Question Cards**: 8 cards, one per category
  - Icon + emoji (emoji: 20px)
  - Category name (16px, weight 600)
  - Scale buttons (36px circle, 1-10)
  - Gap between cards: 12px
- **Submit Button**: Full width, primary style, fixed at bottom on mobile

---

### Screen 3: History View - Detailed Wireframe

```
╔═══════════════════════════════════╗
║ ◄ Check-in History (Status Bar)   ║
╠═══════════════════════════════════╣
║                                   ║
║  Check-in History                 ║ ← H2, #1f2937
║                                   ║
║  ┌─────────────────────────────┐  ║
║  │ Today                       │  ║
║  │ 2:30 PM                     │  ║ ← Date / Time
║  │ Overall Score: 7.2/10       │  ║ ← Score highlight
║  │                             │  ║ ← Tap to expand (▼)
║  └─────────────────────────────┘  ║
║                                   ║
║  ┌─────────────────────────────┐  ║
║  │ Yesterday                   │  ║
║  │ 6:45 PM                     │  ║
║  │ Overall Score: 6.8/10       │  ║
║  │                             │  ║
║  └─────────────────────────────┘  ║
║                                   ║
║  ┌─────────────────────────────┐  ║
║  │ 2 days ago                  │  ║
║  │ 10:15 AM                    │  ║
║  │ Overall Score: 6.5/10       │  ║
║  │                             │  ║
║  └─────────────────────────────┘  ║
║                                   ║
║  ... (more items, scrollable)     ║
║                                   ║
╚═══════════════════════════════════╝

Expanded Item View:
┌─────────────────────────────────┐
│ Today (Expanded)                │
│ 2:30 PM                         │
├─────────────────────────────────┤
│ Health:           6/10  🟡      │ ← Score + status badge
│ Career:           7/10  🟡      │
│ Finances:         5/10  🟡      │
│ Relationships:    8/10  🟢      │ ← Status colors
│ Family:           3/10  🔴      │
│ Personal Growth:  6/10  🟡      │
│ Fun:              7/10  🟡      │
│ Spirituality:     4/10  🔴      │
└─────────────────────────────────┘
```

**Components:**
- **Header**: "Check-in History" (H2, 24px)
- **History Items**: Card layout
  - Date (16px, weight 600)
  - Time (14px, #6b7280)
  - Overall score (18px, weight 600, #667eea)
  - Expand indicator (▼)
  - Gap between items: 12px
- **Expanded Detail**: Shows all 8 categories with scores and status badges
- **Scrollable**: List scrolls vertically

---

## State Management

### Local State (Client-side)

```javascript
{
  checkIns: [
    {
      id: "uuid-123",
      timestamp: "2024-02-04T14:30:00Z",
      scores: {
        health: 6,
        career: 7,
        finances: 5,
        relationships: 8,
        family: 3,
        personal_growth: 6,
        fun: 7,
        spirituality: 4
      },
      overallScore: 6.25  // average
    },
    // ... more check-ins
  ],
  currentForm: {
    health: 6,
    career: 7,
    finances: null,
    // ... (partially filled)
  },
  lastCheckInTime: "2024-02-04T14:30:00Z",
  userPreferences: {
    reminderEnabled: false,
    theme: "light"
  }
}
```

### Storage Strategy (MVP)

**Web App:**
- LocalStorage: `wheel_of_life_data` (JSON string)
- Max size: ~5MB (plenty for 1-2 years of daily check-ins)
- Auto-save after each question submission

**Mobile App:**
- AsyncStorage (React Native): `wheel_of_life_data`
- Same JSON structure
- Async read/write operations

---

## Error Scenarios

### Scenario 1: Form Validation

```
User submits without answering all questions
         │
         ▼
Show toast/banner:
"Please answer all 8 categories before submitting"
(Red background, #ef4444)
         │
         ▼
Highlight empty fields in form
(Border: red, background: light red)
         │
         ▼
User fills in missing answers
         │
         ▼
Submit works, toast disappears
```

### Scenario 2: Data Load Fails

```
Page load, LocalStorage fails
         │
         ▼
Show empty state:
"No check-ins yet"
"Tap [+ New Check-in] to start"
         │
         ▼
User can still create new check-in
Data saves normally after
```

### Scenario 3: Form Progress Lost

```
User closes app mid-check-in
(No auto-save implemented for MVP)
         │
         ▼
User reopens app
         │
         ▼
Show home screen (form state lost)
         │
         ▼
User clicks "New Check-in" again
         │
         ▼
Fresh form starts
         │
         Note: Future version could auto-save
```

---

## Accessibility Wireframe Annotations

```
┌──────────────────────────────────────────┐
│ Semantic HTML                            │
│ - <h1>, <h2>, <h3> for headings         │
│ - <button> for buttons (not <div>)      │
│ - <label for="id"> for form inputs      │
│ - <button aria-label="..."> for icons   │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Focus States                             │
│ - Visible focus ring (2px, #667eea)     │
│ - 2px offset from element                │
│ - Keyboard navigation: Tab through all   │
│ - Enter/Space to activate buttons       │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Color Contrast                           │
│ - Text on background: ≥4.5:1 ratio      │
│ - Icon colors not sole indicator        │
│ - Status shown with text + color        │
│ - Example: "Family: 3/10" + 🔴          │
└──────────────────────────────────────────┘

┌──────────────────────────────────────────┐
│ Mobile Touch Targets                     │
│ - Minimum 44px height/width              │
│ - 8px spacing between targets            │
│ - Easy thumb reach on phone              │
└──────────────────────────────────────────┘
```

---

## Implementation Checklist

### Before Development Starts
- [ ] Review wireframes with team
- [ ] Get stakeholder sign-off on design direction
- [ ] Create detailed component specifications
- [ ] Design Figma mockups (high-fidelity)
- [ ] Create interactive prototype

### During Development
- [ ] Build components matching wireframe specs
- [ ] Implement responsive breakpoints
- [ ] Add focus states for accessibility
- [ ] Test on real devices (iOS, Android)
- [ ] Verify touch target sizes (mobile)

### Testing
- [ ] Visual regression testing
- [ ] Accessibility testing (WCAG AA)
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Keyboard navigation testing

---

*Last Updated: February 2026*
