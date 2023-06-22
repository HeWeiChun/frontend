import { TinyArea, TinyColumn, Progress } from '@ant-design/plots';
import { Col, Row } from 'antd';

import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import type { DataItem } from '../data.d';
import Trend from './Trend';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: DataItem[] }) => (
  <Row gutter={24}>
    {/*活跃任务*/}
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="活跃任务"
        loading={loading}
        total={() => visitData.length}
        footer={
        <div>
          在线任务: {visitData.length}; 离线任务: {visitData.length}
        </div>
      }
        contentHeight={46}
      >
        <TinyColumn height={46} data={[10, 100]} />
      </ChartCard>
    </Col>

    {/*已完成任务*/}
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="已完成任务"
        total={numeral(8846).format('0,0')}
        footer={<Field label="今日完成任务数" value={numeral(1234).format('0,0')} />}
        contentHeight={46}
      >
        <TinyArea
          height={46}
          autoFit={false}
          smooth={true}
          data={visitData.map(item => item.y)}
        />
      </ChartCard>
    </Col>

    {/*N2口异常数*/}
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="N2口异常数"
        color={'#E5EDFE'}
        total={numeral(6560).format('0,0')}
        footer={<Field label="转化率" value="60%" />}
        contentHeight={46}
      >
        <TinyColumn height={46} data={visitData.map(item => item.y)} />
      </ChartCard>
    </Col>

    {/*N2口正常数*/}
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="N2口正常数"
        total="78%"
        footer={
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <Trend flag="up" style={{ marginRight: 16 }}>
              周同比
              <span className={styles.trendText}>12%</span>
            </Trend>
            <Trend flag="down">
              日同比
              <span className={styles.trendText}>11%</span>
            </Trend>
          </div>
        }
        contentHeight={46}
      >
        <Progress
          height={46}
          percent={0.78}
          color="#13C2C2"
          forceFit
          size={8}
          marker={[
            {
              value: 0.8,
              style: {
                stroke: '#13C2C2',
              },
            },
          ]}
        />
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
