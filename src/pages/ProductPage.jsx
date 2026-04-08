import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Truck, Shield, Heart, ChevronLeft, Plus, Minus, CheckCircle } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { dispatch, setCartOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Produto não encontrado</h2>
        <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>
          Voltar à loja
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      dispatch({ type: 'ADD_ITEM', product });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    setCartOpen(true);
  };

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <main className="container" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
      {/* Breadcrumb */}
      <div className="breadcrumb" style={{ marginBottom: '24px' }}>
        <Link to="/">Início</Link> / <Link to={`/categoria/${product.category}`}>{product.category}</Link> / <span>{product.shortName}</span>
      </div>

      <div className="product-detail-grid">
        {/* Image */}
        <motion.div
          className="product-detail-img-wrap"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '12px', background: '#f9f9f9' }} />
        </motion.div>

        {/* Info */}
        <motion.div
          className="product-detail-info"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {product.label && <span className="product-label" style={{ display: 'inline-block', marginBottom: '10px' }}>{product.label}</span>}
          <h1 style={{ fontSize: '24px', margin: '0 0 12px' }}>{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={16} fill={s <= Math.round(product.rating) ? 'var(--primary)' : '#eee'} color={s <= Math.round(product.rating) ? 'var(--primary)' : '#eee'} />
              ))}
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{product.rating} ({product.reviews} avaliações) · {product.sold} vendidos</span>
          </div>

          <div className="product-price-block">
            <span className="detail-price">R$ {product.price.toFixed(2).replace('.', ',')}</span>
            {discount && (
              <>
                <span className="detail-original">R$ {product.originalPrice.toFixed(2).replace('.', ',')}</span>
                <span className="detail-discount">-{discount}%</span>
              </>
            )}
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.7, margin: '20px 0' }}>
            {product.description}
          </p>

          <div className="specs-list">
            <h4 style={{ marginBottom: '10px', fontSize: '14px' }}>Especificações:</h4>
            {product.specs.map((spec, i) => (
              <div key={i} className="spec-item">
                <CheckCircle size={14} color="var(--primary)" />
                <span>{spec}</span>
              </div>
            ))}
          </div>

          <div className="qty-selector">
            <span style={{ fontSize: '14px', fontWeight: '600' }}>Quantidade:</span>
            <div className="qty-ctrl">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}><Minus size={16} /></button>
              <span>{qty}</span>
              <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}><Plus size={16} /></button>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{product.stock} disponíveis</span>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              className={`btn-primary ${added ? 'btn-success' : ''}`}
              style={{ flex: 1, padding: '14px', fontSize: '16px' }}
              onClick={handleAddToCart}
            >
              {added ? '✓ Adicionado!' : <><ShoppingCart size={18} style={{ marginRight: '8px' }} /> Adicionar ao Carrinho</>}
            </button>
            <button className="btn-wish">
              <Heart size={20} />
            </button>
          </div>

          <div className="product-guarantees">
            <div><Truck size={16} /> Frete grátis acima de R$ 200</div>
            <div><Shield size={16} /> Garantia de 30 dias</div>
          </div>
        </motion.div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ marginTop: '60px' }}>
          <div className="section-title">
            <h2>Produtos Relacionados</h2>
          </div>
          <div className="product-grid">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </main>
  );
}
