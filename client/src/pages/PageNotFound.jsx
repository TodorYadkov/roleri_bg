import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const { moveBack } = useMoveBack();

  return (
    <>
      <h3>The page you are looking for could not be found 😢</h3>
      <button onClick={moveBack} size="large">
        &larr; Go back
      </button>
    </>
  );
}

export default PageNotFound;
