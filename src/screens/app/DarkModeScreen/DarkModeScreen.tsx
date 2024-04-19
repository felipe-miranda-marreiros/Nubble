import {useSettingsService, useThemePreference} from '@services';

import {RadioButtonSelector, Screen} from '@components';

type ThemePreference = 'light' | 'dark' | 'system';

type Option = {
  label: string;
  description?: string;
  themePreference: ThemePreference;
};

const items: Option[] = [
  {
    label: 'Ativado',
    themePreference: 'dark',
  },
  {
    label: 'Desativado',
    themePreference: 'light',
  },
  {
    label: 'Padrão do sistema',
    themePreference: 'system',
    description:
      'A aparência será a mesma que você configurou no seu dispositivo',
  },
];

export function DarkModeScreen() {
  const themePreference = useThemePreference();
  const {setThemePreference} = useSettingsService();

  const selectedItem = items.find(it => it.themePreference === themePreference);

  function setSelectedItem(item: Option) {
    setThemePreference(item.themePreference);
  }

  return (
    <Screen canGoBack title="Modo escuro">
      <RadioButtonSelector
        selectedItem={selectedItem}
        items={items}
        onSelect={setSelectedItem}
        labelKey="label"
        valueKey="themePreference"
        descriptionKey="description"
      />
    </Screen>
  );
}
