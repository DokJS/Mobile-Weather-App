import React,{useState,useEffect} from 'react'
import { createUrl } from './API/Request'
import FetchData from './Functions/Fetch'
import { View, TextInput, StyleSheet, Text, ImageBackground, ActivityIndicator } from 'react-native'

const image = {uri: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/sunset-quotes-21-1586531574.jpg"}
const App = () => {
  const [inputValue, setInputValue] = useState('')
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [data,setData] = useState({})
  
  const searchWeatherData = ({nativeEvent}) => {
    const { text } = nativeEvent
    if (text.length > 0) {
      setData({}) // for remove previous data before new call
      setIsDataLoading(true)
    }
  }

  useEffect(() => {
    if (isDataLoading) {
      const currentRequestUrl = createUrl(inputValue)
      FetchData(currentRequestUrl)
        .then(data => {
          setData(data)
          console.log(data)
          setIsDataLoading(false)
        })
      .catch(error => console.log(error))
    }
  },[isDataLoading])
  
  return (
    <View style={styles.view_container}>
      <ImageBackground style={styles.view_background} source={image}>
        <View style={styles.view_top}>
          <TextInput style={styles.view_input} 
                      placeholder='Enter your location' 
                      onChangeText={(text)=>setInputValue(text)} 
                      value={inputValue}
                      onSubmitEditing={(event)=>searchWeatherData(event)} />
      </View>
        {
          isDataLoading ? <ActivityIndicator size='large' color='white' />
            : (data.name && (
              <View style={styles.view_bottom}>
          <View style={styles.description_main}>
                  <Text style={styles.view_mainStyle}>{data.name}</Text>
                  <Text style={[styles.view_mainStyle, { transform: [{ translateX: 30 }] }, { marginTop: 5 }]}>{Math.trunc(data.main.temp)}°C</Text>
        </View>
                <Text style={styles.description}>{data.weather[0].description}</Text>
        <View style={styles.description_secondary}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
            <Text style={styles.view_secondaryStyle}>{Math.trunc(data.main.feels_like)}°C</Text>
            <Text style={styles.view_secondaryStyle}>Feels Like</Text>
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.view_secondaryStyle}>{data.main.humidity}%</Text>
            <Text style={styles.view_secondaryStyle}>Humidity</Text>
          </View>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={styles.view_secondaryStyle}>{Math.trunc(data.wind.speed)}%</Text>
            <Text style={styles.view_secondaryStyle}>winds</Text>
          </View> 
        </View>
      </View>
            ))
        }

      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  view_container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  view_background: {
    flex:1,
  },
  view_top: {
    flex:1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems:'center'
  },
  view_input: {
    width: '50%',
    height : 30,
    backgroundColor: 'white',
    borderRadius: 15,
    opacity: 0.9,
    paddingLeft: 15,
    color: 'black',
    borderWidth: 1,
    borderStyle:'solid'
  },
  view_bottom: {
    flex: 5,
    flexDirection:'column',
    justifyContent: 'space-between',
    alignItems:'center',
  },
  description_main: {
    flex: 2,
    backgroundColor: 'white',
    width: '80%',
    maxHeight: 200,
    borderRadius: 15,
    opacity: 0.4,
    justifyContent: 'center',
    alignItems:'center'
  },
  description: {
    position: 'absolute',
    zIndex: 10,
    top: '50%',
    right: 10,
    fontSize: 30,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    transform:[{rotate:'-90deg'}]
  },
  description_secondary: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: 'white',
    height:70,
    width: '95%',
    borderRadius: 10,
    opacity: 0.4,
    position: 'absolute',
    bottom:50
  },
  view_mainStyle: {
    fontSize: 40,
    fontWeight: '600',
    color:'grey'
  },
  view_secondaryStyle: {
    fontSize:20,
    fontWeight: '600',
    color:'grey'
  },
  indicator_style:{
    position: 'absolute',
    zIndex: 20,
    top: '50%',
    right:'50%'
  }
})
export default App