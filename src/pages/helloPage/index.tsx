import { FC } from "react";

const HelloPage: FC = () => {
  return (
    <>
      <h1
        style={{
          margin: "40px auto",
          textAlign: "center",
          maxWidth: "fit-content",
          padding: "15px",
          border: "solid 1px grey",
        }}
      >
        With greetings, all ye who <br /> enter here! 🧙🏻‍♀️
      </h1>
    </>
  );
};
export default HelloPage;
