'use client'

import { ChangeEvent, useState } from 'react'
import * as XLSX from 'xlsx'

type JSONQuizenalVerifyType = {
  __EMPTY_1: string
}

type BasicInformation = {
  __EMPTY_3?: string
  __EMPTY_10?: string
  __EMPTY_36?: string
  __EMPTY_21?: number
  __EMPTY_26?: number
}

export default function useTimeSheetUpload() {
  const [fileData, setFileData] = useState([])
  const [technicianName, setTechnicianName] = useState('')
  const [isInternationalJob, setIsInternationalJob] = useState(false)
  const [interventionDescription, setInterventionDescription] = useState('')
  const [site, setSite] = useState('')
  const [firstDate, setFirstDate] = useState(null)
  const [secondDate, setSecondDate] = useState(null)

  const handleTimeSheetUpload = (event: ChangeEvent<HTMLInputElement>) => {
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
          const json = XLSX.utils.sheet_to_json(sheet)

          let dayHoursWorkedArray = []

          if ((json[27] as JSONQuizenalVerifyType).__EMPTY_1 === '') {
            dayHoursWorkedArray = json.slice(12, 27)
          } else {
            dayHoursWorkedArray = json.slice(12, 28)
          }

          const basicInformationArray: BasicInformation[] = json.slice(1, 6)

          const technician_name = basicInformationArray[0]?.__EMPTY_36
          const site = basicInformationArray[3]?.__EMPTY_3
          const first_date = basicInformationArray[1]?.__EMPTY_21
          const second_date = basicInformationArray[1]?.__EMPTY_26

          const is_international_job =
            basicInformationArray[3]?.__EMPTY_10 === 'N'
              ? false
              : basicInformationArray[3]?.__EMPTY_10 === 'Y'
              ? true
              : undefined
          const intervention_description = basicInformationArray[4]?.__EMPTY_36

          setTechnicianName(technician_name)
          setInterventionDescription(intervention_description)
          setIsInternationalJob(is_international_job)
          setFirstDate(first_date)
          setSecondDate(second_date)
          setSite(site)

          setFileData(dayHoursWorkedArray)
        }
      }
      reader.readAsBinaryString(file)
    }
  }

  return {
    fileData,
    technicianName,
    isInternationalJob,
    interventionDescription,
    site,
    firstDate,
    secondDate,
    handleTimeSheetUpload,
    setFileData,
  }
}
