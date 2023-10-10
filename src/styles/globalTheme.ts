import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  components: {
    Text: {
      baseStyle: {
        fontSize: '12px',
      },
    },
  },
})
