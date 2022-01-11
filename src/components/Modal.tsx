import { AnimatePresence, motion } from "framer-motion";
import React, { FC } from "react";
import { useMatch, useNavigate } from "react-router-dom";

type ModalProps = {
  backAdress: string;
  forwordAdress: string;
  childId: string;
};

const Modal: FC<ModalProps> = ({
  backAdress,
  forwordAdress,
  childId,
  children,
}) => {
  const isModal = useMatch(forwordAdress);
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isModal && (
        <>
          <motion.div
            exit={{ opacity: 0 }}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              const t = event.target as HTMLDivElement;
              if (t.matches(`#${childId}`)) return;
              navigate(backAdress);
            }}
            className="fixed top-0 w-full h-screen bg-gradient-to-b from-slate-600/30 to-slate-200/0"
          />
          {children}
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
