import React from "react";
import logo from "../logo.svg";
import "../App.css";
import { Button, message, Result } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import { UseGlobalContext } from "../store/AppContext";
import { execApi } from "../services/api";

function Home(props: any) {
  const { globalState } = UseGlobalContext();
  const createGame = async () => {
    try {
      const response = await execApi("/game", "POST", {});
      if (!response.error) {
        props.history.push("/game/" + response.data._id);
      } else {
        message.error("Could not create game!");
      }
    } catch (error) {
      message.error("Could not create game!");
    }
  };
  return (
    <Result
      title={`Hello ${globalState.user.name}`}
      icon={<SmileOutlined />}
      subTitle={`Email - ${globalState.user.email}`}
      extra={
        <Button onClick={createGame} type="primary" key="console">
          Start New Game
        </Button>
      }
    />
  );
}

export default Home;
