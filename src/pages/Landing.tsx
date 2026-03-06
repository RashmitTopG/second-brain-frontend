import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Youtube } from "../icons/YoutubeIcon";
import { TwitterIcon } from "../icons/TwitterIcon";
import NotionIcon from "../icons/NotionIcon";
import HeroMockup from "../assets/hero-mockup.png";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-soft-purple-gradient text-slate-900 selection:bg-purple-light selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-medium/20 text-purple-dark text-sm font-medium mb-6 border border-purple-medium/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-light opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-dark"></span>
              </span>
              Trusted by 10,000+ knowledge workers
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
              Your Second Brain, <br />
              <span className="text-purple-dark italic">Perfectly Organized.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
              The only tool you need to save, organize, and retrieve your digital life. 
              YouTube videos, Twitter threads, and Notion docs — all in one visual workspace.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <Button
                variant="primary"
                text="Build Your Brain Now"
                onClick={() => navigate("/signup")}
              />
              <Button
                variant="secondary"
                text="Watch it in Action"
                onClick={() => {}}
              />
            </div>
          </div>

          {/* Right Mockup */}
          <div className="flex-1 relative w-full max-w-2xl lg:max-w-none">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-light to-purple-dark rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <img 
                src={HeroMockup} 
                alt="Second Brain Mockup" 
                className="relative rounded-2xl shadow-2xl border border-white/40 glass animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 border-y border-purple-medium/10 bg-white/30 backdrop-blur-sm px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">Seamlessly integrated with</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all cursor-default">
             <div className="flex items-center gap-2 font-bold text-xl"><Youtube /> YouTube</div>
             <div className="flex items-center gap-2 font-bold text-xl"><TwitterIcon /> Twitter</div>
             <div className="flex items-center gap-2 font-bold text-xl">Notion</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">Master Your Digital Chaos</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
              Stop switching tabs. Start building connections between your ideas.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Youtube />}
              title="YouTube for Learners"
              description="Save timestamps, extract insights, and keep educational videos ready for review."
            />
            <FeatureCard 
              icon={<TwitterIcon />}
              title="Twitter for Thinkers"
              description="Never lose a viral thread again. Tag and search your bookmarked wisdom instantly."
            />
            <FeatureCard 
              icon={<NotionIcon />}
              title="Notion for Builders"
              description="Connect your workspaces. Unified search across all your saved Notion blocks."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-purple-dark p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-purple-light/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to upgrade your mind?</h2>
          <p className="text-purple-medium text-xl mb-10 max-w-2xl mx-auto font-light">
            Join thousands of creators, researchers, and students who have already built their second brain.
          </p>
          <div className="inline-flex">
            <Button
              variant="secondary"
              text="Get Started - It's Free"
              onClick={() => navigate("/signup")}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="group bg-white/60 backdrop-blur-md p-10 rounded-[2rem] border border-white/40 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
      <div className="w-16 h-16 bg-purple-medium/20 rounded-2xl flex items-center justify-center mb-8 text-purple-dark group-hover:bg-purple-dark group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 font-light leading-relaxed text-lg">
        {description}
      </p>
    </div>
  );
};

export default Landing;