import "./TasksPage.scss";
import "react-toastify/dist/ReactToastify.css";
import SubTask from "../../components/SubTask/SubTask";
import useUser from "../../hooks/user/useUser";

const TasksPage = () => {
  const { user, completeSubTask } = useUser();

  return (
    <div className="tasks-page__container container">
      <h3 className="page-title tasks-page__title">Daily Tasks</h3>
      <div className="tasks-page__tasks">
        <SubTask isTaskActive={!user?.isSub} taskAction={completeSubTask} />
      </div>
      <div className="tasks-page__recent">
        <h3 className="page-title tasks-page__title">Recent Tasks</h3>
        <div>- Empty -</div>
      </div>
    </div>
  );
};

export default TasksPage;
