type MoreTrackerReqsType = {
  reqs: {
    userId: number;
    fullName: string;
    number: string;
  }[];
};
const TrackersReqRows = ({ reqs }: MoreTrackerReqsType) => {
  return (
    <>
      {reqs.map((val, index) => {
        return (
          <tr key={val.userId}>
            <th scope="row">{index + 1}</th>
            <td>{val.fullName}</td>
            <td>{val.number}</td>
          </tr>
        );
      })}
    </>
  );
};

export default TrackersReqRows;
