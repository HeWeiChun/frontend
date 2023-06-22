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
    title: '异常事件',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '异常时间',
    dataIndex: 'keyword',
    key: 'keyword',
    render: (text: React.ReactNode) => {return text},
  },
  {
    title: '检测类型',
    dataIndex: 'count',
    key: 'count',
    className: styles.alignRight,
  },
  {
    title: '检测模型',
    dataIndex: 'range',
    key: 'range',
    render: (text: React.ReactNode, record: { status: number }) => (
        <span style={{ marginRight: 4 }}>{text}%</span>
    ),
  },
];

const TopSearch = ({
  loading,
  visitData2,
  searchData,
}: {
  loading: boolean;
  visitData2: DataItem[];
  searchData: DataItem[];
}) => (
  <Card
    loading={loading}
    bordered={false}
    title="异常事件"
    style={{
      height: '100%',
    }}
  >
    <Row gutter={68}>

      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              离线检测异常率
              <Tooltip title="指标说明">
                <InfoCircleOutlined style={{ marginLeft: 8 }} />
              </Tooltip>
            </span>
          }
          gap={8}
          total={numeral(12321).format('0,0')}
          status="up"
          subTotal={17.1}
        />
        <TinyArea height={45} smooth data={visitData2.map(item => item.y)} />
      </Col>

      <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
        <NumberInfo
          subTitle={
            <span>
              在线检测异常率
              <Tooltip title="指标说明">
                <InfoCircleOutlined style={{ marginLeft: 8 }} />
              </Tooltip>
            </span>
          }
          total={2.7}
          status="down"
          subTotal={26.2}
          gap={8}
        />
        <TinyArea height={45} smooth data={visitData2.map(item => item.y)} />
      </Col>
    </Row>
    <Table<any>
      rowKey={(record) => record.index}
      size="small"
      columns={columns}
      dataSource={searchData}
      pagination={{
        style: { marginBottom: 0 },
        pageSize: 5,
      }}
    />
  </Card>
);

export default TopSearch;
