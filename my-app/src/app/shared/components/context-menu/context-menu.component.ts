import { Component } from "@angular/core";

@Component({
  selector: 'ac-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent {
  public menuTopLeftPosition = { x: "0", y: "0" };
  public isContextMenuVisible: boolean = false;

  public show(event: MouseEvent) {
    event.preventDefault();

    this.menuTopLeftPosition.x = event.clientX + "px";
    this.menuTopLeftPosition.y = event.clientY + "px";

    this.isContextMenuVisible = true;
  }

  public hide() {
    this.isContextMenuVisible = false;
  }
}
