// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import {AnalysisData} from "@/pages/analysis/data";

// 获取所有任务ID
export async function task(params: API_Task.taskParams, options?: { [key: string]: any }) {
  return request<API_Task.taskList>('/myapi/task/getAllTask', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return request('/api/fake_analysis_chart_data');
}

// 获取所有流量包
export async function packet(params: API_Packet.packetParams, options?: { [key: string]: any }) {
  return request<API_Packet.packetList>('/myapi/packet/getAllPacket', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
