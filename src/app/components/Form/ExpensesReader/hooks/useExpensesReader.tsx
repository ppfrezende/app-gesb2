'use client'

import { ChangeEvent, useState } from 'react'
import * as XLSX from 'xlsx'

export type ExpenseFileData = {
  amount: number
  cost_center: string
  date: string
  description: string
  expense_id: number
  expense_type: string
}

export default function useExpensesUpload() {
  const [fileData, setFileData] = useState([])

  const handleExpensesUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = e.target?.result
        if (data && typeof data === 'string') {
          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetName = workbook.SheetNames[0]
          const sheet = workbook.Sheets[sheetName]
          const expensesData: ExpenseFileData[] =
            XLSX.utils.sheet_to_json(sheet)

          setFileData(expensesData)
        }
      }
      reader.readAsBinaryString(file)
    }
  }

  return {
    fileData,
    handleExpensesUpload,
    setFileData,
  }
}
