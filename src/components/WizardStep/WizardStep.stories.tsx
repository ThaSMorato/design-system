import type { Meta, StoryObj } from '@storybook/react';
import { WizardStep } from './WizardStep';
import { User } from 'lucide-react';

const meta = {
  title: 'Compound/WizardStep',
  component: WizardStep,
  argTypes: {
    variant: { control: 'radio', options: ['default', 'compact'] },
  },
  args: { variant: 'default' },
} satisfies Meta<typeof WizardStep>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <WizardStep {...args}>
      <WizardStep.Header
        title="Choose Your Race"
        description="Select a race for your character."
        icon={<User className="h-5 w-5" />}
        stepNumber={1}
        totalSteps={4}
      />
      <WizardStep.Content>
        <WizardStep.Section label="Available Races" required>
          <WizardStep.Grid cols={{ default: 1, sm: 2, lg: 3 }}>
            <div className="p-3 border border-dark-600 rounded-lg text-dark-300 text-sm">Human</div>
            <div className="p-3 border border-primary-500 bg-primary-900/30 rounded-lg text-dark-100 text-sm">Elf</div>
            <div className="p-3 border border-dark-600 rounded-lg text-dark-300 text-sm">Dwarf</div>
          </WizardStep.Grid>
        </WizardStep.Section>
        <WizardStep.InfoPanel title="Elf">
          <p>Elves are known for their grace and longevity.</p>
          <p>Ability Score Increase: +2 Dexterity</p>
        </WizardStep.InfoPanel>
      </WizardStep.Content>
      <WizardStep.Footer>
        <button className="px-4 py-2 text-sm text-dark-400">Back</button>
        <button className="px-4 py-2 text-sm bg-primary-500 text-white rounded">Next</button>
      </WizardStep.Footer>
    </WizardStep>
  ),
};
