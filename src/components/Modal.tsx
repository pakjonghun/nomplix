import { motion } from "framer-motion";
import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";

type ModalProps = {
  backAdress: string;
  childId: string;
};

const Modal: FC<ModalProps> = ({ backAdress, childId, children }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <>
      {!!id && (
        <>
          <motion.div
            exit={{ opacity: 0 }}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              const t = event.target as HTMLDivElement;
              if (t.matches(`#${childId}`)) return;
              navigate(backAdress);
            }}
            className="fixed top-0 w-full h-screen bg-gradient-to-b from-slate-600/50 to-slate-200/0"
          />
          {children}
        </>
      )}
    </>
  );
};

export default Modal;
