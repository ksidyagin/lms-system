import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { PanelsComponent } from './components/panels/panels.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { MediaComponent } from './components/media/media.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { AppMainComponent } from './app.main.component';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { ListComponent } from './components/list/list.component';
import { TreeComponent } from './components/tree/tree.component';
import { CrudComponent } from './components/crud/crud.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { FloatLabelComponent } from './components/floatlabel/floatlabel.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './auth/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { CoursesComponent } from './system/courses/courses.component';
import { InstructorDashboardComponent } from './system/instructor-dashboard/instructor-dashboard.component';
import { InstructorCoursesComponent } from './system/instructor-courses/instructor-courses.component';
import { InstructorQuizzesComponent } from './system/quizzes/quizzes.component';
import { InstructorEarningsComponent } from './system/instructor-earnings/instructor-earnings.component';
import { InstructorStatementComponent } from './system/instructor-statement/instructor-statement.component';
import { InstructorEditCourseComponent } from './system/instructor-edit-course/instructor-edit-course.component';
import { InstructorEditQuizComponent } from './system/instructor-edit-quiz/instructor-edit-quiz.component';
import { MyPathsComponent } from './system/paths/my-paths/my-paths.component';
import { BrowsePathsComponent } from './system/paths/browse-paths/browse-paths.component';
import { PathDetailsComponent } from './system/paths/path-details/path-details.component';
import { SkillAssessmentComponent } from './system/paths/skill-assessment/skill-assessment.component';
import { SkillResultComponent } from './system/paths/skill-result/skill-result.component';
import { MyCoursesComponent } from './system/courses/my-courses/my-courses.component';
import { CoursesPreviewComponent } from './system/courses/courses-preview/courses-preview.component';
import { LessonPreviewComponent } from './system/courses/lesson-preview/lesson-preview.component';
import { AuthComponent } from './auth/auth.component';
import { ForgotPassComponent } from './auth/forgot-pass/forgot-pass.component';
import { RegisterComponent } from './auth/register/register.component';
import { MainComponent } from './system/main/main.component'

@NgModule({
  imports: [
    RouterModule.forRoot([
      // main page (странциы с доступом без входа в аккаунт)
      { path: '', component: MainComponent },
      // Auth module
      {
        path: '', component: AuthComponent, children: [
          { path: 'login', component: LoginComponent },
          { path: 'register', component: RegisterComponent },
          { path: 'forgot_password', component: ForgotPassComponent }
        ]
      },
      // Страницы с подгружаемым side bar'ом
      {
        path: '', component: AppMainComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent }, // Было '' стало 'dashboard'
          { path: 'uikit/formlayout', component: FormLayoutComponent },
          { path: 'uikit/input', component: InputComponent },
          { path: 'uikit/floatlabel', component: FloatLabelComponent },
          { path: 'uikit/invalidstate', component: InvalidStateComponent },
          { path: 'uikit/button', component: ButtonComponent },
          { path: 'uikit/table', component: TableComponent },
          { path: 'uikit/list', component: ListComponent },
          { path: 'uikit/tree', component: TreeComponent },
          { path: 'uikit/panel', component: PanelsComponent },
          { path: 'uikit/overlay', component: OverlaysComponent },
          { path: 'uikit/media', component: MediaComponent },
          { path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule) },
          { path: 'uikit/message', component: MessagesComponent },
          { path: 'uikit/misc', component: MiscComponent },
          { path: 'uikit/charts', component: ChartsComponent },
          { path: 'uikit/file', component: FileComponent },
          { path: 'pages/crud', component: CrudComponent },
          { path: 'pages/timeline', component: TimelineComponent },
          { path: 'pages/empty', component: EmptyComponent },
          { path: 'icons', component: IconsComponent },
          { path: 'blocks', component: BlocksComponent },
          { path: 'documentation', component: DocumentationComponent },

          //courses
          { path: 'courses', component: CoursesComponent },
          { path: 'course-preview/:id', component: CoursesPreviewComponent },
          { path: 'lesson-preview/:id', component: LessonPreviewComponent },
          { path: 'my-courses', component: MyCoursesComponent },
          // teachers
          { path: 'instructor-dashboard', component: InstructorDashboardComponent },
          { path: 'instructor-courses', component: InstructorCoursesComponent },
          { path: 'instructor-quizzes', component: InstructorQuizzesComponent },
          { path: 'instructor-earnings', component: InstructorEarningsComponent },
          { path: 'instructor-statement', component: InstructorStatementComponent },
          { path: 'instructor-edit-course/:id', component: InstructorEditCourseComponent },
          { path: 'instructor-edit-quiz', component: InstructorEditQuizComponent },
          //paths
          { path: 'browse-paths', component: BrowsePathsComponent },
          { path: 'path-details', component: PathDetailsComponent },
          { path: 'skill-assessment', component: SkillAssessmentComponent },
          { path: 'skill-result', component: SkillResultComponent },
          { path: 'my-paths', component: MyPathsComponent }

        ],
      },

      { path: 'pages/landing', component: LandingComponent },
      { path: 'pages/error', component: ErrorComponent },
      { path: 'pages/notfound', component: NotfoundComponent },
      { path: 'pages/access', component: AccessComponent },

      // Ноунейм страницы
      { path: '**', redirectTo: 'pages/notfound' },
    ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
