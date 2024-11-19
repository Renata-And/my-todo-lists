import { useState } from 'react';
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

const defaultTodoLists: TodoListsType[] = [
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

type TodoListsType = {
  id: string
  title: string
  filter: FilterValueType
}

type TasksType = {
  [key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {
  const [todoLists, setTodoLists] = useState<TodoListsType[]>(defaultTodoLists)
  const [tasks, setTasks] = useState<TasksType>(defaultTasks)

  //Tasks
  const deleteTask = (preload: { id: string, todoListId: string }) => {
    const { id, todoListId } = preload;
    const newTasksState = tasks[todoListId].filter(task => task.id !== id);
    setTasks({ ...tasks, [todoListId]: newTasksState });
  }
  const addTask = (preload: { taskTitle: string, todoListId: string }) => {
    const { taskTitle, todoListId } = preload;
    const newTask = { id: v1(), title: taskTitle, isDone: false };
    setTasks({ ...tasks, [todoListId]: [newTask, ...tasks[todoListId]] });
  }
  const setTaskNewStatus = (preload: { taskId: string, newStatus: boolean, todoListId: string }) => {
    const { newStatus, taskId, todoListId } = preload;
    const newTasksState: TaskType[] = tasks[todoListId].map(task => task.id === taskId ? {
      ...task,
      isDone: newStatus
    } : task);
    setTasks({ ...tasks, [todoListId]: newTasksState });
  }
  const updateTask = (preload: { taskId: string, title: string, todoListId: string }) => {
    const { taskId, todoListId, title } = preload;
    setTasks({ ...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? { ...t, title } : t) })
  }

  // TodoLists
  const changeFilter = (preload: { filter: FilterValueType, todoListId: string }) => {
    const { filter, todoListId } = preload;
    setTodoLists(todoLists.map(tl => tl.id === todoListId ? { ...tl, filter } : tl))
  }
  const deleteTodoList = (id: string) => {
    setTodoLists(todoLists.filter(tl => tl.id !== id))
    delete tasks[id]
  }
  const addTodoList = (todoListTitle: string) => {
    const newTodoListId = v1();
    setTodoLists([{ id: newTodoListId, title: todoListTitle, filter: 'all' }, ...todoLists])
    setTasks({ ...tasks, [newTodoListId]: [] })
  }
  const updateTodoListTitle = (preload: { todoListId: string, title: string }) => {
    const { todoListId, title } = preload
    setTodoLists(todoLists.map(tl => tl.id === todoListId ? { ...tl, title } : tl))
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
          {todoLists.map(tl => {
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
                    todoListId={tl.id}
                    title={tl.title}
                    tasks={filteredTasks}
                    deleteTask={deleteTask}
                    addTask={addTask}
                    setTaskNewStatus={setTaskNewStatus}
                    updateTask={updateTask}
                    changeFilter={changeFilter}
                    deleteTodoList={deleteTodoList}
                    updateTodoListTitle={updateTodoListTitle}
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

export default App;
