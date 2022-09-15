import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { ApolloQueryResult, useMutation } from "@apollo/client";
import { Button, Input, Typography } from "antd";
import React, { FC, useState } from "react";
import { DELETE_POST, UPDATE_POST } from "../mutation/post";
import { GetUserData, InputPost, IPost } from "../types";

interface Props {
  item: IPost;
  refetch: () => Promise<ApolloQueryResult<GetUserData>>;
}

const ChangeForm: FC<Props> = ({ item, refetch }) => {
  const [openChangeButton, setOpenChangeButton] = useState(false);
  const [postValue, setPostValue] = useState<InputPost>(item);
  const [deletePost] = useMutation(DELETE_POST);
  const [updatePost] = useMutation(UPDATE_POST);

  const onClickDelete = async (postId: string | number) => {
    await deletePost({ variables: { id: postId } });
    await refetch();
  };
  const onClickUpdate = async () => {
    await updatePost({
      variables: {
        id: item.id,
        input: { title: postValue.title, content: postValue.content },
      },
    });
    setPostValue(item);
    await refetch();
    setOpenChangeButton(false);
  };
  return (
    <>
      <div
        style={{
          left: "70%",
          position: "relative",
          top: -25,
          display: "flex",
          gap: 10,
        }}
      >
        {openChangeButton ? (
          <Button
            shape="circle"
            icon={<CheckOutlined />}
            type="dashed"
            style={{ color: "green" }}
            onClick={() => onClickUpdate()}
          />
        ) : (
          <Button
            shape="circle"
            icon={<EditOutlined />}
            onClick={() => setOpenChangeButton(true)}
          />
        )}
        <Button
          shape="circle"
          onClick={
            !openChangeButton
              ? () => onClickDelete(item.id)
              : () => setOpenChangeButton(false)
          }
          icon={<CloseOutlined />}
          type={openChangeButton ? "dashed" : "default"}
          style={{ color: openChangeButton ? "red" : "" }}
        />
      </div>
      <Typography.Title level={2}>
        {openChangeButton ? (
          <Input
            value={postValue.title}
            placeholder={postValue.title}
            onChange={(e) =>
              setPostValue({ ...postValue, title: e.target.value })
            }
          />
        ) : (
          item.title
        )}
      </Typography.Title>
      <Typography.Paragraph>
        {openChangeButton ? (
          <Input.TextArea
            value={postValue.content}
            placeholder={postValue.content}
            onChange={(e) =>
              setPostValue({ ...postValue, content: e.target.value })
            }
          />
        ) : (
          item.content
        )}
      </Typography.Paragraph>
    </>
  );
};

export default ChangeForm;
