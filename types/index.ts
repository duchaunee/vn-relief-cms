import { RequestData } from "./models/rescue-request";

// export type TransformedRequest = Omit<RequestData, 'wardCode'>
export interface GroupedData {
  address: string;
  count: number;
  groupRequest: RequestData[];
}
