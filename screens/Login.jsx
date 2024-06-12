import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, ImageBackground, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import styles from '../styles/styles';
import { LinearGradient } from 'expo-linear-gradient';
import { DataContext } from '../context/DataContext';

 const Login =({ navigation }) =>{

  const {setUserName} = useContext(DataContext);
  const screenWidth = Dimensions.get('window').width;

  let inputWidth = screenWidth * 0.8;

  if (screenWidth > 600) {
    inputWidth = 400;
  }

  const [error, setError] = useState('');
  //const [username, setUsername] = useState('');
  //const [password, setPassword] = useState('');

  const { control, handleSubmit, formState: { errors } } = useForm({
  defaultValues: {
  username: "",
  password: "",
  },
  });   

  const onSubmit = async (data) => { 
    const {username, password} = data;
    try {
      const response = await axios.post('http://148.113.142.238:3000/api/employees/byusername', { username, password });
      const user = response.data;
      console.log(data)
      if (user && user.role) {
        setUserName(username);
        switch (user.role) {
          case 'Admin':
            navigation.navigate('Admin',{username});
            break;
          case 'Mesero':
            navigation.navigate('HomeMesas',{username});            
            break;
          case 'Cocina':
            navigation.navigate('PendingOrders',{username});
            break;
          case 'cajero':
            navigation.navigate('Cajero',{username});
            break;
          default:
            setError('Rol de usuario no válido');
            break;
        }
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error al autenticar:', error);
      setError('Error al iniciar sesión');
    }    
  };

  return (
    <ImageBackground 
      source={require('../images/bg.webp')}
      style={[styles.img_background]}>
      <LinearGradient style={[styles.container_login,{width:'100%'}]} colors={['rgba(105,27,53,0.2)', 'transparent']}>
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
          maxLength: 50,
          //pattern: /^[a-zA-z\s]+$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Usuario"            
            textColor='black'
            style={[styles.input,{width:inputWidth}]}      
            activeUnderlineColor='#540B24'              
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            left={<TextInput.Icon icon="account" color={'#540B24'} />}
          />
        )}
        name="username"
      />
      {errors.username?.type === "required" && <Text style={{ color: 'white' }}>El nombre es obligatorio.</Text>}
      {errors.username?.type === "maxLength" && <Text style={{ color: 'white' }}> La longitud no debe de exceder 50 chars.</Text>}
      {errors.username?.type === "minLength" && <Text style={{ color: 'white' }}> La longitud minima es de 3 chars.</Text>}
      {/* {errors.username?.type === "pattern" && <Text style={{ color: 'red' }}> El nombre debe contener solo letras y/o espacios</Text>} */}

      <Controller
        control={control}
        rules={{
          required: true,
          //pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{3,}$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            secureTextEntry
            label="Contraseña"
            textColor='black'
            style={[styles.input,{width:inputWidth}]}
            activeUnderlineColor='#540B24'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            left={<TextInput.Icon icon="lock-outline" color={'#540B24'} />}
          />
        )}
        name="password"
      />
      {errors.password?.type === "required" && <Text style={{ color: 'white' }}>La contraseña es obligatoria.</Text>}
      {errors.password?.type === "pattern" && <Text style={{ color: 'white' }}> La contraseña debe contener minimo 8 caracteres validos</Text>}

      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <Button 
        style={{
          backgroundColor:'#530B24', 
          width: inputWidth, 
          height:55, 
          padding:5,        
          }} icon="login" mode="contained" onPress={handleSubmit(onSubmit)}>
        Iniciar Sesión
      </Button>
      </LinearGradient>
    </ImageBackground>
  );
}

export default Login;
