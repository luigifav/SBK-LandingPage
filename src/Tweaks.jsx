/* global React, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakSelect, TweakSlider, TweakColor, TweakToggle */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroSize": "gigante",
  "heroLayout": "left",
  "heroAccent": "#5C9094",
  "heroBg": "verde-profundo",
  "density": "amplo",
  "showGrid": true,
  "italicAccent": true
}/*EDITMODE-END*/;

function SBKTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks via CSS variables on :root
  React.useEffect(() => {
    const r = document.documentElement;
    const sizes = {
      grande: 'clamp(40px, 5.6vw, 80px)',
      gigante: 'clamp(48px, 7.2vw, 104px)',
      colossal: 'clamp(56px, 9vw, 132px)',
    };
    r.style.setProperty('--tweak-hero-size', sizes[t.heroSize] || sizes.gigante);
    r.style.setProperty('--tweak-hero-accent', t.heroAccent);
    r.style.setProperty('--tweak-hero-align', t.heroLayout === 'centered' ? 'center' : 'left');
    const bgs = {
      'verde-profundo': '#012824',
      'verde-escuro': '#023631',
      'ciano-escuro': '#075056',
    };
    r.style.setProperty('--tweak-hero-bg', bgs[t.heroBg]);
    r.style.setProperty('--tweak-section-pad-lg', t.density === 'compacto' ? '88px' : '128px');
    r.style.setProperty('--tweak-grid-opacity', t.showGrid ? '0.06' : '0');
    document.body.classList.toggle('no-italic', !t.italicAccent);
  }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Hero" />
      <TweakRadio label="Tamanho" value={t.heroSize}
        options={['grande', 'gigante', 'colossal']}
        onChange={(v) => setTweak('heroSize', v)} />
      <TweakRadio label="Alinhamento" value={t.heroLayout}
        options={['left', 'centered']}
        onChange={(v) => setTweak('heroLayout', v)} />
      <TweakSelect label="Fundo" value={t.heroBg}
        options={['verde-profundo', 'verde-escuro', 'ciano-escuro']}
        onChange={(v) => setTweak('heroBg', v)} />
      <TweakColor label="Cor de destaque" value={t.heroAccent}
        onChange={(v) => setTweak('heroAccent', v)} />
      <TweakToggle label="Itálico no destaque" value={t.italicAccent}
        onChange={(v) => setTweak('italicAccent', v)} />
      <TweakSection label="Layout" />
      <TweakRadio label="Densidade" value={t.density}
        options={['compacto', 'amplo']}
        onChange={(v) => setTweak('density', v)} />
      <TweakToggle label="Grid de cards visível" value={t.showGrid}
        onChange={(v) => setTweak('showGrid', v)} />
    </TweaksPanel>
  );
}

window.SBKTweaks = SBKTweaks;
