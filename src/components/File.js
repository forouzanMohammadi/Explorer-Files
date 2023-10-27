import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function File({ fileId, onFileComplete, onDelete }) {
 const [isFileClicked, setIsFileClicked] = useState(true);
 const [isEditing, setIsEditing] = useState(false);
 const [fileName, setFileName] = useState('New File');
 const tempFileNameRef = useRef();

 const handleBlur = () => {
   if (tempFileNameRef.current !== undefined && tempFileNameRef.current.trim() !== "") {
     setIsFileClicked(false);
     setFileName(tempFileNameRef.current);
     onFileComplete();
   }
   setIsEditing(false);
 };

 const handleChange = (event) => {
   tempFileNameRef.current = event.target.value;
 };

 const handleKeyPress = (event) => {
   if (event.key === "Enter" && tempFileNameRef.current !== undefined && tempFileNameRef.current.trim() !== "") {
     handleBlur();
   }
 };

 const handleDelete = () => {
   onDelete(fileId);
 };

 const handleEdit = () => {
  //  if (!isEditing) {
  //    tempFileNameRef.current = fileName; 
  //  }
   setIsEditing(!isEditing);
 };

 return (
   <div className='d-flex justify-content-between align-items-center my-2'>
     <div className='d-flex align-items-center'>
       <FontAwesomeIcon icon={faFile} className="file" size="lg" />
       {isFileClicked || isEditing ? (
         <input
         type="text"
         defaultValue={tempFileNameRef.current}
         onBlur={handleBlur}
         onChange={handleChange}
         onKeyPress={handleKeyPress}
         autoFocus
         placeholder="file name..."
       />
       ) : (
         <span className='fileName'>{fileName}</span>
       )}
     </div>
     <div>
       <FontAwesomeIcon icon={faPen} className='icons mx-3' onClick={handleEdit} />
       <FontAwesomeIcon icon={faTrash} className='icons' onClick={handleDelete} />
     </div>
   </div>
 );
}

export default File;
