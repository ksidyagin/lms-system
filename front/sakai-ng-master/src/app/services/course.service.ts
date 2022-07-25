import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, mapTo, Observable, of, tap, throwError } from 'rxjs';
import { Course, Feedback } from '../api/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = {
    addCourse: 'http://194.67.104.19:5000/course/create',
    getInfoCourse: 'http://194.67.104.19:5000/course/getInfo',
    saveCourse: 'http://194.67.104.19:5000/course/update',
    getCourse: 'http://194.67.104.19:5000/course/page',
    getCourses: 'http://194.67.104.19:5000/course/preview',
    getFeedback: 'http://194.67.104.19:5000/feedback',
    getCategories: 'http://194.67.104.19:5000/course/categories',
  }

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Добавление курса
   */
  add_course(): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl.addCourse, null)
      .pipe(catchError(this.handleError))
  }

  /**
   * Получить инфу о курсе
   * @param {string} id номер курса, по которому хотим получить информацию
   */
  get_info_course(id: string): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl.getInfoCourse + `/${id}`)
      .pipe(
        tap(course => {
          console.log(course)
        }
        ),
        catchError(this.handleError)
      )
  }

  /**
   * Добавление курса
   * @param {Course} course курс для добавления
   */
  save_course(course: any): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl.saveCourse, course)
      .pipe(
        tap(course => {
          console.log(course)
        }
        ),
        catchError(this.handleError)
      )
  }

  /**
   * Получение всех курсов
   * @param {number} offset с какого id получаем курсы
   * @param {number} count количество запрашиваемых курсов (если 0, то вернет все курсы)
   * @returns {Courses[]} массив курсов
   */
  get_courses(offset: number, count: number): Observable<Course[]> {
    return this.httpClient.get<any>(this.apiUrl.getCourses + `/?count=${count}&offset=${offset}`)
      .pipe(
        tap(courses => {
          console.log(courses)
        }
        ),
        catchError(this.handleError)
      )
  }

  /**
   * Получение инфы о курсе
   * @param {string} courseId id курса
   * @returns {Course}
   */
  get_course(courseId: string): Observable<Course> {
    return this.httpClient.get<any>(this.apiUrl.getCourse + "/" + courseId)
      .pipe(
        tap(courseInfo => {
          console.log(courseInfo)
          if (isNaN(courseInfo.rating))
            courseInfo.rating = 0
        }
        ),
        catchError(this.handleError)
      )
  }

  /**
   * Получение инфы о курсе
   * @param {string} courseId id курса
   * @returns {Feedback}
   */
  get_feedback(courseId: string): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl.getFeedback + "/" + courseId)
      .pipe(
        tap(courseFeedback => {
          console.log(courseFeedback)
        }
        ),
        catchError(this.handleError)
      )
  }

  get_category(): Observable<any> {
    return this.httpClient.get<any>(this.apiUrl.getCategories)
      .pipe(
        tap(courseCategories => {
          // courseCategories.title = courseCategories.name
          console.log(courseCategories)
        }
        ),
        catchError(this.handleError)
      )
  }

  /**
   * Обработка ошибок
   */
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 500) {
      alert('Database sleeps')
    }
    if (errorResponse.status === 401) {
      console.log("401 error")
    }
    if (errorResponse.status === 404) {
      console.log("Курс с таким id отсутствует.")

    }
    if (errorResponse.status === 400) {
      console.log("Неправильный тип course_id (должно быть числом)")

    }
    return throwError(errorResponse);
  }
}
