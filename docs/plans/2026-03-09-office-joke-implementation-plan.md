# 办公室段子生成网站 - 实现计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 创建单页面网站，用户输入主题后调用 AI API 生成3个有趣的办公室段子

**Architecture:** 前端单页面应用，配置分离到 config.js，使用 localStorage 存储收藏

**Tech Stack:** 原生 HTML + CSS + JavaScript，OpenAI 兼容 API

---

### Task 1: 创建配置文件 config.js

**Files:**
- Create: `config.js`

**Step 1: 创建配置文件**

```javascript
// config.js - API 配置
const API_CONFIG = {
  base_url: 'https://aihubmix.com/v1',
  api_key: 'sk-OqAd0oanHIm5rnaA2f3dB0623a1f47599497Ce2b3b3020E4',
  model: 'gpt-3.5-turbo'
};
```

**Step 2: 提交**

```bash
git add config.js
git commit -m "feat: 添加 API 配置文件"
```

---

### Task 2: 创建 HTML 主页面

**Files:**
- Create: `index.html`

**Step 1: 编写 HTML 结构**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>办公室段子生成器</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body>
  <div class="container">
    <header>
      <h1>办公室段子生成器</h1>
      <p class="subtitle">压力大？来乐一乐！</p>
    </header>

    <main>
      <section class="input-section">
        <div class="input-group">
          <input type="text" id="topic" placeholder="输入一个话题..." />
          <select id="style">
            <option value="轻松搞笑">轻松搞笑</option>
            <option value="职场讽刺">职场讽刺</option>
            <option value="吐槽向">吐槽向</option>
          </select>
        </div>
        <button id="generateBtn">生成段子</button>
      </section>

      <section class="jokes-section" id="jokesSection">
        <!-- 段子将在这里显示 -->
      </section>

      <section class="favorites-section">
        <h2>我的收藏</h2>
        <div id="favoritesList"></div>
      </section>
    </main>
  </div>
  <script src="config.js"></script>
  <script src="app.js"></script>
</body>
</html>
```

**Step 2: 提交**

```bash
git add index.html
git commit -m "feat: 创建 HTML 主页面结构"
```

---

### Task 3: 创建样式文件 style.css

**Files:**
- Create: `style.css`

**Step 1: 编写动漫卡通风格样式**

```css
/* 基础重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Nunito', 'PingFang SC', sans-serif;
  background: linear-gradient(135deg, #FFF5F7 0%, #E8F4F8 100%);
  min-height: 100vh;
  color: #4A4A4A;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 头部 */
header {
  text-align: center;
  margin-bottom: 40px;
}

h1 {
  font-size: 2.5rem;
  color: #FF6B6B;
  text-shadow: 2px 2px 0 #FFB6C1;
  margin-bottom: 8px;
}

.subtitle {
  color: #87CEEB;
  font-size: 1.1rem;
}

/* 输入区 */
.input-section {
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(255, 107, 107, 0.15);
  margin-bottom: 30px;
}

.input-group {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

#topic {
  flex: 1;
  padding: 15px 20px;
  border: 3px solid #FFB6C1;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

#topic:focus {
  outline: none;
  border-color: #FF6B6B;
  box-shadow: 0 0 0 4px rgba(255, 107, 107, 0.2);
}

#style {
  padding: 15px 20px;
  border: 3px solid #87CEEB;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  background: white;
  cursor: pointer;
}

#style:focus {
  outline: none;
  border-color: #5DADE2;
}

#generateBtn {
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.2rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s ease;
}

#generateBtn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
}

#generateBtn:active {
  transform: translateY(0);
}

#generateBtn:disabled {
  background: #ccc;
  cursor: not-allowed;
  transform: none;
}

/* 段子卡片 */
.jokes-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.joke-card {
  background: white;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  position: relative;
  animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.joke-number {
  position: absolute;
  top: -12px;
  left: 20px;
  background: #FFB6C1;
  color: #FF6B6B;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.9rem;
}

.joke-text {
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 20px;
  padding-top: 10px;
}

.joke-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.action-btn {
  padding: 8px 16px;
  border: 2px solid #E0E0E0;
  background: white;
  border-radius: 20px;
  font-size: 0.9rem;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;
}

.action-btn:hover {
  border-color: #FF6B6B;
  color: #FF6B6B;
}

.action-btn.liked {
  background: #FF6B6B;
  border-color: #FF6B6B;
  color: white;
}

.action-btn.favorited {
  background: #FFD93D;
  border-color: #FFD93D;
  color: #4A4A4A;
}

/* 加载动画 */
.loading {
  text-align: center;
  padding: 40px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #FFB6C1;
  border-top-color: #FF6B6B;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 15px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 收藏区 */
.favorites-section {
  background: white;
  padding: 25px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.favorites-section h2 {
  color: #87CEEB;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

#favoritesList {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.favorite-item {
  padding: 15px;
  background: #FFF5F7;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.favorite-text {
  flex: 1;
  font-size: 0.95rem;
}

.favorite-remove {
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 5px;
}

.favorite-remove:hover {
  color: #FF6B6B;
}

.empty-favorites {
  color: #999;
  text-align: center;
  padding: 20px;
}
```

**Step 2: 提交**

```bash
git add style.css
git commit -m "feat: 添加动漫卡通风格样式"
```

---

### Task 4: 创建应用逻辑 app.js

**Files:**
- Create: `app.js`

**Step 1: 编写 JavaScript 逻辑**

```javascript
// 状态管理
let jokes = [];
let favorites = loadFavorites();

// DOM 元素
const topicInput = document.getElementById('topic');
const styleSelect = document.getElementById('style');
const generateBtn = document.getElementById('generateBtn');
const jokesSection = document.getElementById('jokesSection');
const favoritesList = document.getElementById('favoritesList');

// 加载收藏
function loadFavorites() {
  const stored = localStorage.getItem('jokeFavorites');
  return stored ? JSON.parse(stored) : [];
}

// 保存收藏
function saveFavorites() {
  localStorage.setItem('jokeFavorites', JSON.stringify(favorites));
  renderFavorites();
}

// 渲染收藏列表
function renderFavorites() {
  if (favorites.length === 0) {
    favoritesList.innerHTML = '<p class="empty-favorites">还没有收藏的段子~</p>';
    return;
  }

  favoritesList.innerHTML = favorites.map((joke, index) => `
    <div class="favorite-item">
      <span class="favorite-text">${joke}</span>
      <button class="favorite-remove" onclick="removeFavorite(${index})">×</button>
    </div>
  `).join('');
}

// 移除收藏
function removeFavorite(index) {
  favorites.splice(index, 1);
  saveFavorites();
}

// 显示加载
function showLoading() {
  jokesSection.innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>段子生成中...</p>
    </div>
  `;
  generateBtn.disabled = true;
}

// 隐藏加载
function hideLoading() {
  generateBtn.disabled = false;
}

// 生成段子
async function generateJokes() {
  const topic = topicInput.value.trim();
  const style = styleSelect.value;

  if (!topic) {
    alert('请输入一个话题~');
    return;
  }

  showLoading();

  try {
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
            content: `请根据主题"${topic}"生成3个${style}的办公室段子。要求：1. 每个段子30-50字 2. 要有趣 3. 用中文输出 4. 直接输出3个段子，不要编号，用中文句号分隔`
          }
        ],
        temperature: 0.8
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;

    // 解析段子（按句号或换行分割）
    jokes = content.split(/[。\n]/).filter(s => s.trim().length > 0);
    jokes = jokes.slice(0, 3).map(j => j.trim() + '。');

    renderJokes();
  } catch (error) {
    console.error('Error:', error);
    jokesSection.innerHTML = '<p style="text-align:center;color:#FF6B6B;">生成失败了，请稍后重试~</p>';
  }

  hideLoading();
}

// 渲染段子
function renderJokes() {
  jokesSection.innerHTML = jokes.map((joke, index) => `
    <div class="joke-card" style="animation-delay: ${index * 0.1}s">
      <span class="joke-number">${index + 1}</span>
      <p class="joke-text">${joke}</p>
      <div class="joke-actions">
        <button class="action-btn" onclick="copyJoke('${joke}')">📋 复制</button>
        <button class="action-btn" onclick="shareJoke('${joke}')">📤 分享</button>
        <button class="action-btn" onclick="likeJoke(this)">❤️ 点赞</button>
        <button class="action-btn" onclick="favoriteJoke('${joke}', this)">⭐ 收藏</button>
      </div>
    </div>
  `).join('');
}

// 复制段子
function copyJoke(joke) {
  navigator.clipboard.writeText(joke).then(() => {
    alert('复制成功！');
  });
}

// 分享段子
function shareJoke(joke) {
  const text = `办公室段子：${joke}`;
  if (navigator.share) {
    navigator.share({
      text: text
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text).then(() => {
      alert('分享内容已复制到剪贴板！');
    });
  }
}

// 点赞
function likeJoke(btn) {
  btn.classList.toggle('liked');
  btn.textContent = btn.classList.contains('liked') ? '❤️ 已赞' : '❤️ 点赞';
}

// 收藏
function favoriteJoke(joke, btn) {
  if (favorites.includes(joke)) {
    alert('已经收藏过了~');
    return;
  }
  favorites.unshift(joke);
  saveFavorites();
  btn.classList.add('favorited');
  btn.textContent = '⭐ 已收藏';
}

// 事件绑定
generateBtn.addEventListener('click', generateJokes);

// 初始化收藏
renderFavorites();
```

**Step 2: 提交**

```bash
git add app.js
git commit -m "feat: 添加应用逻辑"
```

---

### Task 5: 验证实现

**Files:**
- 测试: `index.html`

**Step 1: 用浏览器打开测试**

在浏览器中打开 index.html，测试以下功能：
1. 输入主题，选择风格，点击生成
2. 验证段子是否正确显示
3. 测试复制、分享、点赞、收藏功能
4. 验证收藏数据是否持久化

**Step 2: 提交**

```bash
git add .
git commit -m "feat: 完成办公室段子生成网站"
```

---

## 执行选择

**Plan complete and saved to `docs/plans/2026-03-09-office-joke-design.md`. Two execution options:**

**1. Subagent-Driven (this session)** - I dispatch fresh subagent per task, review between tasks, fast iteration

**2. Parallel Session (separate)** - Open new session with executing-plans, batch execution with checkpoints

**Which approach?**
