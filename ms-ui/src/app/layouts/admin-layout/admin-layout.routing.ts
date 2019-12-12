import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { VacancyComponent } from 'app/pages/vacancy/vacancy.component';
import { InterviewComponent } from 'app/pages/interview/interview.component';
import { AddVacancyComponent } from 'app/pages/modals/add-vacancy/add-vacancy.component';
import { AddInterviewerComponent } from 'app/pages/modals/add-interviewer/add-interviewer.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'vacancy',        component: VacancyComponent},
    { path: 'interviewer',    component: InterviewComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path:'addVacancy',component:AddVacancyComponent},
    { path:'addInterViewer',component:AddInterviewerComponent}
];
