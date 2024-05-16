import { PassiveTypeEnum } from '../../../enum';

export const passiveDefinitions: Record<
  PassiveTypeEnum,
  {
    name: string;
  }
> = {
  [PassiveTypeEnum.sales]: { name: 'Sales' },
  [PassiveTypeEnum.shortcut]: { name: 'Shortcut' },
};
