import { Form, Input, Button, Checkbox, Alert, Layout, Row, Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { execApi } from "../services/api";
import { Actions } from "../store/Actions";
import { UseGlobalContext } from "../store/AppContext";
import { setAuthuser } from "../utils/helper";
const { Content } = Layout;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 12 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const LoginForm = (props: any) => {
  const [error, setError] = React.useState<string>();
  const { globalState, globalDispatch } = UseGlobalContext();
  const onFinish = async (values: any) => {
    setError("");
    const response = await execApi("login", "POST", values);
    console.log({ response });
    if (response.error) {
      setError(
        typeof response.data === "string"
          ? response.data
          : response.message || "Something went wrong"
      );
      return;
    }
    globalDispatch(Actions.setLoggedIn(!!response.data));
    window._token = response.data._token;
    setAuthuser(response.data._token);
    const userReposne = await execApi("currentUser");
    if (!userReposne.error) {
      globalDispatch(Actions.setUser(userReposne.data));
    }
    props.history.push("/");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Row gutter={16} justify="center" align="middle">
        <Col span={12} style={{ padding: 20 }}>
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            {error && <Alert message={error} type="error" />}
            <br />
            <br />
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              &nbsp;&nbsp;&nbsp;<Link to="/register">Register</Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};

export default LoginForm;
