import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import axios from 'axios';
//import getMoviesFromApi from './restAPI';
import { ActivityIndicator, AppRegistry, TouchAbleOpacity, StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null,
    }
  }

  
   componentDidMount(){

      return fetch('https://us-central1-aiot-fit-xlab.cloudfunctions.net/getalltrashlocations')
      .then((response) => response.json())
      .then ((responseJson)=>{

        this.setState({
          isLoading: false,
          dataSource: responseJson.locations,
          })

       })

     .catch((error) =>  {
        console.log (error)
      });

   }
 
  // axios
  // .get("https://us-central1-aiot-fit-xlab.cloudfunctions.net/getalltrashlocations")
  // .then(response => {
  //   this.data = response.data;
  //   this.data.forEach(function(item) {
  //     console.log("found: ", item)
  //     console.log("found id: ", item.mongoresult)
  //     //this.GetLikes(item.id);
  //   });
  // })
 
  render() {
    
    if (this.state.isLoading) {

      return (
        <SafeAreaView style={styles.container}>
          
          <View>
            <Text style={styles.title}>
              Markers mark locations with lots of trash
            </Text>
            <View style={styles.fixToText}>
            <Button
              title="More Info"
              onPress={() => Alert.alert('Data Still Loading')}
            />
            </View>
          </View>
        </SafeAreaView>
      );  

    } else {
      
      let coordinates = this.state.dataSource.map((val, key) => {
        return (
         
                <MapView.Marker  key={key}
                            coordinate={{
                              latitude: val.lat,
                              longitude: val.long
                            }}
                            title={ 'Trashdash' }
                            description={ 'myDescription' }
                            pinColor={ 'blue' }
                            onCalloutPress={() => alert('Trash Mark Removed by Deleting Endpoint')}
                        >
                            <MapView.Callout>
                                <View>
                                    <Text>Remove</Text>
                                </View>
                            </MapView.Callout>
                </MapView.Marker>   
         
        )
      });

      return (
        <SafeAreaView style={styles.container}>
          
            <MapView style={styles.map}
              region={{
                  latitude: 40.7128,
                  longitude: 74.0060,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1
              }}

            >
             {coordinates}
           </MapView>
           <View>
            <Text style={styles.title}>
              Markers mark locations with lots of trash.
            </Text>
            <View style={styles.fixToText}>
            <Button
              title="More Info"
              onPress={() => Alert.alert('Place the markers in places where trash is littered. After picking up trash at the marker, remove the marker and earn points.')}
            />
            </View>
          </View>
        </SafeAreaView>
      )
    
    } //else   
  } //render
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  
});
