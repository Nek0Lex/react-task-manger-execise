"use client";
import Image from "next/image";
import { useState } from "react";
import TaskForm from "./components/TaskForm";
import { Task } from "./model/Task";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import filterType from "./model/filterType";
import { Filter } from "./model/filter";
import { type } from "os";

export default function Home() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [filter, setFilter] = useState<String>(filterType[0]);

  return (
    <>
      <main className="bg-white min-h-screen">
        <TaskForm
          onUpdateForm={(data: Task) => {
            setTaskList([...taskList, data]);
          }}
          taskList={taskList}
        />
        <TaskFilter
          onUpdateFilter={(data: Filter) => {
            setFilter(data.type);
          }}
        />
        <TaskList
          taskListData={taskList}
          filter={filter}
          // onRemoveItem={(itemId: number) => {
          //   setTaskList(taskList.filter(t =>
          //     t.id !== itemId
          //   ));
          // }}
          onRemoveItem={(itemId: number) => {
            setTaskList(taskList.filter((t) => t.id !== itemId));
          }}
        />
      </main>
    </>
  );
}
