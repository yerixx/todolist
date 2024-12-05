import React, { useContext } from "react";
import { Inner, TabContainer } from "../style/StyleContainer";
import { TodoContext } from "../Root";
import { motion } from "motion/react";

// import * as frameemotion from "framer-motion";

const TabsMenu = () => {
  const { selectedTab, setSelectedTab } = useContext(TodoContext);

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <Inner>
      <TabContainer>
        <button onClick={() => handleTabClick(0)} className="postBtn">
          해야할 일
        </button>
        <button onClick={() => handleTabClick(1)} className="postBtn">
          완료한 일
        </button>
        <motion.div
          className="underline"
          layoutId="underline"
          style={{
            width: "50%",
            left: selectedTab === 0 ? "0%" : "50%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </TabContainer>
    </Inner>
  );
};

export default TabsMenu;
