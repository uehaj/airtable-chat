import React, { useState } from 'react';

import {
  TablePickerSynced,
  ViewPickerSynced,
  FieldPickerSynced,
  FormField,
  Box,
  useBase,
} from '@airtable/blocks/ui';
import useConfig from '../useConfig';

export default function Setup() {
  const { selectedTableId } = useConfig();
  const base = useBase();
  const table = base.getTableByIdIfExists(selectedTableId);

  return (
    <>
      <Box padding={3} borderBottom="thick">
        <FormField label="テーブル">
          <TablePickerSynced globalConfigKey="selectedTableId" />
        </FormField>
        <FormField label="ビュー">
          <ViewPickerSynced table={table} globalConfigKey="selectedViewId" />
        </FormField>
        <FormField label="Created byフィールド">
          <FieldPickerSynced
            table={table}
            globalConfigKey="selectedCreatedByFieldId"
            placeholder="Pick a 'created by' field..."
          />
        </FormField>
        <FormField label="Messageフィールド" marginBottom={0}>
          <FieldPickerSynced
            table={table}
            globalConfigKey="selectedMessageFieldId"
            placeholder="Pick a 'message' field..."
          />
        </FormField>
      </Box>
    </>
  );
}
