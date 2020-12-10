import {
    Box,
    initializeBlock,
} from '@airtable/blocks/ui';
import React from 'react';
import ChatPanel from './components/ChatPanel';
import Setup from './components/Setup';

function ChatApp() {

    // Read the user's choice for which table and view to use from globalConfig.
    
    return (
        <Box flexDirection='row' display="flex">
        <Box flex="8"  padding={3} ><ChatPanel /></Box>
            <Box flex="auto" ><Setup /></Box>
        </Box>
    );
}

initializeBlock(() => <ChatApp />);
