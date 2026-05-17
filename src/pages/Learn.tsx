import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MughalCorners } from '../components/ui/MughalCorners';
import { BookOpen, Play, CheckCircle2, ChevronRight, Trophy, Star } from 'lucide-react';
import { Divider } from '../components/ui/Divider';

export const Learn: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
        <div className="max-w-2xl">
          <span className="text-kesar-gold text-[11px] font-bold tracking-[5px] uppercase mb-4 block">Education</span>
          <h1 className="text-5xl md:text-7xl font-display leading-[0.9]">Master the <span className="text-kesar-gold italic">Art.</span></h1>
          <p className="text-sandstone mt-6 leading-relaxed">
            From the basics of Saptak to advanced Raga improvisation. Our structured learning paths are designed for both beginners and seasoned connoisseurs.
          </p>
        </div>
        
        <div className="mughal-card p-8 min-w-[320px] bg-gradient-to-br from-oud-wood to-deep-raat border-kesar-gold/30">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full grad-cta flex items-center justify-center shadow-lg shadow-kesar-gold/20">
                 <Trophy className="text-deep-raat" size={24} />
              </div>
              <div>
                 <p className="text-[10px] text-mitti uppercase font-bold tracking-widest">Current Level</p>
                 <h4 className="text-xl font-display text-ivory">Madhyama Pratham</h4>
              </div>
           </div>
           <div className="space-y-4">
              <div className="flex justify-between text-[11px] uppercase font-bold tracking-widest">
                 <span className="text-mitti">Progress</span>
                 <span className="text-kesar-gold">68%</span>
              </div>
              <div className="h-1.5 bg-rosewood rounded-full overflow-hidden">
                 <div className="h-full grad-cta w-[68%]" />
              </div>
              <p className="text-[11px] text-mitti mt-4 text-center italic">"Next Reward: Virtual Baithak Access"</p>
           </div>
        </div>
      </div>

      {/* Courses Section */}
      <h2 className="text-2xl font-display text-ivory mb-10 flex items-center gap-3">
        < Star className="text-kesar-gold" size={24} /> Recommended for You
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
         <CourseCard 
            onClick={() => navigate('/learn/yaman-foundations')}
            title="The Foundations of Yaman" 
            difficulty="Intermediate" 
            duration="12 Lessons" 
            image="https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&q=80&w=1000"
            progress={45}
         />
         <CourseCard 
            onClick={() => navigate('/learn/sargam-rhythmics')}
            title="Sargam & Rhythmics in Teentaal" 
            difficulty="Beginner" 
            duration="8 Lessons" 
            image="https://images.unsplash.com/photo-1514533212735-5df27d970db0?auto=format&fit=crop&q=80&w=1000"
            progress={100}
         />
      </div>

      <Divider showDiamond={true} />

      {/* Learning Path Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
         <PathCard 
          onClick={() => navigate('/learn/theory')}
          icon={<BookOpen className="text-kesar-gold" />} 
          title="Theoretical Depth" 
          description="Exploring the 72 Melakarta system, Thaats, and historical evolution of ragas." 
         />
         <PathCard 
          onClick={() => navigate('/learn/riyaaz')}
          icon={<Play className="text-morpankh" />} 
          title="Practical Riyaz" 
          description="Guided vocal and instrumental exercises focusing on pitch accuracy and Alankar patterns." 
         />
         <PathCard 
          onClick={() => navigate('/learn/masterclasses')}
          icon={<CheckCircle2 className="text-raga-purple" />} 
          title="Masterclasses" 
          description="Exclusive recordings and breakdowns of performances by contemporary maestros." 
         />
      </div>
    </div>
  );
};

const CourseCard = ({ title, difficulty, duration, image, progress, onClick }: { title: string, difficulty: string, duration: string, image: string, progress: number, onClick?: () => void }) => (
  <div onClick={onClick} className="mughal-card group flex flex-col md:flex-row overflow-hidden hover:border-kesar-gold/50 transition-all cursor-pointer">
     <div className="md:w-1/3 relative h-48 md:h-auto overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-deep-raat/40" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="w-12 h-12 rounded-full border-2 border-ivory flex items-center justify-center text-ivory backdrop-blur-sm">
              <Play fill="currentColor" size={20} />
           </div>
        </div>
     </div>
     <div className="md:w-2/3 p-8 flex flex-col justify-between">
        <div>
           <div className="flex gap-2 mb-4">
              <span className="text-[9px] font-bold uppercase tracking-widest text-kesar-gold bg-kesar-gold/10 px-2 py-0.5 rounded border border-kesar-gold/20">{difficulty}</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-mitti border border-teak-border px-2 py-0.5 rounded">{duration}</span>
           </div>
           <h3 className="text-2xl font-display text-ivory group-hover:text-kesar-gold transition-colors">{title}</h3>
        </div>
        
        <div className="mt-8 space-y-3">
           <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-mitti">
              <span>Your Progress</span>
              <span>{progress}%</span>
           </div>
           <div className="h-1 bg-rosewood rounded-full overflow-hidden">
              <div className="h-full bg-kesar-gold transition-all duration-1000" style={{ width: `${progress}%` }} />
           </div>
           <div className="flex items-center gap-2 text-ivory text-xs font-medium pt-2 group-hover:text-kesar-gold transition-colors">
              Continue Learning <ChevronRight size={14} />
           </div>
        </div>
     </div>
  </div>
);

const PathCard = ({ icon, title, description, onClick }: { icon: React.ReactNode, title: string, description: string, onClick?: () => void }) => (
  <div onClick={onClick} className="mughal-card p-10 group hover:-translate-y-2 transition-all duration-500 cursor-pointer">
    <div className="w-14 h-14 rounded-2xl bg-deep-raat border border-teak-border flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-kesar-gold transition-all duration-500">
      {icon}
    </div>
    <h4 className="text-xl font-display text-ivory mb-4">{title}</h4>
    <p className="text-sandstone text-sm leading-relaxed">{description}</p>
    <div className="mt-8 h-px w-8 bg-teak-border group-hover:w-full group-hover:bg-kesar-gold transition-all duration-700" />
  </div>
);
