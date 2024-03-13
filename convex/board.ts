import { v } from "convex/values";

import { mutation } from "./_generated/server";

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: "/images/placeholder.svg",
    });

    return board;
  },
});

export const remove = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;

    const existingFavourites = await ctx.db
      .query("userFavourites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", args.id)
      )
      .unique();

    if (existingFavourites) {
      await ctx.db.delete(existingFavourites._id);
    }

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const title = args.title.trim();

    if (!title) {
      throw new Error("Title is required");
    }

    if (title.length < 8 || title.length > 50) {
      throw new Error(
        "Title minimum length is 8 characters and max length is 50 characters"
      );
    }

    const board = await ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});

export const favourite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const userFavourites = await ctx.db
      .query("userFavourites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("boardId", board._id).eq("orgId", board.orgId).eq("userId", userId)
      )
      .unique();

    if (userFavourites) {
      throw new Error("Board already favourited");
    }

    await ctx.db.insert("userFavourites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});

export const unfavourite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const userFavourites = await ctx.db
      .query("userFavourites")
      .withIndex("by_user_board_org", (q) =>
        q.eq("boardId", board._id).eq("orgId", board.orgId).eq("userId", userId)
      )
      .unique();

    if (!userFavourites) {
      throw new Error("Favourited board not found");
    }

    await ctx.db.delete(userFavourites._id);

    return board;
  },
});
