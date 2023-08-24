import { useEffect } from 'react';
import { useState } from 'react';
import { Todo, InputEnum } from '../shared/Types';

type TodoFormProps = {
  isEdit: boolean;
  selectedTodo: Todo | null;
  handleFormSubmit: (arg: Partial<Todo>) => void;
};

function TodoForm({ isEdit, selectedTodo, handleFormSubmit }: TodoFormProps) {
  const [inputData, setInputData] = useState<Partial<Todo>>({
    title: '',
    description: '',
    complete: false
  });

  const handleChange = (field: InputEnum, value: string | boolean) => {
    setInputData({ ...inputData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleFormSubmit(inputData);
    setInputData({ title: '', description: '', complete: false });
  };

  useEffect(() => {
    if (isEdit) {
      const { id, title, description, complete } = selectedTodo as Todo;
      setInputData({ id, title, description, complete });
    }
  }, [selectedTodo]);

  return (
    <form className='flex mb-5' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Title'
        className='mr-4 p-2 rounded'
        name='title'
        value={inputData.title}
        onChange={(e) => handleChange(InputEnum.Title, e.target.value)}
      />
      <input
        type='text'
        name='description'
        placeholder='Description'
        className='mr-4 p-2 rounded'
        value={inputData.description}
        onChange={(e) => handleChange(InputEnum.Description, e.target.value)}
      />

      <label className='text-white'>
        Complete
        <input
          type='checkbox'
          placeholder='Url'
          className='ml-2 mr-4 p-2 rounded'
          checked={inputData.complete}
          onChange={(e) => handleChange(InputEnum.Complete, e.target.checked)}
        />
      </label>
      <button
        type='submit'
        className='border border-purple-500 p-2 rounded-lg text-slate-500'
      >
        {isEdit ? 'Update todo' : 'Add new todo'}
      </button>
    </form>
  );
}

export default TodoForm;
