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
}
