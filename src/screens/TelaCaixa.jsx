import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, Plus, Trash2, Save, Eye, CheckCircle2, Info, TrendingUp, Calendar, Building2, FileSpreadsheet, Download, UploadCloud, X } from 'lucide-react';

// BPOx — Tela do CONTADOR: atualizar caixa do cliente (Caminho 1, lançamento manual)
// O contador preenche; o portal do cliente exibe automaticamente.

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
  input:focus{outline:none;border-color:#2ECC71 !important;box-shadow:0 0 0 3px rgba(46,204,113,0.1)}
  @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>;
}

const fmt = (n) => 'R$ ' + (Math.round(n) || 0).toLocaleString('pt-BR');
const parseNum = (s) => parseFloat(String(s).replace(/[^\d,]/g, '').replace(',', '.')) || 0;

export default function CaixaContador() {
  const [saldoAnterior, setSaldoAnterior] = useState('23030');
  const [entradas, setEntradas] = useState('86400');
  const [despesas, setDespesas] = useState([
    { cat: 'Fornecedores', valor: '28400' },
    { cat: 'Folha de pagamento', valor: '18200' },
    { cat: 'Impostos', valor: '9180' },
    { cat: 'Outros', valor: '5400' },
  ]);
  const [saved, setSaved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [imported, setImported] = useState(false);

  const totalDespesas = despesas.reduce((s, d) => s + parseNum(d.valor), 0);
  const entradasN = parseNum(entradas);
  const saldoAntN = parseNum(saldoAnterior);
  const resultado = entradasN - totalDespesas;
  const saldoFinal = saldoAntN + resultado;

  const updateDesp = (i, field, val) => {
    const next = [...despesas]; next[i][field] = val; setDespesas(next);
  };
  const addDesp = () => setDespesas([...despesas, { cat: '', valor: '' }]);
  const removeDesp = (i) => setDespesas(despesas.filter((_, idx) => idx !== i));

  // Simula o resultado de ler a planilha-modelo preenchida
  const handleImport = () => {
    setEntradas('92750');
    setDespesas([
      { cat: 'Fornecedores', valor: '31200' },
      { cat: 'Folha de pagamento', valor: '18200' },
      { cat: 'Impostos', valor: '8900' },
      { cat: 'Aluguel', valor: '4500' },
      { cat: 'Outros', valor: '3100' },
    ]);
    setShowImport(false);
    setImported(true);
    setTimeout(() => setImported(false), 3000);
  };

  return (
    <div style={{ fontFamily: FB, background: '#dce3ea', minHeight: '100vh', padding: 24 }}>
      <Fonts />
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        {/* Context bar */}
        <div style={{ background: C.navy, borderRadius: '14px 14px 0 0', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: C.emerald, color: C.navy, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 15 }}>PE</div>
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Padaria Estrela Ltda</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}><Calendar size={12} /> Fechamento de Junho 2026</div>
            </div>
          </div>
          <select style={{ fontFamily: FB, fontSize: 13, fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, padding: '8px 12px', cursor: 'pointer' }}>
            <option style={{ color: C.navy }}>Junho 2026</option>
            <option style={{ color: C.navy }}>Maio 2026</option>
          </select>
        </div>

        <div style={{ background: C.white, borderRadius: '0 0 14px 14px', padding: 30 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: C.emeraldPale, borderRadius: 10, padding: '12px 16px', marginBottom: 20 }}>
            <Info size={17} color={C.green} style={{ flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 13, color: C.g700, margin: 0, lineHeight: 1.5 }}>
              Você acabou de fazer a conciliação — esses números já estão na sua mão. Preencha o resumo do mês e o seu cliente verá tudo organizado no portal dele. Leva 1 minuto.
            </p>
          </div>

          {/* Banner de importação por planilha */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: C.navy, borderRadius: 12, padding: '16px 20px', marginBottom: 26 }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: 'rgba(46,204,113,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <FileSpreadsheet size={22} color={C.emerald} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Prefere subir uma planilha?</div>
              <div style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)' }}>Escolha entre dois modelos prontos. Ou preencha manualmente abaixo.</div>
            </div>
            <button onClick={() => setShowImport(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.emerald, color: '#fff', border: 'none', borderRadius: 9, padding: '11px 18px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer', fontFamily: FB, flexShrink: 0 }}>
              <UploadCloud size={17} /> Importar planilha
            </button>
          </div>

          {imported && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, background: C.emeraldPale, border: `1px solid ${C.emerald}`, borderRadius: 10, padding: '12px 16px', marginBottom: 22, animation: 'fadeIn 0.3s' }}>
              <CheckCircle2 size={18} color={C.green} />
              <span style={{ fontSize: 13.5, color: C.g700, fontWeight: 600 }}>Planilha importada! 47 lançamentos lidos e agrupados. Confira os valores abaixo antes de publicar.</span>
            </div>
          )}

          {/* Saldo anterior */}
          <Section num="1" title="Saldo que veio do mês anterior">
            <MoneyInput value={saldoAnterior} onChange={setSaldoAnterior} placeholder="23.030" />
            <p style={{ fontSize: 12, color: C.g400, margin: '6px 0 0' }}>O saldo final de maio. Nos próximos meses, isso já vem preenchido automaticamente.</p>
          </Section>

          {/* Entradas */}
          <Section num="2" title="Total de entradas no mês" hint="Tudo que entrou: vendas, recebimentos, outros">
            <MoneyInput value={entradas} onChange={setEntradas} placeholder="86.400" accent={C.green} />
          </Section>

          {/* Despesas por categoria */}
          <Section num="3" title="Saídas por categoria" hint="O portal mostra ao cliente para onde foi o dinheiro">
            {despesas.map((d, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'center' }}>
                <input value={d.cat} onChange={e => updateDesp(i, 'cat', e.target.value)} placeholder="Categoria"
                  style={{ flex: 1, padding: '11px 14px', fontFamily: FB, fontSize: 14, color: C.g700, border: `1.5px solid ${C.g200}`, borderRadius: 9, transition: 'all .2s' }} />
                <div style={{ position: 'relative', width: 160 }}>
                  <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: C.g400, fontWeight: 600 }}>R$</span>
                  <input value={d.valor} onChange={e => updateDesp(i, 'valor', e.target.value)} placeholder="0"
                    style={{ width: '100%', padding: '11px 14px 11px 38px', fontFamily: FB, fontSize: 14, color: C.navy, fontWeight: 700, border: `1.5px solid ${C.g200}`, borderRadius: 9, transition: 'all .2s' }} />
                </div>
                <button onClick={() => removeDesp(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.g400, padding: 6, display: 'flex' }}><Trash2 size={17} /></button>
              </div>
            ))}
            <button onClick={addDesp} style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'none', border: `1.5px dashed ${C.g200}`, borderRadius: 9, padding: '10px 16px', fontSize: 13, fontWeight: 600, color: C.g500, cursor: 'pointer', fontFamily: FB, width: '100%', justifyContent: 'center' }}>
              <Plus size={16} /> Adicionar categoria
            </button>
          </Section>

          {/* Resultado calculado automaticamente */}
          <div style={{ background: C.navy, borderRadius: 14, padding: 24, marginTop: 26 }}>
            <div style={{ fontSize: 12, color: C.emerald, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>Calculado automaticamente</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
              <ResultBox label="Entradas" value={fmt(entradasN)} color={C.emerald} icon={ArrowUpRight} />
              <ResultBox label="Saídas" value={fmt(totalDespesas)} color="rgba(255,255,255,0.85)" icon={ArrowDownRight} />
              <ResultBox label="Resultado" value={fmt(resultado)} color={resultado >= 0 ? C.emerald : C.red} icon={TrendingUp} />
              <ResultBox label="Saldo final" value={fmt(saldoFinal)} color="#fff" icon={Wallet} big />
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
            <button onClick={() => setShowPreview(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.white, color: C.navy, border: `1.5px solid ${C.g200}`, borderRadius: 9, padding: '12px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FB }}>
              <Eye size={17} /> Ver como o cliente vê
            </button>
            <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }} style={{ display: 'flex', alignItems: 'center', gap: 8, background: C.emerald, color: '#fff', border: 'none', borderRadius: 9, padding: '12px 24px', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: FB, boxShadow: '0 4px 14px rgba(46,204,113,0.3)' }}>
              <Save size={17} /> Publicar para o cliente
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: C.g500, marginTop: 16 }}>
          Tela do contador · Caminho 1 (lançamento manual) · edite os campos e clique em "Ver como o cliente vê"
        </p>
      </div>

      {/* Toast */}
      {saved && (
        <div style={{ position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)', background: C.navy, color: '#fff', padding: '14px 24px', borderRadius: 10, fontSize: 14, fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', gap: 9, animation: 'fadeIn 0.3s' }}>
          <CheckCircle2 size={18} color={C.emerald} /> Publicado! O cliente já consegue ver no portal.
        </div>
      )}

      {/* Preview modal */}
      {showPreview && (
        <PreviewModal onClose={() => setShowPreview(false)} entradas={entradasN} saidas={totalDespesas} resultado={resultado} saldo={saldoFinal} despesas={despesas} />
      )}

      {/* Import modal */}
      {showImport && <ImportModal onClose={() => setShowImport(false)} onImport={handleImport} />}
    </div>
  );
}

function Section({ num, title, hint, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 12 }}>
        <div style={{ width: 26, height: 26, borderRadius: 13, background: C.emeraldPale, color: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{num}</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>{title}</div>
          {hint && <div style={{ fontSize: 12, color: C.g400 }}>{hint}</div>}
        </div>
      </div>
      <div style={{ paddingLeft: 37 }}>{children}</div>
    </div>
  );
}

function MoneyInput({ value, onChange, placeholder, accent }) {
  return (
    <div style={{ position: 'relative', maxWidth: 240 }}>
      <span style={{ position: 'absolute', left: 15, top: '50%', transform: 'translateY(-50%)', fontSize: 16, color: C.g400, fontWeight: 600 }}>R$</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: '100%', padding: '13px 16px 13px 44px', fontFamily: FD, fontSize: 22, fontWeight: 800, color: accent || C.navy, border: `1.5px solid ${C.g200}`, borderRadius: 10, transition: 'all .2s' }} />
    </div>
  );
}

function ResultBox({ label, value, color, icon: Icon, big }) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <Icon size={14} color={color} />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>{label}</span>
      </div>
      <div style={{ fontFamily: FD, fontSize: big ? 24 : 19, fontWeight: 800, color }}>{value}</div>
    </div>
  );
}

function ImportModal({ onClose, onImport }) {
  const [modelo, setModelo] = useState(null); // null -> escolher | '1' | '2'
  const [step, setStep] = useState('choose'); // choose -> instructions -> uploading -> done

  const escolher = (m) => { setModelo(m); setStep('instructions'); };
  const handleFile = () => {
    setStep('uploading');
    setTimeout(() => setStep('done'), 1400);
  };

  const isLanc = modelo === '1';
  const doneText = isLanc
    ? '47 lançamentos lidos · R$ 92.750 em entradas · R$ 65.900 em 5 categorias'
    : '7 categorias lidas · R$ 92.750 em entradas · R$ 65.900 em saídas';

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(14,25,41,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20, backdropFilter: 'blur(3px)' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.white, borderRadius: 18, width: 540, maxWidth: '100%', maxHeight: '92vh', overflow: 'auto', boxShadow: '0 24px 70px rgba(0,0,0,0.4)' }}>
        <div style={{ background: C.navy, padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <FileSpreadsheet size={20} color={C.emerald} />
            <span style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>Importar planilha</span>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.6)', display: 'flex' }}><X size={20} /></button>
        </div>

        <div style={{ padding: 28 }}>
          {/* PASSO: ESCOLHER MODELO */}
          {step === 'choose' && (
            <div style={{ animation: 'fadeIn 0.3s' }}>
              <p style={{ fontSize: 14, color: C.g700, margin: '0 0 20px', textAlign: 'center' }}>Como você prefere informar os dados deste mês?</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {/* Modelo 1 */}
                <button onClick={() => escolher('1')} style={{ textAlign: 'left', background: C.white, border: `1.5px solid ${C.g200}`, borderRadius: 14, padding: 20, cursor: 'pointer', fontFamily: FB, transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.emerald; e.currentTarget.style.background = C.emeraldPale; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.g200; e.currentTarget.style.background = C.white; }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: C.emeraldPale, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <FileSpreadsheet size={22} color={C.green} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 6 }}>Lançamentos detalhados</div>
                  <div style={{ fontSize: 12.5, color: C.g500, lineHeight: 1.5 }}>Subo o movimento completo, linha a linha. O BPOx soma e agrupa por categoria.</div>
                  <div style={{ marginTop: 12, fontSize: 11.5, fontWeight: 700, color: C.green }}>Para quem tem o extrato/movimento →</div>
                </button>
                {/* Modelo 2 */}
                <button onClick={() => escolher('2')} style={{ textAlign: 'left', background: C.white, border: `1.5px solid ${C.g200}`, borderRadius: 14, padding: 20, cursor: 'pointer', fontFamily: FB, transition: 'all .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.emerald; e.currentTarget.style.background = C.emeraldPale; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.g200; e.currentTarget.style.background = C.white; }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: C.emeraldPale, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <Wallet size={22} color={C.green} />
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.navy, marginBottom: 6 }}>Categorias somadas</div>
                  <div style={{ fontSize: 12.5, color: C.g500, lineHeight: 1.5 }}>Já fiz o fechamento. Informo só os totais por categoria, sem detalhar.</div>
                  <div style={{ marginTop: 12, fontSize: 11.5, fontWeight: 700, color: C.green }}>Para quem já tem o resumo →</div>
                </button>
              </div>
            </div>
          )}

          {/* PASSO: INSTRUÇÕES + UPLOAD */}
          {step === 'instructions' && (
            <div style={{ animation: 'fadeIn 0.3s' }}>
              <button onClick={() => setStep('choose')} style={{ background: 'none', border: 'none', color: C.g500, fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontFamily: FB, marginBottom: 16, padding: 0 }}>← Trocar modelo</button>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, background: C.off, borderRadius: 12, marginBottom: 16 }}>
                <div style={{ width: 30, height: 30, borderRadius: 15, background: C.emeraldPale, color: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>1</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: C.navy }}>Baixe o modelo {isLanc ? 'de lançamentos' : 'de categorias'}</div>
                  <div style={{ fontSize: 12, color: C.g500 }}>{isLanc ? 'Uma linha por lançamento' : 'Só os totais por categoria'}</div>
                </div>
                <button style={{ display: 'flex', alignItems: 'center', gap: 7, background: C.white, color: C.navy, border: `1.5px solid ${C.g200}`, borderRadius: 8, padding: '9px 14px', fontSize: 12.5, fontWeight: 700, cursor: 'pointer', fontFamily: FB, flexShrink: 0 }}>
                  <Download size={15} /> Baixar
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
                <div style={{ width: 30, height: 30, borderRadius: 15, background: C.emeraldPale, color: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>2</div>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, color: C.navy }}>Preencha e suba aqui</div>
                  <div style={{ fontSize: 12, color: C.g500 }}>{isLanc ? 'Cole seus lançamentos no modelo' : 'Informe os totais e o saldo anterior'}</div>
                </div>
              </div>
              <div onClick={handleFile} style={{ border: `2px dashed ${C.g200}`, borderRadius: 14, padding: 34, textAlign: 'center', cursor: 'pointer', transition: 'all .2s', background: C.off }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.emerald; e.currentTarget.style.background = C.emeraldPale; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.g200; e.currentTarget.style.background = C.off; }}>
                <UploadCloud size={30} color={C.g400} style={{ marginBottom: 8 }} />
                <div style={{ fontSize: 14, fontWeight: 600, color: C.g700 }}>Arraste a planilha ou clique para selecionar</div>
                <div style={{ fontSize: 12, color: C.g400, marginTop: 4 }}>.xlsx ou .csv</div>
              </div>
            </div>
          )}

          {/* PASSO: LENDO */}
          {step === 'uploading' && (
            <div style={{ textAlign: 'center', padding: '30px 0', animation: 'fadeIn 0.3s' }}>
              <div style={{ width: 54, height: 54, borderRadius: 27, border: `4px solid ${C.g100}`, borderTopColor: C.emerald, margin: '0 auto 18px', animation: 'spin 0.8s linear infinite' }} />
              <div style={{ fontSize: 15, fontWeight: 700, color: C.navy }}>Lendo a planilha...</div>
              <div style={{ fontSize: 13, color: C.g500, marginTop: 4 }}>{isLanc ? 'Somando entradas e saídas, agrupando por categoria' : 'Conferindo os totais por categoria'}</div>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          )}

          {/* PASSO: PRONTO */}
          {step === 'done' && (
            <div style={{ textAlign: 'center', padding: '20px 0', animation: 'fadeIn 0.3s' }}>
              <div style={{ width: 60, height: 60, borderRadius: 30, background: C.emeraldPale, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <CheckCircle2 size={34} color={C.green} />
              </div>
              <div style={{ fontSize: 17, fontWeight: 700, color: C.navy }}>Planilha lida com sucesso!</div>
              <div style={{ fontSize: 13.5, color: C.g500, margin: '6px 0 20px' }}>{doneText}</div>
              <button onClick={onImport} style={{ background: C.emerald, color: '#fff', border: 'none', borderRadius: 9, padding: '13px 28px', fontSize: 14.5, fontWeight: 700, cursor: 'pointer', fontFamily: FB, boxShadow: '0 4px 14px rgba(46,204,113,0.3)' }}>
                Preencher os campos →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PreviewModal({ onClose, entradas, saidas, resultado, saldo, despesas }) {
  const fmtN = (n) => 'R$ ' + (Math.round(n) || 0).toLocaleString('pt-BR');
  const parseN = (s) => parseFloat(String(s).replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  const totalD = despesas.reduce((s, d) => s + parseN(d.valor), 0);
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(14,25,41,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: 20, backdropFilter: 'blur(3px)' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.off, borderRadius: 18, width: 400, maxHeight: '90vh', overflow: 'auto', boxShadow: '0 24px 70px rgba(0,0,0,0.4)' }}>
        <div style={{ background: C.white, padding: '14px 20px', borderBottom: `1px solid ${C.g100}`, display: 'flex', alignItems: 'center', gap: 10, position: 'sticky', top: 0 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: C.navy, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12 }}>OC</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: C.navy }}>Como o cliente vê</div>
            <div style={{ fontSize: 10.5, color: C.g400 }}>Portal · Padaria Estrela</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 22, color: C.g400, cursor: 'pointer', lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: 18 }}>
          <div style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyDeep})`, borderRadius: 14, padding: 20, marginBottom: 14 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Saldo em caixa</div>
            <div style={{ fontFamily: FD, fontSize: 30, fontWeight: 800, color: '#fff', margin: '4px 0' }}>{fmtN(saldo)}</div>
            <div style={{ fontSize: 12, color: resultado >= 0 ? C.emerald : C.red, fontWeight: 700 }}>{resultado >= 0 ? '↑' : '↓'} {fmtN(Math.abs(resultado))} no mês</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <div style={{ background: C.white, borderRadius: 12, padding: 14, border: `1px solid ${C.g100}` }}>
              <div style={{ fontSize: 11, color: C.g500 }}>Entradas</div>
              <div style={{ fontFamily: FD, fontSize: 17, fontWeight: 800, color: C.green }}>{fmtN(entradas)}</div>
            </div>
            <div style={{ background: C.white, borderRadius: 12, padding: 14, border: `1px solid ${C.g100}` }}>
              <div style={{ fontSize: 11, color: C.g500 }}>Saídas</div>
              <div style={{ fontFamily: FD, fontSize: 17, fontWeight: 800, color: C.navy }}>{fmtN(saidas)}</div>
            </div>
          </div>
          <div style={{ background: C.white, borderRadius: 12, padding: 16, border: `1px solid ${C.g100}` }}>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Para onde foi o dinheiro</div>
            {despesas.filter(d => d.cat).map((d, i) => {
              const pct = totalD > 0 ? Math.round(parseN(d.valor) / totalD * 100) : 0;
              return (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12.5, color: C.g700, fontWeight: 600 }}>{d.cat}</span>
                    <span style={{ fontSize: 12.5, color: C.navy, fontWeight: 700, fontFamily: FD }}>{fmtN(parseN(d.valor))}</span>
                  </div>
                  <div style={{ height: 7, background: C.g100, borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: C.emerald, borderRadius: 4 }} />
                  </div>
                </div>
              );
            })}
          </div>
          <p style={{ fontSize: 11.5, color: C.g400, textAlign: 'center', marginTop: 14, marginBottom: 0 }}>
            💚 Foi exatamente isso que você preencheu, do lado do cliente.
          </p>
        </div>
      </div>
    </div>
  );
}
