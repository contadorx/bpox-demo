import React, { useState, useRef, useEffect } from 'react';
import { LayoutDashboard, Building2, CheckSquare, Calendar as CalendarIcon, Settings, Plus, Search, Bell, Clock, AlertTriangle, CheckCircle2, Circle, TrendingUp, Zap, ArrowLeft, Mail, Phone, FileText, BarChart3, Smartphone, Monitor, Tag, ChevronRight, Star, X, Play, Pause, Timer, User, ArrowRight } from 'lucide-react';

// BPOx — Protótipo navegável v2 (expandido)
// Paleta: Navy #1B2A4A + Esmeralda #2ECC71 + Verde #27AE60

const C = {
  navy: '#1B2A4A', navyDeep: '#0E1929', emerald: '#2ECC71', green: '#27AE60',
  emeraldPale: '#EAFAF1', gold: '#C4983E', white: '#FFFFFF', off: '#F7F9FB',
  g100: '#EEF1F4', g200: '#E2E8F0', g400: '#94A3B8', g500: '#64748B', g700: '#334155',
  amber: '#F59E0B', amberPale: '#FEF3C7', red: '#EF4444', redPale: '#FEE2E2',
};
const FD = "'Playfair Display', Georgia, serif";
const FB = "'Source Sans 3', -apple-system, sans-serif";

const EMPRESAS = [
  { id: 1, nome: 'Padaria Estrela Ltda', resp: 'Maria', pend: 2, atras: 0, status: 'em_dia', honorario: 890, cnpj: '12.345.678/0001-90', email: 'contato@padariaestrela.com', tel: '(11) 98765-4321', regime: 'Simples Nacional', erp: 'Omie', tags: ['Prioridade', 'Varejo'] },
  { id: 2, nome: 'TechFlow Sistemas', resp: 'João', pend: 5, atras: 1, status: 'atrasado', honorario: 1490, cnpj: '23.456.789/0001-01', email: 'fin@techflow.com', tel: '(11) 91234-5678', regime: 'Lucro Presumido', erp: 'Conta Azul', tags: ['SaaS'] },
  { id: 3, nome: 'Clínica Bem Viver', resp: 'Maria', pend: 3, atras: 0, status: 'pendencia', honorario: 1190, cnpj: '34.567.890/0001-12', email: 'adm@bemviver.com', tel: '(11) 99876-1234', regime: 'Simples Nacional', erp: 'Omie', tags: ['Saúde'] },
  { id: 4, nome: 'Auto Peças Veloz', resp: 'Pedro', pend: 0, atras: 0, status: 'em_dia', honorario: 750, cnpj: '45.678.901/0001-23', email: 'veloz@autopecas.com', tel: '(11) 95555-7777', regime: 'Simples Nacional', erp: 'Nibo', tags: ['Varejo'] },
  { id: 5, nome: 'Restaurante Sabor', resp: 'João', pend: 4, atras: 0, status: 'pendencia', honorario: 980, cnpj: '56.789.012/0001-34', email: 'sabor@rest.com', tel: '(11) 94444-8888', regime: 'Simples Nacional', erp: 'Omie', tags: ['Alimentação'] },
  { id: 6, nome: 'Construtora Alfa', resp: 'Pedro', pend: 1, atras: 0, status: 'em_dia', honorario: 2200, cnpj: '67.890.123/0001-45', email: 'obras@alfa.com', tel: '(11) 93333-9999', regime: 'Lucro Real', erp: 'Conta Azul', tags: ['Construção', 'Prioridade'] },
];

const STATUS = {
  em_dia: { label: 'Em dia', color: C.green, bg: C.emeraldPale },
  pendencia: { label: 'Pendências', color: C.amber, bg: C.amberPale },
  atrasado: { label: 'Atrasado', color: C.red, bg: C.redPale },
};
const PRIO = { alta: C.red, media: C.amber, baixa: C.g400 };

const initialTarefas = {
  pendente: [
    { id: 't1', nome: 'Baixar extratos bancários', emp: 'TechFlow Sistemas', resp: 'João', prazo: 'Hoje', prio: 'alta', desc: 'Baixar os extratos de todas as contas bancárias do mês de junho para conciliação.', horasEst: 1, horasFeitas: 0, checklist: [{ t: 'Itaú PJ', d: false }, { t: 'Inter', d: false }, { t: 'Cartão Visa', d: false }] },
    { id: 't2', nome: 'Lançar contas a pagar', emp: 'Restaurante Sabor', resp: 'João', prazo: '2 dias', prio: 'media', desc: 'Lançar todas as contas a pagar recebidas no período.', horasEst: 2, horasFeitas: 0, checklist: [] },
    { id: 't3', nome: 'Conciliação bancária', emp: 'Clínica Bem Viver', resp: 'Maria', prazo: '3 dias', prio: 'media', desc: 'Conciliar lançamentos com o extrato importado.', horasEst: 1.5, horasFeitas: 0, checklist: [] },
    { id: 't4', nome: 'Cobrar inadimplentes', emp: 'Padaria Estrela', resp: 'Maria', prazo: '4 dias', prio: 'baixa', desc: 'Enviar lembretes aos clientes com pagamentos em atraso.', horasEst: 0.5, horasFeitas: 0, checklist: [] },
  ],
  andamento: [
    { id: 't5', nome: 'Fluxo de caixa mensal', emp: 'Construtora Alfa', resp: 'Pedro', prazo: 'Hoje', prio: 'alta', desc: 'Atualizar a projeção de fluxo de caixa dos próximos 30 dias.', horasEst: 2, horasFeitas: 1.25, checklist: [{ t: 'Entradas previstas', d: true }, { t: 'Saídas previstas', d: true }, { t: 'Projeção 30 dias', d: false }] },
    { id: 't6', nome: 'DRE gerencial', emp: 'TechFlow Sistemas', resp: 'João', prazo: '1 dia', prio: 'media', desc: 'Montar o DRE gerencial do mês com comparativo.', horasEst: 3, horasFeitas: 0.5, checklist: [] },
  ],
  concluida: [
    { id: 't7', nome: 'Relatório mensal', emp: 'Auto Peças Veloz', resp: 'Pedro', prazo: 'Ontem', prio: 'media', desc: 'Gerar e enviar o relatório financeiro mensal ao cliente.', horasEst: 1, horasFeitas: 1.1, checklist: [] },
    { id: 't8', nome: 'Conciliação cartões', emp: 'Padaria Estrela', resp: 'Maria', prazo: 'Ontem', prio: 'baixa', desc: 'Conciliar as vendas em cartão com o recebido.', horasEst: 1, horasFeitas: 0.75, checklist: [] },
  ],
};

const CAL_EVENTS = { 3: ['done'], 5: ['done', 'done'], 9: ['future'], 10: ['today', 'today', 'today'], 12: ['late'], 15: ['soon', 'soon'], 17: ['future'], 18: ['done'], 20: ['soon'], 22: ['future', 'future'], 25: ['future'], 28: ['future'], 30: ['future', 'future'] };
const CAL_C = { done: C.green, today: C.emerald, soon: C.amber, late: C.red, future: C.g400 };

function Fonts() {
  return <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Sans+3:wght@300;400;500;600;700;800&display=swap');
  *{box-sizing:border-box} ::-webkit-scrollbar{width:8px;height:8px} ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}
  @keyframes toastIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>;
}

export default function AppContador() {
  const [mobile, setMobile] = useState(false);
  const [onboarded, setOnboarded] = useState(false);

  return (
    <div style={{ fontFamily: FB, background: '#dce3ea', minHeight: '100vh', padding: 20 }}>
      <Fonts />
      {/* Device toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
        <button onClick={() => setMobile(false)} style={tabBtn(!mobile)}><Monitor size={15} /> Desktop</button>
        <button onClick={() => setMobile(true)} style={tabBtn(mobile)}><Smartphone size={15} /> Mobile</button>
        {onboarded && <button onClick={() => setOnboarded(false)} style={{ ...tabBtn(false), marginLeft: 12 }}>↺ Ver onboarding</button>}
      </div>

      <div style={{
        margin: '0 auto', background: C.off, borderRadius: mobile ? 32 : 16, overflow: 'hidden',
        width: mobile ? 390 : '100%', maxWidth: mobile ? 390 : 1200, height: mobile ? 780 : 'auto',
        boxShadow: '0 24px 70px rgba(0,0,0,0.25)', border: mobile ? `10px solid ${C.navyDeep}` : 'none',
      }}>
        {!onboarded
          ? <Onboarding onDone={() => setOnboarded(true)} mobile={mobile} />
          : (mobile ? <MobileApp /> : <DesktopApp />)}
      </div>
      <p style={{ textAlign: 'center', fontSize: 12, color: C.g500, marginTop: 14 }}>Protótipo navegável BPOx · clique nos menus e nas tarefas para interagir</p>
    </div>
  );
}

const tabBtn = (active) => ({
  display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 8,
  border: 'none', background: active ? C.navy : C.white, color: active ? C.white : C.g500,
  fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: FB,
});

// ============ DESKTOP ============
function DesktopApp() {
  const [screen, setScreen] = useState('hoje');
  const [selEmp, setSelEmp] = useState(null);
  const [tarefas, setTarefas] = useState(initialTarefas);
  const [toast, setToast] = useState(null);
  const [openTask, setOpenTask] = useState(null); // { task, col } da ficha aberta

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const colOf = (taskId) => {
    for (const col of ['pendente', 'andamento', 'concluida']) {
      if (tarefas[col].some(t => t.id === taskId)) return col;
    }
    return null;
  };

  const completeTask = (colId, taskId) => {
    if (colId === 'concluida') return;
    setTarefas(prev => {
      const task = prev[colId].find(t => t.id === taskId);
      const nextCol = colId === 'pendente' ? 'andamento' : 'concluida';
      return {
        ...prev,
        [colId]: prev[colId].filter(t => t.id !== taskId),
        [nextCol]: [...prev[nextCol], task],
      };
    });
    showToast(colId === 'pendente' ? 'Tarefa movida para Em andamento ✓' : 'Tarefa concluída ✓');
  };

  // Move tarefa para uma coluna específica (usado pela ficha)
  const moveTask = (taskId, toCol) => {
    const fromCol = colOf(taskId);
    if (!fromCol || fromCol === toCol) return;
    setTarefas(prev => {
      const task = prev[fromCol].find(t => t.id === taskId);
      return { ...prev, [fromCol]: prev[fromCol].filter(t => t.id !== taskId), [toCol]: [...prev[toCol], task] };
    });
  };

  // Atualiza campos de uma tarefa (responsável, prazo, prioridade, horas, checklist...)
  const updateTask = (taskId, patch) => {
    const col = colOf(taskId);
    if (!col) return;
    setTarefas(prev => ({
      ...prev,
      [col]: prev[col].map(t => t.id === taskId ? { ...t, ...patch } : t),
    }));
    setOpenTask(prev => prev && prev.task.id === taskId ? { ...prev, task: { ...prev.task, ...patch } } : prev);
  };

  const abrirFicha = (task) => setOpenTask({ task });

  const nav = [
    { id: 'hoje', label: 'Hoje', icon: LayoutDashboard },
    { id: 'empresas', label: 'Empresas', icon: Building2 },
    { id: 'tarefas', label: 'Tarefas', icon: CheckSquare },
    { id: 'calendario', label: 'Calendário', icon: CalendarIcon },
    { id: 'relatorios', label: 'Produtividade', icon: BarChart3 },
    { id: 'planos', label: 'Planos', icon: Star },
  ];

  return (
    <div style={{ display: 'flex', minHeight: 720, position: 'relative' }}>
      {/* Sidebar */}
      <aside style={{ width: 220, background: C.navy, padding: '22px 0', flexShrink: 0 }}>
        <div style={{ padding: '0 22px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: C.emerald, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={19} color={C.navy} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ color: C.white, fontWeight: 800, fontSize: 17 }}>BPOx</div>
            <div style={{ color: C.emerald, fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 700 }}>BPO Financeiro</div>
          </div>
        </div>
        <nav>
          {nav.map(it => {
            const active = screen === it.id; const Icon = it.icon;
            return (
              <button key={it.id} onClick={() => { setScreen(it.id); setSelEmp(null); }} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 22px',
                background: active ? 'rgba(46,204,113,0.12)' : 'transparent', border: 'none',
                borderLeft: active ? `3px solid ${C.emerald}` : '3px solid transparent',
                color: active ? C.white : 'rgba(255,255,255,0.55)', cursor: 'pointer',
                fontSize: 13.5, fontWeight: active ? 700 : 500, fontFamily: FB,
              }}><Icon size={17} /> {it.label}</button>
            );
          })}
        </nav>
        <div style={{ position: 'absolute', bottom: 20, left: 18, width: 184, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 13, border: '1px solid rgba(46,204,113,0.2)' }}>
          <div style={{ fontSize: 10, color: C.emerald, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>Plano Pro</div>
          <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.6)', marginTop: 3 }}>Empresas ilimitadas</div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <header style={{ background: C.white, borderBottom: `1px solid ${C.g100}`, padding: '0 26px', height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <select style={{ fontFamily: FB, fontSize: 14, fontWeight: 600, color: C.navy, border: `1.5px solid ${C.g200}`, borderRadius: 8, padding: '7px 13px', background: C.white, cursor: 'pointer', outline: 'none' }}>
            <option>Todas as empresas</option>
            {EMPRESAS.map(e => <option key={e.id}>{e.nome}</option>)}
          </select>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', background: C.off, borderRadius: 8, padding: '7px 12px', gap: 8, width: 180 }}>
              <Search size={15} color={C.g400} /><span style={{ fontSize: 13, color: C.g400 }}>Buscar...</span>
            </div>
            <div style={{ position: 'relative' }}>
              <Bell size={19} color={C.g500} />
              <span style={{ position: 'absolute', top: -4, right: -4, width: 15, height: 15, borderRadius: 8, background: C.red, color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
            </div>
            <div style={{ width: 34, height: 34, borderRadius: 17, background: C.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13 }}>LO</div>
          </div>
        </header>

        <main style={{ padding: 26, flex: 1, overflow: 'auto', maxHeight: 658 }}>
          {selEmp ? <FichaEmpresa emp={selEmp} onBack={() => setSelEmp(null)} />
            : <>
              {screen === 'hoje' && <Hoje onComplete={completeTask} tarefas={tarefas} />}
              {screen === 'empresas' && <Empresas onSelect={setSelEmp} />}
              {screen === 'tarefas' && <Tarefas tarefas={tarefas} onComplete={completeTask} onOpen={abrirFicha} />}
              {screen === 'calendario' && <Calendario />}
              {screen === 'relatorios' && <Produtividade />}
              {screen === 'planos' && <Planos />}
            </>}
        </main>
      </div>

      {toast && (
        <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: C.navy, color: '#fff', padding: '13px 22px', borderRadius: 10, fontSize: 14, fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.25)', animation: 'toastIn 0.3s ease-out', display: 'flex', alignItems: 'center', gap: 8 }}>
          <CheckCircle2 size={17} color={C.emerald} /> {toast}
        </div>
      )}

      {openTask && (
        <FichaTarefa
          task={openTask.task}
          col={colOf(openTask.task.id)}
          onClose={() => setOpenTask(null)}
          onUpdate={updateTask}
          onMove={moveTask}
          onToast={showToast}
        />
      )}
    </div>
  );
}

function PageTitle({ title, subtitle, action, onAction }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
      <div>
        <h1 style={{ fontFamily: FD, fontSize: 26, fontWeight: 700, color: C.navy, margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ fontSize: 13.5, color: C.g500, margin: '4px 0 0' }}>{subtitle}</p>}
      </div>
      {action && (
        <button onClick={onAction} style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.emerald, color: C.white, border: 'none', borderRadius: 9, padding: '10px 17px', fontSize: 13.5, fontWeight: 700, fontFamily: FB, cursor: 'pointer', boxShadow: '0 4px 14px rgba(46,204,113,0.3)' }}>
          <Plus size={16} strokeWidth={2.5} /> {action}
        </button>
      )}
    </div>
  );
}

function Hoje({ onComplete, tarefas }) {
  const cards = [
    { label: 'Empresas ativas', value: '6', icon: Building2, color: C.navy, bg: '#EDF1F7' },
    { label: 'Tarefas hoje', value: String(tarefas.pendente.length + tarefas.andamento.length), icon: Clock, color: C.emerald, bg: C.emeraldPale },
    { label: 'Atrasadas', value: '1', icon: AlertTriangle, color: C.red, bg: C.redPale },
    { label: 'Concluídas no mês', value: '87%', icon: TrendingUp, color: C.gold, bg: '#FBF5EA' },
  ];
  const hoje = [...tarefas.pendente, ...tarefas.andamento].slice(0, 5);
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <PageTitle title="Bom dia, Leandro 👋" subtitle="Terça-feira, 10 de junho · Você tem tarefas para hoje" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 24 }}>
        {cards.map(c => { const Icon = c.icon; return (
          <div key={c.label} style={{ background: C.white, borderRadius: 14, padding: '18px 20px', border: `1px solid ${C.g100}` }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}><Icon size={19} color={c.color} /></div>
            <div style={{ fontFamily: FD, fontSize: 28, fontWeight: 800, color: C.navy, lineHeight: 1 }}>{c.value}</div>
            <div style={{ fontSize: 12, color: C.g500, marginTop: 5, fontWeight: 500 }}>{c.label}</div>
          </div>
        );})}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18 }}>
        <div style={{ background: C.white, borderRadius: 14, padding: 22, border: `1px solid ${C.g100}` }}>
          <h3 style={{ fontFamily: FD, fontSize: 17, fontWeight: 700, color: C.navy, margin: '0 0 16px' }}>Tarefas de hoje</h3>
          {hoje.map((t, i) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < hoje.length - 1 ? `1px solid ${C.g100}` : 'none' }}>
              <button onClick={() => onComplete(tarefas.pendente.includes(t) ? 'pendente' : 'andamento', t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex' }}>
                <Circle size={20} color={C.g400} />
              </button>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.g700 }}>{t.nome}</div>
                <div style={{ fontSize: 12, color: C.g400, marginTop: 2 }}>{t.emp}</div>
              </div>
              <span style={{ width: 7, height: 7, borderRadius: 4, background: PRIO[t.prio] }} />
              <div style={{ width: 27, height: 27, borderRadius: 14, background: C.off, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: C.g500 }}>{t.resp[0]}</div>
            </div>
          ))}
          <p style={{ fontSize: 12, color: C.g400, textAlign: 'center', marginTop: 14, marginBottom: 0 }}>👆 Clique no círculo para avançar a tarefa</p>
        </div>
        <div style={{ background: C.white, borderRadius: 14, padding: 22, border: `1px solid ${C.g100}` }}>
          <h3 style={{ fontFamily: FD, fontSize: 17, fontWeight: 700, color: C.navy, margin: '0 0 16px' }}>Alertas</h3>
          <Alert color={C.red} bg={C.redPale} icon={AlertTriangle} t="1 tarefa atrasada" d="TechFlow — conciliação vencida há 2 dias" />
          <Alert color={C.amber} bg={C.amberPale} icon={Clock} t="5 vencem em 3 dias" d="Relatórios mensais de junho" />
          <Alert color={C.green} bg={C.emeraldPale} icon={CheckCircle2} t="Auto Peças Veloz em dia" d="Todas as tarefas concluídas" last />
        </div>
      </div>
    </div>
  );
}
function Alert({ color, bg, icon: Icon, t, d, last }) {
  return (
    <div style={{ background: bg, borderRadius: 10, padding: 13, marginBottom: last ? 0 : 11, borderLeft: `3px solid ${color}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}><Icon size={14} color={color} /><span style={{ fontSize: 12.5, fontWeight: 700, color }}>{t}</span></div>
      <div style={{ fontSize: 11.5, color: C.g500 }}>{d}</div>
    </div>
  );
}

function Empresas({ onSelect }) {
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <PageTitle title="Empresas" subtitle="6 empresas sob sua gestão" action="Nova Empresa" />
      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.g100}`, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1.1fr 1.1fr 0.9fr', padding: '13px 22px', background: C.off, fontSize: 11, fontWeight: 700, color: C.g500, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          <span>Empresa</span><span>Responsável</span><span>Tarefas</span><span>Status</span><span style={{ textAlign: 'right' }}>Honorário</span>
        </div>
        {EMPRESAS.map(e => { const st = STATUS[e.status]; return (
          <div key={e.id} onClick={() => onSelect(e)} style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr 1.1fr 1.1fr 0.9fr', padding: '15px 22px', alignItems: 'center', borderTop: `1px solid ${C.g100}`, cursor: 'pointer' }}
            onMouseEnter={ev => ev.currentTarget.style.background = C.off} onMouseLeave={ev => ev.currentTarget.style.background = C.white}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 35, height: 35, borderRadius: 9, background: C.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{e.nome[0]}</div>
              <span style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{e.nome}</span>
            </div>
            <span style={{ fontSize: 13.5, color: C.g500 }}>{e.resp}</span>
            <span style={{ fontSize: 13 }}>{e.atras > 0 && <span style={{ color: C.red, fontWeight: 700 }}>{e.atras} atrasada · </span>}<span style={{ color: C.g500 }}>{e.pend} pend.</span></span>
            <span><span style={{ fontSize: 11.5, fontWeight: 700, color: st.color, background: st.bg, padding: '4px 11px', borderRadius: 20 }}>{st.label}</span></span>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.navy, textAlign: 'right', fontFamily: FD }}>R$ {e.honorario.toLocaleString('pt-BR')}</span>
          </div>
        );})}
      </div>
      <p style={{ fontSize: 12, color: C.g400, textAlign: 'center', marginTop: 14 }}>👆 Clique em uma empresa para ver a ficha completa</p>
    </div>
  );
}

function FichaEmpresa({ emp, onBack }) {
  const st = STATUS[emp.status];
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: 'none', color: C.g500, fontSize: 13.5, fontWeight: 600, cursor: 'pointer', marginBottom: 18, fontFamily: FB }}>
        <ArrowLeft size={17} /> Voltar para empresas
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
        <div style={{ width: 56, height: 56, borderRadius: 13, background: C.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22 }}>{emp.nome[0]}</div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: FD, fontSize: 25, fontWeight: 700, color: C.navy, margin: 0 }}>{emp.nome}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 5 }}>
            <span style={{ fontSize: 11.5, fontWeight: 700, color: st.color, background: st.bg, padding: '4px 11px', borderRadius: 20 }}>{st.label}</span>
            {emp.tags.map(t => <span key={t} style={{ fontSize: 11, color: C.g500, background: C.off, padding: '4px 10px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 4 }}><Tag size={10} /> {t}</span>)}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 11, color: C.g400, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }}>Honorário</div>
          <div style={{ fontFamily: FD, fontSize: 26, fontWeight: 800, color: C.green }}>R$ {emp.honorario.toLocaleString('pt-BR')}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 18 }}>
        <div style={{ background: C.white, borderRadius: 14, padding: 22, border: `1px solid ${C.g100}` }}>
          <h3 style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, color: C.navy, margin: '0 0 16px' }}>Dados</h3>
          {[
            { ic: FileText, l: 'CNPJ', v: emp.cnpj }, { ic: Mail, l: 'E-mail', v: emp.email },
            { ic: Phone, l: 'Telefone', v: emp.tel }, { ic: FileText, l: 'Regime', v: emp.regime },
            { ic: Building2, l: 'ERP', v: emp.erp }, { ic: CheckSquare, l: 'Responsável', v: emp.resp },
          ].map((row, i) => { const Ic = row.ic; return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '9px 0', borderBottom: i < 5 ? `1px solid ${C.g100}` : 'none' }}>
              <Ic size={15} color={C.g400} />
              <span style={{ fontSize: 12.5, color: C.g400, width: 80 }}>{row.l}</span>
              <span style={{ fontSize: 13, color: C.g700, fontWeight: 600 }}>{row.v}</span>
            </div>
          );})}
        </div>
        <div style={{ background: C.white, borderRadius: 14, padding: 22, border: `1px solid ${C.g100}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, color: C.navy, margin: 0 }}>Tarefas do mês</h3>
            <span style={{ fontSize: 12, color: C.emerald, fontWeight: 700, cursor: 'pointer' }}>Gerar tarefas →</span>
          </div>
          {[
            { n: 'Baixar extratos bancários', s: 'done' }, { n: 'Lançar contas a pagar', s: 'done' },
            { n: 'Conciliação bancária', s: 'doing' }, { n: 'Fluxo de caixa', s: 'todo' },
            { n: 'Relatório mensal', s: 'todo' }, { n: 'Reunião mensal', s: 'todo' },
          ].map((t, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 0', borderBottom: i < 5 ? `1px solid ${C.g100}` : 'none' }}>
              {t.s === 'done' ? <CheckCircle2 size={18} color={C.green} /> : t.s === 'doing' ? <Clock size={18} color={C.amber} /> : <Circle size={18} color={C.g400} />}
              <span style={{ fontSize: 13.5, color: t.s === 'done' ? C.g400 : C.g700, textDecoration: t.s === 'done' ? 'line-through' : 'none', fontWeight: 600 }}>{t.n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tarefas({ tarefas, onComplete, onOpen }) {
  const cols = [
    { id: 'pendente', title: 'Pendente', color: C.g400, items: tarefas.pendente },
    { id: 'andamento', title: 'Em andamento', color: C.amber, items: tarefas.andamento },
    { id: 'concluida', title: 'Concluída', color: C.green, items: tarefas.concluida },
  ];
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <PageTitle title="Tarefas" subtitle="Junho 2026" action="Gerar tarefas do mês" />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {cols.map(col => (
          <div key={col.id} style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.g100}`, padding: 15 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 15, padding: '0 4px' }}>
              <span style={{ width: 9, height: 9, borderRadius: 5, background: col.color }} />
              <span style={{ fontSize: 13.5, fontWeight: 700, color: C.navy }}>{col.title}</span>
              <span style={{ fontSize: 11.5, color: C.g400, background: C.off, borderRadius: 10, padding: '1px 9px', fontWeight: 700 }}>{col.items.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minHeight: 100 }}>
              {col.items.map(t => (
                <div key={t.id} onClick={() => onOpen(t)} style={{ background: col.id === 'concluida' ? C.off : C.white, border: `1px solid ${C.g200}`, borderRadius: 10, padding: 13, borderLeft: `3px solid ${PRIO[t.prio]}`, opacity: col.id === 'concluida' ? 0.7 : 1, cursor: 'pointer', transition: 'box-shadow .2s' }}
                  onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(0,0,0,0.08)'}
                  onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.g700, marginBottom: 8, textDecoration: col.id === 'concluida' ? 'line-through' : 'none' }}>{t.nome}</div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 11, color: C.g400 }}>{t.emp}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      {t.horasFeitas > 0 && (
                        <span style={{ fontSize: 10, fontWeight: 700, color: C.g500, display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={11} /> {t.horasFeitas}h</span>
                      )}
                      <span style={{ fontSize: 10, fontWeight: 700, color: t.prazo === 'Hoje' ? C.emerald : C.g400, background: t.prazo === 'Hoje' ? C.emeraldPale : C.off, padding: '2px 7px', borderRadius: 6 }}>{t.prazo}</span>
                      <div style={{ width: 23, height: 23, borderRadius: 12, background: C.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{t.resp[0]}</div>
                    </div>
                  </div>
                  {col.id !== 'concluida' && (
                    <button onClick={(e) => { e.stopPropagation(); onComplete(col.id, t.id); }} style={{ marginTop: 10, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: C.emeraldPale, color: C.green, border: 'none', borderRadius: 7, padding: '7px', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', fontFamily: FB }}>
                      {col.id === 'pendente' ? 'Iniciar' : 'Concluir'} <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, color: C.g400, textAlign: 'center', marginTop: 14 }}>👆 Clique no card para abrir a ficha · use o botão para avançar de coluna</p>
    </div>
  );
}

// ===== FICHA DA TAREFA (drawer lateral) com TIMESHEET =====
function FichaTarefa({ task, col, onClose, onUpdate, onMove, onToast }) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // segundos do cronômetro atual
  const [manualH, setManualH] = useState('');
  const [manualM, setManualM] = useState('');
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const fmtTimer = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, '0');
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
    const sec = String(s % 60).padStart(2, '0');
    return `${h}:${m}:${sec}`;
  };

  const pararEsalvar = () => {
    setRunning(false);
    const horas = elapsed / 3600;
    if (horas > 0) {
      onUpdate(task.id, { horasFeitas: Math.round((task.horasFeitas + horas) * 100) / 100 });
      onToast(`${fmtTimer(elapsed)} registrados na tarefa ✓`);
    }
    setElapsed(0);
  };

  const lancarManual = () => {
    const h = parseFloat(manualH) || 0;
    const m = parseFloat(manualM) || 0;
    const total = h + m / 60;
    if (total > 0) {
      onUpdate(task.id, { horasFeitas: Math.round((task.horasFeitas + total) * 100) / 100 });
      onToast(`${h}h ${m}min lançados na tarefa ✓`);
      setManualH(''); setManualM('');
    }
  };

  const toggleCheck = (idx) => {
    const next = task.checklist.map((c, i) => i === idx ? { ...c, d: !c.d } : c);
    onUpdate(task.id, { checklist: next });
  };

  const colInfo = { pendente: { l: 'Pendente', c: C.g400 }, andamento: { l: 'Em andamento', c: C.amber }, concluida: { l: 'Concluída', c: C.green } };
  const pct = task.horasEst > 0 ? Math.min(100, Math.round(task.horasFeitas / task.horasEst * 100)) : 0;

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(14,25,41,0.45)', zIndex: 200, display: 'flex', justifyContent: 'flex-end', animation: 'fadeIn 0.2s' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: 440, maxWidth: '100%', height: '100%', background: C.white, boxShadow: '-8px 0 40px rgba(0,0,0,0.2)', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ background: C.navy, padding: '20px 24px', position: 'sticky', top: 0, zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: 4, background: colInfo[col]?.c }} />
                <span style={{ fontSize: 11.5, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 0.5 }}>{colInfo[col]?.l}</span>
              </div>
              <h2 style={{ fontFamily: FD, fontSize: 20, fontWeight: 700, color: '#fff', margin: 0, lineHeight: 1.25 }}>{task.nome}</h2>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 5 }}>{task.emp}</div>
            </div>
            <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', flexShrink: 0 }}><X size={18} /></button>
          </div>
        </div>

        <div style={{ padding: 24, flex: 1 }}>
          {/* Atributos */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 22 }}>
            <Attr icon={User} label="Responsável" value={task.resp} />
            <Attr icon={CalendarIcon} label="Prazo" value={task.prazo} />
            <Attr icon={AlertTriangle} label="Prioridade" value={task.prio === 'alta' ? 'Alta' : task.prio === 'media' ? 'Média' : 'Baixa'} color={PRIO[task.prio]} />
            <Attr icon={Clock} label="Estimativa" value={`${task.horasEst}h`} />
          </div>

          {/* Descrição */}
          <FieldBlock title="Descrição">
            <p style={{ fontSize: 13.5, color: C.g700, lineHeight: 1.6, margin: 0 }}>{task.desc}</p>
          </FieldBlock>

          {/* Checklist (se houver) */}
          {task.checklist && task.checklist.length > 0 && (
            <FieldBlock title={`Checklist (${task.checklist.filter(c => c.d).length}/${task.checklist.length})`}>
              {task.checklist.map((c, i) => (
                <div key={i} onClick={() => toggleCheck(i)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', cursor: 'pointer' }}>
                  {c.d ? <CheckCircle2 size={18} color={C.green} /> : <Circle size={18} color={C.g400} />}
                  <span style={{ fontSize: 13.5, color: c.d ? C.g400 : C.g700, textDecoration: c.d ? 'line-through' : 'none' }}>{c.t}</span>
                </div>
              ))}
            </FieldBlock>
          )}

          {/* ===== TIMESHEET ===== */}
          <div style={{ background: C.off, borderRadius: 14, padding: 18, marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <Timer size={17} color={C.navy} />
              <span style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>Apontamento de horas</span>
            </div>

            {/* Barra de progresso vs estimativa */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: C.g500 }}>Trabalhado: <b style={{ color: C.navy }}>{task.horasFeitas}h</b> de {task.horasEst}h</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: pct > 100 ? C.red : C.green }}>{pct}%</span>
              </div>
              <div style={{ height: 8, background: C.g100, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${Math.min(100, pct)}%`, background: pct > 100 ? C.red : C.emerald, borderRadius: 4, transition: 'width .3s' }} />
              </div>
            </div>

            {/* Cronômetro */}
            <div style={{ background: C.white, borderRadius: 10, padding: 16, marginBottom: 12, border: `1px solid ${C.g100}`, textAlign: 'center' }}>
              <div style={{ fontFamily: FD, fontSize: 32, fontWeight: 800, color: running ? C.green : C.navy, letterSpacing: 1, marginBottom: 12, fontVariantNumeric: 'tabular-nums' }}>{fmtTimer(elapsed)}</div>
              {!running ? (
                <button onClick={() => setRunning(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.emerald, color: '#fff', border: 'none', borderRadius: 9, padding: '11px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FB, boxShadow: '0 4px 12px rgba(46,204,113,0.3)' }}>
                  <Play size={16} /> Iniciar cronômetro
                </button>
              ) : (
                <button onClick={pararEsalvar} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.navy, color: '#fff', border: 'none', borderRadius: 9, padding: '11px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FB }}>
                  <Pause size={16} /> Parar e registrar
                </button>
              )}
            </div>

            {/* Lançamento manual */}
            <div style={{ background: C.white, borderRadius: 10, padding: 14, border: `1px solid ${C.g100}` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.g500, marginBottom: 10 }}>Ou lance manualmente:</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <input value={manualH} onChange={e => setManualH(e.target.value)} placeholder="0" inputMode="numeric"
                    style={{ width: '100%', padding: '10px 32px 10px 12px', fontFamily: FB, fontSize: 14, color: C.navy, fontWeight: 700, border: `1.5px solid ${C.g200}`, borderRadius: 8, outline: 'none' }} />
                  <span style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: C.g400, fontWeight: 600 }}>h</span>
                </div>
                <div style={{ position: 'relative', flex: 1 }}>
                  <input value={manualM} onChange={e => setManualM(e.target.value)} placeholder="0" inputMode="numeric"
                    style={{ width: '100%', padding: '10px 38px 10px 12px', fontFamily: FB, fontSize: 14, color: C.navy, fontWeight: 700, border: `1.5px solid ${C.g200}`, borderRadius: 8, outline: 'none' }} />
                  <span style={{ position: 'absolute', right: 11, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: C.g400, fontWeight: 600 }}>min</span>
                </div>
                <button onClick={lancarManual} style={{ background: C.emeraldPale, color: C.green, border: 'none', borderRadius: 8, padding: '10px 16px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: FB, flexShrink: 0 }}>Lançar</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer: mover status */}
        <div style={{ padding: 18, borderTop: `1px solid ${C.g100}`, position: 'sticky', bottom: 0, background: C.white }}>
          <div style={{ fontSize: 11.5, color: C.g400, marginBottom: 8, fontWeight: 600 }}>MOVER PARA</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['pendente', 'andamento', 'concluida'].map(c => (
              <button key={c} onClick={() => { onMove(task.id, c); onToast(`Movida para ${colInfo[c].l} ✓`); }}
                disabled={c === col}
                style={{ flex: 1, padding: '10px', borderRadius: 8, border: c === col ? `1.5px solid ${colInfo[c].c}` : `1.5px solid ${C.g200}`, background: c === col ? C.off : C.white, color: c === col ? colInfo[c].c : C.g500, fontSize: 12, fontWeight: 700, cursor: c === col ? 'default' : 'pointer', fontFamily: FB }}>
                {colInfo[c].l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Attr({ icon: Icon, label, value, color }) {
  return (
    <div style={{ background: C.off, borderRadius: 10, padding: '12px 14px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
        <Icon size={13} color={C.g400} />
        <span style={{ fontSize: 11, color: C.g400, fontWeight: 600 }}>{label}</span>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, color: color || C.navy }}>{value}</div>
    </div>
  );
}

function FieldBlock({ title, children }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: C.g500, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

function Calendario() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekdays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <PageTitle title="Calendário de Obrigações" subtitle="Junho 2026" action="Gerar tarefas do mês" />
      <div style={{ display: 'flex', gap: 16, marginBottom: 16, flexWrap: 'wrap' }}>
        {[{ c: C.green, l: 'Concluída' }, { c: C.emerald, l: 'Hoje' }, { c: C.amber, l: 'Vence em 3 dias' }, { c: C.red, l: 'Atrasada' }, { c: C.g400, l: 'Futura' }].map(x => (
          <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: 5, background: x.c }} /><span style={{ fontSize: 12, color: C.g500 }}>{x.l}</span></div>
        ))}
      </div>
      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.g100}`, padding: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 7 }}>
          {weekdays.map(w => <div key={w} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: C.g400, textTransform: 'uppercase', paddingBottom: 6 }}>{w}</div>)}
          {days.map(d => {
            const ev = CAL_EVENTS[d] || []; const isToday = d === 10;
            return (
              <div key={d} style={{ minHeight: 66, borderRadius: 9, padding: 7, background: isToday ? C.emeraldPale : C.off, border: isToday ? `1.5px solid ${C.emerald}` : `1px solid ${C.g100}` }}>
                <div style={{ fontSize: 12, fontWeight: isToday ? 800 : 600, color: isToday ? C.green : C.g500, marginBottom: 5 }}>{d}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>{ev.map((e, i) => <span key={i} style={{ width: 6, height: 6, borderRadius: 3, background: CAL_C[e] }} />)}</div>
                {ev.length > 0 && <div style={{ fontSize: 9, color: C.g400, marginTop: 3 }}>{ev.length} tarefa{ev.length > 1 ? 's' : ''}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Produtividade() {
  const membros = [
    { nome: 'Maria', tarefas: 28, concl: 26, pct: 93 },
    { nome: 'João', tarefas: 31, concl: 25, pct: 81 },
    { nome: 'Pedro', tarefas: 19, concl: 18, pct: 95 },
  ];
  const maxH = 140;
  const dados = [62, 71, 58, 80, 74, 88, 67]; // tarefas concluídas por semana (exemplo)
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <PageTitle title="Produtividade" subtitle="Junho 2026 · visão geral da equipe" />
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 18 }}>
        <div style={{ background: C.white, borderRadius: 14, padding: 22, border: `1px solid ${C.g100}` }}>
          <h3 style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, color: C.navy, margin: '0 0 20px' }}>Tarefas concluídas por semana</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: maxH, padding: '0 8px' }}>
            {dados.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: '100%', height: (v / 100) * maxH, background: `linear-gradient(180deg, ${C.emerald}, ${C.green})`, borderRadius: '6px 6px 0 0', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#fff' }}>{v}</span>
                </div>
                <span style={{ fontSize: 10, color: C.g400 }}>S{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: C.white, borderRadius: 14, padding: 22, border: `1px solid ${C.g100}` }}>
          <h3 style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, color: C.navy, margin: '0 0 18px' }}>Por colaborador</h3>
          {membros.map((m, i) => (
            <div key={m.nome} style={{ marginBottom: i < 2 ? 18 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: C.g700 }}>{m.nome}</span>
                <span style={{ fontSize: 12.5, color: C.g500 }}>{m.concl}/{m.tarefas} · <b style={{ color: m.pct >= 90 ? C.green : C.amber }}>{m.pct}%</b></span>
              </div>
              <div style={{ height: 8, background: C.g100, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${m.pct}%`, background: m.pct >= 90 ? C.green : C.amber, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Planos() {
  const [clientes, setClientes] = useState(50);
  const playbpo = clientes * 15;
  const economia = (playbpo - 197) * 12;
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <PageTitle title="Planos" subtitle="Preço fixo. Empresas ilimitadas. Cresça sem medo da conta." />
      {/* Calculadora de economia */}
      <div style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyDeep})`, borderRadius: 16, padding: 26, marginBottom: 24 }}>
        <h3 style={{ fontFamily: FD, fontSize: 19, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>Quanto você economiza?</h3>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: '0 0 20px' }}>Compare com ferramentas que cobram por CNPJ</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Quantos clientes de BPO você tem? <b style={{ color: C.emerald, fontSize: 16 }}>{clientes}</b></label>
            <input type="range" min="5" max="200" value={clientes} onChange={e => setClientes(+e.target.value)} style={{ width: '100%', marginTop: 10, accentColor: C.emerald }} />
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Cobrança por CNPJ</div>
              <div style={{ fontFamily: FD, fontSize: 26, fontWeight: 800, color: '#fff', textDecoration: 'line-through', opacity: 0.6 }}>R$ {playbpo.toLocaleString('pt-BR')}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>/mês</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: C.emerald, textTransform: 'uppercase', letterSpacing: 0.5 }}>BPOx Pro</div>
              <div style={{ fontFamily: FD, fontSize: 26, fontWeight: 800, color: C.emerald }}>R$ 197</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)' }}>/mês fixo</div>
            </div>
          </div>
        </div>
        {economia > 0 && (
          <div style={{ marginTop: 18, background: 'rgba(46,204,113,0.12)', borderRadius: 10, padding: '12px 18px', border: '1px solid rgba(46,204,113,0.25)' }}>
            <span style={{ fontSize: 14, color: '#fff' }}>Você economiza </span>
            <b style={{ fontSize: 18, color: C.emerald, fontFamily: FD }}>R$ {economia.toLocaleString('pt-BR')}</b>
            <span style={{ fontSize: 14, color: '#fff' }}> por ano com o BPOx</span>
          </div>
        )}
      </div>
      {/* Planos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
        {[
          { n: 'Starter', p: 97, d: 'até 15 empresas · 2 usuários', f: ['Painel de empresas', 'Tarefas e checklists', 'Calendário de obrigações'], hl: false },
          { n: 'Pro', p: 197, d: 'ilimitado · 5 usuários', f: ['Tudo do Starter', 'Empresas ilimitadas', 'Timesheet e rentabilidade', 'Relatório de produtividade'], hl: true },
          { n: 'Business', p: 347, d: 'ilimitado · usuários ilimitados', f: ['Tudo do Pro', 'Integração Omie', 'API e webhooks', 'Suporte prioritário'], hl: false },
        ].map(pl => (
          <div key={pl.n} style={{ background: C.white, borderRadius: 14, border: pl.hl ? `2px solid ${C.emerald}` : `1px solid ${C.g200}`, padding: 24, position: 'relative', boxShadow: pl.hl ? '0 8px 24px rgba(46,204,113,0.15)' : 'none' }}>
            {pl.hl && <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', background: C.emerald, color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', padding: '4px 14px', borderRadius: 12 }}>Mais popular</div>}
            <div style={{ fontFamily: FD, fontSize: 19, fontWeight: 700, color: C.navy }}>{pl.n}</div>
            <div style={{ margin: '10px 0 4px' }}><span style={{ fontFamily: FD, fontSize: 34, fontWeight: 800, color: C.navy }}>R$ {pl.p}</span><span style={{ fontSize: 13, color: C.g400 }}>/mês</span></div>
            <div style={{ fontSize: 12, color: C.g500, marginBottom: 18 }}>{pl.d}</div>
            <button style={{ width: '100%', padding: 12, borderRadius: 9, border: pl.hl ? 'none' : `1.5px solid ${C.g200}`, background: pl.hl ? C.emerald : C.white, color: pl.hl ? '#fff' : C.navy, fontWeight: 700, fontSize: 14, cursor: 'pointer', fontFamily: FB, marginBottom: 18, boxShadow: pl.hl ? '0 4px 14px rgba(46,204,113,0.3)' : 'none' }}>Assinar</button>
            {pl.f.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 0', fontSize: 13, color: C.g700 }}>
                <CheckCircle2 size={16} color={C.emerald} /> {f}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ MOBILE ============
function MobileApp() {
  const [screen, setScreen] = useState('hoje');
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: C.off }}>
      {/* Status bar fake */}
      <div style={{ background: C.navy, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>9:41</span>
        <span style={{ color: '#fff', fontSize: 11 }}>📶 🔋</span>
      </div>
      {/* Header */}
      <div style={{ background: C.navy, padding: '12px 18px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: C.emerald, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={17} color={C.navy} strokeWidth={2.5} /></div>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: 16 }}>BPOx</span>
        </div>
        <Bell size={19} color="rgba(255,255,255,0.7)" />
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {screen === 'hoje' && <MobHoje />}
        {screen === 'empresas' && <MobEmpresas />}
        {screen === 'calendario' && <MobCalendario />}
      </div>

      {/* Bottom nav */}
      <div style={{ background: C.white, borderTop: `1px solid ${C.g200}`, display: 'flex', padding: '8px 0 14px' }}>
        {[{ id: 'hoje', label: 'Hoje', icon: LayoutDashboard }, { id: 'empresas', label: 'Empresas', icon: Building2 }, { id: 'calendario', label: 'Agenda', icon: CalendarIcon }].map(it => {
          const active = screen === it.id; const Icon = it.icon;
          return (
            <button key={it.id} onClick={() => setScreen(it.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', color: active ? C.emerald : C.g400 }}>
              <Icon size={21} /><span style={{ fontSize: 10, fontWeight: active ? 700 : 500, fontFamily: FB }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function MobHoje() {
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <h2 style={{ fontFamily: FD, fontSize: 21, fontWeight: 700, color: C.navy, margin: '0 0 3px' }}>Bom dia, Leandro 👋</h2>
      <p style={{ fontSize: 12.5, color: C.g500, margin: '0 0 16px' }}>4 tarefas para hoje</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
        {[{ v: '4', l: 'Hoje', c: C.emerald, bg: C.emeraldPale }, { v: '1', l: 'Atrasadas', c: C.red, bg: C.redPale }].map(x => (
          <div key={x.l} style={{ background: C.white, borderRadius: 12, padding: 14, border: `1px solid ${C.g100}` }}>
            <div style={{ fontFamily: FD, fontSize: 26, fontWeight: 800, color: x.c }}>{x.v}</div>
            <div style={{ fontSize: 11.5, color: C.g500 }}>{x.l}</div>
          </div>
        ))}
      </div>
      <h3 style={{ fontFamily: FD, fontSize: 15, fontWeight: 700, color: C.navy, margin: '0 0 12px' }}>Tarefas de hoje</h3>
      {[{ n: 'Baixar extratos', e: 'TechFlow', p: 'alta' }, { n: 'Fluxo de caixa', e: 'Construtora Alfa', p: 'alta' }, { n: 'Lançar contas', e: 'Restaurante Sabor', p: 'media' }, { n: 'Conciliação', e: 'Clínica Bem Viver', p: 'media' }].map((t, i) => (
        <div key={i} style={{ background: C.white, borderRadius: 11, padding: 14, marginBottom: 9, border: `1px solid ${C.g100}`, borderLeft: `3px solid ${PRIO[t.p]}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <Circle size={19} color={C.g400} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.g700 }}>{t.n}</div>
            <div style={{ fontSize: 11.5, color: C.g400 }}>{t.e}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MobEmpresas() {
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <h2 style={{ fontFamily: FD, fontSize: 21, fontWeight: 700, color: C.navy, margin: '0 0 16px' }}>Empresas</h2>
      {EMPRESAS.map(e => { const st = STATUS[e.status]; return (
        <div key={e.id} style={{ background: C.white, borderRadius: 12, padding: 14, marginBottom: 10, border: `1px solid ${C.g100}`, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: C.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14 }}>{e.nome[0]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: C.navy }}>{e.nome}</div>
            <div style={{ fontSize: 11.5, color: C.g400 }}>{e.resp} · {e.pend} pendentes</div>
          </div>
          <span style={{ fontSize: 10.5, fontWeight: 700, color: st.color, background: st.bg, padding: '3px 9px', borderRadius: 20 }}>{st.label}</span>
        </div>
      );})}
    </div>
  );
}

function MobCalendario() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <h2 style={{ fontFamily: FD, fontSize: 21, fontWeight: 700, color: C.navy, margin: '0 0 4px' }}>Agenda</h2>
      <p style={{ fontSize: 12.5, color: C.g500, margin: '0 0 16px' }}>Junho 2026</p>
      <div style={{ background: C.white, borderRadius: 12, padding: 12, border: `1px solid ${C.g100}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 5 }}>
          {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((w, i) => <div key={i} style={{ textAlign: 'center', fontSize: 10, fontWeight: 700, color: C.g400, paddingBottom: 5 }}>{w}</div>)}
          {days.map(d => {
            const ev = CAL_EVENTS[d] || []; const isToday = d === 10;
            return (
              <div key={d} style={{ aspectRatio: '1', borderRadius: 7, padding: 4, background: isToday ? C.emeraldPale : C.off, border: isToday ? `1.5px solid ${C.emerald}` : 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: isToday ? 800 : 500, color: isToday ? C.green : C.g500 }}>{d}</span>
                <div style={{ display: 'flex', gap: 2, marginTop: 2 }}>{ev.slice(0, 3).map((e, i) => <span key={i} style={{ width: 4, height: 4, borderRadius: 2, background: CAL_C[e] }} />)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============ ONBOARDING ============
function Onboarding({ onDone, mobile }) {
  const [step, setStep] = useState(1);
  const total = 4;
  return (
    <div style={{ minHeight: mobile ? '100%' : 720, background: `linear-gradient(135deg, ${C.navy}, ${C.navyDeep})`, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 460, background: C.white, borderRadius: 18, padding: mobile ? 26 : 38 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 26 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: C.emerald, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={19} color={C.navy} strokeWidth={2.5} /></div>
          <div style={{ fontWeight: 800, fontSize: 18, color: C.navy }}>BPOx</div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginBottom: 26 }}>
          {Array.from({ length: total }).map((_, i) => <div key={i} style={{ flex: 1, height: 5, borderRadius: 3, background: i < step ? C.emerald : C.g200 }} />)}
        </div>
        {step === 1 && <OStep t="Bem-vindo ao BPOx!" s="Vamos configurar seu escritório em 1 minuto."><OField l="Nome do escritório" p="Ex: Oliveira Contabilidade" /><OField l="Logo (opcional)" p="Clique para enviar" up /></OStep>}
        {step === 2 && <OStep t="Adicione sua primeira empresa" s="Cadastre um cliente para começar."><OField l="Razão social" p="Ex: Padaria Estrela Ltda" /><div style={{ display: 'flex', gap: 10 }}><OField l="CNPJ" p="00.000.000/0001-00" /><OField l="Honorário" p="R$ 890" /></div></OStep>}
        {step === 3 && <OStep t="Escolha um modelo de checklist" s="Geramos as tarefas recorrentes automaticamente.">{[{ n: 'BPO Essencial', d: '9 tarefas', sel: false }, { n: 'BPO Completo', d: '17 tarefas · + DRE, reunião', sel: true }, { n: 'BPO Premium', d: '22 tarefas · + advisory', sel: false }].map(t => (
          <div key={t.n} style={{ border: `2px solid ${t.sel ? C.emerald : C.g200}`, background: t.sel ? C.emeraldPale : C.white, borderRadius: 11, padding: 14, marginBottom: 9, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 19, height: 19, borderRadius: 10, border: `2px solid ${t.sel ? C.emerald : C.g400}`, background: t.sel ? C.emerald : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{t.sel && <CheckCircle2 size={13} color="#fff" />}</div>
            <div><div style={{ fontSize: 13.5, fontWeight: 700, color: C.navy }}>{t.n}</div><div style={{ fontSize: 11.5, color: C.g500 }}>{t.d}</div></div>
          </div>
        ))}</OStep>}
        {step === 4 && <OStep t="Tudo pronto! 🎉" s="Geramos suas tarefas de junho. Veja seu calendário."><div style={{ background: C.emeraldPale, borderRadius: 12, padding: 20, textAlign: 'center' }}><CheckCircle2 size={42} color={C.green} style={{ margin: '0 auto 10px' }} /><div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>17 tarefas criadas</div><div style={{ fontSize: 12.5, color: C.g500, marginTop: 4 }}>BPO Completo · Junho 2026</div></div></OStep>}
        <div style={{ display: 'flex', gap: 11, marginTop: 26 }}>
          {step > 1 && <button onClick={() => setStep(step - 1)} style={{ padding: '12px 20px', borderRadius: 10, border: `1.5px solid ${C.g200}`, background: C.white, color: C.g500, fontWeight: 600, fontSize: 14, cursor: 'pointer', fontFamily: FB }}>Voltar</button>}
          <button onClick={() => step < total ? setStep(step + 1) : onDone()} style={{ flex: 1, padding: 12, borderRadius: 10, border: 'none', background: C.emerald, color: '#fff', fontWeight: 700, fontSize: 14.5, cursor: 'pointer', fontFamily: FB, boxShadow: '0 4px 14px rgba(46,204,113,0.3)' }}>{step < total ? 'Continuar' : 'Ir para o app →'}</button>
        </div>
      </div>
    </div>
  );
}
function OStep({ t, s, children }) {
  return <div><h2 style={{ fontFamily: FD, fontSize: 22, fontWeight: 700, color: C.navy, margin: '0 0 7px' }}>{t}</h2><p style={{ fontSize: 13.5, color: C.g500, margin: '0 0 22px', lineHeight: 1.5 }}>{s}</p>{children}</div>;
}
function OField({ l, p, up }) {
  return <div style={{ marginBottom: 14, flex: 1 }}><label style={{ fontSize: 11.5, fontWeight: 700, color: C.g500, textTransform: 'uppercase', letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>{l}</label><div style={{ border: `1.5px solid ${C.g200}`, borderRadius: 9, padding: '11px 13px', fontSize: 13.5, color: C.g400, background: up ? C.off : C.white, cursor: up ? 'pointer' : 'text', textAlign: up ? 'center' : 'left' }}>{p}</div></div>;
}
