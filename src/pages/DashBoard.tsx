import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Modal } from "../components/Modal";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { useState } from "react";
import "../index.css";
import { SideBar } from "../components/SideBar";

function DashBoard() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div>
      <SideBar />
      <div className="p-4 ml-60 min-h-screen bg-slate-100 ">
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} />

        <div>
          <div className="flex justify-end gap-4">
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

          <div className="flex gap-6 mt-4">
            <Card
              title="Dont Matter"
              link="https://www.youtube.com/watch?v=JWA5hJl4Dv0&list=RDJWA5hJl4Dv0&start_radio=1"
              type="youtube"
            />
            <Card
              title="Bc Tweet"
              link="https://x.com/ChelseaFC/status/2016864724126687363"
              type="twitter"
            />
            <Card
              title="Dont Matter"
              link="https://www.youtube.com/watch?v=7sxVHYZ_PnA&list=RD7sxVHYZ_PnA&start_radio=1"
              type="youtube"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
