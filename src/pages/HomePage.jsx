import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Truck, Headphones, Star } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function HomePage() {
  const bestSellers = products.filter(p => p.sold >= '800' || parseInt(p.sold) >= 800).slice(0, 4);
  const newArrivals = products.filter(p => p.label === 'Lançamento' || !p.label).slice(0, 4);

  return (
    <main>
      {/* Hero */}
      <section className="hero container">
        <div className="hero-slide">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="hero-badge">🔥 Liderando o mercado 3D</div>
            <h1>Impressão 3D<br />que ganha vida</h1>
            <p>De decoração exclusiva a peças funcionais, a Elemento 3D transforma suas ideias em realidade com alta precisão.</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/categoria/colecionaveis" className="btn-primary">
                Explorar Coleção <ArrowRight size={16} style={{ marginLeft: '6px' }} />
              </Link>
              <Link to="/personalizado" className="btn-secondary">
                Personalizar Agora
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
          >
            <img src="/hero_3d_printer_1775524411485.png" alt="Impressora 3D Elemento 3D em ação" />
          </motion.div>
        </div>
      </section>

      {/* Category Quick Access */}
      <section className="container" style={{ marginBottom: '40px' }}>
        <motion.div
          className="categories-grid"
          variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {categories.map(cat => (
            <motion.div key={cat.id} variants={fadeUp}>
              <Link to={`/categoria/${cat.id}`} className="category-card">
                <span style={{ fontSize: '36px' }}>{cat.emoji}</span>
                <span>{cat.label}</span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Best Sellers */}
      <section className="container">
        <div className="section-title">
          <h2>⭐ Mais Vendidos</h2>
          <Link to="/categoria/colecionaveis">Ver todos <ArrowRight size={14} /></Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 8).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container" style={{ margin: '40px auto' }}>
        <div className="promo-banner">
          <div>
            <div className="promo-tag"><Zap size={16} /> PROJETOS SOB MEDIDA</div>
            <h2>O Futuro em Suas Mãos</h2>
            <p>Realizamos projetos personalizados para empresas e colecionadores. Entre em contato para um orçamento gratuito.</p>
          </div>
          <Link to="/personalizado" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
            Solicitar Orçamento
          </Link>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="container">
        <div className="trust-grid">
          {[
            { icon: <Truck size={32} />, title: 'Envio Rápido', desc: 'Entregamos em todo o Brasil em até 7 dias úteis' },
            { icon: <Shield size={32} />, title: 'Compra Segura', desc: 'Site protegido e pagamento criptografado' },
            { icon: <Star size={32} />, title: 'Qualidade Premium', desc: 'Materiais certificados e impressão de alta precisão' },
            { icon: <Headphones size={32} />, title: 'Suporte Dedicado', desc: 'Atendimento de segunda a sábado das 9h às 18h' },
          ].map((t, i) => (
            <div key={i} className="trust-item">
              <div className="trust-icon">{t.icon}</div>
              <h4>{t.title}</h4>
              <p>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
