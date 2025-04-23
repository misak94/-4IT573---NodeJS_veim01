import { todosTable } from "./schema.js"
import { eq } from "drizzle-orm"



export const getTodoById = async (db,id) => {
  const todo = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, id))
    .get()

  return todo
}

export const getAllTodos = async (db) => {
  const todos = await db
        .select().from(todosTable).all()
  return todos
}

export const removeTodoById = async (db,id) => {
  await db
    
    .delete(todosTable)
    .where(eq(todosTable.id, id))
    

}

export const updateTodoById = async (db,id,title,priority) => {
  await db
        .update(todosTable)
        .set({title: title,
              priority: priority})
        .where(eq(todosTable.id,id))      
      
}

export const toggleTodoById = async (db,id)=>{
    const todo = await getTodoById(db,id)
    await db
    .update(todosTable)
    .set({ done: !todo.done })
    .where(eq(todosTable.id, id))
        
}

export const insertTodo = async (db,title) =>{
    await db
        .insert(todosTable)
        .values({
            title: title,
            done: false

        })
}

export const findTodoByTitle = async (db,title)=>{
  const todo = await db
        .select()
        .from(todosTable)
        .where(eq(todosTable.title,title))
        .get()
  return todo
}