import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { dispatch, setCartOpen } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_ITEM', product });
    setCartOpen(true);
  };

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link to={`/produto/${product.id}`} className="product-card">
        <div style={{ position: 'relative' }}>
          <img src={product.image} alt={product.name} className="product-img" />
          {product.label && (
            <span className="product-label">{product.label}</span>
          )}
          {discount && (
            <span className="product-discount">-{discount}%</span>
          )}
          <button className="product-wish" title="Favoritar">
            <Heart size={16} />
          </button>
        </div>
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <div className="product-price">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </div>
          {product.originalPrice > product.price && (
            <div className="product-original-price">
              R$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </div>
          )}
          <div className="product-stats">
            <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Star size={11} fill="var(--primary)" color="var(--primary)" />
              <span>{product.rating}</span>
              <span style={{ color: 'var(--text-muted)' }}>({product.reviews})</span>
            </div>
            <span>{product.sold} vendidos</span>
          </div>
          <button className="btn-add-cart" onClick={handleAdd}>
            <ShoppingCart size={14} />
            Adicionar
          </button>
        </div>
      </Link>
    </motion.div>
  );
}
