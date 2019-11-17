import React, { useState, useEffect } from "react"; 
import { Alert, SafeAreaView, View, ScrollView, Image, AsyncStorage, Text, StyleSheet, TouchableOpacity } from "react-native";
import SpotList from "../components/SpotList";
import socketio from "socket.io-client"
import logo from "../assets/logo.png";

export default function List ({ navigation }){
	
	const [techs, setTechs] = useState([ ]);
	
	useEffect( () =>{
		AsyncStorage.getItem("user").then(user_id =>{
			const socket = socketio("http://localhost:3001", { query:{ user_id } });
		
			socket.on("booking_response",						booking=>{
				Alert.alert("Reserva",`Sua solicitação de reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved?"ACEITA":"REJEITADA"}`);
			});
		});
		
		
		
	}, [ ] ); 
	
	useEffect( ()=>{
		AsyncStorage.getItem("techs")
		.then(storaged =>{
			const techsArray = storaged.split(",")
			.map(tech => tech.trim());
			
			setTechs(techsArray);
		})
	}, [ ]);
	
	async function logout(){
		await AsyncStorage.removeItem("user");
		navigation.navigate("Login")
	};
	
	return(
		<SafeAreaView style={ styles.container } >
			<Image style={ styles.logo } source={ logo } />
			<ScrollView>
		{ techs.map( tech=> <SpotList key={ tech } tech={ tech } />) }
			
			<TouchableOpacity onPress={ logout }><Text >Logout</Text></TouchableOpacity> 
		</ScrollView>
		</SafeAreaView>
		
	);
};



const styles = StyleSheet.create ({
	container:{
		flex:1,
	},
	logo:{
		height:32,
		resizeMode:"contain",
		alignSelf:"center", 
		marginTop:35,
	},
	
});