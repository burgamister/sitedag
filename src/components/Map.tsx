import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // TODO: Add your Mapbox public token here
    // Get it from https://mapbox.com/ -> Account -> Tokens
    mapboxgl.accessToken = 'YOUR_MAPBOX_PUBLIC_TOKEN';
    
    // Makhachkala, Dagestan coordinates
    const makhachkalaCoords: [number, number] = [47.5047, 42.9849];

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: makhachkalaCoords,
      zoom: 14,
      pitch: 0,
    });

    // Add marker for DagEnglish location
    new mapboxgl.Marker({ color: '#474E27' })
      .setLngLat(makhachkalaCoords)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML('<div style="font-family: Montserrat, sans-serif; padding: 4px;"><strong>DagEnglish</strong><br/>Махачкала, Дагестан</div>')
      )
      .addTo(map.current);

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: false,
      }),
      'top-right'
    );

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[600px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
    </div>
  );
};

export default Map;
