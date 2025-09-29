type MessageType = {
  messages: {
    username: string;
    userid: number;
    type: string;
    sentAt?: string;
    recievedAt?: string;
    sentTo?: string;
    recievedFrom?: string;
    sentText?: string;
    receivedText?: string;
    receivedMessageId: string;
    sentMessageId?: number;
    recievedMessageId?: number;
  }[];
};

const MessageRows = ({ messages }: MessageType) => {
  return (
    <>
      {messages.map((val, index) => {
        return (
          <tr key={val.sentMessageId ?? val.recievedMessageId}>
            <th scope="row">{index + 1}</th>
            {val.sentAt && <td>{new Date(val.sentAt).toString()}</td>}
            {val.recievedAt && <td>{new Date(val.recievedAt).toString()}</td>}
            <td>{val.username}</td>
            <td>{val.sentTo ?? val.recievedFrom}</td>
            <td>{val.type}</td>
            <td>{val.sentText ?? val.receivedText}</td>
          </tr>
        );
      })}
    </>
  );
};

export default MessageRows;
