import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../lib/leafletIcon";

const serviceCoverage = [
  // Dhaka Division
  {
    location: "Dhaka North",
    latitude: 23.8103,
    longitude: 90.4125,
    status: "Active",
    issues: 124,
  },
  {
    location: "Dhaka South",
    latitude: 23.7233,
    longitude: 90.4086,
    status: "Active",
    issues: 98,
  },
  {
    location: "Gazipur",
    latitude: 23.9999,
    longitude: 90.4203,
    status: "Active",
    issues: 67,
  },
  {
    location: "Narayanganj",
    latitude: 23.6238,
    longitude: 90.5,
    status: "Active",
    issues: 52,
  },

  // Chattogram Division
  {
    location: "Chattogram City",
    latitude: 22.3569,
    longitude: 91.7832,
    status: "Active",
    issues: 89,
  },
  {
    location: "Cox’s Bazar",
    latitude: 21.4272,
    longitude: 92.0058,
    status: "Active",
    issues: 41,
  },
  {
    location: "Noakhali",
    latitude: 22.8696,
    longitude: 91.0994,
    status: "Limited",
    issues: 28,
  },

  // Rajshahi Division
  {
    location: "Rajshahi City",
    latitude: 24.3745,
    longitude: 88.6042,
    status: "Active",
    issues: 36,
  },
  {
    location: "Bogra",
    latitude: 24.8465,
    longitude: 89.3773,
    status: "Active",
    issues: 44,
  },

  // Khulna Division
  {
    location: "Khulna City",
    latitude: 22.8456,
    longitude: 89.5403,
    status: "Active",
    issues: 33,
  },
  {
    location: "Jessore",
    latitude: 23.1667,
    longitude: 89.2167,
    status: "Limited",
    issues: 21,
  },

  // Sylhet Division
  {
    location: "Sylhet City",
    latitude: 24.8949,
    longitude: 91.8687,
    status: "Active",
    issues: 29,
  },

  // Rangpur Division
  {
    location: "Rangpur City",
    latitude: 25.7439,
    longitude: 89.2752,
    status: "Limited",
    issues: 18,
  },

  // Barishal Division
  {
    location: "Barishal City",
    latitude: 22.701,
    longitude: 90.3535,
    status: "Limited",
    issues: 15,
  },

  // Mymensingh Division
  {
    location: "Mymensingh City",
    latitude: 24.7471,
    longitude: 90.4203,
    status: "Limited",
    issues: 19,
  },
];

const ServiceCoverage = () => {
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = e.target.location.value.toLowerCase();

    if (!keyword) return;

    const zone = serviceCoverage.find((z) =>
      z.location.toLowerCase().includes(keyword)
    );

    if (zone && mapRef.current) {
      mapRef.current.flyTo([zone.latitude, zone.longitude], 13, {
        duration: 1.5,
      });
    }
  };

  return (
    <main className="flex-1 bg-background-dark py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <h1 className="font-display text-4xl font-bold text-white">
            Service Coverage
          </h1>
          <p className="mt-3 text-slate-400">
            View the areas currently covered by our public infrastructure issue
            reporting system.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="mb-8 max-w-md flex">
          <input
            type="search"
            name="location"
            placeholder="Search district (e.g. Dhaka)"
            className="input-box"
          />
          <button type="submit" className="btn-primary">
            Search
          </button>
        </form>

        {/* Map */}
        <div className="relative z-0 rounded-2xl overflow-hidden border border-slate-800 h-[1000px]">
          <MapContainer
            center={[23.685, 90.3563]}
            zoom={8}
            scrollWheelZoom={false}
            className="h-full w-full"
            ref={mapRef}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCoverage.map((zone, index) => (
              <Marker key={index} position={[zone.latitude, zone.longitude]}>
                <Popup>
                  <div className="text-sm">
                    <h3 className="font-semibold">{zone.location}</h3>
                    <p>Status: {zone.status}</p>
                    <p>Issues Reported: {zone.issues}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Info */}
        <p className="mt-6 text-sm text-slate-500">
          This coverage map is based on currently supported administrative
          regions.
        </p>
      </div>
    </main>
  );
};

export default ServiceCoverage;
