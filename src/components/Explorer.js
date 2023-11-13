import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight, faFile, faFolder } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
import File from './File';
import Folder from './Folder';

function Explorer() {
  const [isHidden, setIsHidden] = useState(false);
  const [items, setItems] = useState([]);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleItemComplete = () => {
    setIsCreatingFile(false);
    setIsCreatingFolder(false);
  }

  const addItem = (type, defaultName) => {
    if(isHidden){
      setIsHidden(!isHidden);
    }
    if (type === 'file' && !isCreatingFile && !isCreatingFolder) {
      setIsCreatingFile(true);
      const uniqueFileId = uuidv4();
      const newFile = {
        type: 'file',
        id: uniqueFileId,
        name: defaultName || 'New File',
      };
      setItems([...items, newFile]);
    } else if (type === 'folder' && !isCreatingFolder && !isCreatingFile) {
      setIsCreatingFolder(true);
      const uniqueFolderId = uuidv4();
      const newFolder = {
        type: 'folder',
        id: uniqueFolderId,
        name: defaultName || 'New Folder',
      };
      setItems([...items, newFolder]);
    }
  }

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    setIsCreatingFile(false);
  setIsCreatingFolder(false);
  };

  return (
    <div className='container'>
      <div className='explorer-box'>
        <div onClick={toggleHidden}>
          <FontAwesomeIcon icon={isHidden ? faChevronRight : faChevronDown} size="lg" className='faChevronDown' />
          <span className='mx-2'>Files</span>
        </div>
        <div>
          <FontAwesomeIcon icon={faFile} className="faFile mx-3" size="xl" onClick={() => addItem('file')} />
          <FontAwesomeIcon icon={faFolder} className='faFolder' size="xl" onClick={() => addItem('folder')} />
        </div>
      </div>
      <div className={isHidden ? 'hidden' : 'box d-flex flex-column'}>
        {items.map((item) => {
          if (item.type === 'file') {
            return (
              <File
                key={item.id}
                fileId={item.id}
                fileName={item.name}
                onItemComplete={handleItemComplete}
                onDelete={handleDeleteItem}
              />
            );
          } else if (item.type === 'folder') {
            return (
              <Folder
                key={item.id}
                folderId={item.id}
                folderName={item.name}
                onItemComplete={handleItemComplete}
                onDelete={handleDeleteItem}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Explorer;
