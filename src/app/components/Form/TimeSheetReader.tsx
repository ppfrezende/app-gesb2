'use client'

import React, { ChangeEvent, useState } from 'react'
import {
  Flex,
  Input,
  ListItem,
  Text,
  UnorderedList,
} from '@/app/components/chakraui'
import * as XLSX from 'xlsx'

type TimeSheetData = {
  __EMPTY_1: number // Date
  __EMPTY_3: number // Departure
  __EMPTY_5: number // Arrival
  // Range A
  __EMPTY_7: number // From
  __EMPTY_8: number // To
  // Range B
  __EMPTY_10: number // From
  __EMPTY_12: number // To
  // Range C
  __EMPTY_13: number // From
  __EMPTY_14: number // To
  // Range D
  __EMPTY_15: number // From
  __EMPTY_17: number // To
}

export function TimeSheetReader() {
  const [fileData, setFileData] = useState([])

  function serialNumberToDate(serialNumber: number) {
    const baseDate = new Date(1900, 0, 1)
    const milliseconds = (serialNumber - 1) * 24 * 60 * 60 * 1000
    const date = new Date(baseDate.getTime() + milliseconds)

    return date
  }

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
          console.log(json)

          const dayHoursWorkedArray = json.slice(12, 27)
          setFileData(dayHoursWorkedArray)
        }
      }
      reader.readAsBinaryString(file)
    }
  }

  function convertDecimalToHour(decimal: number) {
    const hoursInDay = 24
    const hours = decimal * hoursInDay
    const hourFloor = Math.floor(hours)
    const minutes = (hours - hourFloor) * 60

    const formattedHour = `${hourFloor}:${minutes.toFixed(0).padStart(2, '0')}`

    return formattedHour
  }

  return (
    <Flex flexDirection="column">
      <Input type="file" accept=".xls,.xlsx" onChange={handleTimeSheetUpload} />

      <UnorderedList>
        {fileData?.map((item: TimeSheetData, index) => (
          <ListItem
            key={index}
            display="flex"
            flexDirection="row"
            marginBottom="2"
            justifyContent="space-between"
            fontSize="14"
          >
            {serialNumberToDate(item.__EMPTY_1).toLocaleDateString()}
            <Flex flexDirection="column" justifyContent="center">
              <Text>
                Partida:{' '}
                {item.__EMPTY_3 ? convertDecimalToHour(item.__EMPTY_3) : null}
              </Text>
              <Text>
                Chegada:{' '}
                {item.__EMPTY_5 ? convertDecimalToHour(item.__EMPTY_5) : null}
              </Text>
            </Flex>
            <Flex flexDirection="column" justifyContent="center">
              <h1>RANGE A:</h1>
              <Text>
                {' '}
                from:{' '}
                {item.__EMPTY_7 ? convertDecimalToHour(item.__EMPTY_7) : null}
              </Text>
              <Text>
                {' '}
                to:{' '}
                {item.__EMPTY_8 ? convertDecimalToHour(item.__EMPTY_8) : null}
              </Text>
            </Flex>
            <Flex flexDirection="column" justifyContent="center">
              <h1>RANGE B:</h1>
              <Text>
                from:{' '}
                {item.__EMPTY_10 ? convertDecimalToHour(item.__EMPTY_10) : null}
              </Text>
              <Text>
                to:{' '}
                {item.__EMPTY_12 ? convertDecimalToHour(item.__EMPTY_12) : null}
              </Text>
            </Flex>
            <Flex flexDirection="column" justifyContent="center">
              <h1>RANGE C:</h1>
              <Text>
                from:{' '}
                {item.__EMPTY_13 ? convertDecimalToHour(item.__EMPTY_13) : null}
              </Text>
              <Text>
                to:{' '}
                {item.__EMPTY_14 ? convertDecimalToHour(item.__EMPTY_14) : null}
              </Text>
            </Flex>
            <Flex flexDirection="column" justifyContent="center">
              <h1>RANGE D:</h1>
              <Text>
                from:{' '}
                {item.__EMPTY_15 ? convertDecimalToHour(item.__EMPTY_15) : null}
              </Text>
              <Text>
                {' '}
                to:{' '}
                {item.__EMPTY_17 ? convertDecimalToHour(item.__EMPTY_17) : null}
              </Text>
            </Flex>
          </ListItem>
        ))}
      </UnorderedList>
    </Flex>
  )
}
