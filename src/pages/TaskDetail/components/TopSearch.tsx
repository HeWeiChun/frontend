import { InfoCircleOutlined } from '@ant-design/icons';
import { Card, Col, Row, Table, Tooltip } from 'antd';
import { TinyArea } from '@ant-design/plots';
import React from 'react';
import numeral from 'numeral';
import type { DataItem } from '../data.d';

import NumberInfo from './NumberInfo';
import styles from '../style.less';

const columns = [
  {
    title: '异常流',
    dataIndex: 'flowId',
    valueType: 'textarea',
  },
  {
    title: '归属任务',
    dataIndex: 'taskID',
    valueType: 'textarea',
  },
  {
    title: '异常时间',
    dataIndex: 'latestTime',
    valueType: 'dateTime',
  },
];

const TopSearch = ({loading, abnormalEvent}: { loading: boolean; abnormalEvent: API_Detail.ueFlowListItem[]; }) => {
  return (
    <Card
      loading={loading}
      bordered={false}
      title="异常事件"
      style={{
        height: '100%',
      }}
    >
      {/*<Row gutter={68}>*/}

      {/*  <Col sm={12} xs={24} style={{ marginBottom: 24 }}>*/}
      {/*    <NumberInfo*/}
      {/*      subTitle={*/}
      {/*        <span>*/}
      {/*          离线检测异常率*/}
      {/*          <Tooltip title="指标说明">*/}
      {/*            <InfoCircleOutlined style={{ marginLeft: 8 }} />*/}
      {/*          </Tooltip>*/}
      {/*        </span>*/}
      {/*      }*/}
      {/*      gap={8}*/}
      {/*      total={numeral(12321).format('0,0')}*/}
      {/*      status="up"*/}
      {/*      subTotal={17.1}*/}
      {/*    />*/}
      {/*    <TinyArea height={45} smooth data={visitData2.map(item => item.y)} />*/}
      {/*  </Col>*/}

      {/*  <Col sm={12} xs={24} style={{ marginBottom: 24 }}>*/}
      {/*    <NumberInfo*/}
      {/*      subTitle={*/}
      {/*        <span>*/}
      {/*          在线检测异常率*/}
      {/*          <Tooltip title="指标说明">*/}
      {/*            <InfoCircleOutlined style={{ marginLeft: 8 }} />*/}
      {/*          </Tooltip>*/}
      {/*        </span>*/}
      {/*      }*/}
      {/*      total={2.7}*/}
      {/*      status="down"*/}
      {/*      subTotal={26.2}*/}
      {/*      gap={8}*/}
      {/*    />*/}
      {/*    <TinyArea height={45} smooth data={visitData2.map(item => item.y)} />*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      <Table<any>
        rowKey={(record) => record.flowId}
        size="small"
        columns={columns}
        dataSource={abnormalEvent}
        pagination={{
          style: {marginBottom: 0},
          pageSize: 5,
          showSizeChanger: false
        }}
      />
    </Card>
  );
}

export default TopSearch;
