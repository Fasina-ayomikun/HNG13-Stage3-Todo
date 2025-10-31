import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export interface Todo {
  _id: Id<"todos">;
  title: string;
  description?: string;
  completed: boolean;
  order: number;
  createdAt: number;
  updatedAt: number;
}

export const list = query({
  args: {},
  handler: async (ctx): Promise<Todo[]> => {
    const todos = await ctx.db.query("todos").withIndex("by_order").collect();
    return todos.map((t) => ({
      _id: t._id,
      title: t.title,
      description: t.description,
      completed: t.completed,
      order: t.order,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    }));
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (
    ctx,
    args: { title: string; description?: string }
  ): Promise<Id<"todos">> => {
    const count = (await ctx.db.query("todos").collect()).length;
    const now = Date.now();
    return await ctx.db.insert("todos", {
      title: args.title,
      description: args.description,
      completed: false,
      order: count,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("todos"),
    patch: v.object({
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      completed: v.optional(v.boolean()),
    }),
  },
  handler: async (
    ctx,
    args: {
      id: Id<"todos">;
      patch: {
        title?: string;
        description?: string;
        completed?: boolean;
      };
    }
  ): Promise<void> => {
    const prev = await ctx.db.get(args.id);
    if (!prev) throw new Error("Todo not found");
    await ctx.db.patch(args.id, { ...args.patch, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args: { id: Id<"todos"> }): Promise<void> => {
    await ctx.db.delete(args.id);
  },
});

export const reorder = mutation({
  args: { idsInOrder: v.array(v.id("todos")) },
  handler: async (
    ctx,
    { idsInOrder }: { idsInOrder: Id<"todos">[] }
  ): Promise<void> => {
    for (let i = 0; i < idsInOrder.length; i++) {
      await ctx.db.patch(idsInOrder[i], { order: i, updatedAt: Date.now() });
    }
  },
});
