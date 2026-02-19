// ===========================
// INIT STOVES & TABLES
// ===========================
function initStovesAndTables() {
  state.stoves = [];
  for (let i = 0; i < 4; i++) {
    state.stoves.push({ id:i, cooking:false, recipe:null, progress:0, startTime:0, tableId:null });
  }
  state.tables = [];
  for (let i = 0; i < 8; i++) {
    state.tables.push({ id:i, occupied:false, customer:null, status:'empty', recipe:null });
  }
}
initStovesAndTables();

// ===========================
// DYNAMIC TABLE/STOVE HTML
// ===========================
function buildDiningArea() {
  const da = document.getElementById('dining-area');
  da.innerHTML = '';
  for (let i = 0; i < 8; i++) {
    const pos = TABLE_POSITIONS[i];
    const div = document.createElement('div');
    div.className = 'table-group' + (i < state.numTables ? ' active' : '');
    div.id = 'table-' + i;
    div.style.cssText = `top:${pos.top}px;left:${pos.left}px;`;
    div.innerHTML = `
      <div class="order-bubble"></div>
      <div class="customer-bubble"></div>
      <div class="seated-customer"></div>
      <div class="eating-indicator"></div>
      <div class="table-surface">
        <div class="table-cloth"></div>
        <div class="served-dish"></div>
        <div class="chair left"></div>
        <div class="chair right"></div>
      </div>`;
    da.appendChild(div);
    // 기존에 착석한 손님 상태 복원
    const table = state.tables[i];
    if(table && table.occupied && table.customer) {
      const sc = div.querySelector('.seated-customer');
      sc.textContent = table.customer.emoji;
      sc.classList.add('show');
      if(table.status === 'waiting_order') {
        const ob = div.querySelector('.order-bubble');
        ob.textContent = table.recipe.icon;
        ob.classList.add('show');
        ob.onclick = () => takeOrder(table);
      } else if(table.status === 'eating') {
        div.querySelector('.served-dish').textContent = table.recipe.icon;
        div.querySelector('.served-dish').classList.add('show');
        div.querySelector('.eating-indicator').textContent = '😋';
        div.querySelector('.eating-indicator').classList.add('show');
      }
    }
  }
  // 스킨 스타일 재적용 (DOM 재생성 후)
  if(typeof applySkinStyles === 'function') applySkinStyles();
}

function updateStoveVisibility() {
  for (let i = 0; i < 4; i++) {
    const el = document.getElementById('stove-' + i);
    const pos = STOVE_POSITIONS[i];
    el.style.top = pos.top + 'px';
    el.style.left = pos.left + 'px';
    if (i < state.numStoves) el.classList.add('active');
    else el.classList.remove('active');
  }
}

buildDiningArea();
updateStoveVisibility();
// buildDiningArea에서 hall+entrance 적용, 여기서 stove 포함 전체 재적용
setTimeout(() => { if(typeof applySkinStyles === 'function') applySkinStyles(); }, 0);

// ===========================
// DOM REFS
// ===========================
const goldDisplay = document.getElementById('gold-display');
const gemDisplay = document.getElementById('gem-display');
const followerDisplay = document.getElementById('follower-display');
const promoGauge = document.getElementById('promo-gauge');
const promoBtn = document.getElementById('promo-btn');
const chefEl = document.getElementById('chef');
const chefBubble = document.getElementById('chef-bubble');
const waitingArea = document.getElementById('waiting-area');
const toastEl = document.getElementById('toast');
const stoveQueueDisplay = document.getElementById('stove-queue-display');
const gameContainer = document.getElementById('game-container');

// ===========================
// RESPONSIVE SCALING (화면 맞춤)
// ===========================
const DESIGN_W = 390;
const DESIGN_H = 844;
const MIN_SCALE = 0.55;

function fitToScreen() {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  // 세로 기준으로 스케일 계산
  let scale = vh / DESIGN_H;
  // 가로도 넘치지 않게
  const scaleW = vw / DESIGN_W;
  scale = Math.min(scale, scaleW);
  // 최소치 적용
  scale = Math.max(scale, MIN_SCALE);
  // 1보다 크면 그대로(확대 안함)
  scale = Math.min(scale, 1);
  gameContainer.style.transform = `scale(${scale})`;
  // body 높이를 실제 렌더 크기에 맞춰서 스크롤 방지
  document.body.style.height = (DESIGN_H * scale) + 'px';
  document.body.style.minHeight = (DESIGN_H * scale) + 'px';
}
fitToScreen();
window.addEventListener('resize', fitToScreen);
// iOS Safari에서 orientation 변경 시
window.addEventListener('orientationchange', () => setTimeout(fitToScreen, 200));

// ===========================
// UTILITIES
// ===========================
function randomFrom(arr) { return arr[Math.floor(Math.random()*arr.length)]; }
function formatGold(n) {
  if(n>=1000000) return (n/1000000).toFixed(1)+'M';
  if(n>=1000) return (n/1000).toFixed(1)+'k';
  return n.toString();
}
// 레벨에 따른 요리 속성 계산 (초기값의 10%씩 증가, 최대 100)
function getRecipeStats(recipe, level) {
  const mult = 1 + (level - 1) * 0.1;
  return {
    taste: Math.min(100, Math.round(recipe.taste * mult)),
    deco: Math.min(100, Math.round(recipe.deco * mult)),
    health: Math.min(100, Math.round(recipe.health * mult)),
  };
}
function showToast(msg) { toastEl.textContent=msg; toastEl.classList.add('show'); setTimeout(()=>toastEl.classList.remove('show'),1500); }
function showChefBubble(text) {
  chefBubble.textContent=text; chefBubble.classList.add('show');
  clearTimeout(chefBubble._t); chefBubble._t=setTimeout(()=>chefBubble.classList.remove('show'),2000);
}
function updateHUD() {
  goldDisplay.textContent=formatGold(state.gold);
  gemDisplay.textContent=state.gems;
  followerDisplay.textContent=formatGold(state.followers);
  promoGauge.textContent=state.promoCount;
  // 가게 등급 표시
  const rankData = SHOP_RANKS[state.shopRank];
  const rankEl = document.querySelector('#profile-info .rank');
  if(rankEl) rankEl.textContent = rankData ? rankData.name : '이름모를 작은 식당';
}
// 치트: 도토리 표시 터치 시 +1000
goldDisplay.parentElement.addEventListener('click', ()=>{ state.gold+=1000; updateHUD(); showToast('🌰 +1000 치트!'); });
function showFloatingGold(amt,x,y) {
  const el=document.createElement('div'); el.className='float-gold'; el.textContent=`+${formatGold(amt)}`;
  el.style.left=x+'px'; el.style.top=y+'px'; gameContainer.appendChild(el); setTimeout(()=>el.remove(),1200);
}
function showFloatingTip(amt,x,y) {
  const el=document.createElement('div'); el.className='float-gold float-tip'; el.textContent=`+${formatGold(amt)} 팁`;
  el.style.left=x+'px'; el.style.top=y+'px'; gameContainer.appendChild(el); setTimeout(()=>el.remove(),1200);
}
function getExpForLevel(lv) { return Math.floor(50 * Math.pow(1.15, lv-1)); }
function getOwnedRecipeObjects() {
  return state.ownedRecipes.map(o => ({ ...ALL_RECIPES.find(r=>r.id===o.recipeId), ...o }));
}
function getActiveRecipes() {
  return state.ownedRecipes.map(o => ALL_RECIPES.find(r=>r.id===o.recipeId)).filter(Boolean);
}

// ===========================
// CUSTOMER SPEECH (손님 말풍선)
// ===========================
function getCustomerSpeech(customerId, situation) {
  const cData = CUSTOMERS_DATA.find(c => c.id === customerId);
  const style = (cData && cData.speechStyle) || 'default';
  const pool = CUSTOMER_SPEECH[situation];
  if(!pool) return null;
  const lines = pool[style] || pool.default;
  if(!lines || !lines.length) return null;
  return randomFrom(lines);
}

function getCustomerLeavingSpeech(customerId, isPositive) {
  const cData = CUSTOMERS_DATA.find(c => c.id === customerId);
  const style = (cData && cData.speechStyle) || 'default';
  const pool = CUSTOMER_SPEECH.leaving;
  if(!pool) return null;
  const stylePool = pool[style] || pool.default;
  if(!stylePool) return null;
  const lines = isPositive ? stylePool.positive : stylePool.negative;
  if(!lines || !lines.length) return null;
  return randomFrom(lines);
}

function showCustomerBubble(tableId, text, duration) {
  const el = document.getElementById('table-' + tableId);
  if(!el) return;
  // order-bubble이 보이면 대사를 표시하지 않음
  const ob = el.querySelector('.order-bubble');
  if(ob && ob.classList.contains('show')) return;
  const bubble = el.querySelector('.customer-bubble');
  if(!bubble) return;
  bubble.textContent = text;
  bubble.classList.add('show');
  clearTimeout(bubble._bubbleTimer);
  bubble._bubbleTimer = setTimeout(() => bubble.classList.remove('show'), duration || 2500);
}

function showWaitingBubble(idx, text) {
  const waitingCustomers = waitingArea.querySelectorAll('.waiting-customer');
  if(idx >= waitingCustomers.length) return;
  const span = waitingCustomers[idx];
  // 기존 버블 제거
  const existing = waitingArea.querySelector('.waiting-bubble');
  if(existing) existing.remove();
  // 새 버블 생성
  const bubble = document.createElement('div');
  bubble.className = 'waiting-bubble';
  bubble.textContent = text;
  bubble.style.left = span.offsetLeft + 'px';
  waitingArea.appendChild(bubble);
  requestAnimationFrame(() => requestAnimationFrame(() => bubble.classList.add('show')));
  setTimeout(() => {
    bubble.classList.remove('show');
    setTimeout(() => bubble.remove(), 300);
  }, 2500);
}

// ===========================
// PROMO
// ===========================
promoBtn.addEventListener('click', () => {
  state.promoCount++;
  promoBtn.querySelector('.nav-icon').style.transform='scale(0.85)';
  setTimeout(()=>promoBtn.querySelector('.nav-icon').style.transform='',100);
  if(state.promoCount>=PROMO_CLICKS_NEEDED) {
    state.promoCount=0; addCustomerToQueue(); showChefBubble('손님 오셨거덩요!');
  }
  updateHUD();
});

// ===========================
// CUSTOMER QUEUE
// ===========================
function getEligibleCustomers() {
  return CUSTOMERS_DATA.filter(c => {
    if(!c.conditions) return true;
    const cond = c.conditions;
    if(cond.minFollowers && state.followers < cond.minFollowers) return false;
    if(cond.minCookingLevel && state.cookingLevel < cond.minCookingLevel) return false;
    if(cond.requiredRecipe && !state.ownedRecipes.some(o => o.recipeId === cond.requiredRecipe)) return false;
    return true;
  });
}
function addCustomerToQueue() {
  const eligible = getEligibleCustomers();
  if(!eligible.length) return;
  const isRare = Math.random() < 0.05;
  const pool = isRare ? eligible.filter(c=>c.rare) : eligible.filter(c=>!c.rare);
  const finalPool = pool.length ? pool : eligible.filter(c=>!c.rare);
  if(!finalPool.length) return;
  const picked = randomFrom(finalPool);
  if(!state.discoveredCustomers.includes(picked.id)) {
    state.discoveredCustomers.push(picked.id);
    showToast(`📖 새로운 손님 발견: ${picked.name}!`);
  }
  state.waitingQueue.push({ customerId:picked.id, emoji:picked.emoji, name:picked.name, followers:picked.followers, rare:picked.rare||false });
  renderWaitingQueue(); trySeatingCustomer();
}
function renderWaitingQueue() {
  waitingArea.querySelectorAll('.waiting-customer').forEach(el=>el.remove());
  state.waitingQueue.forEach((c,i) => {
    const el=document.createElement('span'); el.className='waiting-customer'; el.textContent=c.emoji;
    el.style.transitionDelay=(i*0.05)+'s'; waitingArea.appendChild(el);
    requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('show')));
  });
}

// ===========================
// SEATING
// ===========================
function trySeatingCustomer() {
  while(state.waitingQueue.length) {
    const empty = state.tables.find(t => t.id < state.numTables && !t.occupied);
    if(!empty) break;
    const c = state.waitingQueue.shift();
    seatCustomer(empty, c);
  }
  renderWaitingQueue();
}
function seatCustomer(table, customer) {
  table.occupied=true; table.customer=customer; table.status='waiting_order';
  const allOwned = getActiveRecipes();
  let recipe = null;
  const cData = customer.customerId ? CUSTOMERS_DATA.find(c=>c.id===customer.customerId) : null;
  if(cData && cData.preference) {
    const pref = cData.preference;
    if(pref.recipeId) {
      const preferred = allOwned.find(r=>r.id===pref.recipeId);
      recipe = preferred || randomFrom(allOwned);
    } else if(pref.category) {
      const catRecipes = allOwned.filter(r=>r.category===pref.category);
      recipe = catRecipes.length ? randomFrom(catRecipes) : randomFrom(allOwned);
    }
  }
  if(!recipe) recipe = randomFrom(allOwned);
  table.recipe = recipe;
  const el=document.getElementById('table-'+table.id);
  el.querySelector('.seated-customer').textContent=customer.emoji;
  el.querySelector('.seated-customer').classList.add('show');
  setTimeout(()=>{
    const ob=el.querySelector('.order-bubble');
    ob.textContent=table.recipe.icon; ob.classList.add('show');
    ob.onclick=()=>takeOrder(table);
  },600);
}

// ===========================
// ORDER
// ===========================
function takeOrder(table) {
  if(table.status!=='waiting_order') return;
  table.status='ordered';
  const el=document.getElementById('table-'+table.id);
  const ob=el.querySelector('.order-bubble'); ob.classList.remove('show'); ob.onclick=null;
  showChefBubble('주문 받았거덩요!');
  const free = state.stoves.find(s => s.id < state.numStoves && !s.cooking);
  if(free) startCooking(free,table.recipe,table.id);
  else { state.stoveQueue.push({recipe:table.recipe,tableId:table.id}); updateStoveQueueDisplay(); showToast('화구 대기 중...'); }
}
function updateStoveQueueDisplay() {
  stoveQueueDisplay.textContent = state.stoveQueue.length ? '대기: '+state.stoveQueue.map(q=>q.recipe.icon).join('') : '';
}

// ===========================
// COOKING
// ===========================
function getCookTimeMultiplier() {
  let mult = 1;
  state.ownedSkills.forEach(os => {
    const sk = ALL_SKILLS.find(s=>s.id===os.skillId);
    if(sk.id==='s1') mult -= 0.03 * os.level;
    if(sk.id==='s2') mult -= 0.05 * os.level;
  });
  // 주방장 보너스
  if(state.hiredStaff['headchef']) {
    const hc = STAFF_DATA.find(s=>s.id==='headchef');
    const lv = state.hiredStaff['headchef'].level;
    mult -= hc.baseEffects.cookTimeReduction + hc.levelEffects.cookTimeReduction * (lv - 1);
  }
  return Math.max(0.3, mult);
}

function startCooking(stove, recipe, tableId) {
  stove.cooking=true; stove.recipe=recipe; stove.tableId=tableId;
  stove.startTime=Date.now(); stove.progress=0;
  const el=document.getElementById('stove-'+stove.id);
  el.classList.add('cooking'); el.querySelector('.dish-label').textContent=recipe.name;
  moveChefToStove(stove.id); updateChefState();
  // 대기가 길어질 때 대사 (cookTime > 20초, cookTime의 60% 후, 25% 확률)
  const cookMult = getCookTimeMultiplier();
  const actualCookTime = recipe.cookTime * cookMult;
  if(actualCookTime > 20000 && Math.random() < 0.25) {
    const table = state.tables.find(t => t.id === tableId);
    if(table && table.customer && table.customer.customerId) {
      const waitLongCustomerId = table.customer.customerId;
      const waitLongTableId = tableId;
      setTimeout(() => {
        const speech = getCustomerSpeech(waitLongCustomerId, 'waiting_long');
        if(speech) showCustomerBubble(waitLongTableId, speech, 3000);
      }, Math.floor(actualCookTime * 0.6));
    }
  }
}
function updateCooking() {
  const now=Date.now();
  state.stoves.forEach(stove => {
    if(!stove.cooking || stove.id >= state.numStoves) return;
    const cookMult = getCookTimeMultiplier();
    const totalTime = stove.recipe.cookTime * cookMult;
    const elapsed=now-stove.startTime;
    const progress=Math.min(elapsed/totalTime,1); stove.progress=progress;
    const el=document.getElementById('stove-'+stove.id);
    el.querySelector('.progress-fill').style.width=(progress*100)+'%';
    if(progress>=1) completeCooking(stove);
  });
  updateChefState();
}
function completeCooking(stove) {
  stove.cooking=false;
  const el=document.getElementById('stove-'+stove.id);
  el.classList.remove('cooking'); el.querySelector('.progress-fill').style.width='0%';
  el.querySelector('.dish-label').textContent='';
  showChefBubble('요리 완성이거덩요!');
  serveFood(stove.tableId,stove.recipe);
  stove.recipe=null; stove.tableId=null;
  if(state.stoveQueue.length) {
    const next=state.stoveQueue.shift(); updateStoveQueueDisplay();
    setTimeout(()=>startCooking(stove,next.recipe,next.tableId),300);
  }
}

// ===========================
// SERVE & LEAVE
// ===========================
function serveFood(tableId, recipe) {
  const table=state.tables.find(t=>t.id===tableId); if(!table) return;
  table.status='eating';
  const el=document.getElementById('table-'+tableId);
  el.querySelector('.served-dish').textContent=recipe.icon;
  el.querySelector('.served-dish').classList.add('show');
  el.querySelector('.eating-indicator').textContent='😋';
  el.querySelector('.eating-indicator').classList.add('show');
  // 식사 중 대사 (eatTime의 50% 후, 30% 확률)
  if(table.customer && table.customer.customerId && Math.random() < 0.30) {
    const eatSpeechDelay = Math.floor(recipe.eatTime * 0.5);
    const eatCustomerId = table.customer.customerId;
    const eatTableId = tableId;
    setTimeout(() => {
      const speech = getCustomerSpeech(eatCustomerId, 'eating');
      if(speech) showCustomerBubble(eatTableId, speech);
    }, eatSpeechDelay);
  }
  setTimeout(()=>customerLeave(table,recipe), recipe.eatTime);
}
function customerLeave(table, recipe) {
  const customer = table.customer;
  const customerId = customer ? customer.customerId : null;

  // 퇴장 시 대사 (40% 확률, 퇴장 전에 표시)
  if(customerId && Math.random() < 0.40) {
    // tipRate 기반 긍정/부정 판단 (아직 계산 전이므로 loyalty로 추정)
    const visits = customerId ? (state.customerVisits[customerId]||0) : 0;
    const loyalty = getLoyaltyLevel(visits);
    const isPositive = loyalty.level >= 2 || Math.random() > 0.3;
    const speech = getCustomerLeavingSpeech(customerId, isPositive);
    if(speech) showCustomerBubble(table.id, speech, 1500);
  }

  table.status='empty'; table.occupied=false;
  const el=document.getElementById('table-'+table.id);
  // 퇴장 대사가 보이도록 약간의 딜레이 후 hide (customer-bubble은 자체 타이머로 사라짐)
  el.querySelector('.seated-customer').classList.remove('show');
  el.querySelector('.served-dish').classList.remove('show');
  el.querySelector('.eating-indicator').classList.remove('show');

  // 방문 횟수 추적 & 단골 레벨업
  if(customerId) {
    if(!state.customerVisits[customerId]) state.customerVisits[customerId] = 0;
    const prevVisits = state.customerVisits[customerId];
    state.customerVisits[customerId]++;
    const newVisits = state.customerVisits[customerId];
    const prevLoyalty = getLoyaltyLevel(prevVisits);
    const newLoyalty = getLoyaltyLevel(newVisits);
    if(newLoyalty.level > prevLoyalty.level) {
      showToast(`💛 ${customer.name} 단골 LV.${newLoyalty.level}!`);
    }
  }

  // 가격 계산
  let price = recipe.basePrice;
  const owned = state.ownedRecipes.find(o=>o.recipeId===recipe.id);
  if(owned) price = Math.floor(price * (1 + (owned.level-1)*0.5));
  price = Math.floor(price * (1 + (state.cookingLevel-1)*0.02));
  state.ownedSkills.forEach(os => {
    const sk=ALL_SKILLS.find(s=>s.id===os.skillId);
    if(sk.id==='s3' && recipe.category==='양식') price=Math.floor(price*(1+0.08*os.level));
    if(sk.id==='s4' && recipe.category==='한식') price=Math.floor(price*(1+0.08*os.level));
    if(sk.id==='s5' && recipe.category==='일식') price=Math.floor(price*(1+0.08*os.level));
    if(sk.id==='s6' && recipe.category==='디저트') price=Math.floor(price*(1+0.10*os.level));
    if(sk.id==='s12') price=Math.floor(price*(1+0.05*os.level));
    if(sk.id==='s14') price=Math.floor(price*(1+0.10*os.level));
    if(sk.id==='s16') price=Math.floor(price*(1+0.15*os.level));
  });

  // 주방장 가격 보너스
  if(state.hiredStaff['headchef']) {
    const hc = STAFF_DATA.find(s=>s.id==='headchef');
    const hcLv = state.hiredStaff['headchef'].level;
    const bonus = hc.baseEffects.priceBonus + hc.levelEffects.priceBonus * (hcLv - 1);
    price = Math.floor(price * (1 + bonus));
  }

  // 단골 보너스
  const visits = customerId ? (state.customerVisits[customerId]||0) : 0;
  const loyalty = getLoyaltyLevel(visits);
  price = Math.floor(price * (1 + loyalty.priceBonus));

  // 팁 계산
  let tipRate = 0.05 + (loyalty.level - 1) * 0.03;
  state.ownedSkills.forEach(os => { if(os.skillId==='s7') tipRate += 0.05*os.level; });
  // 서버 팁 보너스
  if(state.hiredStaff['server']) {
    const sv = STAFF_DATA.find(s=>s.id==='server');
    const svLv = state.hiredStaff['server'].level;
    tipRate += sv.baseEffects.tipBonus + sv.levelEffects.tipBonus * (svLv - 1);
  }
  const tip = Math.floor(price * tipRate);

  state.gold += price + tip;
  state.totalServed++;
  state.cookingExp += 10;

  const rect=el.getBoundingClientRect(); const cr=gameContainer.getBoundingClientRect();
  const s = cr.width / DESIGN_W || 1;
  const fx = (rect.left-cr.left)/s+40, fy = (rect.top-cr.top)/s;
  showFloatingGold(price, fx, fy);
  if(tip > 0) setTimeout(()=>showFloatingTip(tip, fx, fy-20), 200);

  // 병스타그램: 팔로워 증가 (20%)
  if(Math.random() < 0.20) {
    state.followers++;
    showToast('📸 팔로워 +1!');
  }
  // 병스타그램: 태그 피드 (10%)
  if(customer && Math.random() < 0.10) {
    const feedCustomer = { customerId:customerId, emoji:customer.emoji, name:customer.name, followers:customer.followers };
    const feedContext = {
      price, basePrice: recipe.basePrice,
      priceRatio: price / recipe.basePrice,
      tip, tipRate,
      cookTimeMs: recipe.cookTime * getCookTimeMultiplier(),
      visits, loyaltyLevel: loyalty.level,
      recipeRarity: recipe.rarity,
    };
    setTimeout(() => addTagFeed(feedCustomer, recipe, feedContext), 10000);
  }

  updateHUD(); table.customer=null; table.recipe=null;
  setTimeout(()=>trySeatingCustomer(),500);
}

// ===========================
// CHEF MOVEMENT
// ===========================
function moveChefToStove(id) {
  const pos = STOVE_POSITIONS[id];
  chefEl.style.left=(pos.left+5)+'px'; chefEl.style.top=(pos.top+95)+'px';
}
function updateChefState() {
  const cooking=state.stoves.filter(s=>s.id<state.numStoves&&s.cooking);
  if(state.hiredStaff['headchef']) {
    // 주방장 고용: 주인공은 요리 안 함, NPC가 화구 담당
    chefEl.classList.remove('cooking');
    const npc = staffNPCElements['headchef'];
    if(cooking.length && npc) {
      npc.classList.add('busy');
      if(cooking.length>1) { const i=Math.floor(Date.now()/1500)%cooking.length; const p=STOVE_POSITIONS[cooking[i].id]; npc.style.top=(p.top+95)+'px'; npc.style.left=(p.left+5)+'px'; }
      else { const p=STOVE_POSITIONS[cooking[0].id]; npc.style.top=(p.top+95)+'px'; npc.style.left=(p.left+5)+'px'; }
    } else if(npc) {
      npc.classList.remove('busy'); npc.style.top='210px'; npc.style.left='100px';
    }
    return;
  }
  // 기본 행동
  if(!cooking.length) { chefEl.classList.remove('cooking'); chefEl.style.left='170px'; chefEl.style.top='210px'; return; }
  chefEl.classList.add('cooking');
  if(cooking.length>1) { const i=Math.floor(Date.now()/1500)%cooking.length; moveChefToStove(cooking[i].id); }
  else moveChefToStove(cooking[0].id);
}

// ===========================
// PANEL SYSTEM
// ===========================
function openPanel(id) { document.getElementById(id).classList.add('show'); }
function closePanel(id) { document.getElementById(id).classList.remove('show'); }

document.querySelectorAll('.panel-close').forEach(btn => {
  btn.addEventListener('click', ()=> closePanel(btn.dataset.panel));
});
document.querySelectorAll('.panel-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => { if(e.target===overlay) closePanel(overlay.id); });
});

// Tab switching
document.querySelectorAll('.panel-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const parent = tab.closest('.panel-overlay');
    parent.querySelectorAll('.panel-tab').forEach(t=>t.classList.remove('active'));
    parent.querySelectorAll('.panel-body').forEach(b=>b.style.display='none');
    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).style.display='block';
    if(tab.dataset.tab==='study-learn') renderStudyLearn();
    if(tab.dataset.tab==='study-skills') renderStudySkills();
    if(tab.dataset.tab==='recipe-gacha') renderGacha();
    if(tab.dataset.tab==='recipe-menu') renderMenu();
    if(tab.dataset.tab==='sns-my') renderSNSMy();
    if(tab.dataset.tab==='sns-tag') renderSNSTag();
    if(tab.dataset.tab==='shop-expand') renderShopExpand();
    if(tab.dataset.tab==='shop-interior') renderInterior();
    if(tab.dataset.tab==='profile-info-tab') renderProfileInfo();
    if(tab.dataset.tab==='profile-rank-tab') renderProfileRank();
  });
});

// Nav buttons
document.getElementById('nav-study').addEventListener('click', ()=>{ renderStudyLearn(); openPanel('panel-study'); });
document.getElementById('nav-recipe').addEventListener('click', ()=>{ renderGacha(); openPanel('panel-recipe'); });
document.getElementById('nav-shop').addEventListener('click', ()=>{ renderShopExpand(); openPanel('panel-shop'); });
document.getElementById('nav-staff').addEventListener('click', ()=>{ renderStaffPanel(); openPanel('panel-staff'); });
document.querySelectorAll('.side-btn').forEach(b=>{
  if(b.id==='side-sns' || b.id==='side-customer' || b.id==='side-contest') return;
  b.addEventListener('click',()=>showToast('아직 준비중이거덴요!'));
});
document.getElementById('profile-icon').addEventListener('click', ()=>{ renderProfileInfo(); openPanel('panel-profile'); });
document.getElementById('side-contest').addEventListener('click', ()=>{ renderContestList(); openPanel('panel-contest'); });
document.getElementById('side-sns').addEventListener('click', ()=>{ state.newTagCount=0; updateSNSBadge(); renderSNSMy(); renderSNSTag(); openPanel('panel-sns'); });
document.getElementById('side-customer').addEventListener('click', ()=>{ renderCustomerCollection(); openPanel('panel-customer'); });
document.getElementById('customer-detail-modal').addEventListener('click', e=>{ if(e.target.id==='customer-detail-modal') closeCustomerDetail(); });
document.getElementById('staff-detail-modal').addEventListener('click', e=>{ if(e.target.id==='staff-detail-modal') closeStaffDetail(); });
document.getElementById('contest-select-modal').addEventListener('click', e=>{ if(e.target.id==='contest-select-modal') closeContestSelect(); });
document.getElementById('contest-result-modal').addEventListener('click', e=>{ if(e.target.id==='contest-result-modal') closeContestResult(); });

// ===========================
// STUDY PANEL
// ===========================
function renderStudyLearn() {
  const expNeeded = getExpForLevel(state.cookingLevel);
  const pct = Math.min(state.cookingExp / expNeeded * 100, 100);
  const cost = Math.floor(30 * Math.pow(1.1, state.cookingLevel-1));
  const canAfford = state.gold >= cost;
  const nextSkillLv = Math.ceil(state.cookingLevel / 10) * 10;
  // 스킬 대기 상태: 10의 배수 레벨이고 아직 스킬을 안 뽑은 상태
  const isSkillReady = state.pendingSkillPick === true;

  document.getElementById('study-learn').innerHTML = `
    <div class="study-level-box">
      <div class="label">요리 레벨</div>
      <div class="value">LV. ${state.cookingLevel}</div>
      <div class="effect">요리 가격 +${((state.cookingLevel-1)*2)}%</div>
      <div class="study-progress"><div class="study-progress-fill" style="width:${pct}%"></div></div>
      <div class="study-cost">🌰 ${formatGold(cost)} 도토리</div>
      ${isSkillReady
        ? `<button class="btn-primary" onclick="openSkillPick()">🎴 요리 스킬 획득!</button>`
        : `<button class="btn-primary" ${canAfford?'':'disabled'} onclick="doStudyLevelUp()">레벨업</button>`
      }
    </div>
    <div class="skill-next-info">다음 스킬 획득: LV. ${nextSkillLv > state.cookingLevel ? nextSkillLv : state.cookingLevel + (10 - state.cookingLevel%10)}</div>
  `;
}

function doStudyLevelUp() {
  if(state.pendingSkillPick) return; // 스킬 선택 대기 중에는 레벨업 불가
  const cost = Math.floor(30 * Math.pow(1.1, state.cookingLevel-1));
  if(state.gold < cost) return;
  state.gold -= cost;
  state.cookingLevel++;
  state.cookingExp = 0;
  updateHUD();
  showToast(`요리 레벨 ${state.cookingLevel} 달성!`);
  // 병스타그램: 50레벨마다 피드
  if(state.cookingLevel % 50 === 0) {
    addMyFeed(`요리 레벨 ${state.cookingLevel} 달성! 🔥`, '📖');
  }
  if(state.cookingLevel % 10 === 0) {
    // 10레벨 달성! 스킬 선택 대기 상태로 전환 후 바로 모달 오픈
    state.pendingSkillPick = true;
    renderStudyLearn();
    setTimeout(() => openSkillPick(), 400);
    return;
  }
  renderStudyLearn();
}

// ===========================
// SKILL PICK
// ===========================
function openSkillPick() {
  // 3장 랜덤 선택 (중복 방지)
  const pool = [...ALL_SKILLS];
  const picks = [];
  while(picks.length < 3 && pool.length) {
    const idx = Math.floor(Math.random()*pool.length);
    picks.push(pool.splice(idx,1)[0]);
  }
  const container = document.getElementById('skill-pick-cards');
  container.innerHTML = '';
  picks.forEach(sk => {
    const card = document.createElement('div');
    card.className = 'skill-pick-card';
    card.innerHTML = `
      <div class="sp-icon">${sk.icon}</div>
      <div class="sp-name">${sk.name}</div>
      <div class="sp-desc">${sk.desc}</div>
      <div class="sp-rarity" style="color:${RARITY_COLORS[sk.rarity]}">${RARITY_NAMES[sk.rarity]||sk.rarity}</div>
    `;
    card.onclick = () => pickSkill(sk);
    container.appendChild(card);
  });
  document.getElementById('skill-pick-modal').classList.add('show');
}

function pickSkill(sk) {
  const existing = state.ownedSkills.find(o=>o.skillId===sk.id);
  if(existing) { existing.level++; showToast(`${sk.name} LV.${existing.level}!`); }
  else { state.ownedSkills.push({skillId:sk.id, level:1}); showToast(`${sk.name} 획득!`); }
  document.getElementById('skill-pick-modal').classList.remove('show');
  state.pendingSkillPick = false; // 스킬 선택 완료
  state.cookingExp = 0;
  renderStudyLearn();
}

function renderStudySkills() {
  const container = document.getElementById('study-skills');
  let html = '<div class="skill-grid">';
  ALL_SKILLS.forEach(sk => {
    const owned = state.ownedSkills.find(o=>o.skillId===sk.id);
    html += `<div class="skill-card ${owned?'owned':'locked'}">
      <span class="skill-rarity rarity-${sk.rarity}">${(RARITY_NAMES[sk.rarity]||'').slice(0,1)}</span>
      <div class="sk-icon">${sk.icon}</div>
      <div class="sk-name">${sk.name}</div>
      ${owned ? `<div class="sk-lv">LV.${owned.level}</div>` : ''}
    </div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

// ===========================
// RECIPE GACHA
// ===========================
function renderGacha() {
  document.getElementById('recipe-gacha').innerHTML = `
    <div class="recipe-gacha-area">
      <div class="gacha-pot" id="gacha-pot">🍯</div>
      <div class="gacha-items">
        <div class="gacha-item-box">
          <div class="gi-icon">📗</div>
          <div class="gi-name">낡은 레시피 책</div>
          <div class="gi-count">${state.recipeBooks}개</div>
        </div>
      </div>
      <div class="gacha-btns">
        <button class="btn-primary" ${state.recipeBooks>=1?'':'disabled'} onclick="doGacha(1)">연구 1회</button>
        <button class="btn-primary" ${state.recipeBooks>=3?'':'disabled'} onclick="doGacha(3)" style="background:linear-gradient(135deg,#9b59b6,#8e44ad)">연구 3회</button>
      </div>
    </div>
  `;
}

// 뽑기 결과 큐 (여러 장 뽑을 때 순차 표시용)
let gachaResultQueue = [];
let gachaResultTotal = 0;
let gachaResultIndex = 0;

function doGacha(count) {
  if(state.recipeBooks < count) return;
  state.recipeBooks -= count;
  updateHUD();

  // shaking animation
  const pot = document.getElementById('gacha-pot');
  pot.classList.add('shaking');
  setTimeout(() => {
    pot.classList.remove('shaking');
    // 결과를 큐에 모아두기
    gachaResultQueue = [];
    for(let i=0; i<count; i++) {
      const roll = Math.random();
      let rarity;
      if(roll < 0.45) rarity='normal';
      else if(roll < 0.75) rarity='rare';
      else if(roll < 0.92) rarity='epic';
      else if(roll < 0.99) rarity='legend';
      else rarity='myth';

      const pool = ALL_RECIPES.filter(r=>r.rarity===rarity);
      const picked = randomFrom(pool);

      const existing = state.ownedRecipes.find(o=>o.recipeId===picked.id);
      if(existing) {
        existing.duplicates++;
        gachaResultQueue.push({ recipe:picked, isDup:true, owned:existing });
      } else {
        const newOwned = { recipeId:picked.id, level:1, duplicates:0 };
        state.ownedRecipes.push(newOwned);
        gachaResultQueue.push({ recipe:picked, isDup:false, owned:newOwned });
        // 병스타그램: 새 레시피 피드
        addMyFeed(`메뉴에 ${picked.name}${picked.icon}가 추가되었어요!`, picked.icon);
      }
    }
    gachaResultTotal = gachaResultQueue.length;
    gachaResultIndex = 0;
    showNextGachaResult();
    renderGacha();
  }, 800);
}

function showNextGachaResult() {
  if(gachaResultIndex >= gachaResultQueue.length) {
    document.getElementById('gacha-result-modal').classList.remove('show');
    return;
  }
  const { recipe, isDup, owned } = gachaResultQueue[gachaResultIndex];
  const card = document.getElementById('gacha-result-card');
  const dupsNeeded = owned.level * 2;
  const counter = gachaResultTotal > 1 ? `<div style="font-size:11px;color:#888;margin-bottom:8px">${gachaResultIndex+1} / ${gachaResultTotal}</div>` : '';
  card.innerHTML = `
    ${counter}
    <div class="gr-icon">${recipe.icon}</div>
    <div class="gr-name">${recipe.name}</div>
    <div class="gr-rarity" style="color:${RARITY_COLORS[recipe.rarity]}">${RARITY_NAMES[recipe.rarity]}</div>
    <div class="gr-info">가격: 🌰${recipe.basePrice} | 맛:${recipe.taste} | 데코:${recipe.deco} | 건강:${recipe.health}</div>
    ${isDup ? `<div class="gr-dup">이미 보유! (${owned.duplicates}/${dupsNeeded} 중복 카드)</div>` : '<div class="gr-dup" style="color:#FFD700">✨ 새로운 레시피!</div>'}
  `;
  // re-trigger animation
  card.style.animation = 'none';
  card.offsetHeight;
  card.style.animation = '';
  document.getElementById('gacha-result-modal').classList.add('show');
}

function closeGachaResult() {
  gachaResultIndex++;
  if(gachaResultIndex < gachaResultQueue.length) {
    showNextGachaResult();
  } else {
    document.getElementById('gacha-result-modal').classList.remove('show');
  }
}

// ===========================
// MENU LIST
// ===========================
function renderMenu() {
  const container = document.getElementById('recipe-menu');
  let html = '<div class="menu-grid">';
  ALL_RECIPES.forEach(r => {
    const owned = state.ownedRecipes.find(o=>o.recipeId===r.id);
    const cls = owned ? 'owned' : 'locked';
    const dupsNeeded = owned ? owned.level * 2 : 0;
    const canLvUp = owned && owned.duplicates >= dupsNeeded && owned.level < 10;
    html += `<div class="menu-card ${cls}" onclick="${owned?`showRecipeDetail('${r.id}')`:''}" >
      <div class="mc-icon">${owned?r.icon:'❓'}${canLvUp?'<span class="red-dot"></span>':''}</div>
      <div class="mc-name">${owned?r.name:'???'}</div>
      ${owned ? `<div class="mc-lv">LV.${owned.level}</div><div class="mc-dup">${owned.duplicates}/${dupsNeeded}</div>` : ''}
    </div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

function showRecipeDetail(recipeId) {
  const r = ALL_RECIPES.find(x=>x.id===recipeId);
  const owned = state.ownedRecipes.find(o=>o.recipeId===recipeId);
  if(!r||!owned) return;
  const dupsNeeded = owned.level * 2;
  const canLevelUp = owned.duplicates >= dupsNeeded && owned.level < 10;
  const card = document.getElementById('recipe-detail-card');
  card.innerHTML = `
    <div class="rd-top">
      <div class="rd-icon">${r.icon}</div>
      <div class="rd-info">
        <h3>${r.name}</h3>
        <div class="rd-rarity" style="color:${RARITY_COLORS[r.rarity]}">${RARITY_NAMES[r.rarity]} | ${r.category}</div>
        <div class="rd-price">🌰 ${r.basePrice} (LV.${owned.level}→${Math.floor(r.basePrice*(1+(owned.level-1)*0.5))})</div>
      </div>
    </div>
    <div class="rd-stats">
      ${(()=>{ const s=getRecipeStats(r, owned.level); return `
      <div class="rd-stat"><span class="stat-label">맛</span><div class="stat-bar"><div class="stat-fill" style="width:${s.taste}%;background:#e74c3c"></div></div><span style="font-size:10px;color:#ccc">${s.taste}</span></div>
      <div class="rd-stat"><span class="stat-label">데코</span><div class="stat-bar"><div class="stat-fill" style="width:${s.deco}%;background:#3498db"></div></div><span style="font-size:10px;color:#ccc">${s.deco}</span></div>
      <div class="rd-stat"><span class="stat-label">건강</span><div class="stat-bar"><div class="stat-fill" style="width:${s.health}%;background:#2ecc71"></div></div><span style="font-size:10px;color:#ccc">${s.health}</span></div>
      <div class="rd-stat"><span class="stat-label">조리</span><div class="stat-bar"><div class="stat-fill" style="width:${Math.min(r.cookTime/60000*100,100)}%;background:#f39c12"></div></div><span style="font-size:10px;color:#ccc">${(r.cookTime/1000).toFixed(0)}s</span></div>
      `; })()}
    </div>
    <div class="rd-abilities">
      <h4>추가 능력</h4>
      ${r.abilities.map((a,i) => {
        const lvNeeded = [3,5,7,10][i];
        const unlocked = owned.level >= lvNeeded;
        return `<div class="rd-ability ${unlocked?'':'locked'}">${unlocked?'✅':'🔒'} ${a}</div>`;
      }).join('')}
    </div>
    <div class="rd-levelup-area">
      <div class="dup-info">중복 카드: ${owned.duplicates} / ${dupsNeeded}</div>
      <button class="btn-primary" ${canLevelUp?'':'disabled'} onclick="levelUpRecipe('${recipeId}')">
        ${owned.level>=10?'MAX LEVEL':canLevelUp?'레벨업!':'카드 부족'}
      </button>
    </div>
  `;
  document.getElementById('recipe-detail-modal').classList.add('show');
}

function levelUpRecipe(recipeId) {
  const owned = state.ownedRecipes.find(o=>o.recipeId===recipeId);
  if(!owned || owned.level>=10) return;
  const dupsNeeded = owned.level * 2;
  if(owned.duplicates < dupsNeeded) return;
  owned.duplicates -= dupsNeeded;
  owned.level++;
  showToast(`${ALL_RECIPES.find(r=>r.id===recipeId).name} LV.${owned.level}!`);
  showRecipeDetail(recipeId);
}

function closeRecipeDetail() {
  document.getElementById('recipe-detail-modal').classList.remove('show');
}

// ===========================
// SHOP EXPAND
// ===========================
function renderShopExpand() {
  const container = document.getElementById('shop-expand');
  let html = `<div style="font-size:12px;color:#aaa;margin-bottom:12px">현재: 식탁 ${state.numTables}개 | 화구 ${state.numStoves}개</div>`;
  html += '<div class="expand-list">';
  EXPANSIONS.forEach(ex => {
    const done = state.expansionsDone.includes(ex.id);
    const isNext = !done && !EXPANSIONS.slice(0, EXPANSIONS.indexOf(ex)).some(e=>!state.expansionsDone.includes(e.id));
    const canAfford = state.gold >= ex.cost;
    html += `<div class="expand-item ${done?'done':''} ${isNext?'next':''}">
      <div class="expand-icon">${ex.icon}</div>
      <div class="expand-info">
        <div class="ei-title">${ex.name}</div>
        <div class="ei-desc">${ex.desc}</div>
        ${!done ? `<div class="ei-cost">🌰 ${formatGold(ex.cost)}</div>` : ''}
      </div>
      ${done ? '<div class="expand-check">✅</div>'
        : isNext ? `<button class="expand-btn" ${canAfford?'':'disabled'} onclick="doExpand('${ex.id}')">확장</button>`
        : '<div style="font-size:10px;color:#666">🔒</div>'
      }
    </div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

function doExpand(exId) {
  const ex = EXPANSIONS.find(e=>e.id===exId);
  if(!ex || state.gold < ex.cost) return;
  state.gold -= ex.cost;
  state.expansionsDone.push(exId);
  if(ex.type==='table') {
    state.numTables++;
    buildDiningArea();
  } else {
    state.numStoves++;
    updateStoveVisibility();
  }
  updateHUD();
  showToast(`${ex.name} 완료!`);
  showChefBubble('가게가 커졌거덩요!');
  // 병스타그램: 확장 피드
  if(ex.type==='table') addMyFeed(`식탁이 ${state.numTables}개가 되었어요! 🪑`, '🏠');
  else addMyFeed(`화구가 ${state.numStoves}개로 늘었어요! 🔥`, '🏠');
  renderShopExpand();
}

// ===========================
// INTERIOR SYSTEM (인테리어)
// ===========================
let currentInteriorArea = 'kitchen';

function getInteriorScore() {
  return state.ownedSkins.reduce((sum, skinId) => {
    const skin = INTERIOR_SKINS.find(s => s.id === skinId);
    return sum + (skin ? skin.interiorScore : 0);
  }, 0);
}

// ===========================
// PROFILE & RANK (프로필 & 승급)
// ===========================
function getRecipeScore() {
  return state.ownedRecipes.reduce((sum, owned) => {
    const recipe = ALL_RECIPES.find(r => r.id === owned.recipeId);
    if(!recipe) return sum;
    return sum + ((RARITY_SCORE[recipe.rarity] || 0) * owned.level);
  }, 0);
}

function checkRankMission(mission) {
  switch(mission.type) {
    case 'followers': return state.followers >= mission.value;
    case 'interiorScore': return getInteriorScore() >= mission.value;
    case 'contestWon': return state.contestResults[mission.value]?.won === true;
    case 'cookingLevel': return state.cookingLevel >= mission.value;
    case 'recipeLevelSum': return state.ownedRecipes.reduce((s,o)=>s+o.level, 0) >= mission.value;
    case 'staffLevel': return (state.hiredStaff[mission.staffId]?.level || 0) >= mission.value;
    default: return false;
  }
}

function getRankMissionProgress(mission) {
  switch(mission.type) {
    case 'followers': return { current:state.followers, target:mission.value };
    case 'interiorScore': return { current:getInteriorScore(), target:mission.value };
    case 'contestWon': return { current:state.contestResults[mission.value]?.won ? 1 : 0, target:1 };
    case 'cookingLevel': return { current:state.cookingLevel, target:mission.value };
    case 'recipeLevelSum': return { current:state.ownedRecipes.reduce((s,o)=>s+o.level,0), target:mission.value };
    case 'staffLevel': return { current:state.hiredStaff[mission.staffId]?.level || 0, target:mission.value };
    default: return { current:0, target:mission.value };
  }
}

function renderProfileInfo() {
  const expansionPct = Math.round(state.expansionsDone.length / EXPANSIONS.length * 100);
  const interiorScore = getInteriorScore();
  const recipeScore = getRecipeScore();
  document.getElementById('profile-info-tab').innerHTML = `
    <div class="profile-stats">
      <div class="profile-stat-card">
        <div class="ps-icon">🏠</div>
        <div class="ps-info">
          <div class="ps-label">가게 확장도</div>
          <div class="ps-value">${expansionPct}%</div>
          <div class="ps-sub">${state.expansionsDone.length} / ${EXPANSIONS.length} 완료</div>
        </div>
      </div>
      <div class="profile-stat-card">
        <div class="ps-icon">🎨</div>
        <div class="ps-info">
          <div class="ps-label">인테리어 점수</div>
          <div class="ps-value">${interiorScore}점</div>
        </div>
      </div>
      <div class="profile-stat-card">
        <div class="ps-icon">📖</div>
        <div class="ps-info">
          <div class="ps-label">요리 레벨</div>
          <div class="ps-value">LV. ${state.cookingLevel}</div>
        </div>
      </div>
      <div class="profile-stat-card">
        <div class="ps-icon">🧾</div>
        <div class="ps-info">
          <div class="ps-label">레시피 점수</div>
          <div class="ps-value">${recipeScore}점</div>
          <div class="ps-sub">${state.ownedRecipes.length}종 보유</div>
        </div>
      </div>
      <div class="profile-stat-card">
        <div class="ps-icon">📸</div>
        <div class="ps-info">
          <div class="ps-label">팔로워</div>
          <div class="ps-value">${formatGold(state.followers)}</div>
        </div>
      </div>
    </div>
  `;
}

function renderProfileRank() {
  const container = document.getElementById('profile-rank-tab');
  const rank = state.shopRank;
  const currentRankData = SHOP_RANKS[rank];

  let html = `
    <div class="rank-current-banner">
      <div class="rc-icon">${currentRankData.icon}</div>
      <div class="rc-name">${currentRankData.name}</div>
      <div class="rc-level">등급 ${rank + 1} / ${SHOP_RANKS.length}</div>
    </div>
  `;

  // 최고 등급 달성
  if(rank >= SHOP_RANKS.length - 1) {
    const allDone = currentRankData.missions.every(m => checkRankMission(m));
    if(allDone) {
      html += `<div class="rank-max-banner"><div class="rm-icon">🚀✨</div><div class="rm-text">최고 등급 달성!</div></div>`;
      container.innerHTML = html;
      return;
    }
  }

  // 다음 등급 정보
  if(rank < SHOP_RANKS.length - 1) {
    const next = SHOP_RANKS[rank + 1];
    html += `<div class="rank-next-label"><span class="rn-icon">${next.icon}</span> 다음 등급: ${next.name}</div>`;
  }

  // 미션 목록
  html += '<div class="rank-mission-list">';
  let allComplete = true;
  currentRankData.missions.forEach(mission => {
    const done = checkRankMission(mission);
    if(!done) allComplete = false;
    const progress = getRankMissionProgress(mission);
    const statusText = done ? '완료!' : (mission.type === 'contestWon' ? '미완료' : `${progress.current} / ${progress.target}`);
    html += `
      <div class="rank-mission ${done ? 'done' : ''}">
        <div class="rm-check">${done ? '✅' : '⬜'}</div>
        <div class="rm-label">${mission.label}</div>
        <div class="rm-status">${statusText}</div>
      </div>`;
  });
  html += '</div>';

  // 보상 미리보기
  html += `<div class="rank-rewards">승급 보상: <span>🌰 ${formatGold(currentRankData.rewards.gold)}</span> + <span>💎 ${currentRankData.rewards.gems}</span></div>`;

  // 승급 버튼
  if(rank < SHOP_RANKS.length - 1) {
    html += `<button class="rank-up-btn" ${allComplete ? '' : 'disabled'} onclick="doRankUp()">승급하기</button>`;
  }

  container.innerHTML = html;
}

function doRankUp() {
  const rank = state.shopRank;
  if(rank >= SHOP_RANKS.length - 1) return;
  const currentRankData = SHOP_RANKS[rank];
  if(!currentRankData.missions.every(m => checkRankMission(m))) return;

  state.gold += currentRankData.rewards.gold;
  state.gems += currentRankData.rewards.gems;
  state.shopRank++;
  const newRankData = SHOP_RANKS[state.shopRank];

  updateHUD();
  showToast(`승급! ${newRankData.name} 달성! 🎉`);
  showChefBubble('가게가 유명해졌거덴요!');
  addMyFeed(`가게 등급이 "${newRankData.name}"(으)로 승급했어요! ${newRankData.icon}`, '⭐');
  renderProfileRank();
}

function checkSkinUnlockCondition(cond) {
  if(!cond) return true;
  switch(cond.type) {
    case 'cookingLevel': return state.cookingLevel >= cond.min;
    case 'followers':    return state.followers >= cond.min;
    case 'tables':       return state.numTables >= cond.min;
    case 'totalServed':  return state.totalServed >= cond.min;
    case 'recipes':      return state.ownedRecipes.length >= cond.min;
    case 'contestWon':   return state.contestResults[cond.contestId]?.won === true;
    default: return false;
  }
}

function renderInterior() {
  const container = document.getElementById('shop-interior');
  const score = getInteriorScore();
  let html = `
    <div class="interior-score-banner">
      <div class="is-label">인테리어 점수</div>
      <div class="is-value">🏠 ${score}점</div>
    </div>
    <div class="interior-sub-tabs">`;
  INTERIOR_AREAS.forEach(area => {
    html += `<div class="interior-sub-tab ${area.id===currentInteriorArea?'active':''}"
                 onclick="switchInteriorArea('${area.id}')">${area.icon} ${area.name}</div>`;
  });
  html += `</div><div class="interior-skins-scroll">`;

  const skins = INTERIOR_SKINS.filter(s => s.area === currentInteriorArea);
  skins.forEach(skin => {
    const owned = state.ownedSkins.includes(skin.id);
    const equipped = state.equippedSkins[skin.area] === skin.id;
    const unlocked = checkSkinUnlockCondition(skin.unlockCondition);
    const canAfford = skin.cost.gold !== undefined ? state.gold >= skin.cost.gold : state.gems >= skin.cost.gems;

    let cardClass = 'skin-card';
    if(equipped) cardClass += ' equipped';
    else if(owned) cardClass += ' owned';
    else if(!unlocked) cardClass += ' locked';

    // 프리뷰 스타일
    const firstKey = Object.keys(skin.styles)[0];
    const previewBg = skin.styles[firstKey]?.background || '';
    const previewBorder = skin.styles[firstKey]?.border || 'none';

    html += `<div class="${cardClass}">
      <div class="sk-icon">${skin.icon}</div>
      <div class="sk-name">${skin.name}</div>
      ${skin.interiorScore > 0 ? `<div class="sk-score">+${skin.interiorScore}점</div>` : ''}
      <div class="skin-preview" style="background:${previewBg};border:${previewBorder}"></div>`;

    if(equipped) {
      html += `<button class="sk-btn equipped-label">장착중</button>`;
    } else if(owned) {
      html += `<button class="sk-btn equip" onclick="equipSkin('${skin.id}')">장착</button>`;
    } else {
      if(skin.conditionText) {
        html += `<div class="sk-condition ${unlocked?'met':''}">${unlocked?'✅':'🔒'} ${skin.conditionText}</div>`;
      }
      if(skin.cost.gold !== undefined) {
        html += `<div class="sk-cost">🌰 ${formatGold(skin.cost.gold)}</div>`;
      } else {
        html += `<div class="sk-cost">💎 ${skin.cost.gems}</div>`;
      }
      html += `<button class="sk-btn buy" ${(unlocked && canAfford)?'':'disabled'}
                       onclick="purchaseSkin('${skin.id}')">구매</button>`;
    }
    html += `</div>`;
  });

  html += '</div>';
  container.innerHTML = html;
}

function switchInteriorArea(areaId) {
  currentInteriorArea = areaId;
  renderInterior();
}

function purchaseSkin(skinId) {
  const skin = INTERIOR_SKINS.find(s => s.id === skinId);
  if(!skin || state.ownedSkins.includes(skinId)) return;
  if(!checkSkinUnlockCondition(skin.unlockCondition)) return;

  if(skin.cost.gold !== undefined) {
    if(state.gold < skin.cost.gold) return;
    state.gold -= skin.cost.gold;
  } else {
    if(state.gems < skin.cost.gems) return;
    state.gems -= skin.cost.gems;
  }

  state.ownedSkins.push(skinId);
  updateHUD();
  showToast(`${skin.name} 인테리어 구매! 🏠`);
  showChefBubble('가게가 예뻐졌거덩요!');
  addMyFeed(`${skin.name} 인테리어를 구매했어요! 🎨`, '🏠');
  renderInterior();
}

function equipSkin(skinId) {
  const skin = INTERIOR_SKINS.find(s => s.id === skinId);
  if(!skin || !state.ownedSkins.includes(skinId)) return;

  state.equippedSkins[skin.area] = skinId;
  applySkinStyles();
  showToast(`${skin.name} 스킨 장착! ✨`);
  renderInterior();
}

function applySkinStyles() {
  // 주방
  const kSkin = INTERIOR_SKINS.find(s => s.id === state.equippedSkins.kitchen);
  if(kSkin) {
    const kb = document.getElementById('kitchen-bg');
    if(kb && kSkin.styles.kitchenBg) {
      kb.style.background = kSkin.styles.kitchenBg.background;
      kb.style.border = kSkin.styles.kitchenBg.border;
    }
    if(kSkin.styles.stove) {
      document.querySelectorAll('.stove').forEach(el => {
        el.style.background = kSkin.styles.stove.background;
        el.style.border = kSkin.styles.stove.border;
      });
    }
  }
  // 홀
  const hSkin = INTERIOR_SKINS.find(s => s.id === state.equippedSkins.hall);
  if(hSkin) {
    if(hSkin.styles.tableSurface) {
      document.querySelectorAll('.table-surface').forEach(el => {
        el.style.background = hSkin.styles.tableSurface.background;
        el.style.border = hSkin.styles.tableSurface.border;
      });
    }
    if(hSkin.styles.chair) {
      document.querySelectorAll('.chair').forEach(el => {
        el.style.background = hSkin.styles.chair.background;
        el.style.border = hSkin.styles.chair.border;
      });
    }
    if(hSkin.styles.tableCloth) {
      document.querySelectorAll('.table-cloth').forEach(el => {
        el.style.background = hSkin.styles.tableCloth.background;
      });
    }
  }
  // 입구
  const eSkin = INTERIOR_SKINS.find(s => s.id === state.equippedSkins.entrance);
  if(eSkin && eSkin.styles.entranceGate) {
    const gate = document.getElementById('entrance-gate');
    if(gate) {
      gate.style.background = eSkin.styles.entranceGate.background;
      gate.style.border = eSkin.styles.entranceGate.border;
    }
  }
}

// ===========================
// 병스타그램 SYSTEM
// ===========================
function formatTimeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if(diff < 10) return '방금';
  if(diff < 60) return `${diff}초 전`;
  if(diff < 3600) return `${Math.floor(diff/60)}분 전`;
  if(diff < 86400) return `${Math.floor(diff/3600)}시간 전`;
  return `${Math.floor(diff/86400)}일 전`;
}

function updateSNSBadge() {
  const badge = document.getElementById('sns-badge');
  if(state.newTagCount > 0) {
    badge.textContent = state.newTagCount > 9 ? '9+' : state.newTagCount;
    badge.classList.add('show');
  } else {
    badge.classList.remove('show');
  }
}

function addMyFeed(text, icon) {
  state.myFeeds.unshift({ id:Date.now()+Math.random(), text, icon, time:Date.now() });
}

function addTagFeed(customer, recipe, context) {
  // 1. 스타일별 템플릿 가져오기
  const cData = customer.customerId ? CUSTOMERS_DATA.find(c=>c.id===customer.customerId) : null;
  const style = (cData && cData.speechStyle && FEED_TEMPLATES[cData.speechStyle]) ? cData.speechStyle : 'default';
  const allTemplates = FEED_TEMPLATES[style] || FEED_TEMPLATES.default;

  // 2. 조건 필터: condition이 있는 템플릿은 조건 충족해야 후보
  const ctx = context || {};
  const eligible = allTemplates.filter(t => {
    if(!t.condition) return true;
    const fn = FEED_CONDITIONS[t.condition];
    return fn ? fn(ctx) : true;
  });
  if(!eligible.length) return;

  // 3. 감정(sentiment) 결정
  let negativeChance = 0.15;
  const isSlow = FEED_CONDITIONS.slowCook && FEED_CONDITIONS.slowCook(ctx);
  const isExpensive = FEED_CONDITIONS.expensive && FEED_CONDITIONS.expensive(ctx);
  const isFirstVisit = FEED_CONDITIONS.firstVisit && FEED_CONDITIONS.firstVisit(ctx);
  const isLoyal = FEED_CONDITIONS.highLoyalty && FEED_CONDITIONS.highLoyalty(ctx);
  if(isSlow && isExpensive) negativeChance = 0.50;
  else if(isSlow || isExpensive) negativeChance = 0.35;
  if(isFirstVisit || isLoyal) negativeChance = 0.05;

  const chosenSentiment = Math.random() < negativeChance ? 'negative' : 'positive';

  // 4. 감정에 맞는 후보 선택 (없으면 감정 무시)
  let pool = eligible.filter(t => t.sentiment === chosenSentiment);
  if(!pool.length) pool = eligible;

  // 5. 랜덤 선택 + 플레이스홀더 치환
  const selected = randomFrom(pool);
  let text = selected.text
    .replace(/\{recipe\}/g, recipe.name)
    .replace(/\{price\}/g, formatGold(ctx.price || recipe.basePrice))
    .replace(/\{cookTime\}/g, Math.round((ctx.cookTimeMs || recipe.cookTime) / 1000))
    .replace(/\{category\}/g, recipe.category)
    .replace(/\{visits\}/g, ctx.visits || 1)
    .replace(/\{loyaltyLevel\}/g, ctx.loyaltyLevel || 1)
    .replace(/\{restaurant\}/g, '병아리식당');

  // 6. 좋아요 & 팔로워 계산 (부정 피드는 좋아요 적음)
  const likePct = selected.sentiment === 'negative'
    ? 0.02 + Math.random() * 0.03   // 2~5%
    : 0.05 + Math.random() * 0.05;  // 5~10%
  const likes = Math.max(1, Math.floor(customer.followers * likePct));
  const followerGain = Math.max(1, Math.floor(likes * 0.05));
  state.followers += followerGain;

  // 7. 이미지 아이콘 & 그라데이션
  const feedIcon = (FEED_TOPIC_ICONS[selected.topic] !== undefined)
    ? (FEED_TOPIC_ICONS[selected.topic] || recipe.icon)
    : recipe.icon;
  const gradient = selected.sentiment === 'negative'
    ? randomFrom(FEED_NEGATIVE_GRADIENTS)
    : randomFrom(FEED_IMAGE_GRADIENTS);

  // 8. 해시태그 생성
  const tags = [...FEED_HASHTAGS_COMMON]; // #병아리식당 #숲속맛집 항상 포함
  const topicTags = FEED_HASHTAGS[selected.topic] || FEED_HASHTAGS.general;
  const shuffledTopic = [...topicTags].sort(() => Math.random() - 0.5);
  tags.push(...shuffledTopic.slice(0, 1 + Math.floor(Math.random() * 2))); // 1~2개
  const shuffledPersonal = [...FEED_HASHTAGS_PERSONAL].sort(() => Math.random() - 0.5);
  tags.push(...shuffledPersonal.slice(0, 1 + Math.floor(Math.random() * 2))); // 1~2개

  state.tagFeeds.unshift({
    id: Date.now()+Math.random(),
    customerEmoji: customer.emoji,
    customerName: customer.name,
    customerFollowers: customer.followers,
    text,
    likes,
    recipeIcon: recipe.icon,
    feedIcon,
    recipeId: recipe.id,
    topic: selected.topic,
    sentiment: selected.sentiment,
    gradient,
    hashtags: tags,
    time: Date.now(),
  });

  state.newTagCount++;
  updateSNSBadge();
  showToast(`📸 ${customer.name}님이 피드를 올렸어요!`);
}

function renderSNSMy() {
  const container = document.getElementById('sns-my');
  const feedCount = state.myFeeds.length;

  let html = `
    <div class="sns-profile">
      <div class="sns-profile-top">
        <div class="sns-avatar">🐤</div>
        <div class="sns-stats">
          <div class="sns-stat"><div class="num">${feedCount}</div><div class="lbl">게시물</div></div>
          <div class="sns-stat"><div class="num">${formatGold(state.followers)}</div><div class="lbl">팔로워</div></div>
          <div class="sns-stat"><div class="num">${state.totalServed}</div><div class="lbl">서빙</div></div>
        </div>
      </div>
      <div class="sns-profile-name">병아리식당</div>
      <div class="sns-profile-bio">작은 병아리의 큰 꿈 🌟 | 요리 LV.${state.cookingLevel}</div>
      <div class="sns-interior-score">🏠 인테리어 점수: <span>${getInteriorScore()}점</span></div>
    </div>
    <div class="sns-feed-list">
  `;

  if(!state.myFeeds.length) {
    html += '<div class="sns-empty">아직 게시물이 없어요</div>';
  } else {
    state.myFeeds.forEach(feed => {
      html += `
        <div class="sns-post">
          <div class="sns-post-header">
            <div class="sns-post-avatar">🐤</div>
            <div class="sns-post-user"><span class="name">병아리식당</span></div>
            <div class="sns-post-time">${formatTimeAgo(feed.time)}</div>
          </div>
          <div class="sns-post-image"><img src="images/feed_1.jpeg" alt="feed" style="width:100%;height:100%;object-fit:cover;"></div>
          <div class="sns-post-actions"><span>♥</span><span>💬</span><span>📤</span></div>
          <div class="sns-post-text"><span class="author">병아리식당</span>${feed.text}</div>
        </div>
      `;
    });
  }

  html += '</div>';
  container.innerHTML = html;
}

function renderSNSTag() {
  const container = document.getElementById('sns-tag');

  if(!state.tagFeeds.length) {
    container.innerHTML = '<div class="sns-empty" style="padding:60px 20px">아직 손님이 피드를 올리지 않았어요 📸<br><small style="color:#ccc;margin-top:8px;display:block">손님 서빙 후 10% 확률로 피드가 올라와요</small></div>';
    return;
  }

  let html = '<div class="sns-feed-list">';
  state.tagFeeds.forEach(feed => {
    const icon = feed.feedIcon || feed.recipeIcon;
    const grad = feed.gradient || randomFrom(FEED_IMAGE_GRADIENTS);
    const displayText = (feed.text || '').replace(/\n/g, '<br>');
    html += `
      <div class="sns-post${feed.sentiment==='negative'?' sns-post-negative':''}">
        <div class="sns-post-header">
          <div class="sns-post-avatar">${feed.customerEmoji}</div>
          <div class="sns-post-user">
            <span class="name">${feed.customerName}</span>
            <span class="follower-count">팔로워 ${formatGold(feed.customerFollowers)}</span>
          </div>
          <div class="sns-post-time">${formatTimeAgo(feed.time)}</div>
        </div>
        ${feed.topic==='food' && feed.recipeId
          ? `<div class="sns-post-image"><img src="images/${feed.recipeId}.jpeg" alt="${feed.recipeId}" style="width:100%;height:100%;object-fit:cover;"></div>`
          : `<div class="sns-post-image" style="background:${grad}">${icon}</div>`}
        <div class="sns-post-actions"><span>♥</span><span>💬</span><span>📤</span></div>
        <div class="sns-post-likes">좋아요 ${formatGold(feed.likes)}개</div>
        <div class="sns-post-text"><span class="author">${feed.customerName}</span>${displayText}</div>
        ${feed.hashtags ? `<div class="sns-post-tags">${feed.hashtags.join(' ')}</div>` : ''}
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

// ===========================
// CUSTOMER COLLECTION (도감)
// ===========================
function renderCustomerCollection() {
  const container = document.getElementById('customer-collection');
  const total = CUSTOMERS_DATA.length;
  const discovered = state.discoveredCustomers.length;
  const pct = Math.floor((discovered / total) * 100);
  let html = `
    <div class="collection-progress">
      <div class="label">손님 도감</div>
      <div class="count">${discovered} / ${total}</div>
      <div class="collection-progress-bar"><div class="collection-progress-fill" style="width:${pct}%"></div></div>
    </div>
    <div class="customer-grid">`;
  CUSTOMERS_DATA.forEach(c => {
    const isDiscovered = state.discoveredCustomers.includes(c.id);
    const visits = state.customerVisits[c.id] || 0;
    const loyalty = getLoyaltyLevel(visits);
    if(isDiscovered) {
      html += `<div class="customer-card discovered ${c.rare?'rare':''}" onclick="showCustomerDetail('${c.id}')">
        <div class="cc-emoji">${c.emoji}</div>
        <div class="cc-name">${c.name}</div>
        ${visits > 0 ? `<div class="cc-loyalty">LV.${loyalty.level}</div>` : ''}
      </div>`;
    } else {
      html += `<div class="customer-card undiscovered" onclick="showCustomerDetail('${c.id}')">
        <div class="cc-emoji" style="filter:brightness(0);">❓</div>
        <div class="cc-name">???</div>
      </div>`;
    }
  });
  html += '</div>';
  container.innerHTML = html;
}

function showCustomerDetail(customerId) {
  const c = CUSTOMERS_DATA.find(x=>x.id===customerId);
  if(!c) return;
  const isDiscovered = state.discoveredCustomers.includes(c.id);
  const visits = state.customerVisits[customerId] || 0;
  const loyalty = getLoyaltyLevel(visits);
  const nextThreshold = getNextLoyaltyThreshold(visits);
  let gaugePct = 100;
  if(nextThreshold) {
    const prev = loyalty.visitsNeeded;
    gaugePct = Math.floor(((visits - prev) / (nextThreshold.visitsNeeded - prev)) * 100);
  }
  // 등장 조건
  let condHtml = '<div class="cd-conditions">';
  if(!c.conditions) {
    condHtml += '<div class="met">조건 없음 (항상 방문)</div>';
  } else {
    if(c.conditions.minFollowers) {
      const met = state.followers >= c.conditions.minFollowers;
      condHtml += `<div class="${met?'met':'unmet'}">${met?'✅':'🔒'} 팔로워 ${c.conditions.minFollowers} 이상</div>`;
    }
    if(c.conditions.minCookingLevel) {
      const met = state.cookingLevel >= c.conditions.minCookingLevel;
      condHtml += `<div class="${met?'met':'unmet'}">${met?'✅':'🔒'} 요리 레벨 ${c.conditions.minCookingLevel} 이상</div>`;
    }
    if(c.conditions.requiredRecipe) {
      const r = ALL_RECIPES.find(x=>x.id===c.conditions.requiredRecipe);
      const met = state.ownedRecipes.some(o=>o.recipeId===c.conditions.requiredRecipe);
      condHtml += `<div class="${met?'met':'unmet'}">${met?'✅':'🔒'} ${r?r.name:c.conditions.requiredRecipe} 보유</div>`;
    }
  }
  condHtml += '</div>';
  // 선호 음식
  let prefHtml = '없음 (아무 요리나 주문)';
  if(c.preference) {
    if(c.preference.recipeId) {
      const r = ALL_RECIPES.find(x=>x.id===c.preference.recipeId);
      prefHtml = r ? `${r.icon} ${r.name}` : c.preference.recipeId;
    } else if(c.preference.category) {
      prefHtml = `${c.preference.category} 카테고리`;
    }
  }
  const card = document.getElementById('customer-detail-card');
  if(!isDiscovered) {
    // 미발견 손님: 이름/설명 숨기고, 조건만 표시
    card.innerHTML = `
      <div class="cd-portrait" style="filter:brightness(0.3);">${c.emoji}</div>
      <div class="cd-name">??? ${c.rare?'⭐':''}</div>
      <div class="cd-undiscovered">🔍 미발견</div>
      <div class="cd-desc" style="color:#666;">아직 만나지 못한 손님이에요.</div>
      <div class="cd-section">
        <h4>방문 조건</h4>
        ${condHtml}
      </div>`;
  } else {
    card.innerHTML = `
      <div class="cd-portrait">${c.emoji}</div>
      <div class="cd-name">${c.name} ${c.rare?'⭐':''}</div>
      <div class="cd-desc">${c.description}</div>
      <div class="cd-section">
        <h4>방문 정보</h4>
        <div class="cd-info-row"><span>방문 횟수</span><span>${visits}회</span></div>
        <div class="cd-info-row"><span>단골 레벨</span><span>LV.${loyalty.level} (+${Math.floor(loyalty.priceBonus*100)}%)</span></div>
        <div class="cd-loyalty-gauge"><div class="cd-loyalty-fill" style="width:${gaugePct}%"></div></div>
        <div style="font-size:10px;color:#888;margin-top:4px;text-align:right">
          ${nextThreshold ? `다음 레벨까지 ${nextThreshold.visitsNeeded - visits}회 남음` : 'MAX'}
        </div>
      </div>
      <div class="cd-section">
        <h4>선호 음식</h4>
        <div class="cd-info-row"><span>${prefHtml}</span></div>
      </div>
      <div class="cd-section">
        <h4>방문 조건</h4>
        ${condHtml}
      </div>
      <div class="cd-section">
        <h4>팔로워</h4>
        <div class="cd-info-row"><span>📸 ${formatGold(c.followers)}</span></div>
      </div>`;
  }
  document.getElementById('customer-detail-modal').classList.add('show');
}

function closeCustomerDetail() {
  document.getElementById('customer-detail-modal').classList.remove('show');
}

// ===========================
// RANDOM CHEF LINES & BOOK DROPS
// ===========================
setInterval(()=>{
  const cooking=state.stoves.some(s=>s.id<state.numStoves&&s.cooking);
  if(!cooking&&!state.waitingQueue.length) {
    if(state.hiredStaff['headchef']) {
      showChefBubble(randomFrom(['가게가 잘 돌아가거덩요~','직원들 믿음직하거덩요!','나는 사장이거덩요~','오늘도 평화거덩요~']));
      showNPCBubble('headchef', randomFrom(STAFF_DATA.find(s=>s.id==='headchef').speeches));
    } else {
      showChefBubble(randomFrom(['한가하거덩요...','손님 안 오나거덩요','홍보 좀 해줘거덩요!']));
    }
  }
}, 8000);

// 대기열 손님 대사 (10초마다 20% 확률)
setInterval(() => {
  if(state.waitingQueue.length === 0) return;
  if(Math.random() > 0.20) return;
  const idx = Math.floor(Math.random() * state.waitingQueue.length);
  const customer = state.waitingQueue[idx];
  const speech = getCustomerSpeech(customer.customerId, 'waiting');
  if(!speech) return;
  showWaitingBubble(idx, speech);
}, 10000);

// 5명 서빙할 때마다 레시피 책 1개 획득
let lastBookDrop = 0;
setInterval(()=>{
  if(state.totalServed > 0 && state.totalServed - lastBookDrop >= 5) {
    lastBookDrop = state.totalServed;
    state.recipeBooks++;
    updateHUD();
    showToast('📗 낡은 레시피 책 획득!');
  }
},1000);

// 8명 서빙마다 훈련 교본 1개 획득
let lastManualDrop = 0;
setInterval(()=>{
  if(state.totalServed > 0 && state.totalServed - lastManualDrop >= 8) {
    lastManualDrop = state.totalServed;
    state.trainingManuals++;
    updateHUD();
    showToast('📕 훈련 교본 획득!');
  }
},1000);

// ===========================
// CONTEST SYSTEM (요리대회)
// ===========================
let currentContestId = null;

function isContestUnlocked(contest) {
  if(!contest.unlockCondition) return true;
  return state.contestResults[contest.unlockCondition]?.won === true;
}

function isContestOnCooldown() {
  return Date.now() - state.lastContestTime < CONTEST_COOLDOWN;
}

function getContestCooldownRemain() {
  const remain = CONTEST_COOLDOWN - (Date.now() - state.lastContestTime);
  return Math.max(0, Math.ceil(remain / 1000));
}

// --- Contest List Panel ---
function renderContestList() {
  const container = document.getElementById('contest-list');
  let html = '<div class="contest-grid">';
  CONTEST_DATA.forEach(ct => {
    const won = state.contestResults[ct.id]?.won;
    const unlocked = isContestUnlocked(ct);
    const onCooldown = isContestOnCooldown();
    let statusCls = '', statusText = '', cardCls = '';
    if(!unlocked) {
      cardCls = 'locked'; statusCls = 's-locked'; statusText = '🔒 잠김';
    } else if(won) {
      cardCls = 'won'; statusCls = 's-won'; statusText = '🏅 우승!';
    } else if(onCooldown) {
      cardCls = 'cooldown'; statusCls = 's-cooldown'; statusText = `⏳ ${getContestCooldownRemain()}초`;
    } else {
      statusCls = 's-open'; statusText = '도전!';
    }
    const clickable = unlocked && !onCooldown;
    html += `<div class="contest-card ${cardCls}" ${clickable?`onclick="openContestSelect('${ct.id}')"`:''}>
      <div class="cc-emoji">${ct.emoji}</div>
      <div class="cc-info">
        <div class="cc-name">${ct.name}</div>
        <div class="cc-tier">${ct.tier} 대회</div>
        <div class="cc-desc">${unlocked?ct.description:'이전 대회 우승 필요'}</div>
        ${unlocked && ct.categoryLimit ? `<div class="cc-limit">📋 ${ct.categoryLimit.join('/')} 전용</div>` : ''}
        <div class="cc-reward">${unlocked?`🌰${formatGold(ct.rewards.gold)} 💎${ct.rewards.gems}`:''}</div>
      </div>
      <div class="cc-status ${statusCls}">${statusText}</div>
    </div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

// --- Recipe Select for Contest ---
function openContestSelect(contestId) {
  currentContestId = contestId;
  const contest = CONTEST_DATA.find(c=>c.id===contestId);
  const grid = document.getElementById('contest-select-grid');
  const limit = contest.categoryLimit || null;
  let html = '';
  let hasEligible = false;
  state.ownedRecipes.forEach(owned => {
    const r = ALL_RECIPES.find(x=>x.id===owned.recipeId);
    // 카테고리 제한 체크
    if(limit && !limit.includes(r.category)) return;
    hasEligible = true;
    const s = getRecipeStats(r, owned.level);
    const hasBonus = contest.categoryBonus && contest.categoryBonus[r.category];
    html += `<div class="cs-recipe" onclick="selectContestRecipe('${r.id}')">
      <div class="cs-icon">${r.icon}</div>
      <div class="cs-name">${r.name}</div>
      <div class="cs-stats">맛${s.taste} 데코${s.deco} 건강${s.health}</div>
      ${hasBonus?`<div class="cs-bonus">${r.category} 보너스!</div>`:''}
    </div>`;
  });
  if(!hasEligible) {
    html = `<div style="grid-column:1/-1;text-align:center;color:#e74c3c;font-size:13px;padding:20px 0;">
      출품 가능한 ${limit.join('/')} 요리가 없습니다!<br>
      <span style="color:#aaa;font-size:11px;">해당 카테고리의 레시피를 획득해보세요.</span>
    </div>`;
  }
  grid.innerHTML = html;
  closePanel('panel-contest');
  document.getElementById('contest-select-modal').classList.add('show');
}

function closeContestSelect() {
  document.getElementById('contest-select-modal').classList.remove('show');
  currentContestId = null;
}

// --- Start Contest ---
function selectContestRecipe(recipeId) {
  const contestId = currentContestId;
  if(!contestId) return;
  document.getElementById('contest-select-modal').classList.remove('show');
  startContest(contestId, recipeId);
}

function calcContestScore(taste, deco, health, contest) {
  const w = contest.weights;
  const weighted = taste * w.taste + deco * w.deco + health * w.health;
  const totalWeight = w.taste + w.deco + w.health;
  return weighted / totalWeight; // 가중 평균 (0~100 범위)
}

function startContest(contestId, recipeId) {
  const contest = CONTEST_DATA.find(c=>c.id===contestId);
  const recipe = ALL_RECIPES.find(r=>r.id===recipeId);
  const owned = state.ownedRecipes.find(o=>o.recipeId===recipeId);
  const stats = getRecipeStats(recipe, owned ? owned.level : 1);
  state.lastContestTime = Date.now();

  // 손님 풀에서 심사위원 5명 + 경쟁자 4명 = 9명 추출 (중복 없이)
  const shuffled = [...CUSTOMERS_DATA].sort(()=>Math.random()-0.5);
  const judges = shuffled.slice(0, 5);
  const rivalCustomers = shuffled.slice(5, 9);

  // 플레이어 채점 (가중 평균 기반)
  let avgScore = calcContestScore(stats.taste, stats.deco, stats.health, contest);
  if(contest.categoryBonus && contest.categoryBonus[recipe.category]) {
    avgScore *= contest.categoryBonus[recipe.category];
  }
  const ratio = avgScore / contest.baseScore;
  // ratio→점수: ratio 1.0 = 7~8점, ratio 0.5 = 3~5점, ratio 1.5+ = 9~10점
  const playerScores = judges.map(() => {
    return Math.max(1, Math.min(10, Math.round(ratio * 8 + (Math.random() * 2 - 0.5))));
  });
  const playerTotal = playerScores.reduce((a,b)=>a+b, 0);

  // 경쟁자 4명 점수 생성 (npcStrength 범위에서 개별 ratio 결정)
  const npcS = contest.npcStrength || {min:0.5, max:0.8};
  const competitors = rivalCustomers.map(rc => {
    const npcRatio = npcS.min + Math.random() * (npcS.max - npcS.min);
    const npcScores = judges.map(() => Math.max(1, Math.min(10, Math.round(npcRatio * 8 + (Math.random() * 2 - 0.5)))));
    return { emoji: rc.emoji, name: rc.name, total: npcScores.reduce((a,b)=>a+b,0) };
  });
  // 최소 1명은 40점 이상 보장
  const maxNpc = Math.max(...competitors.map(c=>c.total));
  if(maxNpc < 40) {
    const topIdx = competitors.reduce((bi,c,i,a)=> c.total > a[bi].total ? i : bi, 0);
    competitors[topIdx].total = 40 + Math.floor(Math.random() * 6);
  }

  // 장면 모달 표시
  const scene = document.getElementById('contest-scene-content');
  scene.innerHTML = `
    <div class="contest-stage-title">${contest.emoji} ${contest.name}</div>
    <div class="contest-stage-sub">${contest.tier} 대회</div>
    <div class="contest-judges">
      ${judges.map((j,i) => `<div class="judge-seat">
        <div class="judge-emoji">${j.emoji}</div>
        <div class="judge-name">${j.name}</div>
        <div class="judge-score" id="jscore-${i}">-</div>
      </div>`).join('')}
    </div>
    <div class="contest-competitors">
      ${competitors.map(c => `<div class="contest-rival">
        <span class="rival-emoji">${c.emoji}</span>
        <span class="rival-name">${c.name}</span>
        <span class="rival-score">${c.total}점</span>
      </div>`).join('')}
      <div class="contest-rival me">
        <span class="rival-emoji">🐤</span>
        <span class="rival-name">나 (${recipe.icon} ${recipe.name})</span>
        <span class="rival-score" id="my-rival-score">?</span>
      </div>
    </div>
    <div class="contest-my-scoring">
      <div style="font-size:12px;color:#aaa;margin-bottom:8px;">내 심사 점수</div>
      <div class="contest-my-scores" id="contest-my-scores">
        ${judges.map((j,i) => `<span class="my-score-dot" id="mscore-${i}">-</span>`).join('')}
      </div>
      <div class="contest-my-total" id="contest-total">총점: ?</div>
    </div>
  `;
  document.getElementById('contest-scene-modal').classList.add('show');

  // 점수 순차 공개 애니메이션
  judges.forEach((j, i) => {
    setTimeout(() => {
      const el = document.getElementById('mscore-' + i);
      const jel = document.getElementById('jscore-' + i);
      el.textContent = playerScores[i];
      el.classList.add('revealed');
      jel.textContent = playerScores[i];
      jel.classList.add('revealed');
      if(i === judges.length - 1) {
        setTimeout(() => {
          const totalEl = document.getElementById('contest-total');
          totalEl.textContent = `총점: ${playerTotal}점`;
          totalEl.classList.add('show');
          const myRivalScore = document.getElementById('my-rival-score');
          if(myRivalScore) { myRivalScore.textContent = playerTotal+'점'; myRivalScore.classList.add('revealed'); }
          setTimeout(() => {
            document.getElementById('contest-scene-modal').classList.remove('show');
            showContestResult(contest, recipe, playerTotal, competitors);
          }, 1500);
        }, 600);
      }
    }, 800 * (i + 1));
  });
}

// --- Contest Result ---
function showContestResult(contest, recipe, playerTotal, competitors) {
  const all = [
    { emoji:'🐤', name:'나', total:playerTotal, isMe:true },
    ...competitors.map(c=>({emoji:c.emoji, name:c.name, total:c.total, isMe:false}))
  ];
  all.sort((a,b) => b.total - a.total);
  const myRank = all.findIndex(a=>a.isMe) + 1;
  const won = myRank === 1;

  if(won) {
    state.contestResults[contest.id] = { won: true, wonAt: Date.now() };
    if(!state.badges.includes(contest.badgeId)) state.badges.push(contest.badgeId);
    state.gold += contest.rewards.gold;
    state.gems += contest.rewards.gems;
    updateHUD();
  }

  const card = document.getElementById('contest-result-card');
  card.innerHTML = `
    <div class="cr-title ${won?'win':'lose'}">${won?'🎉 우승! 🎉':'아쉽지만...'}</div>
    <div class="cr-ranking">
      ${all.map((a, i) => `<div class="cr-rank-row ${a.isMe?'me':''} ${i===0?'first':''}">
        <span class="cr-rank-num">${i+1}위</span>
        <span class="cr-rank-emoji">${a.emoji}</span>
        <span class="cr-rank-name">${a.name}</span>
        <span class="cr-rank-score">${a.total}점</span>
      </div>`).join('')}
    </div>
    ${won ? `
      <div class="cr-badge">
        <div class="cr-badge-emoji">${contest.badgeEmoji}</div>
        <div class="cr-badge-name">${contest.badgeName}</div>
      </div>
      <div class="cr-rewards">🌰 +${formatGold(contest.rewards.gold)}  💎 +${contest.rewards.gems}</div>
    ` : `<div style="font-size:12px;color:#aaa;margin:12px 0;">더 좋은 요리로 다시 도전해보세요!</div>`}
    <div class="cr-btn"><button onclick="closeContestResult()">확인</button></div>
  `;
  document.getElementById('contest-result-modal').classList.add('show');
  if(won) showChefBubble('우승이거덩요!!! 🏆');
}

function closeContestResult() {
  document.getElementById('contest-result-modal').classList.remove('show');
  currentContestId = null;
}

// ===========================
// STAFF SYSTEM (직원 시스템)
// ===========================

// --- Staff Panel Rendering ---
function renderStaffPanel() {
  const container = document.getElementById('staff-list');
  let html = '<div class="staff-grid">';
  STAFF_DATA.forEach(staff => {
    const hired = state.hiredStaff[staff.id];
    const condMet = checkStaffCondition(staff);
    const canAfford = state.gold >= staff.hireCost;
    if(hired) {
      html += `<div class="staff-card hired">
        <div class="sc-emoji">${staff.emoji}</div>
        <div class="sc-name">${staff.name}</div>
        <div class="sc-level">LV.${hired.level}</div>
        <button class="sc-btn detail" onclick="showStaffDetail('${staff.id}')">상세</button>
      </div>`;
    } else {
      html += `<div class="staff-card ${condMet ? '' : 'locked'}">
        <div class="sc-emoji">${staff.emoji}</div>
        <div class="sc-name">${staff.name}</div>
        <div class="sc-condition ${condMet ? 'met' : ''}">${condMet ? '✅' : '🔒'} ${staff.conditionText}</div>
        <div class="sc-cost">🌰 ${formatGold(staff.hireCost)}</div>
        <button class="sc-btn hire" ${condMet && canAfford ? '' : 'disabled'} onclick="hireStaff('${staff.id}')">고용하기</button>
      </div>`;
    }
  });
  html += '</div>';
  container.innerHTML = html;
}

function checkStaffCondition(staff) {
  const c = staff.hireCondition;
  if(c.type==='stoves') return state.numStoves >= c.min;
  if(c.type==='tables') return state.numTables >= c.min;
  if(c.type==='followers') return state.followers >= c.min;
  return false;
}

function hireStaff(staffId) {
  const staff = STAFF_DATA.find(s=>s.id===staffId);
  if(!staff || state.hiredStaff[staffId]) return;
  if(!checkStaffCondition(staff) || state.gold < staff.hireCost) return;
  state.gold -= staff.hireCost;
  state.hiredStaff[staffId] = { level:1, hiredAt:Date.now(), totalWorkTime:0 };
  updateHUD();
  showToast(`${staff.emoji} ${staff.name} 고용 완료!`);
  showChefBubble('새 직원이거덩요!');
  initStaffNPC(staffId);
  startStaffBehavior(staffId);
  renderStaffPanel();
}

// --- Staff Detail Modal ---
function showStaffDetail(staffId) {
  const staff = STAFF_DATA.find(s=>s.id===staffId);
  const hired = state.hiredStaff[staffId];
  if(!staff || !hired) return;
  const level = hired.level;
  const manualCost = getStaffLevelUpCost(level);
  const canLevelUp = state.trainingManuals >= manualCost;
  const maxLevel = 10;
  let effectHtml = '';
  if(staffId==='headchef') {
    const cookRed = (staff.baseEffects.cookTimeReduction + staff.levelEffects.cookTimeReduction*(level-1))*100;
    const priceUp = (staff.baseEffects.priceBonus + staff.levelEffects.priceBonus*(level-1))*100;
    effectHtml = `<div class="sd-info-row"><span>조리시간 감소</span><span>-${cookRed.toFixed(0)}%</span></div>
      <div class="sd-info-row"><span>요리 가격 증가</span><span>+${priceUp.toFixed(0)}%</span></div>`;
  } else if(staffId==='waiter') {
    const delay = Math.max(staff.minOrderDelay, staff.baseEffects.orderDelay - staff.levelEffects.orderDelayReduction*(level-1));
    effectHtml = `<div class="sd-info-row"><span>주문 딜레이</span><span>${(delay/1000).toFixed(1)}초</span></div>`;
  } else if(staffId==='pr') {
    const cd = Math.max(staff.minCooldown, staff.baseEffects.cooldown - staff.levelEffects.cooldownReduction*(level-1));
    effectHtml = `<div class="sd-info-row"><span>손님 소환 주기</span><span>${(cd/1000).toFixed(1)}초</span></div>`;
  } else if(staffId==='server') {
    const tipUp = (staff.baseEffects.tipBonus + staff.levelEffects.tipBonus*(level-1))*100;
    effectHtml = `<div class="sd-info-row"><span>팁 확률 증가</span><span>+${tipUp.toFixed(0)}%</span></div>`;
  }
  const workSec = Math.floor(hired.totalWorkTime/1000);
  const workMin = Math.floor(workSec/60);
  const workRemSec = workSec%60;
  const card = document.getElementById('staff-detail-card');
  card.innerHTML = `
    <div class="sd-portrait">${staff.emoji}</div>
    <div class="sd-name">${staff.name}</div>
    <div class="sd-desc">${staff.description}</div>
    <div class="sd-section">
      <h4>현재 효과 (LV.${level})</h4>
      ${effectHtml}
    </div>
    <div class="sd-section">
      <h4>근무 정보</h4>
      <div class="sd-info-row"><span>총 근무시간</span><span>${workMin}분 ${workRemSec}초</span></div>
    </div>
    <div class="sd-levelup-area">
      <div style="font-size:11px;color:#aaa;margin-bottom:8px">📕 훈련 교본: ${state.trainingManuals}개 (필요: ${level>=maxLevel?'-':manualCost}개)</div>
      <button class="btn-primary" ${level>=maxLevel || !canLevelUp ? 'disabled' : ''} onclick="levelUpStaff('${staffId}')" style="padding:8px 24px;border-radius:12px;">
        ${level>=maxLevel ? 'MAX LEVEL' : '레벨업!'}
      </button>
    </div>`;
  document.getElementById('staff-detail-modal').classList.add('show');
}
function closeStaffDetail() { document.getElementById('staff-detail-modal').classList.remove('show'); }

function levelUpStaff(staffId) {
  const hired = state.hiredStaff[staffId];
  if(!hired || hired.level>=10) return;
  const cost = getStaffLevelUpCost(hired.level);
  if(state.trainingManuals < cost) return;
  state.trainingManuals -= cost;
  hired.level++;
  const staff = STAFF_DATA.find(s=>s.id===staffId);
  showToast(`${staff.emoji} ${staff.name} LV.${hired.level}!`);
  updateHUD();
  showStaffDetail(staffId);
}

// --- NPC Visual System ---
const staffNPCElements = {};

function initStaffNPC(staffId) {
  if(staffNPCElements[staffId]) return;
  const staff = STAFF_DATA.find(s=>s.id===staffId);
  const npc = document.createElement('div');
  npc.className = 'npc-character npc-idle';
  npc.id = 'npc-'+staffId;
  npc.innerHTML = `${staff.emoji}<div class="npc-bubble"></div>`;
  if(staffId==='headchef') { npc.style.top='210px'; npc.style.left='100px'; }
  else if(staffId==='waiter') { npc.style.top='370px'; npc.style.left='180px'; }
  else if(staffId==='pr') { npc.style.top='630px'; npc.style.left='300px'; }
  else if(staffId==='server') { npc.style.top='400px'; npc.style.left='60px'; }
  document.getElementById('game-area').appendChild(npc);
  staffNPCElements[staffId] = npc;
}

function showNPCBubble(staffId, text) {
  const npc = staffNPCElements[staffId];
  if(!npc) return;
  const bubble = npc.querySelector('.npc-bubble');
  bubble.textContent = text;
  bubble.classList.add('show');
  clearTimeout(bubble._t);
  bubble._t = setTimeout(()=>bubble.classList.remove('show'), 2000);
}

// --- Head Chef: Player Roaming ---
let playerRoamInterval = null;
function startPlayerRoaming() {
  if(playerRoamInterval) return;
  playerRoamInterval = setInterval(()=>{
    if(!state.hiredStaff['headchef']) { stopPlayerRoaming(); return; }
    const top = 320 + Math.floor(Math.random()*230);
    const left = 20 + Math.floor(Math.random()*320);
    chefEl.style.top = top+'px';
    chefEl.style.left = left+'px';
  }, 4000);
}
function stopPlayerRoaming() {
  if(playerRoamInterval) { clearInterval(playerRoamInterval); playerRoamInterval=null; }
}

// --- Waiter Auto-Order ---
let waiterInterval = null;
let waiterBusy = false;
function startWaiterBehavior() {
  if(waiterInterval) return;
  waiterInterval = setInterval(()=>{
    if(!state.hiredStaff['waiter'] || waiterBusy) return;
    const waitingTable = state.tables.find(t=>t.id<state.numTables && t.status==='waiting_order');
    if(!waitingTable) {
      if(Math.random()<0.2) {
        const top = 320+Math.floor(Math.random()*200);
        const left = 20+Math.floor(Math.random()*320);
        const npc = staffNPCElements['waiter'];
        if(npc) { npc.style.top=top+'px'; npc.style.left=left+'px'; }
      }
      return;
    }
    waiterBusy = true;
    const staff = STAFF_DATA.find(s=>s.id==='waiter');
    const level = state.hiredStaff['waiter'].level;
    const delay = Math.max(staff.minOrderDelay, staff.baseEffects.orderDelay - staff.levelEffects.orderDelayReduction*(level-1));
    const tablePos = TABLE_POSITIONS[waitingTable.id];
    const npc = staffNPCElements['waiter'];
    if(npc) { npc.style.top=(310+tablePos.top-30)+'px'; npc.style.left=(10+tablePos.left+39)+'px'; }
    showNPCBubble('waiter', randomFrom(staff.speeches));
    setTimeout(()=>{
      if(waitingTable.status==='waiting_order') {
        takeOrder(waitingTable);
        state.hiredStaff['waiter'].totalWorkTime += delay;
      }
      waiterBusy = false;
    }, delay);
  }, 500);
}

// --- PR Auto Customer ---
let prTimeout = null;
function startPRBehavior() {
  if(prTimeout) return;
  function scheduleNext() {
    if(!state.hiredStaff['pr']) return;
    const staff = STAFF_DATA.find(s=>s.id==='pr');
    const level = state.hiredStaff['pr'].level;
    const cooldown = Math.max(staff.minCooldown, staff.baseEffects.cooldown - staff.levelEffects.cooldownReduction*(level-1));
    prTimeout = setTimeout(()=>{
      if(!state.hiredStaff['pr']) return;
      showNPCBubble('pr', randomFrom(staff.speeches));
      setTimeout(()=>{
        addCustomerToQueue();
        state.hiredStaff['pr'].totalWorkTime += cooldown;
      }, 1000);
      scheduleNext();
    }, cooldown);
  }
  scheduleNext();
}

// --- Server Visual Behavior ---
let serverInterval = null;
function startServerBehavior() {
  if(serverInterval) return;
  serverInterval = setInterval(()=>{
    if(!state.hiredStaff['server']) return;
    const staff = STAFF_DATA.find(s=>s.id==='server');
    const occupiedTables = state.tables.filter(t=>t.id<state.numTables && t.occupied);
    const npc = staffNPCElements['server'];
    if(!npc) return;
    if(occupiedTables.length) {
      const table = randomFrom(occupiedTables);
      const tablePos = TABLE_POSITIONS[table.id];
      npc.style.top=(310+tablePos.top-20)+'px';
      npc.style.left=(10+tablePos.left+60)+'px';
      showNPCBubble('server', randomFrom(staff.speeches));
      state.hiredStaff['server'].totalWorkTime += 5000;
    } else {
      const top = 340+Math.floor(Math.random()*200);
      const left = 20+Math.floor(Math.random()*320);
      npc.style.top=top+'px'; npc.style.left=left+'px';
    }
  }, 5000);
}

// --- Staff Behavior Init ---
function startStaffBehavior(staffId) {
  if(staffId==='headchef') startPlayerRoaming();
  else if(staffId==='waiter') startWaiterBehavior();
  else if(staffId==='pr') startPRBehavior();
  else if(staffId==='server') startServerBehavior();
}

function initExistingStaff() {
  Object.keys(state.hiredStaff).forEach(staffId=>{
    initStaffNPC(staffId);
    startStaffBehavior(staffId);
  });
}

// ===========================
// GAME LOOP
// ===========================
function gameLoop() { updateCooking(); requestAnimationFrame(gameLoop); }
updateHUD();
showChefBubble('어서오세요거덩요!');
gameLoop();
initExistingStaff();
setTimeout(()=>showToast('홍보 버튼을 눌러 손님을 불러보세요!'),1000);
