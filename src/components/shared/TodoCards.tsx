import TodoCard from './TodoCard';
import { Todo } from './Types';

type TodoCardsProps = {
  todoList: Todo[];
  handleUpdate: (tool: Todo) => void;
  deleteTodo: (id: string) => void;
};

function TodoCards({ todoList, handleUpdate, deleteTodo }: TodoCardsProps) {
  return (
    <div className='grid grid-cols-3 gap-4 w-full'>
      {todoList.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          updateTodo={handleUpdate}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
}

export default TodoCards;
