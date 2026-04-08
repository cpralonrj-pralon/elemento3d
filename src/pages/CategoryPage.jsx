import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function CategoryPage() {
  const { id } = useParams();
  const [sort, setSort] = useState('popular');
  const [sortOpen, setSortOpen] = useState(false);

  const category = categories.find(c => c.id === id);
  const filtered = products.filter(p => p.category === id);

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return parseInt(b.sold) - parseInt(a.sold); // popular (default)
  });

  const sortLabels = {
    popular: 'Mais Populares',
    'price-asc': 'Menor Preço',
    'price-desc': 'Maior Preço',
    rating: 'Melhor Avaliação',
  };

  return (
    <main className="container" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Início</a> / <span>{category ? category.label : id}</span>
      </div>

      {/* Header */}
      <div className="page-header">
        <div>
          <h1 style={{ fontSize: '28px' }}>
            {category ? `${category.emoji} ${category.label}` : id}
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
            {sorted.length} produto{sorted.length !== 1 ? 's' : ''} encontrado{sorted.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <button className="sort-btn" onClick={() => setSortOpen(!sortOpen)}>
            <SlidersHorizontal size={16} />
            {sortLabels[sort]}
            <ChevronDown size={16} />
          </button>
          {sortOpen && (
            <div className="sort-dropdown">
              {Object.entries(sortLabels).map(([key, label]) => (
                <button
                  key={key}
                  className={`sort-option ${sort === key ? 'active' : ''}`}
                  onClick={() => { setSort(key); setSortOpen(false); }}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {sorted.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '48px', marginBottom: '16px' }}>😅</p>
          <h3>Nenhum produto nessa categoria ainda</h3>
          <p>Estamos trabalhando nisso! Em breve teremos novidades.</p>
        </div>
      ) : (
        <motion.div
          className="product-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {sorted.map(p => <ProductCard key={p.id} product={p} />)}
        </motion.div>
      )}
    </main>
  );
}
