import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chart } from './components/game/Chart';
import { Trollbox } from './components/game/Trollbox';
import { AchievementPopup } from './components/game/AchievementPopup';
import { toPng } from 'html-to-image';
import { 
  ASSET_DATABASE, 
  KOL_DATABASE,
  AssetData, 
  KOLData,
  ENDINGS, 
  EndingData,
  INSIDER_TIPS,
  SYSTEM_MOCKERY,
  UI_TEXT,
  CERTIFICATE_TEXT,
  Translation,
  getRandomItem, 
  getNewsForAsset,
  getRound10News,
  calculateRoundResult, 
  formatMoney,
  getEndingForAsset,
  VIP_ENDINGS,
  TITLE_EGG_MESSAGES,
  ACHIEVEMENTS,
  Achievement
} from './utils/gameLogic';
import { audio } from './utils/audio';
import { 
  Terminal, TrendingUp, TrendingDown, AlertTriangle, Play, RefreshCw, Skull, MessageSquare, LineChart, FileText, PenTool, Bot, Award, Zap,
  Footprints, Fish, Landmark, MonitorX, Salad, PhoneMissed, TriangleAlert, Rocket, Calculator, Hourglass, MousePointer2, HeartCrack, Download,
  Crown, Printer, Eye, Lock, MessageCircle, X, Shield, Trophy
} from 'lucide-react';

type GameState = 'START' | 'SELECT_ASSET' | 'SIGN_CONTRACT' | 'PLAYING' | 'GAMEOVER' | 'VIP_MENU' | 'VIP_SELECT' | 'ACHIEVEMENTS';
type Lang = 'en' | 'zh';

interface NotificationState {
    id: number;
    title: string;
    message: string;
    sender: string;
    visible: boolean;
}

function App() {
  const lang: Lang = 'zh'; // Enforce Chinese
  const [gameState, setGameState] = useState<GameState>('START');
  const [turn, setTurn] = useState(1);
  const [balance, setBalance] = useState(10000);
  const [priceHistory, setPriceHistory] = useState<number[]>([100]); 
  const [selectedAsset, setSelectedAsset] = useState<AssetData | null>(null);
  const [pendingAsset, setPendingAsset] = useState<AssetData | null>(null); 
  const [activeKOL, setActiveKOL] = useState<KOLData | null>(null); 
  
  const [currentNews, setCurrentNews] = useState<Translation | null>(null);
  const [insiderTip, setInsiderTip] = useState<Translation | null>(null);
  const [lastAction, setLastAction] = useState<'LONG' | 'SHORT' | 'PUMP' | 'DUMP' | null>(null);
  const [lastDelta, setLastDelta] = useState<number | null>(null);
  const [gameOverReason, setGameOverReason] = useState<EndingData | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [showTA, setShowTA] = useState(false);
  const [danmakuQueue, setDanmakuQueue] = useState<string[]>([]);

  // New state for prominent KOL messages
  const [kolMessage, setKolMessage] = useState<string | null>(null);

  // Certificate Stats (Randomized on death)
  const [certStats, setCertStats] = useState({ leverage: '1x', iq: '-10' });

  // VIP Logic
  const [collectedDeaths, setCollectedDeaths] = useState<string[]>([]);
  const [isVIPUnlocked, setIsVIPUnlocked] = useState(false);
  const [isVipGameplay, setIsVipGameplay] = useState(false); // Are we in Dealer Mode?
  const [hasImmunity, setHasImmunity] = useState(false); // New Cheat: Bribe Regulators

  // Easter Eggs & Notifications
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [titleClicks, setTitleClicks] = useState(0);
  const [notification, setNotification] = useState<NotificationState | null>(null);
  
  // Hidden Egg: IRS Audit
  const [balanceClicks, setBalanceClicks] = useState(0);

  // Achievements Queue System
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const [achievementQueue, setAchievementQueue] = useState<Achievement[]>([]); // Queue for stacked achievements
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null); // Currently displaying
  const [showAchievement, setShowAchievement] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const certificateRef = useRef<HTMLDivElement>(null);

  // Load deaths from local storage
  useEffect(() => {
    const saved = localStorage.getItem('leek_deaths');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            setCollectedDeaths(parsed);
        } catch (e) {
            console.error("Failed to parse local storage", e);
        }
    }
    
    const savedAchievements = localStorage.getItem('leek_achievements');
    if (savedAchievements) {
        try {
            const parsed = JSON.parse(savedAchievements);
            setUnlockedAchievements(new Set(parsed));
        } catch(e) {}
    }
  }, []);

  // Save achievements to local storage
  useEffect(() => {
      localStorage.setItem('leek_achievements', JSON.stringify(Array.from(unlockedAchievements)));
  }, [unlockedAchievements]);

  // Check VIP Unlock
  useEffect(() => {
     // For testing, unlock with fewer, but prompt said "every investment"
     if (collectedDeaths.length >= ASSET_DATABASE.length) {
         setIsVIPUnlocked(true);
         unlockAchievement('vip_unlock');
     }
  }, [collectedDeaths]);

  // Achievement Queue Processor
  useEffect(() => {
      // If we have items in queue, and no achievement is currently showing (and popup is hidden)
      if (achievementQueue.length > 0 && !currentAchievement) {
          const nextAchievement = achievementQueue[0];
          
          // Remove from queue
          setAchievementQueue(prev => prev.slice(1));
          
          // Show it
          setCurrentAchievement(nextAchievement);
          setShowAchievement(true);
          audio.playAchievement();
      }
  }, [achievementQueue, currentAchievement]);

  // STABLE CLOSURE FOR POPUP CLOSE
  const closeAchievementPopup = useCallback(() => {
      setShowAchievement(false);
      // Wait for animation to finish before clearing currentAchievement
      // This allows the Queue Processor to pick up the next one
      setTimeout(() => {
          setCurrentAchievement(null);
      }, 500); 
  }, []);

  const unlockAchievement = (id: string) => {
      setUnlockedAchievements(prev => {
          if (prev.has(id)) return prev; // Already unlocked

          // Find achievement data
          const ach = ACHIEVEMENTS.find(a => a.id === id);
          if (ach) {
              // Add to queue instead of setting directly
              setAchievementQueue(q => [...q, ach]);
          }
          
          const newSet = new Set(prev);
          newSet.add(id);
          return newSet;
      });
  };

  // KONAMI CODE LISTENER
  useEffect(() => {
      const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
      let currentInput: string[] = [];

      const handleKeyDown = (e: KeyboardEvent) => {
          currentInput.push(e.key);
          if (currentInput.length > konamiCode.length) {
              currentInput.shift();
          }
          if (JSON.stringify(currentInput) === JSON.stringify(konamiCode)) {
              // Trigger Egg
              setIsMatrixMode(prev => !prev);
              audio.playWin(); // Feedback
              currentInput = []; // Reset
          }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // IRS Audit Egg Timer reset
  useEffect(() => {
      if (balanceClicks > 0) {
          const timer = setTimeout(() => setBalanceClicks(0), 800); // Must click fast
          return () => clearTimeout(timer);
      }
  }, [balanceClicks]);

  useEffect(() => {
    if (gameState === 'PLAYING' && turn === 1 && selectedAsset) {
      setCurrentNews(getNewsForAsset(selectedAsset.id));
      addLog(`${UI_TEXT.startLog[lang]}`);
      addLog(`Target acquired: ${selectedAsset.name[lang]}`);
      if (activeKOL) {
         addLog(`[COPY TRADE] Connected to ${activeKOL.name} (${activeKOL.winRate} Win Rate)`);
         setKolMessage(`Connected to ${activeKOL.name}. Auto-trading active.`);
      } else {
         setKolMessage(null);
      }
      
      if (isVipGameplay) {
          addLog("GOD MODE ENABLED. YOU ARE THE MARKET.");
      }
      if (hasImmunity) {
          addLog("SEC REGULATORS BRIBED. IMMUNITY ACTIVE.");
      }
    }
  }, [gameState, turn, selectedAsset, activeKOL, isVipGameplay, hasImmunity]);

  useEffect(() => {
    if (gameState === 'PLAYING' && activeKOL && !isProcessing && turn <= 10) {
      const decisionDelay = Math.random() * 2000 + 1500; 
      const timer = setTimeout(() => {
         const autoChoice = Math.random() > 0.5 ? 'LONG' : 'SHORT';
         handleDecision(autoChoice, true);
      }, decisionDelay);
      return () => clearTimeout(timer);
    }
  }, [gameState, activeKOL, isProcessing, turn]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs, gameState]);

  const showNotification = (sender: string, title: string, message: string) => {
      const id = Date.now();
      setNotification({ id, sender, title, message, visible: true });
      audio.playWin(); // Notification sound
      setTimeout(() => {
          setNotification(prev => prev?.id === id ? { ...prev, visible: false } : prev);
      }, 5000);
  };

  const addLog = (msg: string) => {
    setLogs(prev => [...prev, `> ${msg}`]);
  };

  // Wrapped in useCallback to prevent Chat component re-renders
  const handleNewChatMessage = useCallback((msg: string) => {
      setDanmakuQueue(prev => [...prev, msg]);
  }, []);

  const handleTitleClick = () => {
      audio.playClick();
      setTitleClicks(prev => prev + 1);
      if (titleClicks === 4) { // 5th click
          audio.playLoss();
          
          const egg = getRandomItem(TITLE_EGG_MESSAGES);
          
          showNotification(
              egg.sender, 
              egg.title[lang], 
              egg.message[lang] + (lang === 'zh' ? "\n(點擊此處關閉)" : "\n(Click to dismiss)")
          );
          setTitleClicks(0);
      }
  };

  const handleBalanceClick = () => {
      audio.playClick();
      setBalanceClicks(prev => {
          const newCount = prev + 1;
          if (newCount >= 10) {
              // Trigger IRS Egg
              audio.playCrash();
              const tax = Math.floor(balance * 0.1);
              setBalance(b => Math.floor(b - tax));
              addLog(`[SYSTEM] IRS Audit Initiated. Penalty: -$${tax}`);
              showNotification(
                  "IRS (國稅局)",
                  "Suspicious Activity (洗錢嫌疑)",
                  `Why are you poking the money? That's suspicious.\nAsset Seizure (資產扣押): -$${tax} (10%)`
              );
              unlockAchievement('irs_audit');
              return 0;
          }
          return newCount;
      });
  };

  const goToSelection = async () => {
    await audio.init();
    audio.playClick();
    setIsVipGameplay(false);
    setGameState('SELECT_ASSET');
  };

  const goToVIP = async () => {
    await audio.init();
    audio.playWin(); // VIP sound
    setGameState('VIP_MENU');
  };

  const startVipGame = (asset: AssetData) => {
    audio.playWin();
    setIsVipGameplay(true);
    setPendingAsset(asset);
    setActiveKOL(null);
    setGameState('SIGN_CONTRACT'); // Still sign contract for dramatic effect
  };

  const selectAssetToSign = (asset: AssetData) => {
    audio.playClick();
    setPendingAsset(asset);
    setActiveKOL(null); 
    setGameState('SIGN_CONTRACT');
  };

  const startCopyTrading = (kol: KOLData) => {
    audio.playClick();
    const randomAsset = getRandomItem(ASSET_DATABASE);
    setPendingAsset(randomAsset);
    setActiveKOL(kol);
    setGameState('SIGN_CONTRACT');
  };

  const cancelContract = () => {
    audio.playClick();
    setPendingAsset(null);
    setActiveKOL(null);
    if (isVipGameplay) {
        setGameState('VIP_SELECT');
    } else {
        setGameState('SELECT_ASSET');
    }
  };

  const confirmContract = () => {
    if (!pendingAsset) return;
    audio.playWin(); 
    setSelectedAsset(pendingAsset);
    setTurn(1);
    
    // Check if we are starting with money cheat (handled in VIP Menu but safe to ensure default here)
    if (balance === 0) setBalance(10000); 

    setPriceHistory([100]); 
    setLastAction(null);
    setLastDelta(null);
    setGameOverReason(null);
    setLogs([]);
    setInsiderTip(null);
    setIsProcessing(false);
    setShowTA(false);
    setGameState('PLAYING');
  };

  const resetGame = () => {
    setGameState('START');
    setSelectedAsset(null);
    setPendingAsset(null);
    setActiveKOL(null);
    setKolMessage(null);
    setIsVipGameplay(false);
    setHasImmunity(false);
    setBalance(10000); // Reset balance to default
  };

  const activateInfiniteMoney = () => {
      // Play a spam of BRRR sounds or logs
      audio.playWin();
      let count = 0;
      const interval = setInterval(() => {
          count++;
          addLog("MONEY PRINTER: BRRRRRRRRRRRRRRRRRRRRRRRRRR");
          if(count > 5) clearInterval(interval);
      }, 100);
      
      setBalance(1000000000);
      // LOCALIZED VIP MESSAGE
      showNotification(
          "聯準會 (Federal Reserve)", 
          "無限 QE 啟動", 
          "這是十億美金。別問錢哪來的，問就是基本面。\nHere is $1,000,000,000. Don't ask why."
      );
  };

  const activateImmunity = () => {
      audio.playClick();
      setHasImmunity(true);
      // LOCALIZED VIP MESSAGE
      showNotification(
          "證交會監管員 (SEC)", 
          "收到匯款", 
          "我們收到了您的「政治獻金」。這回合將對您睜一隻眼閉一隻眼。\nWe received your 'donation'. You are now untouchable."
      );
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(certificateRef.current, { 
        cacheBust: true, 
        backgroundColor: isVipGameplay ? '#000000' : '#f5f5dc', // Gold certificate uses different bg logic via CSS, but base needs to be set
        fontEmbedCSS: '', 
        filter: (node) => {
          if (node.tagName === 'LINK') return false;
          return true;
        }
      });
      const link = document.createElement('a');
      link.download = `leek-certificate-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
      alert("Image generation failed due to browser security restrictions. Please screenshot manually!");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDecision = (choice: 'LONG' | 'SHORT' | 'PUMP' | 'DUMP', isAuto: boolean = false) => {
    if (isProcessing) return;
    setIsProcessing(true);

    if (!isAuto) audio.playClick();
    
    // Determine Result
    const { priceChangePercent, isRigged } = calculateRoundResult(turn, choice, isVipGameplay);
    
    let profit = 0;
    if (isVipGameplay) {
        // In VIP mode, you are the dealer. Pump/Dump always works for you in rounds 1-9
        // until round 10 where you die.
        const multiplier = Math.abs(priceChangePercent);
        profit = balance * multiplier;
    } else {
        const profitFactor = choice === 'LONG' ? priceChangePercent : -priceChangePercent;
        profit = balance * profitFactor;
    }
    
    const newBalance = balance + profit;

    const currentPrice = priceHistory[priceHistory.length - 1];
    const newPrice = currentPrice * (1 + priceChangePercent);

    // ACHIEVEMENT CHECK: FIRST LOSS
    if (profit < 0) {
        unlockAchievement('first_loss');
    }

    if (newBalance > balance) {
      audio.playWin();
    } else if (turn === 10) {
      // CHECK IMMUNITY (Audio cue only here, logic is below)
      if (hasImmunity) {
          audio.playWin(); 
      } else {
          audio.playCrash();
      }
    } else {
      audio.playLoss();
    }

    if (newBalance < balance && mainRef.current) {
      mainRef.current.classList.remove('animate-shake');
      void mainRef.current.offsetWidth; 
      mainRef.current.classList.add('animate-shake');
    }

    setBalance(newBalance);
    setPriceHistory(prev => [...prev, newPrice]);
    setLastAction(choice);
    setLastDelta(profit);

    if (activeKOL) {
        addLog(`[KOL ${activeKOL.name}]: Executing ${choice}...`);
        if (turn < 10) {
            const quote = getRandomItem(activeKOL.quotes)[lang];
            addLog(`"${quote}"`);
            setKolMessage(`"${quote}"`);
        }
    } else {
        addLog(`${UI_TEXT.round[lang]} ${turn} ${UI_TEXT.roundEnd[lang]} [${choice}]`);
    }
    
    // DEATH TRIGGER (Round 10)
    if (turn >= 10) {
      // IF IMMUNITY IS ACTIVE
      if (hasImmunity) {
          const deathNews = getRound10News(choice);
          // Show special survival handling
          showNotification(
              "證交會監管員 (SEC)", 
              "干預協議啟動 (Intervention Protocol)", 
              "為了防止您的虧損，我們已凍結市場。享受您的紓困方案吧。\nWe have frozen the market. Enjoy your bailout."
          );
          
          unlockAchievement('survivor'); // GUARANTEED UNLOCK HERE

          setCurrentNews({ en: "CRASH AVERTED: GOV BAILOUT.", zh: "崩盤攔截：政府宣布因「大到不能倒」進行紓困。" });
          addLog(`${UI_TEXT.systemCritical[lang]}: ${deathNews[lang]}`);
          addLog("!!! REGULATOR INTERVENTION: LOSSES REVERSED !!!");
          
          setKolMessage("They saved us! I knew it! ( sweating profusely )");
          
          // Force balance positive slightly if negative, or just let them bask in survival
          if (newBalance < 0) setBalance(10000);

          setTimeout(() => {
              // Instead of alert, we just let them see the screen for a bit then reset
              resetGame();
          }, 4000);
          
          setIsProcessing(false);
          return;
      }

      // CHECK BANKRUPTCY ACHIEVEMENT
      // Queue system ensures this shows after 'first_loss' if both triggered
      if (newBalance <= 0) {
          unlockAchievement('bankruptcy');
      }

      const deathNews = getRound10News(choice);
      setCurrentNews(deathNews);
      addLog(`${UI_TEXT.systemCritical[lang]}: ${deathNews[lang]}`);
      
      if (activeKOL) {
         const finalQuote = activeKOL.exitScamQuote[lang];
         addLog(`[KOL ${activeKOL.name}]: ${finalQuote}`);
         setKolMessage(finalQuote); 
      }
      
      // SAVE DEATH TO LOCAL STORAGE
      if (selectedAsset && !isVipGameplay) {
          if (!collectedDeaths.includes(selectedAsset.id)) {
              const newDeaths = [...collectedDeaths, selectedAsset.id];
              setCollectedDeaths(newDeaths);
              localStorage.setItem('leek_deaths', JSON.stringify(newDeaths));
          }
      }

      setCertStats({
          leverage: isVipGameplay ? '∞' : Math.floor(Math.random() * 500 + 50) + 'x',
          iq: isVipGameplay ? 'NaN' : '-' + Math.floor(Math.random() * 50 + 20)
      });

      setTimeout(() => {
        let reason: EndingData;
        if (isVipGameplay) {
            reason = getRandomItem(VIP_ENDINGS);
        } else {
            // Get asset specific ending
            reason = getEndingForAsset(selectedAsset?.id || 'doge');
        }

        setGameOverReason(reason);
        setGameState('GAMEOVER');
        setIsProcessing(false);
      }, 4000);

    } else {
      // Normal Round Turn Transition
      if (Math.random() > 0.7 && !activeKOL && !isVipGameplay) {
        addLog(getRandomItem(SYSTEM_MOCKERY)[lang]);
      }
      const resultSymbol = profit >= 0 ? '+' : '';
      addLog(`${UI_TEXT.result[lang]} ${resultSymbol}${formatMoney(profit)}`);

      setTimeout(() => {
        setTurn(t => t + 1);
        if (selectedAsset) {
          setCurrentNews(getNewsForAsset(selectedAsset.id));
          if (!activeKOL && Math.random() > 0.7) {
             setInsiderTip(getRandomItem(INSIDER_TIPS));
          } else {
             setInsiderTip(null);
          }
        }
        setIsProcessing(false); 
      }, 500);
    }
  };

  const chartColor = lastDelta === null || lastDelta >= 0 ? '#00ff9d' : '#ff3860';
  const isCritical = turn === 10 && isProcessing; 

  // Icon Mapping
  const renderDeathIcon = (iconName: string) => {
    const size = 120;
    const props = { size, className: `${isVipGameplay ? 'text-yellow-500' : 'text-term-red'} opacity-80` };
    switch(iconName) {
      case 'run': return <Footprints {...props} />;
      case 'shark': return <Fish {...props} />;
      case 'audit': return <Landmark {...props} />;
      case 'crash': return <MonitorX {...props} />;
      case 'leek': return <Salad {...props} />;
      case 'kidney': return <Zap {...props} />; 
      case 'ponzi': return <TriangleAlert {...props} />;
      case 'alien': return <Rocket {...props} />;
      case 'math': return <Calculator {...props} />;
      case 'expired': return <Hourglass {...props} />;
      case 'click': return <MousePointer2 {...props} />;
      case 'emotion': return <HeartCrack {...props} />;
      case 'skull': return <Skull {...props} />;
      case 'sun': return <Zap {...props} />;
      case 'monitor': return <MonitorX {...props} />;
      case 'scale': return <Landmark {...props} />;
      case 'bot': return <Bot {...props} />;
      case 'heart': return <HeartCrack {...props} />;
      case 'rocket': return <Rocket {...props} />;
      default: return <Skull {...props} />;
    }
  };

  return (
    <div className={`relative h-[100dvh] w-screen ${isCritical ? 'bg-red-900/20' : ''} ${isMatrixMode ? 'hue-rotate-[90deg] contrast-125' : ''} transition-all duration-1000 overflow-hidden flex flex-col`}>
      
      {/* ACHIEVEMENT POPUP */}
      {currentAchievement && (
          <AchievementPopup 
            data={currentAchievement} 
            lang={lang} 
            visible={showAchievement} 
            onClose={closeAchievementPopup} // Uses useCallback
          />
      )}

      {/* NOTIFICATION OVERLAY */}
      <div 
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-sm z-50 transition-all duration-500 cursor-pointer hover:scale-105 active:scale-95 ${notification?.visible ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0'}`}
        onClick={() => setNotification(prev => prev ? { ...prev, visible: false } : null)}
      >
          {notification && (
              <div className="bg-gray-100 border border-gray-300 rounded-2xl shadow-2xl p-3 flex items-start gap-3 text-black font-sans relative">
                  <div className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                      <X size={14} />
                  </div>
                  <div className="bg-term-green w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                      !
                  </div>
                  <div className="flex-grow pr-4">
                      <div className="flex justify-between items-center">
                          <span className="font-bold text-sm">{notification.sender}</span>
                          <span className="text-gray-500 text-xs">now</span>
                      </div>
                      <div className="font-semibold text-xs mt-1 text-gray-700">{notification.title}</div>
                      <div className="text-sm mt-1 whitespace-pre-wrap">{notification.message}</div>
                  </div>
              </div>
          )}
      </div>

      {gameState === 'START' && (
        <div className="flex flex-col items-center justify-center h-full w-full text-center space-y-8 p-4 relative overflow-y-auto">
          
          <div className="mb-8 cursor-pointer select-none" onClick={handleTitleClick}>
            <Terminal size={64} className="text-term-green mx-auto mb-4 animate-pulse-fast" />
            <h1 className="text-4xl md:text-6xl font-vt323 text-term-green text-glow-green tracking-widest uppercase">
              {UI_TEXT.title[lang]}
            </h1>
            <p className="text-term-text text-xl mt-2">{UI_TEXT.subtitle[lang]}</p>
          </div>
          
          <div className="max-w-md text-left bg-terminal border border-term-grid p-6 rounded text-lg text-secondary space-y-2 font-mono text-sm">
            <p>{'>'} {UI_TEXT.init[lang]}</p>
            <p>{'>'} {UI_TEXT.loading[lang]} [OK]</p>
            <p>{'>'} {UI_TEXT.bypassing[lang]} [OK]</p>
            <p>{'>'} {UI_TEXT.risk[lang]}</p>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-md">
            <button 
                onClick={goToSelection}
                className="group relative px-8 py-4 bg-transparent border-2 border-term-green text-term-green text-2xl font-bold uppercase hover:bg-term-green hover:text-terminal transition-all"
            >
                <span className="flex items-center justify-center gap-3">
                <Play fill="currentColor" /> {UI_TEXT.start[lang]}
                </span>
            </button>

            <button 
                onClick={() => setGameState('ACHIEVEMENTS')}
                className="group relative px-8 py-3 bg-transparent border border-term-grid text-secondary font-bold uppercase hover:bg-term-grid hover:text-white transition-all"
            >
                <span className="flex items-center justify-center gap-3">
                <Trophy size={18} /> {UI_TEXT.achievements[lang]}
                </span>
            </button>
          </div>

          {/* Collection Status */}
          <div className="absolute bottom-8 left-0 right-0 text-center opacity-50 text-xs font-mono">
             DEATH COLLECTION: {collectedDeaths.length} / {ASSET_DATABASE.length}
             <div className="flex justify-center gap-1 mt-2">
                 {ASSET_DATABASE.map(a => (
                     <div 
                        key={a.id} 
                        className={`w-2 h-2 rounded-full ${collectedDeaths.includes(a.id) ? 'bg-term-red' : 'bg-gray-800'}`}
                        title={a.name[lang]}
                     ></div>
                 ))}
             </div>
          </div>

          {/* VIP Button */}
          {isVIPUnlocked && (
             <button 
               onClick={goToVIP}
               className="absolute top-8 right-8 animate-bounce flex items-center gap-2 text-yellow-500 font-bold border border-yellow-500 p-2 rounded hover:bg-yellow-900/50"
             >
                <Crown size={20} /> {UI_TEXT.vipButton[lang]}
             </button>
          )}
        </div>
      )}

      {/* STATE: ACHIEVEMENTS SCREEN */}
      {gameState === 'ACHIEVEMENTS' && (
          <div className="h-full w-full bg-black flex flex-col p-4 md:p-12 overflow-y-auto">
              <div className="max-w-4xl mx-auto w-full">
                  <div className="flex items-center justify-between mb-8 border-b border-term-grid pb-4">
                      <h2 className="text-3xl font-vt323 text-term-green text-glow-green uppercase flex items-center gap-3">
                          <Trophy size={32} /> {UI_TEXT.achievementsTitle[lang]}
                      </h2>
                      <button 
                          onClick={() => setGameState('START')}
                          className="px-4 py-2 border border-term-text text-term-text hover:bg-term-text hover:text-terminal transition-colors text-sm font-bold uppercase"
                      >
                          {UI_TEXT.back[lang]}
                      </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ACHIEVEMENTS.map(ach => {
                          const isUnlocked = unlockedAchievements.has(ach.id);
                          return (
                              <div 
                                  key={ach.id} 
                                  className={`p-4 border flex items-center gap-4 transition-all ${isUnlocked ? 'border-term-green bg-term-grid/20' : 'border-gray-800 bg-gray-900/50 opacity-60'}`}
                              >
                                  <div className={`w-16 h-16 flex items-center justify-center text-3xl rounded bg-black border ${isUnlocked ? 'border-term-green' : 'border-gray-700'}`}>
                                      {isUnlocked ? ach.icon : <Lock size={24} className="text-gray-600" />}
                                  </div>
                                  <div className="flex-1">
                                      <div className={`font-bold text-lg mb-1 ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                                          {isUnlocked ? ach.title[lang] : UI_TEXT.locked[lang]}
                                      </div>
                                      <div className={`text-sm font-mono leading-tight ${isUnlocked ? 'text-secondary' : 'text-gray-600 italic'}`}>
                                          {isUnlocked ? ach.description[lang] : UI_TEXT.hiddenCondition[lang]}
                                      </div>
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              </div>
          </div>
      )}

      {/* STATE: VIP MENU */}
      {gameState === 'VIP_MENU' && (
          <div className="h-full w-full bg-yellow-950/30 flex flex-col items-center p-8 overflow-y-auto">
             <div className="max-w-4xl w-full border-4 border-yellow-600 bg-black/90 p-8 shadow-[0_0_50px_rgba(234,179,8,0.3)] my-auto">
                
                <div className="flex items-center justify-center gap-4 mb-8 text-yellow-500">
                    <Eye size={48} />
                    <h1 className="text-4xl font-black uppercase text-glow">{UI_TEXT.vipTitle[lang]}</h1>
                    <Eye size={48} />
                </div>

                <p className="text-center text-yellow-200 mb-8 font-mono text-lg italic">
                    "{UI_TEXT.vipWelcome[lang]}"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* Cheat 1 - Infinite Money */}
                    <button 
                        onClick={activateInfiniteMoney}
                        className="p-6 border-2 border-yellow-600 hover:bg-yellow-600/20 group transition-all text-left"
                    >
                        <div className="flex items-center gap-3 text-yellow-500 font-bold text-xl mb-2">
                            <Printer className="group-hover:animate-spin" /> {UI_TEXT.vipMoney[lang]}
                        </div>
                        <div className="text-yellow-200/50 text-xs font-mono">
                            {'>'} Set Balance = $1,000,000,000
                        </div>
                    </button>

                    {/* MODE 2: DEALER GAMEPLAY */}
                    <button 
                        onClick={() => setGameState('VIP_SELECT')}
                        className="p-6 border-2 border-yellow-400 bg-yellow-900/30 hover:bg-yellow-400/20 group transition-all text-left col-span-1 md:col-span-2 text-center flex flex-col items-center"
                    >
                        <div className="flex items-center gap-3 text-yellow-400 font-bold text-2xl mb-2">
                            <Crown className="group-hover:scale-125 transition-transform" /> {UI_TEXT.vipModeStart[lang]}
                        </div>
                        <div className="text-yellow-200/50 text-sm font-mono">
                            {UI_TEXT.vipHint[lang]}
                        </div>
                    </button>

                     {/* Cheat 4 - Bribe Regulators */}
                     <button 
                        onClick={activateImmunity}
                        className="p-6 border-2 border-purple-600 hover:bg-purple-900/20 group transition-all text-left"
                    >
                        <div className="flex items-center gap-3 text-purple-500 font-bold text-xl mb-2">
                            <Lock className="group-hover:unlock" /> {UI_TEXT.vipBribe[lang]}
                        </div>
                        <div className="text-purple-200/50 text-xs font-mono">
                            {'>'} Prevents Round 10 Death (One-time)
                        </div>
                    </button>
                </div>

                <div className="text-center pt-8 border-t border-yellow-800">
                    <button 
                        onClick={() => setGameState('START')}
                        className="mt-4 px-8 py-2 bg-yellow-600 text-black font-bold hover:bg-yellow-500 transition-colors block mx-auto"
                    >
                        RETURN TO SIMULATION
                    </button>
                </div>

             </div>
          </div>
      )}

      {/* STATE: VIP SELECT ASSET */}
      {gameState === 'VIP_SELECT' && (
        <div className="flex flex-col items-center justify-start h-full w-full p-6 pt-12 overflow-y-auto bg-yellow-950/20">
          <h2 className="text-3xl font-vt323 text-yellow-500 mb-8 text-glow uppercase flex-shrink-0">
             CHOOSE YOUR VICTIM
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl pb-10 pr-2">
            {ASSET_DATABASE.map(asset => (
              <button
                key={asset.id}
                onClick={() => startVipGame(asset)}
                className="relative flex flex-col text-left p-4 border border-yellow-800 bg-black hover:bg-yellow-900/30 hover:border-yellow-400 transition-all group overflow-hidden"
              >
                <div className="text-xl font-bold text-yellow-500 group-hover:text-yellow-300 mb-1 mt-2">
                  {asset.name[lang]}
                </div>
                <div className="text-sm text-yellow-700 font-mono">
                  {asset.description[lang]}
                </div>
              </button>
            ))}
          </div>
           <button 
              onClick={() => setGameState('VIP_MENU')}
              className="mt-4 px-8 py-2 border border-yellow-600 text-yellow-600 font-bold hover:bg-yellow-900/50 transition-colors flex-shrink-0 mb-8"
           >
              BACK
           </button>
        </div>
      )}

      {/* NORMAL SELECT ASSET */}
      {gameState === 'SELECT_ASSET' && (
        <div className="flex flex-col items-center justify-start h-full w-full p-6 pt-12 overflow-y-auto">
          <h2 className="text-3xl font-vt323 text-term-text mb-8 text-glow uppercase flex-shrink-0">
            {UI_TEXT.selectAsset[lang]}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl pb-10 pr-2 flex-shrink-0">
            {ASSET_DATABASE.map(asset => {
              const isDead = collectedDeaths.includes(asset.id);
              return (
              <button
                key={asset.id}
                onClick={() => selectAssetToSign(asset)}
                className={`relative flex flex-col text-left p-4 border transition-all group overflow-hidden ${isDead ? 'border-term-red bg-red-900/10' : 'border-term-grid bg-terminal hover:bg-term-grid hover:border-term-green'}`}
              >
                <div className="absolute top-2 right-2 bg-term-red text-terminal text-xs font-bold px-2 py-1 rounded animate-pulse">
                   APY: {asset.fakeAPY}
                </div>
                
                {isDead && (
                    <div className="absolute top-2 left-2 text-term-red opacity-50">
                        <Skull size={20} />
                    </div>
                )}

                <div className={`text-xl font-bold mb-1 mt-2 ${isDead ? 'text-term-red' : 'text-term-green group-hover:text-glow-green'}`}>
                  {asset.name[lang]}
                </div>
                <div className="text-sm text-secondary font-mono">
                  {asset.description[lang]}
                </div>
              </button>
            )})}
          </div>

          <div className="w-full max-w-5xl mt-8 border-t border-term-grid pt-8 pb-12 flex-shrink-0">
              <div className="flex items-center gap-2 mb-6">
                 <Zap className="text-yellow-400" />
                 <h3 className="text-2xl font-vt323 text-yellow-400 uppercase">{UI_TEXT.kolSection[lang]}</h3>
              </div>
              <p className="text-secondary mb-6 text-sm">{UI_TEXT.kolWarning[lang]}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {KOL_DATABASE.map(kol => (
                    <button 
                        key={kol.id}
                        onClick={() => startCopyTrading(kol)}
                        className="border border-yellow-600/30 bg-yellow-900/10 hover:bg-yellow-900/20 hover:border-yellow-400 p-4 flex flex-col items-center text-center transition-all group"
                    >
                        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{kol.avatar}</div>
                        <div className="font-bold text-yellow-400 text-lg">{kol.name}</div>
                        <div className="text-xs text-yellow-600 uppercase tracking-widest mb-2">{kol.title[lang]}</div>
                        <div className="text-term-green font-mono text-sm mb-2">Win Rate: {kol.winRate}</div>
                        <div className="text-secondary text-xs italic opacity-80">"{kol.description[lang]}"</div>
                        
                        <div className="mt-4 px-4 py-1 bg-yellow-600/20 text-yellow-400 text-xs font-bold rounded flex items-center gap-1">
                           <Award size={12} /> {UI_TEXT.copyTrade[lang]}
                        </div>
                    </button>
                 ))}
              </div>
          </div>
        </div>
      )}

      {/* ... (Rest of game states: SIGN_CONTRACT, GAMEOVER, PLAYING - remain largely same structure but using new unlockAchievement) */}
      {gameState === 'SIGN_CONTRACT' && pendingAsset && (
        <div className="flex items-center justify-center h-full w-full p-4">
           <div className={`max-w-2xl w-full border-2 shadow-2xl flex flex-col max-h-[90vh] ${isVipGameplay ? 'bg-black border-yellow-500' : 'bg-terminal border-term-grid'}`}>
              <div className={`p-4 flex items-center justify-between flex-shrink-0 ${isVipGameplay ? 'bg-yellow-600 text-black' : 'bg-term-text text-terminal'}`}>
                 <div className="font-bold text-xl flex items-center gap-2">
                    <FileText size={24} /> {isVipGameplay ? "MARKET MAKER AGREEMENT" : UI_TEXT.contractTitle[lang]}
                 </div>
                 <div className="text-sm font-mono">DOC_ID: 666-SCAM</div>
              </div>

              <div className="flex-grow overflow-y-auto p-6 font-mono text-sm leading-relaxed space-y-4">
                  <div className="text-term-red font-bold uppercase border-b border-term-red pb-2 mb-4">
                     {UI_TEXT.contractWarning[lang]}
                  </div>
                  
                  {isVipGameplay ? (
                      <div className="text-yellow-400">
                          <p className="mb-4">[DEALER TERMS]</p>
                          <p>You are now the House. You control the price.</p>
                          <p>Remember: The House always wins... until it burns down.</p>
                      </div>
                  ) : activeKOL ? (
                      <div className="text-yellow-400">
                          <p className="mb-4">[POWER OF ATTORNEY - COPY TRADING]</p>
                          <p className="mb-4">
                            I hereby grant <strong>{activeKOL.name}</strong> full and irrevocable rights to gamble my life savings away. 
                          </p>
                      </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-term-text opacity-90">
                        {pendingAsset.contract[lang]}
                    </div>
                  )}

                  <div className="mt-8 p-4 bg-term-grid bg-opacity-20 border border-term-grid rounded text-xs text-secondary italic">
                     * By clicking the button below, you forfeit your right to sue, complain, or cry in public.
                  </div>
              </div>

              <div className="p-4 border-t border-term-grid bg-black flex justify-between items-center flex-shrink-0 gap-4">
                 <button 
                    onClick={cancelContract}
                    className="px-4 py-3 border border-term-text text-term-text hover:bg-term-text hover:text-terminal transition-colors font-bold whitespace-nowrap"
                 >
                    {UI_TEXT.cancel[lang]}
                 </button>

                 <button 
                    onClick={confirmContract}
                    className={`flex items-center justify-center gap-2 px-6 py-3 font-bold text-lg hover:bg-white transition-colors w-full sm:w-auto ${isVipGameplay ? 'bg-yellow-500 text-black' : 'bg-term-green text-terminal'}`}
                 >
                    <PenTool size={18} /> {isVipGameplay ? "INITIALIZE MARKET" : UI_TEXT.signContract[lang]}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* STATE: GAME OVER (Certificate) */}
      {gameState === 'GAMEOVER' && (
        <div className="h-full w-full overflow-y-auto">
          <div className="min-h-full w-full flex flex-col items-center justify-center p-4">
          
          {/* THE CERTIFICATE */}
          <div 
             ref={certificateRef}
             className={`relative w-full max-w-lg p-8 border-[12px] border-double shadow-2xl mb-8 ${isVipGameplay ? 'border-yellow-500' : 'border-black'}`}
             style={{ 
               backgroundColor: isVipGameplay ? '#000000' : '#f5f5dc', // EXPLICIT INLINE STYLE FOR HTML-TO-IMAGE
               color: isVipGameplay ? '#eab308' : 'black',             // EXPLICIT INLINE STYLE FOR HTML-TO-IMAGE
               fontFamily: '"Times New Roman", serif',
               backgroundImage: isVipGameplay ? 'none' : 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' 
             }}
          >
              {/* Corner Ornaments */}
              <div className={`absolute top-2 left-2 w-16 h-16 border-t-4 border-l-4 ${isVipGameplay ? 'border-yellow-500' : 'border-black'}`}></div>
              <div className={`absolute top-2 right-2 w-16 h-16 border-t-4 border-r-4 ${isVipGameplay ? 'border-yellow-500' : 'border-black'}`}></div>
              <div className={`absolute bottom-2 left-2 w-16 h-16 border-b-4 border-l-4 ${isVipGameplay ? 'border-yellow-500' : 'border-black'}`}></div>
              <div className={`absolute bottom-2 right-2 w-16 h-16 border-b-4 border-r-4 ${isVipGameplay ? 'border-yellow-500' : 'border-black'}`}></div>

              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                 {isVipGameplay ? <Crown size={300} color="#eab308" /> : <Skull size={300} color="black" />}
              </div>

              {/* STAMP */}
              <div className="absolute top-1/2 right-10 transform -translate-y-1/2 rotate-[-20deg] border-4 border-term-red text-term-red font-black text-6xl px-4 py-2 opacity-80" style={{ fontFamily: 'Impact, sans-serif' }}>
                 {isVipGameplay ? "CLOWN" : "REKT"}
              </div>

              <div className="text-center relative z-10">
                 <h1 className="text-4xl font-black uppercase mb-2 border-b-4 pb-2 tracking-wider" style={{ color: isVipGameplay ? '#eab308' : 'black', borderColor: isVipGameplay ? '#eab308' : 'black' }}>
                    {isVipGameplay ? UI_TEXT.certificateTitleGold[lang] : UI_TEXT.certificateTitle[lang]}
                 </h1>
                 
                 <p className="italic text-lg mb-6" style={{ color: isVipGameplay ? '#fde047' : '#1f2937' }}>
                    {isVipGameplay ? UI_TEXT.certificateSubtitleGold[lang] : UI_TEXT.certificateSubtitle[lang]}
                 </p>

                 <div className="flex justify-center mb-6">
                    {gameOverReason && renderDeathIcon(gameOverReason.iconName)}
                 </div>

                 <div className={`text-left bg-opacity-50 border-2 p-4 mb-6 text-sm ${isVipGameplay ? 'bg-gray-900 border-yellow-500' : 'bg-white border-black'}`} style={{ borderColor: isVipGameplay ? '#eab308' : 'black' }}>
                     <div className="grid grid-cols-2 gap-y-2">
                        <div className="font-bold border-b pb-1" style={{ borderColor: '#6b7280', color: isVipGameplay ? '#eab308' : 'black' }}>{CERTIFICATE_TEXT.name[lang]}:</div>
                        <div className="font-mono text-right border-b pb-1" style={{ borderColor: '#6b7280', color: isVipGameplay ? '#eab308' : 'black' }}>{isVipGameplay ? "The Dealer" : `Leek No. ${Math.floor(Math.random()*10000)}`}</div>

                        <div className="font-bold border-b pb-1" style={{ borderColor: '#6b7280', color: isVipGameplay ? '#eab308' : 'black' }}>{CERTIFICATE_TEXT.date[lang]}:</div>
                        <div className="font-mono text-right border-b pb-1" style={{ borderColor: '#6b7280', color: isVipGameplay ? '#eab308' : 'black' }}>{new Date().toLocaleDateString()}</div>

                        <div className="font-bold border-b pb-1" style={{ borderColor: '#6b7280', color: isVipGameplay ? '#eab308' : 'black' }}>{CERTIFICATE_TEXT.asset[lang]}:</div>
                        <div className="font-mono text-right border-b pb-1 text-red-700 font-bold" style={{ borderColor: '#6b7280', color: '#b91c1c' }}>{selectedAsset?.name[lang]}</div>

                        <div className="font-bold border-b pb-1" style={{ borderColor: '#6b7280', color: isVipGameplay ? '#eab308' : 'black' }}>{CERTIFICATE_TEXT.strategy[lang]}:</div>
                        <div className="font-mono text-right border-b pb-1 italic" style={{ borderColor: '#6b7280', color: isVipGameplay ? '#fca5a5' : '#374151' }}>
                            {isVipGameplay ? CERTIFICATE_TEXT.strategies.god[lang] : (activeKOL ? CERTIFICATE_TEXT.strategies.faith[lang] : CERTIFICATE_TEXT.strategies.panic[lang])}
                        </div>

                        <div className="font-bold border-b pb-1" style={{ borderColor: '#6b7280', color: isVipGameplay ? '#eab308' : 'black' }}>{CERTIFICATE_TEXT.leverage[lang]}:</div>
                        <div className="font-mono text-right border-b pb-1" style={{ borderColor: '#6b7280', color: isVipGameplay ? '#eab308' : 'black' }}>{certStats.leverage}</div>

                        <div className="font-bold border-b pb-1" style={{ borderColor: '#6b7280', color: isVipGameplay ? '#eab308' : 'black' }}>{CERTIFICATE_TEXT.iq[lang]}:</div>
                        <div className="font-mono text-right border-b pb-1 text-red-600" style={{ borderColor: '#6b7280', color: '#dc2626' }}>{certStats.iq}</div>

                        <div className="font-bold border-b pb-1 pt-2 text-lg" style={{ borderColor: isVipGameplay ? '#eab308' : 'black', color: isVipGameplay ? '#eab308' : 'black' }}>{CERTIFICATE_TEXT.netWorth[lang]}:</div>
                        <div className="font-mono text-right border-b pb-1 pt-2 text-red-600 font-bold text-lg" style={{ borderColor: isVipGameplay ? '#eab308' : 'black', color: '#dc2626' }}>{formatMoney(balance)}</div>
                     </div>
                     
                     <div className="mt-4 pt-2 border-t-2 border-dashed border-gray-400" style={{ borderColor: '#9ca3af' }}>
                        <p className="font-bold" style={{ color: isVipGameplay ? '#eab308' : 'black' }}>{UI_TEXT.cause[lang]}:</p>
                        <p className="font-mono mt-1 leading-tight" style={{ color: isVipGameplay ? '#fca5a5' : '#1f2937' }}>{gameOverReason?.text[lang]}</p>
                     </div>
                 </div>
                 
                 <div className="mt-8 flex justify-between items-end">
                     <div className="text-center">
                        <div className="w-32 border-b mb-1" style={{ borderColor: isVipGameplay ? '#eab308' : 'black' }}></div>
                        <div className="text-xs uppercase font-bold" style={{ color: isVipGameplay ? '#eab308' : 'black' }}>The Market</div>
                     </div>
                     
                     <div className="w-16 h-16">
                        {/* Seal */}
                        <svg viewBox="0 0 100 100" className="w-full h-full text-red-800 fill-current opacity-80" style={{ color: '#991b1b' }}>
                           <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
                        </svg>
                     </div>

                     <div className="text-center">
                        <div className="w-32 border-b mb-1 font-script text-xl transform -rotate-6 text-gray-500 font-mono text-xs pt-4" style={{ borderColor: isVipGameplay ? '#eab308' : 'black', color: '#6b7280' }}>(Signature not found)</div>
                        <div className="text-xs uppercase font-bold" style={{ color: isVipGameplay ? '#eab308' : 'black' }}>The Bag Holder</div>
                     </div>
                 </div>
              </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
             <button 
                onClick={resetGame}
                className="px-6 py-3 border border-term-text text-term-text hover:bg-term-text hover:text-terminal transition-colors flex items-center gap-2"
              >
                <RefreshCw size={20} /> {UI_TEXT.retry[lang]}
              </button>

              <button 
                onClick={downloadCertificate}
                disabled={isDownloading}
                className="px-6 py-3 bg-term-green text-terminal font-bold hover:bg-white transition-colors flex items-center gap-2"
              >
                {isDownloading ? (
                   <span className="animate-pulse">{UI_TEXT.downloading[lang]}</span>
                ) : (
                   <><Download size={20} /> {UI_TEXT.share[lang]}</>
                )}
              </button>
          </div>
          </div>
        </div>
      )}

      {/* GAMEPLAY VIEW */}
      {gameState === 'PLAYING' && (
        <div ref={mainRef} className={`max-w-6xl mx-auto p-2 md:p-4 h-full w-full flex flex-col md:flex-row gap-2 md:gap-4 ${isCritical ? 'animate-shake' : ''} overflow-hidden`}>
          
          {/* LEFT COLUMN: Main Game Area */}
          {/* Mobile: 65% height, Desktop: flex-1 */}
          <div className="flex-[65] md:flex-1 flex flex-col gap-2 md:gap-4 min-w-0 min-h-0 overflow-y-auto">
            <header className="flex justify-between items-end border-b-2 border-term-grid pb-2 flex-shrink-0">
              <div>
                <div className="text-secondary text-xs md:text-sm font-mono mb-1">{UI_TEXT.currentAsset[lang]} {isVipGameplay && <span className="text-yellow-500 font-bold ml-2">[DEALER MODE]</span>}</div>
                <div className="text-lg md:text-3xl text-term-green text-glow-green uppercase tracking-wide flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 md:w-3 md:h-3 bg-term-green rounded-full flex-shrink-0 ${isCritical ? 'animate-ping bg-term-red' : 'animate-pulse'}`}></span>
                  {selectedAsset?.name[lang]}
                </div>
              </div>
              <div className="text-right">
                <div className="flex flex-col items-end">
                    <div className="text-secondary text-xs md:text-sm font-mono mb-1 flex items-center gap-2">
                        {hasImmunity && <Shield size={14} className="text-purple-400" title="Protected by Regulators" />}
                        {UI_TEXT.turn[lang]} {turn}/10
                    </div>
                    {/* CLICKABLE BALANCE FOR SECRET IRS EGG */}
                    <div 
                        onClick={handleBalanceClick}
                        className={`text-2xl md:text-4xl font-bold font-vt323 cursor-pointer select-none active:scale-95 transition-transform ${balance < 0 ? 'text-term-red' : (isVipGameplay ? 'text-yellow-500' : 'text-term-text')}`}
                        title="Don't touch the money..."
                    >
                        {formatMoney(balance)}
                    </div>
                </div>
              </div>
            </header>

            {/* News Section */}
            <div className={`bg-term-grid bg-opacity-30 border-l-4 p-2 md:p-4 min-h-[3rem] md:min-h-[4rem] flex flex-col justify-center transition-colors flex-shrink-0 ${isCritical ? 'border-term-red bg-red-900/30' : 'border-yellow-500'}`}>
              <div className={`${isCritical ? 'text-term-red' : 'text-yellow-500'} font-bold text-[10px] md:text-xs uppercase mb-1 flex items-center gap-2`}>
                <AlertTriangle size={12} /> {isCritical ? UI_TEXT.systemCritical[lang] : UI_TEXT.news[lang]}
              </div>
              <p className={`text-sm md:text-lg leading-tight ${isCritical ? 'text-term-red animate-pulse' : 'text-term-text'}`}>
                {currentNews?.[lang] || "..."}
              </p>
            </div>
            
            {/* Chart Section */}
            <div className="relative flex-1 min-h-[150px] flex flex-col">
              {insiderTip && !isCritical && !activeKOL && !isVipGameplay && (
                <div className="bg-blue-900/20 border border-blue-500/30 rounded p-1 md:p-2 flex items-center gap-3 animate-fade-in mb-2 flex-shrink-0">
                   <MessageSquare size={16} className="text-blue-400" />
                   <div className="overflow-hidden">
                     <span className="text-[10px] text-blue-400 font-bold block">{UI_TEXT.insider[lang]}</span>
                     <span className="text-xs md:text-sm text-term-text italic opacity-80 truncate block">{insiderTip[lang]}</span>
                   </div>
                </div>
              )}

              {activeKOL && (
                  <div className="bg-yellow-900/30 border border-yellow-500/50 p-2 flex flex-col gap-1 animate-pulse mb-2 flex-shrink-0">
                      <div className="flex items-center gap-3">
                          <Bot size={20} className="text-yellow-400 flex-shrink-0" />
                          <div className="text-yellow-400 font-mono text-sm font-bold truncate">
                              {UI_TEXT.autoTrading[lang]}: {activeKOL.name}
                          </div>
                      </div>
                      {kolMessage && (
                          <div className="pl-8 text-xs text-yellow-200 italic font-mono leading-tight">
                              {kolMessage}
                          </div>
                      )}
                  </div>
              )}

              <div className={`relative ${isCritical ? 'border-term-red' : (isVipGameplay ? 'border-yellow-500' : 'border-term-grid')} border transition-colors duration-500 flex-1 w-full`}>
                 <div className="absolute top-2 left-2 flex gap-2 z-10">
                   <div className="bg-black bg-opacity-70 px-2 py-1 text-xs text-secondary">
                    {UI_TEXT.priceAction[lang]}
                  </div>
                  <button 
                    onClick={() => setShowTA(!showTA)}
                    className={`px-2 py-1 text-xs border ${showTA ? 'bg-term-grid border-term-green text-term-green' : 'bg-black bg-opacity-70 border-term-text text-secondary'} hover:text-term-green transition-colors flex items-center gap-1`}
                  >
                    <LineChart size={10} />
                    {showTA ? 'TA: ON' : 'TA: OFF'}
                  </button>
                </div>
                {/* Ensure Chart fits in container */}
                <div className="w-full h-full absolute inset-0">
                     <Chart data={priceHistory} color={chartColor} showTA={showTA} danmaku={danmakuQueue} />
                </div>
              </div>
            </div>

            {/* Buttons - Always visible */}
            <div className="grid grid-cols-2 gap-4 h-16 md:h-24 flex-shrink-0 mt-2">
              <button 
                onClick={() => handleDecision(isVipGameplay ? 'PUMP' : 'LONG')}
                disabled={isProcessing || (!!activeKOL && !isVipGameplay)} 
                className={`
                  bg-term-grid bg-opacity-20 border-2 text-lg md:text-2xl font-bold transition-all flex flex-col items-center justify-center group
                  ${(isProcessing || (!!activeKOL && !isVipGameplay))
                    ? 'border-gray-700 text-gray-700 cursor-not-allowed opacity-50' 
                    : 'border-term-green text-term-green hover:bg-term-green hover:text-terminal'}
                `}
              >
                <div className="flex items-center gap-2">
                    <TrendingUp size={20} className={`md:mb-1 ${!isProcessing && 'group-hover:scale-110'} transition-transform`} />
                    {isVipGameplay ? UI_TEXT.pump[lang] : UI_TEXT.long[lang]}
                </div>
              </button>
              <button 
                onClick={() => handleDecision(isVipGameplay ? 'DUMP' : 'SHORT')}
                disabled={isProcessing || (!!activeKOL && !isVipGameplay)} 
                className={`
                  bg-term-grid bg-opacity-20 border-2 text-lg md:text-2xl font-bold transition-all flex flex-col items-center justify-center group
                  ${(isProcessing || (!!activeKOL && !isVipGameplay))
                    ? 'border-gray-700 text-gray-700 cursor-not-allowed opacity-50' 
                    : 'border-term-red text-term-red hover:bg-term-red hover:text-terminal'}
                `}
              >
                <div className="flex items-center gap-2">
                    <TrendingDown size={20} className={`md:mb-1 ${!isProcessing && 'group-hover:scale-110'} transition-transform`} />
                    {isVipGameplay ? UI_TEXT.dump[lang] : UI_TEXT.short[lang]}
                </div>
              </button>
            </div>
            
            <div className="text-center text-secondary text-[10px] md:text-xs opacity-50 flex-shrink-0">
              {UI_TEXT.warning[lang]}
            </div>
          </div>

          {/* RIGHT COLUMN: Chat & Logs */}
          {/* Mobile: 35% height, Desktop: w-80 */}
          <div className="flex-[35] md:flex-none md:w-80 flex flex-col gap-2 md:gap-4 flex-shrink-0 overflow-hidden border-t md:border-t-0 md:border-l border-term-grid pt-2 md:pt-0 pl-0 md:pl-4 min-h-0">
             <div 
              ref={logContainerRef}
              className="bg-black border border-term-grid p-2 h-1/2 md:h-1/3 overflow-y-auto font-mono text-xs space-y-1 flex-shrink-0"
            >
               {logs.map((log, i) => (
                 <div key={i} className="text-secondary">{log}</div>
               ))}
               <div className={`animate-pulse ${isProcessing ? 'text-term-green' : 'text-secondary'}`}>
                  {'>'} {isProcessing ? UI_TEXT.processing[lang] : UI_TEXT.awaiting[lang]}
               </div>
            </div>
            
            <div className="flex-grow min-h-0 flex flex-col">
              <Trollbox 
                 lang={lang} 
                 isActive={true} 
                 onNewMessage={handleNewChatMessage}
                 isVip={isVipGameplay}
              />
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default App;