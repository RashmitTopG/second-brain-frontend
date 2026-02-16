import { useEffect, useState } from "react";
import { SideBar } from "../components/SideBar";
import { useParams } from "react-router-dom";
import useGetSharedBrain from "../hooks/useGetSharedBrain";
import { Card } from "../components/Card";

export default function SharedBrainPage() {
  const { hash } = useParams();

  const [contentData, setContentData] = useState<any[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { getSharedBrain } = useGetSharedBrain();

  console.log("SharedBrainPage mounted");

  useEffect(() => {

    console.log("HASH:", hash);
    if (!hash) return;

    const fetchBrainData = async () => {
      const brain = await getSharedBrain(hash);

      if (brain) {
        setContentData(brain.content);   
        setUsername(brain.entry.userId.username);
      }
    };

    fetchBrainData();
  }, [hash]);

  const filteredData = contentData.filter((x) =>
    typeFilter ? x.type === typeFilter : true
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <SideBar 
        onSelect={setTypeFilter} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)} 
      />

      <div className="md:ml-60 ml-0 transition-all duration-300 p-4">
        <div className="flex justify-between items-center pb-6">
          {/* Mobile Menu Button */}
          <div className="md:hidden cursor-pointer" onClick={() => setSidebarOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </div>

          <div className="flex justify-center text-purple-dark text-2xl md:text-4xl font-bold flex-1 text-center md:text-left">
            {username ? `${username}'s Brain` : "Shared Brain"}
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center text-gray-500 text-xl mt-10">
            Cant View This Brain
          </div>
        ) : (
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4 mt-4">
            {filteredData.map((element: any) => (
              <div key={element._id} className="break-inside-avoid mb-6">
                <Card
                  title={element.title}
                  link={element.link}
                  type={element.type}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
