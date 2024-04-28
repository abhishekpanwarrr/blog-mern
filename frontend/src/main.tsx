import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout.tsx'
import About from './pages/About/index.tsx'
import SignIn from './pages/SignIn/index.tsx'
import SignUp from './pages/SignUp/index.tsx'
import Dashboard from './pages/Dashboard/index.tsx'
import Projects from './pages/Projects/index.tsx'
import { store, persistor } from './redux/store.ts'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from './pages/ThemeProvider.tsx'
import PrivateRoute from './pages/PrivateRoute/index.tsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="" element={<App />} />
    <Route path="/about" element={<About />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="sign-in" element={<SignIn />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    <Route path="*" element={<h3>404 Page</h3>} />
  </Route>
));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </Provider>
    </PersistGate>
  </React.StrictMode>,
)
