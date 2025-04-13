import { Hono } from "hono"
import { serve } from "@hono/node-server"
import { logger } from "hono/logger"
import { serveStatic } from "@hono/node-server/serve-static"
import { renderFile } from "ejs"

let todos = [
  {
    id: 1,
    title: "Zajit na pivo",
    done: false,
  },
  {
    id: 2,
    title: "Doplnit skripty",
    done: false,
  },
]

const app = new Hono()

app.use(logger())
app.use(serveStatic({ root: "public" }))

app.get("/", async (c) => {
  const rendered = await renderFile("views/index.html", {
    title: "My todo app",
    todos,
  })
  console.log(todos)
  return c.html(rendered)
})

app.post("/todos", async (c) => {
  const form = await c.req.formData()

  todos.push({
    id: todos.length + 1,
    title: form.get("title"),
    done: false,
  })

  return c.redirect("/")
})

app.get("/todos/:id/toggle", async (c) => {
  const id = Number(c.req.param("id"))

  const todo = todos.find((todo) => todo.id === id)

  if (!todo) return c.notFound()

  todo.done = !todo.done

  return c.redirect("/")
})

app.get("/todos/:id/remove", async (c) => {
  const id = Number(c.req.param("id"))

  const index = todos.findIndex((todo) => todo.id === id)

  if (index === -1) return c.notFound()

  todos.splice(index, 1)

  return c.redirect("/")
})

app.get("todo/:id", async c => {
  const id = Number(c.req.param("id"))
  const rendered = await renderFile("views/detail.html",{
    title: "test",
    todo: todos.find((todo) => todo.id === id)

  })
  return c.html(rendered)
})

app.post("/:id/change_name", async c=>{
  const id = Number(c.req.param("id"))
  const form = await c.req.formData()
  console.log(todos)
  const todo = todos.find((todo) => todo.id === id)
  todos = todos.filter((item) => item.id !== id);
  console.log(todos)
  todo.title = form.get("title")
  todos.push(todo)
  console.log(todos)
  const url = "/todo/" + id.toString()

  return c.redirect("/todo/" + id.toString())
})

serve(app, (info) => {
  console.log(
    "App started on http://localhost:" + info.port
  )
})
