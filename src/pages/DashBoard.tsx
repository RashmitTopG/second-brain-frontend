import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { PlusIcon } from "../icons/PlusIcon";
import { useEffect, useState } from "react";
import "../index.css";
import { SideBar } from "../components/SideBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Dropdown from "../components/Dropdown";


function DashBoard() {

  const [modalOpen, setModalOpen] = useState(false);
  const [contentData, setContentData] = useState<any[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sec-brain-token")}`,
        },
      });

      setContentData(res.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = contentData.filter((item) =>
    typeFilter ? item.type === typeFilter : true
  );

  const deletePost = async (element_id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sec-brain-token")}`,
        },
        data: {
          contentId: element_id,
        },
      });
    } catch (error) {
      console.error("Error Occured : ", error);
    }
    fetchData();
    alert("Post Deleted Successfully");
  };

  return (
    <div>
      <SideBar 
        onSelect={setTypeFilter} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="sm:p-4 md:ml-60 ml-0 min-h-screen bg-slate-100 transition-all duration-300">
        <Modal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            fetchData();
          }}
        />

        <div className="flex justify-between md:justify-end gap-4 pb-5 p-4 items-center">
             {/* Mobile Menu Button */}
          <div className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <div className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button
                onClick={() => setModalOpen(true)}
                variant="primary"
                text="Add Content"
                startIcon={<PlusIcon />}
            />
            <Dropdown/>
          </div>
        </div>

        <div className="columns-1 md:columns-3 gap-4 mt-4 px-4">
          {filteredData.map((element: any) => (
            <div key={element._id} className="break-inside-avoid mb-6">
              <Card
                title={element.title}
                link={element.link}
                type={element.type}
                onDelete={() => deletePost(element._id)} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
