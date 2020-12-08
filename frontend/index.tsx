import {initializeBlock} from '@airtable/blocks/ui';
import React from 'react';
import App from './components/App';

function ChatApp() {
    // YOUR CODE GOES HERE
    return <App/>;
}

initializeBlock(() => <ChatApp />);
