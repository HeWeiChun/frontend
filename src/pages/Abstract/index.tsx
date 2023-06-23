import type {FC} from 'react';
import {Suspense, useEffect, useState} from 'react';
import {Col, Row} from 'antd';
import {GridContent} from '@ant-design/pro-components';
import type {RadioChangeEvent} from 'antd/es/radio';
import type {RangePickerProps} from 'antd/es/date-picker/generatePicker';
import type moment from 'moment';

import IntroduceRow from './components/IntroduceRow';
import TopSearch from './components/TopSearch';
import ProportionSales from './components/ProportionSales';
import {useRequest} from '@umijs/max'

import {fakeChartData} from './service';
import PageLoading from './components/PageLoading';
import type {TimeType} from './components/SalesCard';
import {getTimeDistance} from './utils/utils';
import type {AnalysisData} from './data.d';
import styles from './style.less';

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

type AnalysisProps = {
  dashboardAndanalysis: AnalysisData;
  loading: boolean;
};

type SalesType = 'all' | 'online' | 'stores';


const Analysis: FC<AnalysisProps> = () => {
  const [salesType, setSalesType] = useState<SalesType>('all');
  const [currentTabKey, setCurrentTabKey] = useState<string>('');
  const [rangePickerValue, setRangePickerValue] = useState<RangePickerValue>(
    getTimeDistance('year'),
  );

  const { loading, data } = useRequest(fakeChartData,{
    pollingInterval: 5000,
    pollingWhenHidden: false,
    loadingDelay: 300
  });

  const selectDate = (type: TimeType) => {
    setRangePickerValue(getTimeDistance(type));
  };

  const handleRangePickerChange = (value: RangePickerValue) => {
    setRangePickerValue(value);
  };

  const isActive = (type: TimeType) => {
    if (!rangePickerValue) {
      return '';
    }
    const value = getTimeDistance(type);
    if (!value) {
      return '';
    }
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0] as moment.Moment, 'day') &&
      rangePickerValue[1].isSame(value[1] as moment.Moment, 'day')
    ) {
      return styles.currentDate;
    }
    return '';
  };

  let salesPieData;
  if (salesType === 'all') {
    salesPieData = data?.salesTypeData;
  } else {
    salesPieData = salesType === 'online' ? data?.salesTypeDataOnline : data?.salesTypeDataOffline;
  }

  const handleChangeSalesType = (e: RadioChangeEvent) => {
    setSalesType(e.target.value);
  };

  const handleTabChange = (key: string) => {
    setCurrentTabKey(key);
  };

  const activeKey = currentTabKey || (data?.offlineData[0] && data?.offlineData[0].name) || '';

  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading/>}>
          <IntroduceRow loading={loading} visitData={data?.visitData || []}/>
        </Suspense>


        <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          {/*异常流量类别占比*/}
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
          </Col>

          {/*异常事件*/}
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch
                loading={loading}
                visitData2={data?.visitData2 || []}
                searchData={data?.searchData || []}
              />
            </Suspense>
          </Col>
        </Row>

      </>
    </GridContent>
  );
};

export default Analysis;
