# 办公室段子生成网站 - 设计文档

## 1. 项目概述

- **项目名称**：办公室段子生成器
- **项目类型**：单页面 Web 应用
- **核心功能**：用户输入主题，AI 生成3个有趣的办公室段子
- **目标用户**：办公室职员、想要放松一下的上班族

## 2. 技术方案

- **前端**：原生 HTML + CSS + JavaScript，单页面应用
- **AI API**：OpenAI 兼容 API，配置分离

## 3. 配置文件

创建 `config.js` 文件存放 API 配置：

```javascript
// config.js
export const API_CONFIG = {
  base_url: 'https://aihubmix.com/v1',
  api_key: 'sk-OqAd0oanHIm5rnaA2f3dB0623a1f47599497Ce2b3b3020E4',
  model: 'gpt-3.5-turbo'
};
```

## 4. 界面设计（动漫卡通风格）

### 4.1 配色方案
- 主色：#FFB6C1（浅粉色）
- 辅色：#87CEEB（天空蓝）
- 强调色：#FF6B6B（珊瑚红）
- 背景：#FFF5F7（淡粉白）
- 文字：#4A4A4A（深灰）

### 4.2 字体
- 标题：Nunito Bold
- 正文：Nunito / PingFang SC

### 4.3 组件样式
- 圆角卡片（border-radius: 16px）
- 柔和阴影（box-shadow）
- 渐变背景装饰
- 动漫风格图标

## 5. 功能模块

### 5.1 主题输入区
- 文本输入框（placeholder：输入一个话题...）
- 风格选择下拉框（轻松搞笑 / 职场讽刺 / 吐槽向）
- 生成按钮

### 5.2 段子展示区
- 3个段子卡片垂直排列
- 每个段子包含：
  - 段子文本
  - 复制按钮
  - 分享按钮
  - 点赞按钮

### 5.3 收藏功能
- 收藏按钮
- 展示已收藏的段子列表（使用 localStorage）

## 6. API 调用

```javascript
// 调用示例
const response = await fetch(`${API_CONFIG.base_url}/chat/completions`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_CONFIG.api_key}`
  },
  body: JSON.stringify({
    model: API_CONFIG.model,
    messages: [
      {
        role: 'user',
        content: '请根据主题"{主题}"生成3个{风格}的办公室段子'
      }
    ]
  })
});
```

## 7. 交互流程

1. 用户输入主题
2. 选择段子风格
3. 点击"生成段子"按钮
4. 显示加载动画
5. API 返回3个段子
6. 展示段子卡片
7. 用户可复制/分享/点赞/收藏
