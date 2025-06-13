import { Component, Input, input, SimpleChanges } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';

@Component({
  selector: 'app-device-detail',
  standalone: false,
  templateUrl: './device-detail.component.html',
  styleUrl: './device-detail.component.scss'
})
export class DeviceDetailComponent {
  @Input() searchListDta:any
  isLoading: boolean = false;
  selectedTabIndex = 0;
  public columns!: any;
  userDetails: any
  deviceDetails: any
  searchKeyword: string = '';

  constructor(
    private commonService: CommonService,
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    console.log("searchListDta",this.searchListDta);
    
    this.setInitialValue()
  }

  setInitialValue() {
    this.columns = [
      { key: 'Serial No', title: 'Serial No' },
      { key: 'Imei', title: 'IMEI' },
      { key: 'Iccid', title: 'ICCID' },
      { key: 'Status', title: 'Status' },
      { key: 'Plan Name', title: 'Plan Name' },
      { key: 'Validity', title: 'Validity' },
      { key: 'Version', title: 'Version' },
      { key: 'State', title: 'State' },
      { key: 'SIM 1', title: 'SIM 1' },
      { key: 'SIM 2', title: 'SIM 2' },
      { key: 'Operator', title: 'Operator' },
      { key: 'Device Type', title: 'Device Type' },
      { key: 'Company Name', title: 'Company Name' },
    ]
  }
}
