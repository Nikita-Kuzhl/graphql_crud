import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { FC, useState } from "react";
import ADD_USER from "../mutation/user";

interface MutationUser {
  username?: string;
  age?: number;
}
interface Props {
  refetch: () => void;
}

const MyForm: FC<Props> = ({ refetch }) => {
  const [reqData, setReqData] = useState<MutationUser>();
  const [form] = useForm();
  const [newUser] = useMutation(ADD_USER);

  const addUser = () => {
    newUser({
      variables: {
        input: {
          username: reqData?.username,
          age: reqData?.age,
        },
      },
    });
    form.resetFields();
  };

  return (
    <Form form={form}>
      <Form.Item label="Имя" name="name">
        <Input
          value={reqData?.username}
          onChange={(e) => setReqData({ ...reqData, username: e.target.value })}
        />
      </Form.Item>
      <Form.Item label="Возраст" name="age">
        <Input
          type="number"
          value={reqData?.age}
          onChange={(e) =>
            setReqData({ ...reqData, age: Number(e.target.value) })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button onClick={addUser}>Отправить</Button>
        <Button onClick={() => refetch()}>Получить</Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;
