import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToursService} from '@core/services/tours.service';
import {CommonService} from '@core/services/common.service';
import {SPINNER_DIAMETER} from '@core/constants/global';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '@core/services/auth.service';

@Component({
  selector: 'app-save-tour-type',
  templateUrl: './save-tour-type.component.html',
  styleUrls: ['./save-tour-type.component.scss']
})
export class SaveTourTypeComponent implements OnInit {
  saveTourTypeForm: FormGroup;
  editCase = false;
  redirectUrl = this.auth.checkRoles('admin') ? 'admin/tours/show-types' : 'partners/tours/show-types';
  spinnerDiameter = SPINNER_DIAMETER;

  constructor(
    private _fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _tours: ToursService,
    public common: CommonService,
    private toastr: ToastrService,
    public auth: AuthService
  ) {
  }

  ngOnInit() {
    this.saveTourTypeForm = this._fb.group({
      name: ['', Validators.required],
      id: []
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.common.dataLoading = true;
      this._tours.getOneTourType({id: id}).subscribe((dt: any) => {
        if (dt) {
          this.saveTourTypeForm.patchValue(dt);
          this.editCase = true;
          this.common.dataLoading = false;
        }
      });
    }
  }

  get nameCtrl() {
    return this.saveTourTypeForm.get('name');
  }

  /**
   * Adds or updates tour type info
   */
  saveToursType() {
    this.common.formProcessing = true;

    if (this.editCase) {
      this._tours.updateToursType(this.saveTourTypeForm.value).subscribe((dt => {
        this.common.formProcessing = false;
        this.router.navigate([this.redirectUrl]);
        this.toastr.success('The tour type info has been updated successfully', 'Updated!');
      }));
    } else {

      this._tours.insertToursType(this.saveTourTypeForm.value).subscribe((r: any) => {
        this.common.formProcessing = false;
        this.router.navigate([this.redirectUrl]);
        this.toastr.success('The tour type info has been added successfully', 'Added!');
      });
    }
  }

}
