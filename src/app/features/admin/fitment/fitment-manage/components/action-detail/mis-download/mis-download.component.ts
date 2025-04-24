import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import html2canvas from 'html2canvas';
import { BsModalService } from 'ngx-bootstrap/modal';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-mis-download',
  standalone: false,
  templateUrl: './mis-download.component.html',
  styleUrl: './mis-download.component.scss'
})
export class MisDownloadComponent {
  @ViewChildren('printSection') printSections: QueryList<ElementRef> | any;
  isLoading: boolean = false
  selectDeviceId:any
  fitmentData:any
  misDownloadData:any
  constructor(
   
    private bsModalService: BsModalService
  ){}

  ngOnInit() {
   console.log("misDownloadData",this.misDownloadData);
   
  }

  cancel() {
    this.bsModalService.hide()
  }

  async printContent() {
    this.isLoading = true;
    const printSections = this.printSections.toArray();
  
    if (printSections.length === 0) {
      console.error('No sections to print');
      return;
    }
  
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
  
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
  
    for (const section of printSections) {
      const element = section.nativeElement;
        const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
  
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width / 2;
      const imgHeight = canvas.height / 2;
  
      const ratio = Math.min(pageWidth / imgWidth, (pageHeight - 20) / imgHeight);
      const fitWidth = imgWidth * ratio;
      const fitHeight = imgHeight * ratio;
  
      const xOffset = (pageWidth - fitWidth) / 2;
      const yOffset = 10;
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, fitWidth, fitHeight);
        if (section !== printSections[printSections.length - 1]) {
        pdf.addPage();
      }
    }
      window.open(pdf.output('bloburl'), '_blank');
    this.isLoading = false;

  }
  
}
