import ShareBtn from "../../components/ShareBtn/ShareBtn";
import Clipboard from "../../components/ClipBoard/ClipBoard";

import "./TeamPage.scss";
import { useState } from "react";

const TeamPage = () => {
  const [ref, setRef] = useState([]);

  return (
    <div className="team-page__container container">
      <div className="team-page__main">
        <h3 className="page-title">My Team</h3>
        <ul className="team-page__list list-reset">
          {ref.length ? ref.length : "No referral friends found!"}
        </ul>
      </div>
      <div className="team-page__actions">
        <ShareBtn />
        <Clipboard />
      </div>
    </div>
  );
};

export default TeamPage;
