import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateNavbarComponent } from './components/layout/private-navbar/private-navbar.component';
import { PrivateFooterComponent } from './components/layout/private-footer/private-footer.component';
import { PrivateComponent } from './components/layout/private/private.component';
import { SharedModule } from '../shared/shared.module';
import { VideoReviewerComponent } from './components/video-reviewer/video-reviewer.component';
import { PrivateRoutingModule } from './private-routing.module';
import { CommentsViewerComponent } from './components/comments-viewer/comments-viewer.component';

@NgModule({
  declarations: [
    PrivateComponent,
    PrivateNavbarComponent,
    PrivateFooterComponent,
    VideoReviewerComponent,
    CommentsViewerComponent,
  ],
  imports: [CommonModule, PrivateRoutingModule, SharedModule],
})
export class PrivateModule {}
