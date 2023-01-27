
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

@Component({
  selector: 'app-memberdetails',
  templateUrl: './memberdetails.component.html',
  styleUrls: ['./memberdetails.component.css']
})
export class MemberdetailsComponent implements OnInit {

  sessionUser: any;
  memberInfo: any;

  constructor(public autenticationService: AutenticationService,
    public globalService :GlobalService,
    public memberService : MemberService,
    public router: Router) {
    this.sessionUser = this.autenticationService.getSessionUser();


  }

  ngOnInit(): void {

    this.getmemberById(this.sessionUser.MemberId);
    
  }


  getmemberById(id){
    this.memberService.getMemberById(id).subscribe(result => {
      if(result != null){
        this.memberInfo = result;
        console.log(result);
     
      } else{
        this.globalService.showSwal('Error', 'No User found. Please Login with a registerd user.', 'error');
        this.router.navigateByUrl('/');

      }
    }, error =>{
      this.globalService.errorResponseHandler(error)
    })
  }




}












