import { ArrowLeftOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import {
  Alert,
  Button,
  Descriptions,
  Divider,
  Form,
  Input,
  Spin,
  Typography,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChangeForm from "../components/ChangeForm";
import { ADD_POST } from "../mutation/post";
import { GET_USER } from "../query/user";
import { GetUserData, InputPost } from "../types";

const Item = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState<InputPost>();

  const {
    data: user,
    loading,
    error,
    refetch,
  } = useQuery<GetUserData, { id: string | undefined }>(GET_USER, {
    variables: {
      id,
    },
  });
  const [createPost] = useMutation(ADD_POST);
  const [form] = useForm();

  const onFinish = async () => {
    await createPost({
      variables: {
        id: id,
        input: post,
      },
    });
    form.resetFields();
    await refetch();
  };

  return (
    <div style={{ width: 300, margin: "auto", marginTop: 60 }}>
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        style={{ marginLeft: -15, marginBottom: 20 }}
        onClick={() => navigate("/")}
      >
        Назад
      </Button>
      <Form onFinish={onFinish} form={form}>
        <Form.Item>
          <Input
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            value={post?.title}
            name="title"
            placeholder="Название"
          />
        </Form.Item>
        <Form.Item>
          <Input
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            value={post?.content}
            name="content"
            placeholder="Описание"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Form>
      <div style={{ display: "flex", flexDirection: "column", rowGap: 40 }}>
        {loading && <Spin />}
        {error && <Alert message={error.message} type="error" />}
        {!loading && !error && (
          <Descriptions
            layout="vertical"
            size="small"
            bordered
            title={`Пользователь № ${id}`}
          >
            <Descriptions.Item label="Имя">
              {user?.getUser.username}
            </Descriptions.Item>
            <Descriptions.Item label="Возраст">
              {user?.getUser.age}
            </Descriptions.Item>
          </Descriptions>
        )}
        <Typography.Title>Посты</Typography.Title>
        {!loading &&
          user?.getUser.posts &&
          user?.getUser.posts.map((item) => (
            <Typography key={item.id}>
              <Divider />
              Пост <Typography.Text code>№ {item.id}</Typography.Text>
              <ChangeForm refetch={refetch} item={item} />
              <Divider />
            </Typography>
          ))}
      </div>
    </div>
  );
};

export default Item;
