import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { PageLoader } from './components/atoms/PageLoader';

const App = React.lazy(() => import('./App'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<PageLoader isLoading={true}><div /></PageLoader>}>
      <App />
    </Suspense>
  </React.StrictMode>
);
