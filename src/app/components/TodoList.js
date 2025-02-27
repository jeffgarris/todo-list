import TodoListItem from "./TodoListItem";

export default function TodoList() {
  return (
    <div className="w-96 border-2 border-black rounded-md">
      <h1 className="w-[100%] border-b-2 border-black bg-slate-600 p-4 text-center text-xl text-white uppercase">Shopping List</h1>
      <div className="flex flex-col gap-4 p-4 bg-zinc-50">
        <TodoListItem />
      </div>
    </div>
  );
}