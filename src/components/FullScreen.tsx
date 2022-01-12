import React from "react";

type TypeFullScreenProps = {
  content: string;
};

const FullScreen: React.FC<TypeFullScreenProps> = ({ content }) => {
  return (
    <div className="basicBlackFullScreen">
      <h1 className="w-2/3">{content}</h1>
    </div>
  );
};

export default FullScreen;
