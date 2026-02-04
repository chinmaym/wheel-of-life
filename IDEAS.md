# Wheel of Life — Feature Ideas

## 1. Trend Charts Over Time
Line graphs showing how each category score evolves across check-ins. This is the core reason to track repeatedly — without it the app is a one-time snapshot tool. Could show per-category lines, overall score trend, and configurable time ranges (last 5 check-ins, 3 months, all time).

## 2. Goal Setting
Let users set a target score per category (e.g. "I want Health at 8 by end of quarter"). Show progress toward goals on the home screen and in results. Could include milestone celebrations when a target is hit.

## 3. Notes Per Category
A short text field during check-in to capture *why* you rated something a certain way. When looking back at history, the number alone doesn't tell the story — "rated Career 4 because of reorg uncertainty" is far more useful than just "4". Could be optional and collapsible to keep the check-in flow fast.

## 4. Reminders / Check-in Cadence
Periodic push notifications prompting a new check-in (weekly, biweekly, monthly — user configurable). The app's value depends entirely on consistent usage. Could also show a "days since last check-in" nudge on the home screen. Leverage the existing PWA/service worker setup for notifications.

## 5. Comparison View
Side-by-side comparison of any two check-ins. Overlay two radar charts to visually see what changed. Useful for "where was I 3 months ago vs now" reflection. Could also highlight biggest improvements and biggest drops.

## 6. Weekly/Monthly Summary
A digest view that aggregates multiple check-ins into a period summary. Show averages, variance, and patterns — "Your Health has improved 1.5 points over 3 months" or "Finances is consistently your lowest area". Could be a dedicated page or a periodic notification.

## 7. Data Export & Import
CSV or JSON export so users own their data. Import to restore from backup or migrate devices. This is especially important since the app currently relies on localStorage which is fragile — clearing browser data loses everything.

## 8. Cloud Sync
Optional account/auth with cloud backup so data persists across devices and browser clears. Could start simple (Google sign-in + Firestore) or use a lightweight approach (shareable encrypted JSON link). Pairs well with the export/import feature as a stepping stone.
