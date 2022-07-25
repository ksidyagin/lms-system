import { Component, OnInit, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, SelectItem } from 'primeng/api';
import { Course } from 'src/app/api/Course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-instructor-edit-course',
  templateUrl: './instructor-edit-course.component.html',
  styleUrls: ['./instructor-edit-course.component.scss']
})
export class InstructorEditCourseComponent implements OnInit {

  // хлебные крошки
  breadcrumbItems: MenuItem[]

  edit_course_form: FormGroup
  edit_section_form: FormGroup
  edit_course: Course = {}
  categories: SelectItem[]
  tags: any[]

  sections_values: any[]
  selected_tags: any[]
  user_level: any[]
  edit_course_id: string = localStorage.getItem('edit_course_id')

  id: number = 0

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: any) => {
        this.id = params.id
      }
    )

    let sec_temp = [
      {
        title: 'Секция 1',
        description: 'Описание для секции 1',
        edited: false
      },
      {
        title: 'Секция 2',
        description: 'Описание для секции 2',
        edited: false
      },
      {
        title: 'Секция 3',
        description: 'Описание для секции 3',
        edited: false
      }
    ]

    this.user_level = [
      {
        label: 'Начинающий',
        value: {
          id: 1,
        }
      },
      {
        label: 'Средний',
        value: {
          id: 2,
        }
      },
      {
        label: 'Продвинутый',
        value: {
          id: 3,
        }
      },
    ]

    this.courseService.get_info_course(this.edit_course_id).subscribe((value) => {
      this.edit_course = value
      console.log('edit_course ', this.edit_course)
    })

    this.edit_course_form = new FormGroup({
      title: new FormControl(this.edit_course.title, [Validators.required, Validators.minLength(0)]),
      description: new FormControl(this.edit_course.description, [Validators.required, Validators.minLength(0)]),
      main_topics: new FormControl(this.edit_course.main_topics.join('\n'), [Validators.required]),
      trailer_url: new FormControl(this.edit_course.trailer_url, [Validators.required]),
      image_url: new FormControl(this.edit_course.image_url, [Validators.required]),
      category: new FormControl(null, [Validators.required]), // доделать
      user_level: new FormControl(this.user_level[this.edit_course.user_level - 1], [Validators.required]),
      price: new FormControl(null, [Validators.required]), // доделать
      tags: new FormControl([], [Validators.required]), // доделать
      sections: new FormControl([...this.edit_course.sections], [Validators.required])
    })

    console.log('form course', this.edit_course_form.value)

    this.sections_values = this.edit_course_form.get('sections').value
    this.sections_values.forEach(element => {
      element.edited = false
    })

    this.breadcrumbItems = []
    this.breadcrumbItems.push({ label: 'Изменение курса' })

    this.categories = []

    this.tags = [
      { name: 'Angular', id: 0 },
      { name: 'ReactJS', id: 1 },
      { name: 'VueJS', id: 2 },
    ]

    this.courseService.get_category().subscribe((value) => {
      let tempCategories
      tempCategories = value
      for (let i = 0; i < tempCategories.length; i++) {
        this.categories.push(
          {
            label: tempCategories[i].title,
            value: {
              id: tempCategories[i].id,
              name: tempCategories[i].title
            }
          }
        )
      }
    })
  }

  // Нажатие на кнопку сохранения
  enter(): void {
    if (this.edit_course_form.value.user_level == null)
      this.edit_course_form.value.user_level = 0
    console.log(this.edit_course_form.value)
  }

  addSection() {
    console.log(111)
    this.edit_section_form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    })
    this.sections_values.push({
      title: 'Новая секция',
      description: '',
      edited: true
    })
  }

  editSection(index: number) {
    this.sections_values[index].edited = true
    let value = this.sections_values[index]
    // console.log(index)
    this.edit_section_form = new FormGroup({
      title: new FormControl(value.title, [Validators.required]),
      description: new FormControl(value.description, [Validators.required]),
    })
  }

  saveSection(index: number) {
    let value = this.edit_section_form.value
    this.sections_values[index] = {
      title: value.title,
      description: value.description,
      // edited: false
    }
  }

  deleteSection(index: number) {
    this.sections_values = this.sections_values.filter(element => element != this.sections_values[index])
    this.edit_section_form.reset()
    this.edit_course_form.get('sections').reset(this.sections_values)
  }

  ngOnDestroy(): void {
    localStorage.removeItem('edit_course_id')
  }

}
