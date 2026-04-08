import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function SearchPage() {
  const [params] = useSearchParams();
  const q = params.get('q') || '';

  const results = q
    ? products.filter(p =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.description.toLowerCase().includes(q.toLowerCase()) ||
        p.category.toLowerCase().includes(q.toLowerCase())
      )
    : [];

  return (
    <main className="container" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '22px' }}>
          <Search size={20} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          Resultados para: <em style={{ color: 'var(--primary)' }}>"{q}"</em>
        </h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '6px' }}>{results.length} produto(s) encontrado(s)</p>
      </div>

      {results.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '60px' }}>🔍</p>
          <h3 style={{ margin: '16px 0 8px' }}>Nenhum produto encontrado</h3>
          <p>Tente buscar por "dragão", "vaso", "gaming" ou "decoração".</p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '24px' }}>
            Ver todos os produtos
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {results.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </main>
  );
}
