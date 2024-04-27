import { Box, FlatList, Heading, Image, VStack } from "native-base"
import { useState, useRef } from "react"
import { Dimensions } from "react-native"

type CarouselProps = {
  isActive: boolean
}


const DATA = [
  {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
]

export function Carousel({isActive}: CarouselProps){
  const [activeBanner, setActiveBanner] = useState<number>(0)
  const screenWidth = Dimensions.get("window").width

  
  
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        viewAreaCoveragePercentThreshold: 50
      },
      onViewableItemsChanged
    }
  ])
  
  function onViewableItemsChanged({viewableItems}: any) {
    
    setActiveBanner(viewableItems[0].index)
    
  }

  return (
    <VStack
      position={"relative"}
      top={0}
    >
      <FlatList 
        ref={viewabilityConfigCallbackPairs}
        data={DATA}
        keyExtractor={(item)=>item.image}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        
        renderItem={({item})=>{
          return (
            <Box
              alignItems={"center"}
            >
              
              <Image 
                source={{uri: item.image}}
                w={screenWidth}
                h={280}
                alignSelf={"center"}
                alt=""
                resizeMode="cover"
              />
            </Box>
          )
        }}
        
      />
      <Box
        position={"absolute"}
        bottom={1}
        left={1}
        right={1}
      >
        <FlatList 
          data={DATA}
          keyExtractor={(item, index)=>index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: 8, width: "100%"}}
          renderItem={({item, index})=>{
            return (
              <Box
                opacity={activeBanner === index ? 0.75 : 0.5}
                h={1}
                w={screenWidth/DATA.length}
                rounded={999}
                bg={"gray.100"}
              />
            )
          }}
        />
      </Box>
      {
        !isActive &&
          <Box
            position={"absolute"}
            top={0}
            right={0}
            left={0}
            bottom={0}
            justifyContent={"center"}
            alignItems={"center"}
            style={{
              backgroundColor: "rgba(26,24,27, 0.5)"
            }}
          >
            <Heading
              fontSize={"base"}
              fontFamily={"heading"}
              textTransform={"uppercase"}
              color={"gray.100"}
            >
              Anúncio desativado
            </Heading>
          </Box>
      }
    </VStack>
  )
}