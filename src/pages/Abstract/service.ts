import { request } from '@umijs/max'
import type { AnalysisData } from './data';

export async function fakeChartData(): Promise<{ data: AnalysisData }> {
  return request('/myapi/abstract/getAllAbstract');
}

export async function getAllTask(): Promise<{ data: AnalysisData }> {
  return request('/myapi/ueflow/getAllUEFlow');
}

// 获取任务列表
export async function task(params: API_Task.taskParams, options?: { [key: string]: any }) {
  return request<API_Task.taskList>('/myapi/task/getAllTask', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
