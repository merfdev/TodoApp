import User from "@/models/User";
import { hashPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

async function handler(req, res) {
  if (req.method !== "POST") return;
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "error connecting to database" });
  }
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ status: "failed", message: "email and password are required" });
  }
  const userExisting = await User.findOne({ email: email });
  if (userExisting) {
    return res
      .status(422)
      .json({ status: "failed", message: "user already exists" });
  }
  const hashedPassword = await hashPassword(password);
  const newUser = User.create({ email: email, password: hashedPassword });
  console.log(newUser);
  res.status(201).json({ status: "success", data: "created user" });
}
export default handler;
