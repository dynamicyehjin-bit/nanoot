# Nanoot Design System

This document defines the complete design system for the Nanoot application.
It ensures visual consistency, scalability, and predictable UI behavior across all screens.

---

# 1. Color System

## Brand Colors

* **CTA**: `#C1EB3B`
  → Primary action button (main conversion actions)
* **CTA Hover**: `#A3CE2A`
* **Accent**: `#84CC16`
  → Progress states, highlights

## Text Colors

* **Primary**: `#111827` (gray-900)
  → Main content, labels
* **Secondary**: `#6B7280` (gray-500)
  → Descriptions, hints
* **Disabled**: `#9CA3AF` (gray-400)
  → Placeholder, inactive text

## Background Colors

* **App Background**: `#F3F4F6` (gray-100)
* **Surface / Card**: `#FFFFFF` (white)

## Border Colors

* **Default**: `border-gray-200`
* **Input**: `border-gray-300`

## Tailwind Config

```ts
colors: {
  cta: '#C1EB3B',
  'cta-hover': '#A3CE2A',
  accent: '#84CC16',
}
```

---

# 2. Button System

## Button Types

| Type    | Usage                      |
| ------- | -------------------------- |
| CTA     | Page’s primary action      |
| Primary | General actions            |
| Ghost   | Secondary / cancel actions |

---

## CTA Button (⭐ Core Rule)

* background: `bg-cta`
* text: `text-gray-900`
* hover: `hover:bg-cta-hover`
* size: `w-full h-14 px-8`
* font: `text-[16px] font-bold`
* radius: `rounded-xl`
* position: `fixed bottom-0`

### Rules

* Only **one CTA per page**
* Must represent **the main action**
* Must be **fixed at the bottom**
* Must use **BottomCTA component**

---

## Primary Button

* background: `bg-gray-900`
* text: `text-gray-50`
* hover: `hover:bg-gray-900/90`
* size: `h-12 px-4`
* font: `text-sm font-semibold`
* radius: `rounded-xl`

---

## Ghost Button

* background: `transparent`
* text: `text-gray-500`
* hover: `bg-gray-100`

---

## Disabled State (All Buttons)

* `disabled:opacity-50`
* `disabled:pointer-events-none`

---

# 3. Input System

* height: `h-12`
* padding: `px-4`
* radius: `rounded-xl`
* border: `border border-gray-300`
* background: `bg-white`

## Focus State

* `focus-visible:ring-2`
* `focus-visible:ring-gray-900`

---

# 4. Card System

* background: `bg-white`
* border: `border border-gray-200`
* radius: `rounded-xl`

---

# 5. Layout System

## Mobile Frame

* `max-w-[440px]`
* centered layout on desktop

## Background Rules

* App background: `gray-100`
* Content: `white`

---

## Bottom CTA Spacing (⚠️ 중요)

When using a fixed CTA:

* Apply: `pb-[80px]` to page content
* Prevents content from being hidden behind CTA

---

# 6. Component Rules

## BottomCTA Component (Required)

All bottom-fixed CTA buttons must use this component.

```tsx
<BottomCTA
  label="회원가입 완료"
  disabled={!nickname}
  onClick={handleSubmit}
  isLoading={isLoading}
/>
```

### Rules

* Direct button implementation is **not allowed**
* Ensures consistency across pages

---

## Button Selection Rules

* **CTA**
  → Page’s single most important action
  (e.g., 회원가입 완료, 인증하기, 참여하기)

* **Primary**
  → General actions inside lists or sections

* **Ghost**
  → Cancel, back, secondary actions

---

# 7. Safe Area & GNB System

## GNB Variables

Defined in `globals.css`:

```css
--gnb-height: 64px;
--gnb-total-height: calc(var(--gnb-height) + env(safe-area-inset-bottom, 0px));
--fab-bottom-offset: calc(var(--gnb-total-height) + 16px);
```

---

## FAB Positioning

```tsx
style={{ bottom: 'var(--fab-bottom-offset)' }}
```

---

## Bottom Bar Positioning

```tsx
style={{ bottom: 'var(--gnb-total-height)' }}
```

---

## Safe Area Utility

```css
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
```

---

# 8. Bottom Sheet Guidelines

## Structure

* anchored to bottom
* `rounded-t-[32px]`
* includes drag handle

## Styles

* handle: `w-12 h-1.5 bg-gray-200 rounded-full`
* padding: `pb-safe`

## Animation

* `animate-in slide-in-from-bottom duration-300 ease-out`

---

# 9. Migration Checklist (Pre-Launch)

The following pages must be updated to follow CTA rules:

* `/auth/setup-profile`
* `/building/setup`
* `/building/setup/code`
* `/[buildingId]/co-buying/[id]/join`
* `/my/co-buying/[id]`
* `/signup`

## Required Fixes

* Replace custom buttons → **BottomCTA**
* Ensure only one CTA per page
* Apply `pb-[80px]`
* Align button styles with system

---

# 10. Core Principles (Summary)

1. **Single Source of Truth**

   * No arbitrary colors or styles

2. **One Primary Action**

   * Each page has one clear CTA

3. **Component-Driven UI**

   * Reuse, do not reinvent

4. **Mobile-First Layout**

   * Always consider safe areas and fixed elements

---

This design system is mandatory for all new and existing UI implementations.
