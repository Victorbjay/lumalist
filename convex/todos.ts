import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { filter: v.optional(v.string()), tab: v.optional(v.string()) }, // "all"|"active"|"completed"
  handler: async (ctx, { filter, tab }) => {
    const items = await ctx.db.query("todos").withIndex("by_position").collect();
    const f = (filter ?? "").toLowerCase().trim();
    let res = items;
    if (tab === "active") res = res.filter(t => !t.completed);
    if (tab === "completed") res = res.filter(t => t.completed);
    if (f) res = res.filter(t => t.title.toLowerCase().includes(f) || (t.description ?? "").toLowerCase().includes(f));
    return res;
  },
});

export const add = mutation({
  args: { title: v.string(), description: v.optional(v.string()), dueDate: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const now = Date.now();
    const last = await ctx.db.query("todos").withIndex("by_position").order("desc").first();
    await ctx.db.insert("todos", {
      ...args,
      completed: false,
      position: (last?.position ?? 0) + 1,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const toggle = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, { id }) => {
    const t = await ctx.db.get(id);
    if (!t) throw new Error("Not found");
    await ctx.db.patch(id, { completed: !t.completed, updatedAt: Date.now() });
  },
});

export const update = mutation({
  args: { id: v.id("todos"), title: v.string(), description: v.optional(v.string()), dueDate: v.optional(v.number()) },
  handler: async (ctx, { id, ...rest }) => {
    await ctx.db.patch(id, { ...rest, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, { id }) => { await ctx.db.delete(id); },
});

export const reorder = mutation({
  args: { idsInOrder: v.array(v.id("todos")) },
  handler: async (ctx, { idsInOrder }) => {
    let pos = 1;
    for (const id of idsInOrder) await ctx.db.patch(id, { position: pos++, updatedAt: Date.now() });
  },
});
