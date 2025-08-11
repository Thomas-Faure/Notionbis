import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Type describing the configuration for mounting the React
// application.  Using a single parameter object makes the API
// extensible and keeps with the user's guideline to avoid multiple
// positional arguments.
export type MountReactAppConfigs = {
  /**
   * ID of the DOM element where the app should be mounted.  This
   * element must exist in the HTML document.
   */
  elementId: string;
};

/**
 * Mounts the React application into the specified element.  The
 * function is asynchronous in order to adhere to the user's
 * preference for async functions, even though no awaited
 * operations are required here.  Should the mounting ever need
 * asynchronous work (such as loading translations) it is ready.
 */
export const mountReactApp = async (
  configs: MountReactAppConfigs,
): Promise<void> => {
  const { elementId } = configs;
  const rootElement: HTMLElement | null = document.getElementById(elementId);
  if (rootElement === null) {
    throw new Error(`Element with id ${elementId} not found`);
  }
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

// Immediately invoke the mounting function.  Although awaiting
// isn’t necessary here, doing so surfaces errors that may occur
// during rendering.
void mountReactApp({ elementId: 'root' });
