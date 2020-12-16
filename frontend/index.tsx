import { Box, initializeBlock } from '@airtable/blocks/ui';
import React from 'react';
import ChatPanel from './components/ChatPanel';
import Setup from './components/Setup';

function ChatApp() {
  return (
    <Box flexDirection="row" display="flex">
      <Box flex="8" padding={3}>
        <ChatPanel />
      </Box>
      <Box flex="auto">
        <Setup />
      </Box>
    </Box>
  );
}

initializeBlock(() => <ChatApp />);
