import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../shared/services/common.service';
import { VahanService } from '../../services/vahan.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-vahan-list-details',
  standalone: false,
  templateUrl: './vahan-list-details.component.html',
  styleUrl: './vahan-list-details.component.scss'
})
export class VahanListDetailsComponent {
  isLoading: boolean = false;
  columns : any;
  vahanDeviceList:any
  editData :any
  userDetails: any;
  constructor(
    private bsmodalService : BsModalService,
    private commonService : CommonService,
    private vahanService : VahanService
  ) {
    this.commonService.getUserDetails().subscribe((res : any) => {
      if(res) {
        this.userDetails = res;
      }
    })
   }

  ngOnInit() {    
    this.setInitialTable();
    if(this.editData) {
      this.getVahanDetails();
    }
  }
  setInitialTable() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      {key : 'Vahan Sno', title : 'Vahan Sno'},
      { key: 'IMEI', title: 'IMEI' },
      { key: 'UID', title: 'UID' },
      { key: 'ICCID', title: 'ICCID' },
      { key: 'Vahan', title: 'Vahan' },
    ]
  }

  getVahanDetails() {
    this.isLoading = true;
    let payload = {
      "clientId": Number(this.editData.created_by),
      "fkRequestId": this.editData.pk_request_id
    }
    this.vahanService.vahanSubList(payload).subscribe((res : any) => {
      this.isLoading = false;
      this.vahanDeviceList = res?.body?.result;
      console.log(res);
      
    })

  }



  cancel() {
    this.bsmodalService.hide();
  }

  downloadExcel() {
    if (!this.vahanDeviceList || this.vahanDeviceList.length === 0) {
      return;
    }

    const excelData = this.vahanDeviceList.map((item: any, index: number) => ({
      'S.No': index + 1,
      'Vahan SNo': item.vahanSno,
      'IMEI': item.imei,
      'UI': item.uid,
      'ICCID': item.iccid,
      "Vahan": item.vahanString ? item.vahanString : ""
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Vahan Details');
        XLSX.writeFile(wb, 'vahan_details.xlsx');
  }

  downloadText() {
    if (!this.vahanDeviceList || this.vahanDeviceList.length === 0) {
      return;
    }

    const textContent = this.vahanDeviceList
      .map((item:any) => item.vahanString)
      .join('\n');

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vahan_strings.txt';
    link.click();
    window.URL.revokeObjectURL(url);
  }
}
