"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  // GET
  const fetchTodos = async () => {
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodos(data);
  };

  // POST
  const clickHandler = async () => {
    if (!todo.trim()) return;

    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ todo }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return;

    setTodo("");
    await fetchTodos();
  };

  // DELETE ALL
  const deleteHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "DELETE",
    });

    if (!res.ok) return;

    setTodos([]);
  };

  // PUT - Replace All
  const replaceHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "PUT",
      body: JSON.stringify([
        { id: 1, todo: "todo" },
        { id: 2, todo: "List" },
        { id: 3, todo: "EMiR" },
      ]),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) return;

    setTodos(data.data);
  };

  // PATCH
  const editHandler = async () => {
    if (!id || !title.trim()) return;

    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.log(data.message);
      return;
    }

    setTodos(data);

    setId("");
    setTitle("");
  };

  // Initial GET
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-12 text-white">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-black tracking-tight text-cyan-400">
            NextAPI
          </h1>

          <p className="mt-3 text-zinc-500">
            Manage your todos with Next.js API
          </p>
        </header>

        {/* Add Todo */}
        <section className="mx-auto mb-10 max-w-2xl">
          <div className="flex gap-3">
            <input
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") clickHandler();
              }}
              type="text"
              placeholder="Write a new todo..."
              className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
            />

            <button
              onClick={clickHandler}
              className="rounded-2xl bg-cyan-600 px-7 font-bold transition hover:-translate-y-1 hover:bg-cyan-500 active:translate-y-0"
            >
              Add
            </button>
          </div>
        </section>

        {/* Todo List */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-zinc-200">
              Your Todos
            </h2>

            <span className="rounded-full bg-zinc-900 px-4 py-1 text-sm text-zinc-500">
              {todos.length} items
            </span>
          </div>

          {todos.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-800 py-16 text-center">
              <p className="text-zinc-600">
                No todos yet
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {todos.map((td) => (
                <li
                  key={td.id}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-cyan-500/5"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 font-bold text-cyan-400">
                      {td.id}
                    </span>

                    <span className="truncate text-zinc-200">
                      {td.todo || (
                        <span className="text-zinc-600">
                          Empty todo
                        </span>
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Actions */}
        <section className="mt-10 flex flex-wrap justify-center gap-3">
          <button
            onClick={deleteHandler}
            className="rounded-2xl border border-red-500/20 bg-red-500/10 px-6 py-3 font-semibold text-red-400 transition hover:-translate-y-1 hover:bg-red-500/20"
          >
            Delete All
          </button>

          <button
            onClick={replaceHandler}
            className="rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-6 py-3 font-semibold text-yellow-400 transition hover:-translate-y-1 hover:bg-yellow-500/20"
          >
            Replace All
          </button>
        </section>

        {/* PATCH */}
        <section className="mx-auto mt-12 max-w-2xl">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-zinc-200">
              Edit Todo
            </h2>

            <p className="mt-1 text-sm text-zinc-600">
              Enter the Todo ID and the new title
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              type="number"
              min="1"
              placeholder="ID"
              className="rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 sm:w-32"
            />

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") editHandler();
              }}
              type="text"
              placeholder="New todo title..."
              className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />

            <button
              onClick={editHandler}
              className="rounded-2xl bg-purple-600 px-7 py-4 font-bold transition hover:-translate-y-1 hover:bg-purple-500 active:translate-y-0"
            >
              Edit
            </button>
          </div>
        </section>

      </div>
    </main>
  );
}