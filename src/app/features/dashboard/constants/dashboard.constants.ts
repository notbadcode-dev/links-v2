export const DASHBOARD_CONSTANTS = {
  CATEGORIES: {
    DEVELOPMENT: {
      ID: 1,
      LABEL: 'Development',
      CHILDREN: {
        ANGULAR: { ID: 2, LABEL: 'Angular' },
        TYPESCRIPT: { ID: 3, LABEL: 'TypeScript' },
      },
    },
    DESIGN: {
      ID: 4,
      LABEL: 'Design',
      CHILDREN: {
        RECIPES: { ID: 31, LABEL: 'Recipes' },
        TRAVEL: { ID: 32, LABEL: 'Travel' },
      },
    },
  },
  LOGS: {
    CATEGORY_SELECTED: 'Category selected:',
  },
} as const;
