import React from 'react';

const HerramientaTemplate = ({ titulo, descripcion, sidebar, children }) => (
  <div className="herramienta">
    <header className="herramienta__header">
      <h1 className="herramienta__titulo">{titulo}</h1>
      {descripcion && <p className="herramienta__descripcion">{descripcion}</p>}
    </header>
    <div className="herramienta__grid">
      {sidebar && (
        <aside className="herramienta__sidebar">
          {sidebar}
        </aside>
      )}
      <main className={`herramienta__main ${!sidebar ? 'herramienta__main--full' : ''}`}>
        {children}
      </main>
    </div>
  </div>
);

export default HerramientaTemplate;
