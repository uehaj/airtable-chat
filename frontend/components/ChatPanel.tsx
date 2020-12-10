import React, { useState } from 'react';
import {
  useBase,
  useRecords,
  Box,
  Input,
  loadCSSFromString,
} from '@airtable/blocks/ui';
import useConfig from '../useConfig';

loadCSSFromString(`
.balloon {
  position: relative;
  display: block;
  margin: 1.5em 0;
  padding: 7px 10px;
  min-width: 120px;
  max-width: 100%;
  color: #555;
  font-size: 16px;
  background: #e0edff;
  border-radius: 15px;
}

.balloon:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -25px;
  margin-top: -15px;
  border: 15px solid transparent;
  border-right: 15px solid #e0edff;
  z-index: 0;
}

.balloon p {
  margin: 0;
  padding: 0;
}
`);

export default function ChatPanel() {
  const {
    selectedTableId,
    selectedViewId,
    selectedMessageFieldId,
  } = useConfig();
  const base = useBase();
  const table = base.getTableByIdIfExists(selectedTableId);
  const view = table ? table.getViewByIdIfExists(selectedViewId) : null;
  const messageField = view
    ? table.getFieldByIdIfExists(selectedMessageFieldId)
    : null;

  const records = useRecords(view, {
    fields: [selectedMessageFieldId],
  });

  return (
    <Box>
      {messageField && (
        <Box>
          <input
            onKeyPress={(e: any) => {
              if (e.key === 'Enter') {
                table.createRecordsAsync([
                  { fields: { [selectedMessageFieldId]: e.target.value } },
                ]);
                e.target.value = '';
                e.preventDefault();
                return false;
              }
            }}
            placeholder="発言をどうぞ"
            width="320px"></input>
          {records &&
            records.map((msg) => (
              <div className="balloon">
                <p>{msg.createdTime.toLocaleString()}</p>
                <p>{msg.getCellValue(selectedMessageFieldId)}</p>
              </div>
            ))}
        </Box>
      )}
    </Box>
  );
}
