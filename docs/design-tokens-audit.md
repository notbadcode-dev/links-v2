# Design Tokens Audit (Low-Priority Cleanup)

Snapshot source: `/Users/bgr/Proyectos/Angular/links-v2/libs/ui/src/styles/_design-tokens.scss`  
Usage scan scope: `src` + `libs/ui` excluding token declaration files.

## Findings

### Unused tokens (0 usages)

- `--ui-color-cta-active`
- `--ui-color-cta-hover`
- `--ui-font-size-md`
- `--ui-shadow-md`
- `--ui-size-control-md`
- `--ui-size-icon-sm`

### Very low usage (1 usage)

- `--ui-breakpoint-md`
- `--ui-color-active-muted`
- `--ui-color-button-primary-active`
- `--ui-color-button-primary-hover`
- `--ui-color-cta`
- `--ui-color-cta-contrast`
- `--ui-color-error-bg`
- `--ui-color-error-border`
- `--ui-color-error-text`
- `--ui-color-info-bg`
- `--ui-color-info-border`
- `--ui-color-info-text`
- `--ui-color-link-active`
- `--ui-color-link-hover`
- `--ui-color-link-visited`
- `--ui-color-primary-active`
- `--ui-color-primary-hover`
- `--ui-color-scheme`
- `--ui-color-success-bg`
- `--ui-color-success-border`
- `--ui-color-success-text`
- `--ui-color-warning-bg`
- `--ui-color-warning-border`
- `--ui-color-warning-text`
- `--ui-font-size-2xl`
- `--ui-font-size-xl`
- `--ui-line-height-base`
- `--ui-line-height-tight`
- `--ui-radius-lg`
- `--ui-size-content-sm`
- `--ui-size-notification-max`
- `--ui-size-notification-min`
- `--ui-size-sidebar`
- `--ui-space-7`
- `--ui-space-notification-offset`
- `--ui-space-page-top-lg`
- `--ui-space-page-top-md`
- `--ui-z-notification`

## Suggested simplification plan

1. Remove or merge the 0-usage tokens in the next cleanup PR.
2. For 1-usage tokens:
   - Keep if semantic and expected to scale (notification semantics, theme primitives).
   - Collapse into local style if they remain single-use after 2 sprints.
3. Run this audit again after each design-system batch.

## Guardrail

Do not remove semantic tokens tied to status states (`success|error|warning|info`) only because usage is currently low; those are part of the system contract.
