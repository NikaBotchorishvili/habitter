"use client";
import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { useCallback, useEffect, useState } from "react";
import Item from "./Item";
import { handleReOrderParams } from "../../../../../types/general";
import { useCachedNode } from "@dnd-kit/core/dist/hooks/utilities";

type Props = {
  items: any[];
  fields: any[];
  handleReOrder: ({ item_one_id, item_two_id }: handleReOrderParams) => void;
  keyPrefix: string;
  titleField?: string;
  edit?: boolean;
  del?: boolean;
};

const List: React.FC<Props> = ({
  fields,
  items,
  handleReOrder,
  keyPrefix,
  edit = true,
  del = true,
  titleField = "title",
}) => {
  const [localData, setLocalData] = useState<typeof items>(items || []);
  

  const handleDragEnd = useCallback((e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) {
      const getItemPosition = (id: string) =>
        localData.findIndex((item) => String(item.id) === id);
      const originalPosition = getItemPosition(String(active.id));
      const newPosition = getItemPosition(String(over.id));

      setLocalData((data) => {
        const newData = arrayMove(data, originalPosition, newPosition);
        if (handleReOrder) {
          handleReOrder({
            item_one_id: data[originalPosition].id,
            item_two_id: data[newPosition].id,
          });
        }
        return newData;
      });
    }
  }, [localData, handleReOrder]);


  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <SortableContext items={localData} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-y-2">
          {localData.map((item) => (
            <MemoizedItem
              key={`${keyPrefix}-${item.id}`}
              fields={fields}
              item={item}
              edit={edit}
              del={del}
              titleField={titleField}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};
const MemoizedItem = React.memo(Item);
export default List;
