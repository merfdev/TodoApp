import AddTodoPage from "@/component/template/AddTodoPage";
import { getSession } from "next-auth/react";

function AddTodo({ session }) {
  return <AddTodoPage session={session} />;
}

export default AddTodo;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
}
