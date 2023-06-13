import {
  ProForm,
  ProFormDependency,
  ProFormRadio,
  ProFormText,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import {Modal} from 'antd';
import React from 'react';

export type UpdateFormValueType = {
  taskId: string;
  mode: number;
  port?: number;
  pcapFile?: File;
};

export type UpdateFormProps = {
  onCancel: (flag?: boolean, formVals?: UpdateFormValueType) => void;
  onSubmit: (values: UpdateFormValueType) => Promise<void>;
  updateModalOpen: boolean;
  values: API_Task.taskListItem
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  return (
    <Modal
      width={640}
      bodyStyle={{padding: '32px 40px 48px'}}
      destroyOnClose
      title='修改任务'
      open={props.updateModalOpen}
      footer={null}
      onCancel={() => {
        props.onCancel();
      }}
    >
      <ProForm
        onFinish={props.onSubmit}
        initialValues={{
          taskId: props.values.taskId,
          mode: props.values.mode,
        }}
      >
        <ProFormText
          name="taskId"
          label="任务ID"
          width="md"
          readonly={true}
        />
        <ProFormRadio.Group
          name="mode"
          label="任务类型"
          options={[
            {
              label: '离线',
              value: 0,
            },
            {
              label: '在线',
              value: 1,
            },
          ]}
        />
        <ProForm.Group>

          <ProFormDependency name={["mode"]}>
            {({mode}) => {
              return mode === 0 ? (
                <ProFormUploadButton
                  label="请上传新的流量文件"
                  name="pcapFile"
                  width={"md"}
                  max={1}
                  rules={[
                    {
                      required: true,
                      message: "请上传流量文件"
                    },
                  ]}
                  fieldProps={{
                    beforeUpload: () => {
                      return false;
                    }
                  }}
                />
              ) : mode === 1 ? (
                <ProFormText
                  name="port"
                  label='输入抓包端口'
                  width="md"
                  rules={[
                    {
                      required: true,
                      message: "请选择端口"
                    },
                  ]}
                />
              ) : null;
            }}
          </ProFormDependency>
        </ProForm.Group>
      </ProForm>
    </Modal>
  );
};

export default UpdateForm;
