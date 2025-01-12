import { jsPDF } from 'jspdf';
import { TextObjectType, ImageObjectType } from './PresentationType'; // Assume you have these types
import { PresentationType } from './PresentationType';
import { SLIDE_HEIGHT, SLIDE_WIDTH } from '../view/slide/Slide';

const exportToPDF = (presentation: PresentationType) => {
    const doc = new jsPDF();
    presentation.slides.forEach((slide, index) => {

        if (index > 0) {
            doc.addPage();
        }

        doc.setFillColor(slide.background); 
        doc.rect(0, 0, SLIDE_HEIGHT, SLIDE_WIDTH, 'F');

        slide.objects.forEach((obj) => {
            if (obj.type === 'text') {

                const textObject = obj as TextObjectType;
                doc.setFont(textObject.fontFamily, 'normal');
                doc.setTextColor(textObject.fontColor);
                doc.setFontSize(textObject.fontSize);
                doc.text(textObject.text, textObject.x, textObject.y);

            } else if (obj.type === 'image') {

                const imageObject = obj as ImageObjectType;
                const imgData     = imageObject.src; 
                const imgFormat   = imgData.startsWith('data:image/png') ? 'PNG' : 'JPEG';

                doc.addImage(imgData, imgFormat, imageObject.x, imageObject.y, imageObject.width, imageObject.height);
            }
        });
    });
    doc.save(`${presentation.title}.pdf`);
};

export default exportToPDF;