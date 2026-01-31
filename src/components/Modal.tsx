
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

export const Modal = ({ open, onClose } : {open : boolean , onClose : ()=>void}) => {


  return (
    <div>
      {open && <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-80 flex justify-center">
        <div className="flex flex-col justify-center">
        <span className="bg-white opacity-100 p-4 rounded">
            <div className="flex justify-end cursor-pointer" onClick={onClose} >
                <CrossIcon />
            </div>
            <div>
                <Input placeholder = {"title"}></Input>
                <Input placeholder = {"link"}></Input>
            </div>
            <span className="flex justify-center text-center"><Button variant="primary" text="Submit"></Button></span>
        </span>
        </div>
        </div>
      }
    </div>
  )
}

