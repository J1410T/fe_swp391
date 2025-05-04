import { useState } from "react";
import { useMajors } from "./useMajors";

type ActiveTab = "majors" | "admissionMethods";

export function useMajorsConfig() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("majors");
  
  // Lấy các chức năng từ hook useMajors hiện có
  const majorsHook = useMajors();
  
  // Hàm chuyển đổi tab
  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
  };
  
  return {
    ...majorsHook,
    activeTab,
    handleTabChange,
    setSelectedMajor: majorsHook.setSelectedMajor,
  };
}
