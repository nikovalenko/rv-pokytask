import axios from 'axios';
import React, { FC, useState } from 'react';

import { Button } from '../../../../components';
import { UPLOAD_URL } from '../../../../config/config';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { saveFetchedJson } from '../../../../store/pokemonsDataSlice';
import { uploadFailure,uploadRequest } from '../../../../store/uploadSlice';

const UploadButton: FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const token = useAppSelector(state => state.token.token);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        dispatch(uploadRequest());

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.post(UPLOAD_URL, formData, config);

        dispatch(saveFetchedJson(response.data));
      } catch (error) {
        dispatch(uploadFailure(error as string));
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </Button>
    </div>
  );
};

export default UploadButton;
