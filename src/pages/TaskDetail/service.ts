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
export async function packet(params: API_Detail.packetParams, options?: { [key: string]: any }) {
  return request<API_Detail.packetList>('/myapi/packet/getAllPacket', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
// 获取指定taskid的流
export async function flowByTask(body: API_Detail.flowListByTask) {
  return request<API_Detail.ueFlowList>(`/myapi/ueflow/getUEFlowByTaskId?taskId=${body.TaskID}`, {
    method: 'GET',
  });
}

// 获取指定flowid的数据包
export async function packetByueid(body: API_Detail.packetListByFlow) {
  return request<API_Detail.packetList>(`/myapi/packet/getPacketByFlowId?flowId=${body.FlowId}`, {
    method: 'GET',
  });
}
