import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';

import { getEvents, Event } from '@/api/events';
import { EventCard } from '@/components/EventCard';
import MapView from 'react-native-maps';

export default function HomeScreen() {
  const { data: events, isLoading, error } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#00FFFF" />
        <Text style={styles.loadingText}>Getting Event Information...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text style={styles.errorText}>Error retreiving event information</Text>
        <Text style={styles.errorSubtext}>{error.message}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={(item) => item.eventId}
        contentContainerStyle={styles.listContentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  listContentContainer: {
    paddingVertical: 8,
  },

  
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  loadingText: {
    color: '#00FFFF',
    fontFamily: 'Orbitron_700Bold',
    marginTop: 15,
    letterSpacing: 2,
  },


  errorText: {
    color: '#FF4444',
    fontSize: 16,
    fontFamily: 'Orbitron_700Bold',
  },
  errorSubtext: {
    color: '#CC6666',
    fontSize: 12,
    marginTop: 8,
    fontFamily: 'Orbitron_400Regular',
  },
});