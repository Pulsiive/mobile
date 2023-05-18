import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
const numColumns = 2;

export const AppStyles = {
  color: {
    main: '#5ea23a',
    text: '#696969',
    title: '#464646',
    subtitle: '#545454',
    categoryTitle: '#161616',
    tint: '#7fb27c',
    description: '#bbbbbb',
    filterTitle: '#8a8a8a',
    starRating: '#2bdf85',
    location: '#a9a9a9',
    white: 'white',
    facebook: '#337472',
    grey: 'grey',
    greenBlue: '#00aea8',
    placeholder: '#a0a0a0',
    background: '#f2f2f2',
    blue: '#3293fe'
  },
  fontSize: {
    title: 30,
    content: 20,
    normal: 16
  },
  buttonWidth: {
    main: '70%'
  },
  textInputWidth: {
    main: '80%'
  },
  borderRadius: {
    main: 25,
    small: 5
  }
};

export const AppIcon = {
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 8,
    marginRight: 10
  },
  style: {
    tintColor: AppStyles.color.tint,
    width: 25,
    height: 25
  },
  images: {
    home: require('../assets/icons/home.png'),
    profile: require('../assets/icons/profile_2.png'),
    logout: require('../assets/icons/shutdown.png'),
    menu: require('../assets/icons/menu.png'),
    settings: require('../assets/icons/settings.png'),
    leftArrow: require('../assets/icons/left_arrow.png'),
    station: require('../assets/icons/plug.png'),
    station_img: require('../assets/icons/station.png'),
    messages: require('../assets/icons/messages.png'),
    mapicon: require('../assets/icons/mapicon.png'),
    map: require('../assets/icons/map.png'),
    planning: require('../assets/icons/planning.png'),
    heart: require('../assets/icons/heart.png'),
    charger1: require('../assets/images/charger1.jpg'),
    charger2: require('../assets/images/charger2.jpg'),
    charger3: require('../assets/images/charger3.jpg'),
    phone: require('../assets/icons/phone.png'),
    remove: require('../assets/icons/remove.png')
  }
};

export const ListStyle = StyleSheet.create({
  title: {
    fontSize: 16,
    color: AppStyles.color.subtitle,
    fontWeight: 'bold'
  },
  subtitleView: {
    minHeight: 55,
    flexDirection: 'row',
    paddingTop: 5,
    marginLeft: 10
  },
  leftSubtitle: {
    flex: 2
  },
  avatarStyle: {
    height: 80,
    width: 80
  }
});
