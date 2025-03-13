import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

interface Item {
  id: string
  content: string
}

interface DragResult {
  source: {
    index: number
  }
  destination: {
    index: number
  } | null
}

const initialItems: Item[] = [
  { id: 'item-1', content: 'Item 1' },
  { id: 'item-2', content: 'Item 2' },
  { id: 'item-3', content: 'Item 3' },
];

export const DragDropList = () => {
  const [items, setItems] = useState<Item[]>(initialItems);

  const onDragEnd = (result: DragResult) => {
    const { destination, source } = result;

    // Se o item não for solto em uma área válida, não faz nada
    if (!destination) {
      return;
    }

    // Se o item não mudar de posição, não faz nada
    if (destination.index === source.index) {
      return;
    }

    const updatedItems = Array.from(items);
    // Remove o item da posição original
    const [movedItem] = updatedItems.splice(source.index, 1);
    // Adiciona o item na nova posição
    updatedItems.splice(destination.index, 0, movedItem);

    // Atualiza o estado com a nova ordem
    setItems(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{ listStyleType: 'none', padding: 0 }}
          >
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: '10px',
                      backgroundColor: '#f4f4f4',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      ...provided.draggableProps.style,
                    }}
                  >
                    {item.content}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
