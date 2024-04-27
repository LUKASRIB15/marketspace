import { Box, HStack, Text, useTheme } from "native-base";
import { X, XCircle } from "phosphor-react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

type TagProps = {
  condition: string
}

export function Tag({condition}:TagProps){
  const {colors} = useTheme()
  const [isActive, setActive] = useState(false)

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={()=>setActive(!isActive)}
    >
      <HStack
        bg={isActive ? "blue.500" : "gray.300"}
        py={1}
        px={4}
        rounded={999}
        alignItems={"center"}
        space={"1.5"}
      >
        <Text
          textTransform={"uppercase"}
          fontFamily={"heading"}
          color={isActive ? "white" : "gray.700"}
          fontSize={'xs'}
        >
          {condition}
        </Text>
        {
          isActive && (
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