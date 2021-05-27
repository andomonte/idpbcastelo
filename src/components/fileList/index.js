import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import { uniqueId } from 'lodash';

import { Container, FileInfo, Preview } from './styles';
import 'react-circular-progressbar/dist/styles.css';

const fileList = ({ files }) => (
  <div>
    {console.log('filesList:', files)}
    <Container>
      {files.map((uploadedFile) => (
        <li key={uniqueId()}>
          <FileInfo>
            <Preview src={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize}
                {uploadedFile.url && (
                  <button type="button" onClick={() => {}}>
                    Excluir
                  </button>
                )}
              </span>
            </div>
          </FileInfo>
          <div>
            {!uploadedFile.uploaded && !uploadedFile.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 30 },
                  path: { stroke: '#7159c1' },
                }}
                strokeWidth={10}
                // percentage={20} // {uploadedFile.progress}

                value={uploadedFile.progress}
              />
            )}
            {uploadedFile.url && (
              <a
                href="https://sistemaidpb.s3.amazonaws.com/CAMPO%20GRANDE.png"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MdLink styles={{ marginRight: 8 }} size={24} color="#222" />
              </a>
            )}
            {uploadedFile.uploaded && (
              <MdCheckCircle size={24} color="#78e5d5" />
            )}
            {uploadedFile.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}
    </Container>
  </div>
);

export default fileList;
