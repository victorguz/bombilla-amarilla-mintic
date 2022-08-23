import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoReviewerComponent } from './components/video-reviewer/video-reviewer.component';

const routes: Routes = [
  {
    path: 'video-reviewer',
    component: VideoReviewerComponent,
  },
  { path: '', pathMatch: 'prefix', redirectTo: 'video-reviewer' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
