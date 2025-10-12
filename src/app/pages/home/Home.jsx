import React, { useState, useEffect } from 'react';
import { Config } from '../../constants/Index';

const ModernHome = () => {
  const [activeMetric, setActiveMetric] = useState(0);
  const [codeLineIndex, setCodeLineIndex] = useState(0);

  const metrics = [
    { label: 'Experience', value: '4 Years', color: '#43D9AD' },
    { label: 'Projects Built', value: '15+', color: '#4D5BCE' },
    { label: 'Tech Stack', value: 'MERN', color: '#FEA55F' },
    { label: 'AI Models', value: '10+', color: '#43D9AD' }
  ];

  const techStack = [
    'React.js', 'Next.js', 'Node.js', 'TypeScript',
    'MongoDB', 'Express.js', 'Tailwind CSS', 'React Native'
  ];

  const aiIntegrations = [
    '🤖 GPT-4', '🧠 Claude', '✨ Gemini', 
    '🎨 DALL-E', '🔊 ElevenLabs'
  ];

  const codeSnippets = [
    "const impact = { teachersHelped: 1000+, timeAutomated: '95%' };",
    "await deployAI({ models: ['GPT-4', 'Claude', 'Gemini'] });",
    "const architecture = 'microservices'; // Scalable & Fast",
    "handleConcurrentUsers(8000); // Real-time performance"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
      setCodeLineIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center h-full justify-between gap-[60px] px-[6vw] overflow-hidden">
      {/* Left Section - Info */}
      <div className="flex flex-col gap-[50px] relative z-10 max-w-[600px]">
        {/* Header */}
        <div className="flex flex-col gap-[4px]">
          <span className="text-[18px] text-[#607B96] font-mono">Hi all. I am</span>
          <h1 className="text-[62px] text-[#E5E9F0] font-bold leading-tight">
            Ubaidullah Omer
          </h1>
          <span className="text-[#4D5BCE] text-[32px] font-mono font-semibold">
            &gt; Full Stack MERN Developer
          </span>
          <div className="flex flex-col gap-[6px] mt-[16px]">
            <span className="text-[#607B96] text-[16px] font-mono">
              // 4 years building scalable AI-powered platforms
            </span>
            <span className="text-[#607B96] text-[16px] font-mono">
              // Lead Developer @ Tututor.ai | Serving 20+ schools
            </span>
          </div>
        </div>

        {/* Code Terminal Animation */}
        <div 
          className="rounded-lg p-[20px] backdrop-blur-md relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(23,85,83,0.20) 0%, rgba(67,217,173,0.05) 100%)',
            border: '1px solid rgba(67, 217, 173, 0.2)',
            boxShadow: '0 4px 20px rgba(67, 217, 173, 0.1)'
          }}
        >
          <div className="flex gap-[6px] mb-[12px]">
            <div className="w-[10px] h-[10px] rounded-full bg-[#FF5F56]"></div>
            <div className="w-[10px] h-[10px] rounded-full bg-[#FFBD2E]"></div>
            <div className="w-[10px] h-[10px] rounded-full bg-[#27C93F]"></div>
          </div>
          <div className="font-mono text-[14px] text-[#43D9AD] leading-relaxed">
            <div className="opacity-60">&gt; developer.initialize();</div>
            <div className="mt-[8px] text-[#E5E9F0] transition-all duration-500">
              {codeSnippets[codeLineIndex]}
            </div>
            <div className="mt-[8px] flex items-center gap-[8px]">
              <span className="text-[#43D9AD]">&gt;</span>
              <span className="w-[8px] h-[16px] bg-[#43D9AD] animate-pulse"></span>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-[8px] font-mono">
          <span className="text-[#FFF]">
            <span className="text-[#4D5BCE]">const </span>
            <a
              href={Config.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#43D9AD] hover:underline cursor-pointer transition-all"
            >
              githubProfile
            </a>
            {" = "}
            <span className="text-[#E99287]">"{Config.githubUrl}"</span>
          </span>
          <span className="text-[#FFF]">
            <span className="text-[#4D5BCE]">const </span>
            <a
              href={Config.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-[#43D9AD] hover:underline cursor-pointer transition-all"
            >
              linkedinProfile
            </a>
            {" = "}
            <span className="text-[#E99287]">"{Config.linkedinUrl}"</span>
          </span>
        </div>
      </div>

      {/* Right Section - Interactive Panels */}
      <div className="flex flex-col gap-[24px] max-w-[500px]">
        {/* Live Metrics Dashboard */}
        <div 
          className="rounded-lg p-[24px] backdrop-blur-md"
          style={{
            background: 'linear-gradient(135deg, rgba(23,85,83,0.30) 0%, rgba(67,217,173,0.09) 100%)',
            border: '1px solid rgba(67, 217, 173, 0.3)',
            boxShadow: 'inset 0 2px 0 0 rgba(255,255,255,0.15)'
          }}
        >
          <h3 className="text-[#43D9AD] font-mono text-[14px] mb-[16px]">// live-metrics</h3>
          <div className="grid grid-cols-2 gap-[16px]">
            {metrics.map((metric, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-[16px] transition-all duration-300 cursor-pointer ${
                  activeMetric === idx ? 'scale-105' : 'scale-100 opacity-70'
                }`}
                style={{
                  background: activeMetric === idx 
                    ? 'rgba(1, 22, 39, 0.6)' 
                    : 'rgba(1, 22, 39, 0.3)',
                  border: `1px solid ${activeMetric === idx ? metric.color : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: activeMetric === idx 
                    ? `0 0 20px ${metric.color}40` 
                    : 'none'
                }}
                onMouseEnter={() => setActiveMetric(idx)}
              >
                <div className="text-[#607B96] text-[12px] font-mono mb-[4px]">
                  {metric.label}
                </div>
                <div 
                  className="text-[28px] font-bold"
                  style={{ color: metric.color }}
                >
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div 
          className="rounded-lg p-[24px] backdrop-blur-md"
          style={{
            background: 'rgba(1, 22, 39, 0.6)',
            border: '1px solid rgba(77, 91, 206, 0.3)'
          }}
        >
          <h3 className="text-[#4D5BCE] font-mono text-[14px] mb-[12px]">// tech-stack</h3>
          <div className="flex flex-wrap gap-[8px]">
            {techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-[12px] py-[6px] rounded-full text-[12px] font-mono bg-[#4D5BCE] bg-opacity-20 text-[#4D5BCE] border border-[#4D5BCE] border-opacity-40 hover:bg-opacity-30 transition-all cursor-pointer"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* AI Integrations */}
        <div 
          className="rounded-lg p-[24px] backdrop-blur-md"
          style={{
            background: 'rgba(1, 22, 39, 0.6)',
            border: '1px solid rgba(254, 165, 95, 0.3)'
          }}
        >
          <h3 className="text-[#FEA55F] font-mono text-[14px] mb-[12px]">// ai-integrations</h3>
          <div className="flex flex-wrap gap-[10px]">
            {aiIntegrations.map((ai, idx) => (
              <div
                key={idx}
                className="px-[14px] py-[8px] rounded-lg text-[14px] font-mono bg-[#FEA55F] bg-opacity-10 text-[#FEA55F] border border-[#FEA55F] border-opacity-30 hover:scale-105 transition-all cursor-pointer"
              >
                {ai}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 h-[500px] w-[500px] bg-[#43D9AD] opacity-10 blur-[150px] animate-pulse"></div>
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] bg-[#4D5BCE] opacity-10 blur-[150px] animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default ModernHome;