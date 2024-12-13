import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet, ScrollView } from 'react-native';

function LogoTitle() {
  return (
    <Image style={styles.image} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
  );
}

export default function Home() {
  return (
    <ScrollView containerStyle={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Image source={require('../../assets/avatar.png')} style={{ width: 50, height: 50 }} />
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{user.fullname}</Text>
            <Text style={{ fontSize: 20 }}>{user.typeofaccount}</Text>
          </View>
        </View>
        <Image source={require('../../assets/suntoggle.png')} />
      </View>
      <View style={{ backgroundColor: '#FAFBFD', paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 25, justifyContent: 'space-between' }}>
          <View style={{ width: '70%' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Good Morning, {user.fullname.split(' ')[0]}</Text>
            <Text style={{ fontSize: 18 }}>Check all your incoming and outgoing transactions here</Text>
          </View>
          <Image source={require('../../assets/sun.png')} style={{ width: 81, height: 77 }} />
        </View>

        <View style={styles.accountnumber}>
          <Text style={{ color: '#fff', fontSize: 18 }}>Account No.</Text>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>{user.accountnumber}</Text>
        </View>

      </View>
    </ScrollView>
  );
}

const user = {
  fullname: 'John Doe',
  typeofaccount: 'Personal Account',
  accountnumber: '123456789'
}

const styles = StyleSheet.create({
  accountnumber: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#19918F',
    marginTop: 30,
    borderRadius: 10
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 12,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1
  },
  image: {
    width: 50,
    height: 50,
  },
});
