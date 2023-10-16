import {task, addTask, removeTask, startTask} from '@/pages/Task/service';
import {PlusOutlined} from '@ant-design/icons';
import type {ActionType, ProColumns, ProDescriptionsItemProps} from '@ant-design/pro-components';
import {
  PageContainer,
  ProDescriptions,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import {Button, Drawer, message, Modal, Space} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import type {AddFormValueType} from '@/pages/Task/components/AddForm';
import AddForm from '@/pages/Task/components/AddForm';
import {v4 as uuidv4} from 'uuid';
import moment from 'moment';

// 创建任务
const handleAdd = async (fields: AddFormValueType) => {
  const hide = message.loading('正在添加');
  if(fields.mode == 0) {
    try {
      await addTask({
        taskId: uuidv4(),
        createTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        mode: fields.mode,
        model: fields.model,
        status: 0,
        pcap_file: fields.pcapFile[0].originFileObj,
      });
      hide();
      message.success('成功创建任务');
      return true;
    } catch (error) {
      hide();
      message.error('创建失败, 请重试!');
      return false;
    }
  }
};

// 批量删除
const handleRemove = async (selectedRows: API_Task.taskListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    const startableRows = selectedRows.filter((row) => [0, 5, 100].includes(row.status));
    if (startableRows.length === 0) {
      hide();
      message.error('选中的任务中没有可删除的任务');
      return false;
    }
    await removeTask({
      taskIds: startableRows.map((row) => row.taskId),
    });
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败, 请重试');
    return false;
  }
};

// 批量开始
const handleStart = async (selectedRows: API_Task.taskListItem[]) => {
  const hide = message.loading('正在启动');
  if (!selectedRows) return true;
  try {
    const startableRows = selectedRows.filter((row) => [0, 5, 100].includes(row.status));
    if (startableRows.length === 0) {
      hide();
      message.error('选中的任务中没有可启动的任务');
      return false;
    }
    await startTask({
      taskIds: startableRows.map((row) => row.taskId),
    });
    hide();
    message.success('启动成功');
    return true;
  } catch (error) {
    hide();
    message.error('启动失败, 请重试');
    return false;
  }
};


const TableList: React.FC = () => {
  // 新建窗口的弹窗
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  // 更新窗口的弹窗
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API_Task.taskListItem>();
  const [autoReload, setAutoReload] = useState<boolean>(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteTasks, setDeleteTasks] = useState<API_Task.taskListItem[]>([]);

  // 确认删除
  const showDeleteModal = (deleteTasks: API_Task.taskListItem[]) => {
    setDeleteModalVisible(true);
    setDeleteTasks(deleteTasks);
  };

  const handleDeleteConfirm = async () => {
    // 调用删除任务的方法
    await handleRemove(deleteTasks);
    setCurrentRow(undefined);

    if (actionRef.current) {
      actionRef.current.reload();
    } else {
      message.error('任务已经删除');
    }
    setDeleteModalVisible(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
  };

  // 自动刷新数据
  useEffect(() => {
    const timer = setInterval(() => {
      if (actionRef.current && autoReload) {
        actionRef.current.reload();
      }
    }, 1000); // 每隔 1 秒刷新一次

    return () => clearInterval(timer);
  }, [autoReload]);


  const columns: ProColumns<API_Task.taskListItem>[] = [
    {
      title: '任务ID',
      dataIndex: 'taskId',
      ellipsis: true,
    },
    {
      title: '任务创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '检测开始时间',
      dataIndex: 'startTime',
      valueType: 'dateTime',
    },
    {
      title: '检测结束时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
    },
    {
      title: '检测模型',
      dataIndex: 'model',
      renderText: (val: number) => {
        return val === 0 ? 'XGBoost(UEID聚合)' : (val === 1 ? 'XGBoost(时间片聚合)' : 'Whisper(UEID聚合)');
      },
    },
    {
      title: '检测文件名',
      dataIndex: 'pcapPath',
      valueType: 'textarea',
    },
    {
      title: '正常流量数',
      dataIndex: 'normal',
      valueType: 'textarea',
      hideInTable: true,
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
      filters: true,
      onFilter: true,
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
          text: '待解析',
          status: 'Processing',
        },
        2: {
          text: '解析中',
          status: 'Processing',
        },
        3: {
          text: '待检测',
          status: 'Processing',
        },
        4: {
          text: '检测中',
          status: 'Processing',
        },
        5: {
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
        const canRestart = record.status === 5 || record.status === 100;
        const canStart: boolean = record.status === 0;
        const canDelete: boolean = record.status === 0 || record.status === 5 || record.status === 100;
        return [
          canRestart && (
            <a
              key="restartTask"
              onClick={async () => {
                await handleStart([record]);
                setCurrentRow(record);
                if (actionRef.current) {
                  actionRef.current.reload();
                  setAutoReload(true);
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
                await handleStart([record]);
                setCurrentRow(record);
                if (actionRef.current) {
                  actionRef.current.reload();
                  setAutoReload(true);
                } else {
                  message.error('任务已经启动');
                }
              }}
            >
              开始任务
            </a>
          ),
          canDelete && (
            <a
              key="deleteTask"
              onClick={() => {
                showDeleteModal([record]);
              }}
            >
              删除任务
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
        rowKey="taskId"
        search={false}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined/> 新建
          </Button>,
        ]}

        request={async (params: {
          pageSize?: number;
          current?: number;
        },) => {
          const msg = await task({
            current: params.current,
            pageSize: params.pageSize,
          });
          if (msg.success && msg.data) {
            setAutoReload(msg.data.some((item: { status: number; }) => [1, 2, 3, 4].includes(item.status)));
          } else
            setAutoReload(true);
          return {
            data: msg.data,
            success: msg.success,
          };
        }}

        columns={columns}
        rowSelection={{}}
        tableAlertRender={({
                             selectedRowKeys,
                             onCleanSelected,
                           }) => {
          return (
            <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{marginInlineStart: 8}} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
            </Space>
          );
        }}
        tableAlertOptionRender={({selectedRows, onCleanSelected}) => {
          return (
            <Space size={16}>
              <a
                onClick={() => {
                  showDeleteModal(selectedRows);
                }}
              >
                批量删除
              </a>
              <a
                onClick={async () => {
                  await handleStart(selectedRows);

                  if (actionRef.current) {
                    actionRef.current.reload();
                    onCleanSelected();
                  } else {
                    message.error('任务已经启动');
                  }
                }}
              >
                批量启动
              </a>
            </Space>
          );
        }}
      />
      <Modal
        title="确认删除"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        {deleteTasks.length === 1 ? (
          `是否删除任务 ${deleteTasks[0].taskId}?`
        ) : (
          `是否删除 ${deleteTasks.length} 个任务?`
        )}
      </Modal>
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
      />
      {/*<UpdateForm*/}
      {/*  onSubmit={async (value) => {*/}
      {/*    const success = await handleUpdate(value);*/}
      {/*    if (success) {*/}
      {/*      handleUpdateModalOpen(false);*/}
      {/*      setCurrentRow(undefined);*/}
      {/*      if (actionRef.current) {*/}
      {/*        actionRef.current.reload();*/}
      {/*      }*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  onCancel={() => {*/}
      {/*    handleUpdateModalOpen(false);*/}
      {/*    if (!showDetail) {*/}
      {/*      setCurrentRow(undefined);*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  updateModalOpen={updateModalOpen}*/}
      {/*  values={currentRow || {}}*/}
      {/*/>*/}

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
            <ProDescriptions.Item label="任务ID" dataIndex="taskId"/>
            <ProDescriptions.Item label="任务创建时间" dataIndex="createTime" valueType="dateTime"/>
            <ProDescriptions.Item label="任务开始时间" dataIndex="startTime" valueType="dateTime"/>
            <ProDescriptions.Item label="任务结束时间" dataIndex="endTime" valueType="dateTime"/>
            <ProDescriptions.Item label="任务类型" dataIndex="mode" valueType="select"/>
            <ProDescriptions.Item label="实时检测端口" dataIndex="port" valueType="textarea"/>
            <ProDescriptions.Item label="离线检测文件名" dataIndex="pcapPath" valueType="textarea"/>
            <ProDescriptions.Item label="正常流量数" dataIndex="normal" valueType="textarea"/>
            <ProDescriptions.Item label="异常流量数" dataIndex="abnormal" valueType="textarea"/>
            <ProDescriptions.Item label="总流量数" dataIndex="total" valueType="textarea"/>
            <ProDescriptions.Item label="状态" dataIndex="status" valueType="select"/>
          </ProDescriptions>
        )}
      </Drawer>
    </PageContainer>
  );
};
export default TableList;
