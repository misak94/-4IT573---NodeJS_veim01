import test from "ava"
import { migrate } from "drizzle-orm/libsql/migrator"
import { db } from "../src/app.js"
import { todosTable } from "../src/schema.js"
import { insertTodo,removeTodoById,findTodoByTitle, getAllTodos } from "../src//db.js"

test.before("run migrations", async () => {
    await migrate(db, { migrationsFolder: "drizzle" })
  })

  test("getAllTodos",async (t)=>{
    const titles = ["test","test1","test2"]
    for (const title of titles){
        await insertTodo(db,title)
    }
    const todos = await getAllTodos(db)
    t.is(todos.length,titles.length)

  })