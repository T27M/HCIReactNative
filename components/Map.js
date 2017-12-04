import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';
import NavButtons from './NavButtons';
import MapView from 'react-native-maps';
import Db from '../data/Db';

const markers = Db.getLocations();

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.getPosition = this.getPosition.bind(this);

        this.state = {
            region: this.getInitialState().region,
            error: null,
            markers:
                markers.map(marker => ({
                    title: marker.location,
                    coordinates: {
                        latitude: marker.lat,
                        longitude: marker.long
                    },
                    type: marker.type
                }))
        };
    }

    componentDidMount() {
        this.getPosition();
    }

    getPosition() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    },
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { timeout: 20000, maximumAge: 1000 },
        );
    }

    getInitialState() {
        return {
            region: {
                latitude: 54.011048,
                longitude: -2.787703,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
        };
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render() {
        return (
            <View style={this.props.styles.container}>
                <MapView style={this.props.styles.map}
                    initialRegion={this.state.region}
                    region={this.state.region}
                    onRegionChange={this.onRegionChange}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsCompass={true}
                >
                {this.state.markers.map(marker => {
                    if(marker.type === 0) {
                        return <MapView.Marker key={marker.title}
                          coordinate={marker.coordinates}
                          title={marker.title}
                          image={require('../img/qrmarker.png')}
                        />
                    } else {
                        return <MapView.Marker key={marker.title}
                          coordinate={marker.coordinates}
                          title={marker.title}
                          pinColor='purple'
                        />
                    }
                })}
                </MapView>

                <NavButtons
                  navigation={this.props.navigation}
                  showBack={false}
                  showBurger={true}
                  showAccept={false}
                  showDecline={false}
                />

                <View
                  style={this.props.styles.LatLongView}
                >
                  <TouchableOpacity onPress={this.getPosition}>
                      <Image
                          style={this.props.styles.button}
                          source={require('../img/gps_locate.png')}
                      />
                  </TouchableOpacity>
                  <Text>Latitude: {this.state.region.latitude}</Text>
                  <Text>Longitude: {this.state.region.longitude}</Text>
                  {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                </View>
            </View>
        );
    }
}
