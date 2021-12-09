import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: String;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task => task.title === newTaskTitle);

    if (taskWithSameTitle) {
      return Alert.alert('Task já cadastrada', 'Você náo pode cadastrar uma task com o mesmo nome.')
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [...oldState, newTask]);
  }

  function handleToggleTaskDone(id: number) { 
    const updatedTasks = tasks.map(task => ({... task}));
    const foundItem = updatedTasks.find(item => item.id === id);

    if (!foundItem)
    return;

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleEditTask({taskId, taskNewTitle}: EditTaskArgs) {
    const updatedTasks = tasks.map(task => ({... task}));
    const foundItem = updatedTasks.find(task => task.id === taskId);

    if (!foundItem)
    return;

    foundItem.title = taskNewTitle;
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
   Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item ?', [
     {
        style: 'cancel',
        text: 'Não'
     }, 
     {
       style: 'destructive',
       text: 'Sim',
       onPress: () => {
        const updateTasks = tasks.filter(task => task.id !== id);
        setTasks(updateTasks);
       }
     }
   ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})