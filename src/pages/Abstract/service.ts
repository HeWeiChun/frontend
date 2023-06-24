import { request } from '@umijs/max'

// 获取任务列表
export async function abstractData() {
  return request<API_Abstract.abstract>('/myapi/abstract/getAllAbstract', {
    method: 'GET',
  });
}
