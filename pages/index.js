import HomePage from "@/component/template/HomePage";
import { getSession } from "next-auth/react";

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
