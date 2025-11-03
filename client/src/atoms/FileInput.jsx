import React from 'react';
import '../css/FileInput.css';

const FileInput = ({ label, onChange, accept, multiple = false, ...rest }) => (
  <div className="input-group">
    {label && <label className="input-label">{label}</label>}
    <input 
      type="file"
      className="file-input"
      onChange={onChange}
      accept={accept}
      multiple={multiple}
      {...rest}
    />
  </div>
);

export default FileInput;
