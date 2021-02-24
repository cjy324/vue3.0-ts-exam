export class Article{
  /* 정적요소: 오직 이 클래스만을 위한 요소 */
  //static lastId: number = 0; 이라고 적어줘야하지만 알아서 숫자로 인식해서 생략가능
  static lastId = 0;

  id: number;
  title: string;
  body: string;

  //constructor: 생성자
  constructor(title:string, body:string){
    this.id = ++Article.lastId;
    this.title = title;
    this.body = body;
  }

};