import React, { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFolder,
  faPen,
  faTrash,
  faFile,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons'
import { v4 as uuidv4 } from 'uuid'
import File from './File'

function Folder({ folderId, onItemComplete, onDelete }) {
  const [isFolderClicked, setIsFolderClicked] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [folderName, setFolderName] = useState('New Folder')
  const tempFolderNameRef = useRef()
  const [subItems, setSubItems] = useState([])
  const [isFolderOpen, setIsFolderOpen] = useState(false);

  const handleBlur = () => {
    if (
      tempFolderNameRef.current !== undefined &&
      tempFolderNameRef.current.trim() !== ''
    ) {
      setIsFolderClicked(false)
      setFolderName(tempFolderNameRef.current)
      onItemComplete()
    }
    setIsEditing(false)
  }

  const handleChange = (event) => {
    tempFolderNameRef.current = event.target.value
  }

  const handleKeyPress = (event) => {
    if (
      event.key === 'Enter' &&
      tempFolderNameRef.current !== undefined &&
      tempFolderNameRef.current.trim() !== ''
    ) {
      handleBlur()
    }
  }

  const handleDelete = () => {
    onDelete(folderId)
  }

  const handleEdit = () => {
    setIsEditing(!isEditing)
  }

  const handleAddFile = () => {
    setIsFolderOpen(true)
    const newFile = {
      type: 'file',
      id: uuidv4(),
      name: 'New File',
    }
    setSubItems([...subItems, newFile])
  }

  const handleAddFolder = () => {
    setIsFolderOpen(true)
    const newFolder = {
      type: 'folder',
      id: uuidv4(),
      name: 'New Folder',
      subItems: [],
    }
    setSubItems([...subItems, newFolder])
  }

  const deleteChild = (childId) => {
    setSubItems((prevSubItems) =>
      prevSubItems.filter((subItem) => subItem.id !== childId)
    );
    onItemComplete();
  };
  
  const handleDeleteChild = (childId) => {
    deleteChild(childId);
    onItemComplete(); 
  };

  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center my-2 folder-row">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon
            icon={isFolderOpen ? faFolderOpen : faFolder}
            className="folder"
            size="lg"
            onClick={() => setIsFolderOpen(!isFolderOpen)}
          />
          {isFolderClicked || isEditing ? (
            <input
              type="text"
              defaultValue={tempFolderNameRef.current}
              onBlur={handleBlur}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              autoFocus
              placeholder="folder name..."
            />
          ) : (
            <span className="folderName">{folderName}</span>
          )}
        </div>
        <div className="folder-editing">
          <FontAwesomeIcon
            icon={faPen}
            className="icons mx-2"
            onClick={handleEdit}
          />
          <FontAwesomeIcon
            icon={faFile}
            className="icons mx-2 subFile"
            onClick={handleAddFile}
          />
          <FontAwesomeIcon
            icon={faFolder}
            className="icons mx-2 subFolder"
            onClick={handleAddFolder}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="icons trash"
            onClick={handleDelete}
          />
        </div>
      </div>
      <div >
        {subItems.length > 0 && (
          <div className="sub-items" style={{ display: isFolderOpen ? "block" : "none", paddingLeft: 25 }}>
            {subItems.map((subItem) =>
              subItem.type === 'folder' ? (
                <Folder
                  key={subItem.id}
                  folderId={subItem.id}
                  onItemComplete={onItemComplete}
                  onDelete={handleDeleteChild}
                />
              ) : (
                <File
                  key={subItem.id}
                  fileId={subItem.id}
                  onItemComplete={onItemComplete}
                  onDelete={handleDeleteChild }
                />
              ),
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Folder
