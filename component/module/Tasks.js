import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { RiMastodonLine } from "react-icons/ri";

function Tasks({ data, fetchTodos, next, back }) {
  const statusHandler = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") fetchTodos();
  };
  return (
    <div className="tasks">
      {data?.map((i) => (
        <div className="tasks__card" key={i._id}>
          <span className={i.status}></span>
          <RiMastodonLine />
          <h4>{i.title}</h4>
          <div>
            {back ? (
              <button
                className="button-back"
                onClick={() => statusHandler(i._id, back)}
              >
                <BiLeftArrow />
                Back
              </button>
            ) : (
              <span></span>
            )}
            {next ? (
              <button
                className="button-next"
                onClick={() => statusHandler(i._id, next)}
              >
                Next
                <BiRightArrow />
              </button>
            ) : (
              <span></span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
