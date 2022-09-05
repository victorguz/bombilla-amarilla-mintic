import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getFromLocal, pushToLocalArray } from '../../../../core/services/functions.service';
import {
  AttachedInterface,
  CommentInterface,
} from '../../../../interfaces/comment.interface';
import { addImage, setVisibleFrame } from '../function';

@Component({
  selector: 'app-comments-viewer',
  templateUrl: './comments-viewer.component.html',
  styleUrls: ['./comments-viewer.component.scss'],
})
export class CommentsViewerComponent implements OnInit, OnChanges {
  @Input() currentImage: AttachedInterface | null = null;
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
  ngOnChanges(changes: SimpleChanges): void {}

  getComments() {
    this.comments = getFromLocal('comments');
  }

  addComment() {
    if (this.form.get('comment')?.valid) {
      const image =
        this.currentImage && this.currentImage.base64
          ? addImage(this.currentImage.base64)
          : null;
      pushToLocalArray('comments', {
        attachedId: image ? image.id : 0,
        content: this.form.get('comment')?.value,
        currentTime: this.video.currentTime,
        documentId: 0,
        user: 'Andrea Cassiani',
      } as CommentInterface);
      this.currentImage = null;
      this.form.get('comment')?.setValue('');
      this.getComments();
    }
  }

  setPaused() {
    if (this.video) {
      this.video.pause();
    }
  }

  async showImage(attachedId?: number, base64?: string) {
    const images: AttachedInterface[] = getFromLocal('images');
    const attached = images
      ? images.find((element) => element.id == attachedId)
      : undefined;
    setVisibleFrame(
      base64 || (attached && attached?.base64) ? true : false,
      base64 ? base64 : attached ? attached?.base64 : undefined
    );
  }

  setCurrentTime(currentTime) {
    this.video.currentTime = currentTime;
  }

  borrarImagen(event) {
    if (event.which == 8 || event.key.toLowerCase() == 'backspace') {
      this.currentImage = null;
    }
  }
}
