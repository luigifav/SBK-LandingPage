/* global React */
const { useState, useEffect } = React;

// ============================================================================
// Router (hash-based)
// ============================================================================
function useHashRoute() {
  const [route, setRoute] = useState(() => window.location.hash.slice(1) || '/');
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function navigate(to) {
  window.location.hash = to;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function Link({ to, children, className, style, onClick }) {
  return (
    <a href={'#' + to}
       className={className}
       style={style}
       onClick={(e) => {
         e.preventDefault();
         if (onClick) onClick(e);
         navigate(to);
       }}>{children}</a>
  );
}

window.useHashRoute = useHashRoute;
window.navigate = navigate;
window.Link = Link;
