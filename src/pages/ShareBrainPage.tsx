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
    <div>
      <div className="text-purple-dark flex justify-center items-center pt-6 text-4xl">
        {username ? `${username}'s Brain` : "Shared Brain"}
      </div>

      <SideBar onSelect={setTypeFilter} onClose={function (): void {
        throw new Error("Function not implemented.");
      } } />

      <div className="pl-4 ml-60 pt-4">
        {filteredData.length === 0 ? (
          <div className="text-center text-gray-500 text-xl mt-10">
            Cant View This Brain
          </div>
        ) : (
          <div className="columns-3 gap-4 mt-4">
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
