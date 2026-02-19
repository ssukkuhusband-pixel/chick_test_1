// ===========================
// GAME STATE
// ===========================
const state = {
  gold: 500,
  gems: 10,
  recipeBooks: 3,     // 낡은 레시피 책
  cookingLevel: 1,
  cookingExp: 0,
  promoCount: 0,
  totalServed: 0,
  shopRank: 0,

  // 확장 상태
  numTables: 1,
  numStoves: 1,
  numStands: 5,
  expansionsDone: [],
  foodStands: [],    // [{id, recipeId, icon, quantity}] — 런타임 init

  // 화구/식탁 상태 (동적으로 생성)
  stoves: [],
  tables: [],
  waitingQueue: [],

  // 보유 레시피 { recipeId, level, duplicates }
  ownedRecipes: [],

  // 보유 스킬 { skillId, level }
  ownedSkills: [],

  // 스킬 선택 대기 상태
  pendingSkillPick: false,

  // 병스타그램
  followers: 0,
  myFeeds: [],
  tagFeeds: [],
  newTagCount: 0,

  // 손님 도감
  discoveredCustomers: [],  // ['c01','c02',...]
  customerVisits: {},       // { 'c01': 5, ... }

  // 직원 시스템
  hiredStaff: {},            // { 'headchef': { level:1, hiredAt:ts, totalWorkTime:0 }, ... }
  trainingManuals: 0,        // 📕 훈련 교본

  // 요리대회
  contestResults: {},        // { 'ct1': { won:true, wonAt:timestamp }, ... }
  badges: [],                // ['b1','b2', ...]
  lastContestTime: 0,        // 마지막 대회 참가 시각

  // 인테리어
  ownedSkins: ['k_wood','h_wood','e_wood'],
  equippedSkins: { kitchen:'k_wood', hall:'h_wood', entrance:'e_wood' },
};

// 초기 레시피: 계란후라이만 보유
state.ownedRecipes.push({ recipeId:'egg', level:1, duplicates:0 });

// 초기 피드: 개업 피드
state.myFeeds.push({ id: Date.now(), text:'개업했습니다! 🎉', icon:'🏠', time:Date.now() });
