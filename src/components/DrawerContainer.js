import React from 'react';
import { StyleSheet, View } from 'react-native';
import MenuButton from './MenuButton';
import { AppIcon } from '../AppStyles';

export default function DrawerContainer({ navigation }) {
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="Stations"
          source={AppIcon.images.station}
          onPress={() => {
            navigation.navigate('Stations');
          }}
        />
        <MenuButton
          title="Contacts"
          source={AppIcon.images.station}
          onPress={() => {
            navigation.navigate('Contacts');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20
  }
});
