---
name: Manila Modernist Night
colors:
  surface: '#0f172a'
  surface-dim: '#0a0f1d'
  surface-bright: '#1e293b'
  surface-container-lowest: '#020617'
  surface-container-low: '#0f172a'
  surface-container: '#1e293b'
  surface-container-high: '#334155'
  surface-container-highest: '#475569'
  on-surface: '#f8fafc'
  on-surface-variant: '#94a3b8'
  inverse-surface: '#f1f4f6'
  inverse-on-surface: '#181c1e'
  outline: '#475569'
  outline-variant: '#334155'
  surface-tint: '#b6c4ff'
  primary: '#b6c4ff'
  on-primary: '#062979'
  primary-container: '#002576'
  on-primary-container: '#7991e5'
  inverse-primary: '#415aaa'
  secondary: '#84d5cc'
  on-secondary: '#003733'
  secondary-container: '#006861'
  on-secondary-container: '#92e3da'
  tertiary: '#ffb5a1'
  on-tertiary: '#5e1603'
  tertiary-container: '#5a1301'
  on-tertiary-container: '#e0775b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b6c4ff'
  on-primary-fixed: '#00164f'
  on-primary-fixed-variant: '#274191'
  secondary-fixed: '#a0f1e8'
  secondary-fixed-dim: '#84d5cc'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#00504a'
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#ffb5a1'
  on-tertiary-fixed: '#3b0800'
  on-tertiary-fixed-variant: '#7d2c16'
  background: '#121318'
  on-background: '#e3e1e9'
  surface-variant: '#34343a'
  primary-dark: '#b6c4ff'
  on-primary-dark: '#002576'
  secondary-dark: '#79f7ea'
  on-secondary-dark: '#003733'
  error-dark: '#ffb4ab'
  on-error-dark: '#690005'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
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

The design system evolves into "Manila Modernist Night," a sophisticated extension that adapts the "Infrastructural Clarity" philosophy for low-light environments. Drawing inspiration from the deep indigo hour of Manila’s skyline and the high-contrast legibility of illuminated terminal interfaces, the dark mode prioritizes focus and visual comfort for long-duration coding sessions.

The style remains **Minimalist / Modern**, utilizing deep navy and charcoal surfaces to create a tiered environment of "Modernist Industry." It avoids pure black (#000000) to prevent harsh contrast and visual vibration, instead opting for a "Deep Manila" foundation. The emotional response is one of serious technical purpose, precision, and reliable utility—transforming the workspace into a professional cockpit for the modern developer.

## Colors

The dark mode palette utilizes deep navy (`#0f172a`) as its primary foundation, maintaining the CodeDaddy brand’s blue-centric identity while ensuring reduced eye strain.

- **Primary (Deep Manila Dark):** In dark mode, the primary color shifts to a luminous periwinkle (`#b6c4ff`) for core actions to maintain AA accessibility against dark backgrounds, while the original Deep Manila is used for containers.
- **Secondary (Neon Sampaguita):** A more vibrant teal variant is used for success states and progress indicators, ensuring they "pop" against the charcoal surfaces.
- **Surface Tiering:** Depth is conveyed through a progression from deepest navy (`lowest`) to Slate-toned charcoals (`highest`), effectively replacing shadows with tonal shifts.
- **Semantic Contrast:** Error and warning states use desaturated, high-luma tints (light red-pink and soft gold) to ensure information is critical but not visually overwhelming.

## Typography

In dark mode, typography weights are preserved, but anti-aliasing is critical. **Inter** remains the primary UI font, utilizing `on-surface` (`#f8fafc`) for maximum readability. 

- **Hierarchy:** Use `on-surface-variant` (muted slate) for secondary information like metadata or non-active labels to maintain a clear visual hierarchy.
- **The Code Experience:** **JetBrains Mono** text in the editor should utilize a specialized syntax theme that complements the Deep Manila background—preferring soft pastels (cyan, lime, and peach) over harsh neon primaries.
- **Accessibility:** Avoid using weights below 400 for light text on dark backgrounds to prevent "ink bleed" or legibility loss on lower-resolution screens.

## Layout & Spacing

The layout philosophy remains a **Fluid Grid** with an emphasis on pane separation. In dark mode, the 2px "Stone" dividers from light mode are replaced with `outline-variant` (`#334155`), creating a subtle but clear "blueprint" effect.

- **Workspace Logic:** The IDE layout uses a fixed-width instruction pane (30%) and a fluid editor/terminal pane (70%).
- **Visual Breathing Room:** While the layout is dense and technical, use `gutter` and `margin-desktop` tokens to ensure content doesn't feel cramped against the dark viewport edges.
- **Resizer Interaction:** The resizer handle becomes a vibrant `primary-dark` line on hover, serving as a bright interactive "wire" in the dark environment.

## Elevation & Depth

Elevation in this design system is strictly **Tonal Layering**. Dark mode relies on the "surface-container" scale rather than shadows to define hierarchy.

- **Base Layer:** The background uses the `surface-dim` or `surface` token.
- **Interactive Layers:** Cards and panes use `surface-container` with a 1px `outline` border. This "etched" look replaces the soft shadows used in more consumer-oriented systems.
- **Overlay Level:** Modals and dropdowns use the `surface-container-high` or `highest` tokens. To compensate for the lack of shadows, these elements use a 1px border in `outline` to ensure separation from the layers beneath.
- **State Feedback:** Active states are indicated by `primary-dark` or `secondary-dark` outlines or low-opacity fills (10-15%) rather than physical lifting.

## Shapes

The shape language is **Soft (0.25rem)**, maintaining a tool-like, industrial aesthetic.

- **Functional Elements:** Buttons, inputs, and code blocks use the base 4px radius.
- **Systemic Cleanliness:** Workspace panes maintain sharp (0px) corners where they meet the screen edge, emphasizing the structural "Infrastructural Clarity" of the design.
- **Contextual Softness:** Status chips and badges use `rounded-lg` (8px) to soften the UI where human-centric feedback is provided (e.g., "Success" or "Locked").

## Components

- **Buttons:** 
    - **Primary:** Uses `primary-dark` (`#b6c4ff`) background with `on-primary-dark` (`#002576`) text.
    - **Secondary/Ghost:** Uses `outline` borders with `primary-dark` text. 
- **Input Fields:** Dark surfaces use `surface-container-low` with a 1px `outline-variant` border. On focus, the border transitions to 2px `primary-dark`.
- **Status Chips:** 
    - **Success:** `secondary-dark` text on a 15% opacity teal background.
    - **Error:** `error-dark` text on a 15% opacity red background.
- **Multi-pane Resizer:** A 2px vertical divider that shifts from `outline-variant` to `primary-dark` on interaction.
- **Navigation:** Top and side navigation use `surface-container-lowest` to provide a sturdy, high-contrast frame for the more colorful workspace content.
- **Header Tags:** High-contrast labels (e.g., `on-primary-dark` text on `primary-dark` background) used for section identification, referencing the utility of Filipino shop signage.
