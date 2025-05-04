import { motion } from "framer-motion";
import {
  TrendingUpIcon,
  BookOpenIcon,
  GraduationCapIcon,
  PercentIcon,
  BarChart3Icon,
  LineChartIcon,
  MessageCircleIcon,
  StarIcon,
  UsersIcon,
  ArrowUpIcon,
  BrainCircuitIcon,
  BuildingIcon
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dữ liệu mẫu cho biểu đồ
const duLieuNganhHoc = [
  { ten: "CNTT", soLuong: 1000 },
  { ten: "QTKD", soLuong: 1200 },
  { ten: "TMĐT", soLuong: 500 },
  { ten: "TTNT", soLuong: 200 },
  { ten: "MKT", soLuong: 1500 },
  { ten: "NNA", soLuong: 1200 },
];

const duLieuChatbot = [
  { thang: "T1", soLuong: 8000 },
  { thang: "T2", soLuong: 10000 },
  { thang: "T3", soLuong: 12000 },
  { thang: "T4", soLuong: 9000 },
  { thang: "T5", soLuong: 6000 },
  { thang: "T6", soLuong: 8000 },
];

const danhGiaNguoiDung = [
  {
    id: 1,
    ten: "Nguyễn Văn An",
    avatar: "/placeholder.svg?height=40&width=40",
    danhGia: 5,
    binhLuan: "Tính năng tư vấn tuyển sinh rất hữu ích và dễ sử dụng!",
  },
  {
    id: 2,
    ten: "Trần Thị Bình",
    avatar: "/placeholder.svg?height=40&width=40",
    danhGia: 4,
    binhLuan:
      "Ứng dụng tốt nhìn chung, nhưng cần cải thiện tốc độ phản hồi.",
  },
  {
    id: 3,
    ten: "Lê Hoàng Cường",
    avatar: "/placeholder.svg?height=40&width=40",
    danhGia: 5,
    binhLuan:
      "Đội ngũ hỗ trợ rất nhiệt tình, giải quyết vấn đề của tôi nhanh chóng.",
  },
];

const duLieuKTX = [
  { khu: "Khu A", daThue: 10, conTrong: 25 },
  { khu: "Khu B", daThue: 12, conTrong: 18 },
  { khu: "Khu C", daThue: 15, conTrong: 10 },
];

// Hiệu ứng animation cho các thành phần
const containerAnimation = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 300 } }
};

const cardHoverAnimation = {
  rest: { scale: 1, transition: { duration: 0.2 } },
  hover: { scale: 1.02, transition: { duration: 0.2 } }
};

export function Dashboard() {
  return (
    <motion.div 
      className="gap-4 px-4 lg:px-6 mt-4 space-y-6"
      initial="hidden"
      animate="show"
      variants={containerAnimation}
    >
      <motion.div 
        className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        variants={containerAnimation}
      >
        <motion.div variants={itemAnimation}>
          <motion.div 
            className="h-full"
            initial="rest"
            whileHover="hover"
            variants={cardHoverAnimation}
          >
            <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100 h-full shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="relative">
                <CardDescription className="text-gray-600 flex items-center gap-2">
                  <GraduationCapIcon className="h-4 w-4 text-orange-500" />
                  Tổng chỉ tiêu tuyển sinh
                </CardDescription>
                <CardTitle className="text-3xl font-semibold tabular-nums text-gray-800">
                  12.000
                </CardTitle>
                <div className="absolute right-4 top-4">
                  <Badge
                    variant="outline"
                    className="flex gap-1 rounded-lg text-xs bg-gradient-to-r from-orange-400 to-amber-500 text-white border-none"
                  >
                    <ArrowUpIcon className="h-3 w-3" />
                    +7.5%
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm pb-4">
                <div className="line-clamp-1 flex gap-2 font-medium text-orange-600">
                  Tăng chỉ tiêu so với năm trước
                  <TrendingUpIcon className="h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemAnimation}>
          <motion.div 
            className="h-full"
            initial="rest"
            whileHover="hover"
            variants={cardHoverAnimation}
          >
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100 h-full shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="relative">
                <CardDescription className="text-gray-600 flex items-center gap-2">
                  <BookOpenIcon className="h-4 w-4 text-blue-500" />
                  Tổng số ngành học
                </CardDescription>
                <CardTitle className="text-3xl font-semibold tabular-nums text-gray-800">
                  24
                </CardTitle>
                <div className="absolute right-4 top-4">
                  <Badge
                    variant="outline"
                    className="flex gap-1 rounded-lg text-xs bg-gradient-to-r from-blue-400 to-indigo-500 text-white border-none"
                  >
                    <ArrowUpIcon className="h-3 w-3" />
                    +20%
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm pb-4">
                <div className="line-clamp-1 flex gap-2 font-medium text-blue-600">
                  Tăng ngành học so với năm trước
                  <TrendingUpIcon className="h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemAnimation}>
          <motion.div 
            className="h-full"
            initial="rest"
            whileHover="hover"
            variants={cardHoverAnimation}
          >
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100 h-full shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="relative">
                <CardDescription className="text-gray-600 flex items-center gap-2">
                  <UsersIcon className="h-4 w-4 text-green-500" />
                  Tổng số sinh viên
                </CardDescription>
                <CardTitle className="text-3xl font-semibold tabular-nums text-gray-800">
                  45.678
                </CardTitle>
                <div className="absolute right-4 top-4">
                  <Badge
                    variant="outline"
                    className="flex gap-1 rounded-lg text-xs bg-gradient-to-r from-green-400 to-emerald-500 text-white border-none"
                  >
                    <ArrowUpIcon className="h-3 w-3" />
                    +12.5%
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm pb-4">
                <div className="line-clamp-1 flex gap-2 font-medium text-green-600">
                  Tăng sinh viên so với năm trước
                  <TrendingUpIcon className="h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemAnimation}>
          <motion.div 
            className="h-full"
            initial="rest"
            whileHover="hover"
            variants={cardHoverAnimation}
          >
            <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-100 h-full shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="relative">
                <CardDescription className="text-gray-600 flex items-center gap-2">
                  <PercentIcon className="h-4 w-4 text-purple-500" />
                  Tỷ lệ tuyển sinh
                </CardDescription>
                <CardTitle className="text-3xl font-semibold tabular-nums text-gray-800">
                  4.5%
                </CardTitle>
                <div className="absolute right-4 top-4">
                  <Badge
                    variant="outline"
                    className="flex gap-1 rounded-lg text-xs bg-gradient-to-r from-purple-400 to-violet-500 text-white border-none"
                  >
                    <ArrowUpIcon className="h-3 w-3" />
                    +4.5%
                  </Badge>
                </div>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1 text-sm pb-4">
                <div className="line-clamp-1 flex gap-2 font-medium text-purple-600">
                  Tăng chậm so với năm trước
                  <TrendingUpIcon className="h-4 w-4" />
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Biểu đồ */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerAnimation}
      >
        {/* Biểu đồ số lượng sinh viên theo ngành */}
        <motion.div variants={itemAnimation}>
          <motion.div
            initial="rest"
            whileHover="hover"
            variants={cardHoverAnimation}
          >
            <Card className="flex flex-col h-[320px] min-w-0 shadow-md hover:shadow-lg transition-shadow duration-300 border-orange-100">
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <BarChart3Icon className="h-5 w-5 text-orange-500" />
                  Số lượng sinh viên theo ngành
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1">
                <div className="h-full w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={duLieuNganhHoc}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="ten" axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        content={({ active, payload }) =>
                          active && payload && payload.length > 0 ? (
                            <div className="bg-white p-2 border rounded shadow-sm">
                              <p className="text-xs font-medium">{payload[0]?.payload?.ten || ''}</p>
                              <p className="text-xs">{`${(payload[0]?.value || 0).toLocaleString('vi-VN')} sinh viên`}</p>
                            </div>
                          ) : null
                        }
                      />
                      <Bar dataKey="soLuong" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Biểu đồ số lượng sử dụng Chatbot */}
        <motion.div variants={itemAnimation}>
          <motion.div
            initial="rest"
            whileHover="hover"
            variants={cardHoverAnimation}
          >
            <Card className="flex flex-col h-[320px] shadow-md hover:shadow-lg transition-shadow duration-300 border-blue-100">
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <LineChartIcon className="h-5 w-5 text-blue-500" />
                  Lượt sử dụng Chatbot theo tháng
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1">
                <div className="h-[220px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart
                      data={duLieuChatbot}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="thang" axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        content={({ active, payload }) =>
                          active && payload && payload.length > 0 ? (
                            <div className="bg-white p-2 border rounded shadow-sm">
                              <p className="text-xs font-medium">Tháng {payload[0]?.payload?.thang?.replace('T', '') || ''}</p>
                              <p className="text-xs">{`${(payload[0]?.value || 0).toLocaleString('vi-VN')} lượt truy cập`}</p>
                            </div>
                          ) : null
                        }
                      />
                      <Line
                        type="monotone"
                        dataKey="soLuong"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={{
                          r: 4,
                          fill: "white",
                          stroke: "#3B82F6",
                          strokeWidth: 2,
                        }}
                        activeDot={{ r: 6 }}
                      />
                      <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Legend />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Biểu đồ ký túc xá */}
        <motion.div variants={itemAnimation}>
          <motion.div
            initial="rest"
            whileHover="hover"
            variants={cardHoverAnimation}
          >
            <Card className="flex flex-col h-[320px] shadow-md hover:shadow-lg transition-shadow duration-300 border-green-100">
              <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <BuildingIcon className="h-5 w-5 text-green-500" />
                  Tình trạng ký túc xá
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 flex-1">
                <div className="text-xs mb-2">
                  <div className="flex items-center justify-between">
                    <p>Tổng số phòng: 80</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span>Đã thuê</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                        <span>Còn trống</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={duLieuKTX}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="khu" axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip
                        content={({ active, payload }) =>
                          active && payload?.length ? (
                            <div className="bg-white p-2 border rounded shadow-sm">
                              <p className="text-xs font-medium">{payload[0].payload.khu}</p>
                              <p className="text-xs">{`Đã thuê: ${payload[0].value} phòng`}</p>
                              <p className="text-xs">{`Còn trống: ${payload[1].value} phòng`}</p>
                            </div>
                          ) : null
                        }
                      />
                      <Bar dataKey="daThue" fill="#10B981" radius={[4, 4, 0, 0]} name="Đã thuê" />
                      <Bar
                        dataKey="conTrong"
                        fill="#F59E0B"
                        radius={[4, 4, 0, 0]}
                        name="Còn trống"
                      />
                      <Legend />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
      {/* Phản hồi người dùng */}
      <motion.div 
        className="space-y-6 mt-4"
        variants={containerAnimation}
      >
        <motion.div variants={itemAnimation}>
          <motion.div
            initial="rest"
            whileHover="hover"
            variants={cardHoverAnimation}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-purple-100 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50">
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuitIcon className="h-5 w-5 text-purple-500" />
                  Mức độ hài lòng của người dùng
                </CardTitle>
                <CardDescription>Đánh giá trung bình: 4.5/5</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold text-purple-600">90%</div>
                    <p className="text-sm text-muted-foreground">
                      Người dùng sẵn sàng giới thiệu ứng dụng
                    </p>
                  </div>
                  <div className="h-24 w-24 rounded-full bg-gradient-to-r from-purple-400 to-violet-500 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full bg-white flex items-center justify-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-violet-600 text-transparent bg-clip-text">4.5</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div variants={itemAnimation}>
          <motion.div
            initial="rest"
            whileHover="hover"
            variants={cardHoverAnimation}
          >
            <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircleIcon className="h-5 w-5 text-blue-500" />
                  Phản hồi gần đây
                </CardTitle>
                <CardDescription>Bình luận mới nhất từ người dùng</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {danhGiaNguoiDung.map((feedback) => (
                    <div key={feedback.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                      <Avatar>
                        <AvatarImage src={feedback.avatar} alt={feedback.ten} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {feedback.ten
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 flex-1">
                        <h4 className="font-semibold text-gray-800">{feedback.ten}</h4>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`h-4 w-4 ${
                                i < feedback.danhGia
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          {feedback.binhLuan}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
export default Dashboard;
