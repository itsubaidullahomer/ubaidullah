import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/**
 * Snake Game - Exact UI Match
 * - Glassmorphism container with gradient borders
 * - Custom SVG arrow keys
 * - Layered food dots with opacity effects
 * - Proper spacing and dimensions
 */

const BOARD_SIZE = 20;
const TICK_MS = 150;
const TOTAL_FOOD_TO_WIN = 10;

const DIRS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

function SnakeGame() {
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

  return (
    <div 
      className="flex w-[510px] gap-6 rounded-lg border border-[#0C1616] bg-[#011627] px-[30px] py-[35px] backdrop-blur-[32px]"
      style={{
        background: `linear-gradient(135deg, rgba(23,85,83,0.70) 0%, transparent 50%, rgba(67,217,173,0.09) 100%), #011627`,
        boxShadow: 'inset 0 2px 0 0 rgba(255,255,255,0.30)'
      }}
    >
      {/* Game Board */}
      <div 
        className="h-[405.32px] w-[238.691px] rounded-lg relative"
        style={{
          backgroundColor: 'rgba(1,22,39,0.84)',
          boxShadow: 'inset 1px 5px 11px 0 rgba(2,18,27,0.71)'
        }}
      >
        <svg 
          viewBox={`0 0 ${BOARD_SIZE * 20} ${BOARD_SIZE * 20}`}
          className="w-full h-full rounded-lg"
        >
          {/* Food */}
          <circle
            cx={food.x * 20 + 10}
            cy={food.y * 20 + 10}
            r="6"
            fill="#FEA55F"
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
              fill="#43D9AD"
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
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
            <div className="text-center">
              {gameOver && (
                <>
                  <div className="text-2xl font-mono mb-4 font-bold text-white">
                    Game Over!
                  </div>
                  <button
                    onClick={reset}
                    className="px-4 py-2 rounded font-mono text-sm transition-all hover:brightness-110 border border-white text-white bg-transparent"
                  >
                    start-again
                  </button>
                </>
              )}
              
              {won && (
                <>
                  <div className="text-2xl font-mono mb-4 font-bold text-[#43D9AD]">
                    Well done!
                  </div>
                  <button
                    onClick={reset}
                    className="px-4 py-2 rounded font-mono text-sm transition-all hover:brightness-110 border border-white text-white bg-transparent"
                  >
                    play-again
                  </button>
                </>
              )}
              
              {!started && !gameOver && !won && (
                <button
                  onClick={() => setStarted(true)}
                  className="px-6 py-3 rounded font-mono text-lg transition-all hover:brightness-110 bg-[#FEA55F] text-black font-bold"
                >
                  start-game
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Panel */}
      <div className="flex flex-col items-end justify-between">
        <div className="flex flex-col gap-5">
          {/* Controls Section */}
          <div 
            className="flex h-[142px] w-[181.382px] flex-col gap-4 rounded-lg px-3.5 py-4"
            style={{ backgroundColor: 'rgba(1,20,35,0.19)' }}
          >
            <div className="flex flex-col gap-0">
              <p className="text-sm text-white">// use keyboard</p>
              <p className="text-sm text-white">// arrows to play</p>
            </div>
            <div className="flex w-full flex-col items-center gap-1">
              {/* Up Arrow */}
              <svg xmlns="http://www.w3.org/2000/svg" width="51" height="29" viewBox="0 0 51 29" fill="none">
                <rect x="1.46094" y="0.772461" width="48.0787" height="27.6912" rx="7.5" fill="#010C15" stroke="#1E2D3D" />
                <path d="M25.5 11.6182L29.75 17.6182H21.25L25.5 11.6182Z" fill="white" />
              </svg>
              
              {/* Left, Down, Right Arrows */}
              <div className="flex items-center gap-1">
                {/* Left Arrow */}
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" viewBox="0 0 50 30" fill="none">
                  <rect x="49.0786" y="28.9639" width="48.0787" height="27.6912" rx="7.5" transform="rotate(-180 49.0786 28.9639)" fill="#010C15" stroke="#1E2D3D" />
                  <path d="M22.0391 15.1181L28.0391 10.8681L28.0391 19.3682L22.0391 15.1181Z" fill="white" />
                </svg>
                
                {/* Down Arrow */}
                <svg xmlns="http://www.w3.org/2000/svg" width="51" height="30" viewBox="0 0 51 30" fill="none">
                  <rect x="49.5391" y="28.9639" width="48.0787" height="27.6912" rx="7.5" transform="rotate(-180 49.5391 28.9639)" fill="#010C15" stroke="#1E2D3D" />
                  <path d="M25.5 18.1182L21.25 12.1182L29.75 12.1182L25.5 18.1182Z" fill="white" />
                </svg>
                
                {/* Right Arrow */}
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" viewBox="0 0 50 30" fill="none">
                  <rect x="49" y="28.9639" width="48.0787" height="27.6912" rx="7.5" transform="rotate(-180 49 28.9639)" fill="#010C15" stroke="#1E2D3D" />
                  <path d="M27.9604 15.1182L21.9604 19.3682L21.9604 10.8682L27.9604 15.1182Z" fill="white" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Food Left Label */}
          <p className="text-sm text-white">// food left</p>
          
          {/* Food Counter Grid */}
          <div className="grid grid-cols-5 gap-1.5">
            {Array.from({ length: TOTAL_FOOD_TO_WIN }, (_, i) => {
              const isEaten = i < eaten;
              const opacity = isEaten ? 1 : 0.3;
              
              return (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <g style={{ opacity }}>
                    <circle opacity="0.1" cx="10.8456" cy="10.8466" r="10.3456" fill="#43D9AD" />
                    <circle opacity="0.2" cx="10.8456" cy="10.8466" r="7.34558" fill="#43D9AD" />
                    <circle cx="10.8457" cy="10.8467" r="4" fill="#43D9AD" />
                  </g>
                </svg>
              );
            })}
          </div>
        </div>
        
        {/* Skip Button */}
        <div 
          className="flex px-[14px] py-[10px] justify-center items-center gap-[10px] rounded-lg border border-white text-white text-right text-sm font-[450] leading-normal cursor-pointer hover:bg-white/10 transition-all"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('gameSkipped'));
            }
          }}
        >
          skip
        </div>
      </div>
    </div>
  );
}

export default SnakeGame;