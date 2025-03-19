import { type Todo } from "@/types/todoType";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const todosApi = createApi({
  tagTypes: ["Todos"],
  reducerPath: "todosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
  }),
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => "/todos",
      providesTags: ["Todos"],
    }),
    addTodo: builder.mutation<Todo, Todo>({
      query: (todo) => ({
        url: "/todos",
        method: "POST",
        body: todo,
      }),
      invalidatesTags: ["Todos"],
    }),
    removeTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
  }),
});

export default todosApi;
export const { useGetTodosQuery, useAddTodoMutation, useRemoveTodoMutation } =
  todosApi;
