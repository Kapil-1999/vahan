import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-raw-data-list',
  standalone: false,
  templateUrl: './raw-data-list.component.html',
  styleUrl: './raw-data-list.component.scss'
})
export class RawDataListComponent {
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  isLoading:boolean = false;
  columns : any;
  rawDataList: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }

  ngOnInit(): void {    
    this.setInitialTable()
  }

  setInitialTable() {
    this.columns = [
      {key : 'Date Time', title : 'Date Time'},
      {key : 'IMEI', title : 'IMEI'},
      {key : 'Raw Data', title : 'Raw Data'}
    ]
  }

  onRawDataReceived(event:any) {
    console.log(event)
    this.rawDataList = event;
    this.pagesize.count = this.rawDataList?.length;
  }

}
