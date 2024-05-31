// En Login.js

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';

 const Login =({ navigation }) =>{
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
        
        switch (user.role) {
          case 'Admin':
            navigation.navigate('Admin');
            break;
          case 'Mesero':
            navigation.navigate('HomeMesas');            
            break;
          case 'chef':
            navigation.navigate('Chef');
            break;
          case 'cajero':
            navigation.navigate('Cajero');
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
    <View style={styles.container}>
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
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            left={<TextInput.Icon icon="account-edit" color={'black'} />}
          />
        )}
        name="username"
      />
      {errors.username?.type === "required" && <Text style={{ color: 'red' }}>El nombre es obligatorio.</Text>}
      {errors.username?.type === "maxLength" && <Text style={{ color: 'red' }}> La longitud no debe de exceder 50 chars.</Text>}
      {errors.username?.type === "minLength" && <Text style={{ color: 'red' }}> La longitud minima es de 3 chars.</Text>}
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
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            left={<TextInput.Icon icon="lock-outline" color={'black'} />}
          />
        )}
        name="password"
      />
      {errors.password?.type === "required" && <Text style={{ color: 'red' }}>La contraseña es obligatoria.</Text>}
      {errors.password?.type === "pattern" && <Text style={{ color: 'red' }}> La contraseña debe contener minimo 8 caracteres validos</Text>}

      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <Button style={{backgroundColor:'#530B24', width: '80%', height:'300'}} icon="login" mode="contained" onPress={handleSubmit(onSubmit)}>
        Iniciar Sesión
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white',
    backgroundColor: '#16161C',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  input: {
    backgroundColor: '#F2F2F2',
    color: 'black',
    borderColor: '#F8F6F1',
    borderRadius: 7,
    borderWidth: 2,
    padding: 10,
    margin: 10,
    width: '80%',
  },
});

export default Login;