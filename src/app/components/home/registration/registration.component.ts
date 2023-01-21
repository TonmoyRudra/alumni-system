import { MemberService } from './../../../shared/service/member/member.service';
import { IRegistrationDto } from './../../../shared/interface/registration.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalService } from 'src/app/shared/service/global/global.service';
import { DxFormComponent } from 'devextreme-angular';
import * as $ from 'jquery';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  @ViewChild(DxFormComponent) form: DxFormComponent
  studentFormData: IRegistrationDto;
  UniversityBatchList: any[] = [];
  MSSYearList: any[] = [];
  fileData: File;
  buttonOptions: any = {
    width: '100%',
    text: 'Register',
    type: 'success',
    useSubmitBehavior: true,
  };
  uploadedFilePath: any;
  constructor(public memberService: MemberService, public globalService: GlobalService) { }

  ngOnInit(): void {
    this.getUniversityBatch();
    this.getMSSYear();


    $(".file-upload").on('change', function () {
      //readURL(this);
    });

    $(".upload-button").on('click', function () {
      $(".file-upload").click();
    });

  }

  getUniversityBatch() {
    for (let index = 1; index < 20; index++) {
      this.UniversityBatchList.push('Batch ' + index);
    }
    return this.UniversityBatchList;
  }

  getMSSYear() {
    for (let index = 1979; index < new Date().getFullYear() + 1; index++) {
      this.MSSYearList.push(index);
    }
    return this.MSSYearList;
  }


  onFormSubmit(e) {
    this.globalService.showSpinner(true);
    if(this.fileData){
      this.uploadFile(this.fileData);
    } else {
      this.registration();
    }

    e.preventDefault();
  };

  filePickerData (event) {
    const target: DataTransfer = event.target as DataTransfer;
    if (target.files && target.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('.profile-pic').attr('src', e.target.result);
      }
      reader.readAsDataURL(target.files[0]); // bind the picked image on a image src;
      this.fileData = target.files[0];
      console.log(target.files[0]);
      //this.uploadFile(this.fileData);
    }
  }

  uploadFile(fileData) {
    this.memberService.uploadFile(fileData).subscribe(result => {
      console.log(result);
      this.uploadedFilePath = result;
      this.registration();
    }, err => {
      console.log(err);
      this.globalService.showSpinner(false);
    })
  }

  registration(){
    if(this.uploadedFilePath) this.studentFormData.ProfilePicture = this.uploadedFilePath;
      console.log(this.studentFormData);
      this.globalService.showSpinner(true);
      this.memberService.create(this.studentFormData).subscribe(result => {
        console.log(result);
        this.globalService.showSpinner(false);
        this.form.instance.resetValues();

        this.globalService.showSwal('Success', 'Registration Done. Your mobile number is your initial login id and password', 'success');
      }, err => {
        console.log(err);
        this.globalService.showSpinner(false);
      });
  }

}
