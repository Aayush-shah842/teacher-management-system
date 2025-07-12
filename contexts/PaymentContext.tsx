"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Payment } from '@/types'

interface PaymentContextType {
  payments: Payment[]
  addPayment: (payment: Omit<Payment, 'id'>) => void
  updatePayment: (id: string, payment: Partial<Payment>) => void
  deletePayment: (id: string) => void
  getPayment: (id: string) => Payment | undefined
  getPaymentsByTeacher: (teacherId: string) => Payment[]
  updateTeacherNameInPayments: (teacherId: string, newName: string) => void
  deletePaymentsByTeacher: (teacherId: string) => void
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined)

// Initial mock data
const initialPayments: Payment[] = [
  {
    id: "1",
    teacherId: "1",
    teacherName: "Sarah Johnson",
    amount: 5416.67,
    date: "2024-01-31",
    status: "paid",
    type: "salary",
    description: "January 2024 Salary",
  },
  {
    id: "2",
    teacherId: "2",
    teacherName: "Michael Chen",
    amount: 6000.0,
    date: "2024-01-31",
    status: "paid",
    type: "salary",
    description: "January 2024 Salary",
  },
  {
    id: "3",
    teacherId: "3",
    teacherName: "Emily Rodriguez",
    amount: 4833.33,
    date: "2024-02-15",
    status: "pending",
    type: "salary",
    description: "February 2024 Salary",
  },
  {
    id: "4",
    teacherId: "1",
    teacherName: "Sarah Johnson",
    amount: 1000.0,
    date: "2024-02-10",
    status: "overdue",
    type: "bonus",
    description: "Performance Bonus Q1",
  },
]

export function PaymentProvider({ children }: { children: React.ReactNode }) {
  const [payments, setPayments] = useState<Payment[]>([])

  useEffect(() => {
    // Load payments from localStorage or use initial data
    const savedPayments = localStorage.getItem('payments')
    if (savedPayments) {
      setPayments(JSON.parse(savedPayments))
    } else {
      setPayments(initialPayments)
      localStorage.setItem('payments', JSON.stringify(initialPayments))
    }
  }, [])

  const addPayment = (paymentData: Omit<Payment, 'id'>) => {
    const newPayment: Payment = {
      ...paymentData,
      id: Date.now().toString(), // Simple ID generation
    }
    const updatedPayments = [...payments, newPayment]
    setPayments(updatedPayments)
    localStorage.setItem('payments', JSON.stringify(updatedPayments))
  }

  const updatePayment = (id: string, paymentData: Partial<Payment>) => {
    const updatedPayments = payments.map(payment =>
      payment.id === id ? { ...payment, ...paymentData } : payment
    )
    setPayments(updatedPayments)
    localStorage.setItem('payments', JSON.stringify(updatedPayments))
  }

  // Update teacher names in payments when teacher name changes
  const updateTeacherNameInPayments = (teacherId: string, newName: string) => {
    const updatedPayments = payments.map(payment =>
      payment.teacherId === teacherId ? { ...payment, teacherName: newName } : payment
    )
    setPayments(updatedPayments)
    localStorage.setItem('payments', JSON.stringify(updatedPayments))
  }

  const deletePayment = (id: string) => {
    const updatedPayments = payments.filter(payment => payment.id !== id)
    setPayments(updatedPayments)
    localStorage.setItem('payments', JSON.stringify(updatedPayments))
  }

  const getPayment = (id: string) => {
    return payments.find(payment => payment.id === id)
  }

  const getPaymentsByTeacher = (teacherId: string) => {
    return payments.filter(payment => payment.teacherId === teacherId)
  }

  const deletePaymentsByTeacher = (teacherId: string) => {
    const updatedPayments = payments.filter(payment => payment.teacherId !== teacherId)
    setPayments(updatedPayments)
    localStorage.setItem('payments', JSON.stringify(updatedPayments))
  }

  return (
    <PaymentContext.Provider value={{
      payments,
      addPayment,
      updatePayment,
      deletePayment,
      getPayment,
      getPaymentsByTeacher,
      updateTeacherNameInPayments,
      deletePaymentsByTeacher,
    }}>
      {children}
    </PaymentContext.Provider>
  )
}

export function usePayments() {
  const context = useContext(PaymentContext)
  if (context === undefined) {
    throw new Error('usePayments must be used within a PaymentProvider')
  }
  return context
} 