export interface Notification {
  id:number;
  title:string;
  description:string;
  date:Date;
  read:boolean;
  types:string;
  entityId:number;
}