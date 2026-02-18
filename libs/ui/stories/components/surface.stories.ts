import type { Meta, StoryObj } from '@storybook/angular';

import { ESpacing, ESurfaceVariant, SurfaceComponent } from '@libs/ui';

const meta: Meta<SurfaceComponent> = {
  title: 'UI Components/Surface',
  component: SurfaceComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(ESurfaceVariant),
      description: 'Surface variant style',
    },
    padding: {
      control: 'select',
      options: Object.values(ESpacing),
      description: 'Internal padding',
    },
  },
  args: {
    variant: ESurfaceVariant.CARD,
    padding: ESpacing.MD,
  },
  render: (args) => ({
    props: args,
    template: `
      <ui-surface [variant]="variant" [padding]="padding">
        <h3 style="margin: 0 0 16px 0;">Surface Content</h3>
        <p style="margin: 0 0 16px 0;">
          This is content inside a surface component. The surface provides a consistent
          background and padding for content areas.
        </p>
        <div style="background: #f8f9fa; padding: 12px; border-radius: 4px;">
          <strong>Nested content</strong> can be placed inside the surface.
        </div>
      </ui-surface>
    `,
  }),
};

export default meta;
type TStory = StoryObj<SurfaceComponent>;

export const CardVariant: TStory = {
  args: {
    variant: ESurfaceVariant.CARD,
    padding: ESpacing.MD,
  },
};

export const PlainVariant: TStory = {
  args: {
    variant: ESurfaceVariant.PLAIN,
    padding: ESpacing.MD,
  },
};

export const SmallPadding: TStory = {
  args: {
    variant: ESurfaceVariant.CARD,
    padding: ESpacing.SM,
  },
};

export const LargePadding: TStory = {
  args: {
    variant: ESurfaceVariant.CARD,
    padding: ESpacing.LG,
  },
};

export const NoPadding: TStory = {
  args: {
    variant: ESurfaceVariant.CARD,
    padding: ESpacing.NONE,
  },
};
