declare namespace API_Abstract {
  // 分页
  type abnormalParams = {
    current?: number;
    pageSize?: number;
  };

  // 活跃任务
  type activeTask = {
    online: number;
    offline: number;
  }

  // 已完成任务
  type completedTask = {
    completeTask: completedTaskItem[];
  }
  type completedTaskItem = {
    dateByDay: string;
    completeTaskByDay: number;
  }

  // N2口异常数
  type n2Abnormal = {
    n2Abnormal: n2AbnormalItem[];
  }

  type n2AbnormalItem = {
    dateByDay: string;
    n2AbnormalByDay: number;
  }

  // N2口正常数
  type n2Normal = {
    n2Normal: n2NormalItem[];
  }
  type n2NormalItem = {
    dateByDay: string;
    n2NormalByDay: number;
  }
  // 介绍栏
  type introduce = {
    activeTask: activeTask;
    completedTask: completedTask;
    n2Abnormal: n2Abnormal;
    n2Normal: n2Normal;
  }

  // 异常流量类别占比(二分类)
  type abnormalFlowBinary = {
    normal: number;
    abnormal: number;
  }

  // 异常流量类别占比(多分类)
  type abnormalFlowMulti = {
    normal: number;
    abnormal: number;
  }

  // 异常事件
  type abnormalEvent = {
    abnormalEvent: API_Detail.ueFlowListItem[];
  }
  // 概况页
  type abstract = {
    introduce: introduce;
    abnormalFlowBinary: abnormalFlowBinary;
    abnormalFlowMulti: abnormalFlowMulti;
    abnormalEvent: abnormalEvent;
  }
}
