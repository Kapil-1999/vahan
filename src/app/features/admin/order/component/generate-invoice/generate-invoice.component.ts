import { Component } from '@angular/core';

@Component({
  selector: 'app-generate-invoice',
  standalone: false,
  templateUrl: './generate-invoice.component.html',
  styleUrl: './generate-invoice.component.scss'
})
export class GenerateInvoiceComponent {
  columns :any;

  ngOnInit() {
    this.setInitialTable();
  }

  setInitialTable() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'Item Name', title: 'Item Name' },
      { key: 'HSN', title: 'HSN' },
      { key: 'Product', title: 'Product' },
      { key: 'Plan', title: 'Plan' },
      { key: 'State', title: 'State' },
      { key: 'Quantity', title: 'Quantity' },
      { key: 'Expected Dispatch', title: 'Expected Dispatch' },
      { key: 'Remark', title: 'Remark' },
      { key: 'Action', title: 'Action' }
    ]
  }
}
