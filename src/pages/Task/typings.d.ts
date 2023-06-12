declare namespace API_Task {
  type taskParams = {
    current?: number;
    pageSize?: number;
  };

  type taskList = {
    data?: taskListItem[];
    total?: number;
    success?: boolean;
  }

  // 获取所有任务
  type taskListItem = {
    taskId: string;
    createTime: string;
    startTime?: string;
    endTime?: string;
    mode: number;
    port?: number;
    pcapPath?: string;
    normal?: number;
    abnormal?: number;
    total?: number;
    status: number;
  }

  // 添加任务
  type taskListItemAdd = {
    taskId: string;
    createTime: string;
    mode: number;
    port?: number;
    status: number;
    pcap_file?: File;
  }

  // 启动任务前修改任务
  type taskListItemUpdate = {
    taskId: string;
    mode: number;
    port?: number;
    pcap_file?: File;
  }

  // 开始任务, 修改任务状态
  type taskListItemStart = {
    taskId: string;
  }

  // 删除任务
  type taskListItemDelete = {
    taskId: string;
  }
}
