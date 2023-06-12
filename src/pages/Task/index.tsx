import { task, addTask, updateTask, removeTask, startTask } from './service';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { UpdateFormValueType } from './components/UpdateForm';
import type { AddFormValueType } from './components/AddForm';
import UpdateForm from './components/UpdateForm';
import AddForm from './components/AddForm';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

// 创建任务
const handleAdd = async (fields: AddFormValueType) => {
  const hide = message.loading('正在添加');
  let file;
  if (fields.pcapFile) {
    file = fields.pcapFile[0].originFileObj;
  } else file = null;
  try {
    await addTask({
      taskId: uuidv4(),
      createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      mode: fields.mode,
      port: fields.port,
      status: 0,
      pcapFile: file,
    });
    hide();
    message.success('成功创建任务');
    return true;
  } catch (error) {
    hide();
    message.error('创建失败, 请重试!');
    return false;
  }
};

// 更新任务
const handleUpdate = async (fields: UpdateFormValueType) => {
  const hide = message.loading('正在更新');
  let file;
  if (fields.pcapFile) {
    file = fields.pcapFile[0].originFileObj;
  } else file = null;
  try {
    await updateTask({
      taskId: fields.taskId,
      mode: fields.mode,
      port: fields.port,
      pcapFile: file,
    });
    hide();
    message.success('成功更新任务信息');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败, 请重试!');
    return false;
  }
};

// 删除节点
const handleRemove = async (taskId: string) => {
  const hide = message.loading('正在删除');
  try {
    await removeTask({
      taskId: taskId,
    });
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败');
    return false;
  }
};
//开始任务
const handleStart = async (taskId: string) => {
  const hide = message.loading('正在启动');
  try {
    await startTask({
      taskId: taskId,
    });
    hide();
    message.success('启动成功');
    return true;
  } catch (error) {
    hide();
    message.error('启动失败');
    return false;
  }
};
const TableList: React.FC = () => {
  // 新建窗口的弹窗
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  // 分布更新窗口的弹窗
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API_Task.taskListItem>();
  const [selectedRowsState, setSelectedRows] = useState<API_Task.taskListItem[]>([]);
  const columns: ProColumns<API_Task.taskListItem>[] = [
    {
      title: '任务ID',
      dataIndex: 'taskId',
      tip: '点击查看任务详情',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '任务创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '任务开始时间',
      dataIndex: 'startTime',
      valueType: 'dateTime',
    },
    {
      title: '任务结束时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
    },
    {
      title: '任务类型',
      dataIndex: 'mode',
      renderText: (val: number) => {
        return val === 1 ? '实时' : '离线';
      },
    },
    {
      title: '实时检测端口',
      dataIndex: 'port',
      valueType: 'textarea',
    },
    {
      title: '离线检测文件名',
      dataIndex: 'pcapPath',
      valueType: 'textarea',
    },
    {
      title: '正常流量数',
      dataIndex: 'normal',
      valueType: 'textarea',
    },
    {
      title: '异常流量数',
      dataIndex: 'abnormal',
      valueType: 'textarea',
    },
    {
      title: '总流量数',
      dataIndex: 'total',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        100: {
          text: '错误',
          status: 'Error',
        },
        0: {
          text: '未开始',
          status: 'Default',
        },
        1: {
          text: '待开始',
          status: 'Processing',
        },
        2: {
          text: '正在检测',
          status: 'Processing',
        },
        3: {
          text: '检测完成',
          status: 'Success',
        },
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        const canModify = record.status === 0 || record.status === 100;
        const canRestart = record.status === 3 || record.status === 100;
        const canStart: boolean = record.status === 0;
        return [
          canModify && (
            <a
              key="config"
              onClick={() => {
                handleUpdateModalOpen(true);
                setCurrentRow(record);
              }}
            >
              修改
            </a>
          ),
          canRestart && (
            <a
              key="restartTask"
              onClick={async () => {
                await handleStart(record.taskId);
                setCurrentRow(record);
                if (actionRef.current) {
                  actionRef.current.reload();
                } else {
                  message.error('任务已经启动');
                }
              }}
            >
              重新开始
            </a>
          ),
          canStart && (
            <a
              key="startTask"
              onClick={async () => {
                await handleStart(record.taskId);
                setCurrentRow(record);
                if (actionRef.current) {
                  actionRef.current.reload();
                } else {
                  message.error('任务已经启动');
                }
              }}
            >
              开始任务
            </a>
          )
        ];
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable<API_Task.taskListItem, API.PageParams>
        headerTitle="任务列表"
        actionRef={actionRef}
        rowKey="key"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={task}
        columns={columns}
        rowSelection={false}
      />
      <AddForm
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        addModalOpen={createModalOpen}
        values={currentRow || {}}
      />
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.taskId && (
          <ProDescriptions<API_Task.taskListItem>
            column={2}
            title={currentRow?.taskId}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.taskId,
            }}
            columns={columns as ProDescriptionsItemProps<API_Task.taskListItem>[]}
          >
            <ProDescriptions.Item label="任务ID" dataIndex="taskId" />
            <ProDescriptions.Item label="任务创建时间" dataIndex="createTime" valueType="dateTime" />
            <ProDescriptions.Item label="任务开始时间" dataIndex="startTime" valueType="dateTime" />
            <ProDescriptions.Item label="任务结束时间" dataIndex="endTime" valueType="dateTime" />
            <ProDescriptions.Item label="任务类型" dataIndex="mode" valueType="select" />
            <ProDescriptions.Item label="实时检测端口" dataIndex="port" valueType="textarea" />
            <ProDescriptions.Item label="离线检测文件名" dataIndex="pcapPath" valueType="textarea" />
            <ProDescriptions.Item label="正常流量数" dataIndex="normal" valueType="textarea" />
            <ProDescriptions.Item label="异常流量数" dataIndex="abnormal" valueType="textarea" />
            <ProDescriptions.Item label="总流量数" dataIndex="total" valueType="textarea" />
            <ProDescriptions.Item label="状态" dataIndex="status" valueType="select" />
          </ProDescriptions>
        )}
      </Drawer>
    </PageContainer>
  );
};
export default TableList;
