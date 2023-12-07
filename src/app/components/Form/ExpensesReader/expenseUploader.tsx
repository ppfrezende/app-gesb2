'use client'

import React, { ChangeEvent, useRef, useState } from 'react'
import {
  Button,
  Input,
  InputProps as ChakraInputProps,
  Text,
  Icon,
} from '@/app/components/chakraui'
import { RiFileExcel2Line } from 'react-icons/ri'

interface ExpenseUploaderProps extends ChakraInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => unknown
}

export function ExpenseUploader({ onChange }: ExpenseUploaderProps) {
  const fileInputRef = useRef(null)
  const [fileName, setFileName] = useState('')

  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setFileName(event.target.files[0].name) // Define o nome do arquivo selecionado
    }
    if (onChange) {
      onChange(event)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  return (
    <>
      <Input
        ref={fileInputRef}
        type="file"
        accept=".xls,.xlsx"
        onChange={handleFileChange}
        display="none"
      />
      <Button
        onClick={handleButtonClick}
        bg="none"
        size="lg"
        color="gray.800"
        _hover={{
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
        }}
        _active={{
          transform: 'scale(0.98)',
          borderColor: '#bec3c9',
        }}
        _focus={{
          boxShadow: '0 0 1px 2px red.600, 0 1px 1px rgba(0, 0, 0, .15)',
        }}
      >
        <Icon as={RiFileExcel2Line} fontSize="25px" marginRight="2" />
        <Text>Importar Despesa</Text>
      </Button>
      {fileName && (
        <Text marginLeft="4" fontSize="12" mt={2}>
          {fileName}
        </Text>
      )}
    </>
  )
}
