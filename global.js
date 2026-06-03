/* == global.js (포트폴리오 코어 컨트롤러) == */

// 1. 커스텀 커서 (비활성화 - 기본 마우스 커서 복구 완료)

// 2. 사이버 네트워크 노드 캔버스 배경 (Cyber Network Node Particles)
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const NUM = 55;

  let lastW = window.innerWidth;
  let lastH = window.innerHeight;

  function resize() {
    // 너비가 바뀌지 않았거나, 미세한 높이 변화(모바일 스크롤 주소창 등)일 경우 리사이즈를 스킵하여 캔버스 버퍼 클리어 깜빡임 방지
    if (window.innerWidth === lastW && Math.abs(window.innerHeight - lastH) < 50) return;
    
    lastW = W = canvas.width  = window.innerWidth;
    lastH = H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  
  // 초기 캔버스 사이즈 설정
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;

  class Node {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 2 + 1;
      this.vx = (Math.random() - .5) * .35;
      this.vy = (Math.random() - .5) * .35;
      this.a = Math.random() * .4 + .15;
      // 보안 전공 이미지를 부각하기 위해 사이언(Cyan)과 보라색(Purple) 노드를 분리
      this.hue = Math.random() > 0.5 ? 270 : 180;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, ${this.a})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < NUM; i++) particles.push(new Node());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    
    // 노드 간 거리에 비례한 데이터 커넥션 연결망 선 그리기
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 125) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          
          // 양 노드가 다른 계열일 때 색상 조화 그라디언트 블렌딩
          const gradientColor = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
          gradientColor.addColorStop(0, `hsla(${particles[i].hue}, 85%, 60%, ${(1 - d/125) * .12})`);
          gradientColor.addColorStop(1, `hsla(${particles[j].hue}, 85%, 60%, ${(1 - d/125) * .12})`);
          
          ctx.strokeStyle = gradientColor;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(loop);
  }
  loop();
}

// 3. 마우스 트래킹 네온 글로우 카드 테두리 제어 (Dynamic Glow Cards)
function initGlowCards() {
  // 모바일 및 터치 디바이스(마우스 호버 불가능 기기)일 경우 리소스 보존을 위해 이벤트를 비활성화함
  if (window.matchMedia('(hover: none)').matches || 'ontouchstart' in window) {
    console.log('[SYSTEM] Touch device detected. Mouse tracking hover disabled for optimal performance.');
    return;
  }

  const updateGlow = (e) => {
    // 모든 카드에 마우스 좌표 전달
    document.querySelectorAll('.glow-card, .bento-item, .card').forEach(card => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  };

  document.addEventListener('mousemove', updateGlow);
}

// 4. 테마 스위치 동적 주입 및 제어 (Dynamic Theme Switching)
function initThemeToggle() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  // 네비게이션 오른쪽에 테마 전환 버튼이 없으면 생성
  let toggleBtn = document.querySelector('.theme-toggle');
  if (!toggleBtn) {
    toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.title = '테마 전환 (다크/라이트)';
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    
    const ul = nav.querySelector('ul');
    if (ul) {
      ul.parentNode.insertBefore(toggleBtn, ul.nextSibling);
    } else {
      nav.appendChild(toggleBtn);
    }
  }

  // 모바일 메뉴 테마 스위치 주입
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu && !mobileMenu.querySelector('.theme-toggle-mobile')) {
    const mobileToggle = document.createElement('a');
    mobileToggle.href = "#";
    mobileToggle.className = 'theme-toggle-mobile';
    mobileToggle.innerHTML = '<i class="fas fa-adjust"></i> 테마 전환 (Light/Dark)';
    mobileToggle.style.display = 'flex';
    mobileToggle.style.alignItems = 'center';
    mobileToggle.style.gap = '10px';
    mobileToggle.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
    });
    mobileMenu.appendChild(mobileToggle);
  }

  // 로컬 스토리지 테마 로드
  const savedTheme = localStorage.getItem('site_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    toggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    document.body.classList.remove('light-theme');
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }

  // 클릭 이벤트 연결
  toggleBtn.addEventListener('click', toggleTheme);

  function toggleTheme() {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('site_theme', isLight ? 'light' : 'dark');
    toggleBtn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    console.log(`[SYSTEM] Theme switched to: ${isLight ? 'LIGHT' : 'DARK'}`);
  }
}

// 5. 스크롤 애니메이션 리빌 (Scroll Animation Trigger)
function initReveal() {
  const els = document.querySelectorAll('.reveal, .card, .bento-item');
  if (!els.length) return;
  const io  = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 65);
        io.unobserve(e.target);
      }
    });
  }, { threshold: .08 });
  els.forEach(el => io.observe(el));
}

// 6. 상단 스크롤 진행률 (Page Scroll Progress Bar)
function initProgress() {
  const bar = document.querySelector('.page-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) return;
    const pct = (window.scrollY / totalHeight) * 100;
    bar.style.width = pct + '%';
  });
}

// 7. 내비게이션 바 및 링크 상태 제어
function initNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  });

  const links = nav.querySelectorAll('a');
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const targetPath = a.getAttribute('href');
    if (targetPath === currentPath) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });
}

// 8. 모바일 햄버거 토글
function initHamburger() {
  const btn  = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;
  
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
  
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
}

// 9. 기술 스펙 로딩 애니메이션 (Skill Bars Observer)
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  if (!bars.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
        io.unobserve(e.target);
      }
    });
  }, { threshold: .15 });
  bars.forEach(b => io.observe(b));
}

// 10. 통계 숫자 카운터 애니메이션 (Statistics Counters)
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.count);
      let cur   = 0;
      const dur = 1000;
      const step = end / (dur / 16);
      const t = setInterval(() => {
        cur = Math.min(cur + step, end);
        el.textContent = Math.floor(cur) + (el.dataset.suffix || '');
        if (cur >= end) clearInterval(t);
      }, 16);
      io.unobserve(el);
    });
  }, { threshold: .25 });
  counters.forEach(c => io.observe(c));
}

// 11. 타이핑 애니메이션 효과 (Typing Animation)
function initTyping() {
  const el = document.querySelector('.typing-text');
  if (!el) return;
  const words = JSON.parse(el.dataset.words || '[]');
  if (!words.length) return;
  let wi = 0, ci = 0, del = false;
  
  const type = () => {
    const word = words[wi];
    if (!del) {
      el.textContent = word.slice(0, ++ci);
      if (ci === word.length) { del = true; setTimeout(type, 1600); return; }
    } else {
      el.textContent = word.slice(0, --ci);
      if (ci === 0) { del = false; wi = (wi + 1) % words.length; }
    }
    setTimeout(type, del ? 50 : 90);
  };
  
  type();
}

// 12. 방명록 로컬스토리지 제어 (Local Storage Guestbook)
function initGuestbook() {
  const form = document.querySelector('.guestbook-form');
  const list = document.querySelector('.guestbook-list');
  if (!form || !list) return;

  const loadComments = () => {
    const comments = JSON.parse(localStorage.getItem('guestbook_comments') || '[]');
    list.innerHTML = '';
    
    if (comments.length === 0) {
      list.innerHTML = '<div style="color:var(--muted); text-align:center; padding:30px; font-size:0.85rem;">[+] SECURE DATABASE EMPTY. 첫 메시지를 기록하세요.</div>';
      return;
    }
    
    comments.forEach((c, idx) => {
      const item = document.createElement('div');
      item.className = 'guestbook-item';
      item.innerHTML = `
        <div class="guestbook-item-header">
          <span><i class="fas fa-terminal" style="font-size:0.75rem;"></i> &nbsp;${escapeHtml(c.name)} <span class="guestbook-item-date">${c.date}</span></span>
          <button class="guestbook-delete-btn" data-idx="${idx}" title="삭제"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div style="color:var(--text); font-family:\'Noto Sans KR\', sans-serif; font-size:0.83rem; line-height:1.5;">${escapeHtml(c.content)}</div>
      `;
      list.appendChild(item);
    });
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    const nameInput = form.querySelector('.guest-name-input');
    const textInput = form.querySelector('.guest-text-input');
    
    if (!nameInput.value.trim() || !textInput.value.trim()) return;

    const comments = JSON.parse(localStorage.getItem('guestbook_comments') || '[]');
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('ko-KR') + ' ' + now.toLocaleTimeString('ko-KR', {hour: '2-digit', minute:'2-digit'});

    comments.unshift({
      name: nameInput.value.trim(),
      content: textInput.value.trim(),
      date: dateStr
    });
    
    localStorage.setItem('guestbook_comments', JSON.stringify(comments));
    nameInput.value = '';
    textInput.value = '';
    loadComments();
  });

  list.addEventListener('click', e => {
    const btn = e.target.closest('.guestbook-delete-btn');
    if (!btn) return;
    const idx = parseInt(btn.dataset.idx);
    const comments = JSON.parse(localStorage.getItem('guestbook_comments') || '[]');
    comments.splice(idx, 1);
    localStorage.setItem('guestbook_comments', JSON.stringify(comments));
    loadComments();
  });

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  loadComments();
}

// 종합 초기화 이벤트 핸들러
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initGlowCards();
  initThemeToggle();
  initReveal();
  initProgress();
  initNav();
  initHamburger();
  initSkillBars();
  initCounters();
  initTyping();
  initGuestbook();
});
