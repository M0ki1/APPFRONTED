import React, { useState } from 'react';
import axios from 'axios';

function ProfilePic({ userId }) {
  const [file, setFile] = useState('');
  const [uploadedFileURL, setUploadedFileURL] = useState(null);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = `http://localhost:3000/api/v1/users/${userId}/upload_profile_picture`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response.data);
      setUploadedFileURL(response.data.fileUrl);
      console.log("This is the url",response.data.fileUrl);
    });
  }

  return (
    <div className="ProfilePic">
      <form onSubmit={handleSubmit}>
        <h1>React File Upload</h1>
        <input type="file" onChange={handleChange} />
        <button type="submit">Upload</button>
      </form>
      {uploadedFileURL && (
        <div>
          <img src={uploadedFileURL} alt="Uploaded content" />
        </div>
      )}
    </div>
  );
}

export default ProfilePic;
