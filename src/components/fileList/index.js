import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

// import { Container, FileInfo, Preview } from './styles';
import 'react-circular-progressbar/dist/styles.css';

const fileList = () => (
  <Container>
    <li>
      <FileInfo>
        <Preview src="image/IDPBNAC.png" />
        <div>
          <strong>profile.png</strong>
          <span>
            64kb
            <button type="button" onClick={() => {}}>
              Excluir
            </button>
          </span>
        </div>
      </FileInfo>
      <div>
        <CircularProgressbar
          styles={{
            root: { width: 24 },
            path: { stroke: '#7159c1' },
          }}
          strokeWidth={10}
          percentage={60}
        />
        <a
          href="https://sistemaidpb.s3.amazonaws.com/CAMPO%20GRANDE.png"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdLink styles={{ marginRight: 8 }} size={24} color="#222" />
        </a>
        <MdCheckCircle size={24} color="#78e5d5" />
        <MdError size={24} color="#e57878" />
      </div>
    </li>
  </Container>
);

export default fileList;
