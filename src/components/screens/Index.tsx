import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Head } from '~/components/shared/Head';
import { useFirestore } from '~/lib/firebase';
import { useAuthState } from '../contexts/UserContext';
import TodoForm from '../form/TodoForm';
import TodoCards from '../shared/TodoCards';
import { Todo } from '../shared/Types';

function Index() {
  const firestore = useFirestore();
  const auth = useAuthState();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    async function fetchData() {
      const todoCollection = collection(firestore, 'todos');
      const todoQuery = query(
        todoCollection,
        where('userId', '==', auth.user.uid)
      );
      const querySnapshot = await getDocs(todoQuery);
      const fetchedData: Todo[] = [];

      querySnapshot.forEach((element) => {
        fetchedData.push({ id: element.id, ...element.data() } as Todo);
      });

      setTodoList(fetchedData);
    }
    fetchData();
  }, []);

  const addUpdateTodo = async (todo: Partial<Todo>) => {
    try {
      const date = new Date();
      if (isEdit) {
        const docRef = doc(firestore, 'todos', todo.id!);
        const newTodo = { ...todo, date: date.toString() };

        updateDoc(docRef, newTodo)
          .then(() => {
            const updatedTodo = [...todoList].map((item) =>
              item.id === todo.id ? newTodo : item
            ) as Todo[];
            setTodoList(updatedTodo);
            setIsEdit(false);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const todoCollection = collection(firestore, 'todos');
        const newDoc = await addDoc(todoCollection, {
          ...todo,
          date: date.toString(),
          userId: auth.user.uid
        });

        setTodoList([{ id: newDoc.id, ...todo } as Todo, ...todoList]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = (todo: Todo) => {
    setIsEdit(true);
    setSelectedTodo(todo);
  };

  const deleteTodo = async (id: string) => {
    try {
      const docRef = doc(firestore, 'todos', id);
      deleteDoc(docRef).then(() => {
        let deleteTodo = todoList.filter((todo) => todo.id !== id);
        setTodoList(deleteTodo);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head title='Todo App' />
      <div className='max-w-[60%] mx-auto'>
        <TodoForm
          isEdit={isEdit}
          selectedTodo={selectedTodo}
          handleFormSubmit={addUpdateTodo}
        />
        <TodoCards
          todoList={todoList}
          handleUpdate={handleUpdate}
          deleteTodo={deleteTodo}
        />
      </div>
    </>
  );
}

export default Index;
