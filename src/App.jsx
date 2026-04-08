import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import SearchPage from './pages/SearchPage';
import CheckoutPage from './pages/CheckoutPage';
import AccountPage from './pages/AccountPage';
import CustomPage from './pages/CustomPage';
import OrderConfirmedPage from './pages/OrderConfirmedPage';

// Simple pages used by footer links
function SimplePage({ title, children }) {
  return (
    <main className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '24px' }}>{title}</h1>
      {children}
    </main>
  );
}

function NotFound() {
  return (
    <SimplePage title="">
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <p style={{ fontSize: '80px' }}>🤔</p>
        <h2 style={{ margin: '20px 0 12px', fontSize: '32px' }}>Página não encontrada</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>A página que você procura não existe ou foi movida.</p>
        <a href="/" className="btn-primary" style={{ padding: '12px 32px', fontSize: '16px', display: 'inline-flex' }}>
          Voltar à loja
        </a>
      </div>
    </SimplePage>
  );
}

function SobrePage() {
  return (
    <SimplePage title="Quem Somos">
      <div style={{ maxWidth: '700px', lineHeight: 1.8, color: 'var(--text-muted)' }}>
        <p style={{ fontSize: '15px', marginBottom: '20px' }}>
          A <strong style={{ color: 'var(--text-main)' }}>Elemento 3D</strong> é uma empresa especializada em impressão 3D de alta qualidade,
          fundada com a missão de tornar a tecnologia de fabricação aditiva acessível e criativa para todos.
        </p>
        <p style={{ marginBottom: '20px' }}>
          Utilizamos equipamentos de última geração e materiais certificados para produzir peças com precisão milimétrica,
          seja para decoração, colecionáveis, utilidades do dia a dia ou projetos empresariais sob medida.
        </p>
        <p>
          Estamos localizados no Brasil e entregamos em todo o território nacional, comprometidos com qualidade,
          prazo e satisfação total do cliente.
        </p>
      </div>
    </SimplePage>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categoria/:id" element={<CategoryPage />} />
          <Route path="/produto/:id" element={<ProductPage />} />
          <Route path="/busca" element={<SearchPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/conta" element={<AccountPage />} />
          <Route path="/favoritos" element={<AccountPage />} />
          <Route path="/personalizado" element={<CustomPage />} />
          <Route path="/pedido-confirmado" element={<OrderConfirmedPage />} />
          <Route path="/sobre" element={<SobrePage />} />
          <Route path="/ajuda" element={<SimplePage title="Central de Ajuda"><p style={{ color: 'var(--text-muted)' }}>Em breve teremos nossa central de ajuda completa. Entre em contato pelo WhatsApp (11) 9 9999-9999.</p></SimplePage>} />
          <Route path="/como-comprar" element={<SimplePage title="Como Comprar"><p style={{ color: 'var(--text-muted)' }}>1. Escolha seu produto → 2. Adicione ao carrinho → 3. Finalize o pedido → 4. Aguarde a entrega!</p></SimplePage>} />
          <Route path="/rastreio" element={<SimplePage title="Rastreio de Pedido"><p style={{ color: 'var(--text-muted)' }}>Após a confirmação do pedido, você receberá por e-mail o código de rastreamento.</p></SimplePage>} />
          <Route path="/devolucao" element={<SimplePage title="Devolução e Reembolso"><p style={{ color: 'var(--text-muted)' }}>Aceitamos devoluções em até 30 dias após a entrega, desde que o produto esteja em perfeitas condições.</p></SimplePage>} />
          <Route path="/faq" element={<SimplePage title="Perguntas Frequentes"><p style={{ color: 'var(--text-muted)' }}>Em breve publicaremos as perguntas mais frequentes dos nossos clientes.</p></SimplePage>} />
          <Route path="/privacidade" element={<SimplePage title="Política de Privacidade"><p style={{ color: 'var(--text-muted)' }}>Não compartilhamos seus dados com terceiros. Todas as informações são protegidas por criptografia SSL.</p></SimplePage>} />
          <Route path="/termos" element={<SimplePage title="Termos de Uso"><p style={{ color: 'var(--text-muted)' }}>Ao utilizar este site, você concorda com nossas políticas de privacidade e condições de venda.</p></SimplePage>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );
}
