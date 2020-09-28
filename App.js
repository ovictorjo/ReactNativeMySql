import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import RadioForm from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import Loading from 'react-native-whc-loading';
import Image from 'react-native-image-progress';

import {
  StyleSheet,
  Text, View,
  ScrollView,
  KeyboardAvoidingView,
  Picker,
  TextInput,
  TouchableHighlight
} from 'react-native';

const img_loading = require('./src/assets/loading.gif');
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      statusOptions: ['Ativo', 'Inativo'],
      radio_props: [
        { label: 'Masculino', value: 'M' },
        { label: 'Feminino', value: 'F' }
      ],

      formData: {
        nome: "",
        email: "",
        sexo: null,
        dt_nascimento: "",
        status: ""
      },
    };
  }

  render() {

    const {
      nome,
      email,
      sexo,
      dt_nascimento,
      status,
    } = this.state.formData;


    return (

      <ScrollView>
        <KeyboardAvoidingView style={styles.container}>

          <View style={styles.row}>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              style={styles.txtInput}
              underlineColorAndroid="#1A8"
              onChangeText={nome => this.setState(prevState => ({
                formData: {
                  ...prevState.formData,
                  nome
                },
              }))}
              value={nome}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.txtInput}
              underlineColorAndroid="#1A8"
              keyboardType="email-address"
              onChangeText={email => this.setState(prevState => ({
                formData: {
                  ...prevState.formData,
                  email
                },
              }))}
              value={email}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Data de Nascimento:</Text>
            <DatePicker
              date={dt_nascimento}
              style={{ width: '100%' }}
              format="D-MM-Y"
              placeholder="Selecione a data de nascimento"
              mode="date"
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  right: 0,
                  top: 4,
                  marginLeft: 0
                }
              }}
              onDateChange={dt_nascimento => this.setState(prevState => ({
                formData: {
                  ...prevState.formData,
                  dt_nascimento
                },
              }))}
              value={dt_nascimento}
            />
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, { marginBottom: 10 }]}>Sexo:</Text>
            <RadioForm
              radio_props={this.state.radio_props}
              initial={0}
              labelStyle={{ paddingRight: 20 }}
              formHorizontal={true}
              labelHorizontal={true}
              buttonColor={'#1A8'}
              animation={true}
              onPress={sexo => this.setState(prevState => ({
                formData: {
                  ...prevState.formData,
                  sexo
                },
              }))}
              value={sexo}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Status:</Text>
            <Picker
              style={{ height: 50 }}
              selectedValue={status}
              onValueChange={status =>
                this.setState(prevState => ({
                  formData: {
                    ...prevState.formData,
                    status
                  },
                }))
              }
            >
              {
                this.state.statusOptions.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item}
                    value={item.toLocaleLowerCase()}
                  />
                ))
              }

            </Picker>
          </View>

          <View style={styles.row}>
            <TouchableHighlight
              style={styles.btnContainer}
              onPress={this._saveData}
            >
              <Text style={styles.txtBtn}>SALVAR</Text>
            </TouchableHighlight>
          </View>

        </KeyboardAvoidingView>

        <Loading
          ref="loading"
          image={img_loading}

        />
      </ScrollView >
    )
  }

  _saveData = async () => {
    this.refs.loading.show();
    try {
      await fetch('http://10.0.0.117/api/service_crud.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.formData)
      })
        .then((response) => response.json())
        .then((json) => {
          setTimeout(() => {
            this.refs.loading.close();
            alert(JSON.stringify(json.message));
          }, 2000);
        })
        .catch((error) => {
          console.error(error);
          this.refs.loading.close();
        });
    } catch (error) {
      this.refs.loading.close();
      alert(error);
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  row: {
    marginBottom: 20
  },
  label: {
    color: '#444',
    fontSize: 20
  },
  btnContainer: {
    backgroundColor: '#1A8',
    padding: 10,
    alignItems: 'center',
  },
  txtBtn: {
    fontSize: 20,
    color: '#fff',
  },
  txtInput: {
    height: 40,
    fontSize: 20,
    fontSize: 16,
    color: '#444'
    //borderColor: 'gray',
    //borderWidth: 0
  }
});


export default App;
