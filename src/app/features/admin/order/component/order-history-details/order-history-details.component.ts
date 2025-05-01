import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-order-history-details',
  standalone: false,
  templateUrl: './order-history-details.component.html',
  styleUrl: './order-history-details.component.scss'
})
export class OrderHistoryDetailsComponent {
  columns: any;
  editData:any;
  constructor(
    private bsModelService : BsModalService
  ){};

  ngOnInit() {
    this.columns = [
      { key: 'Vahan Sno.', title: 'Vahan Sno.' },
      { key: 'First Sim', title: 'First Sim' },
      { key: 'Second Sim', title: 'Second Sim' },
      { key: 'IMEI', title: 'IMEI' },
      { key: 'UID', title: 'UID' },
      { key: 'ICCID', title: 'ICCID' }
    ]
  }

  cancel() {
    this.bsModelService.hide();
  }
}
