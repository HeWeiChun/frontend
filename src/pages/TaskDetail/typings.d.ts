declare namespace API_Detail {
  type packetParams = {
    current?: number;
    pageSize?: number;
  };

  type packetList = {
    data?: packetListItem[];
    total?: number;
    success?: boolean;
  }

  // 获取所有数据包
  type packetListItem = {
    ngapType: string;
    ngapProcedureCode: string;
    ranUeNgapId:number;
    packetLen: number;
    arriveTimeUs: number;
    arriveTime: string;
    timeInterval: number;
    verificationTag: number;
    srcIP: string;
    dstIP: string;
    dirSeq: number;
    flowUEID: string;
    flowTimeID: string;
    statusPacket: number;
  }

  type ueFlowList = {
    data?: ueFlowListItem[];
    total?: number;
    success?: boolean;
  }

  // 获取所有数据包
  type ueFlowListItem = {
    flowId: string;
    ranUeNgapId: number;
    totalNum: number;
    startSecond: number;
    endSecond: number;
    beginTime: string;
    lastTime: string;
    verificationTag: number;
    srcIP: string;
    dstIP: string;
    statusFlow: number;
    taskID: string;
  }
  // 获取特定流的所有包
  type packetListByFlow = {
    FlowId: string;
  }
  // 获取特定任务的所有流
  type flowListByTask = {
    TaskID: string;
  }
  // 介绍栏
  type abstractList = {
    code: number;
    message: string;
    type: string;
    success: boolean;
    data: API_Detail.abstract;
  }
  // 分页
  type abnormalParams = {
    current?: number;
    pageSize?: number;
  };


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

  // 概况页
  type abstract = {
    activeDetectedFlows: number;
    activePendingFlows: number;
    abnormalFlowBinary: abnormalFlowBinary;
    abnormalFlowMulti: abnormalFlowMulti;
  }
}
