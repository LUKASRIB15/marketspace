import { Box, HStack, IButtonProps, Button as NativeBaseButton, Text as NativeBaseText } from "native-base"
import { ReactNode } from "react"


const BUTTON_BG = {
  'primary': 'blue.500',
  'primaryFocus': 'blue.700',
  'defaultFocus': 'gray.500',
  'light': 'gray.300',
  'dark': 'gray.900' 
} as const

type ButtonProps = IButtonProps & {
  children: ReactNode
  bgVariant?: 'primary' | 'light' | 'dark'
  textVariant?: 'light' | 'dark' 
}

function Button({children, bgVariant="primary" ,...rest}: ButtonProps){
  return (
    <NativeBaseButton
      bg={BUTTON_BG[bgVariant]}
      _pressed={{
        bg: BUTTON_BG[bgVariant === 'primary' ? 'primaryFocus' : 'defaultFocus'],
      }}
      
      {...rest}
    >
      {/* Usando o HStack, pois o Button do Native Base não tem propriedades para alinhamento com flex */}
      <HStack
        alignItems={'center'}
        space={2}
      >
        {children}
      </HStack>
    </NativeBaseButton>
  )
}

function ButtonIcon({children}: {children: ReactNode}){
  return children
}

function ButtonText({children, textVariant="light"}: ButtonProps){
  return (
    <NativeBaseText
      fontFamily={'heading'}
      color={textVariant === 'light' ? 'gray.100' : 'gray.900'}
    >
      {children}
    </NativeBaseText>
  )
}

Button.Text = ButtonText
Button.Icon = ButtonIcon

export {Button}