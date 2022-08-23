import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  createImageFromHTML,
  getFromLocal,
  pushToLocalArray,
} from '../../../../core/services/functions.service';
import {
  AttachedInterface,
  CommentInterface,
} from '../../../../interfaces/comment.interface';
import { setVisibleFrame } from '../function';

@Component({
  selector: 'app-comments-viewer',
  templateUrl: './comments-viewer.component.html',
  styleUrls: ['./comments-viewer.component.scss'],
})
export class CommentsViewerComponent implements OnInit {
  @Input() imageId!: number;
  video!: HTMLVideoElement;

  form = new FormGroup({
    comment: new FormControl('', Validators.required),
  });

  comments: CommentInterface[] = [];
  constructor() {
    this.getComments();
    setTimeout(() => {
      if (this.video == null) {
        this.video = document.querySelector('.video')!;
      }
    }, 1000);
  }

  ngOnInit(): void {}

  getComments() {
    this.comments = getFromLocal('comments');
  }

  addComment() {
    if (this.form.get('comment')?.valid) {
      pushToLocalArray('comments', {
        attachedId: this.imageId,
        content: this.form.get('comment')?.value,
        currentTime: this.video.currentTime,
        documentId: 0,
        user: 'Andrea Cassiani',
      } as CommentInterface);
      this.getComments();
    }
  }

  setPaused() {
    if (this.video) {
      this.video.pause();
    }
  }

  async showImage(attachedId) {
    const images: AttachedInterface[] = getFromLocal('images');
    const attached = images.find((element) => element.id == attachedId);
    setVisibleFrame(true, attached?.base64);
  }
}
