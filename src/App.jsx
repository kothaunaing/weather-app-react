/** @format */

import { useState } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

//Components
import Topbar from './components/Topbar';
import Content from './components/Content';

const client = new QueryClient();

function App() {
  return (
    <div className='App'>
      <QueryClientProvider client={client}>
        <Topbar />
        <Content />
      </QueryClientProvider>
    </div>
  );
}

export default App;
