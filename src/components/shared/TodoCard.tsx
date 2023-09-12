import { Todo } from './Types';
import {
  PencilIcon,
  TrashIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { formatDate } from '../../utils/util';

interface TodoCardProps {
  todo: Todo;
  updateTodo: (arg: Todo) => void;
  deleteTodo: (args: string) => void;
}

function TodoCard({ todo, updateTodo, deleteTodo }: TodoCardProps) {
  return (
    <div
      key={todo.id}
      data-test='todo-card'
      className='text-white group relative h-48 rounded-md flex flex-col justify-between shadow-slate-900 shadow-md p-4 bg-gradient-to-r from-slate-800 to-slate-700'
    >
      <div onClick={() => updateTodo(todo)} aria-label='edit'>
        <PencilIcon className='h-4 w-4 text-blue-500 hidden  group-hover:block absolute top-4 right-8 cursor-pointer' />
      </div>
      <div onClick={() => deleteTodo(todo.id!)} aria-label='delete'>
        <TrashIcon className='h-4 w-4 text-blue-500 hidden group-hover:block absolute top-4 right-2 cursor-pointer' />
      </div>
      <div>
        <div className='text-xl mb-2 font-bold'>{todo.title}</div>
        <div>{todo.description}</div>
      </div>
      <div>
        {todo.complete ? (
          <>
            Completed{' '}
            <CheckCircleIcon className='h-4 w-4 text-blue-500 inline ' />
          </>
        ) : (
          'Pending'
        )}
      </div>
      <div className='text-sm'>{formatDate(todo.date)}</div>
    </div>
  );
}

export default TodoCard;
