import type { Station } from "../types";

export const stations: Record<string, Station> = {
  boarding: {
    id: "boarding",
    name: "上车",
    chapter: "第一章",
    description:
      "凌晨 0:13，林澈登上一班没有编号的末班车。车厢空荡，广播提醒他保管好遗失的记忆。",
    eventIds: ["emptyCarriage", "facelessConductor", "oldManWithFlowers"],
  },
};
