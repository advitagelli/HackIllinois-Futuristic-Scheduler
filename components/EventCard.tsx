import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import type { Event } from '@/api/events';

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const formattedStartTime = format(new Date(event.startTime * 1000), 'p');
  const location = event.locations[0]?.description || 'TBD';

  return (
    <View style={styles.eventItemContainer}>
      {/* Main frame */}
      <View style={styles.eventItem}>
        {/* Primary frame corners */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />
        
        {/* Secondary overlapping frame */}
        <View style={styles.secondaryFrame}>
          <View style={[styles.secondaryCorner, styles.secTopLeft]} />
          <View style={[styles.secondaryCorner, styles.secTopRight]} />
          <View style={[styles.secondaryCorner, styles.secBottomLeft]} />
          <View style={[styles.secondaryCorner, styles.secBottomRight]} />
        </View>
        
        {/* Connection lines between frames */}
        <View style={[styles.connector, styles.connectorTop]} />
        <View style={[styles.connector, styles.connectorBottom]} />
        <View style={[styles.connector, styles.connectorLeft]} />
        <View style={[styles.connector, styles.connectorRight]} />
        
        {/* Side accent bars */}
        <View style={[styles.sideAccent, styles.leftAccent]} />
        <View style={[styles.sideAccent, styles.rightAccent]} />
        <View style={[styles.sideAccent, styles.topAccent]} />
        <View style={[styles.sideAccent, styles.bottomAccent]} />

        {/* Your existing content */}
        <View style={styles.headerRow}>
          <Text style={styles.eventName}>{event.name}</Text>
          <View style={styles.pointsBadge}>
            <Text style={styles.pointsText}>{event.points} PTS</Text>
          </View>
        </View>
        <Text style={styles.description}>{event.description}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.detailText}>▶ {location}</Text>
          <Text style={styles.detailText}>◆ {formattedStartTime}</Text>
        </View>
      </View>
    </View>
  );
};

// Generated using Claude
const styles = StyleSheet.create({
  eventItemContainer: {
    margin: 10,
    position: 'relative',
  },

  eventItem: {
    backgroundColor: 'rgba(0, 255, 255, 0.02)',
    borderWidth: 1,
    borderColor: '#00FFFF',
    borderRadius: 8,
    padding: 20,
    position: 'relative',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 15,
  },
  
  // Primary frame corners (thicker, more prominent)
  corner: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderColor: '#00FFFF',
    zIndex: 3,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: -2,
    right: -2,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  
  // Secondary overlapping frame
  secondaryFrame: {
    position: 'absolute',
    top: -8,
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: 12,
    zIndex: 1,
  },
  secondaryCorner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: 'rgba(0, 255, 255, 0.6)',
    zIndex: 1,
  },
  secTopLeft: {
    top: -1,
    left: -1,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 12,
  },
  secTopRight: {
    top: -1,
    right: -1,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopRightRadius: 12,
  },
  secBottomLeft: {
    bottom: -1,
    left: -1,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderBottomLeftRadius: 12,
  },
  secBottomRight: {
    bottom: -1,
    right: -1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 12,
  },
  
  // Connection lines between frames
  connector: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 255, 255, 0.4)',
    zIndex: 2,
  },
  connectorTop: {
    top: -5,
    left: 30,
    width: 40,
    height: 1,
  },
  connectorBottom: {
    bottom: -5,
    right: 30,
    width: 40,
    height: 1,
  },
  connectorLeft: {
    left: -5,
    top: 30,
    width: 1,
    height: 40,
  },
  connectorRight: {
    right: -5,
    bottom: 30,
    width: 1,
    height: 40,
  },
  
  // Side accent bars 
  sideAccent: {
    position: 'absolute',
    backgroundColor: '#00FFFF',
    opacity: 0.8,
    zIndex: 4,
  },
  leftAccent: {
    left: -2,
    top: '35%',
    width: 3,
    height: '30%',
    borderRadius: 1.5,
  },
  rightAccent: {
    right: -2,
    top: '35%',
    width: 3,
    height: '30%',
    borderRadius: 1.5,
  },
  topAccent: {
    top: -2,
    left: '35%',
    width: '30%',
    height: 3,
    borderRadius: 1.5,
  },
  bottomAccent: {
    bottom: -2,
    left: '35%',
    width: '30%',
    height: 3,
    borderRadius: 1.5,
  },

  // My original content styles
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    zIndex: 5,
  },
  eventName: {
    flex: 1,
    color: '#00FFFF',
    fontSize: 18,
    fontFamily: 'Orbitron_700Bold',
  },
  pointsBadge: {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#00FFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsText: {
    color: '#00FFFF',
    fontFamily: 'Orbitron_700Bold',
    fontSize: 12,
  },
  description: {
    marginTop: 8,
    color: '#E0F2F2',
    fontFamily: 'Orbitron_400Regular',
    fontSize: 14,
    lineHeight: 20,
    zIndex: 5,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 255, 255, 0.3)',
    paddingTop: 12,
    zIndex: 5,
  },
  detailText: {
    fontSize: 12,
    color: '#00FFFF',
    fontFamily: 'Orbitron_400Regular',
  },
});



// REFERENCES: 
// Futuristic UI inspiration: https://stock.adobe.com/images/hud-game-element-futuristic-tech-screen-template-with-text-messages-warning-technology-frame-vector-attention-interface-hologram-for-gaming-space-management/328843812
// Anthopic, Claude: <PDF Transcript in the same directory>