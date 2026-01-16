import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';

export interface RoutePoint {
    name: string;
    latitude: number;
    longitude: number;
    type: 'city' | 'country';
}

interface RouteMapProps {
    origin: RoutePoint;
    destination: RoutePoint;
    waypoints?: RoutePoint[];
}

export default function RouteMap({ origin, destination, waypoints = [] }: RouteMapProps) {
    // Calculate initial region to fit all points
    const allPoints = [origin, ...waypoints, destination];

    const initialRegion = {
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 10,
        longitudeDelta: 10,
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
                style={styles.map}
                initialRegion={initialRegion}
            >
                {/* Origin Marker */}
                <Marker
                    coordinate={{ latitude: origin.latitude, longitude: origin.longitude }}
                    title={origin.name}
                    description="Départ"
                    pinColor="green"
                />

                {/* Destination Marker */}
                <Marker
                    coordinate={{ latitude: destination.latitude, longitude: destination.longitude }}
                    title={destination.name}
                    description="Arrivée"
                    pinColor="red"
                />

                {/* Waypoints */}
                {waypoints.map((point, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                        title={point.name}
                        description={`Passage: ${point.type}`}
                        pinColor="blue"
                    />
                ))}

                {/* Route Line (Linear approximation) */}
                <Polyline
                    coordinates={allPoints.map(p => ({ latitude: p.latitude, longitude: p.longitude }))}
                    strokeColor="#000"
                    strokeWidth={3}
                />
            </MapView>

            <View style={styles.legend}>
                <Text style={styles.legendTitle}>Trajet de l'offre</Text>
                <Text>{origin.name} ➡️ {destination.name}</Text>
                {waypoints.length > 0 && (
                    <Text style={styles.subText}>Via: {waypoints.map(p => p.name).join(', ')}</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: '100%',
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    legend: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 10,
    },
    legendTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subText: {
        fontSize: 12,
        color: '#666',
    },
});
