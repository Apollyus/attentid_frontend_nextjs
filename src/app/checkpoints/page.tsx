import React from 'react';

interface Device {
  macAddress: string;
  location: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const mockDevices: Device[] = [
  { macAddress: '00:1A:2B:3C:4D:5E', location: 'Kancelář Teplice', address: 'Masarykova třída 10, Teplice', coordinates: { lat: 50.6403, lng: 13.8275 } },
  { macAddress: 'F8:E7:D6:C5:B4:A3', location: 'Sklad Proboštov', address: 'Přemyslova 25, Proboštov', coordinates: { lat: 50.6511, lng: 13.8382 } },
  { macAddress: '12:34:56:78:90:AB', location: 'Pobočka Dubí', address: 'Ruská 150, Dubí', coordinates: { lat: 50.6800, lng: 13.7810 } },
  { macAddress: 'CD:EF:01:23:45:67', location: 'Prodejna Krupka', address: 'Mariánské náměstí 5, Krupka', coordinates: { lat: 50.6860, lng: 13.8600 } },
  { macAddress: '89:AB:CD:EF:01:23', location: 'Serverovna Teplice', address: 'Masarykova třída 10, Teplice - Suterén', coordinates: { lat: 50.6402, lng: 13.8274 } },
  { macAddress: '45:67:89:AB:CD:EF', location: 'Vzdálená lokalita Bílina', address: 'Pražská 1, Bílina', coordinates: { lat: 50.5478, lng: 13.7769 } },
  { macAddress: 'EF:01:23:45:67:89', location: 'Mobilní jednotka Ústí', address: 'Na cestě - Ústecký kraj', coordinates: { lat: 50.6600, lng: 14.0300 } },
  { macAddress: 'AB:CD:EF:01:23:45', location: 'Kancelář Teplice - 2. patro', address: 'Masarykova třída 10, Teplice', coordinates: { lat: 50.6404, lng: 13.8276 } },
  { macAddress: '67:89:AB:CD:EF:01', location: 'Sklad Novosedlice', address: 'Tyršova 30, Novosedlice', coordinates: { lat: 50.6333, lng: 13.8500 } },
  { macAddress: '23:45:67:89:AB:CD', location: 'Pobočka Duchcov', address: 'Osecká 22, Duchcov', coordinates: { lat: 50.6012, lng: 13.7453 } },
];

const CheckpointListPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Přehled Checkpointů</h1>
          <p className="text-gray-600 mt-1">Seznam registrovaných zařízení a jejich detailů.</p>
        </header>
        
        <div className="shadow-xl rounded-lg overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    MAC Adresa
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lokace
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Adresa
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Souřadnice (Lat, Lng)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockDevices.map((device, index) => (
                  <tr key={device.macAddress} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{device.macAddress}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{device.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{device.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{`${device.coordinates.lat}, ${device.coordinates.lng}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckpointListPage;