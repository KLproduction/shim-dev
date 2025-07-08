"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
export default function TodoPage() {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user?.id) setUserId(data.user.id);
      else setError("User not found. Please sign in.");
    }
    fetchUser();
  }, []);

  useEffect(() => {
    console.log("userId updated", userId);
  }, [userId]);

  async function fetchTodos() {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from("Todo")
        .select("id, title, completed")
        .eq("userId", userId)
        .order("createdAt", { ascending: false });
      if (error) throw error;
      setTodos(data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (userId) fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!newTodo.trim() || !userId) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("Todo").insert({
        id: crypto.randomUUID(),
        userId,
        title: newTodo,
      });
      if (error) throw error;
      setNewTodo("");
      fetchTodos();
    } catch (err: any) {
      setError(err.message || "Failed to add todo");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleTodo(id: string, completed: boolean) {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("Todo")
        .update({ completed: !completed })
        .eq("id", id);
      if (error) throw error;
      fetchTodos();
    } catch (err: any) {
      setError(err.message || "Failed to toggle todo");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTodo(id: string) {
    setLoading(true);
    try {
      const { error } = await supabase.from("Todo").delete().eq("id", id);
      if (error) throw error;
      fetchTodos();
    } catch (err: any) {
      setError(err.message || "Failed to delete todo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto mt-10 max-w-md rounded bg-white p-6 shadow">
      <h1 className="mb-4 text-2xl font-bold">Todo List</h1>
      <form onSubmit={handleAddTodo} className="mb-4 flex gap-2">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          disabled={loading || !userId}
        />
        <Button type="submit" disabled={loading || !newTodo.trim() || !userId}>
          Add
        </Button>
      </form>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center gap-2">
            <Button
              variant={todo.completed ? "secondary" : "outline"}
              size="icon"
              onClick={() => handleToggleTodo(todo.id, todo.completed)}
              disabled={loading}
            >
              {todo.completed ? "✔" : "○"}
            </Button>
            <span
              className={todo.completed ? "text-gray-400 line-through" : ""}
            >
              {todo.title}
            </span>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleDeleteTodo(todo.id)}
              disabled={loading}
            >
              ×
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
