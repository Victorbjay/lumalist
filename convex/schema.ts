import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),   // epoch ms
    completed: v.boolean(),
    position: v.number(),              // for sorting
    createdAt: v.number(),
    updatedAt: v.number(),
  })
  .index("by_position", ["position"])
  .index("by_completed", ["completed"])
});
