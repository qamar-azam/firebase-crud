export const ItemRenderExample: React.VFC = () => {
  const [items, setItems] = useState<SortableItemProps[]>([
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' }
  ]);
  return (
    <SortableList
      items={items}
      setItems={setItems}
      itemRender={({ item }: ItemRenderProps) => (
        <div className='w-1/2 h-10 m-8 bg-blue-400 text-center'>
          {item.name}
        </div>
      )}
    />
  );
};
