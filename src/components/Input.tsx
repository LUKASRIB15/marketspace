import {FormControl, IInputProps, Input as NativeBaseInput} from "native-base"

type InputProps = IInputProps & {
  errorMessage?: string 
}

export function Input({children, errorMessage,...rest}: InputProps){
  const hasError = Boolean(errorMessage)

  return (
    <FormControl 
      isInvalid={hasError}
    >
      <NativeBaseInput
        w={"100%"}
        fontSize={'md'}
        fontFamily={'body'}
        rounded={6}
        bg={'gray.100'}
        borderWidth={0}
        py={3}
        px={4}
        placeholderTextColor={'gray.500'}
        _focus={{
          bg: 'gray.100',
          borderWidth: 1,
          borderColor: 'gray.700'
        }}
        _invalid={{
          borderWidth: 1,
          borderColor: 'red.500'
        }}
        {...rest}
      >
        {children}
      </NativeBaseInput>
      <FormControl.ErrorMessage mt={1}>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}