"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  ArrowLeft, 
  Edit, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap,
  Users,
  DollarSign,
  Clock,
  Award
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock teacher data
const mockTeachers = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@school.edu",
    phone: "+1 234 567 8901",
    subject: "Mathematics",
    experience: 8,
    salary: 65000,
    status: "active",
    joinDate: "2024-01-15",
    department: "Science",
    qualifications: ["M.Sc Mathematics", "B.Ed"],
    address: {
      street: "123 Main St",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
    },
    avatar: "/placeholder-user.jpg",
    bio: "Experienced mathematics teacher with a passion for making complex concepts accessible to students. Specializes in algebra and calculus.",
    achievements: [
      "Teacher of the Year 2023",
      "Excellence in Mathematics Education Award",
      "Published 5 research papers"
    ],
    classes: [
      { name: "Advanced Algebra", students: 25, grade: "10th" },
      { name: "Calculus I", students: 20, grade: "11th" },
      { name: "Statistics", students: 30, grade: "12th" }
    ],
    attendance: 95,
    performance: 92
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@school.edu",
    phone: "+1 234 567 8902",
    subject: "Physics",
    experience: 12,
    salary: 72000,
    status: "active",
    joinDate: "2024-01-10",
    department: "Science",
    qualifications: ["Ph.D Physics", "M.Sc Physics"],
    address: {
      street: "456 Oak Ave",
      city: "Springfield",
      state: "IL",
      zipCode: "62702",
    },
    avatar: "/placeholder-user.jpg",
    bio: "Senior physics professor with extensive research experience. Focuses on experimental physics and laboratory work.",
    achievements: [
      "Ph.D in Theoretical Physics",
      "Research Grant Recipient 2022",
      "Science Fair Coordinator"
    ],
    classes: [
      { name: "Physics I", students: 28, grade: "11th" },
      { name: "Physics II", students: 22, grade: "12th" },
      { name: "AP Physics", students: 18, grade: "12th" }
    ],
    attendance: 98,
    performance: 95
  }
]

export default function TeacherDetailPage() {
  const params = useParams()
  const [teacher, setTeacher] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundTeacher = mockTeachers.find(t => t.id === params.id)
      setTeacher(foundTeacher)
      setLoading(false)
    }, 1000)
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!teacher) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/teachers">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teacher Not Found</h1>
            <p className="text-gray-600 mt-1">The teacher you're looking for doesn't exist</p>
          </div>
        </div>
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-600 mb-4">Teacher with ID {params.id} was not found</p>
            <Button asChild>
              <Link href="/teachers">Back to Teachers</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/teachers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900">{teacher.name}</h1>
          <p className="text-gray-600 mt-1">{teacher.subject} • {teacher.department} Department</p>
        </div>
        <Button asChild>
          <Link href={`/teachers/${teacher.id}/edit`}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Teacher
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Teacher Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={teacher.avatar} alt={teacher.name} />
              <AvatarFallback className="text-lg">
                {teacher.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4">{teacher.name}</CardTitle>
            <Badge variant={teacher.status === "active" ? "default" : "secondary"}>
              {teacher.status.replace("-", " ")}
            </Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{teacher.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{teacher.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(teacher.joinDate).toLocaleDateString()}</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Experience:</span>
                <span className="font-medium">{teacher.experience} years</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Salary:</span>
                <span className="font-medium">₹{(teacher.salary * 83).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Attendance:</span>
                <span className="font-medium">{teacher.attendance}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Performance:</span>
                <span className="font-medium">{teacher.performance}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Biography</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{teacher.bio}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Qualifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {teacher.qualifications.map((qual: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        <GraduationCap className="h-3 w-3 mr-1" />
                        {qual}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <Clock className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Attendance Rate</p>
                        <p className="text-2xl font-bold">{teacher.attendance}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 border rounded-lg">
                      <Award className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Performance Score</p>
                        <p className="text-2xl font-bold">{teacher.performance}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="classes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Classes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacher.classes.map((cls: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{cls.name}</h4>
                          <p className="text-sm text-gray-600">Grade {cls.grade}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{cls.students} students</p>
                          <p className="text-sm text-gray-600">Enrolled</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements & Awards</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {teacher.achievements.map((achievement: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <span className="font-medium">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-gray-600">{teacher.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-gray-600">{teacher.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-600" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-gray-600">
                          {teacher.address.street}, {teacher.address.city}, {teacher.address.state} {teacher.address.zipCode}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
} 