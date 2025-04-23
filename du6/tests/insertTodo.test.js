import test from "ava"
import { migrate } from "drizzle-orm/libsql/migrator"
import { db } from "../src/app.js"
import { todosTable } from "../src/schema.js"
import { findTodoByTitle, insertTodo } from "../src//db.js"

test.before("run migrations", async () => {
    await migrate(db, { migrationsFolder: "drizzle" })
  })

test("InsertTodo do db", async (t) => {
    const title = "test"
    await insertTodo(db,title)
    const todo = await findTodoByTitle(db,title)
    t.is(todo.title, title)
})