import React from 'react';
import FileInput from '../atoms/FileInput';
import Button from '../atoms/Button';
import '../css/FileUpload.css';

const FileUpload = ({
  label,
  onFileChange,
  file,
  accept,
  multiple,
  onRemove,
  disabled,
  id
}) => (
  <div className="file-upload">
    <FileInput
      label={label}
      onChange={onFileChange}
      accept={accept}
      multiple={multiple}
      id={id}
      disabled={disabled}
    />
    {file && (
      <div className="file-info">
        <span>{file.name}</span>
        {onRemove && (
          <Button variant="danger" type="button" onClick={onRemove} >Quitar</Button>
        )}
      </div>
    )}
  </div>
);

export default FileUpload;
