//중복되는 것 
export interface IEntity {
  id:number;
  regDate:string;
  updateDate:string;
}

export interface IArticle extends IEntity{
  boardId:number;
  memberId:number;
  title:string;
  body:string;
  extra__writer:string;
}

export interface IMember extends IEntity {
	loginId:string;
	loginPw:string;
  authLevel:number;
  authKey:string;
  name:string;
  nickname:string;
  cellphoneNo:string;
  email:string;
	extra__thumbImg:string;
}