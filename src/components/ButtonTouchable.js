import React from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { AppIcon, AppStyles } from '../AppStyles';
import ButtonText from './ButtonText';

{
  /*
  <ButtonTouchable
    title(required)="ButtonTouchable" // text of the button
    onPress(required)={() => onPress()} // function called when the button is pressed
    style(optional)={{ insert style here }} // to change the style
    icon(optional)="icon-name" // to put or not an icon
    image(optional)="image-name" // to put or not an icon
  />
  */
}

const ButtonTouchable = ({ title, subtext, onPress, icon, image, action }) => {
  const handlePress = () => {
    if (onPress) onPress();
  };

  return (
    <TouchableHighlight
      onPress={handlePress}
      underlayColor={AppStyles.color.pressed}
      style={styles.container}
    >
      <View style={styles.contentWrapper}>
        <View style={styles.leftContent}>
          {icon && <Icon name={icon} size={24} color={'black'} />}
          {image && <Image source={image[0]} style={{ width: image[1], height: image[1] }} />}
          <View style={styles.textContainer}>
            <Text style={styles.ButtonTouchableText}>{title}</Text>
            {subtext && <Text style={AppStyles.subtext}>{subtext}</Text>}
          </View>
        </View>
        <Icon name={action ? action : 'chevron-right'} size={20} color={'black'} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    width: AppStyles.buttonWidth,
    paddingVertical: '4%',
    borderBottomColor: AppStyles.color.lightgrey,
    borderBottomWidth: 1,
    backgroundColor: AppStyles.color.transparent,
    alignSelf: 'center'
  },
  contentWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginRight: 24
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: '20%'
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 16
  },
  ButtonTouchableText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: '300',
    fontSize: 16
  }
});

export default ButtonTouchable;
