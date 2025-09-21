import React from 'react';
import { useMemo, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';

import { getEvents, Event } from '@/api/events';
import { EventCard } from '@/components/EventCard';
import { TabView, SceneMap, TabBar, SceneRendererProps, NavigationState } from 'react-native-tab-view'
// import MapView from 'react-native-maps';


type GroupedEvents = {
  [key: string]: Event[];
};

const EventList = ({ events }: { events: Event[] }) => (
  <FlatList
    data={events}
    renderItem={({ item }) => <EventCard event={item} />}
    keyExtractor={(item) => item.eventId}
    contentContainerStyle={styles.listContentContainer}
  />
);

export default function HomeScreen() {
  const { data: events, isLoading, error } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: getEvents,
  });

  const groupedEvents = useMemo(() => {
    if (!events || events.length === 0) return {};
    const groups = events.reduce((acc: GroupedEvents, event) => {
      const date = new Date(event.startTime * 1000).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(event);
      return acc;
    }, {});

    // DOESNT WORK??
    for (const date in groups) {
      groups[date].sort((a, b) => Number(a.startTime) - Number(b.startTime));
    }

    return groups;
  }, [events]);

  
  const { routes, scenes } = useMemo(() => {
    const eventDays = Object.keys(groupedEvents).sort();
    if (eventDays.length === 0) return { routes: [], scenes: {} };

    const routes = eventDays.map((date, index) => {
        const tabTitle = `Day ${index + 1}`;
        return { key: date, title: tabTitle };
    });

    const scenes = eventDays.reduce((acc, date) => {
        acc[date] = () => <EventList events={groupedEvents[date]} />;
        return acc;
    }, {} as {[key: string]: React.ComponentType});

    return { routes, scenes };
  }, [groupedEvents]);

  const [index, setIndex] = React.useState(0);

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

  if (routes.length === 0) {
    return (
        <View style={styles.loaderContainer}>
            <Text style={styles.loadingText}>No Events Found</Text>
        </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap(scenes)}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.tabIndicator}
            scrollEnabled
          />
        )}
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


  tabBar: {
    backgroundColor: '#1a1a1a', 
  },
  tabIndicator: {
    backgroundColor: '#00FFFF',
    height: 3,
  },
  tabLabel: {
    color: '#FFFFFF',
    fontFamily: 'Orbitron_500Medium',
    textTransform: 'capitalize',
  },
});