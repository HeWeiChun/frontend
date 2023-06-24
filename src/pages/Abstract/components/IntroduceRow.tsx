import {TinyArea, TinyColumn, Progress} from '@ant-design/plots';
import {Col, Row} from 'antd';

import numeral from 'numeral';
import {ChartCard, Field} from './Charts';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {marginBottom: 24},
};

const IntroduceRow = ({loading, visitData}: { loading: boolean; visitData: API_Abstract.introduce }) => {
  console.log(loading, visitData)
  const today = new Date();
  const pastDates = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const dateString = date.toISOString().split('T')[0];
    pastDates.push(dateString);
  }
  const n2NormalByDate = pastDates.map(date => visitData.n2Normal[date] || 0 );
  const n2AbNormalByDate = pastDates.map(date => visitData.n2Abnormal[date] || 0 );


  const n2NormalSum = Object.values(visitData.n2Normal).reduce((sum, value) => sum + value, 0);
  const n2AbNormalSum = Object.values(visitData.n2Abnormal).reduce((sum, value) => sum + value, 0);


  return (
    <Row gutter={24}>
    {/*活跃任务*/}
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="活跃任务"
        loading={loading}
        total={() => visitData?.activeTask?.offline + visitData?.activeTask?.online}
        footer={
          <div>
            在线任务: {visitData?.activeTask?.online}; 离线任务: {visitData?.activeTask?.offline}
          </div>
        }
        contentHeight={46}
      >
        <TinyColumn height={46} data={[visitData?.activeTask?.online, visitData?.activeTask?.offline]}/>
      </ChartCard>
    </Col>

    {/*已完成任务*/}
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="已完成任务"
        total={() => visitData?.activeTask?.offline + visitData?.activeTask?.online}
        footer={<Field label="今日完成任务数" value={visitData?.activeTask?.offline + visitData?.activeTask?.online}/>}
        contentHeight={46}
      >
        <TinyArea
          height={46}
          autoFit={false}
          smooth={true}
          data={[1,2]}
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
        total={() => n2AbNormalSum}
        footer={<Field label="今日异常数" value={n2AbNormalSum}/>}
        contentHeight={46}
      >
        <TinyColumn height={46} data={n2AbNormalByDate}/>
      </ChartCard>
    </Col>

    {/*N2口正常数*/}
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="N2口正常数"
        total={n2NormalSum/(n2AbNormalSum+n2NormalSum)+'%'}
        footer={
          <div style={{whiteSpace: 'nowrap', overflow: 'hidden'}}>
            今日正常数
            <span className={styles.trendText}>{n2AbNormalSum}</span>
          </div>
        }
        contentHeight={46}
      >
        <Progress
          height={46}
          percent={n2NormalSum/(n2AbNormalSum+n2NormalSum)}
          color="#13C2C2"
        />
      </ChartCard>
    </Col>
  </Row>
  );
};

export default IntroduceRow;
