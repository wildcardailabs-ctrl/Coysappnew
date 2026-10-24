import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { MapPin, Navigation, Train, Beer, Compass, ExternalLink, Layers, Check, Footprints, AlertCircle } from 'lucide-react';
import { Venue, PubVenue } from '../types';

interface InteractiveMatchMapProps {
  venue: Venue;
  pubs?: PubVenue[];
  selectedPubId?: string;
  onSelectPub?: (pub: PubVenue) => void;
  heightClass?: string;
}

export const InteractiveMatchMap: React.FC<InteractiveMatchMapProps> = ({
  venue,
  pubs = [],
  selectedPubId,
  onSelectPub,
  heightClass = 'h-72 sm:h-96'
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const [filter, setFilter] = useState<'all' | 'stadium' | 'stations' | 'pubs'>('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<{ type: 'stadium' | 'station' | 'pub'; name: string; detail: string; mapsUrl: string } | null>({
    type: 'stadium',
    name: venue.name,
    detail: venue.address,
    mapsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(venue.address)}`
  });

  // Calculate destination Google Maps URL
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    venue.name + ' ' + venue.postcode
  )}`;
  const appleMapsUrl = `https://maps.apple.com/?daddr=${encodeURIComponent(
    venue.name + ' ' + venue.postcode
  )}`;
  const citymapperUrl = `https://citymapper.com/directions?endcoord=${venue.coordinates.lat}%2C${venue.coordinates.lng}&endname=${encodeURIComponent(venue.name)}`;

  // Custom Leaflet Icons builder
  const createCustomIcon = (bgColor: string, symbol: string, label: string) => {
    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `
        <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -100%); cursor:pointer;">
          <div style="background:${bgColor}; color:white; font-weight:800; font-size:11px; padding:4px 8px; border-radius:12px; border:2px solid white; box-shadow:0 4px 12px rgba(0,0,0,0.5); display:flex; align-items:center; gap:4px; white-space:nowrap;">
            <span>${symbol}</span>
            <span>${label}</span>
          </div>
          <div style="width:0; height:0; border-left:6px solid transparent; border-right:6px solid transparent; border-top:8px solid ${bgColor}; margin-top:-1px;"></div>
        </div>
      `,
      iconSize: [0, 0],
      iconAnchor: [0, 0]
    });
  };

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Avoid duplicate initialization
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      center: [venue.coordinates.lat, venue.coordinates.lng],
      zoom: 15,
      zoomControl: false,
      attributionControl: false
    });

    // Dark styled OpenStreetMap tiles via CartoDB Dark Matter
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map);

    // Zoom control in top right
    L.control.zoom({ position: 'topright' }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersGroupRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [venue.id]);

  // Render markers and paths when filter, venue, or pubs change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersGroup = markersGroupRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // 1. Stadium Marker
    if (filter === 'all' || filter === 'stadium') {
      const stadiumIcon = createCustomIcon('#001C58', '🏟️', venue.club || venue.name);
      const stadiumMarker = L.marker([venue.coordinates.lat, venue.coordinates.lng], { icon: stadiumIcon });
      stadiumMarker.on('click', () => {
        setActiveItem({
          type: 'stadium',
          name: venue.name,
          detail: `${venue.address} • Capacity: ${venue.capacity.toLocaleString()}`,
          mapsUrl: googleMapsUrl
        });
      });
      stadiumMarker.addTo(markersGroup);

      // Circle around stadium
      L.circle([venue.coordinates.lat, venue.coordinates.lng], {
        radius: 120,
        color: '#4ea8de',
        fillColor: '#4ea8de',
        fillOpacity: 0.2,
        weight: 2
      }).addTo(markersGroup);
    }

    // 2. Nearest Stations Markers & Walk Lines
    if (filter === 'all' || filter === 'stations') {
      venue.nearestStations.forEach((station, idx) => {
        // Approximate coordinates offset around the venue for station placement
        let stationLat = venue.coordinates.lat;
        let stationLng = venue.coordinates.lng;

        if (station.name.includes('White Hart Lane')) {
          stationLat += 0.0035;
          stationLng -= 0.0055;
        } else if (station.name.includes('Northumberland Park')) {
          stationLat += 0.0020;
          stationLng += 0.0080;
        } else if (station.name.includes('Seven Sisters')) {
          stationLat -= 0.0160;
          stationLng -= 0.0060;
        } else if (station.name.includes('Tottenham Hale')) {
          stationLat -= 0.0180;
          stationLng += 0.0060;
        } else {
          stationLat += (idx === 0 ? 0.003 : -0.003) * (idx + 1);
          stationLng += (idx % 2 === 0 ? 0.004 : -0.004);
        }

        const symbol = station.type === 'tube' ? '🚇' : station.type === 'overground' ? '🚆' : '🚂';
        const color = station.type === 'tube' ? '#0284c7' : station.type === 'overground' ? '#ea580c' : '#059669';
        const stationIcon = createCustomIcon(color, symbol, station.name);

        const stationMarker = L.marker([stationLat, stationLng], { icon: stationIcon });
        stationMarker.on('click', () => {
          setActiveItem({
            type: 'station',
            name: station.name,
            detail: `${station.walkTime} (${station.distance}) to stadium • ${station.lines.join(', ')}`,
            mapsUrl: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(station.name + ' Station London')}&destination=${encodeURIComponent(venue.address)}`
          });
        });
        stationMarker.addTo(markersGroup);

        // Walking route line connecting station to stadium
        L.polyline([
          [stationLat, stationLng],
          [venue.coordinates.lat, venue.coordinates.lng]
        ], {
          color: color,
          weight: 3,
          dashArray: '5, 8',
          opacity: 0.75
        }).addTo(markersGroup);
      });
    }

    // 3. Pubs & Food Markers
    if (filter === 'all' || filter === 'pubs') {
      pubs.forEach((pub) => {
        if (!pub.coordinates) return;
        const isSpurs = pub.spursFriendly;
        const color = isSpurs ? '#059669' : pub.awayFansWelcome ? '#d97706' : '#dc2626';
        const symbol = pub.category === 'Food' || pub.category === 'Restaurant' ? '🍔' : '🍺';

        const pubIcon = createCustomIcon(color, symbol, pub.name);
        const pubMarker = L.marker([pub.coordinates.lat, pub.coordinates.lng], { icon: pubIcon });

        pubMarker.on('click', () => {
          setActiveItem({
            type: 'pub',
            name: pub.name,
            detail: `${pub.walkTime} (${pub.distance}) • ${pub.foodStyle || 'Matchday drinks'} • Rating: ★ ${pub.rating}`,
            mapsUrl: pub.googleMapsUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(pub.address + ' ' + pub.postcode)}`
          });
          if (onSelectPub) onSelectPub(pub);
        });

        pubMarker.addTo(markersGroup);
      });
    }

    // 4. User Location Marker
    if (userLocation) {
      const userIcon = createCustomIcon('#3b82f6', '📍', 'You');
      L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(markersGroup);
      L.circle([userLocation.lat, userLocation.lng], {
        radius: 150,
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.25,
        weight: 1
      }).addTo(markersGroup);
    }
  }, [filter, venue, pubs, userLocation]);

  // Handle Geolocation
  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }
    setLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(coords);
        setLocating(false);

        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([coords.lat, coords.lng], 15, { duration: 1.2 });
        }
      },
      (err) => {
        setLocating(false);
        setLocationError('Could not obtain your current location. Please check browser permissions.');
      },
      { timeout: 8000 }
    );
  };

  // Recenter map on stadium
  const handleRecenter = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([venue.coordinates.lat, venue.coordinates.lng], 15, { duration: 1 });
    }
  };

  return (
    <div id="interactive-match-map-container" className="space-y-3">
      {/* Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-1.5 rounded-2xl bg-[#08152e] border border-white/10">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Layers' },
            { id: 'stadium', label: 'Stadium' },
            { id: 'stations', label: 'Transit' },
            { id: 'pubs', label: 'Pubs & Food' }
          ].map((item) => (
            <button
              key={item.id}
              id={`map-layer-btn-${item.id}`}
              onClick={() => setFilter(item.id as any)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                filter === item.id
                  ? 'bg-white text-[#06142e] shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            id="map-recenter-stadium-btn"
            onClick={handleRecenter}
            title="Recenter on Stadium"
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#4ea8de] border border-white/10 transition-colors"
          >
            <Compass className="w-4 h-4" />
          </button>
          <button
            id="map-locate-me-btn"
            onClick={handleLocateUser}
            disabled={locating}
            title="Find My Location"
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#4ea8de]/20 hover:bg-[#4ea8de]/30 text-[#4ea8de] font-bold text-xs border border-[#4ea8de]/30 transition-colors"
          >
            <Navigation className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
            <span>{locating ? 'Locating...' : 'My Location'}</span>
          </button>
        </div>
      </div>

      {/* Geolocation error if any */}
      {locationError && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{locationError}</span>
        </div>
      )}

      {/* Map Canvas Frame */}
      <div className={`relative ${heightClass} w-full rounded-2xl overflow-hidden border border-white/15 shadow-xl bg-slate-950`}>
        <div ref={mapContainerRef} className="w-full h-full" style={{ zIndex: 1 }} />

        {/* Legend Overlay at Bottom Left */}
        <div className="absolute bottom-2 left-2 z-[400] px-2.5 py-1.5 rounded-xl bg-[#06142e]/90 backdrop-blur-md border border-white/10 text-[10px] text-white flex items-center gap-2.5 shadow-lg pointer-events-none">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#001C58] border border-white inline-block"></span>
            <span>Ground</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c] inline-block"></span>
            <span>Overground</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] inline-block"></span>
            <span>Tube</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#059669] inline-block"></span>
            <span>Spurs Pub</span>
          </div>
        </div>
      </div>

      {/* Selected Item Detail & Live Directions Panel */}
      {activeItem && (
        <div className="p-3.5 rounded-2xl bg-[#091730] border border-white/10 shadow-lg space-y-2.5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#4ea8de]/20 text-[#4ea8de]">
                  {activeItem.type.toUpperCase()}
                </span>
                <span className="text-xs text-slate-400">Live Directions Available</span>
              </div>
              <h4 className="text-sm font-bold text-white leading-snug">{activeItem.name}</h4>
              <p className="text-xs text-slate-300 mt-0.5">{activeItem.detail}</p>
            </div>
          </div>

          {/* Navigation Action Buttons (Google Maps / Apple Maps / Citymapper) */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-white/10">
            <a
              id="map-open-google-maps-btn"
              href={activeItem.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[120px] py-2 px-3 rounded-xl bg-[#4ea8de] hover:bg-[#3d97cd] text-[#06142e] font-black text-xs flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-[0.98]"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Google Maps</span>
              <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
            </a>

            <a
              id="map-open-apple-maps-btn"
              href={appleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 border border-white/10 transition-colors"
            >
              <span>Apple Maps</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>

            <a
              id="map-open-citymapper-btn"
              href={citymapperUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center gap-1.5 border border-emerald-500/30 transition-colors"
            >
              <span>Citymapper</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
