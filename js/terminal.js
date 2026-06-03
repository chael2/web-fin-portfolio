/* == terminal.js (보안 CLI 터미널 컨트롤러) == */

document.addEventListener('DOMContentLoaded', () => {
  const terminalInput = document.querySelector('.terminal-cli-input');
  const terminalBody = document.querySelector('.terminal-body');
  
  if (!terminalInput || !terminalBody) return;

  // 초기 시작 문구 출력
  clearTerminal();

  // 입력 포커스 유지
  const terminalContainer = document.querySelector('.cyber-terminal');
  terminalContainer.addEventListener('click', () => {
    terminalInput.focus();
  });

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim();
      processCommand(command);
      terminalInput.value = '';
    }
  });

  function processCommand(rawCmd) {
    const cmd = rawCmd.toLowerCase();
    
    // 입력한 라인 출력
    createLine(`<span class="terminal-prompt">&gt; chael2.dev $</span> ${rawCmd}`, 'input');

    if (cmd === '') return;

    // 명령어 분기
    switch(cmd) {
      case 'help':
        showHelp();
        break;
      case 'about':
        showAbout();
        break;
      case 'skills':
        showSkills();
        break;
      case 'projects':
        showProjects();
        break;
      case 'scan':
        runSecurityScan();
        break;
      case 'decrypt':
        runDecryption();
        break;
      case 'toy1':
        showToy1();
        break;
      case 'toy2':
        showToy2();
        break;
      case 'clear':
        clearTerminal();
        break;
      default:
        createLine(`Command not found: "${rawCmd}". Type <span style="color:var(--secondary)">"help"</span> for a list of available commands.`, 'error');
    }
    
    // 항상 최하단으로 스크롤
    setTimeout(() => {
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }, 50);
  }

  function createLine(content, type = 'normal') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.innerHTML = content;
    terminalBody.insertBefore(line, terminalBody.lastElementChild); // 입력창 바로 위에 삽입
  }

  function clearTerminal() {
    // 입력창이 있는 라인만 남기고 초기화
    const inputLine = terminalBody.querySelector('.terminal-input-line');
    terminalBody.innerHTML = '';
    
    // 인트로 메시지
    const welcomeHTML = `
<div style="color:var(--accent);font-weight:700;">[+] SYSTEM ONLINE. SHIELD CORE CONNECTED.</div>
<div style="color:var(--muted);font-size:0.75rem;margin-bottom:12px;">Welcome to Chael2 Security Command Shell (v3.0.0)</div>
<div>안녕하세요, 정보보호학과 함유진(chael2)의 시큐리티 터미널입니다.</div>
<div>사용자 정보를 분석하기 위해 명령어를 입력하세요.</div>
<div style="margin-top:8px;">사용 가능한 명령어 목록을 보시려면 <span style="color:var(--secondary)">"help"</span>를 입력하세요.</div>
<hr style="border:none;border-top:1px dashed var(--border);margin:12px 0;" />
    `;
    const intro = document.createElement('div');
    intro.innerHTML = welcomeHTML;
    terminalBody.appendChild(intro);
    
    // 입력 라인 다시 추가
    terminalBody.appendChild(inputLine);
    terminalInput.focus();
  }

  function showHelp() {
    const helpText = `
<table style="width:100%; border-collapse:collapse; margin-top:8px; font-size:0.8rem; line-height:1.6;">
  <tr>
    <td style="color:var(--accent); width:100px; padding:3px 0;">about</td>
    <td style="color:var(--muted)">전공 분야 및 프로필 정보 출력</td>
  </tr>
  <tr>
    <td style="color:var(--accent); padding:3px 0;">skills</td>
    <td style="color:var(--muted)">보유 핵심 기술 분석 데이터 로드</td>
  </tr>
  <tr>
    <td style="color:var(--accent); padding:3px 0;">projects</td>
    <td style="color:var(--muted)">기말 포폴 프로젝트 목록 출력</td>
  </tr>
  <tr>
    <td style="color:var(--accent); padding:3px 0;">scan</td>
    <td style="color:var(--muted)">[보안] 시스템 모의 취약점 스캔 시뮬레이션</td>
  </tr>
  <tr>
    <td style="color:var(--accent); padding:3px 0;">decrypt</td>
    <td style="color:var(--muted)">[보안] 암호문 복호화 해킹 효과 연출</td>
  </tr>
  <tr>
    <td style="color:var(--accent); padding:3px 0;">toy1 / toy2</td>
    <td style="color:var(--muted)">독립 개발한 신규 보안 토이 프로젝트 정보 출력</td>
  </tr>
  <tr>
    <td style="color:var(--accent); padding:3px 0;">clear</td>
    <td style="color:var(--muted)">콘솔 로그 초기화 및 비우기</td>
  </tr>
</table>
    `;
    createLine(helpText);
  }

  function showAbout() {
    const aboutText = `
<div style="margin-top:6px; line-height:1.7;">
  <span style="color:var(--secondary); font-weight:700;">[SECURITY PROFILE]</span><br>
  - <span style="color:var(--accent)">Name:</span> 함유진(chael2.dev)<br>
  - <span style="color:var(--accent)">Major:</span> 정보보호학 전공 (Information Security Student)<br>
  - <span style="color:var(--accent)">Focus:</span> 악성코드 분석, 취약점 모니터링, 안전한 애플리케이션 보안 설계<br>
  - <span style="color:var(--accent)">Mission:</span> 안전하고 단단한 방패가 되어 줄 보안 전문가로 매일 한 걸음씩 성장 중
</div>
    `;
    createLine(aboutText);
  }

  function showSkills() {
    const statusLabel = `<span style="color:var(--success); font-weight:700;">[READY]</span>`;

    const skillsText = `
<div style="margin-top:6px; font-size:0.8rem; line-height:1.7;">
  <span style="color:var(--secondary); font-weight:700;">[CORE SKILLS ARCHIVE]</span><br>
  - C / C++   ${statusLabel} : 로우레벨 포인터 제어 및 메모리 리소스 관리, 시큐어 코딩 가능<br>
  - HTML/CSS  ${statusLabel} : 표준 마크업 &amp; 기기별 반응형 최적화 설계 가능<br>
  - JS (DOM)  ${statusLabel} : Vanilla JS 브라우저 객체 제어 및 인터랙션 제어 가능<br>
  - Python    ${statusLabel} : 보안 코딩 스크립트 작성 및 취약점 분석 자동화 가능<br>
  - Java      ${statusLabel} : OOP 객체 지향 구조 개발 및 핵심 자료구조 핸들링 가능<br>
  - Linux     ${statusLabel} : 권한 관리 정책 수립 및 Kali Linux 보안 진단 샌드박스 이용 가능</div>
    `;
    createLine(skillsText);
  }

  function showProjects() {
    const projectsText = `
<div style="margin-top:6px; font-size:0.8rem; line-height:1.7;">
  <span style="color:var(--secondary); font-weight:700;">[PROJECTS DATABASE]</span><br>
  1. <span style="color:var(--accent); font-weight:600;">Web-Pedia v2 [Core]</span> - 웹 표준 &amp; 보안 퀴즈 백과사전 웹 (팀)<br>
     &nbsp;&nbsp;&nbsp;<span style="color:var(--muted)">실시간 모의 해킹 대화형 퀴즈 엔진 탑재. Vercel 최종 배포망 구축.</span><br>
  2. <span style="color:var(--accent); font-weight:600;">SQL Injection Sandbox [Toy1]</span> - 웹 보안 실습 시뮬레이터 (개인)<br>
     &nbsp;&nbsp;&nbsp;<span style="color:var(--muted)">SQLi 취약점 공격 구문 실시간 우회 DB 스캔 모의 샌드박스 단독 배포.</span><br>
  3. <span style="color:var(--accent); font-weight:600;">Secure Task Manager [Toy2]</span> - 암호화 일정 관리 툴 (개인)<br>
     &nbsp;&nbsp;&nbsp;<span style="color:var(--muted)">XOR/Base64 암호화 저장소 필터를 장착한 고품격 일정 작전판 대시보드.</span><br>
  4. <span style="color:var(--accent); font-weight:600;">Arduino Light Switch</span> - 아두이노 스위치 컨트롤러 (팀)<br>
     &nbsp;&nbsp;&nbsp;<span style="color:var(--muted)">C++ 활용 원격 스위치 하드웨어 기획 및 구현.</span>
</div>
    `;
    createLine(projectsText);
  }

  function runSecurityScan() {
    createLine(`<span style="color:var(--gold)">[!] WARNING: STARTING VULNERABILITY SCAN ON CURRENT DOCKER CONTAINER...</span>`);
    
    let progress = 0;
    const progressLineId = `progress-${Date.now()}`;
    const pLine = document.createElement('div');
    pLine.className = 'terminal-line';
    pLine.id = progressLineId;
    terminalBody.insertBefore(pLine, terminalBody.lastElementChild);

    const interval = setInterval(() => {
      progress += 10;
      const barLength = Math.floor(progress / 5);
      const bar = '█'.repeat(barLength) + '░'.repeat(20 - barLength);
      
      const lineObj = document.getElementById(progressLineId);
      if (lineObj) {
        lineObj.innerHTML = `<span style="color:var(--accent)">[~] SCANNING PORTS: [${bar}] ${progress}%</span>`;
      }
      
      terminalBody.scrollTop = terminalBody.scrollHeight;

      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          createLine(`<span style="color:var(--success); font-weight:700;">[+] SCAN COMPLETED successfully.</span>`);
          createLine(`
<div style="color:var(--text); font-size:0.8rem; border:1px solid var(--border); padding:10px; margin-top:5px; border-radius:6px; background:rgba(16,185,129,0.05)">
  - Host Gateway: secure-sandbox-chael2.io<br>
  - Total scanned ports: 65,535<br>
  - Discovered vulnerabilities: <span style="color:var(--success)">0 (SAFE)</span><br>
  - SSL Integrity: Verified (A+)<br>
  <span style="color:var(--accent); font-weight:600;">[CONCLUSION] PORTFOLIO WEBSITE SECURED. NO ANOMALIES DETECTED.</span>
</div>
          `);
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }, 300);
      }
    }, 150);
  }

  function runDecryption() {
    createLine(`<span style="color:var(--gold)">[!] DETECTING ENCRYPTED SECRET KEY...</span>`);
    createLine(`Encrypted Payload: <span style="color:var(--muted)">"v3r_53cur3_c0d1n6_15_fuN_5h13ld"</span>`);

    let count = 0;
    const decryptLineId = `decrypt-${Date.now()}`;
    const dLine = document.createElement('div');
    dLine.className = 'terminal-line';
    dLine.id = decryptLineId;
    terminalBody.insertBefore(dLine, terminalBody.lastElementChild);

    const chars = 'ABCDEF1234567890!@#$%^&*()_+{}[]';
    const target = 'chael2.dev: PASSION FOR SECURITY AND CODING';
    
    const interval = setInterval(() => {
      count++;
      let currentResult = '';
      for (let i = 0; i < target.length; i++) {
        if (i < count) {
          currentResult += `<span style="color:var(--secondary); font-weight:700;">${target[i]}</span>`;
        } else {
          currentResult += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      
      const lineObj = document.getElementById(decryptLineId);
      if (lineObj) {
        lineObj.innerHTML = `<span style="color:var(--muted)">[DECRYPTION MODULE]</span>: ${currentResult}`;
      }
      
      terminalBody.scrollTop = terminalBody.scrollHeight;

      if (count >= target.length) {
        clearInterval(interval);
        setTimeout(() => {
          createLine(`<span style="color:var(--success); font-weight:700;">[+] SECRET KEY RETRIEVED successfully!</span>`);
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }, 200);
      }
    }, 40);
  }

  function showToy1() {
    const toy1Text = `
<div style="margin-top:6px; font-size:0.8rem; line-height:1.7;">
  <span style="color:var(--accent); font-weight:700;">[TOY PROJECT 1 - SQL INJECTION SANDBOX]</span><br>
  - <span style="color:var(--secondary)">Description:</span> SQL Injection 공격 구문의 동작 원리를 가시적으로 파악할 수 있는 보안 모의 실습장.<br>
  - <span style="color:var(--secondary)">Implementation:</span> 순수 HTML5/CSS3/JavaScript (Vanilla DOM 제어)<br>
  - <span style="color:var(--secondary)">Features:</span> ' OR '1'='1 등의 공격 쿼리 분석, 백엔드 변조 쿼리 시각화, 가상 데이터 유출 모의 시뮬레이터.<br>
  - <span style="color:var(--success); font-weight:600;">- Live URL: <a href="toy-sql-sandbox.html" target="_blank" style="color:var(--success); font-weight:700; text-decoration:underline;">[Open SQL Sandbox]</a></span>
</div>
    `;
    createLine(toy1Text);
  }

  function showToy2() {
    const toy2Text = `
<div style="margin-top:6px; font-size:0.8rem; line-height:1.7;">
  <span style="color:var(--accent); font-weight:700;">[TOY PROJECT 2 - SECURE TASK MANAGER]</span><br>
  - <span style="color:var(--secondary)">Description:</span> 로컬스토리지 저장 할 일 데이터를 사용자 Access Key로 가상 암호화 보관하는 보안 일정 플래너.<br>
  - <span style="color:var(--secondary)">Implementation:</span> HTML/CSS, Local Storage, XOR/Base64 암호화 필터 알고리즘, CRUD 엔진.<br>
  - <span style="color:var(--secondary)">Features:</span> 일정 중요도 매핑, 카테고리 필터링, 암호 키 검증, 군사 작전판 스타일의 다크 네온 대시보드 UI.<br>
  - <span style="color:var(--success); font-weight:600;">- Live URL: <a href="toy-secure-todo.html" target="_blank" style="color:var(--success); font-weight:700; text-decoration:underline;">[Open Secure Todo]</a></span>
</div>
    `;
    createLine(toy2Text);
  }
});
