import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Printer, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="logo" style={{ marginBottom: '16px' }}>
              <Printer size={24} />
              <span style={{ fontSize: '18px' }}>Elemento 3D</span>
            </div>
            <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.6 }}>
              Transformando ideias em objetos reais com tecnologia de impressão 3D de alta precisão.
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-btn"><Instagram size={18} /></a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-btn"><Facebook size={18} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-btn"><Youtube size={18} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Atendimento</h4>
            <ul className="footer-links">
              <li><Link to="/ajuda">Central de Ajuda</Link></li>
              <li><Link to="/como-comprar">Como Comprar</Link></li>
              <li><Link to="/rastreio">Rastreio de Pedido</Link></li>
              <li><Link to="/devolucao">Devolução e Reembolso</Link></li>
              <li><Link to="/faq">Perguntas Frequentes</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Empresa</h4>
            <ul className="footer-links">
              <li><Link to="/sobre">Quem Somos</Link></li>
              <li><Link to="/personalizado">Projetos Personalizados</Link></li>
              <li><Link to="/privacidade">Políticas de Privacidade</Link></li>
              <li><Link to="/termos">Termos de Uso</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contato</h4>
            <ul className="footer-links">
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Mail size={14} /> contato@elemento3d.com.br
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <Phone size={14} /> (11) 9 9999-9999
              </li>
              <li style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <MapPin size={14} /> Brasil
              </li>
            </ul>
            <div style={{ marginTop: '20px' }}>
              <h4>Pagamento</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                {['Pix', 'Visa', 'Master', 'Boleto'].map(m => (
                  <span key={m} style={{
                    background: '#f0f0f0',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: '#444'
                  }}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Elemento 3D. Todos os direitos reservados.</span>
          <span>Brasil 🇧🇷</span>
        </div>
      </div>
    </footer>
  );
}
