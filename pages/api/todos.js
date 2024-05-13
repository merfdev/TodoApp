import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { sortTodos } from "@/utils/sortTodos";

import { getSession } from "next-auth/react";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "not connecting to DB" });
  }
  const secret = process.env.SECRET_KEY;
  const session = await getSession({ req });

  console.log(session);
  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "you are not logged in" });
  }
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "user not found" });
  }

  if (req.method === "POST") {
    const { title, status } = req.body;
    if (!title || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "invalif data" });
    }
    user.todos.push({ title, status });
    user.save();
    res.status(201).json({ status: "success", message: "todo create" });
  } else if (req.method === "GET") {
    const sortedData = sortTodos(user.todos);
    res.status(200).json({ status: "success", data: { todos: sortedData } });
  }
}
export default handler;
