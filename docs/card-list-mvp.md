# MVP 卡牌总表

## 用途

这份文档用于统一程序实现、美术制作和 AI 生图需求。每张卡牌都应有稳定的 `id`、类型、费用、效果、叙事定位和推荐素材名。

MVP 目标卡牌数量：50 到 70 张。

第一阶段建议先完成 52 张：

- 行动牌：18 张
- 物品牌：10 张
- 证据牌：8 张
- 乘客牌：7 张
- 普通负面牌：5 张
- 严重负面牌：4 张

## 字段说明

- id：程序使用的唯一标识。
- 名称：玩家看到的中文卡名。
- 类型：action、item、evidence、passenger、negative。
- 费用：行动力消耗。
- 效果：实际规则效果。
- 叙事定位：这张牌在故事里代表什么。
- 推荐素材名：美术文件名。
- 状态：implemented、needed、later。

## 行动牌

| id | 名称 | 费用 | 效果 | 叙事定位 | 推荐素材名 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| observe | 观察 | 0 | 推进 1，抽 1 | 注意到异常细节 | card_action_observe.png | implemented |
| explain | 解释 | 1 | 推进 2 | 用话术降低怀疑 | card_action_explain.png | implemented |
| breathe | 深呼吸 | 1 | 回复 1 理智，压力 -1 | 稳定自己 | card_action_breathe.png | implemented |
| interview | 采访 | 1 | 推进 3，压力 +1 | 记者本能，追问信息 | card_action_interview.png | implemented |
| lie | 撒谎 | 1 | 推进 4，压力 +2，加入愧疚 | 快速逃避责任 | card_action_lie.png | implemented |
| deflect | 转移话题 | 1 | 推进 2，压力 +1，抽 1 | 用别的话盖过真相 | card_action_deflect.png | implemented |
| askDaughter | 问起女儿 | 1 | 推进 2，许向东关系 +1，压力 +1 | 主动触碰许向东记忆 | card_action_ask_daughter.png | implemented |
| record | 记录 | 1 | 推进 2，获得临时线索 | 记者习惯，留下笔记 | card_action_record.png | needed |
| followUp | 追问 | 2 | 推进 4，压力 +1 | 不让对方含糊过去 | card_action_follow_up.png | needed |
| verifySource | 核实来源 | 1 | 若有物品牌，推进 3 | 检查证据可信度 | card_action_verify_source.png | needed |
| listenSilently | 沉默倾听 | 1 | 乘客关系 +1，抽 1 | 不插话，让对方说完 | card_action_listen_silently.png | needed |
| apologize | 道歉 | 1 | 关系 +1，理智 -1 | 承认自己的迟到 | card_action_apologize.png | needed |
| delay | 暂缓 | 0 | 本回合压力 -1，但事件倒计时 -1 | 拖延处理 | card_action_delay.png | needed |
| deleteDraft | 删除草稿 | 1 | 移除 1 张手牌，压力 +1 | 把不想看的材料删掉 | card_action_delete_draft.png | needed |
| searchBag | 翻找背包 | 1 | 抽 2，弃 1 | 找旧资料和物品 | card_action_search_bag.png | needed |
| checkRecorder | 检查录音笔 | 1 | 如果有录音相关证据，推进 3 | 检查被删采访线索 | card_action_check_recorder.png | needed |
| faceMemory | 面对记忆 | 2 | 推进 5，理智 -1 | 正面承受事故记忆 | card_action_face_memory.png | needed |
| rationalize | 自我合理化 | 0 | 压力 -2，加入逃避 | 短期安慰自己 | card_action_rationalize.png | needed |

## 物品牌

| id | 名称 | 费用 | 效果 | 叙事定位 | 推荐素材名 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| oldTicket | 旧车票 | 2 | 推进 4，许向东关系 +1，获得旧车票 | 三年前的乘车痕迹 | card_item_old_ticket.png | implemented |
| brokenPhone | 破碎手机 | 1 | 推进 2，抽 1，获得破碎手机 | 沈眠留下的视频载体 | card_item_broken_phone.png | implemented |
| whiteFlower | 白花 | 1 | 抵消 1 次恐惧或关系 +1 | 许向东等待女儿的象征 | card_item_white_flower.png | needed |
| pressCard | 记者证 | 1 | 解锁记者身份相关选项 | 林澈过去的身份 | card_item_press_card.png | needed |
| wetMedicalRecord | 湿透的病历 | 1 | 推进 2，获得医院线索 | 事故后抢救记录 | card_item_wet_medical_record.png | needed |
| oldRecorder | 旧录音笔 | 1 | 查找被删采访录音 | 采访材料的容器 | card_item_old_recorder.png | needed |
| stationMap | 线路图残页 | 0 | 查看下一事件 | 列车路线残缺信息 | card_item_station_map.png | needed |
| workBadge | 地铁工牌 | 1 | 周姐关系 +1，推进 1 | 站务人员身份线索 | card_item_work_badge.png | needed |
| soakedNotebook | 湿笔记本 | 1 | 抽 1，获得临时证据 | 林澈当年记录的残页 | card_item_soaked_notebook.png | needed |
| unreadMessage | 未读短信 | 0 | 压力 +1，获得线索 | 事故前没人回复的信息 | card_item_unread_message.png | needed |

## 证据牌

| id | 名称 | 费用 | 效果 | 叙事定位 | 推荐素材名 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| shenmianVideo | 沈眠的视频 | 1 | 推进 4，标记关键证据 | 墙体裂缝和渗水视频 | card_evidence_shenmian_video.png | needed |
| finalCall | 最后通话 | 1 | 推进 3，清算站 +1 证词 | 事故前最后一次通话 | card_evidence_final_call.png | needed |
| constructionAlarm | 施工报警记录 | 1 | 推进 4，解锁公开结局条件 | 系统曾经报警 | card_evidence_construction_alarm.png | needed |
| deletedInterview | 被删采访录音 | 2 | 推进 5，理智 -1 | 林澈删掉的材料 | card_evidence_deleted_interview.png | needed |
| cleanerTestimony | 清洁工口供 | 1 | 周姐证词，清算站加权 | 周姐改口前的证言 | card_evidence_cleaner_testimony.png | needed |
| settlementPhoto | 沉降照片 | 1 | 推进 2，补强施工线 | 轨道沉降痕迹 | card_evidence_settlement_photo.png | needed |
| leakedMemo | 内部备忘录 | 2 | 推进 4，压力 +1 | 施工方压下的文件 | card_evidence_leaked_memo.png | needed |
| emergencyLog | 控制室日志 | 1 | 解锁陈默相关真相 | 事故前控制系统记录 | card_evidence_emergency_log.png | needed |

## 乘客牌

| id | 名称 | 费用 | 效果 | 叙事定位 | 推荐素材名 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| oldManSupport | 抱花老人 | 1 | 抵消 1 次理智损失 | 许向东的信任 | card_passenger_old_man_support.png | needed |
| shenmianTrust | 沈眠的信任 | 1 | 复制 1 张证据牌的推进效果 | 沈眠愿意继续交给你证据 | card_passenger_shenmian_trust.png | needed |
| cleanerHelp | 清洁工周姐 | 1 | 揭开隐藏事件或推进 2 | 周姐指出被擦掉的痕迹 | card_passenger_cleaner_help.png | needed |
| driverHint | 陈默的提示 | 1 | 搜索控制室日志 | 司机指出系统报警 | card_passenger_driver_hint.png | needed |
| coworkerWarning | 顾闻的警告 | 0 | 压力 -2，加入愧疚 | 上级劝你别碰黑料 | card_passenger_coworker_warning.png | needed |
| passengerWitness | 乘客证词 | 1 | 清算站计为 1 证词 | 车上乘客愿意作证 | card_passenger_witness.png | needed |
| fatherMemory | 父亲想起 | 2 | 许向东关系 +2，理智 -1 | 许向东想起女儿已死 | card_passenger_father_memory.png | needed |

## 普通负面牌

| id | 名称 | 费用 | 效果 | 叙事定位 | 推荐素材名 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| guilt | 愧疚 | 0 | 打出：压力 +1 | 被逃避行为污染的记忆 | card_negative_guilt.png | implemented |
| anxiety | 焦虑 | 0 | 打出：压力 +1，抽 1 | 抽到时占据手牌 | card_negative_anxiety.png | implemented |
| fareEvasionRecord | 逃票记录 | 0 | 打出：压力 +2 | 检票失败留下的记录 | card_negative_fare_evasion_record.png | implemented |
| hallucination | 幻听 | 0 | 随机弃 1 张牌 | 广播声和呼救声重叠 | card_negative_hallucination.png | needed |
| avoidance | 逃避 | 0 | 本回合面对类牌 +1 费 | 不想承认责任 | card_negative_avoidance.png | needed |
| distraction | 走神 | 0 | 占据手牌，无正面效果 | 记忆断续 | card_negative_distraction.png | needed |

## 严重负面牌

| id | 名称 | 费用 | 效果 | 叙事定位 | 推荐素材名 | 状态 |
| --- | --- | --- | --- | --- | --- | --- |
| denial | 自我否认 | 0 | 面对类牌 +1 费，逃避类牌 -1 费，持续到事件结束 | 规则层面鼓励逃避 | card_severe_denial.png | needed |
| memoryGap | 记忆断片 | 0 | 封锁 1 张证据牌，本事件不能使用 | 关键记忆缺失 | card_severe_memory_gap.png | needed |
| missedCall | 未接来电 | 0 | 3 回合倒计时，失败则再次崩溃；成功转化为最后通话 | 沈眠事故前的电话 | card_severe_missed_call.png | needed |
| panicAttack | 恐慌发作 | 0 | 本回合行动力 -2，压力 +2 | 生理层面的崩溃 | card_severe_panic_attack.png | needed |

## 首批美术优先级

### 最高优先级

这些卡牌最常出现在截图和试玩中，应优先出图：

- 观察
- 采访
- 解释
- 深呼吸
- 撒谎
- 旧车票
- 破碎手机
- 沈眠的视频
- 愧疚
- 焦虑
- 未接来电

### 第二优先级

这些卡牌支撑 MVP 的剧情表达：

- 白花
- 记者证
- 湿透的病历
- 清洁工口供
- 最后通话
- 被删采访录音
- 抱花老人
- 沈眠的信任
- 清洁工周姐

### 第三优先级

这些卡牌用于丰富构筑和多周目：

- 追问
- 核实来源
- 删除草稿
- 自我合理化
- 顾闻的警告
- 陈默的提示
- 控制室日志

## 当前实现状态

当前代码中已经实现：

- observe
- explain
- breathe
- interview
- lie
- deflect
- oldTicket
- brokenPhone
- askDaughter
- guilt
- anxiety
- fareEvasionRecord

下一步建议：

1. 把未实现的卡牌逐批加入 `src/game/data/cards.ts`。
2. 将 `Card` 类型扩展出 `art`、`relatedStation`、`rarity` 或 `unlockCondition` 字段。
3. 将卡牌数据从 TypeScript 迁移到 JSON 或 YAML，方便 AI 和策划批量编辑。

