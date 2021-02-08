import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface DocumentDefinition {
  content: (StyledText | Paragraph | Image)[];
  styles: Titles;
}

interface Image {
  image: string;
  width?: number;
  height?: number;
}

interface Titles {
  header?: Style;
  bigger?: Style;
}

interface Style {
  fontSize?: number;
  bold?: boolean;
}

interface Paragraph {
  text: (StyledText | string)[];
}

interface StyledText {
  text: string;
  style: string;
}

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private docDefinition: DocumentDefinition = {
    content: [],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      bigger: {
        fontSize: 14,
        bold: true,
      },
    },
  };

  constructor() {}

  clear() {
    this.docDefinition.content = [];
  }

  addHeader(header: string) {
    const paragraph: StyledText = {
      text: header,
      style: 'header',
    };
    this.docDefinition.content.push(paragraph);
  }

  addField(title: string, text: string) {
    const paragraph = {
      text: [
        {
          text: title + ' ',
          style: 'bigger',
        },
        text,
      ],
    };
    this.docDefinition.content.push(paragraph);
  }

  addImage(avatar: string) {
    const image: Image = {
      image: avatar,
      width: 400,
    };
    this.docDefinition.content.push(image);
  }

  downloadPDF() {
    return pdfMake.createPdf(this.docDefinition).download();
  }

  openPDF() {
    pdfMake.createPdf(this.docDefinition).open();
  }

  printPDF() {
    pdfMake.createPdf(this.docDefinition).print();
  }
}
