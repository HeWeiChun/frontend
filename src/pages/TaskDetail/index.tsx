import React, {useState, useRef} from 'react';
import {PageLoading} from "@ant-design/pro-components";
import {Col, Divider, message, Row, Space, Spin} from 'antd';
import {
  GridContent,
  ProTable,
  ActionType,
  ProColumns,
} from '@ant-design/pro-components';
import {useParams} from '@umijs/max';
import {task, packet,flowByTask,packetByueid} from './service';


const TaskDetailPage: React.FC = () => {
  const {taskId} = useParams(); // 从路由参数中获取指定的任务ID
  const actionRef = useRef<ActionType>();
  // 为每个表项维护展开状态的状态数组
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  // 点击表项时切换展开状态
  const handleRowExpand = (record: API_Detail.ueFlowListItem, expands:boolean) => {
    const flowId = record.flowId;
    console.log(flowId, expands);
    if (expandedRows.includes(flowId)) {
      // 如果当前表项已展开，则关闭
      setExpandedRows(expandedRows.filter((rowId) => rowId !== flowId));
    } else {
      // 如果当前表项未展开，则展开
      setExpandedRows([...expandedRows, flowId]);
    }
  };

  // 判断表项是否展开
  const isRowExpanded = (record: API_Detail.ueFlowListItem) => {
    return expandedRows.includes(record.flowId);
  };


  const [searchValue, setSearchValue] = useState(''); // 搜索框的值
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [allTaskIds, setAllTaskIds] = useState([]); // 所有任务ID列表

  const taskid_columns: ProColumns<API_Task.taskListItem>[] = [
    {
      title: '任务ID',
      dataIndex: 'taskId',
      valueType: 'textarea',
    },
  ]
  const taskid_columns_detail: ProColumns<API_Task.taskListItem>[] = [
    {
      title: '任务ID',
      dataIndex: 'taskId',
      valueType: 'textarea',
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
    }
  ]

  const ueflow_columns: ProColumns<API_Detail.ueFlowListItem>[] = [
    {
      title: '流ID',
      dataIndex: 'flowId',
      valueType: 'textarea',
    },
    {
      title: 'UEID',
      dataIndex: 'ranUeNgapId',
      valueType: 'textarea',
    },
    {
      title: '数据包数',
      dataIndex: 'totalNum',
      valueType: 'textarea',
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      valueType: 'dateTime',
    },
    {
      title: '结束时间',
      dataIndex: 'latestTime',
      valueType: 'dateTime',
    },
    {
      title: '流状态',
      dataIndex: 'statusFlow',
      valueEnum: {
        100: {
          text: '正常',
          status: 'Success',
        },
        200: {
          text: '异常',
          status: 'Error',
        },
        0: {
          text: '待解析',
          status: 'Default',
        },
      },
    },
    {
      title: '任务ID',
      dataIndex: 'taskID',
      valueType: 'textarea',
    }
  ]


  const packet_columns: ProColumns<API_Detail.packetListItem>[] = [
    {
      title: 'UE_ID',
      dataIndex: 'ranUeNgapId',
      valueType: 'textarea',
    },
    {
      title: 'NGAP类型',
      dataIndex: 'ngapType',
      valueType: 'textarea',
    },
    {
      title: 'NGAP消息码',
      dataIndex: 'ngapProcedureCode',
      valueType: 'textarea',
    },
    {
      title: '包长度',
      dataIndex: 'packetLen',
      valueType: 'textarea',
    },
    {
      title: '到达时间US',
      dataIndex: 'arriveTimeUs',
      valueType: 'textarea',
      hideInTable: true,
    },
    {
      title: '到达时间',
      dataIndex: 'arriveTime',
      valueType: 'dateTime',
    },
    {
      title: '时间间隔',
      dataIndex: 'timeInterval',
      valueType: 'textarea',
    },
    {
      title: '校验码',
      dataIndex: 'verificationTag',
      valueType: 'textarea',
    },
    {
      title: '源IP',
      dataIndex: 'srcIP',
      valueType: 'textarea',
    },
    {
      title: '目的IP',
      dataIndex: 'dstIP',
      valueType: 'textarea',
    },
    {
      title: '方向',
      dataIndex: 'dirSeq',
      valueType: 'textarea',
    },
    {
      title: 'UEID流ID',
      dataIndex: 'flowUEID',
      valueType: 'textarea',
      hideInTable: true,
    },
    {
      title: '时间流ID',
      dataIndex: 'flowTimeID',
      valueType: 'textarea',
      hideInTable: true,
    },
    {
      title: '包状态',
      dataIndex: 'statusPacket',
      valueType: 'textarea',
      hideInTable: true,
    }
  ]

  return (
    <GridContent>
      <Row gutter={16}>

        <Col span={selectedTaskId ? (4) : (24)}>
          {/* 左侧菜单 */}
          <ProTable<API_Task.taskListItem, API_Task.taskParams>
            columns={selectedTaskId ? (taskid_columns) : (taskid_columns_detail)}
            rowKey="taskId"
            rowSelection={{
              type: "radio", onChange: (selectedRowKeys, selectedRows) => {
                if (selectedRows.length > 0) {
                  setSelectedTaskId(selectedRows[0].taskId);
                } else {
                  setSelectedTaskId('');
                }
                if (actionRef.current) {
                  actionRef.current.reload();
                }
                setExpandedRows([]);
              },
              alwaysShowAlert: true,
            }}
            tableAlertRender={({
                                 selectedRowKeys,
                                 onCleanSelected,
                               }) => {
              return (
                <Space size={24}>
                  <span>
                    {selectedRowKeys.length > 0 ? ("当前选择" + selectedRowKeys[0]) : ("请选择要查看的任务")}
                    <a style={{marginInlineStart: 8}} onClick={onCleanSelected}>
                      {selectedRowKeys.length > 0 ? ("取消选择") : ("")}
                    </a>
                  </span>
                </Space>
              );
            }}
            tableAlertOptionRender={false}
            search={false}
            request={task}
          />
        </Col>
        {/* 任务详细信息 */}
        <Col span={20}>
          {/* 显示任务详细信息 */}


          {selectedTaskId ? (
            <>
              {/*<Divider>任务概况</Divider>*/}
              {/*{selectedTaskId}*/}
              <Divider>安全事件</Divider>
              <ProTable<API_Detail.ueFlowListItem, API_Detail.packetParams>
                headerTitle="异常流列表"
                actionRef={actionRef}
                columns={ueflow_columns}
                rowKey="flowId"
                rowSelection={false}
                search={false}
                request={async (params: {
                  pageSize?: number;
                  current?: number;
                },) => {
                  const msg = await flowByTask({
                    TaskID: selectedTaskId,
                  });
                  return {
                    data: msg.data,
                    success: msg.success,
                  };
                }}
                expandable={{
                  expandedRowRender: (record) => (
                    <ProTable<API_Detail.packetListItem, API_Detail.packetParams>
                      headerTitle={false}
                      options={false}
                      actionRef={actionRef}
                      columns={packet_columns}
                      rowSelection={false}
                      search={false}
                      request={async (params: {
                        pageSize?: number;
                        current?: number;
                      },) => {
                        const msg = await packetByueid({
                          FlowId: record.flowId,
                        });

                        return {
                          data: msg.data,
                          success: msg.success,
                        };
                      }}
                    />
                  ),
                  // rowExpandable: () => true,
                  // expandedRowKeys: expandedRows,
                  onExpand: (expanded, record) => handleRowExpand(record, expanded),
                }}
              /></>
          ) : (
            <div style={{textAlign: 'center'}}>
            </div>
          )}
        </Col>
      </Row>
    </GridContent>
  )
    ;
};

export default TaskDetailPage;
