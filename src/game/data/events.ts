import type { StationEvent } from "../types";

export const events: Record<string, StationEvent> = {
  emptyCarriage: {
    id: "emptyCarriage",
    stationId: "boarding",
    name: "空车厢",
    objectiveName: "异常感",
    objectiveValue: 7,
    turnLimit: 3,
    intro:
      "车厢里没有人，扶手轻轻摇晃。线路图上的站名一格格熄灭，只剩 0:13 像伤口一样亮着。",
    successText: "你稳住呼吸，看见座位下压着一张三年前的旧车票。",
    failureText: "灯光闪了一下。你没能看清车厢尽头的人影，压力像潮水灌进牌库。",
    successReward: {
      description: "获得旧车票线索，压力 -1。",
      effects: [
        { type: "gainItem", itemId: "old_ticket_clue" },
        { type: "reducePressure", amount: 1 },
      ],
    },
    failurePenalty: {
      description: "理智 -1，加入 1 张“焦虑”。",
      effects: [
        { type: "healSanity", amount: -1 },
        { type: "addNegativeCard", cardId: "anxiety", amount: 1 },
      ],
    },
  },
  facelessConductor: {
    id: "facelessConductor",
    stationId: "boarding",
    name: "无脸检票员",
    objectiveName: "怀疑值",
    objectiveValue: 8,
    turnLimit: 3,
    intro:
      "检票员从两节车厢之间走来。它没有脸，胸牌却清楚写着：请出示你不愿承认的东西。",
    successText: "检票钳在旧车票边缘咬出一个缺口。它让开了路。",
    failureText: "检票员在空白车票上盖下红章：无票乘车。",
    successReward: {
      description: "通过检票，理智 +1。",
      effects: [{ type: "healSanity", amount: 1 }],
    },
    failurePenalty: {
      description: "理智 -2，加入 1 张“逃票记录”。",
      effects: [
        { type: "healSanity", amount: -2 },
        { type: "addNegativeCard", cardId: "fareEvasionRecord", amount: 1 },
      ],
    },
  },
  oldManWithFlowers: {
    id: "oldManWithFlowers",
    stationId: "boarding",
    name: "抱花老人",
    objectiveName: "信任",
    objectiveValue: 6,
    turnLimit: 3,
    intro:
      "老人抱着一束白花，反复问同一句话：你见过我女儿吗？他的影子没有跟着列车晃动。",
    successText: "老人把白花往怀里收了收。他说，终点站有人在等他。",
    failureText: "老人低下头，像把你的沉默当成了答案。",
    successReward: {
      description: "许向东关系 +2，获得证据“白花”。",
      effects: [
        { type: "changeRelation", passengerId: "xu_xiangdong", amount: 2 },
        { type: "gainEvidence", evidenceId: "white_flower" },
      ],
    },
    failurePenalty: {
      description: "许向东关系 -1，压力 +2。",
      effects: [
        { type: "changeRelation", passengerId: "xu_xiangdong", amount: -1 },
        { type: "gainPressure", amount: 2 },
      ],
    },
  },
};
