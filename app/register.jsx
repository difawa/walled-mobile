import { Link, router, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet, TextInput, Alert, Modal, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import Checkbox from 'expo-checkbox'
import { useState } from 'react';
import {z} from 'zod';
import axios from 'axios';

const RegisSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Must be 8 or more characters long" }),
});

export default function Register() {
  const [isChecked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const termsandconditions = `1. Acceptance of Terms
By creating an account or using our services, you agree to be bound by these Terms and Conditions, as well as our Privacy Policy. If you do not agree, please discontinue the use of the application.

2. Eligibility
You must be at least 18 years old and legally capable of entering into binding agreements to use our services.

3. Account Security
You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. Notify us immediately of any unauthorized access or suspicious activity.

4. Services Provided
The app allows users to store, transfer, and manage funds. We may update, add, or remove features without prior notice.

5. Fees and Charges
Some services may incur fees, which will be displayed before you complete a transaction. You are responsible for any applicable charges.

6. Prohibited Activities
You agree not to use the app for illegal activities, fraud, money laundering, or violating any laws or regulations.

7. Transaction Limits
We may impose daily, weekly, or monthly limits on transactions for security or regulatory reasons.

8. Liability
We are not liable for losses resulting from unauthorized transactions caused by your negligence or failure to secure your account.

9. Termination of Services
We reserve the right to suspend or terminate your account at any time for violation of these Terms or any suspicious activities.

10. Modifications to Terms
We may update these Terms from time to time. Continued use of the app after updates constitutes acceptance of the revised Terms.

11. Governing Law
These Terms are governed by the laws of walled. Any disputes will be resolved in the courts of walled.

12. Contact Information
For any questions or concerns regarding these Terms, please contact us at support@walled.com.

Disclaimer: This is a general template and should be reviewed by a legal professional to ensure compliance with local laws and regulations.`;

const [form, setForm] = useState({"fullname": "", "username": "", "email": "", "password": "" });
const [errorMsg, setErrors] = useState({});

const handleInputChange = (key, value) => {
  setForm({ ...form, [key]: value });
  try {
    RegisSchema.pick({ [key]: true }).parse({ [key]: value });
    setErrors((prev) => ({ ...prev, [key]: "" }));
  } catch (err) {
    setErrors((prev) => ({ ...prev, [key]: err.errors[0].message }));
  }
};

const handleSubmit = async() => {
  try {
    RegisSchema.parse(form);
    await axios.post("http://192.168.176.179:8081/auth/register", form);
    Alert.alert("Success", "Registration is success! Please login.");
    router.replace("/")
  } catch (err) {
    console.log('test')
    Alert.alert("Failed", `Registration failed, ${err.response.data.error}. Try other email or username!`);
  }
};
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Fullname"
        placeholderTextColor="#aaa"
        keyboardType='ascii-capable'
        onChangeText={(text) => handleInputChange("fullname", text)}
        value={form.fullname}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#aaa"
          onChangeText={(text) => handleInputChange("username", text)}
          value={form.username.toLowerCase()}
          />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType='email-address'
        onChangeText={(text) => handleInputChange("email", text)}
        value={form.email.toLowerCase()}
        />
        {errorMsg.email ? <Text style={styles.errorMsg}>{errorMsg.email}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        keyboardType='password'
        onChangeText={(text) => handleInputChange("password", text)}
        value={form.password}
      />
      {errorMsg.password ? <Text style={styles.errorMsg}>{errorMsg.password}</Text> : null}

      <View style={styles.tnc}>
        <Checkbox value={isChecked} onValueChange={setChecked} />
        <Text style={{ maxWidth: '90%' }}>I have read and agree to the
          <Pressable onPress={() => setModalVisible(!modalVisible)}>
            <Text style={{ color: '#19918F' }}>
              Terms and Conditions <Text style={{ color: 'red' }}>*</Text>
            </Text>
          </Pressable>
        </Text>
      </View>

      <Button text="Register" marginTop={48} marginBottom={16} handlePress={handleSubmit} />
      <Text>Have an account? <Link href="/" style={{ color: '#19918F' }}>Login here</Link> </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        >
        <ScrollView>
          <View style={styles.modalView}>
          <Text style={{fontWeight: 'bold', fontSize: 20, marginBottom: 20}}>Terms and Conditions</Text>
            <Text style={styles.modalText}>{termsandconditions}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </ScrollView>
      </Modal>
      
      <StatusBar style="auto" />
    </View > 
  );    
}    

const styles = StyleSheet.create({
  tnc: {    
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  logo: {
    width: 233,
    height: 57,
    marginBottom: 30,
    resizeMode: 'stretch',
    marginBottom: 75
  },
  checkbox: {
    margin: 8
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'justify',
  },
  errorMsg: {
    color: "red",
    fontSize: 12,
    width: "100%",
    textAlign: "left",
  }
});
