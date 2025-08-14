//npm install react-native-phone-number-input
//npm install react-native-picker-select
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView, Platform,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import PhoneInput from 'react-native-phone-number-input';
import RNPickerSelect from 'react-native-picker-select';
 
export default function SignupScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [country, setCountry] = useState('');

  const handleSignup = () => {
    if (!fullName || !email || !phoneNumber || !gender || !address1 || !pincode || !city || !stateVal || !country) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    Alert.alert('Success', 'Account created successfully!');
  };

  return (
    <KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  style={{ flex: 1, backgroundColor: '#fff' }}
>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.heading}>Create Account</Text>
          <Text style={styles.subheading}>Fill in the details below</Text>

          {/* Full Name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput style={styles.input} placeholder="Enter full name" value={fullName} onChangeText={setFullName} />

          {/* Email */}
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Enter email" value={email} onChangeText={setEmail}
            keyboardType="email-address" autoCapitalize="none" />

          {/* Phone Number */}
          <Text style={styles.label}>Phone Number</Text>
          <PhoneInput defaultValue={phoneNumber} defaultCode="IN" layout="first"
            onChangeFormattedText={text => setPhoneNumber(text)} containerStyle={{ marginBottom: 15 }} />

          {/* Gender */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderContainer}>
            {['Male', 'Female', 'Other'].map(g => (
              <TouchableOpacity key={g}
                style={[styles.genderOption, gender === g && styles.genderSelected]}
                onPress={() => setGender(g)}>
                <Text style={{ color: gender === g ? '#fff' : '#444' }}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Address */}
          <Text style={styles.label}>Address Line 1</Text>
          <TextInput style={styles.input} placeholder="Enter address line 1" value={address1} onChangeText={setAddress1} />

          <Text style={styles.label}>Address Line 2</Text>
          <TextInput style={styles.input} placeholder="Enter address line 2" value={address2} onChangeText={setAddress2} />

          {/* Pincode */}
          <Text style={styles.label}>Pincode</Text>
          <TextInput style={styles.input} placeholder="Enter pincode" value={pincode}
            onChangeText={setPincode} keyboardType="numeric" />

          {/* City Dropdown */}
          <Text style={styles.label}>City</Text>
          <RNPickerSelect
            onValueChange={(value) => setCity(value)}
            items={[
              { label: 'Mumbai', value: 'Mumbai' },
              { label: 'Delhi', value: 'Delhi' },
              { label: 'Bangalore', value: 'Bangalore' },
              { label: 'Chennai', value: 'Chennai' },
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: 'Select City', value: null }}
          />

          {/* State Dropdown */}
          <Text style={styles.label}>State</Text>
          <RNPickerSelect
            onValueChange={(value) => setStateVal(value)}
            items={[
              { label: 'Maharashtra', value: 'Maharashtra' },
              { label: 'Delhi', value: 'Delhi' },
              { label: 'Karnataka', value: 'Karnataka' },
              { label: 'Tamil Nadu', value: 'Tamil Nadu' },
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: 'Select State', value: null }}
          />

          {/* Country Dropdown */}
          <Text style={styles.label}>Country</Text>
          <RNPickerSelect
            onValueChange={(value) => setCountry(value)}
            items={[
              { label: 'India', value: 'India' },
              { label: 'United States', value: 'United States' },
              { label: 'United Kingdom', value: 'United Kingdom' },
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: 'Select Country', value: null }}
          />

          {/* Submit */}
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, paddingHorizontal: 20, paddingVertical: 20 },
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },

  heading: { fontSize: 28, fontWeight: '700', color: '#3C4F76', textAlign: 'center' },
  subheading: { fontSize: 15, color: '#777', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '500', color: '#444', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', backgroundColor: '#F5F7FA', padding: 12, borderRadius: 10, fontSize: 15, marginBottom: 15 },
  genderContainer: { flexDirection: 'row', marginBottom: 15 },
  genderOption: { flex: 1, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#E0E0E0', alignItems: 'center', marginHorizontal: 5 },
  genderSelected: { backgroundColor: '#95D09C', borderColor: '#95D09C' },
  button: { backgroundColor: '#95D09C', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10, elevation: 4 },
  buttonText: { color: '#fff', fontSize: 17, fontWeight: '600' }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F7FA',
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 15
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#F5F7FA',
    padding: 12,
    borderRadius: 10,
    fontSize: 15,
    marginBottom: 15
  }
});
