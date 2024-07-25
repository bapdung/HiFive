import SuccessModal from "./TicketPage.SuccessModal";
import FailureModal from "./TicketPage.FailureModal";
import WaitingModal from "./TicketPage.WaitingModal";

function List() {
  return (
    <div className="my-10">
      <h1>티켓리스트</h1>
      <SuccessModal />
      <FailureModal />
      <WaitingModal />
    </div>
  );
}

export default List;
