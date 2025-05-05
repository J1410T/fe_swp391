import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  dashboardApi,
  OverallStats,
  UserStats,
  PlatformStats,
  AcademicYearStats,
  SessionDateStats,
} from "@/api/resources/dashboard";
import { Badge } from "@/components/ui/badge";
import {
  BookOpenIcon,
  BuildingIcon,
  GraduationCapIcon,
  TrendingUpIcon,
  UsersIcon,
  BarChart3Icon,
  PieChartIcon,
  LineChartIcon,
} from "lucide-react";

export function Dashboard() {
  const [overallStats, setOverallStats] = useState<OverallStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [platformStats, setPlatformStats] = useState<PlatformStats[] | null>(
    null
  );
  const [academicYearStats, setAcademicYearStats] = useState<
    AcademicYearStats[] | null
  >(null);
  const [sessionStats, setSessionStats] = useState<SessionDateStats[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all dashboard data in parallel
        const [
          overallStatsResponse,
          userStatsResponse,
          platformStatsResponse,
          academicYearStatsResponse,
          sessionStatsResponse,
        ] = await Promise.all([
          dashboardApi.getOverallStats(),
          dashboardApi.getUserStats(),
          dashboardApi.getPlatformStats(),
          dashboardApi.getAcademicYearStats(),
          dashboardApi.getSessionStats(),
        ]);

        setOverallStats(overallStatsResponse.data);
        setUserStats(userStatsResponse.data);
        setPlatformStats(platformStatsResponse.data);
        setAcademicYearStats(academicYearStatsResponse.data);
        setSessionStats(sessionStatsResponse.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Không thể tải dữ liệu dashboard. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Colors for charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Overall Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {overallStats && (
          <>
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-600 flex items-center gap-2">
                  <BookOpenIcon className="h-4 w-4 text-blue-500" />
                  Tổng số ngành học
                </CardDescription>
                <CardTitle className="text-3xl font-semibold text-gray-800">
                  {overallStats.total_majors}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-blue-600 flex items-center gap-1">
                  <TrendingUpIcon className="h-4 w-4" />
                  Ngành học đang hoạt động
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-600 flex items-center gap-2">
                  <BuildingIcon className="h-4 w-4 text-green-500" />
                  Tổng số cơ sở
                </CardDescription>
                <CardTitle className="text-3xl font-semibold text-gray-800">
                  {overallStats.total_campuses}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <TrendingUpIcon className="h-4 w-4" />
                  Cơ sở đang hoạt động
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-100">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-600 flex items-center gap-2">
                  <GraduationCapIcon className="h-4 w-4 text-purple-500" />
                  Tổng số phương thức xét tuyển
                </CardDescription>
                <CardTitle className="text-3xl font-semibold text-gray-800">
                  {overallStats.total_admission_methods}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-purple-600 flex items-center gap-1">
                  <TrendingUpIcon className="h-4 w-4" />
                  Phương thức đang áp dụng
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-100">
              <CardHeader className="pb-2">
                <CardDescription className="text-gray-600 flex items-center gap-2">
                  <UsersIcon className="h-4 w-4 text-orange-500" />
                  Tổng số người dùng
                </CardDescription>
                <CardTitle className="text-3xl font-semibold text-gray-800">
                  {overallStats.total_users}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-orange-600 flex items-center gap-1">
                  <TrendingUpIcon className="h-4 w-4" />
                  Người dùng hệ thống
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* User Stats */}
      {userStats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                <UsersIcon className="h-5 w-5 text-blue-500" />
                Thống kê người dùng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Admin", value: userStats.admin_count },
                        { name: "Staff", value: userStats.staff_count },
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {[
                        { name: "Admin", value: userStats.admin_count },
                        { name: "Staff", value: userStats.staff_count },
                      ].map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">
                    Người dùng hoạt động
                  </div>
                  <div className="text-2xl font-semibold">
                    {userStats.active_users}
                  </div>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <div className="text-sm text-gray-600">
                    Người dùng không hoạt động
                  </div>
                  <div className="text-2xl font-semibold">
                    {userStats.inactive_users}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Stats */}
          {platformStats && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <PieChartIcon className="h-5 w-5 text-purple-500" />
                  Thống kê theo nền tảng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformStats}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="session_count"
                        nameKey="platform"
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {platformStats.map((_, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, _, props) => [
                          value,
                          props.payload.platform,
                        ]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Phân bố phiên theo nền tảng
                  </div>
                  <div className="space-y-2">
                    {platformStats.map((platform, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          ></div>
                          <span className="capitalize">
                            {platform.platform}
                          </span>
                        </div>
                        <Badge variant="outline">
                          {platform.percentage.toFixed(1)}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Academic Year Stats */}
      {academicYearStats && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <BarChart3Icon className="h-5 w-5 text-green-500" />
              Thống kê theo năm học
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={academicYearStats}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="major_count"
                    name="Số ngành học"
                    fill="#8884d8"
                  />
                  <Bar
                    dataKey="admission_count"
                    name="Số phương thức xét tuyển"
                    fill="#82ca9d"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Session Stats */}
      {sessionStats && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <LineChartIcon className="h-5 w-5 text-blue-500" />
              Thống kê phiên theo ngày
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={sessionStats}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={formatDate} />
                  <YAxis />
                  <Tooltip labelFormatter={formatDate} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Số phiên"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Dashboard;
