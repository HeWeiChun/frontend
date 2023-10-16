import {
    ProForm,
    ProFormUploadButton,
    ProFormSelect, ProFormText
} from '@ant-design/pro-components';
import {Modal} from 'antd';
import React from 'react';

export type AddFormValueType = {
    mode: number;
    model: number;
    // port?: number;
    status: number;
    pcapFile: File[];
};

export type AddFormProps = {
    onCancel: (flag?: boolean, formVals?: AddFormValueType) => void;
    onSubmit: (values: AddFormValueType) => Promise<void>;
    addModalOpen: boolean;
};

const AddForm: React.FC<AddFormProps> = (props) => {
    return (
        <Modal
            width={640}
            bodyStyle={{padding: '32px 40px 48px'}}
            destroyOnClose
            title='新建任务'
            open={props.addModalOpen}
            footer={null}
            onCancel={() => {
                props.onCancel();
            }}
        >
            <ProForm
                onFinish={props.onSubmit}
            >
                <ProForm.Group>
                    <ProFormSelect
                        width="sm"
                        options={[
                            {
                                label: 'XGBoost(UEID聚合)',
                                value: 0,
                            },
                            {
                                label: 'XGBoost(Time聚合)',
                                value: 1,
                            },
                            {
                                label: 'Whisper(UEID聚合)',
                                value: 2
                            }
                        ]}
                        rules={[
                            {
                                required: true,
                                message: "请选择模型"
                            },
                        ]}
                        name="model"
                        label="检测模型"
                    />
                    <ProFormText
                        name="mode"
                        initialValue={0}
                        hidden
                    />
                    {/*<ProFormRadio.Group*/}
                    {/*  name="mode"*/}
                    {/*  label="任务类型"*/}
                    {/*  options={[*/}
                    {/*    {*/}
                    {/*      label: '离线',*/}
                    {/*      value: 0,*/}
                    {/*    },*/}
                    {/*    {*/}
                    {/*      label: '在线',*/}
                    {/*      value: 1,*/}
                    {/*    },*/}
                    {/*  ]}*/}
                    {/*  rules={[*/}
                    {/*    {*/}
                    {/*      required: true,*/}
                    {/*      message: "请选择任务类型"*/}
                    {/*    },*/}
                    {/*  ]}*/}
                    {/*/>*/}
                    <ProFormUploadButton
                        label="上传流量文件"
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
                </ProForm.Group>
            </ProForm>
        </Modal>
    );
};

export default AddForm;
