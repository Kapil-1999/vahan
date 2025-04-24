import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-download-certificate',
  standalone: false,
  templateUrl: './download-certificate.component.html',
  styleUrl: './download-certificate.component.scss'
})
export class DownloadCertificateComponent {
  tittle: any
  button: any
  certificateValue:any
  constructor(
    private modalService: BsModalService,
  ){}

  ngOnInit(){
    
  }


  downloadFile(imageUrl: string): void {
    window.open(imageUrl, '_blank');
}

  
    /* for Hide Modal */
    cancel() {
      this.modalService.hide()
    }
}
