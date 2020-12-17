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
.base {
  background-color: #34569b;
  padding: 0.5rem;
  border-radius: 10px;
}
.balloon {
  position: relative;
  display: block;
  margin: 0.5rem 100px 1.0rem 10rem;
  padding: 10px 10px 20px 10px;
  min-width: 120px;
  max-width: 100%;
  margin-left: 20px;
  color: #555;
  font-size: 16px;
  background: #e0edff;
  border-radius: 15px;
}

.balloon:before {
  content: "";
  position: absolute;
  top: 50%;
  left: -15px;
  margin-left: -10px;
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
    selectedCreatedByFieldId,
    selectedMessageFieldId,
  } = useConfig();
  const base = useBase();
  const table = base.getTableByIdIfExists(selectedTableId);
  const view = table ? table.getViewByIdIfExists(selectedViewId) : null;
  const messageField = view
    ? table.getFieldByIdIfExists(selectedMessageFieldId)
    : null;

  const records = useRecords(view, {
    fields: [selectedCreatedByFieldId, selectedMessageFieldId],
  });

  return (
    <Box className="base">
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
            size={50}></input>
          {records &&
            records
              .slice()
              .sort((a, b) => b.createdTime.getTime() - a.createdTime.getTime())
              .map((msg) => (
                <div className="balloon">
                  <p>{msg.createdTime.toLocaleString()}</p>
                  <p>
                    {(msg.getCellValue(selectedCreatedByFieldId) as any).name}
                  </p>
                  <p>{msg.getCellValue(selectedMessageFieldId)}</p>
                </div>
              ))}
        </Box>
      )}
    </Box>
  );
}
