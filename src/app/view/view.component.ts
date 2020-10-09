import { Component } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent {
  media: MediaQueryList;
  constructor(mediaMatcher: MediaMatcher) {
    this.media = mediaMatcher.matchMedia('(min-width: 1366px)');
  }
}
