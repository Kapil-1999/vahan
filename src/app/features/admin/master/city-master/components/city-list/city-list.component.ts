import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CommonService } from '../../../../../shared/services/common.service';
import { CreateStateComponent } from '../../../state-master/components/create-state/create-state.component';
import { StateService } from '../../../state-master/services/state.service';
import { CityService } from '../../services/city.service';
import { CreateCityComponent } from '../create-city/create-city.component';

@Component({
  selector: 'app-city-list',
  standalone: false,
  templateUrl: './city-list.component.html',
  styleUrl: './city-list.component.scss'
})
export class CityListComponent {
  isLoading: boolean = false;
  pagesize = {
    limit: 25,
    offset: 1,
    count: 0,
  };
  config = {
    displayKey: "text",
    height: '200px',
    search: true
  }
  public columns!: any;
  bsModalRef!: BsModalRef;
  userDetails: any
  cityListData: any;
  selectedState: any;
  stateData: any;
  get startValue(): number {
    return this.pagesize.offset * this.pagesize.limit - (this.pagesize.limit - 1);
  }
  get lastValue(): number {
    const calculatedLastValue = this.startValue + this.pagesize.limit - 1;
    return Math.min(calculatedLastValue, this.pagesize.count);
  }

  constructor(
    private cityService: CityService,
    private commonService: CommonService,
    private modalService: BsModalService
  ) {
    this.commonService.getUserDetails().subscribe((userDetails) => {
      this.userDetails = userDetails;
    });
  }

  ngOnInit() {
    this.setInitialValue()
    this.getStateDropdown()
  }

  setInitialValue() {
    this.columns = [
      { key: 'S.No.', title: 'S.No.' },
      { key: 'City Name', title: 'City Name' },
      { key: 'Action', title: 'Action' },

    ]
  }

  getStateDropdown() {
    this.commonService.stateDropdownList().subscribe((res: any) => {
      if (res?.body?.isSuccess == true) {
        this.stateData = res.body.result.map((item: any) => ({
          value: item.stateId,
          text: item.stateName
        }));
        this.selectedState = this.stateData[0]
        this.getCityList()
      }
    })
  }

  onSelectState(event: any) {
    this.cityListData = []
    this.selectedState = event?.value
    this.getCityList()

  }


  getCityList() {
    this.cityListData = []
    this.isLoading = true
    let payload = {
      "stateId": Number(this.selectedState?.value)
    }
    this.cityService.cityList(payload).subscribe((res: any) => {
      this.isLoading = false
      if (res?.body?.isSuccess == true) {
        this.cityListData = res?.body?.result
        this.pagesize.count = this.cityListData?.length

      }
    })
  }

  onAddCity(value: any) {
    const initialState: ModalOptions = {
      initialState: {
        stateData:this.selectedState,
        editData: value ? value : '',
      },
    };
    this.bsModalRef = this.modalService.show(
      CreateCityComponent,
      Object.assign(initialState, {
        class: 'modal-md modal-dialog-centered alert-popup',
      })
    );
    this.bsModalRef?.content?.mapdata?.subscribe((val: any) => {
      this.pagesize.offset = 1;
      this.pagesize.limit = 25;
      this.getCityList()
    });
  }


  onTablePageChange(event: number) {
    this.pagesize.offset = event;
  }

  onPageSizeChange(event: Event): void {
    const selectedSize = parseInt((event.target as HTMLSelectElement).value, 10);
    this.pagesize.limit = selectedSize;
  }
}
