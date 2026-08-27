---
name: Manila Modernist
colors:
  surface: '#f7fafc'
  surface-dim: '#d7dadd'
  surface-bright: '#f7fafc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f6'
  surface-container: '#ebeef0'
  surface-container-high: '#e5e9eb'
  surface-container-highest: '#e0e3e5'
  on-surface: '#181c1e'
  on-surface-variant: '#444653'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eef1f3'
  outline: '#747685'
  outline-variant: '#c4c5d5'
  surface-tint: '#3056c4'
  primary: '#002576'
  on-primary: '#ffffff'
  primary-container: '#0038a8'
  on-primary-container: '#96adff'
  inverse-primary: '#b6c4ff'
  secondary: '#006a63'
  on-secondary: '#ffffff'
  secondary-container: '#79f7ea'
  on-secondary-container: '#007169'
  tertiary: '#3b2b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#564000'
  on-tertiary-container: '#dca900'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164f'
  on-primary-fixed-variant: '#093cab'
  secondary-fixed: '#79f7ea'
  secondary-fixed-dim: '#59dace'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#ffdf99'
  tertiary-fixed-dim: '#f6bf22'
  on-tertiary-fixed: '#251a00'
  on-tertiary-fixed-variant: '#5a4300'
  background: '#f7fafc'
  on-background: '#181c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-code:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  touch-target: 44px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  pane-gap: 2px
---

## Brand & Style

The design system is built on the philosophy of "Infrastructural Clarity"—drawing inspiration from the utilitarian yet vibrant signage of Philippine urban landscapes. It balances the serious nature of technical education with the approachable warmth of community learning.

The style is **Minimalist / Modern**, characterized by structured layouts, intentional whitespace, and a reduction of decorative effects. It avoids "gamified" visual clutter (heavy glows or 3D extrusions) in favor of crisp edges and logical hierarchy. Visual interest is generated through high-quality typography and a palette that evokes a "professional-tropical" atmosphere, subtly nodding to the resilience and resourcefulness of local craft without becoming a caricature.

**Target Audience:** Filipino beginners and early-career developers looking for a structured, credible environment that feels like a modern workplace rather than a toy.

## Colors

This design system utilizes a palette grounded in national identity but refined for software interfaces.

- **Primary (Deep Manila):** A rich, authoritative blue used for key actions, primary navigation, and headers. It provides a stable "anchor" for the UI.
- **Secondary (Sampaguita Teal):** An energetic, fresh green-blue reserved for positive feedback, progress bars, and "Success" states.
- **Tertiary (Calamansi Yellow):** A high-visibility yellow used sparingly for warnings, pending states, and highlighting specific milestones.
- **Neutral (Stone):** A range of greys with slight warmth to prevent a "cold" digital feel. Use high-contrast neutrals for text and low-contrast tints for workspace dividers and background layering.

Maintain a minimum AA contrast ratio for all text elements. Backgrounds should remain clean (Stone-50 or White) to ensure the code editor remains the focal point.

## Typography

The typography system prioritizes legibility in high-density information environments (like code editors).

1.  **UI Typeface (Inter):** Used for all navigation, instructions, and labels. Its tall x-height ensures clarity even at small sizes. Use semi-bold weights for "Jeepney Sign" inspired emphasis without the distortion.
2.  **Monospace Typeface (JetBrains Mono):** Used exclusively for code blocks, terminal outputs, and inline technical terms. It features distinct character shapes to prevent confusion between `0/O` and `l/1`.

**Scale:** Headings follow a tight, geometric scale. Body text is kept at a comfortable 16px base for long-form reading of documentation and instructions.

## Layout & Spacing

The layout follows a **Fluid Grid** model with high-precision spacing. 

- **Workspace Layout:** For the IDE environment, use a multi-pane structure separated by 2px "Stone" dividers. This creates a clear boundary between the instruction pane, the code editor, and the preview/terminal.
- **Touch Targets:** All interactive elements (buttons, nav items, chips) must adhere to a minimum 44px height/width to ensure accessibility on mobile and ease of use on desktop.
- **Rhythm:** Use an 8px-based spacing system for component margins. Smaller 4px increments are reserved for internal component padding (e.g., icon-to-text spacing).
- **Responsive Behavior:** On mobile, panes stack vertically. On desktop, the instruction pane is pinned to the left (30% width) with the editor and terminal sharing the remaining 70% in a horizontal split.

## Elevation & Depth

This design system rejects heavy shadows in favor of **Tonal Layering and Low-Contrast Outlines**.

- **Level 0 (Background):** `Stone-50` or `#FFFFFF`. The base canvas.
- **Level 1 (Panes/Cards):** Defined by a 1px solid border in `Stone-200`. No shadow. This mimics the clean, paneled look of industrial signage.
- **Level 2 (Dropdowns/Modals):** A subtle, sharp "hard shadow" (2px offset, 0 blur) in a light neutral tone can be used to indicate temporary overlays, inspired by layered vinyl stickers.
- **State Indicators:** Use color-filled backgrounds (Primary/Secondary/Tertiary at 10% opacity) rather than elevation to show active or focused states.

## Shapes

The shape language is **Soft (0.25rem)**. This provides a professional, "tool-like" feel that is more approachable than sharp corners but more serious than highly rounded "bubbly" interfaces.

- **Standard Elements:** Inputs, Buttons, and Code blocks use the base `rounded` (4px).
- **Surface Containers:** Large workspace panes use `0` (Sharp) edges when they touch the viewport edges to maximize screen real estate and maintain a structural feel.
- **Status Chips:** Use `rounded-lg` (8px) to differentiate them from functional buttons.

## Components

- **Buttons:** Primary buttons use 'Deep Manila' with white text. Minimum height 44px. States (Hover/Active) are shown via subtle darken/lighten shifts rather than shadows.
- **Status Indicators (Pass/Fail/Lock):**
    - **Pass:** Sampaguita Teal icon + text.
    - **Fail:** A muted Red-Orange (derived from neutral/warm tones) + text.
    - **Lock:** Stone-400 icon; text is slightly de-emphasized.
- **XP & Progress:** Use linear progress bars with 'Sampaguita' fills. Avoid circular "rings" to keep the UI feeling like a professional dashboard. Ranks are displayed as high-contrast labels in Inter Semi-bold.
- **Multi-pane Workspace:** Includes a "Resizer" handle—a 2px vertical line that changes color to 'Deep Manila' on hover, providing clear feedback for layout customization.
- **Input Fields:** 1px `Stone-300` borders. On focus, the border thickens to 2px `Deep Manila`. No glow.
- **Sari-Sari Influence:** Use "Header Tags" for different sections of the code—small, high-contrast labels (e.g., white text on Deep Manila) that resemble the hand-painted labels found in local neighborhood stores.
