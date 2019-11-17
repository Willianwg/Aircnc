import React, { useState } from "react"; 
import { SafeAreaView, Alert , AsyncStorage, View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import api from "../services/api";

export default function Book({ navigation }){
	const id = navigation.getParam("id");
	const  [ date , setDate] = useState("");
	
	async function handleSubmit(){
		const user_id  = await AsyncStorage.getItem("user");
		await api.post(`/spots/${id}/bookings`, { date }, { headers:{ user_id } });
		
		Alert.alert("Solicitação de reserva enviada");
		
		navigation.navigate("List");
	};
	
	function handleCancel (){
		navigation.navigate("List");
	};
	
	return(
		<SafeAreaView style={ styles.container }>
			
				<Text style={ styles.label }>
					DATA DE INTERESSE *
				</Text>
				<TextInput
				 placeholder="Qual data você quer reservar? "
				autoCapitalize="words"
				autoCorrect={false}
				style={ styles.input }
				placeholderTextColor="#999"
				value ={ date }
				onChangeText={ setDate }/>
				
				<TouchableOpacity style={styles.button} onPress={ handleSubmit }>
					<Text style={styles.buttonText}>Solicitar reserva</Text>
				</TouchableOpacity>
				
				<TouchableOpacity style={ [styles.button, styles.cancelButton] } onPress={ handleCancel }>
					<Text style={styles.buttonText}>Cancelar</Text>
				</TouchableOpacity>
			
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container:{
		margin:30,
	},
	label:{
		fontWeight:"bold",
		marginBottom:8,
		color:"#444",
		marginTop:30,
	},
	form:{
		alignSelf:"stretch",
		paddingHorizontal:30,
		marginTop:30,
	},
	input:{
		borderWidth:1,
		borderColor:"#ddd",
		paddingHorizontal:20,
		color:"#444",
		height:44,
		marginBottom:20,
		borderRadius:2,
		
	},
	button:{
		backgroundColor:"#f05a5b",
		height:42,
		alignItems:"center" ,
		justifyContent:"center",
		borderRadius:2,	
	},
	buttonText:{
		color:"#fff",
		fontSize:16,
		fontWeight:"bold",
	},
	
	cancelButton:{
		backgroundColor:"#ccc",
		marginTop:10,
	},

}); 