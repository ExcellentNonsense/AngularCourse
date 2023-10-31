import { Directive, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[acNewsThemeHighlight]'
})
export class NewsThemeHighlightDirective implements OnInit {
  @Input("acNewsThemeHighlight") theme = "";

  @HostBinding("style.backgroundColor") elBgColor!: string;

  constructor() { }

  ngOnInit(): void {
    switch (this.theme) {
      case "Политика":
        this.elBgColor = "hsl(133 59% 40%)";
        break;
      case "Туризм":
        this.elBgColor = "hsl(198 92% 57%)";
        break;
      case "Экономика":
        this.elBgColor = "hsl(37 88% 55%)";
        break;
      case "Наука":
        this.elBgColor = "hsl(231 70% 63%)";
        break;
      case "Интернет":
        this.elBgColor = "hsl(230 3% 49%)";
        break;
      default:
    }
  }
}
