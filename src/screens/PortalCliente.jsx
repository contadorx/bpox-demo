import React, { useState } from 'react';
import { LayoutDashboard, FileText, Wallet, CheckCircle2, Clock, Circle, Upload, Download, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, FolderOpen, Bell, Calendar, Building2 } from 'lucide-react';

// BPOx — Portal do Cliente (visão do cliente final do escritório de BPO)
// Paleta esmeralda. Pensado para o EMPRESÁRIO leigo, não para o contador.

const C = {
  navy: '#1B2A4A', navyDeep: '#0E1929', emerald: '#2ECC71', green: '#27AE60',
  emeraldPale: '#EAFAF1', gold: '#C4983E', white: '#FFFFFF', off: '#F7F9FB',
  g100: '#EEF1F4', g200: '#E2E8F0', g400: '#94A3B8', g500: '#64748B', g700: '#334155',
  amber: '#F59E0B', amberPale: '#FEF3C7', red: '#EF4444', redPale: '#FEE2E2',
};
const FD = "'Playfair Display', Georgia, serif";
const FB = "'Source Sans 3', -apple-system, sans-serif";

function Fonts() {
  return <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Source+Sans+3:wght@300;400;500;600;700;800&display=swap');
  *{box-sizing:border-box} ::-webkit-scrollbar{width:8px} ::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>;
}

export default function PortalCliente() {
  const [screen, setScreen] = useState('inicio');
  const [view, setView] = useState('desktop');

  return (
    <div style={{ fontFamily: FB, background: '#dce3ea', minHeight: '100vh', padding: 20 }}>
      <Fonts />
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 14 }}>
        <button onClick={() => setView('desktop')} style={tb(view === 'desktop')}>Desktop</button>
        <button onClick={() => setView('mobile')} style={tb(view === 'mobile')}>Mobile</button>
      </div>

      {view === 'desktop' ? (
        <div style={{ margin: '0 auto', maxWidth: 1000, background: C.off, borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 70px rgba(0,0,0,0.22)' }}>
          <TopBar />
          <div style={{ display: 'flex', minHeight: 600 }}>
            <Side screen={screen} setScreen={setScreen} />
            <main style={{ flex: 1, padding: 28, overflow: 'auto', maxHeight: 600 }}>
              {screen === 'inicio' && <Inicio />}
              {screen === 'financeiro' && <Financeiro />}
              {screen === 'andamento' && <Andamento />}
              {screen === 'documentos' && <Documentos />}
            </main>
          </div>
        </div>
      ) : (
        <Mobile screen={screen} setScreen={setScreen} />
      )}
      <p style={{ textAlign: 'center', fontSize: 12, color: C.g500, marginTop: 14 }}>Portal do Cliente BPOx · o que o cliente final do escritório vê · navegue pelos menus</p>
    </div>
  );
}

const tb = (a) => ({ padding: '8px 18px', borderRadius: 8, border: 'none', background: a ? C.navy : C.white, color: a ? '#fff' : C.g500, fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: FB });

function TopBar() {
  return (
    <div style={{ background: C.white, borderBottom: `1px solid ${C.g100}`, height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Logo do escritório (white label) */}
        <div style={{ width: 36, height: 36, borderRadius: 9, background: C.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15 }}>OC</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>Oliveira Contabilidade</div>
          <div style={{ fontSize: 11, color: C.g400 }}>Portal do Cliente</div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <Bell size={19} color={C.g500} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 17, background: C.emerald, color: C.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>PE</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Padaria Estrela</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Side({ screen, setScreen }) {
  const items = [
    { id: 'inicio', label: 'Início', icon: LayoutDashboard },
    { id: 'financeiro', label: 'Meu Financeiro', icon: Wallet },
    { id: 'andamento', label: 'Andamento', icon: CheckCircle2 },
    { id: 'documentos', label: 'Documentos', icon: FolderOpen },
  ];
  return (
    <aside style={{ width: 210, background: C.white, borderRight: `1px solid ${C.g100}`, padding: '20px 0' }}>
      {items.map(it => {
        const active = screen === it.id; const Icon = it.icon;
        return (
          <button key={it.id} onClick={() => setScreen(it.id)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px',
            background: active ? C.emeraldPale : 'transparent', border: 'none',
            borderRight: active ? `3px solid ${C.emerald}` : '3px solid transparent',
            color: active ? C.green : C.g500, cursor: 'pointer', fontSize: 14, fontWeight: active ? 700 : 500, fontFamily: FB,
          }}><Icon size={18} /> {it.label}</button>
        );
      })}
    </aside>
  );
}

// ---------- INÍCIO ----------
function Inicio() {
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <h1 style={{ fontFamily: FD, fontSize: 26, fontWeight: 800, color: C.navy, margin: 0 }}>Olá, Padaria Estrela 👋</h1>
      <p style={{ fontSize: 14, color: C.g500, margin: '4px 0 24px' }}>Aqui está o resumo do seu negócio em junho</p>

      {/* destaque financeiro */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 22 }}>
        <BigCard label="Saldo em caixa" value="R$ 48.250" trend="+12%" up icon={Wallet} />
        <BigCard label="Entradas no mês" value="R$ 86.400" trend="+8%" up icon={ArrowUpRight} />
        <BigCard label="Saídas no mês" value="R$ 61.180" trend="-3%" up={false} icon={ArrowDownRight} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        {/* andamento resumido */}
        <Panel title="Como está seu mês">
          {[
            { n: 'Conciliação bancária', s: 'done' },
            { n: 'Contas a pagar lançadas', s: 'done' },
            { n: 'Relatório mensal', s: 'doing' },
            { n: 'Fechamento de junho', s: 'todo' },
          ].map((t, i) => (
            <Row key={i} last={i === 3}>
              {t.s === 'done' ? <CheckCircle2 size={18} color={C.green} /> : t.s === 'doing' ? <Clock size={18} color={C.amber} /> : <Circle size={18} color={C.g400} />}
              <span style={{ fontSize: 13.5, color: t.s === 'done' ? C.g400 : C.g700, fontWeight: 600 }}>{t.n}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 700, color: t.s === 'done' ? C.green : t.s === 'doing' ? C.amber : C.g400 }}>
                {t.s === 'done' ? 'Concluído' : t.s === 'doing' ? 'Em andamento' : 'A fazer'}
              </span>
            </Row>
          ))}
        </Panel>

        {/* pendências do cliente */}
        <Panel title="O escritório precisa de você">
          <div style={{ background: C.amberPale, borderRadius: 10, padding: 16, borderLeft: `3px solid ${C.amber}`, marginBottom: 12 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#B45309', marginBottom: 4 }}>📄 2 documentos pendentes</div>
            <div style={{ fontSize: 12.5, color: C.g500 }}>Envie as notas de compra de junho para o fechamento.</div>
            <button style={{ marginTop: 10, background: C.amber, color: '#fff', border: 'none', borderRadius: 7, padding: '8px 14px', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: FB }}>Enviar agora</button>
          </div>
          <div style={{ background: C.emeraldPale, borderRadius: 10, padding: 16, borderLeft: `3px solid ${C.green}` }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: C.green, marginBottom: 4 }}>✓ Tudo certo com seus impostos</div>
            <div style={{ fontSize: 12.5, color: C.g500 }}>Nenhuma pendência fiscal este mês.</div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function BigCard({ label, value, trend, up, icon: Icon }) {
  return (
    <div style={{ background: C.white, borderRadius: 14, padding: 20, border: `1px solid ${C.g100}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: 9, background: C.emeraldPale, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={18} color={C.green} /></div>
        <span style={{ fontSize: 11.5, fontWeight: 700, color: up ? C.green : C.red, display: 'flex', alignItems: 'center', gap: 2 }}>
          {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />} {trend}
        </span>
      </div>
      <div style={{ fontFamily: FD, fontSize: 24, fontWeight: 800, color: C.navy, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: C.g500, marginTop: 5 }}>{label}</div>
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div style={{ background: C.white, borderRadius: 14, padding: 22, border: `1px solid ${C.g100}` }}>
      <h3 style={{ fontFamily: FD, fontSize: 16, fontWeight: 700, color: C.navy, margin: '0 0 14px' }}>{title}</h3>
      {children}
    </div>
  );
}
function Row({ children, last }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '10px 0', borderBottom: last ? 'none' : `1px solid ${C.g100}` }}>{children}</div>;
}

// ---------- FINANCEIRO ----------
function Financeiro() {
  const meses = [
    { m: 'Jan', e: 72, s: 58 }, { m: 'Fev', e: 68, s: 55 }, { m: 'Mar', e: 79, s: 61 },
    { m: 'Abr', e: 74, s: 59 }, { m: 'Mai', e: 81, s: 63 }, { m: 'Jun', e: 86, s: 61 },
  ];
  const max = 100;
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <h1 style={{ fontFamily: FD, fontSize: 26, fontWeight: 800, color: C.navy, margin: 0 }}>Meu Financeiro</h1>
      <p style={{ fontSize: 14, color: C.g500, margin: '4px 0 24px' }}>Junho 2026 · atualizado pelo seu escritório</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 22 }}>
        <BigCard label="Receita" value="R$ 86.400" trend="+8%" up icon={ArrowUpRight} />
        <BigCard label="Despesa" value="R$ 61.180" trend="-3%" up={false} icon={ArrowDownRight} />
        <BigCard label="Resultado" value="R$ 25.220" trend="+21%" up icon={TrendingUp} />
      </div>

      {/* gráfico entradas x saídas */}
      <Panel title="Entradas e saídas — últimos 6 meses">
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, height: 160, padding: '10px 8px 0' }}>
          {meses.map(mo => (
            <div key={mo.m} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 130 }}>
                <div style={{ width: 14, height: (mo.e / max) * 130, background: C.emerald, borderRadius: '4px 4px 0 0' }} />
                <div style={{ width: 14, height: (mo.s / max) * 130, background: C.g200, borderRadius: '4px 4px 0 0' }} />
              </div>
              <span style={{ fontSize: 11, color: C.g400 }}>{mo.m}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginTop: 14 }}>
          <Legend c={C.emerald} l="Entradas" /><Legend c={C.g200} l="Saídas" />
        </div>
      </Panel>

      {/* para onde foi o dinheiro */}
      <div style={{ marginTop: 18 }}>
        <Panel title="Para onde foi o dinheiro">
          {[
            { cat: 'Fornecedores', v: 'R$ 28.400', pct: 46 },
            { cat: 'Folha de pagamento', v: 'R$ 18.200', pct: 30 },
            { cat: 'Impostos', v: 'R$ 9.180', pct: 15 },
            { cat: 'Outros', v: 'R$ 5.400', pct: 9 },
          ].map((x, i) => (
            <div key={i} style={{ marginBottom: i === 3 ? 0 : 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: C.g700, fontWeight: 600 }}>{x.cat}</span>
                <span style={{ fontSize: 13, color: C.navy, fontWeight: 700, fontFamily: FD }}>{x.v}</span>
              </div>
              <div style={{ height: 8, background: C.g100, borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${x.pct}%`, background: C.emerald, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </Panel>
      </div>
    </div>
  );
}
function Legend({ c, l }) {
  return <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 11, height: 11, borderRadius: 3, background: c }} /><span style={{ fontSize: 12, color: C.g500 }}>{l}</span></div>;
}

// ---------- ANDAMENTO ----------
function Andamento() {
  const grupos = [
    { titulo: 'Concluído', cor: C.green, itens: ['Baixar extratos bancários', 'Lançar contas a pagar', 'Lançar contas a receber', 'Conciliação bancária'] },
    { titulo: 'Em andamento', cor: C.amber, itens: ['Relatório mensal de junho', 'Fluxo de caixa atualizado'] },
    { titulo: 'A fazer', cor: C.g400, itens: ['Fechamento do mês', 'Reunião de resultados'] },
  ];
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <h1 style={{ fontFamily: FD, fontSize: 26, fontWeight: 800, color: C.navy, margin: 0 }}>Andamento do mês</h1>
      <p style={{ fontSize: 14, color: C.g500, margin: '4px 0 24px' }}>Acompanhe o que seu escritório está fazendo por você</p>
      {grupos.map((g, gi) => (
        <div key={gi} style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
            <span style={{ width: 10, height: 10, borderRadius: 5, background: g.cor }} />
            <span style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{g.titulo}</span>
            <span style={{ fontSize: 12, color: C.g400, background: C.white, border: `1px solid ${C.g200}`, borderRadius: 10, padding: '1px 9px', fontWeight: 700 }}>{g.itens.length}</span>
          </div>
          <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.g100}`, overflow: 'hidden' }}>
            {g.itens.map((it, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '13px 18px', borderBottom: i === g.itens.length - 1 ? 'none' : `1px solid ${C.g100}` }}>
                {g.titulo === 'Concluído' ? <CheckCircle2 size={18} color={C.green} /> : g.titulo === 'Em andamento' ? <Clock size={18} color={C.amber} /> : <Circle size={18} color={C.g400} />}
                <span style={{ fontSize: 13.5, color: g.titulo === 'Concluído' ? C.g400 : C.g700, fontWeight: 600, textDecoration: g.titulo === 'Concluído' ? 'line-through' : 'none' }}>{it}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p style={{ fontSize: 12.5, color: C.g400, textAlign: 'center', background: C.emeraldPale, borderRadius: 10, padding: 14 }}>
        💚 Transparência total: você sabe exatamente o que está sendo feito com a sua contabilidade.
      </p>
    </div>
  );
}

// ---------- DOCUMENTOS ----------
function Documentos() {
  const recebidos = [
    { nome: 'Relatório Financeiro — Maio', tipo: 'PDF', data: '02/06', tam: '1.2 MB' },
    { nome: 'DRE — Maio 2026', tipo: 'PDF', data: '02/06', tam: '480 KB' },
    { nome: 'Guia de impostos — Junho', tipo: 'PDF', data: '05/06', tam: '210 KB' },
  ];
  const enviados = [
    { nome: 'Notas de compra — Junho', tipo: 'ZIP', data: '08/06', tam: '3.4 MB' },
    { nome: 'Extrato Itaú — Maio', tipo: 'PDF', data: '01/06', tam: '890 KB' },
  ];
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: FD, fontSize: 26, fontWeight: 800, color: C.navy, margin: 0 }}>Documentos</h1>
          <p style={{ fontSize: 14, color: C.g500, margin: '4px 0 0' }}>Tudo em um lugar só — sem caçar no WhatsApp</p>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.emerald, color: '#fff', border: 'none', borderRadius: 9, padding: '11px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FB, boxShadow: '0 4px 14px rgba(46,204,113,0.3)' }}>
          <Upload size={17} /> Enviar documento
        </button>
      </div>

      {/* zona de upload */}
      <div style={{ border: `2px dashed ${C.g200}`, borderRadius: 14, padding: 28, textAlign: 'center', marginBottom: 24, background: C.white }}>
        <Upload size={28} color={C.g400} style={{ marginBottom: 8 }} />
        <div style={{ fontSize: 14, fontWeight: 600, color: C.g700 }}>Arraste arquivos aqui ou clique para enviar</div>
        <div style={{ fontSize: 12, color: C.g400, marginTop: 4 }}>Notas, extratos, comprovantes — o escritório recebe na hora</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <DocList title="Recebidos do escritório" docs={recebidos} action="download" />
        <DocList title="Enviados por você" docs={enviados} action="sent" />
      </div>
    </div>
  );
}
function DocList({ title, docs, action }) {
  return (
    <div>
      <h3 style={{ fontFamily: FD, fontSize: 15, fontWeight: 700, color: C.navy, margin: '0 0 12px' }}>{title}</h3>
      <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.g100}`, overflow: 'hidden' }}>
        {docs.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 16px', borderBottom: i === docs.length - 1 ? 'none' : `1px solid ${C.g100}` }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: C.emeraldPale, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FileText size={17} color={C.green} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: C.g700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.nome}</div>
              <div style={{ fontSize: 11, color: C.g400 }}>{d.tipo} · {d.tam} · {d.data}</div>
            </div>
            {action === 'download'
              ? <Download size={17} color={C.g400} style={{ cursor: 'pointer', flexShrink: 0 }} />
              : <CheckCircle2 size={17} color={C.green} style={{ flexShrink: 0 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- MOBILE ----------
function Mobile({ screen, setScreen }) {
  return (
    <div style={{ margin: '0 auto', width: 390, height: 760, background: C.off, borderRadius: 32, overflow: 'hidden', border: `10px solid ${C.navyDeep}`, boxShadow: '0 24px 70px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: C.navy, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>9:41</span><span style={{ color: '#fff', fontSize: 11 }}>📶 🔋</span>
      </div>
      <div style={{ background: C.white, padding: '14px 18px', borderBottom: `1px solid ${C.g100}`, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: C.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>OC</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Oliveira Contabilidade</div>
          <div style={{ fontSize: 10.5, color: C.g400 }}>Padaria Estrela</div>
        </div>
        <Bell size={18} color={C.g500} />
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: 16 }}>
        {screen === 'inicio' && <MobInicio />}
        {screen === 'financeiro' && <MobFin />}
        {screen === 'andamento' && <MobAndamento />}
        {screen === 'documentos' && <MobDocs />}
      </div>

      <div style={{ background: C.white, borderTop: `1px solid ${C.g200}`, display: 'flex', padding: '8px 0 14px' }}>
        {[
          { id: 'inicio', label: 'Início', icon: LayoutDashboard },
          { id: 'financeiro', label: 'Financeiro', icon: Wallet },
          { id: 'andamento', label: 'Andamento', icon: CheckCircle2 },
          { id: 'documentos', label: 'Docs', icon: FolderOpen },
        ].map(it => {
          const a = screen === it.id; const Icon = it.icon;
          return (
            <button key={it.id} onClick={() => setScreen(it.id)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, background: 'none', border: 'none', cursor: 'pointer', color: a ? C.green : C.g400 }}>
              <Icon size={20} /><span style={{ fontSize: 9.5, fontWeight: a ? 700 : 500, fontFamily: FB }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
function MobInicio() {
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <h2 style={{ fontFamily: FD, fontSize: 20, fontWeight: 800, color: C.navy, margin: '0 0 2px' }}>Olá, Padaria 👋</h2>
      <p style={{ fontSize: 12, color: C.g500, margin: '0 0 16px' }}>Resumo de junho</p>
      <div style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyDeep})`, borderRadius: 14, padding: 20, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Saldo em caixa</div>
        <div style={{ fontFamily: FD, fontSize: 32, fontWeight: 800, color: '#fff', margin: '4px 0' }}>R$ 48.250</div>
        <div style={{ fontSize: 12, color: C.emerald, fontWeight: 700 }}>↑ 12% vs mês anterior</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <div style={{ background: C.white, borderRadius: 12, padding: 14, border: `1px solid ${C.g100}` }}>
          <div style={{ fontSize: 11, color: C.g500 }}>Entradas</div>
          <div style={{ fontFamily: FD, fontSize: 18, fontWeight: 800, color: C.green }}>R$ 86,4k</div>
        </div>
        <div style={{ background: C.white, borderRadius: 12, padding: 14, border: `1px solid ${C.g100}` }}>
          <div style={{ fontSize: 11, color: C.g500 }}>Saídas</div>
          <div style={{ fontFamily: FD, fontSize: 18, fontWeight: 800, color: C.navy }}>R$ 61,2k</div>
        </div>
      </div>
      <div style={{ background: C.amberPale, borderRadius: 12, padding: 14, borderLeft: `3px solid ${C.amber}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#B45309' }}>📄 2 documentos pendentes</div>
        <div style={{ fontSize: 12, color: C.g500, marginTop: 3 }}>Envie as notas de junho</div>
      </div>
    </div>
  );
}
function MobFin() {
  const meses = [{ m: 'Mar', e: 79, s: 61 }, { m: 'Abr', e: 74, s: 59 }, { m: 'Mai', e: 81, s: 63 }, { m: 'Jun', e: 86, s: 61 }];
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <h2 style={{ fontFamily: FD, fontSize: 20, fontWeight: 800, color: C.navy, margin: '0 0 16px' }}>Meu Financeiro</h2>
      <div style={{ background: C.white, borderRadius: 12, padding: 16, border: `1px solid ${C.g100}`, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: C.g500, marginBottom: 12, fontWeight: 600 }}>Entradas e saídas</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 110, justifyContent: 'center' }}>
          {meses.map(mo => (
            <div key={mo.m} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 90 }}>
                <div style={{ width: 12, height: (mo.e / 100) * 90, background: C.emerald, borderRadius: '3px 3px 0 0' }} />
                <div style={{ width: 12, height: (mo.s / 100) * 90, background: C.g200, borderRadius: '3px 3px 0 0' }} />
              </div>
              <span style={{ fontSize: 10, color: C.g400 }}>{mo.m}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: C.emeraldPale, borderRadius: 12, padding: 16, textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: C.g500 }}>Resultado de junho</div>
        <div style={{ fontFamily: FD, fontSize: 26, fontWeight: 800, color: C.green }}>+ R$ 25.220</div>
      </div>
    </div>
  );
}
function MobAndamento() {
  const itens = [{ n: 'Conciliação bancária', s: 'done' }, { n: 'Contas lançadas', s: 'done' }, { n: 'Relatório mensal', s: 'doing' }, { n: 'Fechamento', s: 'todo' }];
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <h2 style={{ fontFamily: FD, fontSize: 20, fontWeight: 800, color: C.navy, margin: '0 0 4px' }}>Andamento</h2>
      <p style={{ fontSize: 12, color: C.g500, margin: '0 0 16px' }}>O que estão fazendo por você</p>
      {itens.map((t, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, background: C.white, borderRadius: 11, padding: 14, marginBottom: 9, border: `1px solid ${C.g100}` }}>
          {t.s === 'done' ? <CheckCircle2 size={18} color={C.green} /> : t.s === 'doing' ? <Clock size={18} color={C.amber} /> : <Circle size={18} color={C.g400} />}
          <span style={{ fontSize: 13.5, color: t.s === 'done' ? C.g400 : C.g700, fontWeight: 600 }}>{t.n}</span>
          <span style={{ marginLeft: 'auto', fontSize: 10.5, fontWeight: 700, color: t.s === 'done' ? C.green : t.s === 'doing' ? C.amber : C.g400 }}>{t.s === 'done' ? 'OK' : t.s === 'doing' ? '...' : '–'}</span>
        </div>
      ))}
    </div>
  );
}
function MobDocs() {
  const docs = [{ n: 'Relatório — Maio', t: 'PDF' }, { n: 'DRE — Maio', t: 'PDF' }, { n: 'Notas de junho', t: 'ZIP' }];
  return (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <h2 style={{ fontFamily: FD, fontSize: 20, fontWeight: 800, color: C.navy, margin: '0 0 16px' }}>Documentos</h2>
      <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: C.emerald, color: '#fff', border: 'none', borderRadius: 10, padding: 13, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FB, marginBottom: 16 }}>
        <Upload size={17} /> Enviar documento
      </button>
      {docs.map((d, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 11, background: C.white, borderRadius: 11, padding: 13, marginBottom: 9, border: `1px solid ${C.g100}` }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: C.emeraldPale, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={16} color={C.green} /></div>
          <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: C.g700 }}>{d.n}</span>
          <Download size={16} color={C.g400} />
        </div>
      ))}
    </div>
  );
}
