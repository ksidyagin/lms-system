import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Course, Section, Module } from 'src/app/api/Course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [
    {
      id: 1,
      image_url: 'assets/images/course/mailchimp_430x168.png',
      title: 'Newsletter Design',
      preview_description: 'Learn the fundamentals of working with Angular and how to create basic applications.',
      description: 'It’s not every day that one of the most important front-end libraries in web development gets a complete overhaul. Keep your skills relevant and up-to-date with this comprehensive introduction to Google’s popular community project.',
      author_id: 1,
      author_first_name: 'Elijah',
      author_second_name: 'Murray',
      author_third_name: '',
      time: 6,
      number_lessons: 12,
      user_level: 1,
      rating: 4.5,
      trailer_url: 'https://www.youtube.com/watch?v=3MQ097HzO70',
      main_topics: [
        'Fundamentals of working with Angular',
        'Create complete Angular applications',
        'Working with the Angular CLI',
        'Understanding Dependency Injection',
        'Testing with Angular',
      ],
      sections: [
        {
          local_id: 0,
          title: 'Course Preview',
          description: '',
          modules: [
            {
              local_id: 0,
              title: 'Watch trailer',
              type: '',
              content: '',
              time: 90
            }
          ]
        },
        {
          local_id: 0,
          title: 'Course Started',
          description: '',
          modules: [
            {
              local_id: 0,
              title: 'Introduction',
              type: '',
              content: '',
              time: 90
            },
            {
              local_id: 1,
              title: 'Introduction to TS',
              type: '',
              content: '',
              time: 90
            },
            {
              local_id: 2,
              title: 'Comparing Angular to AngularJS',
              type: '',
              content: '',
              time: 90
            },
            {
              local_id: 3,
              title: 'Quiz: Getting Started With Angular',
              type: '',
              content: '',
              time: 90
            },
          ]
        },
      ]
    },
  ]

  sortOptions: string[] = [
    'новизне',
    'популярности'
  ]

  selectedDrop: SelectItem

  sortOrder: number

  sortField: string

  showedCourses: number = 4

  allCourses: number = 10

  filtersFlag = false

  visibleSidebar = false;

  constructor(private router: Router, private courseService: CourseService) {
  }

  ngOnInit() {
    // Получение this.showedCourses курсов
    this.courseService.get_courses(0, this.allCourses).subscribe(value => {
      this.courses = value;
      this.courses.forEach(element => {
        if (isNaN(element.rating)) {
          element.rating = 0
        }
      })
      // Получением заново количество курсов (если получено меньше, чем запрашивали)
      if (this.showedCourses > this.courses.length) this.showedCourses = this.courses.length;
      this.allCourses = this.courses.length;
      if (this.courses.length == 0) {
        this.showedCourses = 0
      }
    });
  }

  showFilters() {
    // alert("show!")
    this.filtersFlag = !this.filtersFlag
  }

  closeFilters(event) {
    this.filtersFlag = !this.filtersFlag
  }

  goToCourse(course_id: any): void {
    localStorage.setItem('course_id', course_id)
    this.router.navigate(['', 'course-preview', course_id])
  }

}
