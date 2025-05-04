import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MajorsTab } from "../../../pages/AdmissionMethods/components/MajorsTab";
import { ScholarshipsTab } from "../../../pages/AdmissionMethods/components/ScholarshipsTab";
import { motion } from "framer-motion";
import { School, Award } from "lucide-react";

interface YearContentTabsProps {
  academicYear: string;
  onRefetch: () => Promise<void>;
}

export function YearContentTabs({
  academicYear,
  onRefetch,
}: YearContentTabsProps) {
  // Hiệu ứng animation
  const tabAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Tabs defaultValue="majors" className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-6 bg-gradient-to-r from-orange-100/50 to-amber-100/50 p-1 rounded-xl">
        <TabsTrigger 
          value="majors" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 rounded-lg flex items-center gap-2"
        >
          <School className="h-4 w-4" />
          Ngành tuyển sinh
        </TabsTrigger>
        <TabsTrigger 
          value="scholarships" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 rounded-lg flex items-center gap-2"
        >
          <Award className="h-4 w-4" />
          Học bổng
        </TabsTrigger>
      </TabsList>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={tabAnimation}
      >
        <TabsContent value="majors" className="mt-2">
          <MajorsTab
            academicYear={academicYear}
            onRefetch={onRefetch}
          />
        </TabsContent>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={tabAnimation}
      >
        <TabsContent value="scholarships" className="mt-2">
          <ScholarshipsTab
            academicYear={academicYear}
            onRefetch={onRefetch}
          />
        </TabsContent>
      </motion.div>
    </Tabs>
  );
}
