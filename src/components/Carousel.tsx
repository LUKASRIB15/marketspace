import { Box, FlatList, Heading, Image, VStack } from "native-base"
import { useState, useRef } from "react"
import { Dimensions } from "react-native"
import { api } from "../lib/api"

type ProductImage = {
  path: string
  id: string
}

type CarouselProps = {
  isActive: boolean
  imagesOfProduct: ProductImage[]
  preview?: boolean
}


export function Carousel({isActive, preview=false,imagesOfProduct}: CarouselProps){
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
        data={imagesOfProduct}
        keyExtractor={(item)=>item.id}
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
                source={
                  preview ? 
                    {uri: item.path}
                  :
                    {uri: `${api.defaults.baseURL}/images/${item.path}`}
                }
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
          data={imagesOfProduct}
          keyExtractor={(item, index)=>index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{gap: 8, width: "100%"}}
          renderItem={({item, index})=>{
            return (
              <Box
                opacity={activeBanner === index ? 0.75 : 0.5}
                h={1}
                w={(screenWidth/imagesOfProduct.length)-8}
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