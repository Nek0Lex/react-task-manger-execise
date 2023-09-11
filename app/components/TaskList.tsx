import { Task } from "../model/Task";
import { useState } from "react";
import moment from "moment";

export default function TaskList(props: {
  taskListData: Task[];
  filter: String;
  onRemoveItem: Function;
}) {
  const [taskList, setTaskList] = useState<Task[]>(props.taskListData);

  return (
    <>
      <table className="table-auto ml-3">
        <thead>
          <tr>
            <th className="px-4 py-2 text-black border">Id</th>
            <th className="px-4 py-2 text-black border">Title</th>
            <th className="px-4 py-2 text-black border">Due Date</th>
            <th className="px-4 py-2 text-black border">Category</th>
          </tr>
        </thead>
        <tbody>
          {props.taskListData.map((data: Task, index) => {
            let formattedDate = moment(data.dueDate).format("DD-MMM-YYYY");
            console.log(props.filter);
            if (props.filter == "All") {
              return (
                <tr key={data.id}>
                  <td className="border px-4 py-2 text-black">{data.id}</td>
                  <td className="border px-4 py-2 text-black">{data.title}</td>
                  <td className="border px-4 py-2 text-black">
                    {formattedDate.toString()}
                  </td>
                  <td className="border px-4 py-2 text-black">
                    {data.category}
                  </td>
                  <td className="border px-4 py-2 text-black">
                    <button
                      className="py-3 px-4 mb-3 ml-3 bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                      onClick={() => props.onRemoveItem(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            } else {
              if (data.category == props.filter) {
                return (
                  <tr key={data.id}>
                    <td className="border px-4 py-2 text-black">{data.id}</td>
                    <td className="border px-4 py-2 text-black">
                      {data.title}
                    </td>
                    <td className="border px-4 py-2 text-black">
                      {formattedDate.toString()}
                    </td>
                    <td className="border px-4 py-2 text-black">
                      {data.category}
                    </td>
                    <td className="border px-4 py-2 text-black">
                      <button
                        className="py-3 px-4 mb-3 ml-3 bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                        onClick={() => props.onRemoveItem(data.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              }
            }
          })}
        </tbody>
      </table>
    </>
  );
}
