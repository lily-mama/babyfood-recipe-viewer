export const INITIAL_RECIPES = [
  {
    id: '10bai-gayu',
    title: '10倍がゆ',
    stage: '初期',
    category: '炭水化物',
    imageSvg: 'rice',
    colorBg: '#FDFBF7',
    ingredients: '水 200ml, 生米 20g',
    buttonToPress: 'potage & paste',
    hasEaten: true,
    memo: '離乳食初日に挑戦！裏ごし不要で滑らかに出来上がり、とてもよく食べてくれました。'
  },
  {
    id: 'ninjin-paste',
    title: '人参ペースト',
    stage: '初期',
    category: '野菜・果物',
    imageSvg: 'carrot',
    colorBg: '#FFF8F0',
    ingredients: '人参 100g, 湯（または茹で汁）大さじ1〜2',
    buttonToPress: 'potage & paste',
    hasEaten: true,
    memo: 'レンジ加熱後にボタン操作。甘みがあって完食。'
  },
  {
    id: 'kabocha-paste',
    title: 'かぼちゃペースト',
    stage: '初期',
    category: '野菜・果物',
    imageSvg: 'pumpkin',
    colorBg: '#FFFBE6',
    ingredients: 'かぼちゃ（皮・種なし） 80g, 湯またはミルク 大さじ2〜3',
    buttonToPress: 'potage & paste',
    hasEaten: false,
    memo: '皮を厚めに剥くのがコツ。次回試す予定。'
  },
  {
    id: '7bai-gayu',
    title: 'しらすと豆腐の7倍がゆ',
    stage: '中期',
    category: '炭水化物',
    imageSvg: 'rice',
    colorBg: '#F6FFED',
    ingredients: '7倍がゆ 50g, しらす（塩抜き済） 小さじ1, 絹ごし豆腐 15g',
    buttonToPress: 'Pulse（パルス 4〜5回）',
    hasEaten: false,
    memo: 'パルス操作で少し粒感を残して調整する。'
  },
  {
    id: 'tori-sasami-paste',
    title: '鶏ささみとほうれん草のペースト',
    stage: '中期',
    category: 'タンパク質',
    imageSvg: 'meat',
    colorBg: '#FFF0F6',
    ingredients: '鶏ささみ（筋取り） 40g, ほうれん草（葉先） 20g, 出汁 大さじ2',
    buttonToPress: 'Chop（チョッパー 12秒）',
    hasEaten: false,
    memo: 'ささみのパサつきを防ぐため出汁を忘れずに。'
  },
  {
    id: 'salmon-vege-stew',
    title: '鮭と根菜のみじん煮',
    stage: '後期',
    category: 'タンパク質',
    imageSvg: 'fish',
    colorBg: '#E6F7FF',
    ingredients: '生鮭 15g, 大根・人参 各10g, 和風出汁 100ml, 片栗粉 少々',
    buttonToPress: 'Pulse（粗みじん 3回）',
    hasEaten: false,
    memo: '粗切りにしてから出汁でコトコト煮る。'
  }
];

export const STAGES = ['すべて', '初期', '中期', '後期'];

export const CATEGORIES = ['すべて', '炭水化物', '野菜・果物', 'タンパク質'];
