export class News {
  public id: number;
  public date: string;
  public headline: string;
  public text: string;
  public theme: string;

  constructor(id: number, date: string, headline: string, text: string, theme: string) {
    this.id = id;
    this.date = date;
    this.headline = headline;
    this.text = text;
    this.theme = theme;
  }
}
