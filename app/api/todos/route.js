// import{todos} from "../../../data/todos"
// export async function GET() {
//     return Response.json(todos)
// }

// export async function POST(req) {
//     const body = await req.json();
//     const newTodo={
//         id:todos.length+1,
//         todo:body.todo
//     }

//     todos.push(newTodo),


//     console.log("body : " + body)
//     return Response.json(newTodo,{status:201})
// }

// export async function DELETE() {
//     todos.length=0;
//     return Response.json({
//         message:"deleteAll"
//     })
// }

// export async function PUT(req) {
//     todos.length=0;
//     const data =await req.json();
//     todos.push(...data)
//     console.log(data)
//     return Response.json({message : "data chenged !!" , data})
// }

import { todos } from "../../../data/todos";

export async function GET() {
  return Response.json(todos);
}

export async function POST(req) {
  const body = await req.json();

  const newId =
    todos.length > 0
      ? Math.max(...todos.map((item) => item.id)) + 1
      : 1;

  const newTodo = {
    id: newId,
    todo: body.todo,
  };

  todos.push(newTodo);

  return Response.json(newTodo, {
    status: 201,
  });
}

export async function DELETE() {
  todos.length = 0;

  return Response.json({
    message: "All todos deleted",
  });
}

export async function PUT(req) {
  const data = await req.json();

  todos.length = 0;
  todos.push(...data);

  return Response.json({
    message: "Todos replaced successfully",
    data: todos,
  });
}