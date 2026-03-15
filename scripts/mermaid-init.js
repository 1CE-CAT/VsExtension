(function() {
  const renderMermaid = () => mermaid.run({ querySelector: '.mermaid' });

  mermaid.initialize({ startOnLoad: false, theme: 'default' });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderMermaid);
  } else {
    renderMermaid();
  }

  new MutationObserver(renderMermaid).observe(document.body, { childList: true, subtree: true });
})();