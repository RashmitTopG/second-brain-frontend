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
import SearchBar from "../components/SearchBar";

function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [contentData, setContentData] = useState<any[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/content`, {
        withCredentials: true,
      });
      setContentData(res.data.content);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deletePost = async (element_id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        withCredentials: true,
        data: { contentId: element_id },
      });

      fetchData();
      alert("Post Deleted Successfully");
    } catch (error) {
      console.error("Error Occured : ", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredData = contentData.filter((item) => {
    const matchesType = typeFilter ? item.type === typeFilter : true;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesType && matchesSearch;
  });

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

        {/* HEADER */}
        <div className="flex items-center justify-between pb-5 p-4">
          {/* LEFT SECTION */}
          <div className="flex items-center gap-4 flex-1">
            {/* Mobile Menu */}
            <div className="md:hidden" onClick={() => setSidebarOpen(true)}>
              <div className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-4 ml-6">
            <Button
              onClick={() => setModalOpen(true)}
              variant="primary"
              text="Add Content"
              startIcon={<PlusIcon />}
            />
            <Dropdown />
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="px-4 mt-4">
          {filteredData.length === 0 ? (
            <div className="text-center text-gray-500 text-xl mt-10">
              No Data Found
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
              {filteredData.map((element: any) => (
                <div key={element._id} className="break-inside-avoid mb-6 py-1">
                  <Card
                    title={element.title}
                    link={element.link}
                    type={element.type}
                    onDelete={() => deletePost(element._id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default DashBoard;