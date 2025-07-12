export interface Teacher {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  experience: number
  salary: number
  status: "active" | "inactive" | "on-leave"
  joinDate: string
  avatar?: string
  department: string
  qualifications: string[]
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
}

export interface Payment {
  id: string
  teacherId: string
  teacherName: string
  amount: number
  date: string
  status: "paid" | "pending" | "overdue"
  type: "salary" | "bonus" | "allowance"
  description?: string
}

export interface DashboardStats {
  totalTeachers: number
  activeTeachers: number
  totalPayments: number
  pendingPayments: number
  monthlyExpense: number
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "manager"
  avatar?: string
}
