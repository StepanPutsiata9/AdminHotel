import { getStatusColor } from "./room-layout";
import { Room } from "./rooms-data";

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
}

export default function RoomModal({ room, onClose }: RoomModalProps) {
  if (!room) return null;

  const statusText = {
    vacant: 'Vacant',
    occupied: 'Occupied',
    maintenance: 'Maintenance',
    cleaning: 'Cleaning'
  };

  const statusColor = {
    vacant: 'bg-[#17CF96]',
    occupied: 'bg-[#FF5252]',
    maintenance: 'bg-[#FFCC00]',
    cleaning: 'bg-[#4B9FFF]'
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Room {room.number}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl transition-colors duration-200"
          >
            &times;
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
          <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-5 ${getStatusColor(room.status)}`}></div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              </div>            
          </div>
              <p className="text-xl font-semibold text-gray-800">{room.status.toUpperCase()}</p>
          </div>
         
          <div>

          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-400 mr-3" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-gray-500">Temperature</p>
            </div>
          </div>
              <p className="text-xl font-semibold text-gray-800">{room.temperature}°C</p>

          </div>

        
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Additional information</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Entry</p>
              <p className="font-medium text-gray-800">{room.entry}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Departure</p>
              <p className="font-medium text-gray-800">{room.departure}</p>
            </div>
              <div>
              <p className="text-sm text-gray-500">Door status</p>
              <p className="font-medium text-gray-800">{room.doorStatus==="closed"?"Closed":"Open"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}