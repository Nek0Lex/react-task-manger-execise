import categories from "../model/categories";
import { Task } from "../model/Task";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import TaskList from "./TaskList";

const validationSchema = z.object({
  id: z.number(),
  title: z.string().min(3, { message: "Minium character is 3" }).max(30),
  dueDate: z.date(),
  category: z.string(),
});

export default function TaskForm(props: {
  taskList: Task[];
  onUpdateForm: Function;
}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: {
      id: props.taskList.length + 1,
      title: "",
      dueDate: Date.now(),
      category: categories[0].toString(),
    },
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<Task> = (data) => {
    data.id = props.taskList.length + 1;
    props.onUpdateForm(data);
  };

  return (
    <div>
      <form
        className="w-full max-w-lg"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="px-3 mb-6 md:mb-0 pt-5">
          <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="title"
            placeholder="title"
          />
          {errors.title?.message && (
            <p className="text-red-600">{errors.title?.message}</p>
          )}
        </div>
        <div className="px-3 mb-6 md:mb-0 pt-5">
          <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2">
            Due Date
          </label>
          <input
            type="date"
            {...register("dueDate", { valueAsDate: true })}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="dueDate"
          />
        </div>
        <div className="px-3 mb-6 md:mb-0 pt-5">
          <label className="block  tracking-wide text-gray-700 text-xs font-bold mb-2">
            Category
          </label>
          <select
            {...register("category", { required: true })}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="category"
            placeholder="Jane"
            defaultValue={categories[0]}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <button
          className="py-3 px-4 mb-3 ml-3 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
