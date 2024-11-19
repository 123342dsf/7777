const log = document.getElementById("log");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");
let treasureHuntInfo = [];
 
// 获取寻宝信息
async function fetchTreasureHuntInfo() {
    update()
    try {
        const response = await fetch('treasure_map.txt');
        if (!response.ok) {
            throw new Error('无法获取寻宝信息');
        }
        const text = await response.text();
        // 将文本按行分割并存储在数组中
        treasureHuntInfo = text.split('\n').filter(line => line.trim() !== '');
    } catch (error) {
        console.error('获取寻宝信息时出错:', error);
    }
}
 
// 在页面加载时调用fetchTreasureHuntInfo函数
window.onload = async function() {
    await fetchTreasureHuntInfo();
};

let isTreasureHuntInProgress = false;

// 清空日志并隐藏重启按钮
function clearLog() {
    log.innerHTML = "";
    restartButton.style.display = "none";
}

// 添加日志
function appendLog(message) {
    const p = document.createElement("p");
    p.classList.add("fade-in");
    p.textContent = message;
    log.appendChild(p);
}

// 模拟在神庙中找寻宝藏地图API
class TreasureMap {
    static getInitialClue() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(treasureHuntInfo[0]);
            }, 1000);
        });
    }
    
    static decodeAncientScript(clue) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!clue) {
                    reject(treasureHuntInfo[1]);
                }
                resolve(treasureHuntInfo[2]);
            }, 1500);
        });
    }
    
    static searchTemple(location) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.3) {
                    reject(treasureHuntInfo[3]);
                }
                resolve(treasureHuntInfo[4]);
            }, 2000);
        });
    }

    // 新增情节：解谜环节
static solvePuzzle() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 提示谜题并等待用户输入
            const userAnswer = prompt("谜题：1 + 1 = ?");
            
            // 检查用户的回答
            if (userAnswer === "2") {
                resolve(treasureHuntInfo[5]);
            } else {
                reject(treasureHuntInfo[6]);
            }
        }, 2000);
    });
}
    
    // 新增情节：危险的陷阱
    static avoidTrap() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const random = Math.random();
                if (random < 0.4) {
                    reject(treasureHuntInfo[7]);
                }
                resolve(treasureHuntInfo[8]);
            }, 1500);
        });
    }

    // 新增情节：神秘人物的帮助
    static encounterMysteryPerson() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(treasureHuntInfo[9]);
            }, 1200);
        });
    }

    static openTreasureBox() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(treasureHuntInfo[10]);
            }, 1000);
        });
    }
}

function findTreasureWithPromises() {
    // 如果正在寻宝，阻止再次启动
    if (isTreasureHuntInProgress) {
        alert("正在寻宝中，请等待当前任务完成！");
        return;
    }

    isTreasureHuntInProgress = true; // 标记任务为进行中
    clearLog(); // 清空日志
    restartButton.style.display = "none"; // 隐藏重启按钮

    TreasureMap.getInitialClue()
        .then(clue => {
            appendLog(clue);
            return TreasureMap.decodeAncientScript(clue);
        })
        .then(location => {
            appendLog(location);
            return TreasureMap.searchTemple(location);
        })
        .then(box => {
            appendLog(box);
            return TreasureMap.solvePuzzle();  // 解谜
        })
        .then(puzzleResult => {
            appendLog(puzzleResult);
            return TreasureMap.avoidTrap();  // 避免陷阱
        })
        .then(trapResult => {
            appendLog(trapResult);
            return TreasureMap.encounterMysteryPerson();  // 遇见神秘人物
        })
        .then(mysteryMessage => {
            appendLog(mysteryMessage);
            return TreasureMap.openTreasureBox();
        })
        .then(treasure => {
            appendLog(treasure);
            restartButton.style.display = "block"; // 显示重启按钮
            historySuccessCount++;
            localStorage.setItem('historySuccessCount', historySuccessCount);
        })
        .catch(error => {
            appendLog("任务失败: " + error);
            restartButton.style.display = "block"; // 显示重启按钮
        })
        .finally(() => {
            isTreasureHuntInProgress = false; // 任务完成，标记为不进行中
            // 更新历史寻宝次数
            historyCount++;
            localStorage.setItem('historyCount', historyCount);
            update();
        });
}

// 重启寻宝的功能
function restartTreasureHunt() {
    findTreasureWithPromises();
}
//获取元素
const playerIdDisplay = document.getElementById('player-id-display');
const playerNicknameDisplay = document.getElementById('player-nickname-display');
const popup = document.getElementById('popup');
const historyCountDisplay = document.getElementById('history-count');
const historySuccessRateDisplay = document.getElementById('history-success-rate');

// 检查localStorage中是否有玩家数据和历史记录
const storedPlayerId = localStorage.getItem('playerId');
const storedPlayerNickname = localStorage.getItem('playerNickname');
let historyCount = parseInt(localStorage.getItem('historyCount')) || 0; // 默认为0
let historySuccessCount = parseInt(localStorage.getItem('historySuccessCount')) || 0;

if (storedPlayerId && storedPlayerNickname) {
    // 显示玩家信息
    playerIdDisplay.textContent = storedPlayerId;
    playerNicknameDisplay.textContent = storedPlayerNickname;
} else {
    // 显示弹窗
    popup.style.display = 'block';
}
// 更新页面显示
function update(){
    //重新获取，重新输出
    const storedPlayerId = localStorage.getItem('playerId');
    const storedPlayerNickname = localStorage.getItem('playerNickname');
    historyCount = parseInt(localStorage.getItem('historyCount')) || 0; // 默认为0
    historySuccessCount = parseInt(localStorage.getItem('historySuccessCount')) || 0;
    playerIdDisplay.textContent = storedPlayerId;
    playerNicknameDisplay.textContent = storedPlayerNickname;
    historyCountDisplay.textContent = historyCount;
    historySuccessRateDisplay.textContent = historySuccessCount === 0 ? '0%' : `${((historySuccessCount / historyCount).toFixed(2) * 100)}%`;
}
 // 保存玩家信息函数
window.savePlayerInfo = function() {
    const playerId = document.getElementById('player-id').value;
    const playerNickname = document.getElementById('player-nickname').value;

    // 验证输入
    if (!playerId || !playerNickname) {
        alert('请填写玩家ID和昵称');
        return;
    }
    if(historyCount==0 || historySuccessCount==0){
        localStorage.setItem('historyCount', 0);
        localStorage.setItem('historySuccessCount', 0)
    }

    // 存储玩家信息到 localStorage
    localStorage.setItem('playerId', playerId);
    localStorage.setItem('playerNickname', playerNickname);

    update();
    // 隐藏弹窗
    popup.style.display = 'none';

    // 启用开始按钮和日志区域
    startButton.disabled = false;
    log.innerHTML = ''; // 清空日志

    // 隐藏重启按钮（初始状态）
    restartButton.style.display = 'none';
};

startButton.addEventListener("click", findTreasureWithPromises);
restartButton.addEventListener("click", restartTreasureHunt);

 