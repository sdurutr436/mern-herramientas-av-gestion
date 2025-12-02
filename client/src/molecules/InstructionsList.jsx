import React from 'react';

const InstructionsList = ({ steps, type = 'primary' }) => {
  return (
    <div className={`instructions-container instructions-${type}`}>
      <div className="instructions-header">
        <svg className="instructions-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h3 className="instructions-title">Instrucciones de Uso</h3>
      </div>
      <ol className="instructions-list">
        {steps.map((step, index) => (
          <li key={index} className="instruction-item">
            <div className="step-number">{index + 1}</div>
            <div className="step-content">
              <span className="step-text">{step}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default InstructionsList;
