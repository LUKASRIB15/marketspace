import { Center, Spinner } from "native-base";

export function Loading(){
  return (
    <Center
      bg={"gray.200"} 
      flex={1}
    >
      <Spinner 
        color={"blue.500"}
      />
    </Center>
  )
}