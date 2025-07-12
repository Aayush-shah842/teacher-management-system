"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts"
import { Users, DollarSign, TrendingUp, BookOpen, Clock, Award } from "lucide-react"

const teacherData = [
  { name: "Jan", teachers: 12, students: 240, revenue: 12000 },
  { name: "Feb", teachers: 15, students: 280, revenue: 14000 },
  { name: "Mar", teachers: 18, students: 320, revenue: 16000 },
  { name: "Apr", teachers: 22, students: 380, revenue: 19000 },
  { name: "May", teachers: 25, students: 420, revenue: 21000 },
  { name: "Jun", teachers: 28, students: 460, revenue: 23000 },
]

const subjectData = [
  { name: "Mathematics", value: 35, color: "#8884d8" },
  { name: "Science", value: 25, color: "#82ca9d" },
  { name: "English", value: 20, color: "#ffc658" },
  { name: "History", value: 15, color: "#ff7300" },
  { name: "Arts", value: 5, color: "#00ff00" },
]

const performanceData = [
  { name: "Week 1", performance: 85, attendance: 92 },
  { name: "Week 2", performance: 88, attendance: 89 },
  { name: "Week 3", performance: 82, attendance: 95 },
  { name: "Week 4", performance: 90, attendance: 87 },
  { name: "Week 5", performance: 87, attendance: 91 },
  { name: "Week 6", performance: 93, attendance: 94 },
]

const stats = [
  {
    title: "Total Teachers",
    value: "28",
    change: "+12%",
    icon: Users,
    description: "Active teachers this month"
  },
  {
    title: "Total Revenue",
    value: "₹2.3L",
    change: "+18%",
    icon: DollarSign,
    description: "Revenue this month"
  },
  {
    title: "Student Growth",
    value: "460",
    change: "+15%",
    icon: TrendingUp,
    description: "Total students enrolled"
  },
  {
    title: "Courses Offered",
    value: "24",
    change: "+8%",
    icon: BookOpen,
    description: "Active courses"
  }
]

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive overview of your teacher management system
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="text-green-600">{stat.change}</span>
                from last month
              </p>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Growth Overview</CardTitle>
                <CardDescription>
                  Monthly growth in teachers, students, and revenue
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={teacherData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="teachers" fill="#8884d8" name="Teachers" />
                    <Bar dataKey="students" fill="#82ca9d" name="Students" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Subject Distribution</CardTitle>
                <CardDescription>
                  Teachers by subject area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={subjectData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {subjectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="teachers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Teacher Growth Trends</CardTitle>
              <CardDescription>
                Monthly teacher recruitment and retention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={teacherData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="teachers" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Teacher performance and student attendance trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="performance" stroke="#8884d8" strokeWidth={2} name="Performance %" />
                  <Line type="monotone" dataKey="attendance" stroke="#82ca9d" strokeWidth={2} name="Attendance %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates and activities in your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New teacher registered", time: "2 hours ago", type: "success" },
              { action: "Payment processed", time: "4 hours ago", type: "info" },
              { action: "Course completed", time: "6 hours ago", type: "success" },
              { action: "System maintenance", time: "1 day ago", type: "warning" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 