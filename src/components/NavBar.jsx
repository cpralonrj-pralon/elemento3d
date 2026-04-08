import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, User, Heart, Printer, X, Plus, Minus, Trash2, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';

function CartDrawer() {
  const { items, dispatch, cartOpen, setCartOpen, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="cart-header">
              <h3>Meu Carrinho ({items.length})</h3>
              <button className="icon-btn" onClick={() => setCartOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="cart-body">
              {items.length === 0 ? (
                <div className="cart-empty">
                  <Package size={64} color="var(--text-muted)" />
                  <p>Carrinho vazio</p>
                  <button className="btn-primary" onClick={() => setCartOpen(false)}>
                    Explorar Produtos
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} className="cart-item-img" />
                    <div className="cart-item-info">
                      <p className="cart-item-name">{item.shortName}</p>
                      <p className="cart-item-price">R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}</p>
                      <div className="cart-qty-ctrl">
                        <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })}>
                          <Minus size={12} />
                        </button>
                        <span>{item.qty}</span>
                        <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })}>
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                    <button
                      className="icon-btn cart-remove"
                      onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total</span>
                  <span className="cart-total-price">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                </div>
                <button
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '16px' }}
                  onClick={() => { setCartOpen(false); navigate('/checkout'); }}
                >
                  Finalizar Compra
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function NavBar() {
  const { totalItems, setCartOpen } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/busca?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="navbar">
            <Link to="/" className="logo">
              <Printer size={30} />
              <span>Elemento 3D</span>
            </Link>

            <form className="search-container" onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder="Pesquisar produtos 3D exclusivos..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">
                <Search size={18} />
              </button>
            </form>

            <div className="nav-icons">
              <Link to="/conta" className="icon-btn" title="Minha Conta">
                <User size={22} />
              </Link>
              <Link to="/favoritos" className="icon-btn" title="Favoritos">
                <Heart size={22} />
              </Link>
              <button
                className="icon-btn"
                title="Carrinho"
                onClick={() => setCartOpen(true)}
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && <span className="badge">{totalItems}</span>}
              </button>
            </div>
          </nav>
        </div>

        <div className="category-bar">
          <div className="container" style={{ display: 'flex', gap: '30px', overflowX: 'auto' }}>
            <Link
              to="/"
              className={`category-item ${location.pathname === '/' ? 'active' : ''}`}
            >
              🏠 Início
            </Link>
            {categories.map(cat => (
              <Link
                key={cat.id}
                to={`/categoria/${cat.id}`}
                className={`category-item ${location.pathname === `/categoria/${cat.id}` ? 'active' : ''}`}
              >
                {cat.emoji} {cat.label}
              </Link>
            ))}
            <Link
              to="/personalizado"
              className={`category-item ${location.pathname === '/personalizado' ? 'active' : ''}`}
            >
              🎨 Sob Encomenda
            </Link>
          </div>
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
