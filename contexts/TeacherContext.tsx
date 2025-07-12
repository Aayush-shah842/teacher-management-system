"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Teacher } from '@/types'
import { usePayments } from './PaymentContext'

interface TeacherContextType {
  teachers: Teacher[]
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void
  updateTeacher: (id: string, teacher: Partial<Teacher>) => void
  deleteTeacher: (id: string) => void
  getTeacher: (id: string) => Teacher | undefined
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined)

// Initial mock data
const initialTeachers: Teacher[] = [
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
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.r@school.edu",
    phone: "+1 234 567 8903",
    subject: "English Literature",
    experience: 6,
    salary: 58000,
    status: "on-leave",
    joinDate: "2023-08-20",
    department: "Arts",
    qualifications: ["M.A English", "B.Ed"],
    address: {
      street: "789 Pine St",
      city: "Springfield",
      state: "IL",
      zipCode: "62703",
    },
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.w@school.edu",
    phone: "+1 234 567 8904",
    subject: "History",
    experience: 15,
    salary: 78000,
    status: "active",
    joinDate: "2022-03-12",
    department: "Social Studies",
    qualifications: ["M.A History", "Ph.D History"],
    address: {
      street: "321 Elm St",
      city: "Springfield",
      state: "IL",
      zipCode: "62704",
    },
  },
]

export function TeacherProvider({ children }: { children: React.ReactNode }) {
  const [teachers, setTeachers] = useState<Teacher[]>([])

  useEffect(() => {
    // Load teachers from localStorage or use initial data
    const savedTeachers = localStorage.getItem('teachers')
    if (savedTeachers) {
      setTeachers(JSON.parse(savedTeachers))
    } else {
      setTeachers(initialTeachers)
      localStorage.setItem('teachers', JSON.stringify(initialTeachers))
    }
  }, [])

  // Get payment context to update teacher names in payments
  const { updateTeacherNameInPayments } = usePayments()

  const addTeacher = (teacherData: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: Date.now().toString(), // Simple ID generation
    }
    const updatedTeachers = [...teachers, newTeacher]
    setTeachers(updatedTeachers)
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers))
  }

  const updateTeacher = (id: string, teacherData: Partial<Teacher>) => {
    const updatedTeachers = teachers.map(teacher =>
      teacher.id === id ? { ...teacher, ...teacherData } : teacher
    )
    setTeachers(updatedTeachers)
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers))
    
    // Update teacher name in payments if name changed
    if (teacherData.name) {
      updateTeacherNameInPayments(id, teacherData.name)
    }
  }

  const deleteTeacher = (id: string) => {
    const updatedTeachers = teachers.filter(teacher => teacher.id !== id)
    setTeachers(updatedTeachers)
    localStorage.setItem('teachers', JSON.stringify(updatedTeachers))
  }

  const getTeacher = (id: string) => {
    return teachers.find(teacher => teacher.id === id)
  }

  return (
    <TeacherContext.Provider value={{
      teachers,
      addTeacher,
      updateTeacher,
      deleteTeacher,
      getTeacher,
    }}>
      {children}
    </TeacherContext.Provider>
  )
}

export function useTeachers() {
  const context = useContext(TeacherContext)
  if (context === undefined) {
    throw new Error('useTeachers must be used within a TeacherProvider')
  }
  return context
} 