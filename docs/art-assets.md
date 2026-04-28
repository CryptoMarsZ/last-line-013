# 美术素材规划

## 美术目标

《Last Line 0:13》的美术需要服务三个核心感受：

- 凌晨末班地铁的冷、空、潮湿和不真实。
- 事故记忆逐渐渗出的心理压迫。
- 卡牌桌面上的叙事线索、证据和负面情绪。

整体方向不是传统怪物恐怖，而是都市怪谈、心理悬疑和事故现场残留感。画面应该让玩家觉得“这里像现实地铁，但有些地方已经不对劲”。

## 关键词

### 视觉关键词

- 凌晨地铁
- 冷白灯
- 绿色应急灯
- 潮湿墙面
- 反光地砖
- 模糊监控
- 空车厢
- 旧报纸
- 水痕
- 站台广播
- 无编号列车
- 事故残影

### 情绪关键词

- 压抑
- 克制
- 愧疚
- 延迟的真相
- 未送达
- 记忆污染
- 自我欺骗
- 被审视

## 推荐美术风格

### 主风格

推荐使用半写实 2D 插画风格，结合轻微颗粒、胶片噪点和低饱和冷色调。

特点：

- 人物不要过度夸张，保持现实感。
- 恐怖元素尽量克制，不依赖血腥和怪物。
- 重点使用光影、构图、留白和异常细节制造不安。
- 证据类素材需要可读、具体，像真实物件。

### 色彩方向

主色：

- 深蓝黑
- 冷灰
- 地铁白光
- 暗绿色应急灯

强调色：

- 红色警示灯
- 手机屏幕冷光
- 白花
- 泛黄纸张
- 血迹暗红

### 不建议方向

- 不建议做成高饱和二次元风格。
- 不建议大量使用怪物、跳脸、血浆。
- 不建议让 UI 过度科幻。
- 不建议把地铁做得太干净或太游戏化。

## 资源命名规范

推荐统一使用英文小写和下划线：

- 角色立绘：`char_<character>_<state>.png`
- 场景背景：`bg_<station>_<variant>.png`
- 卡牌插图：`card_<type>_<name>.png`
- UI 元素：`ui_<module>_<name>.png`
- 图标：`icon_<resource>_<state>.png`
- 结局图：`ending_<ending_name>.png`

示例：

- `char_linche_neutral.png`
- `char_shenmian_memory.png`
- `bg_lost_and_found_platform.png`
- `card_evidence_broken_phone.png`
- `icon_pressure_high.png`
- `ending_public_report.png`

## MVP 必需素材清单

### 角色素材

MVP 最少需要以下角色：

- 林澈
- 沈眠
- 许向东
- 周姐
- 无脸检票员

推荐每个角色先做 1 张主立绘，重要角色追加状态差分。

### 角色差分建议

林澈：

- 中性
- 疲惫
- 崩溃
- 面对真相

沈眠：

- 记忆残影
- 手机屏幕光照
- 信任

许向东：

- 抱白花
- 茫然
- 想起真相

周姐：

- 清洁工制服
- 回避
- 作证

无脸检票员：

- 普通检票
- 审判
- 近距离压迫

## 场景背景

MVP 需要 4 个站点背景：

### 上车

画面描述：

凌晨站台，灯光冷白，列车没有编号。站台几乎空无一人，远处电子屏显示 0:13。

素材建议：

- `bg_boarding_platform.png`
- `bg_empty_carriage.png`

### 遗失物招领

画面描述：

站台堆满书包、手机、工牌、车票和旧报纸。地面有水痕，物品像被潮水冲上岸。

素材建议：

- `bg_lost_and_found_platform.png`
- `bg_lost_items_closeup.png`

### 医院站

画面描述：

医院走廊和地铁站混合在一起。病房门牌变成站名，白色灯管闪烁，地面反光。

素材建议：

- `bg_hospital_station_corridor.png`
- `bg_wet_medical_record_room.png`

### 清算站

画面描述：

站台像审判室。检票闸机排列成边界，所有乘客站在冷光下，广播提示“请出示你不愿承认的东西”。

素材建议：

- `bg_settlement_station.png`
- `bg_ticket_gate_judgement.png`

## UI 素材

### 主界面模块

MVP 需要以下 UI 模块：

- 顶部线路图
- 当前事件面板
- 手牌区域
- 乘客关系区域
- 状态资源区域
- 牌库、弃牌堆、负面牌计数
- 事件倒计时
- 结局展示界面

### 资源图标

必须图标：

- 理智：`icon_sanity.png`
- 压力：`icon_pressure.png`
- 证据：`icon_evidence.png`
- 时间：`icon_time.png`
- 乘客关系：`icon_relation.png`
- 负面牌：`icon_negative_card.png`
- 崩溃次数：`icon_collapse.png`

### UI 风格

- 使用地铁线路图、车票、报纸栏、站牌、检票闸机作为视觉隐喻。
- UI 边框可以参考旧车票、塑封证件、监控画面。
- 资源变化需要清晰，但动画不宜太夸张。

## 卡牌素材

### 卡牌版式

卡牌建议区分以下区域：

- 顶部：卡牌名称
- 左上角：费用或行动力消耗
- 中部：插图
- 下部：效果描述
- 底部：标签或剧情归属

### 卡牌类型视觉区分

行动牌：

- 颜色偏冷灰或蓝色。
- 插图表现动作、对话、观察视角。

物品牌：

- 颜色偏泛黄或纸张色。
- 插图强调具体物件。

证据牌：

- 颜色偏白、蓝、红。
- 插图需要像档案、视频截图、录音波形或报警记录。

乘客牌：

- 颜色带人物专属色。
- 插图可以使用角色局部或象征物。

普通负面牌：

- 颜色偏暗紫、灰黑。
- 插图可以做轻微模糊、重影、噪点。

严重负面牌：

- 颜色更高对比，带规则破坏感。
- 可以让卡面边框出现裂纹、错位、信号干扰。

## MVP 卡牌插图优先级

第一批建议优先制作这些卡牌插图：

### 行动牌

- 观察
- 采访
- 记录
- 解释
- 深呼吸
- 撒谎
- 转移话题
- 删除草稿

### 物品牌

- 旧车票
- 破碎手机
- 白花
- 记者证
- 湿透的病历

### 证据牌

- 沈眠的视频
- 最后通话
- 清洁工口供
- 施工报警记录
- 被删采访录音

### 乘客牌

- 抱花老人
- 清洁工周姐
- 沈眠的信任

### 负面牌

- 焦虑
- 愧疚
- 幻听
- 未接来电
- 记忆断片
- 自我否认

## 事件插图

事件插图用于中央事件面板，不一定每个事件都需要独立大图。MVP 可以优先做 8 张关键事件图：

- 无脸检票员
- 抱花老人
- 破碎手机
- 无人接听的电话
- 湿透的病历
- 擦不掉的血迹
- 改过的口供
- 清算检票

事件插图应该比卡牌插图更强调场景气氛和压迫感。

## 结局图

MVP 需要 3 张结局图：

### 循环结局

画面建议：

林澈再次站在凌晨 0:13 的站台前，电子屏亮着，列车远处进站。

素材名：

- `ending_loop_platform.png`

### 公开结局

画面建议：

新闻页面、录音波形和沈眠视频截图叠在一起。桌上有白花，窗外是清晨。

素材名：

- `ending_public_report.png`

### 清算失败结局

画面建议：

检票闸机关闭，林澈站在车厢内，玻璃倒影中看不清脸。

素材名：

- `ending_settlement_failed.png`

## AI 生成图提示词模板

### 通用风格模板

```text
semi-realistic 2D illustration, psychological horror, urban metro station at midnight, cold fluorescent light, muted blue gray palette, subtle film grain, wet reflective floor, quiet oppressive atmosphere, grounded realistic details, no gore, no jump scare
```

### 场景模板

```text
empty subway platform at 00:13, no train number, cold white fluorescent lights, dark blue gray color palette, wet tiles, faint green emergency light, subtle fog, cinematic composition, psychological suspense, semi-realistic 2D illustration, film grain
```

### 角色模板

```text
semi-realistic 2D character portrait, modern Chinese urban setting, tired expression, cold subway lighting, muted colors, psychological suspense atmosphere, subtle rim light, realistic clothing, clean card game character art
```

### 证据牌模板

```text
close-up evidence item for a narrative card game, broken smartphone screen showing a blurry subway accident video, cold blue screen light, wet surface, realistic object detail, muted colors, subtle film grain, psychological mystery
```

## 占位素材策略

开发早期可以先用低成本占位素材：

- 背景用纯色块加文字说明。
- 角色用剪影和名字标签。
- 卡牌插图用类型图标代替。
- 事件图用站点背景裁切。
- 结局图用黑底文字和简单构图。

占位阶段的重点是验证 UI 可读性、卡牌信息密度和情绪节奏，不需要追求最终美术质量。

## 美术验收标准

一张素材是否适合本项目，可以用以下标准判断：

- 是否看起来像现实地铁的一部分。
- 是否有轻微异常感，但没有过度怪物化。
- 是否能表达“未送达、愧疚、记忆污染”的主题。
- 是否在缩小到卡牌尺寸后仍然可读。
- 是否和冷色、低饱和、克制恐怖的整体方向一致。

