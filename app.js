// app.js - 段子生成应用逻辑

// ==================== 状态管理 ====================
let jokes = [];
let favorites = [];

// ==================== localStorage 存取收藏 ====================
function loadFavorites() {
  try {
    const stored = localStorage.getItem('jokeFavorites');
    if (stored) {
      favorites = JSON.parse(stored);
    }
  } catch (e) {
    console.error('加载收藏失败:', e);
    favorites = [];
  }
}

function saveFavorites() {
  try {
    localStorage.setItem('jokeFavorites', JSON.stringify(favorites));
  } catch (e) {
    console.error('保存收藏失败:', e);
  }
}

// ==================== 渲染收藏列表 ====================
function renderFavorites() {
  const container = document.getElementById('favoritesContainer');
  if (!container) return;

  if (favorites.length === 0) {
    container.innerHTML = '<p class="empty-tip">暂无收藏</p>';
    return;
  }

  container.innerHTML = favorites.map((joke, index) => `
    <div class="favorite-item">
      <p class="joke-content">${joke.content}</p>
      <div class="joke-actions">
        <button class="btn-copy" onclick="copyJoke('${escapeHtml(joke.content)}')">复制</button>
        <button class="btn-delete" onclick="deleteFavorite(${index})">删除</button>
      </div>
    </div>
  `).join('');
}

function deleteFavorite(index) {
  favorites.splice(index, 1);
  saveFavorites();
  renderFavorites();
}

// ==================== 加载动画 ====================
function showLoading() {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.display = 'flex';
  }
}

function hideLoading() {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.display = 'none';
  }
}

// ==================== 生成段子 ====================
async function generateJokes(topic, style = '幽默') {
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

    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    // 解析段子内容，按句号分隔
    const jokeList = content.split('。').filter(j => j.trim().length > 0);

    jokes = jokeList.map((text, index) => ({
      id: Date.now() + index,
      content: text.trim() + '。',
      likes: 0,
      liked: false,
      favorited: false
    }));

    renderJokes();
  } catch (error) {
    console.error('生成段子失败:', error);
    alert('生成段子失败，请稍后重试');
  } finally {
    hideLoading();
  }
}

// ==================== 渲染段子卡片 ====================
function renderJokes() {
  const container = document.getElementById('jokesContainer');
  if (!container) return;

  if (jokes.length === 0) {
    container.innerHTML = '<p class="empty-tip">点击生成按钮开始创作段子</p>';
    return;
  }

  container.innerHTML = jokes.map(joke => `
    <div class="joke-card" data-id="${joke.id}">
      <p class="joke-content">${joke.content}</p>
      <div class="joke-stats">
        <span class="like-count">${joke.likes}</span>
      </div>
      <div class="joke-actions">
        <button class="btn-action ${joke.liked ? 'active' : ''}" onclick="likeJoke(${joke.id})" title="点赞">
          ${joke.liked ? '❤️' : '🤍'}
        </button>
        <button class="btn-action ${joke.favorited ? 'active' : ''}" onclick="favoriteJoke(${joke.id})" title="收藏">
          ${joke.favorited ? '⭐' : '☆'}
        </button>
        <button class="btn-action" onclick="copyJoke('${escapeHtml(joke.content)}')" title="复制">
          📋
        </button>
        <button class="btn-action" onclick="shareJoke('${escapeHtml(joke.content)}')" title="分享">
          📤
        </button>
      </div>
    </div>
  `).join('');
}

// ==================== 复制段子到剪贴板 ====================
async function copyJoke(text) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('复制成功！');
  } catch (error) {
    console.error('复制失败:', error);
    // 降级处理
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast('复制成功！');
  }
}

// ==================== 分享段子 ====================
async function shareJoke(text) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: '办公室段子',
        text: text
      });
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('分享失败:', error);
      }
    }
  } else {
    // 不支持 Web Share API 时，复制到剪贴板
    await copyJoke(text);
    showToast('已复制到剪贴板');
  }
}

// ==================== 点赞功能 ====================
function likeJoke(id) {
  const joke = jokes.find(j => j.id === id);
  if (joke) {
    if (joke.liked) {
      joke.likes--;
      joke.liked = false;
    } else {
      joke.likes++;
      joke.liked = true;
    }
    renderJokes();
  }
}

// ==================== 收藏功能 ====================
function favoriteJoke(id) {
  const joke = jokes.find(j => j.id === id);
  if (joke) {
    if (joke.favorited) {
      // 取消收藏
      joke.favorited = false;
      favorites = favorites.filter(f => f.id !== id);
    } else {
      // 添加收藏
      joke.favorited = true;
      favorites.push({
        id: joke.id,
        content: joke.content,
        likes: joke.likes
      });
    }
    saveFavorites();
    renderJokes();
    renderFavorites();
  }
}

// ==================== 工具函数 ====================
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }
}

// ==================== 初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
  loadFavorites();
  renderFavorites();
});
