import React from "react";
import Container from "../components/Container";
import WorkRecord from "../components/workRecord/WorkRecord";
import LeaveRecord from "components/leaveRecord/LeaveRecord";

const RecordPage = ({ userName, userId }) => {
  return (
    // <Container>
    <>
      <WorkRecord userName={userName} userId={userId} />
      <LeaveRecord userName={userName} userId={userId} />
      {/* </Container> */}
    </>
  );
};

export default RecordPage;
