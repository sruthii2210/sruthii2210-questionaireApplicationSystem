import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  staff()
  {
    this.router.navigate(['stafflogin'])
  }
  student()
  {
    this.router.navigate(['studentlogin'])
  }
  headmaster()
  {
    this.router.navigate(['headmasterdashboard'])
  }
}
