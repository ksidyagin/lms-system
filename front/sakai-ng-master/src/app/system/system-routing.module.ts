import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesPreviewComponent } from './courses/courses-preview/courses-preview.component';
import { CoursesComponent } from './courses/courses.component';
import { MainComponent } from './main/main.component';
import { BrowsePathsComponent } from './paths/browse-paths/browse-paths.component';
import { MyPathsComponent } from './paths/my-paths/my-paths.component';
import { PathDetailsComponent } from './paths/path-details/path-details.component';
import { SkillAssessmentComponent } from './paths/skill-assessment/skill-assessment.component';
import { SkillResultComponent } from './paths/skill-result/skill-result.component';
import { SystemComponent } from './system.component';

const routes: Routes = [
    {
        path: '', component: SystemComponent, children: [
            { path: '', component: MainComponent },
            { path: 'courses', component: CoursesComponent },
            { path: 'course-preview/:id', component: CoursesPreviewComponent },
            //paths
            { path: 'browse-paths', component: BrowsePathsComponent },
            { path: 'path-details', component: PathDetailsComponent },
            { path: 'skill-assessment', component: SkillAssessmentComponent },
            { path: 'skill-result', component: SkillResultComponent },
            { path: 'my-paths', component: MyPathsComponent }
        ],
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class SystemRoutingModule { }
