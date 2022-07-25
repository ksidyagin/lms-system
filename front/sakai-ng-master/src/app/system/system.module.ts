import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { HeadComponent } from './shared/components/head/head.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from "@angular/common";
import { ScrollTopComponent } from './shared/components/scroll-top/scroll-top.component';
import { MainComponent } from './main/main.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { CoursesComponent } from './courses/courses.component';
import { CarouselModule } from 'primeng/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipModule } from 'primeng/chip';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { InplaceModule } from 'primeng/inplace';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ScrollTopModule } from 'primeng/scrolltop';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { StepsModule } from 'primeng/steps';
import { StyleClassModule } from 'primeng/styleclass';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { TagModule } from 'primeng/tag';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { TimelineModule } from 'primeng/timeline';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { AppRoutingModule } from '../app-routing.module';
import { AppCodeModule } from '../components/app-code/app.code.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { InstructorCoursesComponent } from './instructor-courses/instructor-courses.component';
import { InstructorQuizzesComponent } from './quizzes/quizzes.component';
import { InstructorEarningsComponent } from './instructor-earnings/instructor-earnings.component';
import { InstructorStatementComponent } from './instructor-statement/instructor-statement.component';
import { InstructorEditCourseComponent } from './instructor-edit-course/instructor-edit-course.component';
import { InstructorEditQuizComponent } from './instructor-edit-quiz/instructor-edit-quiz.component';
import { EditorModule } from 'primeng/editor';
import { BrowsePathsComponent } from './paths/browse-paths/browse-paths.component';
import { MyPathsComponent } from './paths/my-paths/my-paths.component';
import { PathDetailsComponent } from './paths/path-details/path-details.component';
import { SkillAssessmentComponent } from './paths/skill-assessment/skill-assessment.component';
import { SkillResultComponent } from './paths/skill-result/skill-result.component';
import { MyCoursesComponent } from './courses/my-courses/my-courses.component';
import { CoursesPreviewComponent } from './courses/courses-preview/courses-preview.component';
import { LessonPreviewComponent } from './courses/lesson-preview/lesson-preview.component';
import { MainFooterComponent } from './main/main-footer/main-footer.component';
import { MainHeaderComponent } from './main/main-header/main-header.component';

@NgModule({
  declarations: [
    SystemComponent,
    HeadComponent,
    FooterComponent,
    ScrollTopComponent,
    MainComponent,
    SystemComponent,
    HeadComponent,
    SidebarComponent,
    CoursesComponent,
    InstructorDashboardComponent,
    InstructorCoursesComponent,
    InstructorQuizzesComponent,
    InstructorEarningsComponent,
    InstructorStatementComponent,
    InstructorEditCourseComponent,
    InstructorEditQuizComponent,
    BrowsePathsComponent,
    PathDetailsComponent,
    SkillAssessmentComponent,
    SkillResultComponent,
    MyPathsComponent,
    CoursesPreviewComponent,
    LessonPreviewComponent,
    MyCoursesComponent,
    MainFooterComponent,
    MainHeaderComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule,
    AutoCompleteModule,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipsModule,
    ChipModule,
    CodeHighlighterModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    EditorModule,
    FieldsetModule,
    FileUploadModule,
    GalleriaModule,
    ImageModule,
    InplaceModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    KnobModule,
    LightboxModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SidebarModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SplitButtonModule,
    SplitterModule,
    StepsModule,
    TagModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeSelectModule,
    TreeTableModule,
    VirtualScrollerModule,
    AppCodeModule,
    StyleClassModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [SystemComponent]
})
export class SystemModule {
}

export class AppModule {
}
