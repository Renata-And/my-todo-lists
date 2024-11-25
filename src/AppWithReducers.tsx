import { useReducer, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './components/todolist/Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './components/AddItemForm';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper'
import { MenuButton } from './components/MenuButton';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC, todolistsReducer } from './model/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, tasksReducer } from './model/tasks-reducer';

const todolist1_id = v1();
const todolist2_id = v1();
const defaultTasks: TasksType = {
  [todolist1_id]: [
    { id: v1(), title: 'Milk', isDone: true },
    { id: v1(), title: 'Bread', isDone: true },
    { id: v1(), title: 'Eggs', isDone: false }
  ],
  [todolist2_id]: [
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'React', isDone: false }
  ]
}
const defaultTodolists: TodolistType[] = [
  {
    id: todolist1_id,
    title: 'What to buy',
    filter: 'all'
  },
  {
    id: todolist2_id,
    title: 'What to learn',
    filter: 'all'
  }
]

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksType = {
  [key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

export type FilterValuesType = 'all' | 'active' | 'completed'

function AppWithReducers() {
  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, defaultTodolists)
  const [tasks, dispatchToTasks] = useReducer(tasksReducer, defaultTasks)

  //Tasks
  const deleteTask = (payload: { id: string, todolistId: string }) => {
    const { id, todolistId } = payload;
    dispatchToTasks(deleteTaskAC({ id, todolistId }));
  }
  const addTask = (payload: { taskTitle: string, todolistId: string }) => {
    const { taskTitle, todolistId } = payload;
    dispatchToTasks(addTaskAC({ taskTitle, todolistId }))
  }
  const changeTaskStatus = (payload: { taskId: string, isDone: boolean, todolistId: string }) => {
    const { isDone, taskId, todolistId } = payload;
    dispatchToTasks(changeTaskStatusAC({ isDone, taskId, todolistId }))
  }
  const changeTaskTitle = (payload: { taskId: string, title: string, todolistId: string }) => {
    const { title, taskId, todolistId } = payload;
    dispatchToTasks(changeTaskTitleAC({ taskId, title, todolistId }))
  }

  // TodoLists
  const deleteTodoList = (todolistId: string) => {
    const action = deleteTodolistAC(todolistId)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }
  const addTodoList = (title: string) => {
    const action = addTodolistAC(title)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }
  const changeTodoListTitle = (payload: { id: string, title: string }) => {
    const { id, title } = payload;
    dispatchToTodolists(changeTodolistTitleAC({ id, title }))
  }
  const changeTodolistFilter = (payload: { filter: FilterValuesType, id: string }) => {
    const { filter, id } = payload;
    dispatchToTodolists(changeTodolistFilterAC({ filter, id }))
  }

  // Theme
  const [themeMode, setThemeMode] = useState<ThemeMode>('light')

  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#7F00FF',
      },
    },
  })

  const changeModeHandler = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position={'static'} sx={{ mb: '20px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <MenuButton>Login</MenuButton>
            <MenuButton>Logout</MenuButton>
            <MenuButton background={theme.palette.primary.dark}>Faq</MenuButton>
            <Switch color={'default'} onChange={changeModeHandler} />
          </div>
        </Toolbar>
      </AppBar>
      <Container>
        <Grid container sx={{ mb: '20px' }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map(tl => {
            let filteredTasks = tasks[tl.id];
            switch (tl.filter) {
              case 'active':
                filteredTasks = tasks[tl.id].filter(task => !task.isDone)
                break;
              case 'completed':
                filteredTasks = tasks[tl.id].filter(tasks => tasks.isDone)
                break;
            }
            return (
              <Grid>
                <Paper sx={{ p: '0 15px 15px 15px' }}>
                  <Todolist
                    key={tl.id}
                    todolistId={tl.id}
                    title={tl.title}
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistFilter={changeTodolistFilter}
                    deleteTodoList={deleteTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                    filter={tl.filter}
                  />
                </Paper>
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default AppWithReducers;
