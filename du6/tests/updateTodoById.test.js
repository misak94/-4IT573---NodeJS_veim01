import test from "ava"
import { migrate } from "drizzle-orm/libsql/migrator"
import { db } from "../src/app.js"
import { todosTable } from "../src/schema.js"
import { insertTodo,findTodoByTitle,updateTodoById } from "../src//db.js"

test.before("run migrations", async () => {
    await migrate(db, { migrationsFolder: "drizzle" })
  })

  test("updateTodoById",async (t)=>{
    const title = "test"
    await insertTodo(db,title)
    let todo = await findTodoByTitle(db,title)
    t.is(todo.title,title)
    t.is(todo.priority,"normal")
    const new_title = "new_test"
    const new_priority = "low"
    await updateTodoById(db,todo.id,new_title,new_priority)
    todo = await findTodoByTitle(db,new_title)
    t.is(todo.title,new_title)
    t.is(todo.priority,new_priority)

  })