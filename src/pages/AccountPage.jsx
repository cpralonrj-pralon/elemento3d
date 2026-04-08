import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, LogOut, Settings, ChevronRight } from 'lucide-react';

export default function AccountPage() {
  const [view, setView] = useState('profile');

  return (
    <main className="container" style={{ paddingTop: '30px', paddingBottom: '60px' }}>
      <h1 style={{ fontSize: '26px', marginBottom: '30px' }}>Minha Conta</h1>
      <div className="account-grid">
        {/* Sidebar */}
        <aside className="account-sidebar">
          <div className="account-avatar">
            <div className="avatar-circle"><User size={40} /></div>
            <div>
              <p style={{ fontWeight: '700' }}>Cliente Elemento 3D</p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>cliente@email.com</p>
            </div>
          </div>
          <nav className="account-nav">
            {[
              { key: 'profile', icon: <User size={18} />, label: 'Meus Dados' },
              { key: 'orders', icon: <Package size={18} />, label: 'Meus Pedidos' },
              { key: 'favorites', icon: <Heart size={18} />, label: 'Favoritos' },
              { key: 'address', icon: <MapPin size={18} />, label: 'Endereços' },
              { key: 'settings', icon: <Settings size={18} />, label: 'Configurações' },
            ].map(item => (
              <button
                key={item.key}
                className={`account-nav-item ${view === item.key ? 'active' : ''}`}
                onClick={() => setView(item.key)}
              >
                {item.icon} {item.label} <ChevronRight size={14} style={{ marginLeft: 'auto' }} />
              </button>
            ))}
            <button className="account-nav-item" style={{ color: '#e53e3e', marginTop: '20px' }}>
              <LogOut size={18} /> Sair
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="account-content">
          {view === 'profile' && (
            <div>
              <h2 style={{ marginBottom: '24px' }}>Meus Dados</h2>
              <div className="form-field"><label>Nome Completo</label><input className="form-input" defaultValue="Cliente Elemento 3D" /></div>
              <div className="form-field"><label>E-mail</label><input className="form-input" defaultValue="cliente@email.com" /></div>
              <div className="form-field"><label>Telefone</label><input className="form-input" defaultValue="(11) 9 9999-9999" /></div>
              <div className="form-field"><label>CPF</label><input className="form-input" placeholder="000.000.000-00" /></div>
              <button className="btn-primary" style={{ marginTop: '20px' }}>Salvar Alterações</button>
            </div>
          )}

          {view === 'orders' && (
            <div>
              <h2 style={{ marginBottom: '24px' }}>Meus Pedidos</h2>
              <div className="order-empty">
                <Package size={60} color="var(--text-muted)" />
                <p>Você ainda não fez nenhum pedido.</p>
                <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '16px' }}>Explorar Produtos</Link>
              </div>
            </div>
          )}

          {view === 'favorites' && (
            <div>
              <h2 style={{ marginBottom: '24px' }}>Favoritos</h2>
              <div className="order-empty">
                <Heart size={60} color="var(--text-muted)" />
                <p>Sua lista de favoritos está vazia.</p>
                <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: '16px' }}>Explorar Produtos</Link>
              </div>
            </div>
          )}

          {view === 'address' && (
            <div>
              <h2 style={{ marginBottom: '24px' }}>Endereços Salvos</h2>
              <div className="form-field"><label>CEP</label><input className="form-input" placeholder="00000-000" /></div>
              <div className="form-field"><label>Endereço</label><input className="form-input" placeholder="Rua, Número" /></div>
              <div className="form-field"><label>Bairro</label><input className="form-input" placeholder="Bairro" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-field"><label>Cidade</label><input className="form-input" placeholder="Cidade" /></div>
                <div className="form-field"><label>Estado</label><input className="form-input" placeholder="SP" /></div>
              </div>
              <button className="btn-primary" style={{ marginTop: '20px' }}>Salvar Endereço</button>
            </div>
          )}

          {view === 'settings' && (
            <div>
              <h2 style={{ marginBottom: '24px' }}>Configurações</h2>
              <div className="settings-section">
                <h4>Notificações</h4>
                {['E-mail de promoções', 'Atualização de pedidos', 'Novos produtos'].map(n => (
                  <label key={n} className="toggle-label">
                    <span>{n}</span>
                    <input type="checkbox" defaultChecked />
                  </label>
                ))}
              </div>
              <div className="settings-section" style={{ marginTop: '30px' }}>
                <h4>Senha</h4>
                <div className="form-field"><label>Senha Atual</label><input className="form-input" type="password" /></div>
                <div className="form-field"><label>Nova Senha</label><input className="form-input" type="password" /></div>
                <button className="btn-primary" style={{ marginTop: '12px' }}>Alterar Senha</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
