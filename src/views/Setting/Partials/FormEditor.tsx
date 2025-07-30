import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import _ from "lodash";
import { closeModal, useSettingDispatch, useSettingSelector } from "../store";
import useSettingByKey from "@hooks/setting/useSettingByKey";
import { Button, Col, Form, Input, Row, Skeleton, notification } from "antd";
import useSettingMutation from "@hooks/setting/useSettingMutation";

const HtmlToEditor = (html: string) => {
  const blocksFromHtml = htmlToDraft(html);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  return EditorState.createWithContent(contentState);
};

const FormEditor = () => {
  const [settingKey, settingName] = useSettingSelector((state) => [
    state.setting.key,
    state.setting.name,
  ]);
  const dispatch = useSettingDispatch();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const [form] = Form.useForm();

  const { data, isLoading, isSuccess } = useSettingByKey(settingKey);
  const mutation = useSettingMutation();

  useEffect(() => {
    if (isSuccess) {
      form.setFieldValue("params", data?.params ?? "");
      setEditorState(HtmlToEditor(data?.params ?? ""));
    }
  }, [isSuccess]);

  async function handleSubmit(values) {
    try {
      const payload = {
        id: data?.id,
        key: settingKey,
        params: values.params,
      };
      await mutation.mutateAsync(payload);

      notification.success({
        message: "Berhasil",
        description: `Pengaturan ${settingName} berhasil disimpan`,
      });
      dispatch(closeModal());
    } catch (error) {
      notification.error({
        message: "Gagal",
        description: `Terjadi kesalahan`,
      });
    }
  }
  return (
    <Form
      layout="vertical"
      form={form}
      initialValues={{ editorState: EditorState.createEmpty() }}
      onFinish={handleSubmit}
    >
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12}>
          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <Form.Item label="WSYIWYG Editor" name="editorState">
              <Editor
                disabled
                editorState={editorState}
                wrapperStyle={{
                  border: "solid 0.5px",
                  borderRadius: 15,
                  padding: 10,
                }}
                editorStyle={{
                  border: "solid 0.5px",
                  borderRadius: 15,
                  padding: 10,
                  height: "500px",
                }}
                onEditorStateChange={(value) => {
                  setEditorState(value);
                  form.setFieldValue(
                    "params",
                    draftToHtml(convertToRaw(editorState.getCurrentContent()))
                  );
                }}
              />
            </Form.Item>
          )}
        </Col>
        <Col xs={24} sm={12}>
          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <Form.Item label="HTML Editor" name="params">
              <Input.TextArea
                autoSize={{ minRows: 26 }}
                onChange={(e) => {
                  setEditorState(HtmlToEditor(e.target.value));
                }}
              />
            </Form.Item>
          )}
        </Col>
      </Row>
      <div style={{ textAlign: "right" }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={mutation.isLoading}
        >
          Simpan
        </Button>
      </div>
    </Form>
  );
};

export default FormEditor;
