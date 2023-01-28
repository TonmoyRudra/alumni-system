
import { GlobalService } from 'src/app/shared/service/global/global.service';
import { MemberService } from './../../../shared/service/member/member.service';
import { AutenticationService } from './../../../shared/service/autentication/autentication.service';
import { Component, OnInit } from '@angular/core';
import { IEvent } from 'src/app/shared/interface/event.interface';
import { Router } from '@angular/router';

import { ViewChild, ElementRef } from '@angular/core';
import { jsPDF } from "jspdf";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import * as $ from 'jquery';
@Component({
  selector: 'app-memberdetails',
  templateUrl: './memberdetails.component.html',
  styleUrls: ['./memberdetails.component.css']
})
export class MemberdetailsComponent implements OnInit {

  sessionUser: any;
  memberInfo: any;
  uploadedFilePath: any;
  fileData: File;

  constructor(public autenticationService: AutenticationService,
    public globalService :GlobalService,
    public memberService : MemberService,
    public router: Router) {
    this.sessionUser = this.autenticationService.getSessionUser();


  }

  ngOnInit(): void {
    $(".upload-button").on('click', function () {
      $(".file-upload").click();
    });
    this.getmemberById(this.sessionUser.MemberId);

  }


  getmemberById(id){
    this.memberService.getMemberById(id).subscribe(result => {
      if(result != null){
        this.memberInfo = result;
        this.memberInfo.ProfilePictureFullUrl =  this.memberInfo.ProfilePicture ?  this.globalService.domain+"upload/" + this.memberInfo.ProfilePicture : '../../../../assets/images/team1.jpg';
        console.log(result);

      } else{
        this.globalService.showSwal('Error', 'No User found. Please Login with a registerd user.', 'error');
        this.router.navigateByUrl('/');

      }
    }, error =>{
      this.globalService.errorResponseHandler(error)
    })
  }
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
      //this.registration();
    }, err => {
      console.log(err);
      this.globalService.showSpinner(false);
    })
  }



}












