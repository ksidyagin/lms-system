import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lesson-preview',
  templateUrl: './lesson-preview.component.html',
  styleUrls: ['./lesson-preview.component.scss']
})
export class LessonPreviewComponent implements OnInit {

  constructor() { }

  courseName: string = 'Course name'
  authorName: string = 'Roman Kozlov'
  authorPath: string = 'AngularCLI & ReactJS'
  authorDesc: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut justo metus. Aliquam faucibus ipsum vel est varius, eget scelerisque diam efficitur. Vivamus dignissim, sem ut mattis facilisis, justo diam tristique lectus, id tincidunt magna nulla eu quam. Cras iaculis cursus egestas. Sed elit mauris, mollis ut augue eget, malesuada.'
  authorDuty: string = 'Instructor'
  avatarURL: string = 'https://cdn-icons-png.flaticon.com/512/147/147144.png'

  routeItems;

  lessonName: string = 'Lesson name'
  lessonDesc: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut justo metus. Aliquam faucibus ipsum vel est varius, eget scelerisque diam efficitur. Vivamus dignissim, sem ut mattis facilisis, justo diam tristique lectus, id tincidunt magna nulla eu quam. Cras iaculis cursus egestas. Sed elit mauris, mollis ut augue eget, malesuada.'
  lessonTime: string = '50:13'
  lessonURL: string = 'https://www.youtube.com/watch?v=hBTNyJ33LWI'
  
  courseTime: string = '2h 34m'
  courseLevel: string = 'Beginner'
  courseRating: number = 4.4
  courseRatingCount: number = 20

  logoURL: string = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1200px-Angular_full_color_logo.svg.png'

  ngOnInit(): void {
    this.routeItems = [
      {label: 'Personal', routerLink:'personal'},
      {label: 'Seat', routerLink:'seat'},
      {label: 'Payment', routerLink:'payment'},
      {label: 'Confirmation', routerLink:'confirmation'},
  ];
  }

}
