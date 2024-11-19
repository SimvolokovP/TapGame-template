import ShareBtn from "../../components/ShareBtn/ShareBtn";
import Clipboard from "../../components/ClipBoard/ClipBoard";

import "./TeamPage.scss";
import useUser from "../../hooks/user/useUser";
import TeamList from "../../components/TeamList/TeamList";

const TeamPage = () => {
  const { user } = useUser();

  return (
    <div className="team-page__container container">
      <div className="team-page__main">
        <h3 className="page-title">My Team</h3>
        <TeamList referrals={user?.referrallArray || []} />
      </div>
      <div className="team-page__actions">
        <ShareBtn />
        <Clipboard />
      </div>
    </div>
  );
};

export default TeamPage;
