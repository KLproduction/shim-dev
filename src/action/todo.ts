"use server";

import { db } from "@/lib/db";

export async function getTodos(userId: string) {
  return db.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function addTodo(userId: string, title: string) {
  return db.todo.create({
    data: { userId, title },
  });
}

export async function toggleTodo(todoId: string) {
  const todo = await db.todo.findUnique({ where: { id: todoId } });
  if (!todo) throw new Error("Todo not found");
  return db.todo.update({
    where: { id: todoId },
    data: { completed: !todo.completed },
  });
}

export async function deleteTodo(todoId: string) {
  return db.todo.delete({ where: { id: todoId } });
}
