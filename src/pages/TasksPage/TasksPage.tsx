import "./TasksPage.scss";
import "react-toastify/dist/ReactToastify.css";
import SubTask from "../../components/SubTask/SubTask";

const TasksPage = () => {
  
  return (
    <div className="tasks-page__container container">
      <h3 className="page-title tasks-page__title">Daily Tasks</h3>
      <SubTask />
    </div>
  );
};

export default TasksPage;
