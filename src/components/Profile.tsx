import { Box, IImageProps, Image, useTheme } from "native-base";
import { PencilSimpleLine, User } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker"

import AvatarPng from "../assets/avatar.png"
import { useState } from "react";

type ProfileProps = IImageProps & {
  showButtonEdit?: boolean
  sourceImage?: string | null
}

export function Profile({ showButtonEdit=false, sourceImage=null ,w, h}:ProfileProps){
  const {colors} = useTheme()
  const [imageProfile, setImageProfile] = useState<string | null>(sourceImage)

  async function handleAddPhotoOfProfile(){
    if(showButtonEdit === false){
      return 
    }

    const photoSelected = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [4, 4]
    })

    if(photoSelected.assets && photoSelected.assets[0].uri){
      setImageProfile(photoSelected.assets[0].uri)
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handleAddPhotoOfProfile}
    >
      
      <Image 
        source={imageProfile ? {uri: imageProfile} : AvatarPng} 
        alt="Imagem de perfil atual do usuário" 
        w={w} 
        h={h}
        rounded={999}
        borderWidth={3}
        borderColor={'blue.500'}
        resizeMode="cover"
      />

      {
        showButtonEdit && 
        <Box
          p={3}
          rounded={999}
          bg={"blue.500"}
          position={"absolute"}
          bottom={-5}
          right={-5}
        >
          <PencilSimpleLine size={16} color={colors.gray[100]}/>
        </Box>
      }
      
    </TouchableOpacity>
  )
}