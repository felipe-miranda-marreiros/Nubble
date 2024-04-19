import {Box} from '../Box/Box';
import {Separator} from '../Separator/Separator';

import {RadioButtonItem} from './RadioButtonItem';

type ItemTConstraint = Record<string, any>;

export interface RadioButtonSelectorProps<ItemT extends ItemTConstraint> {
  items: ItemT[];
  selectedItem?: ItemT;
  onSelect: (item: ItemT) => void;
  labelKey: keyof ItemT;
  descriptionKey: keyof ItemT;
  valueKey: keyof ItemT;
}

export function RadioButtonSelector<ItemT extends ItemTConstraint>({
  items,
  selectedItem,
  onSelect,
  labelKey,
  descriptionKey,
  valueKey,
}: RadioButtonSelectorProps<ItemT>) {
  return (
    <Box>
      {items.map((it, idx) => (
        <Box key={it[labelKey]}>
          <RadioButtonItem
            label={it[labelKey]}
            description={it[descriptionKey]}
            onPress={() => onSelect(it)}
            isSelected={
              !!selectedItem && selectedItem[valueKey] === it[valueKey]
            }
          />
          {idx < items.length - 1 && <Separator />}
        </Box>
      ))}
    </Box>
  );
}
