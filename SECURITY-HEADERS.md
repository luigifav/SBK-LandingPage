# Security Headers (SBK Landing Page)

Este documento descreve os cabeçalhos HTTP de segurança recomendados para o site
(`sbk.com.br` e `www.sbk.com.br`) e como aplicá-los em cada tipo de hospedagem.

## Contexto

A SecurityScorecard apontou um Content-Security-Policy (CSP) fraco:

```
default-src * 'unsafe-inline' 'unsafe-eval' data: blob:; upgrade-insecure-requests
```

O problema é o `default-src *` combinado com `'unsafe-inline'` e `'unsafe-eval'`:
na prática ele libera carga e execução de script de qualquer origem, então não
oferece proteção real contra XSS.

### Por que ainda mantemos `unsafe-eval` e `unsafe-inline`

A arquitetura atual do `index.html` transpila JSX no navegador com Babel Standalone
(`<script type="text/babel">`) e carrega React via unpkg. Isso implica:

- `'unsafe-eval'` é obrigatório: o Babel usa `eval`/`new Function` para transpilar.
- `'unsafe-inline'` para scripts é necessário: há scripts inline (loader do GTM e o
  bloco `App`), e o GTM injeta scripts inline.
- `'unsafe-inline'` para estilos é necessário: blocos `<style>` e atributos `style`
  aplicados pelo React.

Remover essas duas diretivas exige um passo de build (bundler, self-host do React,
nonces/hashes para inline). Isso está descrito na seção "Correção completa (futuro)".

O que este pacote entrega é o ganho realista sem quebrar o site: eliminar o
`default-src *`, restringindo cada diretiva às origens que o site realmente usa,
e adicionar os demais cabeçalhos de segurança que o scanner avalia.

## Origens usadas pelo site (levantamento do código)

| Recurso | Origem | Diretiva |
|---|---|---|
| React / ReactDOM / Babel | `https://unpkg.com` | script-src |
| Google Tag Manager | `https://www.googletagmanager.com` | script-src, connect-src, frame-src |
| Google Analytics (via GTM) | `https://*.google-analytics.com`, `https://*.analytics.google.com` | script-src, connect-src |
| DoubleClick (via GTM) | `https://*.g.doubleclick.net`, `https://*.doubleclick.net` | connect-src, frame-src |
| ClickUp (script embed) | `https://app-cdn.clickup.com` | script-src |
| ClickUp (formulário iframe / API) | `https://forms.clickup.com`, `https://*.clickup.com` | frame-src, connect-src, form-action |
| Google Fonts (CSS) | `https://fonts.googleapis.com` | style-src |
| Google Fonts (arquivos) | `https://fonts.gstatic.com` | font-src |

Links de redes sociais (Instagram, LinkedIn, TikTok) e páginas de suporte são apenas
`href` de navegação, não recursos carregados, então não entram no CSP.

## Conjunto de cabeçalhos recomendado

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://www.googletagmanager.com https://app-cdn.clickup.com https://*.google-analytics.com https://ssl.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.clickup.com; frame-src 'self' https://www.googletagmanager.com https://forms.clickup.com https://*.doubleclick.net; frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self' https://*.clickup.com; upgrade-insecure-requests
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), usb=()
Cross-Origin-Opener-Policy: same-origin
```

### Observações sobre cada cabeçalho

- `frame-ancestors 'self'` e `X-Frame-Options: SAMEORIGIN`: protegem contra clickjacking.
  Se nenhum sistema externo precisa embutir o site em iframe, pode-se usar `'none'` /
  `DENY`. Mantido em `self` por segurança.
- `Strict-Transport-Security` com `preload`: força HTTPS por 2 anos. O flag `preload`
  é um compromisso de longo prazo (difícil de reverter). Se ainda houver dúvida sobre
  algum subdomínio servido em HTTP, comece sem `preload` e sem `includeSubDomains`,
  valide, e só então promova.
- `img-src` deixa `https:` liberado de propósito: beacons de Analytics e pixels usam
  muitos domínios. Imagem não executa código, então o risco é baixo e evita quebras.

## Manutenção: tags de marketing no GTM

Este CSP cobre Google (GTM, Analytics, Ads/DoubleClick) e ClickUp, que são o que
existe no código hoje. O GTM, porém, pode carregar outras tags configuradas no painel
(Meta Pixel, LinkedIn Insight, TikTok Pixel, Hotjar, RD Station, etc). Cada uma carrega
de domínios próprios. Ao adicionar uma tag nova no GTM, inclua os domínios dela nas
diretivas correspondentes (`script-src`, `connect-src`, `img-src`, `frame-src`).

Exemplos comuns:

- Meta Pixel: `https://connect.facebook.net` (script), `https://www.facebook.com` (img/frame)
- LinkedIn Insight: `https://snap.licdn.com` (script), `https://px.ads.linkedin.com` (img)
- TikTok Pixel: `https://analytics.tiktok.com` (script/connect)

## Como aplicar por tipo de hospedagem

### Cloudflare Pages ou Netlify (arquivo `_headers`)

O arquivo `_headers` na raiz do projeto (já incluído neste repositório) é lido
automaticamente. Nenhuma ação extra além do deploy.

### Cloudflare (proxy na frente de um servidor de origem)

Se o Cloudflare está apenas como proxy (não Pages), o `_headers` não é lido. Use uma
Response Header Transform Rule no painel: Rules > Transform Rules > Modify Response
Header > Set static, criando uma entrada para cada cabeçalho acima.

### Netlify (`netlify.toml`)

```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://www.googletagmanager.com https://app-cdn.clickup.com https://*.google-analytics.com https://ssl.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.clickup.com; frame-src 'self' https://www.googletagmanager.com https://forms.clickup.com https://*.doubleclick.net; frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self' https://*.clickup.com; upgrade-insecure-requests"
    Strict-Transport-Security = "max-age=63072000; includeSubDomains; preload"
    X-Content-Type-Options = "nosniff"
    X-Frame-Options = "SAMEORIGIN"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=(), payment=(), usb=()"
    Cross-Origin-Opener-Policy = "same-origin"
```

### Vercel (`vercel.json`)

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://www.googletagmanager.com https://app-cdn.clickup.com https://*.google-analytics.com https://ssl.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.clickup.com; frame-src 'self' https://www.googletagmanager.com https://forms.clickup.com https://*.doubleclick.net; frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self' https://*.clickup.com; upgrade-insecure-requests" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "geolocation=(), microphone=(), camera=(), payment=(), usb=()" },
        { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" }
      ]
    }
  ]
}
```

### Nginx

```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://www.googletagmanager.com https://app-cdn.clickup.com https://*.google-analytics.com https://ssl.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.clickup.com; frame-src 'self' https://www.googletagmanager.com https://forms.clickup.com https://*.doubleclick.net; frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self' https://*.clickup.com; upgrade-insecure-requests" always;
add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=()" always;
add_header Cross-Origin-Opener-Policy "same-origin" always;
```

### Apache (`.htaccess` ou vhost, requer `mod_headers`)

```apache
<IfModule mod_headers.c>
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://unpkg.com https://www.googletagmanager.com https://app-cdn.clickup.com https://*.google-analytics.com https://ssl.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.clickup.com; frame-src 'self' https://www.googletagmanager.com https://forms.clickup.com https://*.doubleclick.net; frame-ancestors 'self'; base-uri 'self'; object-src 'none'; form-action 'self' https://*.clickup.com; upgrade-insecure-requests"
  Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=(), payment=(), usb=()"
  Header always set Cross-Origin-Opener-Policy "same-origin"
</IfModule>
```

## Como validar depois do deploy

1. `curl -sI https://sbk.com.br | grep -i "content-security-policy"` para confirmar o header.
2. Abra o site com o DevTools no Console e navegue por todas as páginas (Home, Ecossistema,
   Produto, SBK IA, Sobre, Resultados, Contato). Procure erros "Refused to load ... because
   it violates the Content Security Policy". Cada erro indica um domínio a incluir no CSP.
3. Teste o formulário de contato (iframe ClickUp) e confirme que carrega e envia.
4. Confirme que o Google Tag Manager dispara (extensão Tag Assistant ou aba Network).
5. Reavalie na SecurityScorecard após a próxima varredura.

## Correção completa (futuro)

Para eliminar `unsafe-eval` e `unsafe-inline` de verdade:

1. Adicionar um bundler (esbuild ou Vite) e compilar o JSX em build time, removendo o
   Babel Standalone e os `type="text/babel"`.
2. Self-host do React/ReactDOM (ou importar como módulos versionados no build), removendo
   a dependência do unpkg em runtime.
3. Extrair scripts inline para arquivos e aplicar nonce ou hash por script.
4. Servir o GTM via server-side tagging ou aplicar as recomendações de CSP do Google
   para GTM (nonce propagado às tags).
5. Então trocar o CSP para `script-src 'self' 'nonce-...'` sem `unsafe-eval`/`unsafe-inline`.

Isso muda o fluxo de deploy e tem esforço maior, por isso ficou fora deste pacote inicial.
