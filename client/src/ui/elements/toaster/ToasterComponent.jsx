import { Toaster } from "react-hot-toast";

function ToasterComponent() {
  return (
    <Toaster
      position={"top-center"}
      gutter={12}
      containerStyle={{ margin: "0.8rem" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 5000,
        },
        style: {
          backgroundColor: "#fff",
          fontSize: "1.6rem",
          maxWidth: "50rem",
          padding: "1.6rem 2.4rem",
        },
      }}
    />
  );
}

export default ToasterComponent;
