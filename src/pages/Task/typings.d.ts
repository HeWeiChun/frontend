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
    pcapPath?: string;
    normal?: number;
    abnormal?: number;
    total?: number;
    status: number;
    model: number;
  }

  // 添加任务
  type taskListItemAdd = {
    taskId: string;
    createTime: string;
    mode: number;
    status: number;
    model: number;
    pcap_file: File;
  }

  // 多个任务
  type taskListItemKeys = {
    taskIds: string[];
  }
}
