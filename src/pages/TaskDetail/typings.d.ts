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
    flowUEID: number;
    flowTimeID: number;
    statusPacket: number;
  }

  type ueFlowList = {
    data?: ueFlowListItem[];
    total?: number;
    success?: boolean;
  }

  // 获取所有数据包
  type ueFlowListItem = {
    FlowId: number;
    RanUeNgapId: number;
    TotalNum: number;
    StartSecond: number;
    EndSecond: number;
    BeginTime: string;
    LastTime: string;
    VerificationTag: number;
    SrcIP: string;
    DstIP: string;
    StatusFlow: number;
    TaskID: string;
  }
  // 获取特定流的所有包
  type packetListByFlow = {
    FlowId: number;
  }
  // 获取特定任务的所有流
  type flowListByTask = {
    TaskID: string;
  }
}
