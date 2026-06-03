import React, { useState } from 'react';
import { Monitor, Wallet, Users, ArrowLeft, Zap } from 'lucide-react';
import AppContador from './screens/AppContador.jsx';
import TelaCaixa from './screens/TelaCaixa.jsx';
import PortalCliente from './screens/PortalCliente.jsx';

const C = {
  navy: '#1B2A4A', navyDeep: '#0E1929', emerald: '#2ECC71', green: '#27AE60',
  emeraldPale: '#EAFAF1', white: '#FFFFFF', off: '#F7F9FB',
  g200: '#E2E8F0', g400: '#94A3B8', g500: '#64748B', g700: '#334155',
};
const FD = "'Playfair Display', Georgia, serif";
const FB = "'Source Sans 3', -apple-system, sans-serif";

const VIEWS = [
  {
    id: 'contador',
    label: 'App do Contador',
    desc: 'A operação completa: empresas, modelos, tarefas, calendário, financeiro, relatórios, equipe e assinatura',
    icon: Monitor,
    Component: AppContador,
  },
  {
    id: 'portal',
    label: 'Portal do Cliente',
    desc: 'O que o cliente final do escritório vê: financeiro, andamento e documentos — com a sua marca',
    icon: Users,
    Component: PortalCliente,
  },
];

export default function App() {
  const [view, setView] = useState(null); // null = tela inicial de escolha

  if (view) {
    const v = VIEWS.find(x => x.id === view);
    const Comp = v.Component;
    return (
      <div>
        {/* Barra superior de navegação da demo */}
        <div style={{ position: 'sticky', top: 0, zIndex: 9999, background: C.navyDeep, borderBottom: `1px solid rgba(255,255,255,0.08)`, padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 16, fontFamily: FB }}>
          <button onClick={() => setView(null)} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: FB }}>
            <ArrowLeft size={15} /> Voltar
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Você está vendo:</span>
            <span style={{ fontSize: 13, color: C.emerald, fontWeight: 700 }}>{v.label}</span>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
            {VIEWS.map(x => (
              <button key={x.id} onClick={() => setView(x.id)} style={{
                background: x.id === view ? C.emerald : 'rgba(255,255,255,0.08)',
                color: x.id === view ? '#fff' : 'rgba(255,255,255,0.7)',
                border: 'none', borderRadius: 7, padding: '7px 13px', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: FB,
              }}>{x.label}</button>
            ))}
          </div>
        </div>
        <Comp />
      </div>
    );
  }

  // Tela inicial: escolha da visão
  return (
    <div style={{ minHeight: '100vh', background: `linear-gradient(135deg, ${C.navy}, ${C.navyDeep})`, fontFamily: FB, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', marginBottom: 44, maxWidth: 640 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 11, marginBottom: 24 }}>
          <span style={{ fontSize: 38, fontWeight: 800, letterSpacing: -1, lineHeight: 1 }}><span style={{ color: '#fff' }}>bpo</span><span style={{ color: C.emerald }}>X</span></span>
        </div>
        <h1 style={{ fontFamily: FD, fontSize: 34, fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 14 }}>
          Conheça o BPOx <span style={{ color: C.emerald }}>por dentro</span>
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.55)', fontWeight: 300, lineHeight: 1.6 }}>
          Esta é uma demonstração navegável. Escolha por onde começar — explore as telas reais como se já fosse cliente.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 280px))', gap: 18, width: '100%', maxWidth: 900, justifyContent: 'center' }}>
        {VIEWS.map(v => {
          const Icon = v.icon;
          return (
            <button key={v.id} onClick={() => setView(v.id)} style={{
              textAlign: 'left', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16, padding: 26, cursor: 'pointer', fontFamily: FB, transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(46,204,113,0.1)'; e.currentTarget.style.borderColor = C.emerald; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
              <div style={{ width: 50, height: 50, borderRadius: 12, background: 'rgba(46,204,113,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <Icon size={24} color={C.emerald} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{v.label}</div>
              <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.55 }}>{v.desc}</div>
              <div style={{ marginTop: 16, fontSize: 13, fontWeight: 700, color: C.emerald }}>Explorar →</div>
            </button>
          );
        })}
      </div>

      <p style={{ marginTop: 40, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
        BPOx · um produto ContadorX · demonstração sem cadastro
      </p>
    </div>
  );
}
