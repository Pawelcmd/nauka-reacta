import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './routes/Home';
import LoginPage from './routes/Login';
import ProductsPage from './routes/Products'
import RegisterPage from './routes/Register';
import ProductDetails from './routes/ProductDetails';
import MainLayout from './components/layouts/MainLayout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}/>
        <Route index element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
