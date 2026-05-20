---
name: Editorial Heritage
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#80543b'
  on-secondary: '#ffffff'
  secondary-container: '#fdc2a3'
  on-secondary-container: '#794d36'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1c19'
  on-tertiary-container: '#848480'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#f4ba9c'
  on-secondary-fixed: '#311302'
  on-secondary-fixed-variant: '#653d26'
  tertiary-fixed: '#e3e3de'
  tertiary-fixed-dim: '#c7c7c2'
  on-tertiary-fixed: '#1b1c19'
  on-tertiary-fixed-variant: '#464744'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-xl:
    fontFamily: Playfair Display
    fontSize: 120px
    fontWeight: '700'
    lineHeight: 110px
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '600'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: Work Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Work Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Work Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 24px
  stack-lg: 48px
  stack-xl: 80px
---

## Brand & Style

This design system establishes a high-end, editorial aesthetic for a modern family hair salon. It bridges the gap between a "high-fashion" boutique and a welcoming family establishment by using sophisticated, timeless visual cues. The brand personality is authoritative yet approachable, focusing on craftsmanship and "generations of style."

The visual style is **Minimalist / High-Contrast Editorial**. It leans heavily on massive, sophisticated typography, a rigid grid structure, and expansive whitespace. The transition from a monochromatic palette to one with a soft clay accent introduces a layer of warmth and human touch, moving the brand away from sterile gallery vibes toward a more inviting, premium service experience.

## Colors

The palette is rooted in an "Off-White and Charcoal" foundation to maintain the editorial strength seen in the reference imagery. 

- **Primary (Charcoal):** Used for primary text, heavy borders, and solid button states to ensure maximum legibility and authority.
- **Secondary (Soft Clay):** This warm, muted earth tone acts as the sophisticated accent. It is reserved for highlights, interactive states (hover), and decorative hairline strokes.
- **Background (Off-White):** A warm-tinted white that reduces eye strain and feels more "premium paper" than digital white.
- **Neutral:** A range of mid-tone grays used for secondary information and metadata, ensuring hierarchy is maintained without competing with the bold primary elements.

## Typography

Typography is the cornerstone of this design system. We use a high-contrast pairing: **Playfair Display** for a literary, luxury feel in headings, and **Work Sans** for a grounded, professional feel in functional text.

Display headings should be used with tight tracking to create the "magazine masthead" look seen in the references. Body text uses a generous line height to maintain readability against the high-contrast background. All labels and navigational elements should be set in uppercase Work Sans with increased letter spacing to provide a clean, architectural feel.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy on desktop, mimicking a printed broadsheet or editorial layout. 

- **Grid:** A 12-column grid system is used for desktop. Content should frequently span 6 or 12 columns for a "blocked" look.
- **Rhythm:** Vertical rhythm is aggressive. Large sections are separated by `stack-xl` to give the content room to breathe, while related items use `stack-md`.
- **Borders:** Use 1px or 2px charcoal borders to define sections, especially in navigation and footer areas, as seen in the reference images.
- **Mobile:** On mobile, the layout collapses to a single column with a 20px safe area. Display type should scale down significantly while maintaining its bold weight.

## Elevation & Depth

This system avoids shadows entirely to maintain a flat, modernist aesthetic. Depth is communicated through **Tonal Layers** and **Bold Borders**.

- **Stacking:** Elements feel "laid on top" of the off-white surface. 
- **Outlines:** High-contrast 1px charcoal borders define the boundaries of cards and input fields.
- **Interactions:** Depth is signaled by color fills. For example, a button may transition from a charcoal outline to a solid Clay fill on hover, creating a tactile "fill" effect rather than a physical lift.

## Shapes

The shape language is strictly **Sharp (0px)**. 

To maintain the editorial and architectural feel of the salon, all buttons, image containers, and input fields must have square corners. This reinforces the high-contrast, structured grid and ensures the UI feels like a curated gallery or a premium magazine.

## Components

### Buttons
- **Primary:** Solid Charcoal background with Off-White text. Rectangular, no radius.
- **Secondary:** Transparent background with 1px Soft Clay border and Soft Clay text. 
- **Action:** Solid Soft Clay background for high-priority calls to action (e.g., "Book Now").

### Cards & Gallery
Images should be treated as "Art Prints." No shadows, 0px radius. Use the 1px Charcoal border to wrap content groups if they contain text (like review cards).

### Input Fields
Minimalist underline or full box with 1px Charcoal border. Labels should use the `label-caps` typography style, positioned above the field. Focus state switches the border color to Soft Clay.

### Navigation
A thin, persistent top bar with a 1px Charcoal bottom border. Use the `label-caps` style for links. The active state is indicated by a Soft Clay underline.

### Chips/Tabs
Simple text-only tabs separated by a vertical pipe `|` or housed in sharp-edged boxes with 1px borders. Active states use a Soft Clay background fill.