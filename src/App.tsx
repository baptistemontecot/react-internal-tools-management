import Tools from './pages/Tools.tsx';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardProvider } from './context/DashboardProvider.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardProvider>
              <Dashboard />
            </DashboardProvider>
          }
        />
        <Route
          path="/tools"
          element={
            <DashboardProvider>
              <Tools />
            </DashboardProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
