import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course, Feedback, FeedbackList } from 'src/app/api/Course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-courses-preview',
  templateUrl: './courses-preview.component.html',
  styleUrls: ['./courses-preview.component.scss']
})
export class CoursesPreviewComponent implements OnInit, OnDestroy {

  course_info: Course = {
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
  }
  course_id: string
  course_time_hours: number
  course_time_minutes: number
  user_levels = ['Начинающий', 'Средний', 'Прокаченный']
  user_level: string
  authorDuty: string = 'Инструктор'
  avatarURL: string = 'https://cdn-icons-png.flaticon.com/512/147/147144.png'
  courseRating: number
  user_role: any = localStorage.getItem('user_role')
  edit_course_id: string

  carouselResponsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 2
    },
    {
      breakpoint: '560px',
      numVisible: 1,
      numScroll: 1
    }
  ];

  ratingList: FeedbackList = {
    count: 0,
    rating: 0,
    feedbacks: [],
    list: [
      {
        mark: 5,
        count: 0,
      },
      {
        mark: 4,
        count: 0,
      },
      {
        mark: 3,
        count: 0,
      },
      {
        mark: 2,
        count: 0,
      },
      {
        mark: 1,
        count: 0,
      },
    ],
  }

  constructor(private router: Router, private courseService: CourseService) { }


  ngOnInit(): void {
    this.course_id = localStorage.getItem('course_id')
    this.edit_course_id = this.course_id
    this.courseService.get_course(this.course_id)
      .subscribe(value => {
        this.course_info = value;
        console.log('course info ', this.course_info)
        this.course_time_hours = Math.trunc(this.course_info.time / 60)
        this.course_time_minutes = this.course_info.time % 60
        this.user_level = this.user_levels[this.course_info.user_level - 1]
      });
    this.courseService.get_feedback(this.course_id)
      .subscribe(value => {
        let sum = 0
        this.ratingList.feedbacks = value;
        if (this.ratingList.feedbacks.length != 0) {
          this.ratingList.count = this.ratingList.feedbacks.length
          this.ratingList.feedbacks.forEach(element => {
            for (let i = 0; i < 5; i++) {
              if (this.ratingList.list[i].mark === element.mark) {
                this.ratingList.list[i].count++
              }
            }
            sum += element.mark
            this.ratingList.rating = Number((sum / this.ratingList.count).toFixed(2))
            this.courseRating = Math.round(this.ratingList.rating)
          })
        } else {
          this.courseRating = 0
        }

        console.log('course_feedbacks ', this.ratingList)
      });
  }

  ngOnDestroy(): void {
    localStorage.removeItem('course_id')
  }

  goToEditCourse() {
    localStorage.setItem('edit_course_id', this.edit_course_id)
    this.router.navigate(['', 'instructor-edit-course', this.edit_course_id])
  }
}
