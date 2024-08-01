export interface Schedule {
  id:string,
  title:string,
  startDate:Date,
  endDate:Date,
  address:string,
  description:string,
  image:string,
  registration:boolean,
  link:string,
  deadline:Date,
  notified:boolean
}

export interface ScheduleDTO {
  month:string;
  scheduleList:Schedule[];
}
