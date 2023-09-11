import { Task } from "../model/Task";
import { useState } from "react";
import moment from "moment";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import filterType from "../model/filterType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Filter } from "../model/filter";

const schema = z.object({
  type: z.string(),
});

export default function TaskFilter(props: { onUpdateFilter: Function }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Filter>({
    defaultValues: {
      type: filterType[0],
    },
    resolver: zodResolver(schema),
  });

  const onChangeFilter: SubmitHandler<Filter> = (data) => {
    props.onUpdateFilter(data);
  };

  return (
    <>
      <div className="ml-3">
        <form
          className="w-full max-w-lg"
          method="post"
          onChange={handleSubmit(onChangeFilter)}
        >
          <select
            {...register("type", { required: true })}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="filter"
            placeholder="All"
            defaultValue="All"
          >
            {filterType.map((f) => (
              <option key={f} value={f.toString()}>
                {f}
              </option>
            ))}
          </select>
        </form>
      </div>
    </>
  );
}
