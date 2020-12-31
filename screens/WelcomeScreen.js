import React,{Component} from 'react'
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView, Modal, KeyboardAvoidingView} from 'react-native'
import firebase from 'firebase';
import db from "../config";


export default class WelcomeScreen extends Component{
    constructor(){
       super();
       this.state={
           emailid:"",
           password:"",
           isModalVisible:'false',
           firstName:"",
           lastName:"",
           address:"",
           contact:"",
           confirmPassword:"",
       };
       
    }

    userSignUp=(emailid, password, confirmPassword)=>{
        if(password!==confirmPassword){
            return Alert.alert("Password doesn't match")
        }
        else {
          
        
        firebase.auth().createUserWithEmailAndPassword(emailid, password)
        .then((response)=>{

            return Alert.alert("User added!")
        })
        .catch(function(error){
            var errorCode=error.code;
            var errorMessage=error.message;
            return Alert.alert(errorMessage);
        })

        db.collection('users').add({
            first_name:this.state.firstName,
            last_name:this.state.lastName,
            address:this.state.address,
            contact:this.state.contact,
            password:this.state.password,
            emailid:this.state.emailid
        })
    }
    }

    userLogin=(emailid, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailid, password)
        .then((response)=>{
            return Alert.alert("Login Successful!")
        })
        .catch(function(error){
            var errorCode=error.code;
            var errorMessage=error.message;
            return Alert.alert(errorMessage);
        })
    }

    showModal=()=>{
        return(
            <Modal 
            animationType="fade" 
            transparent={true}
            visible={this.state.isModalVisible}>
             <View style={styles.modalContainer}>
                 <ScrollView style={{width:'100%' 
                }}> 

                <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
<Text style={styles.modalTitle}>
Sign Up
</Text>
<TextInput 
style={styles.formTextInput}
placeholder={"First Name"}
maxLength={12}
onChangeText={(text)=>{
    this.setState({firstName:text})
}}/>
<TextInput 
style={styles.formTextInput}
placeholder={"Last Name"}
maxLength={12}
onChangeText={(text)=>{
    this.setState({lastName:text})}
    }
    />

<TextInput 
style={styles.formTextInput}
placeholder={"Address"}
multiline={true}
onChangeText={(text)=>{
    this.setState({address:text})
}}/>

<TextInput 
style={styles.formTextInput}
placeholder={"Contact"}
maxLength={10}
onChangeText={(text)=>{
    this.setState({contact:text})
}}/>

<TextInput placeholder='ABC@gmail.com' keyboardType='email-address' style={styles.formTextInput}
                onChangeText={(text)=>{
                    this.setState({
                    emailid:text
                    });
                }}
                />

                <TextInput secureTextEntry={true} placeholder='enter password' style={styles.formTextInput} onChangeText={(text)=>{
                    this.setState({
                   password:text
                 });
                }}/>

<TextInput secureTextEntry={true} placeholder='confirm password' style={styles.formTextInput} onChangeText={(text)=>{
                    this.setState({
                   confirmPassword:text
                 });
                }}/>

<View style={styles.modalBackButton}>
<TouchableOpacity style={styles.registerButton} onPress={()=>{
    this.userSignUp(this.state.emailid, this.state.password, this.state.confirmPassword)
}}>
<Text style={styles.registerButtonText}>
Register
</Text>
</TouchableOpacity>


</View>

<View style={styles.modalBackButton}>
    <TouchableOpacity style={styles.cancelButton} onPress={()=>{
        this.setState({isModalVisible:false})
    }}>

        <Text style={{color:'#FF5722'}}>
            Cancel
        </Text>
    </TouchableOpacity>
</View>
                </KeyboardAvoidingView>

                 </ScrollView>

             </View>
            </Modal>
        )
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{justifyContent:"center", alignItems:"center"}}>
                   {
                       this.showModal()
                   }
                </View>
                <View style={styles.profileContainer}><Text style={styles.title}>Book Santa</Text></View>
                <View style={styles.buttonContainer}>
                <TextInput placeholder='ABC@gmail.com' keyboardType='email-address' style={styles.loginBox}
                onChangeText={(text)=>{
                    this.setState({
                    emailid:text
                    });
                }}
                />

                <TextInput secureTextEntry={true} placeholder='enter password' style={styles.loginBox} onChangeText={(text)=>{
                    this.setState({
                   password:text
                 });
                }}/>
       <TouchableOpacity style={styles.button} onPress={()=>{this.setState({
           isModalVisible:true
       })}}>
           <Text style={styles.buttonText}>Signup</Text></TouchableOpacity>

       <TouchableOpacity style={styles.button} onPress={()=>{this.userLogin(this.state.emailid, this.state.password)}}>
           
           <Text style={styles.buttonText}>Login</Text></TouchableOpacity>

            </View>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFB6c1',
    },

    title:{
        fontSize:32,
        fontWeight:300,
        color: 'white'
    },

    loginBox:{
        width:300,
        height:40,
        borderBottomWidth:1.5,
        borderColor:"white",
        fontSize:18,
        margin:10,
        paddingLeft:10,
    },

    button:{
        width:300,
        height:50,
        justifyContent:"center",
        borderRadius:25,
        backgroundColor:"white",
        shadowColor: "black",
        shadowOffset:{width:0,height:8},
        shadowOpacity:0.3,
        shadowRadius:10.5,
        elevation:16,
    },

    buttonText:{
        fontWeight:200,
        fontSize:20,
        color:"black",
        justifyContent:"center",
    },

    profileContainer:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
    },

    buttonContainer:{
        flex:1,
        alignItems:"center",
    }
})