import React from 'react'
import { View, Text, Image, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import bannerList from '../../components/banner';

const home = () => {
  const width = Dimensions.get('window').width;
  return (
    <SafeAreaView className="bg-red-100">
      {/* Header */}
      <View className = "justify-center h-14 bg-red-100" >
        <Text className = "p-3 text-xl font-bold" >Welcome to CraveMate, Foodie!</Text>
      </View>

      <ScrollView>
        {/* Banner Carousel */}
        <Carousel
          style={{ flex: 1, margin:8 }}
          loop={true}
          width={width * 0.96}
          height={width / 2}
          autoPlay={true}
          autoPlayInterval={3000}
          scrollAnimationDuration={500}
          data={bannerList}
          renderItem={({ index }) => (
            <View>
              <Image source={{uri : bannerList[index]}} style={{width:'100%', height:'100%', borderRadius:15}} />
            </View>
          )}
        />

        {/* Deals and Offers */}
        <View className="flex m-3">
          <Text className="font-bold text-base">Trending Offers</Text>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
          <View className = "flex flex-row justify-center items-center" >
            <View className = "flex flex-col justify-center items-center m-3 p-2 bg-red-500 rounded-lg w-32 h-44" >
              <Image source={{uri : 'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg'}} className="w-28 h-36 rounded-lg" style={{resizeMode:'cover'}} />
              <Text className = "text-base font-bold text-red-50" >$199</Text>
            </View>
            <View className = "flex flex-col justify-center items-center m-3 p-2 bg-red-500 rounded-lg w-32 h-44" >
              <Image source={{uri : 'https://www.thomascook.in/blog/wp-content/uploads/2023/09/Must-Try-In-Tamil-Nadu.png'}} className="w-28 h-36 rounded-lg" style={{resizeMode:'cover'}} />
              <Text className = "text-base font-bold text-red-50" >$99</Text>
            </View>
            <View className = "flex flex-col justify-center items-center m-3 p-2 bg-red-500 rounded-lg w-32 h-44" >
              <Image source={{uri : 'https://www.expatica.com/app/uploads/sites/5/2014/05/french-food.jpg'}} className="w-28 h-36 rounded-lg" style={{resizeMode:'cover'}} />
              <Text className = "text-base font-bold text-red-50" >$149</Text>
            </View>
            <View className = "flex flex-col justify-center items-center m-3 p-2 bg-red-500 rounded-lg w-32 h-44" >
              <Image source={{uri : 'https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg'}} className="w-28 h-36 rounded-lg" style={{resizeMode:'cover'}} />
              <Text className = "text-base font-bold text-red-50" >$199</Text>
            </View>
          </View>
        </ScrollView>

        {/* Trending */}
        <View className="flex-row flex-wrap justify-center items-center mt-4">
          <Text className="font-bold text-base">Popular Deals</Text>
          <View className = "flex flex-col justify-center items-center mb-7 bg-red-500 rounded-xl h-44" style={{width : width * 0.82}} >
            <Image source={{uri : 'https://www.thomascook.in/blog/wp-content/uploads/2023/09/Must-Try-In-Tamil-Nadu.png'}} className="h-36 rounded-lg" style={{width:width*0.79, resizeMode:'cover'}} />
            <Text className = "font-bold text-red-50" >Special Snacks</Text>
          </View>
          <View className = "flex flex-col justify-center items-center mx-6 mb-7 bg-red-500 rounded-lg h-44" style={{width : width * 0.35}} >
            <Image source={{uri : 'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg'}} className="w-28 h-36 rounded-lg" style={{width:width*0.32, resizeMode:'cover'}} />
            <Text className = "font-bold text-red-50" >Chicken Wings</Text>
          </View>
          <View className = "flex flex-col justify-center items-center mx-7 mb-7 bg-red-500 rounded-lg h-44" style={{width : width * 0.35}} >
            <Image source={{uri : 'https://www.expatica.com/app/uploads/sites/5/2014/05/french-food.jpg'}} className="w-28 h-36 rounded-lg" style={{width:width*0.32, resizeMode:'cover'}} />
            <Text className = "font-bold text-red-50" >Chicken Wings</Text>
          </View>
          <View className = "flex flex-col justify-center items-center mb-7 bg-red-500 rounded-xl h-44" style={{width : width * 0.82}} >
            <Image source={{uri : 'https://img.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_188544-9469.jpg'}} className="h-36 rounded-lg" style={{width:width*0.79, resizeMode:'cover'}} />
            <Text className = "font-bold text-red-50" >Special Snacks</Text>
          </View>
          <View className = "flex flex-col justify-center items-center mx-7 mb-7 bg-red-500 rounded-lg h-44" style={{width : width * 0.35}} >
            <Image source={{uri : 'https://www.expatica.com/app/uploads/sites/5/2014/05/french-food.jpg'}} className="w-28 h-36 rounded-lg" style={{width:width*0.32, resizeMode:'cover'}} />
            <Text className = "font-bold text-red-50" >Chicken Wings</Text>
          </View>
          <View className = "flex flex-col justify-center items-center mx-7 mb-7 bg-red-500 rounded-lg h-44" style={{width : width * 0.35}} >
            <Image source={{uri : 'https://img.bestrecipes.com.au/iyddCRce/br/2019/02/1980-crunchy-chicken-twisties-drumsticks-951509-1.jpg'}} className="w-28 h-36 rounded-lg" style={{width:width*0.32, resizeMode:'cover'}} />
            <Text className = "font-bold text-red-50" >Chicken Wings</Text>
          </View>
        </View>

        <View className="flex h-16"></View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default home