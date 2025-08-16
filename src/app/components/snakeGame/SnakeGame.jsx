import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Developer Portfolio Themed Snake Game
 * - Matches the dark blue/teal theme
 * - Clean, modern UI matching the portfolio design
 * - Proper spacing and typography
 */

const COLORS = {
  bg: "#011627",
  panelBg: "#011221", 
  darkPanel: "#01111F",
  text: "#E5E9F0",
  accent: "#4D5BCE",
  green: "#43D9AD",
  orange: "#FEA55F",
  subText: "#607B96",
  border: "#1E2D3D",
  buttonBg: "#1E2D3D",
  snakeHead: "#43D9AD",
  snakeBody: "#43D9AD",
  food: "#FEA55F",
};

const BOARD_SIZE = 20;
const TICK_MS = 150;
const TOTAL_FOOD_TO_WIN = 10;

const DIRS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

function ThemedSnakeGame() {
  const [started, setStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [dir, setDir] = useState(DIRS.UP);
  const [food, setFood] = useState({ x: 12, y: 6 });
  const [eaten, setEaten] = useState(0);
  const pendingDir = useRef(DIRS.UP);

  const spawnFood = useCallback((snakeArr) => {
    let spot;
    do {
      spot = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snakeArr.some((s) => s.x === spot.x && s.y === spot.y));
    return spot;
  }, []);

  const reset = useCallback(() => {
    setStarted(true);
    setGameOver(false);
    setWon(false);
    setSnake([{ x: 10, y: 10 }]);
    setDir(DIRS.UP);
    pendingDir.current = DIRS.UP;
    setFood({ x: 12, y: 6 });
    setEaten(0);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (!started || gameOver || won) return;
      e.preventDefault();
      if (e.key === "ArrowUp" && dir.y === 0) pendingDir.current = DIRS.UP;
      else if (e.key === "ArrowDown" && dir.y === 0) pendingDir.current = DIRS.DOWN;
      else if (e.key === "ArrowLeft" && dir.x === 0) pendingDir.current = DIRS.LEFT;
      else if (e.key === "ArrowRight" && dir.x === 0) pendingDir.current = DIRS.RIGHT;
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [started, gameOver, won, dir]);

  useEffect(() => {
    if (!started || gameOver || won) return;
    const timer = setInterval(() => {
      setSnake((curr) => {
        const nd = pendingDir.current;
        setDir(nd);
        const head = { x: curr[0].x + nd.x, y: curr[0].y + nd.y };

        if (
          head.x < 0 ||
          head.x >= BOARD_SIZE ||
          head.y < 0 ||
          head.y >= BOARD_SIZE
        ) {
          setGameOver(true);
          return curr;
        }
        
        if (curr.some((s) => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          return curr;
        }

        const next = [head, ...curr];
        if (head.x === food.x && head.y === food.y) {
          const newCount = eaten + 1;
          setEaten(newCount);
          if (newCount >= TOTAL_FOOD_TO_WIN) {
            setWon(true);
          } else {
            setFood(spawnFood(next));
          }
          return next;
        } else {
          next.pop();
          return next;
        }
      });
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [started, gameOver, won, food, eaten, spawnFood]);

  const foodDots = useMemo(() => 
    Array.from({ length: TOTAL_FOOD_TO_WIN }, (_, i) => i < eaten), 
    [eaten]
  );

  return (
    <div 
      className="w-full max-w-md bg-gradient-to-br from-blue-900/20 to-teal-900/20 backdrop-blur-sm rounded-lg border border-gray-700/50 overflow-hidden"
      style={{
        backgroundColor: COLORS.panelBg,
        borderColor: COLORS.border,
      }}
    >
      {/* Header with decorative corners */}
      <div className="relative border-b" style={{ borderColor: COLORS.border }}>
        <div 
          className="h-12 flex items-center justify-between px-4"
          style={{ backgroundColor: COLORS.darkPanel }}
        >
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
          </div>
          <div 
            className="text-sm font-mono"
            style={{ color: COLORS.subText }}
          >
            snake-game.js
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="p-6">
        {/* Game Canvas */}
        <div 
          className="relative mb-6 rounded-md border"
          style={{ 
            backgroundColor: COLORS.darkPanel,
            borderColor: COLORS.border 
          }}
        >
          <svg 
            viewBox={`0 0 ${BOARD_SIZE * 20} ${BOARD_SIZE * 20}`}
            className="w-full h-auto"
            style={{ backgroundColor: COLORS.darkPanel }}
          >
            {/* Grid lines for aesthetic */}
            {Array.from({ length: BOARD_SIZE + 1 }).map((_, i) => (
              <g key={i}>
                <line
                  x1={0}
                  y1={i * 20}
                  x2={BOARD_SIZE * 20}
                  y2={i * 20}
                  stroke={COLORS.border}
                  strokeWidth="0.5"
                  opacity="0.3"
                />
                <line
                  x1={i * 20}
                  y1={0}
                  x2={i * 20}
                  y2={BOARD_SIZE * 20}
                  stroke={COLORS.border}
                  strokeWidth="0.5"
                  opacity="0.3"
                />
              </g>
            ))}
            
            {/* Food */}
            <circle
              cx={food.x * 20 + 10}
              cy={food.y * 20 + 10}
              r="6"
              fill={COLORS.food}
              style={{
                filter: 'drop-shadow(0 0 8px rgba(254, 165, 95, 0.6))'
              }}
            />
            
            {/* Snake */}
            {snake.map((segment, i) => (
              <rect
                key={i}
                x={segment.x * 20 + 3}
                y={segment.y * 20 + 3}
                width="14"
                height="14"
                rx="2"
                fill={i === 0 ? COLORS.snakeHead : COLORS.snakeBody}
                style={{
                  filter: i === 0 
                    ? 'drop-shadow(0 0 6px rgba(67, 217, 173, 0.6))' 
                    : 'drop-shadow(0 0 3px rgba(67, 217, 173, 0.3))'
                }}
              />
            ))}
          </svg>
          
          {/* Game Status Overlay */}
          {(gameOver || won || !started) && (
            <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-md">
              <div className="text-center">
                {gameOver && (
                  <>
                    <div 
                      className="text-2xl font-mono mb-4 font-bold"
                      style={{ color: COLORS.text }}
                    >
                      Game Over!
                    </div>
                    <button
                      onClick={reset}
                      className="px-4 py-2 rounded font-mono text-sm transition-all hover:brightness-110 border"
                      style={{
                        backgroundColor: COLORS.buttonBg,
                        color: COLORS.green,
                        borderColor: COLORS.border
                      }}
                    >
                      start-again
                    </button>
                  </>
                )}
                
                {won && (
                  <>
                    <div 
                      className="text-2xl font-mono mb-4 font-bold"
                      style={{ color: COLORS.green }}
                    >
                      Well done!
                    </div>
                    <button
                      onClick={reset}
                      className="px-4 py-2 rounded font-mono text-sm transition-all hover:brightness-110 border"
                      style={{
                        backgroundColor: COLORS.buttonBg,
                        color: COLORS.green,
                        borderColor: COLORS.border
                      }}
                    >
                      play-again
                    </button>
                  </>
                )}
                
                {!started && !gameOver && !won && (
                  <button
                    onClick={() => setStarted(true)}
                    className="px-6 py-3 rounded font-mono text-lg transition-all hover:brightness-110 border"
                    style={{
                      backgroundColor: COLORS.orange,
                      color: COLORS.darkPanel,
                      borderColor: COLORS.orange,
                      fontWeight: 'bold'
                    }}
                  >
                    start-game
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Controls Section */}
        <div className="mb-6">
          <div 
            className="font-mono text-sm mb-2"
            style={{ color: COLORS.subText }}
          >
            // use keyboard
          </div>
          <div 
            className="font-mono text-sm mb-4"
            style={{ color: COLORS.subText }}
          >
            // arrows to play
          </div>
          
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-1">
              <div></div>
              <Keycap symbol="▲" />
              <div></div>
              <Keycap symbol="◄" />
              <Keycap symbol="▼" />
              <Keycap symbol="►" />
            </div>
          </div>
        </div>

        {/* Food Counter */}
        <div className="mb-6">
          <div 
            className="font-mono text-sm mb-3"
            style={{ color: COLORS.subText }}
          >
            // food left
          </div>
          <div className="grid grid-cols-5 gap-2">
            {foodDots.map((consumed, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded-full border flex items-center justify-center"
                style={{
                  backgroundColor: consumed ? COLORS.food : 'transparent',
                  borderColor: COLORS.border,
                  opacity: consumed ? 1 : 0.3
                }}
              >
                {consumed && (
                  <div 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS.food }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skip Button */}
        <div className="flex justify-end">
          <button
            className="px-4 py-2 rounded font-mono text-sm transition-all hover:brightness-110 border"
            style={{
              backgroundColor: COLORS.buttonBg,
              color: COLORS.subText,
              borderColor: COLORS.border
            }}
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('gameSkipped'));
              }
            }}
          >
            skip
          </button>
        </div>
      </div>
    </div>
  );
}

function Keycap({ symbol }) {
  return (
    <div
      className="w-8 h-8 rounded flex items-center justify-center font-mono text-sm transition-all hover:brightness-110 border"
      style={{
        backgroundColor: COLORS.buttonBg,
        borderColor: COLORS.border,
        color: COLORS.text,
      }}
    >
      {symbol}
    </div>
  );
}

// Export as SnakeGame to match your import
export default ThemedSnakeGame;
export { ThemedSnakeGame as SnakeGame };