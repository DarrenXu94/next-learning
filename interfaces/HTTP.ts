export interface HTTPResponse {
  status: number;
  statusText: string;
  body?: any;
}

export interface HTTPError {
  status: number;
  statusText: string;
}
