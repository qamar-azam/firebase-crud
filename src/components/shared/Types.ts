export type Todo = {
  id?: string;
  title: string;
  description: string;
  complete: boolean;
  date: string;
  userId: string;
};

export enum InputEnum {
  Id = 'id',
  Title = 'title',
  Description = 'description',
  Complete = 'complete',
  Date = 'date'
}
