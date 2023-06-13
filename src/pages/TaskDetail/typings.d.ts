declare namespace API_Packet {
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
    packetId: number;
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


  // 获取特定任务的所有包
  type packetListByPacketId = {
    PacketId: number;
  }
}
