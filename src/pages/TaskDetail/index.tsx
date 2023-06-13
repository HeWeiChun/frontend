import React, {useState, useRef} from 'react';
import {Col, Divider, message, Row, Space, Spin} from 'antd';
import {
  GridContent,
  ProTable,
  ActionType,
  ProColumns,
} from '@ant-design/pro-components';
import {useParams} from '@umijs/max';
import {task, packet} from './service';


const TaskDetailPage: React.FC = () => {
  const {taskId} = useParams(); // 从路由参数中获取指定的任务ID
  const actionRef = useRef<ActionType>();

  const [searchValue, setSearchValue] = useState(''); // 搜索框的值
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [allTaskIds, setAllTaskIds] = useState([]); // 所有任务ID列表


  const taskid_columns: ProColumns<API_Task.taskListItem>[] = [
    {
      title: '任务ID',
      dataIndex: 'taskId',
      valueType: 'textarea',
    }
  ]

  const packet_columns: ProColumns<API_Packet.packetListItem>[] = [
    {
      title: '包ID',
      dataIndex: 'packetId',
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
      title: 'UE_ID',
      dataIndex: 'ranUeNgapId',
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
    },
    {
      title: '时间流ID',
      dataIndex: 'flowTimeID',
      valueType: 'textarea',
    },
    {
      title: '包状态',
      dataIndex: 'statusPacket',
      valueType: 'textarea',
    }
  ]

  return (
    <GridContent>
      <Row gutter={16}>

        <Col span={4}>
          {/* 左侧菜单 */}
          <ProTable<API_Task.taskListItem, API_Task.taskParams>
            columns={taskid_columns}
            rowKey="taskId"
            rowSelection={{
              type: "radio", onChange: (selectedRowKeys, selectedRows) => {
                if (selectedRows.length > 0) {
                  setSelectedTaskId(selectedRows[0].taskId);
                } else {
                  setSelectedTaskId('');
                }
              }
            }}
            tableAlertRender={({
                                 selectedRowKeys,
                                 onCleanSelected,
                               }) => {
              return (
                <Space size={24}>
                  <span>
                    当前选择{selectedRowKeys[0]}
                    <a style={{marginInlineStart: 8}} onClick={onCleanSelected}>
                      取消选择
                    </a>
                  </span>
                </Space>
              );
            }}
            tableAlertOptionRender={false}
            search={{
              optionRender: false,
              collapsed: false,
            }}
            request={task}
          />
        </Col>
        {/* 任务详细信息 */}
        <Col span={20}>
          {/* 显示任务详细信息 */}
          <Divider>任务概况</Divider>
          {selectedTaskId}

          {selectedTaskId ? (
            <>
              <Divider>安全事件</Divider>
              <ProTable<API_Packet.packetListItem, API_Packet.packetParams>
                headerTitle="数据包列表"
                actionRef={actionRef}
                columns={packet_columns}
                rowKey="packetId"
                rowSelection={false}
                search={false}
                request={packet}
                expandable={{
                  expandedRowRender: (record) => (
                    <ProTable<API_Packet.packetListItem, API_Packet.packetParams>
                      headerTitle="数据包列表"
                      actionRef={actionRef}
                      columns={packet_columns}
                      rowKey="packetId"
                      rowSelection={false}
                      search={false}
                      request={packet}
                    />
                  ),
                  rowExpandable: () => true,
                }}
              /></>
          ) : (
            <div style={{textAlign: 'center'}}>
              请选择任务ID
            </div>
          )}
        </Col>
      </Row>
    </GridContent>
  )
    ;
};

export default TaskDetailPage;
