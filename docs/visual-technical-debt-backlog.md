# Visual Technical Debt Backlog

## Objective

Track and close recurring visual inconsistencies across app and `libs/ui`.

## Backlog

1. Focus and outline consistency

- Standardize focus ring thickness, color contrast, and offset for all interactive controls.
- Ensure keyboard focus is visible in both light and dark themes.

2. Transition consistency

- Define standard motion durations/curves for hover, press, dropdown open/close, and toast appearance.
- Replace ad-hoc transition values with tokenized motion values.

3. Interactive states parity

- Audit hover/active/disabled styles for buttons, links, inputs, checkboxes, dropdown options.
- Enforce semantic state mapping (success/error/warning/info) for icon + text + border.

4. Form spacing rhythm

- Normalize vertical rhythm between label, input, hint, error, actions.
- Verify consistency across login/signup/forgot and shared form wrappers.

5. Storybook visual baselines

- Add visual regression snapshots for critical wrappers/components once icon registry is fully available in Storybook.

## Definition of done for each item

- Tokenized or documented style decision.
- Light/dark behavior verified.
- Story updated or added.
- No lint warnings introduced.
