import axios from 'axios'; //http library
import { router } from 'expo-router';
import React, { useState } from 'react'; //Data handling
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; //components

export default function LoginScreen(){
    const [email,setEmail] = useState('');//Email Handling
    const [password, setPassword] = useState(''); //Password handling
    const [loading, setLoading] = useState(false);//Loading handling

    const handleLogin = () => {
        if(!email || !password){
            Alert.alert("Error","Please fill all the details");
            return;
        }
        setLoading(true);

        axios.post('https://tarunbansal.co.in/android/react/login.php',{email,password}).then(
            response => {
                const res = response.data;
                if(res.success){
                    Alert.alert("Congratulations",res.message);
                    router.replace('/dashboard');
                }else{
                    Alert.alert("Error","Email or Password is invalid");
                }
            }).
        catch(error=>{
                Alert.alert("Error","Server Error 500")
            }).
        finally(()=>{
                setLoading(false);
            });
    };

    const goToRegister = ()=>{
        router.push('/signup');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios'?'padding':undefined}
            style={{flex:1,backgroundColor:"#fff"}}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
            >
                <View style={styles.container}>
                    <Image
                        source={require('../assets/images/login-top.png')}

                        style = {styles.image}
                    />
                    <Text style={styles.heading}>Welcome Back</Text>
                    <Text style={styles.subheading}>Signin to continue to your account</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            placeholder='Enter your email'
                            value={email}
                            onChangeText={setEmail}
                            keyboardType='email-address'
                            autoCapitalize='none'
                             style={styles.input}
                        />
                    </View>


                    <View>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            placeholder='Enter your password'
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                             style={styles.input}
                        />
                    </View>           

                    <TouchableOpacity
                        onPress={handleLogin}
                        disabled={loading}
                        style = {[styles.button,loading && styles.disabledButton]}
                    >
                        {loading?(
                            <ActivityIndicator size={'small'} color={'#fff'}/>
                        ):(
                            <Text>
                                Sign In
                            </Text>
                        )
                        }
                    
                    </TouchableOpacity>   

                    <View style={styles.registrationContainer}>
                        <Text style={styles.registrationText}>Don't have an account?</Text>
                        <TouchableOpacity
                            onPress={goToRegister}
                             style={styles.registrationContainer}
                        >
                            <Text>Create Account</Text>
                        </TouchableOpacity>
                    </View>      
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    scrollContainer:{
        flexGrow:1,
        justifyContent:'center'
    },

    container:{
        flex:1,
        paddingHorizontal:25,
        paddingVertical:40,
        backgroundColor:'#fff'
    },

    image:{
        width:'100%',
        height:200,
        resizeMode:'contain',
        marginBottom:10
    },

    heading:{
        fontSize:30,
        fontWeight:'bold',
        color:'#95D09C',
        textAlign:'center',
        marginBottom:5
    },

    subheading:{
        fontSize:16,
        color:'#777',
        textAlign:'center',
        marginBottom:30
    },

    inputContainer:{
        marginBottom:15
    },

    label:{
        fontSize:14,
        fontWeight:500,
        color:'#444',
        marginBottom:5
    },

    input:{
        borderWidth:1,
        borderColor:'#95D09C',
        backgroundColor:'#edededff',
        padding:10,
        borderRadius:10,
        fontSize:15
    },

    button:{
        backgroundColor:'#95D09C',
        padding:15,
        borderRadius:8,
        alignItems:'center',
        marginTop:15,
    },

    disabledButton:{
        opacity:0.7
    },

    buttonText:{
        color:'#fff',
        fontSize:15,
        fontWeight:600
    },

    registrationContainer:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:25
    },

    registrationText:{
        color:'#555',
        fontSize:12
    },

    registrationButton:{
        color:'#95D09C',
        fontWeight:600,
        fontSize:12
    }


});

