import test from "ava"
import { migrate } from "drizzle-orm/libsql/migrator"
import { db } from "../src/app.js"
import { todosTable } from "../src/schema.js"
import { insertTodo,findTodoByTitle,toggleTodoById} from "../src//db.js"

test.before("run migrations", async () => {
    await migrate(db, { migrationsFolder: "drizzle" })
  })

test("toggleTodoById", async (t)=>{
    const title = "test"
    await insertTodo(db,title)
    let todo = await findTodoByTitle(db,title)
    t.false(todo.done)
    await toggleTodoById(db,todo.id)
    todo = await findTodoByTitle(db,title)
    t.true(todo.done)
    
})  