export interface ORMResponse<T = undefined> {
  succuss: boolean;
  data?: T;
  errorMessage?: string;
}
