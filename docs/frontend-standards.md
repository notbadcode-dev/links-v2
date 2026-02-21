# Frontend Standards

## Change Detection in Tests (`prefer-on-push`)

### Convention

- Production components must keep `ChangeDetectionStrategy.OnPush`.
- Test-only host components declared inside `*.spec.ts` are exempt.

### Rationale

- Test hosts are scaffolding, not runtime UI artifacts.
- Enforcing `OnPush` in test hosts adds noise and setup friction with little production value.

### Implementation in this repo

- `@angular-eslint/prefer-on-push-component-change-detection` stays enabled globally.
- It is disabled only for `**/*.spec.ts` in `eslint.config.mjs`.

## Design Tokens: When to Create a Token vs Local Style

### Create a token when

- The value appears in 3+ places or 2+ domains (`src/app` and `libs/ui`).
- The value is semantic (brand/success/error/info, surface/text hierarchy).
- The value must adapt to light/dark.
- The value affects responsive system behavior (breakpoints, layout spacing scales).

### Keep local style when

- It is one-off and purely decorative for a single component/story.
- It represents temporary experimental UI.
- It does not need semantic naming or theme switching.

### Naming rules

- Use semantic names first (`--ui-color-success-text`) over raw scale aliases.
- Use scale suffixes only when actually consumed as a scale (`-500`, `-600`, etc.).
- Avoid synonyms for the same intent (e.g., two tokens for the same border tone).

### Governance checks before adding token

- Search current tokens and reuse if equivalent exists.
- Validate at least one light and one dark sample.
- Add usage in at least one real component (not only stories) unless explicitly staged.
