export interface Message {
  id: number;
  from: string;
  text?: {
    body: string;
  };
  type: string;
  interactive?: {
    type: string;
    list_reply: {
      id: string;
      title: string;
    };
  };
}
