import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, Loader2, CreditCard, Lock } from 'lucide-react';

const SERVER_URL = 'http://localhost:3001';

export default function CheckoutPage() {
  const { items, dispatch, totalPrice } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Se o usuário voltou cancelado do Stripe
  const cancelado = searchParams.get('cancelado');

  const handleStripeCheckout = async () => {
    if (items.length === 0) return;

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${SERVER_URL}/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Erro ao conectar com o servidor de pagamento.');
      }

      const { url } = await response.json();

      // Redireciona para a página de pagamento segura da Stripe
      window.location.href = url;
    } catch (err) {
      setError(err.message.includes('fetch')
        ? '⚠️ Servidor de pagamento offline. Inicie o servidor com: cd server && npm run dev'
        : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  const frete = totalPrice >= 200 ? 0 : 15;
  const total = totalPrice + frete;

  return (
    <main className="container" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
      <button
        onClick={() => navigate(-1)}
        style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', marginBottom: '24px', color: 'var(--text-muted)', fontSize: '14px', cursor: 'pointer' }}
      >
        <ArrowLeft size={16} /> Voltar à loja
      </button>

      <h1 style={{ fontSize: '26px', marginBottom: '8px' }}>🛒 Meu Carrinho</h1>

      {cancelado && (
        <div style={{
          background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '8px',
          padding: '12px 16px', marginBottom: '20px', fontSize: '14px', color: '#856404'
        }}>
          ⚠️ Pagamento cancelado. Seus itens continuam no carrinho.
        </div>
      )}

      {error && (
        <div style={{
          background: '#fee2e2', border: '1px solid #f87171', borderRadius: '8px',
          padding: '12px 16px', marginBottom: '20px', fontSize: '14px', color: '#b91c1c'
        }}>
          {error}
        </div>
      )}

      <div className="checkout-grid">
        {/* Lista de itens */}
        <div className="checkout-items">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '48px' }}>🛒</p>
              <h3 style={{ margin: '16px 0 8px' }}>Carrinho vazio</h3>
              <p>Adicione produtos para continuar.</p>
              <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '20px' }}>
                Ver produtos
              </Link>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="checkout-item">
                <img
                  src={item.image}
                  alt={item.name}
                  style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                />
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '600', fontSize: '14px' }}>{item.name}</p>
                  <p style={{ color: 'var(--primary)', fontWeight: '700', marginTop: '4px' }}>
                    R$ {item.price.toFixed(2).replace('.', ',')} / un.
                  </p>
                  <div className="cart-qty-ctrl" style={{ marginTop: '10px' }}>
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty - 1 })}>
                      <Minus size={12} />
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => dispatch({ type: 'UPDATE_QTY', id: item.id, qty: item.qty + 1 })}>
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: '700', color: 'var(--primary)' }}>
                    R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}
                  </p>
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', id: item.id })}
                    style={{ color: '#aaa', marginTop: '12px', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Resumo + Pagamento */}
        {items.length > 0 && (
          <div className="checkout-summary">
            <h3 style={{ marginBottom: '20px' }}>Resumo do Pedido</h3>

            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', color: 'var(--text-muted)' }}>
                <span>{item.shortName} ×{item.qty}</span>
                <span>R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}</span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid var(--border)', marginTop: '12px', paddingTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span>Subtotal</span>
                <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginBottom: '8px' }}>
                <span>Frete</span>
                <span style={{ color: frete === 0 ? 'green' : 'inherit' }}>
                  {frete === 0 ? '✓ Grátis' : `R$ ${frete.toFixed(2).replace('.', ',')}`}
                </span>
              </div>
              {totalPrice < 200 && (
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  Falta R$ {(200 - totalPrice).toFixed(2).replace('.', ',')} para frete grátis
                </p>
              )}
            </div>

            <div style={{
              background: 'var(--bg-light)', borderRadius: '8px', padding: '14px 16px',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              margin: '16px 0'
            }}>
              <span style={{ fontWeight: '700', fontSize: '16px' }}>Total</span>
              <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '22px' }}>
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>

            {/* Botão Stripe */}
            <button
              className="btn-primary"
              style={{ width: '100%', padding: '16px', fontSize: '16px', borderRadius: '8px', gap: '10px' }}
              onClick={handleStripeCheckout}
              disabled={loading}
            >
              {loading ? (
                <><Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} /> Aguarde...</>
              ) : (
                <><CreditCard size={20} /> Pagar com Stripe</>
              )}
            </button>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '6px', marginTop: '12px', fontSize: '12px', color: 'var(--text-muted)'
            }}>
              <Lock size={12} />
              Pagamento 100% seguro via Stripe
            </div>

            {/* Ícones de bandeiras */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
              {['Visa', 'Master', 'Amex', 'Pix', 'Boleto'].map(m => (
                <span key={m} style={{
                  background: '#f0f0f0', padding: '3px 10px', borderRadius: '4px',
                  fontSize: '11px', fontWeight: '600', color: '#555'
                }}>{m}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </main>
  );
}
