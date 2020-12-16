import { useGlobalConfig } from '@airtable/blocks/ui';

const configKeys = [
  'selectedTableId',
  'selectedViewId',
  'selectedMessageFieldId',
] as const;

type ConfigKeys = typeof configKeys[number];

export default function useConfig() {
  const globalConfig = useGlobalConfig() as {
    get(key: ConfigKeys): string;
  };
  const selectedTableId = globalConfig.get('selectedTableId');
  const selectedViewId = globalConfig.get('selectedViewId');
  const selectedMessageFieldId = globalConfig.get('selectedMessageFieldId');

  return {
    selectedTableId,
    selectedViewId,
    selectedMessageFieldId,
  };
}
