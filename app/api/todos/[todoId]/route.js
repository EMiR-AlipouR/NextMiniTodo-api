import { todos } from "@/data/todos";

export async function GET(req, { params }) {
  const { todoId } = await params;

  const data = todos.find(
    (item) => item.id === Number(todoId)
  );

  if (!data) {
    return Response.json(
      { message: "Todo not found" },
      { status: 404 }
    );
  }

  return Response.json(data);
}

export async function PATCH(req, { params }) {
  const { todoId } = await params;
  const { title } = await req.json();

  const index = todos.findIndex(
    (item) => item.id === Number(todoId)
  );

  if (index === -1) {
    return Response.json(
      { message: "Todo not found" },
      { status: 404 }
    );
  }


  todos[index].todo = title;

  return Response.json(todos);
}