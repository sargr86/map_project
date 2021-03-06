import {Component, OnInit} from '@angular/core';
import {SubjectService} from '@core/services/subject.service';
import {ACCOMMODATIONS_FOLDER} from '@core/constants/global';
import {MainService} from '@core/services/main.service';
import {Router} from '@angular/router';
import {CommonService} from '@core/services/common.service';

@Component({
  selector: 'app-accommodations-home',
  templateUrl: './accommodations-home.component.html',
  styleUrls: ['./accommodations-home.component.scss']
})
export class AccommodationsHomeComponent implements OnInit {
  accommodationObjects;
  accommodationsFolder = ACCOMMODATIONS_FOLDER;
  routerUrl;

  constructor(
    private subject: SubjectService,
    private main: MainService,
    public router: Router,
    public common: CommonService
  ) {
  }

  ngOnInit() {

    this.routerUrl = this.router.url;
    this.common.dataLoading = false;

    this.getObjects();

    this.subject.getMapData().subscribe(dt => {
      this.accommodationObjects = dt.list;
    });
  }

  getObjects() {
    this.main.changePlace({type: 'accommodations'}).subscribe((dt: any) => {

      this.accommodationObjects = dt;
    });


  }

}
