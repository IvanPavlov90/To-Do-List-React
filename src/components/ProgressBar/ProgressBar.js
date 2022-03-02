import { useParams } from 'react-router-dom';
import { GetTasks } from '../../store/selectors';
import './_progressBar.scss';

export const ProgressBar = () => {
  const params = useParams();
  const tasks = GetTasks();

  function calculateCompletedTasksPercent () {
    let completedTasks = 0;
    let tasksCount = 0;
    for (const key in tasks) {
      if (tasks[key].category_id === parseInt(params.id)) {
        tasksCount++
        if (tasks[key].isDone) {
          completedTasks++;
        }
      }
    }

    if (completedTasks === 0 && tasksCount === 0) {
      return 0;
    }

    return (completedTasks/tasksCount)*100;
  }

  return (
    <div>
      <progress className="progress-bar" value={calculateCompletedTasksPercent()} max="100"></progress>
    </div>
  );
};
