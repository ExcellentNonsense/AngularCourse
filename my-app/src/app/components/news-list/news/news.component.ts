import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { News } from '../../../models/news';

@Component({
  selector: 'ac-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsComponent {
  @Input() news!: News;
  @Input() isNewsSelected: boolean = false;

  @Output() selectNewsEvent = new EventEmitter<boolean>();
  @Output() editNewsEvent = new EventEmitter<any>();
  @Output() deleteNewsEvent = new EventEmitter<any>();

  constructor(public cdr: ChangeDetectorRef) { }

  public selectNews(isSelected: boolean) {
    this.isNewsSelected = isSelected;
    this.selectNewsEvent.emit(isSelected);
  }

  public editNews() {
    this.editNewsEvent.emit();
  }

  public deleteNews() {
    this.deleteNewsEvent.emit();
  }
}
