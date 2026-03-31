# Nanoot Design & Layout Guide

This guide defines the standards for maintaining a consistent UI across the Nanoot application, particularly focusing on mobile responsiveness and dynamic layout management.

## 1. Global Navigation Bar (GNB) Spacing

The Nanoot app uses a fixed bottom navigation bar (GNB) on major pages. Any elements fixed to the bottom of the screen (like FABs or Action Bars) must account for this navigation bar to avoid being hidden.

### CSS Variables
We use CSS variables in `src/app/globals.css` to manage these offsets dynamically:

- `--gnb-height`: The raw height of the navigation bar (`64px`).
- `--gnb-total-height`: The GNB height plus the device's safe area inset (for notches and home bars on iOS/Android). 
  - `calc(var(--gnb-height) + env(safe-area-inset-bottom, 0px))`
- `--fab-bottom-offset`: The standard positioning for Floating Action Buttons.
  - `calc(var(--gnb-total-height) + 16px)`

### Usage Examples

#### Positioning a Floating Action Button (FAB)
Always use `var(--fab-bottom-offset)` for the `bottom` property:

```tsx
<Link 
  href="/..." 
  style={{ bottom: 'var(--fab-bottom-offset)' }}
  className="fixed right-4 ..."
>
  ...
</Link>
```

#### Positioning a Bottom Action Bar (CTA)
On pages where the GNB is visible, ensure your bottom bar sits above it:

```tsx
<div 
  style={{ bottom: 'var(--gnb-total-height)' }}
  className="fixed left-0 right-0 ..."
>
  <Button>Action</Button>
</div>
```

---

## 2. Bottom Sheets

Modals that require user input or primary actions should be implemented as **Bottom Sheets** instead of centered modals for a better mobile experience.

### Specifications
- **Position**: Anchored to the bottom of the viewport.
- **Visuals**: 
  - `rounded-t-[32px]` for the top corners.
  - A small top handle (`w-12 h-1.5 bg-gray-200 rounded-full`) for visual affordance.
  - `pb-safe` (or `env(safe-area-inset-bottom)`) inside the sheet to prevent content from hitting the home bar.
- **Animation**: `animate-in slide-in-from-bottom duration-300 ease-out`.

---

## 3. Safe Area Insets

Always account for `env(safe-area-inset-bottom)` to ensure buttons and interactions are accessible on modern edge-to-edge screens.

```css
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
```

## 4. Layout Consistency

- **Maximum Width**: The main container is capped at `440px` and centered on desktop.
- **Container Class**: Use the standard wrapper defined in `RootLayout`.
- **Backgrounds**: Use `#F3F4F6` (gray-50) for background and `white` for cards/containers.
