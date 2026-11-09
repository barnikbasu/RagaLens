import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, List, Settings, Maximize2, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { audioEngine } from '../lib/audioEngine';

export const CoursePlayer: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(4);

  const tracks = [
    { number: 1, title: 'Introduction to Kalyan Thaat', duration: '12:40', completed: true },
    { number: 2, title: 'Grammar and Structure of Yaman', duration: '18:15', completed: true },
    { number: 3, title: 'The Tivra Madhyam in Yaman', duration: '24:10', completed: true },
    { number: 4, title: 'The Intricacies of Rishabh', duration: '22:30', active: true },
    { number: 5, title: 'Descending Patterns (Avaroha Taan)', duration: '30:05' },
    { number: 6, title: 'Meend and Microtonal Oscillations', duration: '26:45' },
    { number: 7, title: 'Tihais in Vilambit Teentaal', duration: '15:20' }
  ];

  const togglePlay = () => {
    if (isPlaying) {
      audioEngine.stopTanpura();
      setIsPlaying(false);
    } else {
      audioEngine.startTanpura('Pa', 138.59);
      setIsPlaying(true);
    }
  };

  return (
    <div className="pt-8 pb-24 px-6 min-h-screen bg-[#F5F2EC] dark:bg-[#171716] text-[#252421] dark:text-[#F2EEE7] transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <button
          onClick={() => navigate('/learn')}
          className="flex items-center gap-2 text-xs font-semibold text-[#77736D] hover:text-[#252421] dark:hover:text-[#F2EEE7] uppercase tracking-wider"
        >
          <ArrowLeft size={14} />
          <span>Back to Learning Studio</span>
        </button>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Left: Video & Audio Lesson Workspace */}
          <div className="lg:w-2/3 space-y-6">
            
            {/* Visual Canvas Player Area */}
            <div className="aspect-video bg-[#22211F] rounded-lg border border-[#DCD6CC] dark:border-[#2E2D2A] relative flex items-center justify-center overflow-hidden shadow-lg group">
              <div className="absolute inset-0 bg-cover bg-center opacity-30 grayscale" style={{ backgroundImage: "url('/public/assets/aistudio/image_91622b1d.png')" }} />
              
              <button
                onClick={togglePlay}
                className="relative z-10 w-20 h-20 rounded-full border border-white/40 bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:scale-105 hover:bg-[#A9232D] hover:border-[#A9232D] transition-all cursor-pointer"
              >
                {isPlaying ? <Pause size={30} /> : <Play fill="currentColor" size={30} className="ml-1" />}
              </button>

              {/* Media Controls Bar */}
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay} className="hover:text-[#A9232D] transition-colors">
                    {isPlaying ? <Pause size={18} /> : <Play size={18} fill="currentColor" />}
                  </button>
                  <span className="font-mono text-[11px] text-[#DCD6CC]">
                    {isPlaying ? '04:12' : '00:00'} / 22:30
                  </span>
                </div>

                <div className="flex-1 max-w-md mx-6 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className={`h-full bg-[#A9232D] ${isPlaying ? 'w-1/4' : 'w-0'}`} />
                </div>

                <div className="flex items-center gap-3 text-[#DCD6CC]">
                  <Settings size={16} className="hover:text-white cursor-pointer" />
                  <Maximize2 size={16} className="hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Lesson Details */}
            <div className="p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#A9232D] font-bold">
                    LESSON 4 OF 12 · MADHYAMA LEVEL
                  </span>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#252421] dark:text-[#F2EEE7] mt-0.5">
                    The Intricacies of Rishabh in Yaman
                  </h1>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1.5 rounded border border-[#DCD6CC] dark:border-[#2E2D2A] text-xs font-semibold hover:border-[#252421]">
                    Resources
                  </button>
                  <button className="px-3 py-1.5 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold hover:bg-[#A9232D]">
                    Discussion
                  </button>
                </div>
              </div>

              <p className="text-xs md:text-sm text-[#77736D] leading-relaxed">
                In this masterclass, the guru explains the specific treatment of Rishabh (Re) in Raga Yaman. While Rishabh is prominent in descent (Avarohana), it is deliberately approached through Nishad in the ascent (Ṇ R G) rather than starting directly on Shadja (Sa), maintaining the tranquil, devotional twilight character of Kalyan.
              </p>
            </div>
          </div>

          {/* Right: Curriculum Playlist */}
          <div className="lg:w-1/3 p-6 rounded-lg bg-white dark:bg-[#22211F] border border-[#DCD6CC] dark:border-[#2E2D2A] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCD6CC] dark:border-[#2E2D2A]">
              <div className="flex items-center gap-2">
                <List size={16} className="text-[#A9232D]" />
                <h3 className="text-base font-bold text-[#252421] dark:text-[#F2EEE7]">Course Modules</h3>
              </div>
              <span className="text-[11px] font-mono text-[#77736D]">12 Lessons</span>
            </div>

            <div className="space-y-2">
              {tracks.map((track) => (
                <div
                  key={track.number}
                  onClick={() => setActiveTrack(track.number)}
                  className={`p-3 rounded border text-xs cursor-pointer transition-colors flex items-center justify-between ${
                    track.number === activeTrack
                      ? 'bg-[#EAE5DC] dark:bg-[#171716] border-[#A9232D] ring-1 ring-[#A9232D]'
                      : 'bg-[#F5F2EC] dark:bg-[#1C1B19] border-[#DCD6CC] dark:border-[#2E2D2A] hover:border-[#77736D]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      track.completed ? 'bg-green-700 text-white' : 'bg-[#DCD6CC] dark:bg-[#2E2D2A] text-[#252421] dark:text-[#F2EEE7]'
                    }`}>
                      {track.completed ? <Check size={10} /> : track.number}
                    </span>
                    <div>
                      <h5 className="font-semibold text-[#252421] dark:text-[#F2EEE7]">{track.title}</h5>
                      <span className="text-[10px] font-mono text-[#77736D]">{track.duration}</span>
                    </div>
                  </div>

                  {track.number === activeTrack && (
                    <Play size={12} fill="currentColor" className="text-[#A9232D]" />
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTrack(prev => (prev < 7 ? prev + 1 : 1))}
              className="w-full mt-4 py-3 rounded bg-[#252421] dark:bg-[#F2EEE7] text-[#F5F2EC] dark:text-[#171716] text-xs font-semibold hover:bg-[#A9232D] dark:hover:bg-[#A9232D] dark:hover:text-white transition-colors"
            >
              Next Lesson →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
