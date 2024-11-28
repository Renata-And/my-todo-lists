import List from '@mui/material/List/List';
import type {TodolistType} from '../../../../model/todolists-reducer';
import {Task} from './Task/Task';
import {useAppSelector} from '../../../../../../common/hooks/useAppSelector';
import {selectTasks} from '../../../../model/tasksSelectors';

type Props = {
  todolist: TodolistType
}

export const Tasks = ({todolist}: Props) => {
  const tasks = useAppSelector(selectTasks)

  let filteredTasks = tasks[todolist.id];
  switch (todolist.filter) {
    case 'active':
      filteredTasks = tasks[todolist.id].filter(task => !task.isDone)
      break;
    case 'completed':
      filteredTasks = tasks[todolist.id].filter(tasks => tasks.isDone)
      break;
  }

  return (
    <>
      {filteredTasks.length === 0
        ? <p>Tasks list is empty</p>
        : <List>
          {filteredTasks.map(task => {
            return <Task task={task} todolist={todolist}/>
          })}
        </List>}
    </>
  )
}