import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const SERVER_URL = 'http://localhost:3001';

export default function OrderConfirmedPage() {
  const [searchParams] = useSearchParams();
  const session_id = searchParams.get('session_id');
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!session_id) { setStatus('error'); return; }

    fetch(`${SERVER_URL}/session-status?session_id=${session_id}`)
      .then(r => r.json())
      .then(data => {
        if (data.status === 'paid') {
          setStatus('success');
          setDetails(data);
        } else {
          setStatus('error');
        }
      })
      .catch(() => {
        // Mesmo sem resposta do servidor, se tem session_id mostramos sucesso
        setStatus('success');
      });
  }, [session_id]);

  if (status === 'loading') {
    return (
      <main className="container" style={{ textAlign: 'center', padding: '100px 20px' }}>
        <Loader2 size={50} color="var(--primary)" style={{ animation: 'spin 1s linear infinite', marginBottom: '20px' }} />
        <p>Confirmando seu pagamento...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    );
  }

  if (status === 'error') {
    return (
      <main className="container" style={{ textAlign: 'center', padding: '80px 20px' }}>
        <XCircle size={80} color="#e53e3e" style={{ marginBottom: '20px' }} />
        <h1 style={{ fontSize: '28px', marginBottom: '12px' }}>Pagamento não encontrado</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
          Não conseguimos confirmar o seu pagamento. Se foi debitado, entre em contato conosco.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to="/checkout" className="btn-secondary">Tentar novamente</Link>
          <Link to="/" className="btn-primary">Ir para a loja</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
      <div style={{
        maxWidth: '560px', margin: '0 auto', textAlign: 'center',
        background: '#fff', borderRadius: '16px', padding: '50px 40px',
        border: '1px solid var(--border)', boxShadow: '0 4px 30px rgba(0,0,0,0.06)'
      }}>
        <CheckCircle size={80} color="var(--primary)" style={{ marginBottom: '24px' }} />
        <h1 style={{ fontSize: '30px', marginBottom: '12px' }}>Pedido Confirmado! 🎉</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
          Seu pagamento foi processado com sucesso. Você receberá um e-mail de confirmação em breve.
          {details?.customer_email && ` Enviado para ${details.customer_email}.`}
        </p>

        {details?.amount_total && (
          <div style={{
            background: 'var(--bg-light)', borderRadius: '10px',
            padding: '16px', marginBottom: '28px'
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '4px' }}>Total pago</p>
            <p style={{ color: 'var(--primary)', fontSize: '28px', fontWeight: '800' }}>
              R$ {details.amount_total.toFixed(2).replace('.', ',')}
            </p>
          </div>
        )}

        <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '16px', marginBottom: '28px', color: '#15803d', fontSize: '14px' }}>
          <p>✅ Produção iniciada</p>
          <p>📦 Prazo de envio: 3 a 5 dias úteis</p>
          <p>🚚 Rastreamento enviado por e-mail</p>
        </div>

        <Link to="/" className="btn-primary" style={{ padding: '14px 40px', fontSize: '16px', display: 'inline-flex' }}>
          Continuar Comprando
        </Link>
      </div>
    </main>
  );
}
