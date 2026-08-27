# CodeDaddy — Manila Modernist

This is the implemented visual language for CodeDaddy. It supersedes the former dark-neon system and the historical prompts in `STITCH_PROMPTS.md`.

Source: Google Stitch project `3358311034845693005`. Original screenshots, generated HTML, and both Stitch design-system documents are preserved under `design/stitch/codedaddy-learning-platform/`.

## Direction

**Infrastructural clarity.** CodeDaddy should feel like a trustworthy modern learning tool, not a toy, casino, or generic SaaS dashboard. The visual language takes a restrained cue from useful Philippine urban signage: direct labels, strong hierarchy, crisp dividers, and practical color.

- Minimal and modern
- Philippines-first without caricature
- Calm enough for long coding sessions
- Rewarding through visible progress, not ornamental effects
- Tool-like 4px corners and edge-to-edge workspace panes
- Tonal layering and outlines instead of blur, glass, or glow

## Light tokens

| Role | Value |
|---|---|
| Canvas | `#f7fafc` |
| Panel | `#ffffff` |
| Raised surface | `#f1f4f6` |
| Divider | `#c4c5d5` |
| Primary text | `#181c1e` |
| Secondary text | `#444653` |
| Deep Manila primary | `#0038a8` |
| Sampaguita teal | `#006a63` |
| Error | `#ba1a1a` |
| Calamansi warning | `#7a5b00` |

## Adaptive night tokens

Applied through `prefers-color-scheme: dark`.

| Role | Value |
|---|---|
| Canvas | `#0a0f1d` |
| Panel | `#0f172a` |
| Raised surface | `#1e293b` |
| Divider | `#334155` |
| Primary text | `#f8fafc` |
| Secondary text | `#94a3b8` |
| Primary action | `#b6c4ff` |
| Success | `#84d5cc` |
| Error | `#ffb4ab` |
| Warning | `#f6bf22` |

## Type

- UI and display: Inter
- Code, counters, file names, and utility labels: JetBrains Mono
- Body base: 16px / 24px
- Beginner instructions: 16–20px with comfortable line height
- Utility labels: 10–12px, uppercase only for short navigation or status labels

## Layout

- 4px base unit; normal rhythm follows 8px multiples
- Desktop page margin: 32px
- Mobile page margin: 16px
- Minimum touch target: 44px
- Workspace panes use 1–2px dividers and square outside edges
- Mobile remains a responsive browser interface. It never imitates a native app

## Components

- Primary buttons: filled Deep Manila in light mode, light indigo in night mode
- Inputs: 1px divider border, 2px primary focus border, no glow
- Pass/fail/warning/lock: icon plus written state every time
- Progress: horizontal linear bars
- Cards: low-contrast outlines with no default shadow
- Temporary overlays: at most a 2px hard shadow; never backdrop blur
- Header tags: compact high-contrast utility labels used sparingly

## Workspace

The learning workspace is the flagship surface:

1. Project and task guidance
2. Real textarea-based code editor
3. Sandboxed live preview or console
4. Persistent run/check status bar

The editor, preview, and checks remain visible and usable after a failed or passed run. Rewards never cover learner code. Iframe sandbox values, atomic progress, and learner-code preservation are architecture rules, not design variables.

## Motion and accessibility

- Animate only `transform` and `opacity`
- Reduced motion keeps the information and collapses celebration to a crossfade
- No canvas, WebGL, filter animation, backdrop blur, or heavy particle effects
- WCAG 2.2 AA contrast target
- Visible keyboard focus
- Editor remains a real textarea
- Status never relies on color alone
