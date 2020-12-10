import React, { useState } from 'react';

import {
  TablePickerSynced,
  ViewPickerSynced,
  FieldPickerSynced,
  FormField,
  Box,
  useBase,
} from '@airtable/blocks/ui';
import { FieldType } from '@airtable/blocks/models';
import useConfig from '../useConfig';

export default function Setup() {
  const { selectedTableId } = useConfig();
  const base = useBase();
  const table = base.getTableByIdIfExists(selectedTableId);

  return (
    <>
      <Box padding={3} borderBottom="thick">
        <FormField label="Table">
          <TablePickerSynced globalConfigKey="selectedTableId" />
        </FormField>
        <FormField label="View">
          <ViewPickerSynced table={table} globalConfigKey="selectedViewId" />
        </FormField>
        <FormField label="Message Field" marginBottom={0}>
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
