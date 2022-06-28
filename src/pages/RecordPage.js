import React from "react";
import WorkRecord from "../components/workRecord/WorkRecord";
import LeaveRecord from "components/leaveRecord/LeaveRecord";

const RecordPage = ({ userName, userId }) => {
  return (
    <>
      <WorkRecord userName={userName} userId={userId} />
      <LeaveRecord userName={userName} userId={userId} />
    </>
  );
};

export default RecordPage;
