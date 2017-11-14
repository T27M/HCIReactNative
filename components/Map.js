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

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.getPosition = this.getPosition.bind(this);

        this.state = {
            region: this.getInitialState().region,
            error: null,
            markers: [
            {
                title: 'Library',
                coordinates: {
                    latitude: 54.010098,
                    longitude:  -2.786120
                },
            },
            {
                title: 'LearningZone',
                coordinates: {
                  latitude: 54.010465,
                  longitude: -2.785908
                }, 
            },
            {
                title: 'LancasterSquare',
                coordinates: {
                  latitude: 54.013365,
                  longitude: -2.784715
                }, 
            },
            {
            title: 'Bowland',
                coordinates: {
                  latitude: 54.010846,
                  longitude: -2.785290
                },  
                
            }, 
            {
            title: 'TheBase',
                coordinates: {
                  latitude: 54.010176,
                  longitude: -2.786319
                }, 
            },          
            {
            title: 'GeorgeFox',
                coordinates: {
                  latitude: 54.007423,
                  longitude: -2.784683
                },  
            },
            {
            title: 'InfoLab21',
                coordinates: {
                  latitude: 54.005500,
                  longitude: -2.784699
                },  
            },  
            {
            title: 'Trevor',
                coordinates: {
                  latitude: 54.009352,
                  longitude: -2.785209
                },  
            },
            {
            title: 'Cartmel',
                coordinates: {
                  latitude: 54.003883,
                  longitude: -2.788959
                },  
            },
            {
            title: 'LUSU',
                coordinates: {
                  latitude: 54.010579,
                  longitude: -2.786148
                },  
            },
            {
            title: 'NuffieldTheatre',
                coordinates: {
                  latitude: 54.012453,
                  longitude: -2.785088
                },  
            },
            {
            title: 'BowlandNorth',
                coordinates: {
                  latitude: 54.011252,
                  longitude: -2.785479
                },  
            },
            {
            title: 'Fylde',
                coordinates: {
                  latitude: 54.008762,
                  longitude: -2.785094
                },  
            },
            {
            title: 'Furness',
                coordinates: {
                  latitude: 54.009514,
                  longitude: -2.785403
                },  
            },
            {
            title: 'County',
                coordinates: {
                  latitude: 54.012970,
                  longitude: -2.784693
                },  
            },
            {
            title: 'Grizedale',
                coordinates: {
                  latitude: 54.006973,
                  longitude: -2.785495
                },  
            },
            {
            title: 'Lonsdale',
                coordinates: {
                  latitude: 54.004917,
                  longitude: -2.789560
                },  
            },
            {
            title: 'Pendle',
                coordinates: {
                  latitude: 54.006662,
                  longitude: -2.784817
                },  
            },
            {
            title: 'Grad',
                coordinates: {
                  latitude: 54.004483,
                  longitude: -2.787523
                },  
            },
            {
            title: 'PendleBar',
                coordinates: {
                  latitude: 54.006234,
                  longitude: -2.785126
                },  
            }   
        ]
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
                {this.state.markers.map(marker => (
                    <MapView.Marker key={marker.title}
                      coordinate={marker.coordinates}
                      title={marker.title}
                    />
                ))}
                </MapView>
                {/*
                  <NavButtons
                    showBack={false}
                    showBurger={true}
                  />
                */}
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
        );
    }
}