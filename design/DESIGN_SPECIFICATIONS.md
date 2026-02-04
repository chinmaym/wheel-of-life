# Wheel of Life - Design Specifications

## Overview
This document outlines the visual design, user experience, and interaction patterns for the Wheel of Life app.

---

## 1. Color Palette

### Primary Colors
- **Primary Purple**: `#667eea` - Main brand color for buttons, links, highlights
- **Secondary Purple**: `#764ba2` - Gradient accent, used with primary

### Status Colors (for wheel chart scoring)
- **High Satisfaction (8-10)**: `#10b981` (Green)
- **Medium Satisfaction (5-7)**: `#f59e0b` (Amber/Yellow)
- **Low Satisfaction (1-4)**: `#ef4444` (Red)

### Neutral Colors
- **Dark Text**: `#1f2937` (almost black)
- **Medium Text**: `#6b7280` (gray)
- **Light Text**: `#9ca3af` (light gray)
- **Light Background**: `#f9fafb`
- **Card Background**: `#ffffff`
- **Border Color**: `#e5e7eb`

### Status Backgrounds
- **Success**: `rgba(16, 185, 129, 0.1)` (light green)
- **Warning**: `rgba(245, 158, 11, 0.1)` (light amber)
- **Danger**: `rgba(239, 68, 68, 0.1)` (light red)

---

## 2. Typography

### Font Family
```
System stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
Oxygen, Ubuntu, Cantarell, sans-serif
```
(Uses device's native font for best performance)

### Font Sizes & Weights

| Element | Size | Weight | Line Height |
|---------|------|--------|------------|
| Page Title | 32px | 700 | 1.2 |
| Section Header | 24px | 600 | 1.3 |
| Card Title | 18px | 600 | 1.4 |
| Body Text | 16px | 400 | 1.6 |
| Small Text | 14px | 400 | 1.5 |
| Tiny Text | 12px | 500 | 1.4 |
| Button | 14px | 600 | 1 |

---

## 3. Component Specifications

### Buttons

#### Primary Button
```
Background: Linear gradient #667eea → #764ba2
Text Color: White
Padding: 12px 20px
Border Radius: 8px
Font Weight: 600
Font Size: 14px
Hover Effect: translateY(-2px), shadow increase
Active: Slight opacity reduction
Disabled: Opacity 0.5
```

#### Secondary Button
```
Background: #f3f4f6
Text Color: #1f2937
Padding: 12px 20px
Border Radius: 8px
Font Weight: 600
Font Size: 14px
Hover Effect: Background → #e5e7eb
```

#### Scale/Rating Buttons (1-10)
```
Size: 36px circle
Border: 2px solid #e5e7eb
Background: White
Border Radius: 50%
Default State: Light gray border
Hover: Border → #667eea, text → #667eea
Selected: Background #667eea, text white, border #667eea
Transition: All 0.2s ease
```

### Input Fields
```
Background: White
Border: 1px solid #e5e7eb
Border Radius: 6px
Padding: 10px 12px
Font Size: 14px
Focus: Border → #667eea, shadow (0 0 0 3px rgba(102, 126, 234, 0.1))
Transition: All 0.2s ease
```

### Cards
```
Background: White
Border Radius: 8px
Box Shadow: 0 2px 8px rgba(0, 0, 0, 0.1)
Padding: 16px
Margin: 12px 0
Hover: Slight shadow increase (optional)
```

### Chart Container
```
Background: #fafafa
Border Radius: 8px
Padding: 20px
Min Height: 350px (desktop), 300px (mobile)
Aspect Ratio: Preferably 1:1 for wheel chart
Border: 1px solid #e5e7eb (optional)
```

---

## 4. Layout & Spacing

### Grid System
- **Base unit**: 4px
- **Common spacings**: 8px, 12px, 16px, 20px, 24px, 32px, 40px

### Desktop Layout
```
Container max-width: 1200px
Padding: 20px (sides)
Column gap: 20px
Row gap: 20px
```

### Mobile Layout
```
Container width: 100%
Padding: 16px (sides)
Single column
Gap: 16px
```

### Responsive Breakpoints
```
Mobile: < 640px (single column)
Tablet: 640px - 1024px (2 columns)
Desktop: > 1024px (flexible grid)
```

---

## 5. User Interaction Flows

### Flow 1: First Time User (Onboarding)

```
Open App
    ↓
[Optional] Show intro explaining "Wheel of Life"
    ↓
Option: "Start Check-in Now" or "Learn More"
    ↓
[If Check-in] Go to Flow 2
[If Learn More] Show explanation screen
```

### Flow 2: Complete a Check-in

```
Click "New Check-in"
    ↓
Show Check-in Form
    ↓
User rates Health (1-10)
    ↓
Scrolls to Career, rates it
    ↓
... (continues for all 8 categories)
    ↓
Review: Shows summary of all ratings
    ↓
Click "Submit"
    ↓
Display Wheel Chart with results
    ↓
Show insights ("Family needs attention!", etc.)
    ↓
Offer: "View History" or "Do Another Check-in"
```

### Flow 3: View History

```
Click "View History"
    ↓
Show list of past check-ins (newest first)
    ↓
Each item shows: Date, Time, Overall Score
    ↓
[Optional] Tap item to see detailed breakdown
    ↓
[Optional] Show trend line chart
    ↓
Back button returns to home
```

---

## 6. Screen Details

### Screen 1: Home/Dashboard

**Layout:**
```
┌─────────────────────────┐
│  Wheel of Life (title)  │
│  Last check-in: 2h ago  │ ← Subtitle
├─────────────────────────┤
│                         │
│   [Wheel Chart]         │
│   (Radar/Polar chart)   │
│                         │
├─────────────────────────┤
│ [+ New Check-in] [Hist] │ ← Action buttons
│                         │
│ Insights (optional):    │
│ 🔴 Family: 3/10         │ ← Highlight low areas
│ 🟡 Finance: 5/10        │
└─────────────────────────┘
```

**Key Elements:**
- Prominent, visual wheel chart
- Clear CTA buttons
- Summary insights for lowest-scoring areas
- Last check-in timestamp

### Screen 2: Check-in Form

**Layout:**
```
┌─────────────────────────┐
│   Life Check-in         │
│   Rate your satisfaction│ ← Instructions
├─────────────────────────┤
│ 🏥 Health              │
│ [1] [2] [3]... [10]    │ ← Scale buttons
├─────────────────────────┤
│ 💼 Career              │
│ [1] [2] [3]... [10]    │
├─────────────────────────┤
│ ... (6 more categories) │
├─────────────────────────┤
│  [Submit Check-in]      │
└─────────────────────────┘
```

**Category Icons & Order:**
1. 🏥 Health
2. 💼 Career
3. 💰 Finances
4. 💑 Relationships
5. 👨‍👩‍👧 Family
6. 📚 Personal Growth
7. 🎉 Fun/Recreation
8. 🙏 Spirituality

**Behavior:**
- Scroll vertical on mobile, may scroll on desktop if space limited
- One category per card/row
- Visual feedback when number selected (highlight in purple)
- All selections saved in local state until submit
- Submit button fixed at bottom

### Screen 3: History/Trends

**Layout:**
```
┌─────────────────────────┐
│  Check-in History       │
├─────────────────────────┤
│ Today (2:30 PM)         │
│ Overall Score: 7.2/10   │
├─────────────────────────┤
│ Yesterday (6:45 PM)     │
│ Overall Score: 6.8/10   │
├─────────────────────────┤
│ ... (more items)        │
└─────────────────────────┘
```

**Optional Enhancements:**
- Expand item to see category breakdown
- Line chart showing score trends over time
- Filter by time period (week, month, all-time)
- Export data as CSV

---

## 7. Mobile-Specific Considerations

### Touch Targets
- Minimum 44px height for buttons/tappable elements
- 8px padding between touch targets
- Large numbers on scale buttons for easy tapping

### Responsive Image
- Wheel chart responsively scales to fit screen
- Use `max-width: 100%` to prevent overflow
- Maintain aspect ratio

### Viewport
```
<meta name="viewport"
      content="width=device-width, initial-scale=1.0">
```

### Safe Area (for notch/dynamic island)
```
padding: max(16px, env(safe-area-inset-left));
```

---

## 8. Animations & Transitions

### Fade In
```
Duration: 200ms
Easing: ease-in-out
Used for: Page transitions, card reveals
```

### Hover Effects
```
Duration: 200ms
Effects: Slight elevation (translateY -2px), shadow increase
Used for: Buttons, cards, interactive elements
```

### Button Press
```
Duration: 100ms
Effect: Scale to 0.98, reduce opacity slightly
Used for: Click feedback
```

### Chart Animation
```
Duration: 800ms
Effect: Animate chart elements from 0 to final value
Used for: Wheel chart on first load
```

### No Animation
- Use `prefers-reduced-motion: reduce` media query for accessibility
- Respect user's OS accessibility preferences

---

## 9. Accessibility

### Color Contrast
- All text meets WCAG AA standards (4.5:1 minimum)
- Chart colors chosen to be colorblind-friendly
- Don't rely solely on color for status indication

### Semantic HTML
- Use proper heading hierarchy (h1, h2, h3)
- Use labels for form inputs
- Use button elements for interactive actions

### Focus States
```
Focus Ring: 2px solid #667eea
Offset: 2px from element
Visible on all interactive elements
```

### Alt Text
- All images have descriptive alt text
- Icons have accompanying text labels

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Arrow keys in numeric scale

---

## 10. Dark Mode (Future Enhancement)

**When implementing dark mode:**

| Light Mode | Dark Mode |
|-----------|-----------|
| #ffffff | #1f2937 |
| #f9fafb | #111827 |
| #1f2937 | #f3f4f6 |
| #6b7280 | #d1d5db |
| #667eea (primary) | #818cf8 (lighter for contrast) |

---

## Design Assets to Create

- [ ] Color palette file/swatches
- [ ] Component library in Figma/Sketch
- [ ] High-fidelity mockups (all 3 screens)
- [ ] Interactive prototype
- [ ] Brand guidelines document
- [ ] Icon set (or use emoji as placeholder)

---

## Next Steps

1. **Create Figma designs** based on these specifications
2. **Get stakeholder feedback** on visual direction
3. **Create component library** (React Storybook)
4. **Implement CSS/Tailwind** styles
5. **Add animations** and micro-interactions
6. **Test accessibility** with screen readers and keyboard navigation

---

*Last Updated: February 2026*
