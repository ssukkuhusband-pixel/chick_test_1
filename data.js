// ===========================
// ALL RECIPES DATA (확장된 레시피 풀)
// ===========================
const ALL_RECIPES = [
  // normal — 소박한 요리 (5~10초)
  { id:'egg',    name:'계란후라이', icon:'🍳', rarity:'normal', category:'양식', basePrice:100, cookTime:3000,  eatTime:2500, taste:15, deco:5,  health:20, abilities:['LV3: 조리-1s','LV5: 가격+20%','LV7: 팁+10%','LV10: 가격+50%'] },
  { id:'salad',  name:'샐러드',    icon:'🥗', rarity:'normal', category:'양식', basePrice:150, cookTime:7000,  eatTime:2000, taste:10, deco:15, health:35, abilities:['LV3: 조리-1s','LV5: 가격+15%','LV7: 가격+15%','LV10: 가격+40%'] },
  { id:'soup',   name:'수프',      icon:'🍲', rarity:'normal', category:'양식', basePrice:180, cookTime:10000, eatTime:2500, taste:20, deco:5,  health:25, abilities:['LV3: 가격+10%','LV5: 가격+20%','LV7: 조리-2s','LV10: 가격+50%'] },
  { id:'rice',   name:'볶음밥',    icon:'🍚', rarity:'normal', category:'한식', basePrice:160, cookTime:8000,  eatTime:2500, taste:18, deco:8,  health:22, abilities:['LV3: 조리-1s','LV5: 가격+15%','LV7: 팁+10%','LV10: 가격+40%'] },
  // rare — (12~20초)
  { id:'pasta',  name:'파스타',    icon:'🍝', rarity:'rare',   category:'양식', basePrice:250, cookTime:15000, eatTime:3500, taste:28, deco:20, health:10, abilities:['LV3: 가격+10%','LV5: 가격+25%','LV7: 가격+15%','LV10: 가격+60%'] },
  { id:'pizza',  name:'피자',      icon:'🍕', rarity:'rare',   category:'양식', basePrice:300, cookTime:20000, eatTime:3000, taste:22, deco:30, health:8,  abilities:['LV3: 가격+10%','LV5: 가격+20%','LV7: 팁+15%','LV10: 가격+55%'] },
  { id:'curry',  name:'카레',      icon:'🍛', rarity:'rare',   category:'한식', basePrice:220, cookTime:12000, eatTime:3000, taste:25, deco:12, health:30, abilities:['LV3: 조리-2s','LV5: 가격+20%','LV7: 가격+15%','LV10: 가격+50%'] },
  { id:'ramen',  name:'라멘',      icon:'🍜', rarity:'rare',   category:'일식', basePrice:280, cookTime:18000, eatTime:3000, taste:35, deco:10, health:18, abilities:['LV3: 가격+10%','LV5: 조리-2s','LV7: 가격+25%','LV10: 가격+60%'] },
  // epic — (25~35초)
  { id:'steak',  name:'스테이크',  icon:'🥩', rarity:'epic',   category:'양식', basePrice:400, cookTime:30000, eatTime:4000, taste:40, deco:25, health:12, abilities:['LV3: 가격+15%','LV5: 가격+30%','LV7: 팁+20%','LV10: 가격+70%'] },
  { id:'sushi',  name:'스시',      icon:'🍣', rarity:'epic',   category:'일식', basePrice:450, cookTime:25000, eatTime:3500, taste:32, deco:42, health:28, abilities:['LV3: 가격+15%','LV5: 가격+30%','LV7: 팁+20%','LV10: 가격+80%'] },
  { id:'cake',   name:'케이크',    icon:'🍰', rarity:'epic',   category:'디저트', basePrice:350, cookTime:28000, eatTime:3000, taste:25, deco:48, health:5,  abilities:['LV3: 가격+15%','LV5: 피드확률+20%','LV7: 가격+30%','LV10: 가격+70%'] },
  // legend — (40~50초)
  { id:'lobster',name:'랍스터',    icon:'🦞', rarity:'legend', category:'양식', basePrice:600, cookTime:42000, eatTime:4000, taste:45, deco:35, health:15, abilities:['LV3: 가격+20%','LV5: 가격+40%','LV7: 팁+30%','LV10: 가격+100%'] },
  { id:'wagyu',  name:'와규',      icon:'🥓', rarity:'legend', category:'일식', basePrice:700, cookTime:50000, eatTime:4500, taste:50, deco:30, health:10, abilities:['LV3: 가격+20%','LV5: 가격+50%','LV7: 가격+25%','LV10: 가격+120%'] },
  // myth — (60초)
  { id:'truffle',name:'트러플요리',icon:'🍄', rarity:'myth',   category:'양식', basePrice:1000,cookTime:60000, eatTime:5000, taste:48, deco:45, health:8,  abilities:['LV3: 전체가격+5%','LV5: 가격+60%','LV7: 팁+40%','LV10: 가격+150%'] },
];

const RARITY_NAMES = { normal:'노멀', rare:'레어', epic:'에픽', legend:'레전드', myth:'신화' };
const RARITY_COLORS = { normal:'#aaa', rare:'#3498db', epic:'#9b59b6', legend:'#f39c12', myth:'#e74c3c' };

// ===========================
// SKILL DATA (16종)
// ===========================
const ALL_SKILLS = [
  { id:'s1', name:'칼질 연습', icon:'🔪', rarity:'normal', desc:'모든 요리 조리시간 3% 감소' },
  { id:'s2', name:'화력 조절', icon:'🔥', rarity:'normal', desc:'모든 요리 조리시간 5% 감소' },
  { id:'s3', name:'양식 마스터', icon:'🍽️', rarity:'normal', desc:'양식 가격 8% 증가' },
  { id:'s4', name:'한식 마스터', icon:'🥘', rarity:'normal', desc:'한식 가격 8% 증가' },
  { id:'s5', name:'일식 마스터', icon:'🍱', rarity:'normal', desc:'일식 가격 8% 증가' },
  { id:'s6', name:'디저트 장인', icon:'🧁', rarity:'normal', desc:'디저트 가격 10% 증가' },
  { id:'s7', name:'서비스 정신', icon:'😊', rarity:'normal', desc:'팁 확률 5% 증가' },
  { id:'s8', name:'청결 유지', icon:'✨', rarity:'normal', desc:'고객 만족도 증가' },
  { id:'s9', name:'플레이팅', icon:'🎨', rarity:'epic', desc:'피드 올릴 확률 10% 증가' },
  { id:'s10',name:'VIP 서비스', icon:'👑', rarity:'epic', desc:'희귀 손님 출현율 10% 증가' },
  { id:'s11',name:'효율 동선', icon:'🏃', rarity:'epic', desc:'서빙 속도 10% 증가' },
  { id:'s12',name:'재료 절약', icon:'💰', rarity:'epic', desc:'모든 요리 가격 5% 증가' },
  { id:'s13',name:'비밀 레시피', icon:'📜', rarity:'epic', desc:'뽑기 시 높은 등급 확률 증가' },
  { id:'s14',name:'미식가 감각', icon:'👅', rarity:'legend', desc:'모든 요리 가격 10% 증가' },
  { id:'s15',name:'인플루언서', icon:'📱', rarity:'legend', desc:'피드 올릴 확률 20% 증가' },
  { id:'s16',name:'전설의 셰프', icon:'⭐', rarity:'legend', desc:'모든 요리 가격 15% 증가' },
];

// ===========================
// EXPANSION DATA
// ===========================
const EXPANSIONS = [
  { id:'e1', name:'첫 번째 식탁', desc:'식탁 1개 추가 (총 2개)', icon:'🪑', cost:500, type:'table' },
  { id:'e2', name:'주방 확장 1', desc:'화구 1개 추가 (총 2개)', icon:'🔥', cost:1000, type:'stove' },
  { id:'e3', name:'세 번째 식탁', desc:'식탁 1개 추가 (총 3개)', icon:'🪑', cost:2000, type:'table' },
  { id:'e4', name:'네 번째 식탁', desc:'식탁 1개 추가 (총 4개)', icon:'🪑', cost:3500, type:'table' },
  { id:'e5', name:'주방 확장 2', desc:'화구 1개 추가 (총 3개)', icon:'🔥', cost:5000, type:'stove' },
  { id:'e6', name:'다섯 번째 식탁', desc:'식탁 1개 추가 (총 5개)', icon:'🪑', cost:7000, type:'table' },
  { id:'e7', name:'여섯 번째 식탁', desc:'식탁 1개 추가 (총 6개)', icon:'🪑', cost:10000, type:'table' },
  { id:'e8', name:'주방 확장 3', desc:'화구 1개 추가 (총 4개)', icon:'🔥', cost:15000, type:'stove' },
  { id:'e9', name:'일곱 번째 식탁', desc:'식탁 1개 추가 (총 7개)', icon:'🪑', cost:20000, type:'table' },
  { id:'e10',name:'여덟 번째 식탁', desc:'식탁 1개 추가 (총 8개)', icon:'🪑', cost:30000, type:'table' },
];

const TABLE_POSITIONS = [
  { top:5, left:23 },  { top:5, left:146 },  { top:5, left:269 },
  { top:85, left:23 }, { top:85, left:146 }, { top:85, left:269 },
  { top:165, left:23 },{ top:165, left:146 },
];

const STOVE_POSITIONS = [
  { top:50, left:14 }, { top:50, left:98 }, { top:50, left:182 }, { top:50, left:266 },
];

// ===========================
// CUSTOMERS DATA (50명)
// ===========================
const CUSTOMERS_DATA = [
  // --- 무조건 등장 (3명) ---
  { id:'c01', emoji:'🐣', name:'아기병아리', description:'아직 세상이 신기한 갓 태어난 병아리. 뭘 먹어도 맛있대요!', conditions:null, preference:null, followers:50, speechStyle:'cute', rare:false },
  { id:'c02', emoji:'🐥', name:'노른자', description:'밝고 긍정적인 성격의 병아리. 매일 와도 질리지 않는대요.', conditions:null, preference:null, followers:80, speechStyle:'cheerful', rare:false },
  { id:'c03', emoji:'🐤', name:'삐약이', description:'수줍음 많은 아기새. 먹는 걸로 스트레스를 풀어요.', conditions:null, preference:{ category:'양식' }, followers:30, speechStyle:'cute', rare:false },
  // --- 저요구 (15명) ---
  { id:'c04', emoji:'🐔', name:'닭순이', description:'동네에서 소문난 먹방 블로거. 리뷰가 정확해요.', conditions:{ minFollowers:3 }, preference:{ recipeId:'rice' }, followers:200, speechStyle:'blogger', rare:false },
  { id:'c05', emoji:'🐓', name:'꼬끼오', description:'새벽부터 일어나는 부지런한 닭. 아침 식사를 좋아해요.', conditions:{ minFollowers:3 }, preference:{ recipeId:'egg' }, followers:120, speechStyle:'cheerful', rare:false },
  { id:'c06', emoji:'🦆', name:'오리대장', description:'연못 마을의 리더. 든든한 한 끼를 선호해요.', conditions:{ minFollowers:6, minCookingLevel:20 }, preference:{ category:'한식' }, followers:300, speechStyle:'calm', rare:false },
  { id:'c07', emoji:'🐸', name:'개구리왕자', description:'연못에서 온 미식 왕자님. 의외로 입이 까다로워요.', conditions:{ minFollowers:6, minCookingLevel:20 }, preference:{ category:'양식' }, followers:150, speechStyle:'royal', rare:false },
  { id:'c08', emoji:'🐛', name:'애벌레', description:'먹는 게 직업! 언젠가 나비가 될 거예요.', conditions:{ minFollowers:8, minCookingLevel:25 }, preference:null, followers:60, speechStyle:'cute', rare:false },
  { id:'c09', emoji:'🐌', name:'달팽이셰프', description:'느리지만 확실한 미식가. 맛에 대한 기준이 높아요.', conditions:{ minFollowers:10, minCookingLevel:25 }, preference:{ category:'양식' }, followers:180, speechStyle:'calm', rare:false },
  { id:'c10', emoji:'🐝', name:'꿀벌이', description:'바쁜 일벌! 빠르게 먹고 가야 해요.', conditions:{ minFollowers:12, minCookingLevel:30 }, preference:{ category:'디저트' }, followers:220, speechStyle:'cheerful', rare:false },
  { id:'c11', emoji:'🦋', name:'나비양', description:'꽃밭에서 날아온 우아한 미식가. 디저트를 사랑해요.', conditions:{ minFollowers:15, minCookingLevel:30 }, preference:{ category:'디저트' }, followers:350, speechStyle:'calm', rare:false },
  { id:'c12', emoji:'🐢', name:'거북선장', description:'느긋한 바다 여행가. 어디든 천천히 도착해요.', conditions:{ minFollowers:18, minCookingLevel:35 }, preference:{ category:'일식' }, followers:250, speechStyle:'calm', rare:false },
  { id:'c13', emoji:'🐰', name:'토끼셰프', description:'당근 요리 전문가였지만 다른 음식도 좋아하게 됐어요.', conditions:{ minFollowers:22, minCookingLevel:35 }, preference:null, followers:400, speechStyle:'cheerful', rare:false },
  { id:'c14', emoji:'🐹', name:'햄찌', description:'볼에 음식을 잔뜩 넣는 귀여운 식객.', conditions:{ minFollowers:25, minCookingLevel:40 }, preference:null, followers:170, speechStyle:'cute', rare:false },
  { id:'c15', emoji:'🐭', name:'쥐돌이', description:'작지만 식욕은 누구에게도 지지 않아요!', conditions:{ minFollowers:28, minCookingLevel:40 }, preference:{ recipeId:'salad' }, followers:130, speechStyle:'slang', rare:false },
  { id:'c16', emoji:'🦔', name:'고슴이', description:'가시 때문에 오해받지만 마음은 따뜻한 미식가.', conditions:{ minFollowers:32, minCookingLevel:45 }, preference:{ recipeId:'soup' }, followers:190, speechStyle:'calm', rare:false },
  { id:'c17', emoji:'🐿️', name:'다람쥐', description:'도토리만 먹다가 새로운 세계를 발견했어요!', conditions:{ minFollowers:36, minCookingLevel:45 }, preference:null, followers:210, speechStyle:'cheerful', rare:false },
  { id:'c18', emoji:'🦜', name:'앵무', description:'맛있으면 "맛있다!"를 백 번 외치는 솔직한 새.', conditions:{ minFollowers:40, minCookingLevel:50 }, preference:null, followers:280, speechStyle:'slang', rare:false },
  // --- 중요구 (15명) ---
  { id:'c19', emoji:'🐧', name:'펭수', description:'남극에서 온 인기 아이돌. 팬이 엄청 많아요!', conditions:{ minFollowers:45, minCookingLevel:55 }, preference:{ category:'일식' }, followers:1000, speechStyle:'slang', rare:false },
  { id:'c20', emoji:'🦉', name:'올빼미', description:'밤에만 활동하는 지식인. 고급 요리를 선호해요.', conditions:{ minFollowers:50, minCookingLevel:55 }, preference:{ category:'양식' }, followers:500, speechStyle:'formal', rare:false },
  { id:'c21', emoji:'🐻', name:'곰사장', description:'숲속 사업가. 비즈니스 미팅용 식사를 찾고 있어요.', conditions:{ minFollowers:55, minCookingLevel:60 }, preference:null, followers:800, speechStyle:'formal', rare:false },
  { id:'c22', emoji:'🦝', name:'너구리', description:'변장의 달인! 맛집이라면 어디든 달려가요.', conditions:{ minFollowers:60, minCookingLevel:60, requiredRecipe:'pasta' }, preference:{ recipeId:'pasta' }, followers:420, speechStyle:'slang', rare:false },
  { id:'c23', emoji:'🐺', name:'늑대요리사', description:'은퇴한 요리사. 다른 식당의 맛이 궁금해요.', conditions:{ minFollowers:65, minCookingLevel:65 }, preference:null, followers:650, speechStyle:'formal', rare:false },
  { id:'c24', emoji:'🦫', name:'비버', description:'댐 건설 현장 인부. 든든한 식사가 필요해요!', conditions:{ minFollowers:70, minCookingLevel:65 }, preference:{ category:'한식' }, followers:320, speechStyle:'cheerful', rare:false },
  { id:'c25', emoji:'🐼', name:'판다', description:'대나무만 먹다 지쳤어요. 새로운 맛에 도전 중!', conditions:{ minFollowers:75, minCookingLevel:70, requiredRecipe:'rice' }, preference:{ recipeId:'rice' }, followers:900, speechStyle:'calm', rare:false },
  { id:'c26', emoji:'🦥', name:'나무늘보', description:'느리지만 맛에는 진심. 천천히 음미해요.', conditions:{ minFollowers:80, minCookingLevel:70 }, preference:{ category:'디저트' }, followers:380, speechStyle:'calm', rare:false },
  { id:'c27', emoji:'🐨', name:'코알라', description:'유칼립투스에 질린 호주 관광객. 이색 음식을 찾아요.', conditions:{ minFollowers:85, minCookingLevel:75 }, preference:{ category:'일식' }, followers:700, speechStyle:'cheerful', rare:false },
  { id:'c28', emoji:'🦩', name:'플라밍고', description:'분홍빛 패셔니스타. 예쁜 음식만 주문해요.', conditions:{ minFollowers:90, minCookingLevel:80 }, preference:{ category:'디저트' }, followers:1200, speechStyle:'blogger', rare:false },
  { id:'c29', emoji:'🐊', name:'악어백작', description:'늪지대의 귀족. 격식을 중시하는 식사를 원해요.', conditions:{ minFollowers:95, minCookingLevel:85 }, preference:{ category:'양식' }, followers:850, speechStyle:'royal', rare:false },
  { id:'c30', emoji:'🦒', name:'기린', description:'높은 곳에서 맛집을 내려다보며 찾아오는 미식가.', conditions:{ minFollowers:100, minCookingLevel:85 }, preference:null, followers:600, speechStyle:'calm', rare:false },
  { id:'c31', emoji:'🐘', name:'코끼리장군', description:'절대 맛을 잊지 않는 기억의 달인.', conditions:{ minFollowers:105, minCookingLevel:90 }, preference:null, followers:1500, speechStyle:'formal', rare:false },
  { id:'c32', emoji:'🦘', name:'캥거루', description:'호주에서 뛰어온 활발한 여행자. 주머니에 간식을 넣어가요.', conditions:{ minFollowers:110, minCookingLevel:90 }, preference:null, followers:550, speechStyle:'cheerful', rare:false },
  { id:'c33', emoji:'🐙', name:'문어요리사', description:'다리가 8개라 동시에 여러 가지를 맛볼 수 있어요.', conditions:{ minFollowers:115, minCookingLevel:95, requiredRecipe:'sushi' }, preference:{ category:'일식' }, followers:750, speechStyle:'formal', rare:false },
  // --- 고요구 (10명) ---
  { id:'c34', emoji:'🦈', name:'상어투자자', description:'맛에 투자하는 바다의 벤처캐피탈리스트.', conditions:{ minFollowers:120, minCookingLevel:100 }, preference:null, followers:2000, speechStyle:'formal', rare:false },
  { id:'c35', emoji:'🐳', name:'고래', description:'바다에서 가장 큰 식객. 한 번에 많이 먹어요!', conditions:{ minFollowers:125, minCookingLevel:105 }, preference:{ category:'일식' }, followers:1800, speechStyle:'calm', rare:false },
  { id:'c36', emoji:'🦅', name:'독수리기자', description:'하늘 위에서 맛집을 찾는 날카로운 눈.', conditions:{ minFollowers:130, minCookingLevel:110 }, preference:{ category:'양식' }, followers:2500, speechStyle:'blogger', rare:false },
  { id:'c37', emoji:'🐆', name:'치타', description:'가장 빠른 식객! 서빙이 느리면 화내요.', conditions:{ minFollowers:135, minCookingLevel:110 }, preference:null, followers:1600, speechStyle:'slang', rare:false },
  { id:'c38', emoji:'🦚', name:'공작', description:'화려함을 사랑하는 미식 비평가.', conditions:{ minFollowers:140, minCookingLevel:120 }, preference:{ category:'디저트' }, followers:3000, speechStyle:'royal', rare:false },
  { id:'c39', emoji:'🐻‍❄️', name:'북극곰', description:'얼음 왕국에서 온 VIP 손님. 특별한 요리를 원해요.', conditions:{ minFollowers:145, minCookingLevel:130 }, preference:{ recipeId:'lobster' }, followers:3500, speechStyle:'royal', rare:false },
  { id:'c40', emoji:'🦍', name:'고릴라대장', description:'정글의 보스. 의외로 섬세한 미각을 가졌어요.', conditions:{ minFollowers:150, minCookingLevel:130, requiredRecipe:'steak' }, preference:{ recipeId:'steak' }, followers:2800, speechStyle:'king', rare:false },
  { id:'c41', emoji:'🐅', name:'호랑이', description:'산속의 왕. 고급 요리만 인정하는 미식가.', conditions:{ minFollowers:155, minCookingLevel:140 }, preference:{ category:'양식' }, followers:4000, speechStyle:'king', rare:false },
  { id:'c42', emoji:'🐉', name:'아기용', description:'아직 어리지만 입맛은 용왕님을 닮았어요.', conditions:{ minFollowers:160, minCookingLevel:140, requiredRecipe:'ramen' }, preference:{ category:'일식' }, followers:3200, speechStyle:'cute', rare:false },
  { id:'c43', emoji:'🦄', name:'유니콘', description:'전설의 존재. 나타나면 행운이 찾아온대요!', conditions:{ minFollowers:165, minCookingLevel:150 }, preference:{ category:'디저트' }, followers:5000, speechStyle:'royal', rare:false },
  // --- 엘리트 (4명) ---
  { id:'c44', emoji:'🐲', name:'황금거북이', description:'천 년을 산 현자. 음식으로 세상을 판단해요.', conditions:{ minFollowers:175, minCookingLevel:160 }, preference:null, followers:8000, speechStyle:'royal', rare:false },
  { id:'c45', emoji:'🦖', name:'공룡', description:'멸종한 줄 알았는데 맛집 앞에 줄 서 있었어요.', conditions:{ minFollowers:185, minCookingLevel:170 }, preference:null, followers:12000, speechStyle:'king', rare:false },
  { id:'c46', emoji:'🐋', name:'대왕고래', description:'바다의 전설. 한 입이면 식당이 텅 빌 정도.', conditions:{ minFollowers:195, minCookingLevel:180, requiredRecipe:'wagyu' }, preference:{ recipeId:'wagyu' }, followers:15000, speechStyle:'calm', rare:false },
  { id:'c47', emoji:'🔥', name:'불사조', description:'전설의 새. 음식에서 영원의 불꽃을 찾고 있어요.', conditions:{ minFollowers:200, minCookingLevel:200, requiredRecipe:'truffle' }, preference:{ recipeId:'truffle' }, followers:25000, speechStyle:'royal', rare:false },
  // --- 레어 (3명, 기존 희귀 손님) ---
  { id:'c48', emoji:'🦊', name:'여우기자', description:'미식 전문 기자. 까다로운 입맛이지만, 인정하면 대서특필!', conditions:{ minFollowers:80, minCookingLevel:90 }, preference:{ category:'양식' }, followers:5000, speechStyle:'formal', rare:true },
  { id:'c49', emoji:'🐲', name:'용왕님', description:'바다 밑에서 올라온 최고의 미식가. 일식만 드신다는 소문.', conditions:{ minFollowers:140, minCookingLevel:140, requiredRecipe:'sushi' }, preference:{ category:'일식' }, followers:10000, speechStyle:'royal', rare:true },
  { id:'c50', emoji:'🦁', name:'라이언킹', description:'동물 왕국의 왕. 최고급 요리만 눈에 들어온다.', conditions:{ minFollowers:180, minCookingLevel:170 }, preference:{ recipeId:'lobster' }, followers:20000, speechStyle:'king', rare:true },
];

// ===========================
// LOYALTY SYSTEM
// ===========================
const LOYALTY_THRESHOLDS = [
  { level:1, visitsNeeded:0,  priceBonus:0.00 },
  { level:2, visitsNeeded:3,  priceBonus:0.05 },
  { level:3, visitsNeeded:8,  priceBonus:0.10 },
  { level:4, visitsNeeded:15, priceBonus:0.15 },
  { level:5, visitsNeeded:25, priceBonus:0.20 },
];
function getLoyaltyLevel(visits) {
  let result = LOYALTY_THRESHOLDS[0];
  for (const t of LOYALTY_THRESHOLDS) { if(visits >= t.visitsNeeded) result = t; }
  return result;
}
function getNextLoyaltyThreshold(visits) {
  for (const t of LOYALTY_THRESHOLDS) { if(visits < t.visitsNeeded) return t; }
  return null;
}

// ===========================
// FEED TEMPLATES (병스타그램 피드 시스템)
// ===========================
// topic: food/wait/value/interior/service/general
// sentiment: positive/negative
// condition: (선택) FEED_CONDITIONS 키 — 없으면 항상 후보
const FEED_TEMPLATES = {
  cute: [
    // food positive
    { topic:'food', sentiment:'positive', text:'여기 {recipe} 너무 맛있엉~ 🤤' },
    { topic:'food', sentiment:'positive', text:'{recipe} 냠냠! 최고야~ 🥰' },
    { topic:'food', sentiment:'positive', text:'{recipe} 또 먹고 싶어어~ 🐣' },
    { topic:'food', sentiment:'positive', text:'오늘 {recipe} 먹었는데요...\n한 입 먹자마자 눈이 반짝반짝 ✨\n이렇게 맛있는 건 처음이야!\n다음에 친구들이랑 또 올 거야~ 💕' },
    { topic:'food', sentiment:'positive', text:'{recipe} 냠냠 했는데\n너무 맛있어서 볼이 빵빵해졌엉 🐹\n사장님 최고야아~ 💛' },
    // food negative
    { topic:'food', sentiment:'negative', text:'{recipe}... 오늘은 좀 아쉬웠엉 😢' },
    { topic:'food', sentiment:'negative', text:'{recipe} 먹었는데...\n음... 기대했던 거랑 좀 달랐어 ㅠㅠ\n다음엔 더 맛있을 거라 믿을게! 🥺' },
    // wait positive
    { topic:'wait', sentiment:'positive', condition:'fastCook', text:'앉자마자 {recipe} 나왔엉! 빨라서 좋아~ 🐣✨' },
    { topic:'wait', sentiment:'positive', condition:'fastCook', text:'{recipe} 완전 빨리 나왔어!\n배고팠는데 바로 먹을 수 있어서\n너무 행복했엉~ 😆💕' },
    // wait negative
    { topic:'wait', sentiment:'negative', condition:'slowCook', text:'배고파서 쓰러질 뻔했엉... ⏰😢' },
    { topic:'wait', sentiment:'negative', condition:'slowCook', text:'{recipe} 기다리는데...\n{cookTime}초가 1시간 같았어 ㅠㅠ\n배에서 꼬르륵 소리 나서 부끄러웠엉 😖' },
    // value negative
    { topic:'value', sentiment:'negative', condition:'expensive', text:'{recipe} 맛있었는데... 좀 비싼 거 아니야? 🥺' },
    { topic:'value', sentiment:'positive', condition:'cheap', text:'{recipe} 이 가격에? 완전 착해엉! 💛' },
    // interior
    { topic:'interior', sentiment:'positive', text:'가게 너무 예뻐서 사진 찍었엉! 📸💕' },
    { topic:'interior', sentiment:'positive', text:'여기 분위기 너무 좋아~\n소품도 귀엽고 조명도 따뜻하고\n먹는 것만큼 눈도 행복해! ✨🥰' },
    // service
    { topic:'service', sentiment:'positive', text:'사장님(병아리) 너무 귀엽고 친절해! 🐤💛' },
    { topic:'service', sentiment:'positive', text:'사장님이 병아리인 식당 처음인데\n진짜 열심히 요리하는 모습 보면\n응원하고 싶어지는 거 있지~ 🐤✨' },
    // general
    { topic:'general', sentiment:'positive', text:'맛있는 거 먹으면 행복해! 💕' },
    { topic:'general', sentiment:'positive', condition:'highLoyalty', text:'여기 {visits}번째 방문이야~\n올 때마다 맛있어서 단골 됐엉 🐣\n사장님 항상 응원해! 💪💕' },
  ],
  cheerful: [
    // food positive
    { topic:'food', sentiment:'positive', text:'{recipe} 진짜 맛있다! 강추! 👍' },
    { topic:'food', sentiment:'positive', text:'{recipe} 먹으러 왔는데 역시 최고! 🙌' },
    { topic:'food', sentiment:'positive', text:'여기 오면 항상 기분이 좋아져요~ 😊' },
    { topic:'food', sentiment:'positive', text:'오늘 {recipe} 먹었는데요!\n진짜 미쳤어요 이 맛 ㅋㅋㅋ\n{category} 좋아하는 사람 다 데려오고 싶다!\n별점 100점 드릴게요 ⭐ 😆' },
    { topic:'food', sentiment:'positive', text:'{recipe} 맛있다고 소문 듣고 왔는데\n소문이 사실이었어요!\n이건 주변 사람들한테 알려야 해! 📢✨' },
    // food negative
    { topic:'food', sentiment:'negative', text:'{recipe}... 오늘은 좀 아쉬웠어요 😅' },
    { topic:'food', sentiment:'negative', text:'음... {recipe} 괜찮긴 한데\n기대가 너무 컸나? ㅋㅋ\n다음엔 더 맛있겠죠! 화이팅! 💪' },
    // wait positive
    { topic:'wait', sentiment:'positive', condition:'fastCook', text:'{recipe} 엄청 빨리 나왔어요! 서빙 속도 최고! ⚡😆' },
    // wait negative
    { topic:'wait', sentiment:'negative', condition:'slowCook', text:'{recipe} 좀 오래 걸렸지만... 맛으로 만회! ⏰' },
    { topic:'wait', sentiment:'negative', condition:'slowCook', text:'솔직히 좀 오래 기다렸어요 ㅋㅋ\n{cookTime}초면 다른 데선 두 그릇 먹는데...\n그래도 맛은 있었으니까요! 😅' },
    // value
    { topic:'value', sentiment:'negative', condition:'expensive', text:'{recipe} {price}도토리... 좀 세지 않나요? 😅💸' },
    { topic:'value', sentiment:'positive', condition:'cheap', text:'{recipe} 이 가격이면 완전 가성비! 최고예요! 💰✨' },
    // interior
    { topic:'interior', sentiment:'positive', text:'분위기 진짜 좋아요! 인스타 감성 가득! ✨📸' },
    { topic:'interior', sentiment:'positive', text:'여기 인테리어 진짜 예쁘다!\n포토존도 있고 소품도 귀엽고\n음식 사진 찍기 딱 좋은 곳이에요 📸\n데이트 코스로도 강추! 💕' },
    // service
    { topic:'service', sentiment:'positive', text:'사장님 진짜 열정적이에요! 응원합니다! 🐤💪' },
    { topic:'service', sentiment:'positive', text:'병아리 사장님이 직접 요리하는데\n진짜 열심히 하시는 게 느껴져요!\n이런 곳은 응원해야 해! 💛🔥' },
    // general
    { topic:'general', sentiment:'positive', text:'오늘도 여기서 기분충전! 🔋✨' },
    { topic:'general', sentiment:'positive', condition:'highLoyalty', text:'벌써 {visits}번째 방문! 😆\n여기는 올 때마다 기분이 좋아져요~\n역시 내 원픽 맛집! ⭐' },
  ],
  blogger: [
    // food positive
    { topic:'food', sentiment:'positive', text:'[맛집리뷰] {recipe} ⭐⭐⭐⭐⭐' },
    { topic:'food', sentiment:'positive', text:'솔직후기: {recipe} 이건 못 참지 🔥' },
    { topic:'food', sentiment:'positive', text:'[{category} 맛집] 병아리식당 {recipe}\n\n맛: ★★★★★\n비주얼: ★★★★☆\n재방문의사: 100%\n\n블로그 포스팅 각입니다.\n{recipe} 좋아하시는 분들은 꼭 가보세요! 📝' },
    { topic:'food', sentiment:'positive', text:'오늘의 먹방 픽: {recipe}!\n\n첫 한 입에 감탄이 나왔습니다.\n{category} 카테고리에서 이 정도 퀄리티는\n흔치 않아요. 상세리뷰 곧 올림 📝✨' },
    // food negative
    { topic:'food', sentiment:'negative', text:'[솔직후기] {recipe}... 기대 이하였습니다 😐' },
    { topic:'food', sentiment:'negative', text:'[리뷰] 병아리식당 {recipe}\n\n맛: ★★★☆☆\n기대감 대비 살짝 아쉬운 맛.\n개선의 여지가 보입니다.\n다음 방문 때 다시 평가 예정 📋' },
    // wait positive
    { topic:'wait', sentiment:'positive', condition:'fastCook', text:'[서빙속도] {recipe} 주문 후 바로 나옴! 회전율 최고 ⚡' },
    // wait negative
    { topic:'wait', sentiment:'negative', condition:'slowCook', text:'[웨이팅 후기] {recipe}\n\n대기시간: {cookTime}초 (체감 30분)\n맛은 괜찮았으나 웨이팅이 너무 길었습니다.\n바쁜 분들에게는 비추 ⏰📋' },
    { topic:'wait', sentiment:'negative', condition:'slowCook', text:'[속도 리뷰] 조리시간이 좀 깁니다.\n{cookTime}초 대기는 이 가격대에서\n감수하기 어려운 수준... ⏰' },
    // value
    { topic:'value', sentiment:'negative', condition:'expensive', text:'[가성비 평가] {recipe} {price}도토리\n\n솔직히 가격 대비 양이 아쉽습니다.\n맛은 인정하지만 가격 조정이 필요해 보여요 💸' },
    { topic:'value', sentiment:'positive', condition:'cheap', text:'[가성비 맛집] {recipe} 이 가격에 이 퀄리티?\n숨은 가성비 맛집 발견했습니다! 💰✨' },
    // interior
    { topic:'interior', sentiment:'positive', text:'[인테리어 리뷰] 병아리식당\n\n소품 하나하나에 감성이 느껴지는 곳!\n사진 찍기 좋은 포토존도 있어요 📸\n분위기만으로도 재방문 가치 충분 💯' },
    // service
    { topic:'service', sentiment:'positive', text:'[서비스] 병아리 사장님 직접 요리! 정성이 느껴짐 🐤' },
    { topic:'service', sentiment:'positive', text:'[사장님 리뷰]\n병아리인데 요리 실력이 장난 아닙니다.\n작은 체구로 열심히 요리하는 모습에\n감동받았어요. 단골 확정! 🐤💛' },
    // general
    { topic:'general', sentiment:'positive', text:'블로그 포스팅 각! 인생맛집 등극 📸' },
    { topic:'general', sentiment:'positive', condition:'firstVisit', text:'[첫 방문 후기] 병아리식당\n\n소문 듣고 처음 방문했는데\n기대 이상이었습니다!\n조만간 상세 리뷰 올리겠습니다 📝⭐' },
    { topic:'general', sentiment:'positive', condition:'highLoyalty', text:'[단골 리뷰] {visits}회 방문 후기\n\n벌써 {visits}번째 방문입니다.\n올 때마다 안정적인 퀄리티에 감탄해요.\n블로거가 인정한 진짜 맛집! ⭐📝' },
  ],
  formal: [
    // food positive
    { topic:'food', sentiment:'positive', text:'{recipe}의 풍미가 인상적이었습니다.' },
    { topic:'food', sentiment:'positive', text:'미식 칼럼에 소개할 만한 {recipe}입니다.' },
    { topic:'food', sentiment:'positive', text:'이 가게의 {recipe}를 시식하였습니다.\n{category} 분야에서 이 정도의 완성도는\n주목할 만합니다.\n재방문하여 다시 평가할 가치가 있습니다.' },
    { topic:'food', sentiment:'positive', text:'수준 높은 {recipe}에 감탄했습니다.\n재료의 신선함과 조리의 정확성이\n조화를 이루고 있군요.' },
    // food negative
    { topic:'food', sentiment:'negative', text:'{recipe}, 개선의 여지가 있어 보입니다.' },
    { topic:'food', sentiment:'negative', text:'{recipe}를 시식하였으나\n기대에 미치지 못하는 수준이었습니다.\n좀 더 연구가 필요해 보입니다.' },
    // wait positive
    { topic:'wait', sentiment:'positive', condition:'fastCook', text:'주문 후 신속하게 제공된 {recipe}. 효율적인 주방입니다.' },
    // wait negative
    { topic:'wait', sentiment:'negative', condition:'slowCook', text:'조리 시간이 {cookTime}초.\n고급 요리라 하더라도\n이 정도의 대기 시간은\n개선이 필요한 부분입니다.' },
    // value
    { topic:'value', sentiment:'negative', condition:'expensive', text:'{recipe}의 가격({price}도토리)이\n제공되는 가치 대비 다소 높게 책정된 느낌입니다.' },
    { topic:'value', sentiment:'positive', condition:'cheap', text:'{recipe}의 가격 대비 품질이 매우 우수합니다.' },
    // interior
    { topic:'interior', sentiment:'positive', text:'소규모 식당이지만 인테리어에\n세심한 배려가 느껴집니다.\n쾌적한 식사 환경이었습니다.' },
    // service
    { topic:'service', sentiment:'positive', text:'이 가게의 {recipe}, 기사 작성 가치가 있군요.\n주인장의 성실한 태도가 인상적입니다.' },
    // general
    { topic:'general', sentiment:'positive', text:'전반적으로 만족스러운 식사였습니다.' },
    { topic:'general', sentiment:'positive', condition:'highLoyalty', text:'{visits}회 방문 소감을 기술합니다.\n꾸준한 품질 유지에 경의를 표합니다.\n이 가게는 장기적으로 주목할 가치가 있습니다.' },
    { topic:'general', sentiment:'positive', condition:'rareRecipe', text:'{recipe}와 같은 고급 메뉴를 취급하는 곳이\n이 규모의 식당에서는 이례적입니다.\n높이 평가할 만합니다.' },
  ],
  royal: [
    // food positive
    { topic:'food', sentiment:'positive', text:'짐이 인정하노라. {recipe}이 가히 일품이로다! 👑' },
    { topic:'food', sentiment:'positive', text:'이 {recipe}, 용궁의 식탁에 올려도 손색이 없느니라.' },
    { topic:'food', sentiment:'positive', text:'짐의 입맛을 사로잡은 {recipe}이로구나!\n이토록 훌륭한 {category} 요리라니...\n궁중의 어선에 올려도 부족함이 없도다.\n이 가게에 어명을 내려 보호하리라! 👑✨' },
    // food negative
    { topic:'food', sentiment:'negative', text:'이 {recipe}... 짐의 기대에는 미치지 못하는구나.' },
    { topic:'food', sentiment:'negative', text:'짐이 기대를 갖고 임하였으나\n{recipe}이 용궁의 기준에는\n아직 부족하다 하겠노라.\n정진하거라.' },
    // wait positive
    { topic:'wait', sentiment:'positive', condition:'fastCook', text:'짐이 앉자마자 요리가 나왔도다! 대견하구나! 👑' },
    // wait negative
    { topic:'wait', sentiment:'negative', condition:'slowCook', text:'짐을 이토록 기다리게 하다니!\n{cookTime}초나 걸리다니 불경한 일이로다.\n허나... 맛으로 용서하리라.' },
    // value
    { topic:'value', sentiment:'negative', condition:'expensive', text:'짐의 금고에서 {price}도토리나 나갔도다.\n맛은 인정하나 가격이 과하구나.' },
    { topic:'value', sentiment:'positive', condition:'cheap', text:'이 가격에 이런 요리라니! 백성들의 벗이로구나! 👑' },
    // interior
    { topic:'interior', sentiment:'positive', text:'이 작은 식당에도 풍류가 깃들어 있구나.\n짐이 거닐기에 나쁘지 않은 곳이로다.' },
    // service
    { topic:'service', sentiment:'positive', text:'이런 {recipe}라면 매일 행차하여도 좋으리.\n병아리 주인장, 짐이 특별히 칭찬하노라! 🐤👑' },
    // general
    { topic:'general', sentiment:'positive', condition:'highLoyalty', text:'짐이 이 가게에 {visits}번이나 행차하였노라.\n이는 짐의 신뢰를 의미하느니라.\n앞으로도 정진하거라! 👑' },
    { topic:'general', sentiment:'positive', condition:'firstVisit', text:'짐이 처음 행차한 곳이로구나.\n첫인상이 나쁘지 않으니\n다시 찾을 가치가 있겠도다.' },
  ],
  king: [
    // food positive
    { topic:'food', sentiment:'positive', text:'이 {recipe}... 왕의 입맛을 만족시키는군. 🦁' },
    { topic:'food', sentiment:'positive', text:'백수의 왕이 인정한 맛, {recipe}! 👑' },
    { topic:'food', sentiment:'positive', text:'크흠... {recipe}이 제법이군.\n이 정도면 왕의 식탁에\n올려도 되겠어.\n{recipe}, 훌륭하다.' },
    // food negative
    { topic:'food', sentiment:'negative', text:'{recipe}... 왕의 기준에는 못 미치는군.' },
    { topic:'food', sentiment:'negative', text:'크흠... {recipe}이 이 정도인가.\n왕국의 요리사들이 더 잘하겠군.\n분발하도록.' },
    // wait positive
    { topic:'wait', sentiment:'positive', condition:'fastCook', text:'빠르군. 왕을 기다리게 하지 않는 것은 현명한 처사다.' },
    // wait negative
    { topic:'wait', sentiment:'negative', condition:'slowCook', text:'왕을 {cookTime}초나 기다리게 하다니.\n대담하군... 🦁' },
    // value
    { topic:'value', sentiment:'negative', condition:'expensive', text:'{price}도토리라... 왕이라도 생각 좀 하겠군.' },
    { topic:'value', sentiment:'positive', condition:'cheap', text:'이 가격에 이 맛이면 백성들도 즐길 수 있겠군. 훌륭하다.' },
    // interior
    { topic:'interior', sentiment:'positive', text:'작은 가게지만 정갈하군. 왕의 눈에 들었다.' },
    // service
    { topic:'service', sentiment:'positive', text:'{recipe}, 훌륭하다. 다시 오겠다.\n작은 병아리가 이 정도 요리를 하다니.\n인정하마.' },
    // general
    { topic:'general', sentiment:'positive', text:'크흠... 나쁘지 않군.' },
    { topic:'general', sentiment:'positive', condition:'highLoyalty', text:'이 가게에 {visits}번이나 왔군.\n왕이 이렇게 자주 찾는 가게는\n흔치 않다. 자부심을 가져라. 🦁👑' },
  ],
  slang: [
    // food positive
    { topic:'food', sentiment:'positive', text:'{recipe} ㄹㅇ 미침 ㅋㅋㅋ 🤣' },
    { topic:'food', sentiment:'positive', text:'ㅇㅈ? ㅇㅇ {recipe} 인정 ㅋ' },
    { topic:'food', sentiment:'positive', text:'{recipe} 찐이다 찐 ㄷㄷ' },
    { topic:'food', sentiment:'positive', text:'{recipe} 개맛있음 ㄱㄱ 🔥\n아 근데 이거 먹어본 사람만\n아는 맛임 ㅋㅋㅋ 마싯 ㄷㄷ' },
    // food negative
    { topic:'food', sentiment:'negative', text:'{recipe} 음... ㅋ 뭐 그저 그럼 ㅋ' },
    { topic:'food', sentiment:'negative', text:'{recipe} 기대하고 갔는데\n솔직히 좀 별로 ㅋㅋ\n맛은 본인이 판단 ㄱㄱ' },
    // wait positive
    { topic:'wait', sentiment:'positive', condition:'fastCook', text:'ㅋㅋ 앉자마자 나옴 속도 미침 ⚡' },
    // wait negative
    { topic:'wait', sentiment:'negative', condition:'slowCook', text:'아 {cookTime}초 기다림 ㅋ 배고파 죽는줄 ㅋㅋ' },
    { topic:'wait', sentiment:'negative', condition:'slowCook', text:'웨이팅 겁나 길어서\n거의 기절할뻔 ㅋㅋㅋ\n{cookTime}초가 {cookTime}년 같았음 ㄷㄷ' },
    // value
    { topic:'value', sentiment:'negative', condition:'expensive', text:'{recipe} {price}도토리 ㅋ 좀 비싸지않냐 ㅋㅋ 💸' },
    { topic:'value', sentiment:'positive', condition:'cheap', text:'{recipe} 이 가격 ㅋㅋ 미쳤다 가성비 ㄷㄷ' },
    // interior
    { topic:'interior', sentiment:'positive', text:'여기 분위기 ㅋㅋ 나름 감성있음 ✨' },
    // service
    { topic:'service', sentiment:'positive', text:'사장 병아린데 요리 잘함 ㅋㅋ 인정 🐤' },
    // general
    { topic:'general', sentiment:'positive', text:'{recipe} 먹어봐 진짜 ㄱㄱ 🔥' },
    { topic:'general', sentiment:'positive', condition:'highLoyalty', text:'여기 {visits}번째 옴 ㅋㅋ\n이쯤 되면 단골 맞지 ㅋ\n매번 와도 맛있음 ㄹㅇ' },
  ],
  calm: [
    // food positive
    { topic:'food', sentiment:'positive', text:'{recipe}... 조용히 음미하기 좋은 맛이에요.' },
    { topic:'food', sentiment:'positive', text:'평화로운 시간, 좋은 {recipe}. ☕' },
    { topic:'food', sentiment:'positive', text:'마음이 편안해지는 {recipe}이네요.' },
    { topic:'food', sentiment:'positive', text:'{recipe}를 천천히 음미했어요.\n한 입 한 입 맛볼수록\n깊은 풍미가 느껴지더라고요.\n조용한 오후, 참 좋은 시간이었어요. ☕🍃' },
    // food negative
    { topic:'food', sentiment:'negative', text:'{recipe}... 오늘은 조금 아쉬운 맛이었네요.' },
    { topic:'food', sentiment:'negative', text:'{recipe}를 먹었는데...\n평소와 조금 다른 느낌이었어요.\n그래도 괜찮아요. 다음이 있으니까.' },
    // wait positive
    { topic:'wait', sentiment:'positive', condition:'fastCook', text:'{recipe}가 금방 나왔어요. 여유로운 시간이 늘었네요. ☕' },
    // wait negative
    { topic:'wait', sentiment:'negative', condition:'slowCook', text:'조용히 기다렸지만...\n{cookTime}초는 조금 길었어요.\n기다리는 것도 여유지만\n적당한 게 좋겠죠.' },
    // value
    { topic:'value', sentiment:'negative', condition:'expensive', text:'{recipe} {price}도토리... 조금 부담되는 가격이네요.' },
    { topic:'value', sentiment:'positive', condition:'cheap', text:'{recipe}가 이 가격이라니.\n소소한 행복을 느꼈어요. 🍃' },
    // interior
    { topic:'interior', sentiment:'positive', text:'이 가게의 고요한 분위기가 좋아요.\n마음이 편안해지는 공간이에요. 🍃' },
    // service
    { topic:'service', sentiment:'positive', text:'여유롭게 즐긴 {recipe}, 감사해요.\n사장님의 따뜻한 마음이 느껴지는 곳이에요.' },
    // general
    { topic:'general', sentiment:'positive', text:'조용히 쉬어가기 좋은 곳이에요. 🍃' },
    { topic:'general', sentiment:'positive', condition:'highLoyalty', text:'{visits}번째 방문이에요.\n올 때마다 마음이 편안해져요.\n이 가게는 저만의 안식처 같아요. ☕🍃' },
    { topic:'general', sentiment:'positive', condition:'firstVisit', text:'처음 방문했는데...\n왠지 또 오고 싶은 느낌이에요.\n좋은 곳을 찾은 것 같아요. ☕' },
  ],
  default: [
    // food positive
    { topic:'food', sentiment:'positive', text:'{recipe} 맛있어요! 👍' },
    { topic:'food', sentiment:'positive', text:'여기 {recipe} 진짜 맛있다! 🤤' },
    { topic:'food', sentiment:'positive', text:'{recipe} 먹으러 왔는데 역시 최고 👍' },
    { topic:'food', sentiment:'positive', text:'오늘의 {recipe}.. 눈물날 뻔 😭\n이렇게 맛있을 줄이야!\n다음에 또 올게요~ 💕' },
    // food negative
    { topic:'food', sentiment:'negative', text:'{recipe}... 음, 기대와 좀 달랐어요 😅' },
    // wait positive
    { topic:'wait', sentiment:'positive', condition:'fastCook', text:'{recipe} 진짜 빨리 나왔어요! ⚡' },
    // wait negative
    { topic:'wait', sentiment:'negative', condition:'slowCook', text:'{recipe} 좀 오래 기다렸어요... ⏰' },
    // value
    { topic:'value', sentiment:'negative', condition:'expensive', text:'{recipe} 좀 비싼 것 같아요... 💸' },
    { topic:'value', sentiment:'positive', condition:'cheap', text:'{recipe} 이 가격에 이 맛? 미쳤다 🤯' },
    // interior
    { topic:'interior', sentiment:'positive', text:'인테리어 너무 예뻐서 사진 찍었어요 📸' },
    { topic:'interior', sentiment:'positive', text:'분위기 맛집 인정! ✨\n소품도 귀엽고 분위기도 좋고\n사진 찍기 딱 좋아요! 📸' },
    // service
    { topic:'service', sentiment:'positive', text:'사장님 너무 친절해요 ㅠㅠ 💛' },
    { topic:'service', sentiment:'positive', text:'사장님이 병아린데 요리를 진짜 잘함 🐤' },
    // general
    { topic:'general', sentiment:'positive', text:'병아리식당 강추!! ⭐⭐⭐⭐⭐' },
    { topic:'general', sentiment:'positive', text:'여기 숨은 맛집이에요 🤫' },
    { topic:'general', sentiment:'positive', text:'오늘 점심 여기서 해결! 굿 🙌' },
  ],
};

// ===========================
// FEED CONDITIONS (피드 조건 판별)
// ===========================
const FEED_CONDITIONS = {
  slowCook:    (ctx) => ctx.cookTimeMs > 30000,
  fastCook:    (ctx) => ctx.cookTimeMs < 10000,
  expensive:   (ctx) => ctx.priceRatio > 1.8,
  cheap:       (ctx) => ctx.priceRatio < 1.2,
  highLoyalty: (ctx) => ctx.loyaltyLevel >= 3,
  firstVisit:  (ctx) => ctx.visits === 1,
  rareRecipe:  (ctx) => ['epic','legend','myth'].includes(ctx.recipeRarity),
};

// ===========================
// FEED TOPIC ICONS (주제별 이미지)
// ===========================
const FEED_TOPIC_ICONS = {
  food: null,
  wait: '⏰',
  value: '💰',
  interior: '🏠',
  service: '🐤',
  general: '⭐',
};

const FEED_NEGATIVE_GRADIENTS = [
  'linear-gradient(135deg, #bdc3c7, #95a5a6)',
  'linear-gradient(135deg, #dfe6e9, #b2bec3)',
  'linear-gradient(135deg, #636e72, #b2bec3)',
];

const FEED_IMAGE_GRADIENTS = [
  'linear-gradient(135deg, #ffecd2, #fcb69f)',
  'linear-gradient(135deg, #a1c4fd, #c2e9fb)',
  'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
  'linear-gradient(135deg, #84fab0, #8fd3f4)',
  'linear-gradient(135deg, #fccb90, #d57eeb)',
  'linear-gradient(135deg, #e0c3fc, #8ec5fc)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
];

const PROMO_CLICKS_NEEDED = 5;

// ===========================
// CUSTOMER SPEECH (말풍선 대사)
// ===========================
// 상황: waiting(대기열), eating(식사중), waiting_long(요리 오래 걸림), leaving(퇴장)
// leaving만 positive/negative 분리, 나머지는 중립~긍정 대사
const CUSTOMER_SPEECH = {
  waiting: {
    cute: ['빨리 앉고 싶엉~', '배고파아~ 🥺', '자리 아직이야~?', '기다리는 중이엉...'],
    cheerful: ['오늘 뭐 먹지? 😆', '기대된다~!', '배고파요~!', '얼른 앉고 싶어!'],
    blogger: ['웨이팅 중... 📝', '인기 맛집인가?', '줄이 있네 ㅎ'],
    formal: ['대기 중입니다.', '차례를 기다리겠습니다.', '질서 있게...'],
    royal: ['짐을 기다리게 하다니!', '이 대기열은 뭐냐!', '어서 안내하거라.'],
    king: ['왕이 기다린다...', '크흠... 느리군.', '서두르도록.'],
    slang: ['아 언제 앉냐 ㅋ', '배고파 죽겠 ㅋㅋ', 'ㅋㅋ 줄 기네'],
    calm: ['천천히 기다릴게요.', '괜찮아요, 여유롭게...', '기다리는 것도 좋아요.'],
    default: ['배고파요~', '자리 있나요?', '기다리는 중!'],
  },
  eating: {
    cute: ['냠냠~ 맛있엉! 💕', '볼이 빵빵해~ 🐹', '행복해엉~ ✨', '한 입 더~!'],
    cheerful: ['맛있다! 👍', '이거 대박! 🔥', '우와 진짜 맛있어!', '최고예요!'],
    blogger: ['이 맛은... 📝', '사진 찍어야지 📸', '리뷰 각이다!'],
    formal: ['풍미가 좋군요.', '훌륭합니다.', '인상적인 맛입니다.'],
    royal: ['오호, 제법이로구나!', '짐의 입맛에 맞는다!', '가히 일품이로다!'],
    king: ['크흠... 괜찮군.', '인정하마.', '왕이 인정한 맛이다.'],
    slang: ['ㅋㅋ 맛있음', 'ㄹㅇ 맛있다 ㅋ', '미침 이거 ㅋㅋ'],
    calm: ['음... 좋은 맛이에요.', '마음이 편안해져요.', '조용히 음미할게요.'],
    default: ['맛있다~!', '냠냠!', '잘 먹겠습니다!'],
  },
  waiting_long: {
    cute: ['아직 안 나왔엉...? 😢', '배꼽시계 울려엉 ㅠ', '조금만 더 기다릴게...'],
    cheerful: ['좀 오래 걸리네? 😅', '기다리는 중~!', '배고파지는데... ㅎㅎ'],
    blogger: ['대기시간 메모 중... ⏰', '웨이팅 길다...', '속도 개선 필요'],
    formal: ['다소 시간이 걸리는군요.', '조리 시간이 긴 편입니다.', '인내심을 시험하는군요.'],
    royal: ['짐을 얼마나 더 기다리게 할 셈이냐!', '어서 준비하거라!', '불경하구나...'],
    king: ['왕을 기다리게 하다니.', '느리군... 매우.', '인내에도 한계가 있다.'],
    slang: ['아 배고파 죽겠음 ㅋ', '언제 나오냐 ㅋㅋ', '좀 느린듯? ㅋ'],
    calm: ['천천히 기다릴게요...', '여유를 가져볼게요.', '괜찮아요, 기다려요.'],
    default: ['좀 오래 걸리나...?', '배고프다...', '아직인가요?'],
  },
  leaving: {
    cute: {
      positive: ['맛있었엉~ 또 올게! 💕', '행복했엉! 🐣✨', '최고였엉~! 💛', '또 올 거야~ 바이바이!'],
      negative: ['음... 다음엔 더 맛있을 거지? 🥺', '아쉬웠엉... ㅠ', '기대했는데 좀... 😢'],
    },
    cheerful: {
      positive: ['최고였어요! 또 올게! 😆', '기분 좋아~! ⭐', '친구한테 추천할게요!', '맛있었어요!'],
      negative: ['음... 조금 아쉬웠어요 😅', '다음엔 더 좋겠죠? ㅎㅎ', '괜찮았어요... 아마도?'],
    },
    blogger: {
      positive: ['별점 5점! ⭐⭐⭐⭐⭐', '리뷰 올릴게요! 📝', '블로그 포스팅 각! 📸', '인생 맛집 등극!'],
      negative: ['별점 3점... ★★★☆☆', '솔직 리뷰 올려야겠네 📋', '개선이 필요해 보여요.'],
    },
    formal: {
      positive: ['만족스러운 식사였습니다.', '다시 방문하겠습니다.', '훌륭한 경험이었습니다.'],
      negative: ['기대에 미치지 못했습니다.', '개선의 여지가 있습니다.', '아쉬운 점이 있었습니다.'],
    },
    royal: {
      positive: ['짐이 인정하노라! 👑', '다시 행차하리라!', '짐의 총애를 받을지어다!'],
      negative: ['짐의 기대에 미치지 못하는구나.', '정진하거라...', '아직 멀었느니라.'],
    },
    king: {
      positive: ['왕이 인정한다. 🦁', '다시 오겠다.', '훌륭하군.'],
      negative: ['분발하도록.', '왕의 기준엔 못 미친다.', '아쉽군...'],
    },
    slang: {
      positive: ['ㅋㅋ 잘먹음 ㄱㄱ', 'ㄹㅇ 맛있었음 ㅋ', '또 옴 ㅋㅋ 🔥'],
      negative: ['음 뭐 그저 그럼 ㅋ', '좀 별로였음 ㅋㅋ', '다음엔 좀... ㅋ'],
    },
    calm: {
      positive: ['좋은 시간이었어요. ☕', '마음이 편안해졌어요.', '또 올게요, 천천히.'],
      negative: ['조금 아쉬웠네요...', '괜찮아요, 다음이 있으니까.', '음... 그래도 괜찮았어요.'],
    },
    default: {
      positive: ['맛있었어요! 👍', '잘 먹었습니다!', '또 올게요!', '좋았어요!'],
      negative: ['음... 그럭저럭? 😅', '좀 아쉬웠어요...', '다음엔 더 맛있겠죠?'],
    },
  },
};

// ===========================
// FEED HASHTAGS (피드 해시태그)
// ===========================
// topic별 해시태그 풀 (1~3개 랜덤 선택)
const FEED_HASHTAGS = {
  food: ['#먹스타그램', '#맛있다그램', '#오늘뭐먹지', '#혼밥일기', '#먹방', '#푸드스타그램', '#맛집탐방', '#냠냠', '#야미', '#존맛탱', '#JMT', '#맛집추천', '#오늘의밥상', '#밥스타그램'],
  wait: ['#웨이팅맛집', '#기다린보람', '#줄서는맛집', '#인내의맛', '#배고파', '#웨이팅', '#오래기다림'],
  value: ['#가성비맛집', '#가성비끝판왕', '#혜자스럽다', '#착한가격', '#돈값하는', '#가격실화'],
  interior: ['#분위기맛집', '#인테리어맛집', '#감성카페', '#포토존', '#인스타감성', '#핫플', '#숨은맛집', '#아늑한곳'],
  service: ['#친절한사장님', '#서비스맛집', '#사장님최고', '#단골각', '#마음이따뜻'],
  general: ['#일상', '#소확행', '#행복한하루', '#오늘도맛있다', '#좋아요반사', '#추천맛집', '#먹을때가제일행복해', '#힐링'],
};
const FEED_HASHTAGS_COMMON = ['#병아리식당', '#숲속맛집'];
const FEED_HASHTAGS_PERSONAL = [
  '#친구와함께', '#혼밥', '#데이트', '#퇴근후한끼', '#점심시간', '#주말나들이',
  '#맛집기록', '#나만의맛집', '#또올거야', '#단골인증', '#오늘의선택',
  '#배부르다', '#잘먹었습니다', '#행복뿜뿜', '#힐링타임', '#먹부림',
  '#산책하다발견', '#우연히들린', '#소개받은곳', '#엄마가좋아할맛',
];

// ===========================
// STAFF DATA (직원 시스템)
// ===========================
const STAFF_DATA = [
  { id:'headchef', name:'주방장', emoji:'🧑‍🍳',
    description:'요리를 대신해주는 베테랑 주방장. 고용하면 사장님은 쉴 수 있어요!',
    hireCost:5000, hireCondition:{type:'stoves',min:4}, conditionText:'화구 4개 이상',
    baseEffects:{cookTimeReduction:0.05, priceBonus:0.05},
    levelEffects:{cookTimeReduction:0.02, priceBonus:0.02},
    speeches:['불 조절이 중요하거든요!','비법은 사랑이에요~','주방은 전쟁이거든요!','화력 올려볼까요?','맛의 비밀은 정성!'] },
  { id:'waiter', name:'웨이터', emoji:'🐧',
    description:'주문을 자동으로 받아주는 부지런한 직원. 사장님이 안 눌러도 돼요!',
    hireCost:8000, hireCondition:{type:'tables',min:6}, conditionText:'식탁 6개 이상',
    baseEffects:{orderDelay:3000}, levelEffects:{orderDelayReduction:200}, minOrderDelay:500,
    speeches:['주문 받겠습니다~!','메뉴 선택하셨나요?','바로 갈게요!','주문이요!','어서오세요~'] },
  { id:'pr', name:'홍보직원', emoji:'📣',
    description:'자동으로 손님을 데려오는 마케팅 전문가. 홍보 버튼 안 눌러도 손님이 와요!',
    hireCost:3000, hireCondition:{type:'followers',min:20}, conditionText:'팔로워 20명 이상',
    baseEffects:{cooldown:10000}, levelEffects:{cooldownReduction:500}, minCooldown:5000,
    speeches:['맛집이라고 소문났어요!','오늘도 홍보 완료!','손님 오고 계세요!','입소문 최고!','SNS에 올려볼게요~'] },
  { id:'server', name:'서버', emoji:'🐰',
    description:'물 서비스와 인사로 팁을 올려주는 직원. 손님 만족도가 올라가요!',
    hireCost:12000, hireCondition:{type:'tables',min:8}, conditionText:'식탁 8개 이상',
    baseEffects:{tipBonus:0.05}, levelEffects:{tipBonus:0.03},
    speeches:['물 리필해드릴게요~','맛있게 드세요!','더 필요한 거 있으세요?','즐거운 식사되세요!','편하게 드세요~'] },
];
function getStaffLevelUpCost(level) { return level; }

// ===========================
// CONTEST DATA (요리대회)
// ===========================
const CONTEST_DATA = [
  // ── 동네 (ct1~ct3) ──
  { id:'ct1', name:'동네 요리자랑', emoji:'🏘️', tier:'동네',
    description:'우리 동네에서 열리는 소박한 요리 대회',
    baseScore:18, npcStrength:{min:0.4, max:0.75}, weights:{taste:1,deco:1,health:1}, categoryBonus:null,
    unlockCondition:null, rewards:{gold:500, gems:1},
    badgeId:'b1', badgeName:'동네대회 우승', badgeEmoji:'🏘️' },
  { id:'ct2', name:'한식 왕중왕전', emoji:'🇰🇷', tier:'동네',
    description:'한식의 자존심을 건 대결!',
    baseScore:22, npcStrength:{min:0.5, max:0.8}, weights:{taste:2,deco:1,health:1}, categoryBonus:{'한식':1.3}, categoryLimit:['한식'],
    unlockCondition:'ct1', rewards:{gold:800, gems:2},
    badgeId:'b2', badgeName:'한식왕 우승', badgeEmoji:'🇰🇷' },
  { id:'ct3', name:'건강 밥상 경연', emoji:'🥬', tier:'동네',
    description:'건강을 생각하는 요리만 모았다!',
    baseScore:24, npcStrength:{min:0.5, max:0.82}, weights:{taste:1,deco:1,health:3}, categoryBonus:null,
    unlockCondition:'ct2', rewards:{gold:1000, gems:2},
    badgeId:'b3', badgeName:'건강밥상 우승', badgeEmoji:'🥬' },
  // ── 지역 (ct4~ct7) ──
  { id:'ct4', name:'디저트 페스티벌', emoji:'🍰', tier:'지역',
    description:'달콤한 디저트만으로 승부!',
    baseScore:28, npcStrength:{min:0.55, max:0.85}, weights:{taste:1,deco:2,health:1}, categoryBonus:{'디저트':1.3}, categoryLimit:['디저트'],
    unlockCondition:'ct3', rewards:{gold:1200, gems:3},
    badgeId:'b4', badgeName:'디저트 페스티벌 우승', badgeEmoji:'🍰' },
  { id:'ct5', name:'맛의 달인전', emoji:'🔥', tier:'지역',
    description:'오직 맛으로만 승부하는 대회!',
    baseScore:32, npcStrength:{min:0.58, max:0.88}, weights:{taste:3,deco:1,health:1}, categoryBonus:null,
    unlockCondition:'ct4', rewards:{gold:1500, gems:3},
    badgeId:'b5', badgeName:'맛의 달인', badgeEmoji:'🔥' },
  { id:'ct6', name:'지역 요리 경연대회', emoji:'🏙️', tier:'지역',
    description:'지역 대표를 뽑는 공식 대회',
    baseScore:34, npcStrength:{min:0.6, max:0.9}, weights:{taste:1,deco:1,health:2}, categoryBonus:null,
    unlockCondition:'ct5', rewards:{gold:2000, gems:5},
    badgeId:'b6', badgeName:'지역대회 우승', badgeEmoji:'🏙️' },
  { id:'ct7', name:'플레이팅 아트전', emoji:'🎨', tier:'지역',
    description:'보기 좋은 떡이 먹기도 좋다!',
    baseScore:36, npcStrength:{min:0.62, max:0.9}, weights:{taste:1,deco:3,health:1}, categoryBonus:null,
    unlockCondition:'ct6', rewards:{gold:2000, gems:5},
    badgeId:'b7', badgeName:'플레이팅 아티스트', badgeEmoji:'🎨' },
  // ── 도시 (ct8~ct11) ──
  { id:'ct8', name:'일식 달인전', emoji:'🍣', tier:'도시',
    description:'일식의 정수를 겨루는 대회',
    baseScore:40, npcStrength:{min:0.65, max:0.92}, weights:{taste:2,deco:2,health:1}, categoryBonus:{'일식':1.3}, categoryLimit:['일식'],
    unlockCondition:'ct7', rewards:{gold:3000, gems:5},
    badgeId:'b8', badgeName:'일식달인 우승', badgeEmoji:'🍣' },
  { id:'ct9', name:'양식 그랑프리', emoji:'🍝', tier:'도시',
    description:'양식 셰프들의 최고 무대',
    baseScore:44, npcStrength:{min:0.68, max:0.93}, weights:{taste:1,deco:1,health:2}, categoryBonus:{'양식':1.3}, categoryLimit:['양식'],
    unlockCondition:'ct8', rewards:{gold:3000, gems:5},
    badgeId:'b9', badgeName:'양식 그랑프리 우승', badgeEmoji:'🍝' },
  { id:'ct10', name:'웰빙 요리 대전', emoji:'💚', tier:'도시',
    description:'맛과 건강 두 마리 토끼를 잡아라!',
    baseScore:46, npcStrength:{min:0.7, max:0.95}, weights:{taste:2,deco:1,health:2}, categoryBonus:null,
    unlockCondition:'ct9', rewards:{gold:3500, gems:7},
    badgeId:'b10', badgeName:'웰빙 마스터', badgeEmoji:'💚' },
  { id:'ct11', name:'도시 셰프 선발전', emoji:'🌆', tier:'도시',
    description:'도시 최고의 셰프를 가린다!',
    baseScore:50, npcStrength:{min:0.72, max:0.96}, weights:{taste:2,deco:2,health:1}, categoryBonus:null,
    unlockCondition:'ct10', rewards:{gold:4000, gems:8},
    badgeId:'b11', badgeName:'도시 셰프', badgeEmoji:'🌆' },
  // ── 전국 (ct12~ct16) ──
  { id:'ct12', name:'전국 한식 페스타', emoji:'🍚', tier:'전국',
    description:'전국 한식 고수들의 격전지!',
    baseScore:54, npcStrength:{min:0.74, max:0.97}, weights:{taste:2,deco:1,health:2}, categoryBonus:{'한식':1.3}, categoryLimit:['한식'],
    unlockCondition:'ct11', rewards:{gold:4500, gems:8},
    badgeId:'b12', badgeName:'전국 한식왕', badgeEmoji:'🍚' },
  { id:'ct13', name:'스위트 챔피언십', emoji:'🧁', tier:'전국',
    description:'전국 디저트 장인들의 대결!',
    baseScore:56, npcStrength:{min:0.75, max:0.97}, weights:{taste:1,deco:3,health:1}, categoryBonus:{'디저트':1.3}, categoryLimit:['디저트'],
    unlockCondition:'ct12', rewards:{gold:5000, gems:10},
    badgeId:'b13', badgeName:'스위트 챔피언', badgeEmoji:'🧁' },
  { id:'ct14', name:'철인 요리왕', emoji:'⚔️', tier:'전국',
    description:'체력, 맛, 비주얼 모두 갖춰야 한다!',
    baseScore:58, npcStrength:{min:0.76, max:0.98}, weights:{taste:2,deco:2,health:2}, categoryBonus:null,
    unlockCondition:'ct13', rewards:{gold:5000, gems:10},
    badgeId:'b14', badgeName:'철인 요리왕', badgeEmoji:'⚔️' },
  { id:'ct15', name:'미슐랭 도전', emoji:'⭐', tier:'전국',
    description:'미슐랭 심사위원이 직접 심사한다!',
    baseScore:62, npcStrength:{min:0.78, max:0.99}, weights:{taste:2,deco:3,health:1}, categoryBonus:null,
    unlockCondition:'ct14', rewards:{gold:6000, gems:12},
    badgeId:'b15', badgeName:'미슐랭 스타', badgeEmoji:'⭐' },
  { id:'ct16', name:'전국 요리 챔피언십', emoji:'🏆', tier:'전국',
    description:'전국의 실력파가 모이는 최고 대회',
    baseScore:65, npcStrength:{min:0.8, max:1.0}, weights:{taste:2,deco:2,health:2}, categoryBonus:null,
    unlockCondition:'ct15', rewards:{gold:7000, gems:15},
    badgeId:'b16', badgeName:'전국 챔피언', badgeEmoji:'🏆' },
  // ── 전설 (ct17~ct20) ──
  { id:'ct17', name:'아시아 요리 올림픽', emoji:'🌏', tier:'전설',
    description:'아시아 최강의 셰프를 가린다!',
    baseScore:70, npcStrength:{min:0.82, max:1.02}, weights:{taste:2,deco:2,health:2}, categoryBonus:null,
    unlockCondition:'ct16', rewards:{gold:8000, gems:15},
    badgeId:'b17', badgeName:'아시아 챔피언', badgeEmoji:'🌏' },
  { id:'ct18', name:'세계 요리 월드컵', emoji:'🌍', tier:'전설',
    description:'세계 각국의 셰프가 모인 대회!',
    baseScore:75, npcStrength:{min:0.85, max:1.03}, weights:{taste:3,deco:2,health:2}, categoryBonus:null,
    unlockCondition:'ct17', rewards:{gold:9000, gems:18},
    badgeId:'b18', badgeName:'월드컵 우승', badgeEmoji:'🌍' },
  { id:'ct19', name:'신들의 만찬', emoji:'✨', tier:'전설',
    description:'신화급 요리만이 통하는 궁극의 무대',
    baseScore:82, npcStrength:{min:0.88, max:1.05}, weights:{taste:2,deco:3,health:3}, categoryBonus:null,
    unlockCondition:'ct18', rewards:{gold:10000, gems:20},
    badgeId:'b19', badgeName:'신들의 셰프', badgeEmoji:'✨' },
  { id:'ct20', name:'전설의 미식대전', emoji:'👑', tier:'전설',
    description:'요리의 신이 되기 위한 마지막 관문',
    baseScore:90, npcStrength:{min:0.9, max:1.08}, weights:{taste:3,deco:3,health:3}, categoryBonus:null,
    unlockCondition:'ct19', rewards:{gold:15000, gems:30},
    badgeId:'b20', badgeName:'전설의 요리왕', badgeEmoji:'👑' },
];
const CONTEST_COOLDOWN = 60000; // 프로토타입: 60초
const NPC_NAMES = ['꼬꼬댁','삐약이','뽀롱','치킨마스터','달걀대왕','후라이팬','국자왕','소금장인','양파눈물','불꽃셰프'];

// ===========================
// INTERIOR SKINS (인테리어)
// ===========================
const INTERIOR_AREAS = [
  { id:'kitchen', name:'주방', icon:'🍳' },
  { id:'hall',    name:'홀',   icon:'🪑' },
  { id:'entrance',name:'입구', icon:'🚪' },
];

const INTERIOR_SKINS = [
  // ─── 주방 (kitchen) ───
  { id:'k_wood', area:'kitchen', name:'우드', icon:'🪵',
    cost:{gold:0}, interiorScore:0, unlockCondition:null, conditionText:null,
    styles:{
      kitchenBg:{ background:'linear-gradient(135deg, #5c3d2e, #4a3020)', border:'3px solid #3a2015' },
      stove:{ background:'linear-gradient(135deg, #666, #444)', border:'2px solid #555' },
    }},
  { id:'k_modern', area:'kitchen', name:'모던', icon:'🏢',
    cost:{gold:3000}, interiorScore:5,
    unlockCondition:{type:'cookingLevel',min:3}, conditionText:'요리 LV.3 이상',
    styles:{
      kitchenBg:{ background:'linear-gradient(135deg, #4a4a5a, #3a3a48)', border:'3px solid #2a2a38' },
      stove:{ background:'linear-gradient(135deg, #8a8a9a, #6a6a7a)', border:'2px solid #7a7a8a' },
    }},
  { id:'k_retro', area:'kitchen', name:'레트로', icon:'📻',
    cost:{gold:5000}, interiorScore:8,
    unlockCondition:{type:'contestWon',contestId:'ct2'}, conditionText:'한식 왕중왕전 우승',
    styles:{
      kitchenBg:{ background:'linear-gradient(135deg, #8B4513, #A0522D)', border:'3px solid #6B3410' },
      stove:{ background:'linear-gradient(135deg, #B87333, #8B6914)', border:'2px solid #9A6324' },
    }},
  { id:'k_pink', area:'kitchen', name:'핑크', icon:'🌸',
    cost:{gems:5}, interiorScore:10,
    unlockCondition:{type:'followers',min:50}, conditionText:'팔로워 50명 이상',
    styles:{
      kitchenBg:{ background:'linear-gradient(135deg, #d4748a, #c25672)', border:'3px solid #a84060' },
      stove:{ background:'linear-gradient(135deg, #e8a0b0, #d88898)', border:'2px solid #c87888' },
    }},
  { id:'k_dark', area:'kitchen', name:'다크', icon:'🌑',
    cost:{gold:8000}, interiorScore:12,
    unlockCondition:{type:'totalServed',min:100}, conditionText:'총 서빙 100회 이상',
    styles:{
      kitchenBg:{ background:'linear-gradient(135deg, #1a1a2e, #16213e)', border:'3px solid #0f0f1e' },
      stove:{ background:'linear-gradient(135deg, #2d2d44, #1f1f33)', border:'2px solid #3d3d55' },
    }},
  { id:'k_royal', area:'kitchen', name:'로얄', icon:'👑',
    cost:{gems:15}, interiorScore:20,
    unlockCondition:{type:'contestWon',contestId:'ct11'}, conditionText:'도시 셰프 선발전 우승',
    styles:{
      kitchenBg:{ background:'linear-gradient(135deg, #4a2080, #301860)', border:'3px solid #FFD700' },
      stove:{ background:'linear-gradient(135deg, #6a3a9a, #503080)', border:'2px solid #FFD700' },
    }},

  // ─── 홀 (hall) ───
  { id:'h_wood', area:'hall', name:'우드', icon:'🪵',
    cost:{gold:0}, interiorScore:0, unlockCondition:null, conditionText:null,
    styles:{
      tableSurface:{ background:'linear-gradient(135deg, #c4956a, #a87a50)', border:'2px solid #8a6540' },
      chair:{ background:'linear-gradient(135deg, #8B6B4A, #6B4B2A)', border:'1px solid #5a3a1a' },
      tableCloth:{ background:'repeating-conic-gradient(#e8d8c8 0% 25%, #fff 0% 50%) 50%/10px 10px' },
    }},
  { id:'h_modern', area:'hall', name:'모던', icon:'🏢',
    cost:{gold:3000}, interiorScore:5,
    unlockCondition:{type:'tables',min:3}, conditionText:'식탁 3개 이상',
    styles:{
      tableSurface:{ background:'linear-gradient(135deg, #9a9aaa, #7a7a8a)', border:'2px solid #6a6a7a' },
      chair:{ background:'linear-gradient(135deg, #5a5a6a, #3a3a4a)', border:'1px solid #4a4a5a' },
      tableCloth:{ background:'repeating-conic-gradient(#d0d0e0 0% 25%, #eeeef5 0% 50%) 50%/10px 10px' },
    }},
  { id:'h_retro', area:'hall', name:'레트로', icon:'📻',
    cost:{gold:5000}, interiorScore:8,
    unlockCondition:{type:'recipes',min:5}, conditionText:'레시피 5종 이상 보유',
    styles:{
      tableSurface:{ background:'linear-gradient(135deg, #C19A6B, #A67B5B)', border:'2px solid #8B6B4B' },
      chair:{ background:'linear-gradient(135deg, #8B4513, #A0522D)', border:'1px solid #6B3410' },
      tableCloth:{ background:'repeating-conic-gradient(#F4E1C1 0% 25%, #FFF8EE 0% 50%) 50%/10px 10px' },
    }},
  { id:'h_pink', area:'hall', name:'핑크', icon:'🌸',
    cost:{gems:5}, interiorScore:10,
    unlockCondition:{type:'followers',min:80}, conditionText:'팔로워 80명 이상',
    styles:{
      tableSurface:{ background:'linear-gradient(135deg, #f0b0c0, #e090a0)', border:'2px solid #d08090' },
      chair:{ background:'linear-gradient(135deg, #e88098, #d06878)', border:'1px solid #c05868' },
      tableCloth:{ background:'repeating-conic-gradient(#ffe0ea 0% 25%, #fff0f5 0% 50%) 50%/10px 10px' },
    }},
  { id:'h_dark', area:'hall', name:'다크', icon:'🌑',
    cost:{gold:8000}, interiorScore:12,
    unlockCondition:{type:'totalServed',min:200}, conditionText:'총 서빙 200회 이상',
    styles:{
      tableSurface:{ background:'linear-gradient(135deg, #3a3a50, #2a2a40)', border:'2px solid #4a4a60' },
      chair:{ background:'linear-gradient(135deg, #2a2a3a, #1a1a28)', border:'1px solid #3a3a4a' },
      tableCloth:{ background:'repeating-conic-gradient(#3a3a4a 0% 25%, #2a2a3a 0% 50%) 50%/10px 10px' },
    }},
  { id:'h_royal', area:'hall', name:'로얄', icon:'👑',
    cost:{gems:15}, interiorScore:20,
    unlockCondition:{type:'contestWon',contestId:'ct16'}, conditionText:'전국 챔피언십 우승',
    styles:{
      tableSurface:{ background:'linear-gradient(135deg, #6a3a9a, #503080)', border:'2px solid #FFD700' },
      chair:{ background:'linear-gradient(135deg, #4a2070, #301855)', border:'1px solid #FFD700' },
      tableCloth:{ background:'repeating-conic-gradient(#e8d0ff 0% 25%, #f5e8ff 0% 50%) 50%/10px 10px' },
    }},

  // ─── 입구 (entrance) ───
  { id:'e_wood', area:'entrance', name:'우드', icon:'🪵',
    cost:{gold:0}, interiorScore:0, unlockCondition:null, conditionText:null,
    styles:{
      entranceGate:{ background:'linear-gradient(180deg, #8B6B4A, #6B4B2A)', border:'2px solid #5a3a1a' },
    }},
  { id:'e_modern', area:'entrance', name:'모던', icon:'🏢',
    cost:{gold:2000}, interiorScore:5,
    unlockCondition:{type:'tables',min:2}, conditionText:'식탁 2개 이상',
    styles:{
      entranceGate:{ background:'linear-gradient(180deg, #6a6a7a, #4a4a5a)', border:'2px solid #7a7a8a' },
    }},
  { id:'e_retro', area:'entrance', name:'레트로', icon:'📻',
    cost:{gold:4000}, interiorScore:8,
    unlockCondition:{type:'contestWon',contestId:'ct1'}, conditionText:'동네 요리자랑 우승',
    styles:{
      entranceGate:{ background:'linear-gradient(180deg, #A0522D, #8B4513)', border:'2px solid #6B3410' },
    }},
  { id:'e_pink', area:'entrance', name:'핑크', icon:'🌸',
    cost:{gems:3}, interiorScore:10,
    unlockCondition:{type:'followers',min:30}, conditionText:'팔로워 30명 이상',
    styles:{
      entranceGate:{ background:'linear-gradient(180deg, #e88098, #d06070)', border:'2px solid #c05060' },
    }},
  { id:'e_dark', area:'entrance', name:'다크', icon:'🌑',
    cost:{gold:6000}, interiorScore:12,
    unlockCondition:{type:'totalServed',min:50}, conditionText:'총 서빙 50회 이상',
    styles:{
      entranceGate:{ background:'linear-gradient(180deg, #2a2a3e, #1a1a2e)', border:'2px solid #3a3a4e' },
    }},
  { id:'e_royal', area:'entrance', name:'로얄', icon:'👑',
    cost:{gems:10}, interiorScore:20,
    unlockCondition:{type:'contestWon',contestId:'ct7'}, conditionText:'플레이팅 아트전 우승',
    styles:{
      entranceGate:{ background:'linear-gradient(180deg, #5a2a90, #401870)', border:'2px solid #FFD700' },
    }},
];

// ===========================
// RARITY SCORE (레시피 점수 계산용)
// ===========================
const RARITY_SCORE = { normal:1, rare:3, epic:6, legend:12, myth:25 };

// ===========================
// SHOP RANKS (가게 등급 시스템)
// ===========================
const SHOP_RANKS = [
  { name:'이름모를 작은 식당', icon:'🏚️',
    missions:[
      { type:'followers', label:'팔로워 3명 달성', value:3 },
      { type:'interiorScore', label:'인테리어 점수 5 이상', value:5 },
      { type:'recipeLevelSum', label:'레시피 레벨 합 3 이상', value:3 },
    ], rewards:{ gold:500, gems:3 } },
  { name:'동네 밥집', icon:'🏠',
    missions:[
      { type:'followers', label:'팔로워 10명 달성', value:10 },
      { type:'interiorScore', label:'인테리어 점수 10 이상', value:10 },
      { type:'contestWon', label:'동네 요리자랑 우승', value:'ct1' },
    ], rewards:{ gold:1000, gems:5 } },
  { name:'소문난 맛집', icon:'🍽️',
    missions:[
      { type:'followers', label:'팔로워 30명 달성', value:30 },
      { type:'recipeLevelSum', label:'레시피 레벨 합 15 이상', value:15 },
      { type:'contestWon', label:'건강 밥상 경연 우승', value:'ct3' },
    ], rewards:{ gold:2000, gems:7 } },
  { name:'지역 인기식당', icon:'⭐',
    missions:[
      { type:'followers', label:'팔로워 60명 달성', value:60 },
      { type:'staffLevel', label:'홍보직원 레벨 3 이상', staffId:'pr', value:3 },
      { type:'contestWon', label:'플레이팅 아트전 우승', value:'ct7' },
    ], rewards:{ gold:3500, gems:8 } },
  { name:'도시 명소', icon:'🌆',
    missions:[
      { type:'followers', label:'팔로워 100명 달성', value:100 },
      { type:'interiorScore', label:'인테리어 점수 30 이상', value:30 },
      { type:'contestWon', label:'도시 셰프 선발전 우승', value:'ct11' },
    ], rewards:{ gold:5000, gems:10 } },
  { name:'전국구 맛집', icon:'🏆',
    missions:[
      { type:'followers', label:'팔로워 150명 달성', value:150 },
      { type:'staffLevel', label:'주방장 레벨 5 이상', staffId:'headchef', value:5 },
      { type:'recipeLevelSum', label:'레시피 레벨 합 40 이상', value:40 },
    ], rewards:{ gold:8000, gems:12 } },
  { name:'미슐랭 후보', icon:'🌟',
    missions:[
      { type:'followers', label:'팔로워 250명 달성', value:250 },
      { type:'interiorScore', label:'인테리어 점수 50 이상', value:50 },
      { type:'contestWon', label:'미슐랭 도전 우승', value:'ct15' },
    ], rewards:{ gold:12000, gems:15 } },
  { name:'미슐랭 스타', icon:'💫',
    missions:[
      { type:'followers', label:'팔로워 400명 달성', value:400 },
      { type:'staffLevel', label:'서버 레벨 5 이상', staffId:'server', value:5 },
      { type:'contestWon', label:'전국 요리 챔피언십 우승', value:'ct16' },
    ], rewards:{ gold:20000, gems:20 } },
  { name:'세계적 명성', icon:'🌍',
    missions:[
      { type:'followers', label:'팔로워 700명 달성', value:700 },
      { type:'recipeLevelSum', label:'레시피 레벨 합 80 이상', value:80 },
      { type:'contestWon', label:'세계 요리 월드컵 우승', value:'ct18' },
    ], rewards:{ gold:35000, gems:25 } },
  { name:'우주급 유명식당', icon:'🚀',
    missions:[
      { type:'followers', label:'팔로워 1000명 달성', value:1000 },
      { type:'interiorScore', label:'인테리어 점수 60 이상', value:60 },
      { type:'contestWon', label:'전설의 미식대전 우승', value:'ct20' },
    ], rewards:{ gold:50000, gems:30 } },
];
