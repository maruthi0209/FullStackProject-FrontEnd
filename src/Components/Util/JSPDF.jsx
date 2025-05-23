import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IoMdDownload } from "react-icons/io";


export default function PdfButton() {
  const generatePDF = () => {
    const input = document.getElementById('pdfContent');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('page-content.pdf');
    });
  };

  return (
    <div>
      <button className='m-1 border-none space-mono-regular' onClick={generatePDF}> <IoMdDownload /> .pdf</button>
    </div>
  );
}
