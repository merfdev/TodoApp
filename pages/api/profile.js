import User from "@/models/User";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { getSession } from "next-auth/react";

async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error connecting to database" });
  }
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "You must be logged in" });
  }
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User not found" });
  }
  if (req.method === "POST") {
    const { name, lastName, password } = req.body;
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res
        .status(422)
        .json({ status: "failed", message: "passwrod is incorrect" });
    }
    user.name = name;
    user.lastName = lastName;
    user.save();
    res.status(200).json({ status: "success", message: "Profile update" });
  } else if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      data: { name: user.name, lastName: user.lastName, email: user.email },
    });
  }
}
export default handler;
