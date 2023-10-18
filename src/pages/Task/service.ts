// @ts-ignore
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
  params.append('taskId', body.task_id)
  params.append('createTime', body.create_time)
  params.append('mode', body.mode);
  params.append('model', body.model)
  params.append('status', body.status);
  params.append('pcapFile', body.pcap_file);
  return request<API_Task.taskListItemAdd>('/myapi/task/createTask', {
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

// 停止任务
export async function stopTask(body: API_Task.taskListItemKeys, options?: { [key: string]: any }) {
  let params = new FormData();
  body.taskIds.forEach((taskId) => {
    params.append('taskId', taskId);
  });
  return request<Record<string, any>>('/myapi/task/stopTask', {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}
