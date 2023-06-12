// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

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

// 添加任务
export async function addTask(body: API_Task.taskListItemAdd, options?: { [key: string]: any }) {
  let params = new FormData();
  params.append('taskId', body.taskId)
  params.append('createTime', body.createTime);
  params.append('mode', body.mode);
  if (body.port) {
    params.append('port', body.port);
  }
  params.append('status', body.status);
  params.append('pcapFile', body.pcap_file);
  return request<API_Task.taskListItemAdd>('/myapi/task/createTask', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 更新任务信息
export async function updateTask(body: API_Task.taskListItemUpdate, options?: { [key: string]: any }) {
  let params = new FormData();
  params.append('taskId', body.taskId)
  params.append('mode', body.mode);
  if (body.port) {
    params.append('port', body.port);
  }
  params.append('pcapFile', body.pcapFile);
  return request<API_Task.taskListItemUpdate>('/myapi/task/updateTask', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 删除任务
export async function removeTask(body: API_Task.taskListItemKeys, options?: { [key: string]: any }) {
  let params = new FormData();
  body.taskIds.forEach((taskId) => {
    params.append('taskId', taskId);
  });
  return request<Record<string, any>>('/myapi/task/deleteTask', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 开始任务
export async function startTask(body: API_Task.taskListItemKeys, options?: { [key: string]: any }) {
  let params = new FormData();
  body.taskIds.forEach((taskId) => {
    params.append('taskId', taskId);
  });
  return request<Record<string, any>>('/myapi/task/startTask', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
