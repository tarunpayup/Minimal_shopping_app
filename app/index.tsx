import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export default function Index(){
    useEffect(()=>{
        const timer = setTimeout(
            () =>{
                router.replace("/login_firebase")
            },2500
        );
        return () => clearTimeout(timer);
    },[]);

    return(
        <View style={styles.container}>
            <Text style={styles.title}>
                Shopping App
            </Text>
            <ActivityIndicator size={"large"} color="#ffffff"/>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:{
            flex:1,
            backgroundColor:"#FFB1BB",
            alignItems:"center",
            justifyContent:"center"
        },

        title:{
            fontSize:30,
            fontWeight:"bold",
            color:"#ffffff",
            marginBottom:50

        }
    }
);


