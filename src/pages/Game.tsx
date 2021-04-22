import React, { Fragment, useEffect, useState } from "react";
import logo from "../logo.svg";
import "../App.css";
import {
  Button,
  Col,
  PageHeader,
  List,
  Row,
  Tag,
  Spin,
  Result,
  Modal,
  message,
  notification,
} from "antd";
import useInterval from "use-interval";

import { UseGlobalContext } from "../store/AppContext";
import { execApi } from "../services/api";
import { IGame } from "../store/interfaces";
import { exec } from "node:child_process";

function Game(props: any) {
  const [game, setGame] = useState<IGame | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const { globalState } = UseGlobalContext();
  const [notifed, setNotified] = useState(false);
  useEffect(() => {
    fetchGame();
  }, []);

  useEffect(() => {
    if (game && !game.status && !notifed) {
      setNotified(true);
      const status = game.playerHealth > 0 ? "success" : "error";
      notification[status]({
        message: status === "success" ? "You won!" : "Dragon won",
      });
    }
  }, [game]);

  const fetchGame = async () => {
    const { gameId } = props.match.params;
    const response = await execApi("game/" + gameId);
    if (!response.error) {
      setGame(response.data);
    } else {
      setGame(null);
    }
  };

  const onAttack = async (powerAttack = false) => {
    const { gameId } = props.match.params;
    setLoading(true);
    try {
      const response = await execApi("game/user-attack/" + gameId, "POST", {
        powerAttack,
      });
      setLoading(false);
      if (!response.error) {
        setGame(response.data);
      } else {
        message.error("Could not attack");
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const dragonAttack = async () => {
    const { gameId } = props.match.params;
    if (!(game && game.status)) {
      return;
    }
    try {
      const response = await execApi(
        "game/dragon-attack/" + gameId,
        "POST",
        {}
      );
      if (!response.error) {
        setGame(response.data);
      } else {
        message.error("Could not attack");
      }
    } catch (e) {
      setLoading(false);
    }
  };

  useInterval(dragonAttack, 2000);

  const onGiveUp = async () => {
    const { gameId } = props.match.params;
    // if (loading) return;
    if (game && game.playerHealth <= 0) return;
    setLoading(true);
    try {
      const response = await execApi("game/giveup/" + gameId, "POST", {});
      setLoading(false);
      if (!response.error) {
        setGame(response.data);
      } else {
        message.error("Could not attack");
      }
    } catch (e) {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      {game ? (
        <PageHeader
          title=""
          className="site-page-header"
          subTitle="This is a subtitle"
          tags={
            game.status ? (
              <Tag color="blue">Running</Tag>
            ) : game.wonBy === "Player" ? (
              <Tag color="green">Player won</Tag>
            ) : (
              <Tag color="red">Dragon won</Tag>
            )
          }
          extra={[]}
        >
          <Row>
            <Col
              span={14}
              style={{
                paddingLeft: 25,
                paddingRight: 25,
              }}
            >
              <Row>
                <Col
                  span={12}
                  style={{
                    textAlign: "center",

                    paddingLeft: 25,
                    paddingRight: 25,
                  }}
                >
                  <h3>{globalState.user.name}</h3>
                  <Button
                    type="primary"
                    size="large"
                    block
                    style={{ background: "green" }}
                  >
                    {game.playerHealth}
                  </Button>
                </Col>
                <Col
                  span={12}
                  style={{
                    textAlign: "center",
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                >
                  <h3>Dragon</h3>
                  <Button type="primary" size="large" block danger>
                    {game.dragonHealth}
                  </Button>
                </Col>
              </Row>
              {game.status && (
                <div style={{ textAlign: "center", marginTop: 30 }}>
                  <h3>Action Buttons</h3>
                  <Button
                    size="large"
                    disabled={loading}
                    onClick={() => onAttack()}
                    style={{ marginRight: 10 }}
                    type="primary"
                  >
                    ATTACK
                  </Button>
                  <Button
                    size="large"
                    disabled={loading}
                    onClick={() => onAttack(true)}
                    style={{ marginRight: 10 }}
                    type="primary"
                  >
                    BLAST
                  </Button>
                  <Button
                    size="large"
                    disabled={loading}
                    onClick={onGiveUp}
                    style={{ marginRight: 10 }}
                    type="primary"
                  >
                    GIVE UP
                  </Button>
                </div>
              )}
            </Col>
            <Col span={8}>
              <List
                style={{ height: 400, overflow: "auto", width: "100%" }}
                header={<div>Commentry Box</div>}
                bordered
                dataSource={game.logs}
                renderItem={(item) => <List.Item>{item.log}</List.Item>}
              />
            </Col>
          </Row>
        </PageHeader>
      ) : game === null ? (
        <Result
          title={`Error`}
          status="error"
          subTitle={`Could not find game`}
          extra={
            <Button type="primary" key="console">
              Go Back
            </Button>
          }
        />
      ) : (
        <Spin size="large" />
      )}
    </Fragment>
  );
}

export default Game;
