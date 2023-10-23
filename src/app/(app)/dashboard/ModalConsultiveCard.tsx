'use client'

import { PositiveButton } from '@/app/components/Buttons/PositiveButton'
import { Input } from '@/app/components/Form/input'
import {
  Flex,
  Icon,
  Heading,
  FlexProps,
  ModalFooter,
  Button,
  ModalBody,
  Divider,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Box,
  Modal,
  useDisclosure,
  Select,
  Text,
  SimpleGrid,
  Stack,
  RadioGroup,
  Radio,
} from '@/app/components/chakraui'
import { RiAddLine, RiDeleteBackLine } from '@/app/components/icons'
import { ElementType, useState } from 'react'
import ConsultiveList from './ConsultiveList'

interface ModalCardProps extends FlexProps {
  title: string
  iconTop: ElementType
  iconBottom: ElementType
}

export default function ModalConsultiveCard({
  iconTop,
  iconBottom,
  title,
  ...rest
}: ModalCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = useState(true)

  function closeModalAndReset() {
    onClose()
  }

  return (
    <Flex
      onClick={onOpen}
      flexDirection="column"
      alignItems="center"
      minWidth="16"
      borderRadius="6"
      bg="gray.200"
      padding="8"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.15)"
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
      cursor="pointer"
      {...rest}
    >
      <Icon as={iconTop} color="gray.700" fontSize="25px" marginBottom="6" />
      <Heading color="gray.700" wordBreak="break-word">
        {title}
      </Heading>
      <Icon as={iconBottom} fontSize="60px" marginTop="6" />

      <Modal
        size="6xl"
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="scale"
      >
        <Box
          as="form"
          onSubmit={() => {
            closeModalAndReset()
          }}
        >
          <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="55%"
            backdropBlur="2px"
          />
          <ModalContent>
            <ModalHeader>
              <Flex
                flexDirection="row"
                justifyContent="start"
                alignItems="center"
                marginTop="4"
              >
                <Text marginRight="4" fontWeight="normal">
                  Ano Operativo:
                </Text>
                <Select borderRadius="4" size="xs" maxWidth="20">
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                  <option value="2021">2021</option>
                </Select>
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <Divider
              alignSelf="center"
              maxWidth="1024"
              margin="4"
              borderColor="gray.500"
            />
            <ModalBody>
              <Flex flexDirection="row">
                <Flex flexDirection="column">
                  <Flex flexDirection="row">
                    <Flex
                      flexDirection="row"
                      justifyContent="start"
                      alignItems="center"
                    >
                      <Flex
                        padding="4"
                        border="1px"
                        borderColor="gray.300"
                        borderRadius="4"
                        flexDirection="column"
                      >
                        <Text fontWeight="bold" position="relative">
                          Referências T&T
                        </Text>
                        <Divider
                          alignSelf="center"
                          maxWidth="500"
                          margin="2"
                          borderColor="gray.500"
                        />
                        <Flex
                          marginBottom="2"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                          minWidth={80}
                        >
                          <Text marginRight="4" fontWeight="normal">
                            Selecionar Consultivo:
                          </Text>
                          <Select borderRadius="4" size="xs" maxWidth={36}>
                            <option value="23/007">23/007</option>
                            <option value="23/006">23/006</option>
                            <option value="23/005">23/005</option>
                            <option value="23/004">23/004</option>
                            <option value="23/003">23/003</option>
                            <option value="23/002">23/002</option>
                            <option value="23/001">23/001</option>
                          </Select>
                        </Flex>
                        <Flex
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text marginRight="4" fontWeight="normal">
                            Intervenção:
                          </Text>
                          <Select borderRadius="4" size="xs" maxWidth={36}>
                            <option value="23INTB0118">23INTB0118</option>
                            <option value="23INTB0117">23INTB0117</option>
                            <option value="23INTB0116">23INTB0116</option>
                            <option value="23INTB0115">23INTB0115</option>
                            <option value="23INTB0114">23INTB0114</option>
                          </Select>
                        </Flex>
                      </Flex>
                      <Flex
                        marginLeft="4"
                        padding="4"
                        border="1px"
                        borderColor="gray.300"
                        borderRadius="4"
                        flexDirection="column"
                      >
                        <Text fontWeight="Bold" position="relative">
                          Intervenção
                        </Text>
                        <Divider
                          alignSelf="center"
                          maxWidth="500"
                          margin="2"
                          borderColor="gray.500"
                        />
                        <Flex
                          marginBottom="2"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                          minWidth={52}
                        >
                          <Text marginRight="4" fontWeight="normal">
                            Técnico:
                          </Text>
                          <Select borderRadius="4" size="xs" maxWidth={36}>
                            <option value="23/007">23/007</option>
                            <option value="23/006">23/006</option>
                            <option value="23/005">23/005</option>
                            <option value="23/004">23/004</option>
                            <option value="23/003">23/003</option>
                            <option value="23/002">23/002</option>
                            <option value="23/001">23/001</option>
                          </Select>
                        </Flex>
                        <Flex
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Text marginRight="4" fontWeight="normal">
                            Lugar:
                          </Text>
                          <Select borderRadius="4" size="xs" maxWidth={36}>
                            <option value="23INTB0118">23INTB0118</option>
                            <option value="23INTB0117">23INTB0117</option>
                            <option value="23INTB0116">23INTB0116</option>
                            <option value="23INTB0115">23INTB0115</option>
                            <option value="23INTB0114">23INTB0114</option>
                          </Select>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>

                  {/* ------------------------------------------ */}

                  <Flex
                    marginTop="4"
                    padding="4"
                    border="1px"
                    borderColor="gray.300"
                    borderRadius="4"
                    flexDirection="column"
                  >
                    <Text fontWeight="Bold" position="relative">
                      Detalhes Comerciais
                    </Text>
                    <Divider
                      alignSelf="center"
                      maxWidth="840"
                      margin="2"
                      borderColor="gray.500"
                    />
                    <Flex
                      marginBottom="2"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      minWidth={80}
                    >
                      <SimpleGrid columns={2} spacing={10}>
                        <Flex
                          flexDirection="row"
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          <Text>Cliente:</Text>
                          <Text
                            marginLeft="2"
                            padding="1"
                            borderRadius="4"
                            bg="gray.100"
                          >
                            Fulano de Tal
                          </Text>
                        </Flex>
                        <Flex
                          flexDirection="row"
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          <Text>PM Cliente:</Text>
                          <Text
                            marginLeft="2"
                            padding="1"
                            borderRadius="4"
                            bg="gray.100"
                          >
                            Fulano de Tal
                          </Text>
                        </Flex>
                        <Flex
                          flexDirection="row"
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          <Text>P.O:</Text>
                          <Text
                            marginLeft="2"
                            padding="1"
                            borderRadius="4"
                            bg="gray.100"
                          >
                            Fulano de Tal
                          </Text>
                        </Flex>
                        <Flex
                          flexDirection="row"
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          <Text>Job Number:</Text>
                          <Text
                            marginLeft="2"
                            padding="1"
                            borderRadius="4"
                            bg="gray.100"
                          >
                            Fulano de Tal
                          </Text>
                        </Flex>
                      </SimpleGrid>
                    </Flex>
                  </Flex>

                  {/* ------------------------------------------ */}

                  <Flex
                    marginTop="4"
                    padding="4"
                    border="1px"
                    borderColor="gray.300"
                    borderRadius="4"
                    flexDirection="column"
                  >
                    <Text fontWeight="Bold" position="relative">
                      Duração
                    </Text>
                    <Divider
                      alignSelf="center"
                      maxWidth="840"
                      margin="2"
                      borderColor="gray.500"
                    />
                    <Flex
                      marginBottom="2"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="center"
                      minWidth={80}
                    >
                      <SimpleGrid columns={2} spacing={10}>
                        <Flex
                          flexDirection="row"
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          <Input
                            fontSize="12px"
                            // {...register('admission_at')}
                            name="initial_at"
                            label="Data de início:"
                            type="date"
                            // error={errors.admission_at}
                          />
                        </Flex>
                        <Flex
                          flexDirection="row"
                          justifyContent="space-around"
                          alignItems="center"
                        >
                          <Input
                            fontSize="12px"
                            // {...register('admission_at')}
                            name="finished_at"
                            label="Data fim:"
                            type="date"
                            // error={errors.admission_at}
                          />
                        </Flex>
                      </SimpleGrid>
                    </Flex>
                  </Flex>

                  {/* ------------------------------------------ */}

                  <Flex flexDirection="row" justifyContent="space-between">
                    <Flex
                      marginTop="4"
                      padding="4"
                      border="1px"
                      borderColor="gray.300"
                      borderRadius="4"
                      flexDirection="column"
                    >
                      <Text fontWeight="Bold" position="relative">
                        On/OffShore
                      </Text>
                      <Divider
                        alignSelf="center"
                        maxWidth="500"
                        margin="2"
                        borderColor="gray.500"
                      />
                      <Flex
                        marginBottom="2"
                        justifyItems="center"
                        justifyContent="center"
                        alignItems="center"
                        minWidth={50}
                      >
                        <RadioGroup
                          marginTop="4"
                          onChange={(nextValue) =>
                            setValue(nextValue === 'OnShore')
                          }
                          value={value ? 'OnShore' : 'OffShore'}
                        >
                          <Stack direction="row">
                            <Radio size="sm" value="OnShore">
                              OnShore
                            </Radio>
                            <Radio size="sm" value="OffShore">
                              OffShore
                            </Radio>
                          </Stack>
                        </RadioGroup>
                      </Flex>
                    </Flex>

                    <Flex
                      marginLeft="4"
                      marginTop="4"
                      padding="4"
                      border="1px"
                      borderColor="gray.300"
                      borderRadius="4"
                      flexDirection="column"
                    >
                      <Text fontWeight="Bold" position="relative">
                        Tipologia Técnico
                      </Text>
                      <Divider
                        alignSelf="center"
                        maxWidth="500"
                        margin="2"
                        borderColor="gray.500"
                      />
                      <Flex flexDirection="column">
                        <Flex
                          marginBottom="4"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                          minWidth={80}
                        >
                          <Button
                            boxShadow="0px 2px 2px rgba(0, 0, 0, 0.15)"
                            size="sm"
                            fontWeight="normal"
                            fontSize="sm"
                          >
                            Escolher P.O.
                          </Button>

                          <Text>Nome da P.O.</Text>
                        </Flex>
                        <Flex
                          marginBottom="2"
                          flexDirection="row"
                          justifyContent="space-between"
                          alignItems="center"
                          minWidth={80}
                        >
                          <Select borderRadius="4" size="xs" maxWidth={36}>
                            <option value="23INTB0118">23INTB0118</option>
                            <option value="23INTB0117">23INTB0117</option>
                            <option value="23INTB0116">23INTB0116</option>
                            <option value="23INTB0115">23INTB0115</option>
                            <option value="23INTB0114">23INTB0114</option>
                          </Select>

                          <Select borderRadius="4" size="xs" maxWidth={36}>
                            <option value="23INTB0118">23INTB0118</option>
                            <option value="23INTB0117">23INTB0117</option>
                            <option value="23INTB0116">23INTB0116</option>
                            <option value="23INTB0115">23INTB0115</option>
                            <option value="23INTB0114">23INTB0114</option>
                          </Select>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <Box marginLeft="2">
                  <ConsultiveList />
                </Box>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button
                onClick={closeModalAndReset}
                size="sm"
                fontSize="sm"
                colorScheme="gray"
                cursor="pointer"
                leftIcon={<Icon as={RiDeleteBackLine} fontSize="20" />}
              >
                Cancelar
              </Button>
              <PositiveButton
                marginLeft="4"
                type="submit"
                // isLoading={isSubmitting}
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Salvar
              </PositiveButton>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </Flex>
  )
}
