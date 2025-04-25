import { TrendingUpIcon } from "lucide-react";

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
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

// Sample data for charts
const revenueData = [
  { name: "SE", value: 1000 },
  { name: "GD", value: 1200 },
  { name: "IB", value: 500 },
  { name: "AI", value: 200 },
  { name: "MKT", value: 1500 },
  { name: "L", value: 1200 },
];

const guestsData = [
  { name: "Jan", value: 8000 },
  { name: "Feb", value: 10000 },
  { name: "Mar", value: 12000 },
  { name: "April", value: 9000 },
  { name: "May", value: 6000 },
  { name: "June", value: 8000 },
];

const feedbacks = [
  {
    id: 1,
    user: "Alice Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment: "Love the new dashboard feature! It's so intuitive and helpful.",
  },
  {
    id: 2,
    user: "Bob Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    comment:
      "Great app overall, but could use some improvements in loading speed.",
  },
  {
    id: 3,
    user: "Carol Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    comment:
      "The customer support is top-notch. They resolved my issue quickly.",
  },
];

const roomsData = [
  { name: "Khu A", booked: 10, available: 25 },
  { name: "Khu B", booked: 12, available: 18 },
];

export function Dashboard() {
  return (
    <div className="gap-4 px-4 lg:px-6 *:data-[slot=card]:shadow-xs *:data-[slot=card]:bg-gradient-to-t mt-4">
      <div className=" gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ">
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Tổng chỉ tiêu tuyển sinh</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              12.000
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs"
              >
                <TrendingUpIcon className="size-3" />
                +7.5%
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Tăng chỉ tiêu <TrendingUpIcon className="size-4" />
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Tổng số ngành học</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              24
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs"
              >
                <TrendingUpIcon className="size-3" />
                +20%
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Tăng ngành học so với năm ngoái{" "}
              <TrendingUpIcon className="size-4" />
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Tổng số sinh viên</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              45,678
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs"
              >
                <TrendingUpIcon className="size-3" />
                +12.5%
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Tăng sinh viên so với năm ngoái{" "}
              <TrendingUpIcon className="size-4" />
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription> Tỷ lệ tuyển sinh</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              4.5%
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge
                variant="outline"
                className="flex gap-1 rounded-lg text-xs"
              >
                <TrendingUpIcon className="size-3" />
                +4.5%
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Tăng chậm <TrendingUpIcon className="size-4" />
            </div>
          </CardFooter>
        </Card>
      </div>
      {/* Charts */}
      {/* Card Revenue */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Card className="flex flex-col h-[320px] min-w-0">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-base font-medium">
              Số lượng sinh viên theo ngành
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex-1">
            <div className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={revenueData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.length ? (
                        <div className="bg-white p-2 border rounded shadow-sm">
                          <p className="text-xs">{`${payload[0].value} K`}</p>
                        </div>
                      ) : null
                    }
                  />
                  <Bar dataKey="value" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Card Guests */}
        <Card className="flex flex-col h-[320px]">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-base font-medium">
              Số lượng sử dụng Chatbot/tháng
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex-1">
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={guestsData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.length ? (
                        <div className="bg-white p-2 border rounded shadow-sm">
                          <p className="text-xs">{`${payload[0].value}`}</p>
                        </div>
                      ) : null
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fill: "white",
                      stroke: "#3B82F6",
                      strokeWidth: 2,
                    }}
                    activeDot={{ r: 6 }}
                    fill="url(#colorUv)"
                  />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Card Rooms */}
        <Card className="flex flex-col h-[320px]">
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <CardTitle className="text-base font-medium">Ký túc xá</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 flex-1">
            <div className="text-xs mb-2">
              <div className="flex items-center justify-between">
                <p>Total 50 Rooms</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span>
                    <span>Booked</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                    <span>Available</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={roomsData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.length ? (
                        <div className="bg-white p-2 border rounded shadow-sm">
                          <p className="text-xs">{`Booked: ${payload[0].value}`}</p>
                          <p className="text-xs">{`Available: ${payload[1].value}`}</p>
                        </div>
                      ) : null
                    }
                  />
                  <Bar dataKey="booked" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar
                    dataKey="available"
                    fill="#F59E0B"
                    radius={[4, 4, 0, 0]}
                  />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Card Chatbot */}
      <div className="space-y-4 mt-4">
        <Card>
          <CardHeader>
            <CardTitle>User Satisfaction</CardTitle>
            <CardDescription>Overall rating: 4.5/5</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">90%</div>
            <p className="text-sm text-muted-foreground">
              Users who would recommend our app
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Latest user comments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={feedback.avatar} alt={feedback.user} />
                    <AvatarFallback>
                      {feedback.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="font-semibold">{feedback.user}</h4>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          className={`h-4 w-4 ${
                            i < feedback.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feedback.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default Dashboard;
