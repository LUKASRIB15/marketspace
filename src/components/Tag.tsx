import { Box, HStack, Text, useTheme } from "native-base";
import { XCircle } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

type TagProps = {
  condition: string
  value: string[]
  onChangeValue: ()=>void
}

export function Tag({condition, value, onChangeValue }:TagProps){
  const {colors} = useTheme()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onChangeValue}
    >
      <HStack
        bg={value.includes(condition) ? "blue.500" : "gray.300"}
        py={1}
        px={4}
        rounded={999}
        alignItems={"center"}
        space={"1.5"}
      >
        <Text
          textTransform={"uppercase"}
          fontFamily={"heading"}
          color={value.includes(condition) ? "white" : "gray.700"}
          fontSize={'xs'}
        >
          {condition}
        </Text>
        {
          value.includes(condition) && (
            <Box
              position={"absolute"}
              right={1.5}
              alignItems={"center"}
              justifyContent={"center"}
              rounded={999}
            >
              <XCircle size={14} color={colors.white} weight="fill"/>
            </Box>
          )
        }
      </HStack>
    </TouchableOpacity>
  )
}