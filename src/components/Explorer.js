import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faFile, faFolder } from '@fortawesome/free-solid-svg-icons';
import File from './File';

function Explorer() {
  const [isHidden, setIsHidden] = useState(false);
  const [file, setFile] = useState([]);
  const [isCreatingFile, setIsCreatingFile] = useState(false);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleFileComplete = () => {
    setIsCreatingFile(false);
  }

  const addFile = () => {
    if (!isCreatingFile) {
      setIsCreatingFile(true);
      const newFile = <File fileId={file.length} onFileComplete={handleFileComplete} onDelete={handleDeleteFile} />;
      setFile([...file, newFile]);
    }
  }

  const handleDeleteFile = (fileId) => {
    const updatedFiles = file.filter((_, index) => index !== fileId);
    setFile(updatedFiles);
  };

  return (
    <div className='container'>
      <div className='explorer-box'>
        <div onClick={toggleHidden}>
          <FontAwesomeIcon icon={isHidden ? faChevronRight : faChevronDown} size="lg" className='faChevronDown' />
          <span className='mx-2'>Files</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faFile} className="faFile mx-3" size="xl" onClick={addFile} />
          <FontAwesomeIcon icon={faFolder} className='faFolder' size="xl" />
        </div>
      </div>
      <div className={isHidden ? 'hidden' : 'box d-flex flex-column'}>
        {file}
      </div>
    </div>
  );
}

export default Explorer;
