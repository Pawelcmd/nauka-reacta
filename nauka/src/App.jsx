import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './routes/Home';
import LoginPage from './routes/Login';
import RegisterPage from './routes/Register';
import ProductDetails from './routes/ProductDetails';
import MainLayout from './components/layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { lazy, Suspense } from 'react';

const ProductsPage = lazy(() => import('./routes/Products'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Ładowanie strony...</div>}>
        <Routes>
          <Route path='/' element={<MainLayout />} />
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/products/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;