import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'ac-context-menu-commands',
  templateUrl: './context-menu-commands.component.html',
  styleUrls: ['./context-menu-commands.component.css']
})
export class ContextMenuCommandsComponent {
  @Output() selectAllNewsStoriesEvent = new EventEmitter<any>();
  @Output() deselectAllNewsStoriesEvent = new EventEmitter<any>();

  selectAllNewsStories() {
    this.selectAllNewsStoriesEvent.emit();
  }

  deselectAllNewsStories() {
    this.deselectAllNewsStoriesEvent.emit();
  }
}
