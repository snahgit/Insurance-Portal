import React, { useState, useEffect, useRef } from 'react';
import { Card, Text, Group, Button, Badge, Progress, Timeline } from '@mantine/core';
import { IconMapPin2, IconRefresh, IconTruck, IconCheck, IconMapPin } from '@tabler/icons-react';

interface LiveMapTrackingProps {
  fromAddress: string;
  toAddress: string;
  deliveryStatus?: 'pending' | 'picked_up' | 'in_transit' | 'delivered';
  estimatedTime?: string;
  driverName?: string;
  driverPhone?: string;
  fromCoordinates?: { lat: number; lng: number };
  toCoordinates?: { lat: number; lng: number };
  driverCoordinates?: { lat: number; lng: number };
}

export const PrescriptionDeliveryTrack: React.FC<LiveMapTrackingProps> = ({
  fromAddress,
  toAddress,
  deliveryStatus = 'in_transit',
  estimatedTime = '25 mins',
  driverName = 'John Delivery',
  driverPhone = '(555) 123-4567',
  fromCoordinates = { lat: 40.7128, lng: -74.0060 }, // Default to NYC
  toCoordinates = { lat: 40.7589, lng: -73.9851 }, // Default to Times Square
  driverCoordinates = { lat: 40.7355, lng: -73.9903 } // Default between them
}) => {
  const [isTracking, setIsTracking] = useState(false);
  const [progress, setProgress] = useState(45);
  const [currentLocation, setCurrentLocation] = useState('Main St & 5th Ave');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [trackingStartTime] = useState(new Date());
  const [trackingDuration, setTrackingDuration] = useState(0);
  const [, setMap] = useState<google.maps.Map | null>(null);
  const [driverMarker, setDriverMarker] = useState<google.maps.Marker | null>(null);
  const [currentDriverPosition, setCurrentDriverPosition] = useState(driverCoordinates);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInitialized = useRef(false);
  const trackingRef = useRef(isTracking);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Google Map
  useEffect(() => {
    if (mapRef.current && window.google && !mapInitialized.current) {
      mapInitialized.current = true;
      
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: driverCoordinates, // Use initial coordinates, not changing position
        zoom: 13,
        mapTypeId: 'roadmap'
      });
      setMap(mapInstance);

      // Create markers for pickup, delivery, and driver (store references)
      new window.google.maps.Marker({
        position: fromCoordinates,
        map: mapInstance,
        title: 'Pickup Location',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 0C6.7 0 0 6.7 0 15s15 25 15 25 15-16.7 15-25S23.3 0 15 0z" fill="#4285F4"/>
              <circle cx="15" cy="15" r="8" fill="white"/>
              <text x="15" y="20" text-anchor="middle" fill="#4285F4" font-size="12" font-weight="bold">P</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(30, 40)
        }
      });

      new window.google.maps.Marker({
        position: toCoordinates,
        map: mapInstance,
        title: 'Delivery Location',
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 0C6.7 0 0 6.7 0 15s15 25 15 25 15-16.7 15-25S23.3 0 15 0z" fill="#34A853"/>
              <circle cx="15" cy="15" r="8" fill="white"/>
              <text x="15" y="20" text-anchor="middle" fill="#34A853" font-size="12" font-weight="bold">D</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(30, 40)
        }
      });

      const driverMarkerInstance = new window.google.maps.Marker({
        position: driverCoordinates, // Use initial coordinates
        map: mapInstance,
        title: `Driver: ${driverName}`,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 0C6.7 0 0 6.7 0 15s15 25 15 25 15-16.7 15-25S23.3 0 15 0z" fill="#EA4335"/>
              <circle cx="15" cy="15" r="8" fill="white"/>
              <text x="15" y="20" text-anchor="middle" fill="#EA4335" font-size="12" font-weight="bold">🚚</text>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(30, 40)
        }
      });

      setDriverMarker(driverMarkerInstance);

      // Create path from pickup to delivery
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: '#4285F4',
          strokeWeight: 4,
          strokeOpacity: 0.7
        }
      });

      directionsRenderer.setMap(mapInstance);

      directionsService.route({
        origin: fromCoordinates,
        destination: toCoordinates,
        travelMode: window.google.maps.TravelMode.DRIVING
      }, (result, status) => {
        if (status === 'OK' && result) {
          directionsRenderer.setDirections(result);
        }
      });
    }
    
    // Cleanup function
    return () => {
      if (mapInitialized.current) {
        // Reset map initialization flag if component unmounts
        mapInitialized.current = false;
      }
    };
  }, [fromCoordinates, toCoordinates, driverName]); // Removed currentDriverPosition from dependency array

  // Live tracking simulation
  useEffect(() => {
    trackingRef.current = isTracking; // Update ref when isTracking changes
    
    // If tracking is stopped, clear any pending timeout
    if (!isTracking && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [isTracking]);

  useEffect(() => {
    if (isTracking) {
      const updateFrequency = () => {
        const elapsed = Date.now() - trackingStartTime.getTime();
        return elapsed > 120000 ? 1000000 : 300000;
      };

      const scheduleNextUpdate = () => {
        timeoutRef.current = setTimeout(() => {
          // Check if tracking is still active
          if (!trackingRef.current) {
            timeoutRef.current = null;
            return;
          }

          const elapsed = Date.now() - trackingStartTime.getTime();
          setTrackingDuration(Math.floor(elapsed / 1000)); // Update duration in seconds
          
          // Auto-stop tracking after 10 minutes (600 seconds)
          if (elapsed > 600000) {
            setIsTracking(false);
            timeoutRef.current = null;
            return;
          }

          setProgress(prev => {
            const newProgress = prev + Math.random() * 5;
            return newProgress > 100 ? 100 : newProgress;
          });

          // Simulate driver movement towards destination
          setCurrentDriverPosition(prev => {
            const newLat = prev.lat + (toCoordinates.lat - prev.lat) * 0.02;
            const newLng = prev.lng + (toCoordinates.lng - prev.lng) * 0.02;
            const newPosition = { lat: newLat, lng: newLng };

            // Check if driver has reached destination (within 100 meters)
            const distance = calculateDistance(newPosition, toCoordinates);
            if (parseFloat(distance) < 0.1) { // Less than 100 meters
              setIsTracking(false); // Stop tracking
              setProgress(100); // Set progress to 100%
              timeoutRef.current = null;
              return toCoordinates; // Set final position
            }

            // Update driver marker position on map
            if (driverMarker) {
              driverMarker.setPosition(newPosition);
            }

            return newPosition;
          });

          const locations = [
            'Main St & 5th Ave',
            'Broadway & Oak St',
            'Elm St & 3rd Ave',
            'Park Ave & Center St',
            'Your Street Approaching'
          ];
          const randomLocation = locations[Math.floor(Math.random() * locations.length)];
          setCurrentLocation(randomLocation);
          setLastUpdate(new Date());
          
          // Schedule next update only if still tracking
          if (trackingRef.current) {
            scheduleNextUpdate();
          } else {
            timeoutRef.current = null;
          }
        }, updateFrequency());
      };

      scheduleNextUpdate();
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isTracking, driverMarker, toCoordinates, trackingStartTime]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const calculateDistance = (pos1: { lat: number; lng: number }, pos2: { lat: number; lng: number }) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (pos2.lat - pos1.lat) * (Math.PI / 180);
    const dLon = (pos2.lng - pos1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(pos1.lat * (Math.PI / 180)) * Math.cos(pos2.lat * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance.toFixed(2);
  };

  const getStatusColor = () => {
    switch (deliveryStatus) {
      case 'pending': return 'yellow';
      case 'picked_up': return 'blue';
      case 'in_transit': return 'green';
      case 'delivered': return 'teal';
      default: return 'gray';
    }
  };
  const getStatusText = () => {
    switch (deliveryStatus) {
      case 'pending': return 'Order Pending';
      case 'picked_up': return 'Picked Up';
      case 'in_transit': return 'In Transit';
      case 'delivered': return 'Delivered';
      default: return 'Unknown';
    }
  };
  return (
    <Card withBorder radius="sm" className="border-green-300 bg-white shadow-sm dark:border-green-600 dark:bg-gray-700">
      <Card.Section className="p-4">
        <Group justify="space-between" mb="md">
          <Group>
            <IconMapPin2 size={20} className="text-green-600 dark:text-green-400" />
            <Text fw={600} size="md" className="text-gray-800 dark:text-gray-200">Live Map Tracking</Text>
            <Badge color={getStatusColor()} variant="light" size="sm">
              {getStatusText()}
            </Badge>
          </Group>
          <Button
            leftSection={<IconRefresh size={16} />}
            variant="light"
            color="green"
            size="sm"
            onClick={() => {
              const newTrackingState = !isTracking;
              setIsTracking(newTrackingState);
              
              if (newTrackingState) {
                // Starting tracking - reset everything
                setCurrentDriverPosition(driverCoordinates);
                setProgress(45);
                setTrackingDuration(0);
                if (driverMarker) {
                  driverMarker.setPosition(driverCoordinates);
                }
              } else {
                // Stopping tracking - clear any pending timeout
                if (timeoutRef.current) {
                  clearTimeout(timeoutRef.current);
                  timeoutRef.current = null;
                }
              }
            }}
          >
            {isTracking ? 'Stop Tracking' : 'Start Live Tracking'}
          </Button>
        </Group>
        <div className="mb-4">
          <Group justify="space-between" mb="xs">
            <Text size="sm" fw={600} className="text-gray-700 dark:text-gray-300">Delivery Progress</Text>
            <Text size="sm" className="text-gray-600 dark:text-gray-400">{Math.round(progress)}%</Text>
          </Group>
          <Progress value={progress} color="green" size="md" radius="md" />
        </div>
        {isTracking && (
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-4">
            <Group>
              <IconTruck size={18} className="text-green-600 dark:text-green-400" />
              <div>
                <Text size="sm" fw={600} className="text-gray-800 dark:text-gray-200">Driver: {driverName}</Text>
                <Text size="xs" className="text-gray-600 dark:text-gray-400">Phone: {driverPhone}</Text>
                <Text size="xs" className="text-gray-600 dark:text-gray-400">
                  Current Location: {currentLocation}
                </Text>
                <Text size="xs" className="text-gray-600 dark:text-gray-400">
                  Distance to destination: {calculateDistance(currentDriverPosition, toCoordinates)} km
                </Text>
                <Text size="xs" className="text-gray-600 dark:text-gray-400">
                  Estimated arrival: {estimatedTime}
                </Text>
                <Text size="xs" className="text-gray-600 dark:text-gray-400">
                  Tracking duration: {Math.floor(trackingDuration / 60)}m {trackingDuration % 60}s
                </Text>
                <Text size="xs" className="text-gray-500 dark:text-gray-500">
                  Last updated: {lastUpdate.toLocaleTimeString()}
                </Text>
              </div>
            </Group>
          </div>
        )}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg h-64 relative mb-4">
          {/* Google Maps Container */}
          <div ref={mapRef} className="w-full h-full rounded-lg"></div>

          {/* Overlay for tracking status */}
          {isTracking && (
            <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 rounded-lg p-2 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Text size="xs" fw={600} className="text-gray-800 dark:text-gray-200">Live Tracking Active</Text>
              </div>
              <Text size="xs" className="text-gray-600 dark:text-gray-400">
                Driver: {currentDriverPosition.lat.toFixed(4)}, {currentDriverPosition.lng.toFixed(4)}
              </Text>
            </div>
          )}

          {/* Fallback when map is not loaded */}
          {!window.google && (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <IconMapPin size={48} className="text-gray-400 dark:text-gray-600 mb-2" />
              <Text className="text-gray-500 dark:text-gray-400">Loading Google Maps...</Text>
            </div>
          )}

          {/* Start tracking overlay */}
          {/* {!isTracking && (
            <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-700 rounded-lg p-2 shadow-lg">
              <Text size="xs" className="text-gray-600 dark:text-gray-400">Click "Start Live Tracking" to begin</Text>
            </div>
          )} */}
        </div>
        <Timeline active={deliveryStatus === 'delivered' ? 4 : deliveryStatus === 'in_transit' ? 2 : 1} bulletSize={20} lineWidth={2} color="green">
          <Timeline.Item
            bullet={<IconCheck size={12} />}
            title="Order Confirmed"
            color={deliveryStatus === 'pending' ? 'yellow' : 'green'}
          >
            <Text c="dimmed" size="sm">Pharmacy confirmed your order</Text>
          </Timeline.Item>
          <Timeline.Item
            bullet={<IconTruck size={12} />}
            title="Picked Up"
            color={deliveryStatus === 'picked_up' || deliveryStatus === 'in_transit' || deliveryStatus === 'delivered' ? 'green' : 'gray'}
          >
            <Text c="dimmed" size="sm">Driver collected your medications</Text>
          </Timeline.Item>
          <Timeline.Item
            bullet={<IconMapPin2 size={12} />}
            title="In Transit"
            color={deliveryStatus === 'in_transit' || deliveryStatus === 'delivered' ? 'green' : 'gray'}
          >
            <Text c="dimmed" size="sm">On the way to your location</Text>
          </Timeline.Item>
          <Timeline.Item
            bullet={<IconCheck size={12} />}
            title="Delivered"
            color={deliveryStatus === 'delivered' ? 'green' : 'gray'}
          >
            <Text c="dimmed" size="sm">Delivered to your address</Text>
          </Timeline.Item>
        </Timeline>
        <Group mt="md" justify="space-between" className="border-t border-gray-200 dark:border-gray-600 pt-3">
          <div>
            <Text size="xs" fw={600} className="text-gray-700 dark:text-gray-300">From: Pharmacy</Text>
            <Text size="xs" className="text-gray-600 dark:text-gray-400">{fromAddress}</Text>
          </div>
          <div className="text-right">
            <Text size="xs" fw={600} className="text-gray-700 dark:text-gray-300">To: Patient Address</Text>
            <Text size="xs" className="text-gray-600 dark:text-gray-400">{toAddress}</Text>
          </div>
        </Group>
      </Card.Section>
    </Card>
  );
};
