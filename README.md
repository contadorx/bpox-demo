# BPOx — Demonstração Navegável

Demo interativa do BPOx juntando as três visões do produto:
- **App do Contador** — empresas, tarefas (Kanban), calendário, produtividade, planos
- **Lançar Caixa** — tela onde o contador informa o resumo financeiro (manual ou importando planilha)
- **Portal do Cliente** — o que o cliente final do escritório vê

---

## Como publicar na Vercel (passo a passo)

### Opção A — Pela interface da Vercel (mais fácil, sem terminal)

1. Crie uma conta gratuita em https://vercel.com (pode entrar com o GitHub)
2. Suba esta pasta para um repositório no GitHub:
   - Crie um repositório novo em https://github.com/new (ex: `bpox-demo`)
   - Faça upload de todos os arquivos desta pasta (botão "uploading an existing file")
3. Na Vercel, clique em **Add New → Project**
4. Selecione o repositório `bpox-demo`
5. A Vercel detecta que é um projeto **Vite** automaticamente — só clicar em **Deploy**
6. Em ~1 minuto você recebe um link tipo `https://bpox-demo.vercel.app`

### Opção B — Pelo terminal (se tiver Node instalado)

```bash
npm install
npm install -g vercel
vercel
```

Siga as perguntas (aceite os padrões). No fim, ele te dá o link público.

---

## Para testar localmente antes (opcional)

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`

---

## Depois de publicar

Pegue o link da Vercel (ex: `https://bpox-demo.vercel.app`) e cole no arquivo
`BPOx_OnePage.html`, na linha:

```js
const DEMO_URL = ''; // cole a URL aqui
```

Assim o botão "Abrir demonstração interativa" da landing passa a abrir esta demo.

---

## Alternativa ainda mais rápida: CodeSandbox / StackBlitz

Se quiser um link em 2 minutos sem GitHub:
1. Acesse https://stackblitz.com/ ou https://codesandbox.io/
2. Crie um projeto **Vite + React**
3. Substitua os arquivos pelos desta pasta
4. O link público é gerado automaticamente
