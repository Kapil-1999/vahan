import { Component, Input } from '@angular/core';
import { CommonService } from '../../../../../shared/services/common.service';

@Component({
  selector: 'app-vehicle-detail',
  standalone: false,
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent {
  @Input() searchListDta: any

  @Input() isLoading: boolean = false;
  selectedTabIndex = 0;
  public columns!: any;
  userDetails: any
  vehicleDetails: any
  searchKeyword: string = '';

  constructor(
    private commonService: CommonService,
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
  }

  setInitialValue() {
    this.columns = [
      { key: 'Vehicle Number', title: 'Vehicle Number' },
      { key: 'Vehicle Model', title: 'Vehicle Model' },
      { key: 'Vehicle Make	', title: 'Vehicle Make	' },
      { key: 'Chassis Number', title: 'Chassis Number' },
      { key: 'Engine Number', title: 'Engine Number' },
      { key: 'Registration', title: 'Registration' },
      { key: 'Manufacturing Year', title: 'Manufacturing Year' },
      { key: 'SOS Button', title: 'SOS Button' },
      { key: 'Details Fetched', title: 'Details Fetched' },
      { key: 'Image 1', title: 'Image 1' },
      { key: 'Image 2', title: 'Image 2' },
    ]
  }
}
