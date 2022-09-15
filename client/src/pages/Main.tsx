import { useQuery } from "@apollo/client";
import { Alert, Descriptions, Spin } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyForm from "./../components/MyForm";
import { GET_ALL_USERS } from "./../query/user";

interface GetAllUsersData {
  getAllUsers: GetAllUsers[];
}

interface GetAllUsers {
  id: number;
  username: string;
  age: number;
}

const Main = () => {
  const { data, loading, error, refetch } = useQuery<GetAllUsersData, null>(
    GET_ALL_USERS
  );
  const [user, setUser] = useState<GetAllUsers[] | undefined>([]);
  useEffect(() => {
    setUser(data?.getAllUsers);
  }, [data]);
  return (
    <div style={{ width: 300, margin: "auto", marginTop: 60 }}>
      <MyForm refetch={refetch} />
      <div style={{ display: "flex", flexDirection: "column", rowGap: 40 }}>
        {loading && <Spin />}
        {error && <Alert message={error.message} type="error" />}
        {!loading &&
          !error &&
          user?.map((item) => (
            <Descriptions
              layout="vertical"
              size="small"
              bordered
              title={`Пользователь № ${item.id}`}
              key={item.id}
            >
              <Descriptions.Item label="Имя">{item.username}</Descriptions.Item>
              <Descriptions.Item label="Возраст">{item.age}</Descriptions.Item>
              <Descriptions.Item label="Ссылка">
                <Link to={`item/${item.id}`}>Перейти</Link>
              </Descriptions.Item>
            </Descriptions>
          ))}
      </div>
    </div>
  );
};

export default Main;
