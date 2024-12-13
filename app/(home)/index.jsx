import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet, ScrollView } from 'react-native';

function LogoTitle() {
  return (
    <Image style={styles.image} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
  );
}

export default function Home() {
  return (
    <ScrollView>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 8 }}>Good Morning, Chelsea</Text>
          <Text style={{ fontSize: 18 }}>Check all your incoming and outgoing transactions here</Text>
        </View>
        <Image source={require('../../assets/sun.png')} style={{ width: 81, height: 77 }} />
      </View>
    </ScrollView>
  );
}

const user = {
  fullname: 'Chelsea Immanuela',
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 50,
    height: 50,
  },
});
