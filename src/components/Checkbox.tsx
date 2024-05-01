import { HStack, Text, useTheme } from "native-base";

import {Checkbox as ExpoCheckbox} from "expo-checkbox"

type CheckboxProps = {
  isChecked: boolean
  label: string
  onValueChange: () => void
}

export function Checkbox({isChecked, label, onValueChange}:CheckboxProps){
  const {colors} = useTheme()
  return (
    <HStack
      space={2}
      alignItems={"center"}
    >
      <ExpoCheckbox
        value={isChecked} 
        onValueChange={onValueChange}
        color={isChecked ? colors.blue[500] : colors.gray[300] }
        style={{
          width: 18,
          height: 18
        }}
      />
      <Text>{label}</Text>
    </HStack>
  )
}