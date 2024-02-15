import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import Docxtemplater from 'docxtemplater';
import Pizzip from 'pizzip';
import { saveAs } from 'file-saver';
import ReactDOMServer from 'react-dom/server';
import { ResumeLayout } from '../../resume/ResumeLayout';
import { StyledButton } from '../atoms';
// import { ResumeLayout,StateContext } from './ResumeLayout';

export const DownloadResume = () => {
  const resumeLayoutRef = useRef(null);

  const generateDocContent = async () => {
    try {
      if (!resumeLayoutRef.current) {
        throw new Error('resumeLayoutRef is null');
      }

      // Render the ResumeLayout component inside a StateContext.Provider
      const jsxContent = (
        // <StateContext.Provider value={{}}>
          <ResumeLayout />
        // </StateContext.Provider>
      );

      // Convert JSX content to HTML string
      const html = ReactDOMServer.renderToString(jsxContent);

      // Create a canvas to capture the HTML content
      const canvas = await html2canvas(resumeLayoutRef.current);
      const imageData = canvas.toDataURL('image/png');

      // Create a Word document using Docxtemplater
      // const doc = new Docxtemplater();
      // const zip = new Pizzip();
      // doc.loadZip(zip);
      // doc.setData({ resumeImage: imageData });
      // doc.render();

      // const blob = doc.getZip().generate({ type: 'blob' });

      return imageData;
    } catch (error) {
      console.error('Error generating document:', error);
      throw error;
    }
  };

  const handleDownload = async () => {
    try {
      const docContent = await generateDocContent();

      saveAs(docContent, `Resume_Builder_${Date.now()}.doc`);
    } catch (error) {
      console.error('Error handling download:', error);
    }
  };

  return (
    <>
      <StyledButton variant='outlined' onClick={handleDownload}>Download as DOC</StyledButton>

      <div ref={resumeLayoutRef} className='hidden'>
        <ResumeLayout />
      </div>
    </>
  );
};

export default DownloadResume;
