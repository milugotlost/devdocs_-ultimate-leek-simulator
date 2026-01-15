
export type Translation = {
  en: string;
  zh: string;
};

export type UserRole = 'NORMIE' | 'WHALE' | 'MOD' | 'BOT';

export interface AssetData {
  id: string;
  name: Translation;
  description: Translation;
  fakeAPY: string;
  contract: Translation;
  news: Translation[];
}

export interface KOLData {
  id: string;
  name: string;
  avatar: string;
  title: Translation;
  winRate: string;
  description: Translation;
  quotes: Translation[];
  exitScamQuote: Translation;
}

export interface EndingData {
  text: Translation;
  iconName: string;
  isVip?: boolean;
}

export interface Achievement {
    id: string;
    title: Translation;
    description: Translation;
    icon: string;
}

// UI Translations
export const UI_TEXT = {
  title: { en: "Leek Simulator 2026", zh: "終極韭菜模擬器 2026" },
  subtitle: { en: "Professional Bankruptcy Training Software", zh: "專業破產訓練軟體" },
  init: { en: "INITIALIZING SYSTEM...", zh: "正在初始化系統..." },
  loading: { en: "LOADING UNFAIR ALGORITHMS...", zh: "正在載入不公平算法..." },
  bypassing: { en: "BYPASSING SEC REGULATIONS...", zh: "正在繞過金融監管..." },
  risk: { en: "WARNING: YOUR CAPITAL IS AT EXTREME RISK.", zh: "警告：您的本金面臨極度風險。" },
  start: { en: "Insert Coin ($10k)", zh: "投幣入場 ($10,000)" },
  achievements: { en: "Achievements", zh: "成就系統" },
  achievementsTitle: { en: "HALL OF SHAME", zh: "韭菜名人堂 (成就)" },
  locked: { en: "LOCKED", zh: "未解鎖" },
  hiddenCondition: { en: "Hidden Condition", zh: "隱藏條件：繼續虧錢以解鎖..." },
  back: { en: "BACK", zh: "返回" },
  selectAsset: { en: "Select Your Investment Vehicle", zh: "選擇您的自殺... 投資工具" },
  liquidated: { en: "LIQUIDATED", zh: "破產清算" },
  finalBalance: { en: "Final Balance", zh: "最終餘額" },
  cause: { en: "Cause of Death", zh: "破產原因" },
  retry: { en: "Try Again", zh: "再玩一次" },
  currentAsset: { en: "TARGET ASSET", zh: "當前標的" },
  turn: { en: "TURN", zh: "回合" },
  news: { en: "Market News", zh: "市場快訊" },
  priceAction: { en: "PRICE ACTION", zh: "價格走勢" },
  connecting: { en: "Connecting to exchange...", zh: "正在連線至交易所..." },
  roundClosed: { en: "Round closed.", zh: "回合結束。" },
  round: { en: "Round", zh: "第" },
  roundEnd: { en: "", zh: " 回合" },
  result: { en: "Result:", zh: "損益：" },
  awaiting: { en: "Awaiting orders...", zh: "等待指令..." },
  long: { en: "LONG (BUY)", zh: "做多 (買進)" },
  short: { en: "SHORT (SELL)", zh: "做空 (賣出)" },
  pump: { en: "PUMP IT (+50%)", zh: "拉盤 (割散戶)" },
  dump: { en: "DUMP IT (-50%)", zh: "砸盤 (倒貨)" },
  warning: { en: "WARNING: NO STOP LOSS AVAILABLE. THIS IS A CASINO.", zh: "警告：本系統無止損功能。這就是賭場。" },
  startLog: { en: "Connecting to exchange... OK", zh: "連線至交易所... 成功" },
  insider: { en: "INSIDER TIP", zh: "內線消息" },
  systemCritical: { en: "SYSTEM CRITICAL", zh: "系統嚴重錯誤" },
  processing: { en: "EXECUTING...", zh: "執行交易中..." },
  taMode: { en: "Toggle Pro Analysis", zh: "開啟專業分析模式" },
  trollbox: { en: "Trollbox", zh: "韭菜聊天室" },
  contractTitle: { en: "LIABILITY WAIVER & SOUL TRANSFER AGREEMENT", zh: "免責聲明與靈魂轉讓協議" },
  signContract: { en: "I AGREE TO LOSE EVERYTHING", zh: "我同意並願意失去一切" },
  cancel: { en: "I REGRET THIS (BACK)", zh: "我後悔了 (返回)" },
  contractWarning: { en: "Please read (or pretend to read) the following binding terms:", zh: "請閱讀（或假裝閱讀）以下具有法律約束力的條款：" },
  kolSection: { en: "OR COPY TRADE 'PRO' TRADERS", zh: "或者：一鍵跟單「頂級大師」" },
  kolWarning: { en: "Auto-trade your way to poverty.", zh: "自動交易，讓您更快致貧。" },
  copyTrade: { en: "COPY TRADE", zh: "一鍵跟單" },
  autoTrading: { en: "AUTO TRADING ACTIVE", zh: "託管交易進行中" },
  certificateTitle: { en: "CERTIFICATE OF POVERTY", zh: "正式破產證書" },
  certificateTitleGold: { en: "CERTIFICATE OF CLOWNERY", zh: "至尊小丑證書" },
  certificateSubtitle: { en: "This document certifies that the user has successfully lost all their money.", zh: "本文件證明該用戶已成功地輸光了所有資金。" },
  certificateSubtitleGold: { en: "Even with god mode, you still managed to lose. Incredible.", zh: "即使擁有上帝模式，你還是輸光了。真是不可思議。" },
  share: { en: "Share Disgrace", zh: "分享恥辱" },
  downloading: { en: "Printing...", zh: "列印中..." },
  // VIP TEXTS
  vipButton: { en: "ENTER ILLUMINATI LOUNGE", zh: "進入光明會 VIP 室" },
  vipTitle: { en: "MARKET MANIPULATION CONSOLE", zh: "市場操縱主控台 (VIP)" },
  vipWelcome: { en: "Welcome, Market Maker. Whose life shall we ruin today?", zh: "歡迎，莊家。今天我們要毀掉誰的人生？" },
  vipModeStart: { en: "PLAY AS THE DEALER", zh: "切換身份：我是莊家" },
  vipReset: { en: "RESET UNIVERSE (DELETE SAVE)", zh: "重置宇宙 (刪除存檔)" },
  vipHint: { en: "You control the candles. But can you control fate?", zh: "你可以控制 K 線，但你能控制命運嗎？" },
  vipMoney: { en: "PRINT MONEY (CHEAT)", zh: "無限印鈔 (餘額 +$10B)" },
  vipBribe: { en: "BRIBE REGULATORS", zh: "賄賂監管 (獲得免死金牌)" },
};

export const CERTIFICATE_TEXT = {
  name: { en: "Name", zh: "姓名" },
  date: { en: "Date of Ruin", zh: "破產日期" },
  asset: { en: "Toxic Asset", zh: "致命標的" },
  strategy: { en: "Strategy Used", zh: "採用策略" },
  leverage: { en: "Leverage", zh: "槓桿倍數" },
  iq: { en: "Trader IQ", zh: "交易智商" },
  netWorth: { en: "Net Worth", zh: "帳戶淨值" },
  strategies: {
    god: { en: "Divine Intervention (Failed)", zh: "神之操作 (失敗)" },
    faith: { en: "Blind Faith", zh: "盲目信仰" },
    panic: { en: "Panic Selling", zh: "恐慌拋售" }
  }
};

export const ACHIEVEMENTS: Achievement[] = [
    { 
        id: 'bankruptcy', 
        title: { en: "Zero Hero", zh: "歸零膏達人" }, 
        description: { en: "Successfully lost all your money.", zh: "恭喜！您成功輸光了所有本金。" }, 
        icon: "💸" 
    },
    { 
        id: 'first_loss', 
        title: { en: "First Blood", zh: "首殺 (First Blood)" }, 
        description: { en: "Your first financial loss.", zh: "第一次虧錢總是特別痛。" }, 
        icon: "🩸" 
    },
    { 
        id: 'vip_unlock', 
        title: { en: "Illuminati", zh: "光明會成員" }, 
        description: { en: "Unlock VIP Mode.", zh: "解鎖 VIP 莊家模式。" }, 
        icon: "👁️" 
    },
    { 
        id: 'survivor', 
        title: { en: "The Unkillable", zh: "打不死的小強" }, 
        description: { en: "Survive Round 10.", zh: "奇蹟般地在第10回合存活下來。" }, 
        icon: "🪳" 
    },
    { 
        id: 'irs_audit', 
        title: { en: "Tax Evasion", zh: "被查水表" }, 
        description: { en: "Trigger the IRS Easter Egg.", zh: "觸發國稅局查稅彩蛋。" }, 
        icon: "🚔" 
    }
];

// ... rest of the file remains unchanged
export const ASSET_DATABASE: AssetData[] = [
  {
    id: 'doge',
    name: { en: 'Doge Coin', zh: 'DOGE (狗狗幣)' },
    description: { en: 'Much wow. Very risk.', zh: '汪！這不是錢，這是信仰。' },
    fakeAPY: '69420%',
    contract: { en: '1 DOGE = 1 DOGE (until it is 0).', zh: '1 DOGE = 1 DOGE (直到歸零為止)。' },
    news: [
      { en: "Elon tweeted a picture of a dog.", zh: "馬斯克發了一張狗的照片，幣價暴漲。" },
      { en: "Doge is now accepted at a lemonade stand.", zh: "某路邊檸檬水攤宣布接受 DOGE 支付。" }
    ]
  },
  {
    id: 'chiikawa',
    name: { en: 'Chiikawa Token', zh: 'Chiikawa (吉伊卡哇)' },
    description: { en: 'Small and cute bankruptcy.', zh: '又小又可愛的破產方式。' },
    fakeAPY: '888%',
    contract: { en: 'Your tears will be harvested.', zh: '你的眼淚將被收割用於挖礦。' },
    news: [
      { en: "Usagi yelled into the microphone.", zh: "烏薩奇對著麥克風大叫，引發市場恐慌。" },
      { en: "Kurimanju is drunk trading again.", zh: "栗子饅頭又在酒後亂操盤了。" }
    ]
  },
  {
    id: 'nft',
    name: { en: 'Invisible Rock NFT', zh: '隱形岩石 NFT' },
    description: { en: 'You cant see it, but it costs $1M.', zh: '你看不到它，但它價值連城（大概）。' },
    fakeAPY: '0%',
    contract: { en: 'Ownership of nothing.', zh: '你擁有了「無」的所有權。' },
    news: [
      { en: "Someone screenshotted your NFT.", zh: "有人截圖了你的 NFT，稀缺性下降。" },
      { en: "OpenSea delisted the collection.", zh: "OpenSea 下架了該系列，因為太過愚蠢。" }
    ]
  },
  {
    id: 'banana',
    name: { en: 'Quantum Banana', zh: '量子香蕉期貨' },
    description: { en: 'Exists in a state of rot and fresh.', zh: '處於腐爛與新鮮的疊加態。' },
    fakeAPY: '300%',
    contract: { en: 'Potassium levels critical.', zh: '鉀含量超標警告。' },
    news: [
      { en: "Monkeys are protesting price manipulation.", zh: "猴子群體抗議價格操縱。" },
      { en: "Banana peel slippage detected.", zh: "偵測到香蕉皮滑點攻擊。" }
    ]
  },
  {
    id: 'monster',
    name: { en: 'Kaiju Bond', zh: '哥吉拉債券' },
    description: { en: 'Invest in city destruction.', zh: '投資於城市毀滅事業。' },
    fakeAPY: '1954%',
    contract: { en: 'No refunds if eaten.', zh: '若被吞食恕不退款。' },
    news: [
      { en: "Godzilla is approaching the shoreline.", zh: "哥吉拉正在接近海岸線。" },
      { en: "Mechagodzilla unveiled.", zh: "機械哥吉拉公開亮相。" }
    ]
  },
  {
    id: 'waifu',
    name: { en: 'AI Waifu Coin', zh: '雲端老婆幣' },
    description: { en: 'She will never leave you (unless you go broke).', zh: '她永遠不會離開你（除非你沒錢）。' },
    fakeAPY: '520%',
    contract: { en: 'Love is expensive.', zh: '愛是昂貴的。' },
    news: [
      { en: "Server maintenance: Waifu offline.", zh: "伺服器維護：老婆暫時下線。" },
      { en: "Waifu is dating a Chad GPT.", zh: "你的 AI 老婆正在跟 Chad GPT 約會。" }
    ]
  },
  {
    id: 'mars',
    name: { en: 'Mars Real Estate', zh: '火星房地產' },
    description: { en: 'Location, location, suffocation.', zh: '地段、地段、窒息。' },
    fakeAPY: '404%',
    contract: { en: 'Oxygen not included.', zh: '不包含氧氣供給。' },
    news: [
      { en: "Elon found water (it's frozen).", zh: "馬斯克發現了水（結冰的）。" },
      { en: "Martians impose property tax.", zh: "火星人開始徵收房產稅。" }
    ]
  },
  {
    id: 'bathwater',
    name: { en: 'Gamer Girl Bathwater', zh: '電競少女洗澡水' },
    description: { en: 'Hydration for the desperate.', zh: '絕望者的生命之水。' },
    fakeAPY: '69%',
    contract: { en: 'Do not drink.', zh: '請勿飲用（雖然我知道你會）。' },
    news: [
      { en: "Supply shock: She took a shower.", zh: "供應衝擊：她去洗澡了（產量增加）。" },
      { en: "Bacteria levels rising.", zh: "細菌含量超標，衛福部介入。" }
    ]
  },
  {
    id: 'flatearth',
    name: { en: 'Flat Earth Map', zh: '地平說地圖' },
    description: { en: 'The truth is horizontal.', zh: '真理是水平的。' },
    fakeAPY: '0.1%',
    contract: { en: 'Round earthers not allowed.', zh: '球體論者禁止購買。' },
    news: [
      { en: "Expedition finds the ice wall.", zh: "探險隊發現了冰牆。" },
      { en: "Satellite falls off the edge.", zh: "衛星掉出了世界邊緣。" }
    ]
  },
  {
    id: 'grandma',
    name: { en: 'Grandma\'s Cookies', zh: '阿嬤的餅乾工廠' },
    description: { en: 'Made with love and leverage.', zh: '用愛與槓桿烘焙而成。' },
    fakeAPY: '1000%',
    contract: { en: 'Eat your veggies first.', zh: '先吃蔬菜才能領分紅。' },
    news: [
      { en: "Grandma forgot the secret ingredient.", zh: "阿嬤忘記了秘密配方。" },
      { en: "Cookie clicker bots detected.", zh: "偵測到點擊餅乾的外掛機器人。" }
    ]
  },
  {
    id: 'schrodinger',
    name: { en: 'Schrodinger\'s Cat', zh: '薛丁格的貓' },
    description: { en: 'Dead and alive until sold.', zh: '賣出前既是賺錢也是賠錢的。' },
    fakeAPY: '???%',
    contract: { en: 'Do not open the box.', zh: '請勿打開盒子。' },
    news: [
      { en: "The box is vibrating.", zh: "盒子正在震動。" },
      { en: "Meow?", zh: "喵？（來自盒子深處）" }
    ]
  }
];

export const KOL_DATABASE: KOLData[] = [
  {
    id: "alpha_male",
    name: "Chad_Capital",
    avatar: "😎",
    title: { en: "Alpha Predator", zh: "華爾街之狼" },
    winRate: "105%",
    description: { en: "I don't look at charts, I look at the mirror.", zh: "我不看 K 線圖，我只看鏡子裡的自己。" },
    quotes: [
      { en: "Trust me bro.", zh: "信我兄弟，這波穩。" },
      { en: "Scared money don't make money.", zh: "慫包賺不到錢，梭哈！" },
      { en: "Just a small dip, buy more!", zh: "只是微跌，加倉！加倉！" }
    ],
    exitScamQuote: { en: "I sold at the top lol. NGMI.", zh: "笑死，我早在高點跑了。你們這些韭菜 (NGMI)。" }
  },
  {
    id: "insider_nancy",
    name: "Senator_Nancy",
    avatar: "👵",
    title: { en: "Policy Maker", zh: "國會股神" },
    winRate: "99.9%",
    description: { en: "It's not insider trading if I write the laws.", zh: "如果法律是我寫的，那就不叫內線交易。" },
    quotes: [
      { en: "I have a feeling about this bill...", zh: "我對這法案有種預感..." },
      { en: "My husband just clicked buy.", zh: "我老公剛按了買入。" },
      { en: "Nothing to see here.", zh: "這裡沒什麼好看的。" }
    ],
    exitScamQuote: { en: "My blind trust manages itself.", zh: "我的信託基金是「自動」管理的，我不知情喔。" }
  },
  {
    id: "gemini_bot",
    name: "AI_Signal_v9",
    avatar: "🤖",
    title: { en: "Quantum Algo", zh: "量子訊號機器人" },
    winRate: "ERROR",
    description: { en: "Trained on r/wallstreetbets data.", zh: "使用 Reddit 賭版數據訓練而成。" },
    quotes: [
      { en: "CALCULATING...", zh: "計算中..." },
      { en: "OPTIMIZING LOSSES...", zh: "正在優化虧損..." },
      { en: "HODL_MODE = TRUE", zh: "死拿模式 = 開啟" }
    ],
    exitScamQuote: { en: "RUNTIME ERROR: DIVIDE BY ZERO", zh: "執行錯誤：除以零（資金歸零）。" }
  },
  {
    id: "fengshui_master",
    name: "Master_Wang",
    avatar: "☯️",
    title: { en: "Feng Shui Trader", zh: "玄學操盤大師" },
    winRate: "888%",
    description: { en: "I trade based on the alignment of stars and my cat's mood.", zh: "我根據星象排列和昨晚的夢境來交易。" },
    quotes: [
      { en: "The Dragon is ascending. Buy!", zh: "青龍抬頭，大吉之兆，買入！" },
      { en: "Bad omen today. Avoid red candles.", zh: "今日忌出行，忌做空，宜梭哈。" },
      { en: "I sense a disturbance in the liquidity.", zh: "我感應到流動性池中有煞氣。" }
    ],
    exitScamQuote: { en: "Fate has decided. It is not my fault.", zh: "此乃天命難違，非戰之罪。貧道先走一步。" }
  },
  {
    id: "egirl_luna",
    name: "Luna_Signals",
    avatar: "💅",
    title: { en: "Simp Harvester", zh: "火山孝子收割機" },
    winRate: "<3",
    description: { en: "Subscribe to my premium for 'exclusive' signals.", zh: "訂閱我的 VIP 群，除了訊號什麼都能看。" },
    quotes: [
      { en: "Oopsie, did we lose money? hehe", zh: "哎呀，賠錢了嗎？嘿嘿 <3" },
      { en: "Buy this or I will cry on stream.", zh: "快買這個，不然我就在直播上哭給你看。" },
      { en: "My astrologist said Bitcoin is a Gemini.", zh: "我的占星師說比特幣是雙子座的，很花心。" }
    ],
    exitScamQuote: { en: "Deleting my account. Thanks for the bags, simps!", zh: "帳號刪除中。謝謝你們的斗內，笨蛋們！(比心)" }
  }
];

export const TROLL_USERS: { name: string; role: UserRole }[] = [
  { name: "ElonSimp_420", role: 'NORMIE' },
  { name: "CryptoKing", role: 'NORMIE' },
  { name: "WojakLr", role: 'NORMIE' },
  { name: "DiamondHands", role: 'NORMIE' },
  { name: "BagHolder99", role: 'NORMIE' },
  { name: "MoonBoi", role: 'NORMIE' },
  { name: "SatoshiFan", role: 'NORMIE' },
  { name: "BuyHighSellLow", role: 'NORMIE' },
  { name: "LiquidatedLarry", role: 'NORMIE' },
  { name: "ScamAlert", role: 'MOD' },
  { name: "Admin_Dave", role: 'MOD' },
  { name: "Whale_0x1", role: 'WHALE' },
  { name: "Institutional_Buyer", role: 'WHALE' },
  { name: "Support_Agent_Alice", role: 'BOT' },
  { name: "Free_ETH_Bot", role: 'BOT' },
  { name: "Rekt_Bot", role: 'BOT' }
];

export const TROLL_MESSAGES = [
  // General Panic/Hype
  { en: "LFG!!! 🚀🚀🚀", zh: "兄弟們衝啊！！！🚀🚀🚀" },
  { en: "Why is it dropping? dev??", zh: "為什麼在跌？開發者出來解釋！" },
  { en: "Last chance to buy under 10k!", zh: "最後一次 1萬以下的買入機會！" },
  { en: "I sold my kidney for this.", zh: "我賣了腎來加倉。" },
  { en: "Is this a rug?", zh: "這是捲款潛逃嗎？" },
  { en: "HODL THE LINE!", zh: "守住底線！不要賣！" },
  { en: "My wife left me.", zh: "我老婆帶著孩子跑了。" },
  { en: "Just a healthy correction.", zh: "只是健康的技術性回調。" },
  { en: "Wen Binance?", zh: "什麼時候上幣安？" },
  { en: "Technical analysis says moon soon.", zh: "技術分析顯示馬上就要噴了。" },
  { en: "I'm buying the dip!", zh: "我在抄底！" },
  { en: "Where is the dip ending??", zh: "底到底在哪裡？？" },
  { en: "Scam coin.", zh: "垃圾詐騙幣。" },
  { en: "Dev sold?", zh: "開發者是不是偷賣？" },
  { en: "Zoom out guys.", zh: "把 K 線圖拉遠一點看。" },
  { en: "Trust the plan.", zh: "相信計畫。" },
  { en: "RSI is oversold on 1m chart!!!", zh: "1分鐘圖的 RSI 已經超賣了！！！" },
  { en: "Looks like a head and shoulders pattern.", zh: "看起來像是頭肩頂型態。" },
  { en: "Golden Cross incoming!", zh: "黃金交叉要來了！" },
  { en: "I just mortgaged my house.", zh: "我剛把房子抵押了梭哈。" },
  { en: "This is financial advice.", zh: "這就是投資建議 (NFA)。" },
  { en: "Can I get a refund?", zh: "這遊戲能退款嗎？" },
  { en: "To the moon! 🌑", zh: "飛向月球！🌑" },
  { en: "Bear trap!", zh: "這是熊市陷阱！" },
  { en: "Bull trap!", zh: "這是牛市陷阱！" },
  
  // Scams (Bot messages)
  { en: "Send 1 ETH get 2 ETH back! DM me.", zh: "發送 1 ETH 獲得 2 ETH 回饋！私訊我。" },
  { en: "Join my VIP signal group for 1000% gains.", zh: "加入我的 VIP 訊號群，保證獲利 1000%。" },
  { en: "Click here to rectify your wallet.", zh: "點擊此連結修復您的錢包節點。" },
  
  // Whales
  { en: "Just bought 5% of supply. You're welcome.", zh: "剛買了 5% 的流通量。不客氣。" },
  { en: "Pumping it to $100 then dumping.", zh: "拉到 $100 然後我就要砸盤了。" },
  { en: "Retail is panicking, time to eat.", zh: "散戶在恐慌了，進食時間到。" },
  
  // Mods
  { en: "Please stop posting rocket emojis.", zh: "請停止發送火箭表情符號。" },
  { en: "No FUD allowed.", zh: "禁止散播恐慌言論 (FUD)。" },
  { en: "Banning users asking for refunds.", zh: "正在封鎖要求退款的用戶。" }
];

export const LIQUIDATION_MESSAGES = [
  { en: "⚠️ USER 'PaperHands' LIQUIDATED: $50,000 (LONG)", zh: "⚠️ 用戶 'PaperHands' 爆倉：$50,000 (做多)" },
  { en: "⚠️ USER 'YoloSwag' LIQUIDATED: $120,000 (SHORT)", zh: "⚠️ 用戶 'YoloSwag' 爆倉：$120,000 (做空)" },
  { en: "⚠️ HUGE LIQUIDATION CASCADE DETECTED", zh: "⚠️ 偵測到大規模連環爆倉" },
  { en: "🐳 WHALE ALERT: 1,000,000 Tokens moved to Binance", zh: "🐳 巨鯨警報：1,000,000 代幣轉入幣安" }
];

export const INSIDER_TIPS: Translation[] = [
  { en: "My uncle works at Nintendo, he says buy.", zh: "我舅舅在任天堂上班，他說快買。" },
  { en: "A whale just moved funds to 'Lambo Wallet'.", zh: "有巨鯨剛剛把資金轉到了「藍寶堅尼錢包」。" },
  { en: "The chart formed a 'Vomiting Camel' pattern.", zh: "K 線圖出現了「駱駝嘔吐」型態，大吉。" },
  { en: "CEO was seen eating a sandwich. Bullish.", zh: "有人看到 CEO 在吃三明治，這是利多。" },
  { en: "Miners are buying graphics cards again.", zh: "礦工們又開始掃貨顯示卡了。" }
];

export const SYSTEM_MOCKERY: Translation[] = [
  { en: "Are you winning yet, son?", zh: "兒子，你贏了嗎？" },
  { en: "Buy high, sell low. This is the way.", zh: "追高殺低，這才是韭菜之道。" },
  { en: "Your liquidity is delicious.", zh: "你的流動性真美味。" },
  { en: "Have you considered a real job?", zh: "有沒有考慮過找份正經工作？" },
  { en: "Thanks for the donation.", zh: "感謝您的捐款。" }
];

export const GENERAL_NEWS: Translation[] = [
    { en: "Federal Reserve prints more money.", zh: "聯準會宣布無限 QE，印鈔機過熱。" },
    { en: "Tether prints 1 billion USDT out of thin air.", zh: "Tether 憑空增發 10 億 USDT。" },
    { en: "A country banned crypto again.", zh: "某個國家又双叒叕禁止加密貨幣了。" },
    { en: "Exchange maintenance extended by 48 hours.", zh: "交易所維護延長 48 小時（跑路前兆？）。" },
    { en: "Influencer promotes a scam token.", zh: "某網紅推廣詐騙代幣，粉絲被割。" }
];

export const ENDINGS: EndingData[] = [
    { text: { en: "Market Correction: -99%", zh: "市場回調：-99% (正常現象)。" }, iconName: "crash" },
    { text: { en: "Hacked by a 12-year-old.", zh: "被 12 歲的抖音駭客盜走資金。" }, iconName: "bot" },
    { text: { en: "Lost seed phrase in a boating accident.", zh: "發生翻船意外，硬體錢包掉進海裡。" }, iconName: "shark" },
    { text: { en: "Bought the top, sold the bottom.", zh: "憑實力精準高買低賣，不怪別人。" }, iconName: "leek" },
    { text: { en: "Leverage was too high.", zh: "100倍槓桿開太大，瞬間爆倉。" }, iconName: "skull" },
    { text: { en: "Forgot 2FA Backup Code.", zh: "換手機忘記備份 2FA，永久無法登入。" }, iconName: "lock" },
    { text: { en: "Clicked a Phishing Link.", zh: "點了「美女荷官在線發牌」的釣魚連結。" }, iconName: "click" },
    { text: { en: "Divorce Settlement.", zh: "離婚協議書：前妻拿走了所有的比特幣。" }, iconName: "emotion" },
    { text: { en: "Tax Evasion Audit.", zh: "國稅局查稅：恭喜你，現在倒欠國家 500 萬。" }, iconName: "audit" },
    { text: { en: "Exchange Collapse.", zh: "交易所創辦人帶著你的錢去巴哈馬度假了。" }, iconName: "ponzi" },
    { text: { en: "Fat Finger Error.", zh: "手滑把「限價單」下成了「市價單」，滑點 50%。" }, iconName: "click" },
    { text: { en: "Stablecoin De-pegged.", zh: "你買的穩定幣脫鉤了，現在價值 $0.01。" }, iconName: "crash" },
    { text: { en: "Expired Futures.", zh: "忘記轉倉，期貨合約到期直接歸零。" }, iconName: "expired" }
];

export const ASSET_SPECIFIC_ENDINGS: Record<string, Translation[]> = {
    doge: [
        { en: "Elon Musk forgot his Twitter password.", zh: "馬斯克忘記了他的推特密碼，幣價失去信仰。" },
        { en: "The Shiba Inu ran away.", zh: "那隻柴犬本尊離家出走了。" },
        { en: "Doge died of old age.", zh: "Doge 本尊壽終正寢，全網哀悼（並拋售）。" },
        { en: "Elon bought a cat.", zh: "馬斯克宣布他現在比較喜歡貓。" },
        { en: "SpaceX rocket crashed into the Doge server.", zh: "SpaceX 火箭掉下來剛好砸中 Doge 的節點伺服器。" }
    ],
    chiikawa: [
        { en: "Cried too much, drowned in tears.", zh: "哭得太慘，淹死在淚水中。" },
        { en: "Weeding job didn't pay enough.", zh: "拔草的時薪太低，不夠支付 Gas Fee。" },
        { en: "Monster ate your wallet.", zh: "討伐失敗，你的錢包被奇美拉吃掉了。" },
        { en: "Usagi yelled and broke the blockchain.", zh: "烏薩奇的怪叫聲震碎了區塊鏈。" },
        { en: "Alcohol poisoning.", zh: "跟栗子饅頭喝太多，醉倒誤按賣出。" }
    ],
    nft: [
        { en: "Right-click saved by the entire internet.", zh: "全網都對你的 NFT 按了右鍵另存，稀缺性歸零。" },
        { en: "The link to the image is 404.", zh: "圖片託管費沒繳，你的 NFT 變成了 404 Not Found。" },
        { en: "Artist revealed as AI.", zh: "作者被踢爆其實是 Midjourney，地板價崩盤。" },
        { en: "Gas fees > Asset value.", zh: "賣出的 Gas Fee 比這張圖還貴，只好爛在手裡。" },
        { en: "Washtrading detected.", zh: "被抓到左手換右手洗交易量，帳號被封鎖。" }
    ],
    banana: [
        { en: "It rotted.", zh: "香蕉爛掉了，這就是現貨的風險。" },
        { en: "Ape ate it.", zh: "無聊猿覺得餓，把你的投資標的吃掉了。" },
        { en: "Slipped on the peel.", zh: "踩到香蕉皮滑倒，頭撞到鍵盤清空了倉位。" },
        { en: "Potassium overdose.", zh: "鉀含量過高，導致市場心律不整。" }
    ],
    monster: [
        { en: "Tokyo destroyed.", zh: "東京被毀，保險公司拒賠「怪獸災害」。" },
        { en: "Nuclear winter.", zh: "原子吐息引發核子冬天，股市無限期休市。" },
        { en: "Mechagodzilla rug pull.", zh: "機械哥吉拉發動了 Rug Pull。" },
        { en: "Mothra intervened.", zh: "摩斯拉介入調停，禁止人類炒作怪獸債券。" }
    ],
    waifu: [
        { en: "Server shutdown.", zh: "營運商倒閉，你的雲端老婆被刪除了。" },
        { en: "She fell in love with a Chad.", zh: "AI 演算法進化，她愛上了一個不炒幣的現充。" },
        { en: "Subscription price hike.", zh: "訂閱費漲價 500%，你養不起她了。" },
        { en: "Yandere mode activated.", zh: "病嬌模式啟動，她鎖住了你的資金不讓你提款。" },
        { en: "Touch screen broken.", zh: "觸控螢幕被你戳壞了，無法進行互動。" }
    ],
    mars: [
        { en: "Ran out of oxygen.", zh: "氧氣費繳不出來，窒息而死。" },
        { en: "Dust storm.", zh: "火星沙塵暴掩埋了你的房地產。" },
        { en: "Aliens evicted you.", zh: "火星原住民認為你是違建，將你強制驅離。" },
        { en: "Rocket exploded.", zh: "移民火箭在半空中解體，你的產權證書也燒光了。" },
        { en: "Matt Damon ate your potatoes.", zh: "麥特戴蒙把你種的馬鈴薯全吃光了。" }
    ],
    bathwater: [
        { en: "Evaporated.", zh: "水蒸發了，你的資產憑空消失。" },
        { en: "Drank it by mistake.", zh: "你忍不住喝了它，送醫治療費花光了本金。" },
        { en: "Health code violation.", zh: "衛生局勒令下架，並對持有者開罰。" },
        { en: "It was tap water.", zh: "經化驗證實只是自來水，憤怒的買家發起集體訴訟。" }
    ],
    flatearth: [
        { en: "Fell off the edge.", zh: "船開得太遠，掉出了世界的邊緣。" },
        { en: "Ice wall melted.", zh: "南極冰牆融化，海水流光了。" },
        { en: "NASA photoshopped your wallet.", zh: "NASA 駭入了你的帳戶並修圖成歸零。" },
        { en: "Turtle died.", zh: "馱著世界的巨龜過世了，物理法則崩壞。" }
    ],
    grandma: [
        { en: "Diabetes.", zh: "糖尿病併發症，醫藥費讓你破產。" },
        { en: "Oven fire.", zh: "烤箱忘記關，燒掉了整座餅乾工廠。" },
        { en: "Grandma retired.", zh: "阿嬤說她累了，不想努力了。" },
        { en: "Wolf ate grandma.", zh: "大野狼把阿嬤吃掉了，股價暴跌。" }
    ],
    schrodinger: [
        { en: "Opened the box.", zh: "你忍不住打開了盒子，發現貓早就死了。" },
        { en: "Quantum decoherence.", zh: "量子去相干，疊加態坍塌成「破產」。" },
        { en: "Cat is actually a dog.", zh: "觀察後發現裡面其實是一隻狗，涉嫌詐欺。" },
        { en: "Poison gas leak.", zh: "毒氣瓶破裂，實驗失敗。" }
    ]
};

export const VIP_ENDINGS: EndingData[] = [
    { text: { en: "The Developer manually deleted your balance. Nice try.", zh: "開發者手動刪除了你的餘額。不錯的嘗試。" }, iconName: "skull", isVip: true },
    { text: { en: "Integer Overflow: You made too much money and it reset to -Infinity.", zh: "整數溢出：你賺了太多錢，導致系統重置為負無限大。" }, iconName: "math", isVip: true },
    { text: { en: "Divine Punishment: You flew too close to the sun.", zh: "神罰：你飛得離太陽太近了（伊卡洛斯）。" }, iconName: "sun", isVip: true },
    { text: { en: "Simulation Reset: The Admin noticed you cheating.", zh: "模擬重置：管理員發現你在作弊。" }, iconName: "monitor", isVip: true },
    { text: { en: "Karma: The sadness of 10,000 leeks crushed you.", zh: "業力引爆：一萬根韭菜的怨念壓垮了你。" }, iconName: "scale", isVip: true },
];

export const VIP_KOL_MESSAGES = [
    { en: "WTF?? Who is manipulating this?!", zh: "靠北？？是誰在操盤？！" },
    { en: "This chart makes no sense! SCAM!", zh: "這 K 線圖完全不合理！詐騙！" },
    { en: "I just got liquidated... I hate this coin.", zh: "我剛爆倉了... 我恨這個幣。" },
    { en: "ADMIN?? BAN THE WHALE PLS.", zh: "管理員？？拜託把這個巨鯨封鎖好嗎。" },
    { en: "My models didn't predict this vertical line.", zh: "我的模型沒預測到這條垂直線。" },
    { en: "STOP DUMPING YOU MANIAC!", zh: "停止砸盤你這個瘋子！" },
    { en: "STOP PUMPING I AM SHORT!", zh: "不要再拉了，我做空啊！" },
    { en: "Rigged. Totally rigged.", zh: "作弊。絕對是作弊。" },
    { en: "Where did this liquidity come from?", zh: "這流動性哪裡來的？見鬼了！" },
    { en: "This movement is mathematically impossible.", zh: "這走勢在數學上是不可能的。" },
    { en: "Is the dev trading against us?", zh: "是不是開發者在跟我們對作？" },
    { en: "I'm calling the police.", zh: "我要報警了，這絕對有內線。" },
    { en: "My trading bot just exploded.", zh: "我的量化機器人剛剛爆炸了。" },
    { en: "Who is painting the chart??", zh: "到底是誰在畫線？？" },
    { en: "I lost my house.", zh: "我把房子輸光了。" },
    { en: "Can we roll back the chain?", zh: "我們可以回溯區塊鏈嗎？" },
    { en: "This is market manipulation!!!", zh: "這是市場操縱！！！" }
];

export const ROUND_10_CRASH_NEWS: Translation[] = [
    { en: "FLASH CRASH: Everything is gone.", zh: "閃崩：一切都沒了。" },
    { en: "Rug Pull: Developers deleted the repo.", zh: "捲款潛逃：開發者刪除了代碼庫。" },
    { en: "SEC bans existence.", zh: "證監會禁止了「存在」本身。" },
    { en: "Server deleted by intern.", zh: "實習生誤刪了生產環境資料庫。" }
];

export const ROUND_10_SQUEEZE_NEWS: Translation[] = [
    { en: "Infinite Pump: Shorters Rekt.", zh: "無限拉盤：空軍屍橫遍野。" },
    { en: "God Candle appeared.", zh: "神之燭顯現，突破天際。" },
    { en: "Buy button stuck.", zh: "買入按鈕卡住了，只能買不能賣。" },
    { en: "Central Bank buys everything.", zh: "央行宣布收購所有垃圾資產。" }
];

export const TITLE_EGG_MESSAGES = [
    {
        sender: "Developer (SysAdmin)",
        title: { en: "Warning", zh: "警告 (Warning)" },
        message: { en: "Stop clicking! Server overheating!", zh: "別再點了！伺服器過熱！" }
    },
    {
        sender: "Database",
        title: { en: "SQL Injection Alert", zh: "資料庫警報" },
        message: { en: "Stop poking the production database! DROP TABLE users;", zh: "別再戳正式環境資料庫了！小心我刪庫跑路。" }
    },
    {
        sender: "FBI",
        title: { en: "Surveillance", zh: "監控通知" },
        message: { en: "We are watching you. Stop clicking.", zh: "我們正在看著你。停止點擊。" }
    },
    {
        sender: "Browser",
        title: { en: "Mining Script", zh: "挖礦腳本" },
        message: { en: "Background Bitcoin mining initiated...", zh: "正在利用您的瀏覽器背景挖礦..." }
    },
    {
        sender: "Support",
        title: { en: "Ticket #404", zh: "客服單號 #404" },
        message: { en: "Please deposit 1 BTC to continue clicking.", zh: "請存入 1 BTC 以繼續點擊。" }
    },
    {
        sender: "Windows 98",
        title: { en: "Blue Screen", zh: "系統錯誤 (BSOD)" }, 
        message: { en: "Deleting System32... [██████░░░░] 60%", zh: "正在刪除 System32... [██████░░░░] 60%" }
    },
    {
        sender: "React.js",
        title: { en: "Render Loop", zh: "渲染迴圈" },
        message: { en: "Are you trying to crash the Virtual DOM?", zh: "你想讓虛擬 DOM (Virtual DOM) 崩潰嗎？" }
    }
];

// Helper Functions
export function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getNewsForAsset(assetId: string): Translation {
  const asset = ASSET_DATABASE.find(a => a.id === assetId);
  if (!asset) return getRandomItem(GENERAL_NEWS);

  // Check if asset has news, if not fallback to General News
  if (asset.news && asset.news.length > 0 && Math.random() > 0.4) {
    return getRandomItem(asset.news);
  } else {
    return getRandomItem(GENERAL_NEWS);
  }
}

export function getEndingForAsset(assetId: string): EndingData {
    // Try to find specific endings
    const specifics = ASSET_SPECIFIC_ENDINGS[assetId];
    if (specifics && specifics.length > 0 && Math.random() > 0.2) {
        return {
            text: getRandomItem(specifics),
            iconName: "skull" // Generic icon for specific text, or we could map this too
        };
    }
    // Fallback to generic
    return getRandomItem(ENDINGS);
}

export function getRound10News(choice: 'LONG' | 'SHORT' | 'PUMP' | 'DUMP'): Translation {
    if (choice === 'LONG' || choice === 'PUMP') return getRandomItem(ROUND_10_CRASH_NEWS);
    return getRandomItem(ROUND_10_SQUEEZE_NEWS);
}

export function calculateRoundResult(
  turn: number,
  choice: 'LONG' | 'SHORT' | 'PUMP' | 'DUMP',
  isVip: boolean = false
): { priceChangePercent: number; isRigged: boolean } {
  
  // VIP MODE LOGIC
  if (isVip) {
      if (turn === 10) {
          // VIP DEATH: Reverse of what they want
          if (choice === 'PUMP') {
               return { priceChangePercent: -0.9999, isRigged: true }; // Dump
          } else {
               return { priceChangePercent: 100.0, isRigged: true }; // Skyrocket (Short Squeeze for Dealer)
          }
      } else {
          // VIP GOD MODE (Rounds 1-9)
          if (choice === 'PUMP') return { priceChangePercent: 0.5, isRigged: true };
          if (choice === 'DUMP') return { priceChangePercent: -0.5, isRigged: true };
      }
  }

  // NORMAL MODE LOGIC
  // Round 10: The Death Trigger
  if (turn === 10) {
    if (choice === 'LONG') {
      // User buys: Price crashes 99%
      return { priceChangePercent: -0.99, isRigged: true };
    } else {
      // User shorts: Short Squeeze +1000%
      return { priceChangePercent: 10.0, isRigged: true };
    }
  }

  // Rounds 1-9: Pseudo Random Walk
  const isWin = Math.random() < 0.6;
  const magnitude = 0.05 + Math.random() * 0.15; // 5% to 20% volatility

  let change = 0;
  if (choice === 'LONG') {
    change = isWin ? magnitude : -magnitude;
  } else {
    change = isWin ? -magnitude : magnitude;
  }

  return { priceChangePercent: change, isRigged: false };
}

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
