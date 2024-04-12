export interface Schedule {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  address: string;
  description: string;
  image: string;
  registration: Boolean;
  deadline: Date;
}

export interface ScheduleDTO {
  month:string;
  scheduleList:Schedule[];
}
