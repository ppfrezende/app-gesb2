'use client'

import React, { ChangeEvent, useRef, useState } from 'react'
import {
  Button,
  Input,
  InputProps as ChakraInputProps,
  Text,
} from '@/app/components/chakraui'

interface FileUploaderProps extends ChakraInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => unknown
}

export function FileUploader({ onChange }: FileUploaderProps) {
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
        bg="blue.800"
        size="sm"
        color="white"
        _hover={{ bg: 'blue.900' }}
        _active={{
          bg: 'blue.900',
          transform: 'scale(0.98)',
          borderColor: '#bec3c9',
        }}
        _focus={{
          boxShadow: '0 0 1px 2px red.600, 0 1px 1px rgba(0, 0, 0, .15)',
        }}
      >
        Carregar Arquivo
      </Button>
      {fileName && (
        <Text fontSize="12" mt={2}>
          {fileName}
        </Text>
      )}
    </>
  )
}
