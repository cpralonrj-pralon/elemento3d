import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export default function CustomPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', descricao: '', prazo: '' });

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ fontSize: '36px' }}>🎨 Projetos Personalizados</h1>
        <p style={{ color: 'var(--text-muted)', marginTop: '12px', maxWidth: '600px', margin: '12px auto 0' }}>
          Tem uma ideia na cabeça? Nós imprimimos! Envie sua ideia ou arquivo 3D e nossa equipe entra em contato com um orçamento gratuito.
        </p>
      </div>

      <div className="custom-grid">
        <div className="custom-info">
          <h3 style={{ marginBottom: '20px' }}>Como funciona?</h3>
          {[
            { step: '1', title: 'Envie sua ideia', desc: 'Descreva o projeto ou envie um arquivo 3D (.STL, .OBJ)' },
            { step: '2', title: 'Receba o orçamento', desc: 'Nossa equipe analisa e envia um orçamento em até 24h' },
            { step: '3', title: 'Aprovação e impressão', desc: 'Aprovando o orçamento, iniciamos a impressão imediatamente' },
            { step: '4', title: 'Entrega em todo o Brasil', desc: 'Enviamos para qualquer endereço com rastreamento completo' },
          ].map(s => (
            <div key={s.step} className="how-step">
              <div className="step-number">{s.step}</div>
              <div>
                <h4>{s.title}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="custom-form-wrap">
          {sent ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <CheckCircle size={64} color="var(--primary)" style={{ marginBottom: '20px' }} />
              <h3>Solicitação enviada!</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '12px' }}>Nossa equipe entrará em contato em até 24 horas úteis.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h3 style={{ marginBottom: '24px' }}>Solicitar Orçamento</h3>
              {[
                { name: 'nome', label: 'Seu Nome', placeholder: 'João da Silva' },
                { name: 'email', label: 'E-mail', placeholder: 'joao@email.com', type: 'email' },
                { name: 'telefone', label: 'Telefone/WhatsApp', placeholder: '(11) 9 9999-9999' },
                { name: 'prazo', label: 'Prazo desejado', placeholder: 'Ex: 15 dias' },
              ].map(f => (
                <div key={f.name} className="form-field">
                  <label>{f.label}</label>
                  <input
                    required
                    name={f.name}
                    type={f.type || 'text'}
                    placeholder={f.placeholder}
                    value={form[f.name]}
                    onChange={handle}
                    className="form-input"
                  />
                </div>
              ))}
              <div className="form-field">
                <label>Descreva seu projeto</label>
                <textarea
                  required
                  name="descricao"
                  placeholder="Ex: Quero um busto do meu personagem favorito em 15cm, com base decorativa..."
                  value={form.descricao}
                  onChange={handle}
                  className="form-input"
                  rows={5}
                  style={{ resize: 'vertical' }}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '16px' }}>
                <Send size={18} style={{ marginRight: '8px' }} /> Enviar Solicitação
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
