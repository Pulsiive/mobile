import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  PermissionsAndroid,
  Pressable,
  Modal,
  SafeAreaView,
  ScrollView
} from 'react-native';

import Button from 'react-native-button';
import { AppStyles } from '../../AppStyles';

import MapboxGL from '@rnmapbox/maps';
// import GetLocation from 'react-native-get-location';
import Geolocation from 'react-native-geolocation-service';

import Icon from 'react-native-vector-icons/Entypo';

MapboxGL.setAccessToken(
  'pk.eyJ1Ijoic2h5bGsiLCJhIjoiY2w0cmhncHdwMDZydTNjcDhkbTVmZm8xZCJ9.uxYLeAuZdY5VMx4EUBaw_A'
);
MapboxGL.setConnected(true);

function Map({ navigation }) {
  const [userPosition, setUserPosition] = useState([0, 0]);
  const [nightMode, setNightMode] = useState(false);
  const [filtersMenu, setFiltersMenu] = useState(false);

  const [modalData, setModalData] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const setModal = (charger) => {
    setModalVisible(true);
    setModalData({
      // name: props.event.properties.id,
      // location: props.event.geometry.coordinates,
      charger: charger
    });
  };

  const [filterType, setFilterType] = useState(false);
  const [filterPrice, setFilterPrice] = useState(false);
  const [filterStatut, setFilterStatut] = useState(false);
  const [filterRating, setFilterRating] = useState(false);

  const [savedFitlers1, setSavedFilters1] = useState({
    savedFilterType: false,
    savedFilterPrice: false,
    savedFilterStatut: false,
    savedFilterRating: false
  });
  const [savedFitlers2, setSavedFilters2] = useState({
    savedFilterType: false,
    savedFilterPrice: false,
    savedFilterStatut: false,
    savedFilterRating: false
  });
  const [filterSelect, setFilterSelect] = useState(0);

  const checkFilters = (charger) => {
    if (filterType && charger.type != filterType) return false;
    if (filterPrice && charger.pricing > filterPrice) return false;
    if (filterStatut) {
      if (filterStatut == 'Public' && !charger.public) return false;
      if (filterStatut == 'Private' && charger.public) return false;
    }
    if (filterRating && charger.rating < filterRating) return false;
    return true;
  };

  const FiltersComponent = () => {
    const clear = () => {
      setFilterSelect(0);
      setFilterType(false);
      setFilterPrice(false);
      setFilterStatut(false);
      setFilterRating(false);
    };
    const save1 = () => {
      setSavedFilters1({
        savedFilterType: filterType,
        savedFilterPrice: filterType,
        savedFilterStatut: filterStatut,
        savedFilterRating: filterRating
      });
    };
    const save2 = () => {
      setSavedFilters2({
        savedFilterType: filterType,
        savedFilterPrice: filterType,
        savedFilterStatut: filterStatut,
        savedFilterRating: filterRating
      });
    };
    const compare1 = () => {
      const temp = { filterType, filterPrice, filterStatut, filterRating };
      setFilterType(savedFitlers1.savedFilterType);
      setFilterPrice(savedFitlers1.savedFilterPrice);
      setFilterStatut(savedFitlers1.savedFilterStatut);
      setFilterRating(savedFitlers1.savedFilterRating);
      setSavedFilters1({
        savedFilterType: temp.filterType,
        savedFilterPrice: temp.filterPrice,
        savedFilterStatut: temp.filterStatut,
        savedFilterRating: temp.filterRating
      });
    };
    const compare2 = () => {
      const temp = { filterType, filterPrice, filterStatut, filterRating };
      setFilterType(savedFitlers2.savedFilterType);
      setFilterPrice(savedFitlers2.savedFilterPrice);
      setFilterStatut(savedFitlers2.savedFilterStatut);
      setFilterRating(savedFitlers2.savedFilterRating);
      setSavedFilters2({
        savedFilterType: temp.filterType,
        savedFilterPrice: temp.filterPrice,
        savedFilterStatut: temp.filterStatut,
        savedFilterRating: temp.filterRating
      });
    };
    return filtersMenu ? (
      <View
        style={{
          position: 'absolute',
          top: 20,
          right: 70,
          display: 'flex'
        }}
      >
        <Button
          style={[
            styles.filters,
            {
              backgroundColor: filterSelect == 1 ? AppStyles.color.grey : AppStyles.color.white,
              color: filterSelect == 1 ? AppStyles.color.white : AppStyles.color.tint
            }
          ]}
          onPress={() => setFilterSelect(1)}
        >
          Type
        </Button>
        {filterSelect == 1 ? (
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 110,
              display: 'flex'
            }}
          >
            <Button style={styles.filters} onPress={() => setFilterType(false)}>
              X
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterType == 'Type A' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterType == 'Type A' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterType('Type A')}
            >
              Type A
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterType == 'Type B' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterType == 'Type B' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterType('Type B')}
            >
              Type B
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterType == 'Type C' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterType == 'Type C' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterType('Type C')}
            >
              Type C
            </Button>
          </View>
        ) : (
          <></>
        )}
        <Button
          style={[
            styles.filters,
            {
              backgroundColor: filterSelect == 2 ? AppStyles.color.grey : AppStyles.color.white,
              color: filterSelect == 2 ? AppStyles.color.white : AppStyles.color.tint
            }
          ]}
          onPress={() => setFilterSelect(2)}
        >
          Price
        </Button>
        {filterSelect == 2 ? (
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 110,
              display: 'flex'
            }}
          >
            <Button style={styles.filters} onPress={() => setFilterPrice(false)}>
              X
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterPrice == '0.5' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterPrice == '0.5' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterPrice('0.5')}
            >
              0.5/15min
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterPrice == '0.75' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterPrice == '0.75' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterPrice('0.75')}
            >
              0.75/15min
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterPrice == '1' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterPrice == '1' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterPrice('1')}
            >
              1/15min
            </Button>
          </View>
        ) : (
          <></>
        )}
        <Button
          style={[
            styles.filters,
            {
              backgroundColor: filterSelect == 3 ? AppStyles.color.grey : AppStyles.color.white,
              color: filterSelect == 3 ? AppStyles.color.white : AppStyles.color.tint
            }
          ]}
          onPress={() => setFilterSelect(3)}
        >
          Statut
        </Button>
        {filterSelect == 3 ? (
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 110,
              display: 'flex'
            }}
          >
            <Button style={styles.filters} onPress={() => setFilterStatut(false)}>
              X
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterStatut == 'Public' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterStatut == 'Public' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterStatut('Public')}
            >
              Public
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterStatut == 'Private' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterStatut == 'Private' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterStatut('Private')}
            >
              Private
            </Button>
          </View>
        ) : (
          <></>
        )}
        <Button
          style={[
            styles.filters,
            {
              backgroundColor: filterSelect == 4 ? AppStyles.color.grey : AppStyles.color.white,
              color: filterSelect == 4 ? AppStyles.color.white : AppStyles.color.tint
            }
          ]}
          onPress={() => setFilterSelect(4)}
        >
          Rating
        </Button>
        {filterSelect == 4 ? (
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 110,
              display: 'flex'
            }}
          >
            <Button style={styles.filters} onPress={() => setFilterRating(false)}>
              X
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterRating == '1' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterRating == '1' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterRating('1')}
            >
              1
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterRating == '2' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterRating == '2' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterRating('2')}
            >
              2
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterRating == '3' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterRating == '3' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterRating('3')}
            >
              3
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterRating == '4' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterRating == '4' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterRating('4')}
            >
              4
            </Button>
            <Button
              style={[
                styles.filters,
                {
                  backgroundColor:
                    filterRating == '5' ? AppStyles.color.grey : AppStyles.color.white,
                  color: filterRating == '5' ? AppStyles.color.white : AppStyles.color.tint
                }
              ]}
              onPress={() => setFilterRating('5')}
            >
              5
            </Button>
          </View>
        ) : (
          <></>
        )}
        <Button style={styles.apply} onPress={() => clear()}>
          Clear
        </Button>
        <Button style={styles.save} onPress={() => save1()}>
          Save 1
        </Button>
        <Button style={styles.save} onPress={() => save2()}>
          Save 2
        </Button>
        <Button style={styles.compare} onPress={() => compare1()}>
          Compare 1
        </Button>
        <Button style={styles.compare} onPress={() => compare2()}>
          Compare 2
        </Button>
      </View>
    ) : (
      <></>
    );
  };

  const UserComment = (props) => {
    return (
      <View style={{ flexDirection: 'row', marginTop: 10, height: 40 }}>
        <Icon style={styles.userProfile} name="user" size={30} color="white" />
        <View style={{ marginLeft: '3%', marginTop: '1%' }}>
          <Text style={styles.userTransaction}>{props.name}</Text>
          <Text style={{ color: 'grey' }}>{props.message}</Text>
        </View>
      </View>
    );
  };

  const ModalInformation = (props) => {
    return (
      <View>
        <View style={{ flexDirection: 'row', marginTop: '15%', marginLeft: '5%' }}>
          <Icon name="flow-branch" size={30} color="grey" />
          <Text style={{ marginLeft: '8%', marginTop: '1%', color: 'grey' }}>
            {props.station.charger.type}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: '8%', marginLeft: '5%' }}>
          <Icon name="credit" size={30} color="grey" />
          <Text style={{ marginLeft: '8%', marginTop: '1%', color: 'grey' }}>
            {props.station.charger.pricing}/15min
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: '8%', marginLeft: '5%' }}>
          <Icon name="flash" size={30} color="grey" />
          <Text style={{ marginLeft: '8%', marginTop: '1%', color: 'grey' }}>
            {props.station.charger.voltage}kWh
          </Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: '8%', marginLeft: '5%' }}>
          <Icon name="price-ribbon" size={30} color="grey" />
          <Text style={{ marginLeft: '8%', marginTop: '1%', color: 'grey' }}>
            {props.station.charger.rating}/5
          </Text>
        </View>
      </View>
    );
  };

  const [userStation, setUserStation] = useState([
    {
      name: 'Station 1',
      public: true,
      type: 'Type A',
      pricing: 0.5,
      voltage: 7.6,
      rating: 4.1,
      location: [126.88373, 37.49596]
    },
    {
      name: 'Station 2',
      public: true,
      type: 'Type B',
      pricing: 0.8,
      voltage: 9,
      rating: 3.8,
      location: [126.88691, 37.50198]
    },
    {
      name: 'Station John',
      public: false,
      type: 'Type A',
      pricing: 0.5,
      voltage: 7.6,
      rating: 4.1,
      location: [126.88161, 37.51055]
    },
    {
      name: 'Station Boris',
      public: false,
      type: 'Type C',
      pricing: 0.8,
      voltage: 9,
      rating: 3.8,
      location: [126.89384, 37.50278]
    },
    {
      name: 'Station 3',
      public: true,
      type: 'Type B',
      pricing: 0.7,
      voltage: 8.4,
      rating: 4.7,
      location: [126.88931, 37.51195]
    }
  ]);

  const [favStation, setFavStation] = useState(false);

  useEffect(() => {
    try {
      PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
        ],
        {
          title: 'Give Location Permission',
          message: 'App needs location permission to find your position.'
        }
      )
        .then(async (granted) => {
          // console.log(granted);
          Geolocation.getCurrentPosition(
            (position) => {
              console.log(position);
              setUserPosition([position.coords.latitude, position.coords.longitude]);
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 50000, maximumAge: 10000 }
          );
          // GetLocation.getCurrentPosition({
          //   enableHighAccuracy: true,
          //   timeout: 15000
          // })
          //   .then((location) => {
          //     setUserPosition([location.latitude, location.longitude]);
          //   })
          //   .catch((error) => {
          //     const { code, message } = error;
          //     console.warn(code, message);
          //   });
        })
        .catch((err) => {
          console.warn(err);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          styleURL={
            nightMode ? 'mapbox://styles/mapbox/dark-v9' : 'mapbox://styles/mapbox/light-v9'
          }
          zoomLevel={16}
          center={[userPosition]}
          key="map"
        >
          <MapboxGL.Camera
            zoomLevel={13}
            centerCoordinate={[userPosition[1], userPosition[0]]}
            animationMode={'flyTo'}
            animationDuration={3}
          ></MapboxGL.Camera>
          <MapboxGL.UserLocation visible={true} />
          {userStation.map((charger, index) =>
            checkFilters(charger) ? (
              <MapboxGL.PointAnnotation
                id={charger.name}
                coordinate={charger.location}
                onSelected={() => setModal(charger)}
                key={index}
              >
                <View>
                  <Icon
                    name="pin"
                    size={24}
                    color={charger.public ? AppStyles.color.tint : AppStyles.color.greenBlue}
                  />
                </View>
              </MapboxGL.PointAnnotation>
            ) : (
              <></>
            )
          )}
        </MapboxGL.MapView>
        <Pressable
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bottom: 10,
            right: 10,
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: nightMode ? AppStyles.color.white : AppStyles.color.tint
          }}
          onPress={() => setNightMode(!nightMode)}
        >
          <Icon
            name="adjust"
            size={30}
            color={nightMode ? AppStyles.color.tint : AppStyles.color.white}
          />
        </Pressable>
        <Pressable
          style={{
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: 10,
            right: 10,
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: nightMode ? AppStyles.color.white : AppStyles.color.tint
          }}
          onPress={() => setFiltersMenu(!filtersMenu)}
        >
          <Icon
            name="sound-mix"
            size={30}
            color={nightMode ? AppStyles.color.tint : AppStyles.color.white}
          />
        </Pressable>
        <FiltersComponent />
        {modalVisible ? (
          <Modal animationType={'fade'} transparent={true} visible={true} onRequestClose={{}}>
            <View style={styles.modal}>
              <View>
                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: '5%' }}
                >
                  <Pressable
                    onPress={() => {
                      setFavStation(!favStation);
                    }}
                  >
                    <Icon
                      name={favStation ? 'heart' : 'heart-outlined'}
                      size={30}
                      color={AppStyles.color.tint}
                    />
                  </Pressable>
                  <Text style={{ fontSize: 20, fontWeight: '800', color: 'black' }}>
                    {modalData.charger.name}
                  </Text>
                  <Pressable
                    onPress={() => {
                      setModalVisible(false);
                    }}
                  >
                    <Icon name="cross" size={30} color="green" />
                  </Pressable>
                </View>
                <ModalInformation station={modalData} />
              </View>
              <View>
                <SafeAreaView style={{ height: '60%', padding: '5%' }}>
                  <ScrollView>
                    <View>
                      <UserComment message={'Nice station'} name={'Anto'} />
                      <UserComment message={'It works good !'} name={'Thoms'} />
                      <UserComment message={'The owner is nice'} name={'Citar'} />
                      <UserComment message={'Fast and good location'} name={'PP.MJ'} />
                      <UserComment message={'Good Good'} name={'Yheb'} />
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </View>
              {!modalData.charger.public ? (
                <View style={{ display: 'flex', alignItems: 'center' }}>
                  <Button containerStyle={styles.bookButton} style={styles.shareText}>
                    Book
                  </Button>
                </View>
              ) : (
                <></>
              )}
            </View>
          </Modal>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%'
  },
  map: {
    flex: 1
  },
  textEntry: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  },
  modal: {
    backgroundColor: AppStyles.color.white,
    height: '70%',
    width: '80%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: AppStyles.color.grey,
    marginTop: '30%',
    marginLeft: '12%'
  },
  userProfile: {
    backgroundColor: AppStyles.color.tint,
    borderRadius: 50,
    marginTop: '5%',
    marginBottom: '2%'
  },
  userTransaction: {
    color: 'black',
    fontWeight: '400',
    fontSize: 18
  },
  filters: {
    backgroundColor: AppStyles.color.white,
    color: AppStyles.color.tint,
    borderRadius: 50,
    width: 100,
    height: 30,
    marginBottom: '5%'
  },
  apply: {
    backgroundColor: AppStyles.color.tint,
    color: AppStyles.color.white,
    borderRadius: 50,
    width: 100,
    height: 30,
    marginBottom: '5%'
  },
  save: {
    backgroundColor: AppStyles.color.facebook,
    color: AppStyles.color.white,
    borderRadius: 50,
    width: 100,
    height: 30,
    marginBottom: '5%'
  },
  compare: {
    backgroundColor: AppStyles.color.grey,
    color: AppStyles.color.white,
    borderRadius: 50,
    width: 100,
    height: 30,
    marginBottom: '5%'
  },
  bookButton: {
    width: 200,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 80
  },
  shareText: {
    color: AppStyles.color.white
  }
});

export default Map;
