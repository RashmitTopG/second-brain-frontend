import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useEffect, useState } from "react";
import "../index.css";
import { SideBar } from "../components/SideBar";
import axios from "axios";
import { BACKEND_URL } from "../config";

function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [contentData, setContentData] = useState<any[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("");

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
    // console.log(element_id);
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
  };

  return (
    <div>
      <SideBar onSelect={setTypeFilter} />

      <div className="p-4 ml-60 min-h-screen bg-slate-100">
        <Modal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            fetchData();
          }}
        />

        <div className="flex justify-end gap-4 pb-5">
          <Button
            onClick={() => setModalOpen(true)}
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />
          <Button
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          />
        </div>

        <div className="columns-3 gap-4 mt-4">
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
