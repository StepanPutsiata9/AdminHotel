"use client";

import { useEffect, useRef, useState } from 'react';
import { SVG, Rect } from '@svgdotjs/svg.js';
import '@svgdotjs/svg.panzoom.js';
import { Room, rooms } from './rooms-data';
import RoomModal from './room-modal';
import LayoutLegend from './layout-legend';

export const getStatusColor = (status: Room['status']): string => {
    switch (status) {
      case 'available': return '#17CF96';
      case 'occupied': return '#FF5252';
      case 'out_of_service': return '#FFCC00';
      case 'clean': return '#4B9FFF';
      default: return '#999999';
    }
  };

export default function RoomLayout() {
  const svgContainer = useRef<HTMLDivElement>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [roomsData, setRoomsData] = useState<Room[]>(rooms.map(room => ({
    ...room,
    status: null
  })));
  const roomRects = useRef<Record<string, Rect>>({});
  const drawRef = useRef<SVGSVGElement | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const viewStateRef = useRef<{ x: number; y: number; zoom: number } | null>(null);

  const handleCloseModal = () => {
    setSelectedRoom(null);
  };

  useEffect(() => {
    const fetchRoomStatuses = async () => {
      try {
        const response = await fetch('/api/apartments/status');
        const statusData = await response.json();

        console.log(statusData);
        
        // Update rooms with new statuses, maintaining the original room data
        const updatedRooms = rooms.slice(0, statusData.length).map((room, index) => ({
          ...room,
          id: statusData[index].id,
          status: statusData[index].status
        }));

        console.log(updatedRooms);
        
        setRoomsData(updatedRooms);
      } catch (error) {
        console.error('Failed to fetch room statuses:', error);
      }
    };

    fetchRoomStatuses();
    // Optionally add an interval to refresh statuses
    const interval = setInterval(fetchRoomStatuses, 300000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Object.entries(roomRects.current).forEach(([roomId, rect]) => {
      if (selectedRoom && roomId === String(selectedRoom.id)) {
        rect.stroke({ color: '#ffffff', width: 2, opacity: 1 });
      } else {
        rect.stroke({ color: '#ffffff', width: 1, opacity: 0.6 });
      }
    });
  }, [selectedRoom]);

  useEffect(() => {
    const container = svgContainer.current;
    if (!container) return;

    function initializeSVG() {
      if (drawRef.current) {
        // Store current view state before removing
        const panZoom = drawRef.current.panZoom();
        if (panZoom) {
          viewStateRef.current = {
            x: panZoom.x,
            y: panZoom.y,
            zoom: panZoom.zoom
          };
        }
        drawRef.current.remove();
        drawRef.current = null;
      }
      roomRects.current = {};

      const draw = SVG().addTo(container).size('100%', '100%');
      drawRef.current = draw.node as unknown as SVGSVGElement;

      draw.panZoom({
        zoomMin: 0.5,
        zoomMax: 5,
        zoomFactor: 0.1
      });

      const gridSize = 20;
      const gridGroup = draw.group().attr({ id: 'grid' });

      const maxX = Math.max(...roomsData.map(r => r.x + r.width)) + 100;
      const maxY = Math.max(...roomsData.map(r => r.y + r.height)) + 100;
      
      for (let x = 0; x <= maxX; x += gridSize) {
        gridGroup.line(x, 0, x, maxY).stroke({ 
          width: x % 100 === 0 ? 0.5 : 0.2, 
          color: '#304441', 
          opacity: x % 100 === 0 ? 0.5 : 0.3 
        });
      }

      for (let y = 0; y <= maxY; y += gridSize) {
        gridGroup.line(0, y, maxX, y).stroke({ 
          width: y % 100 === 0 ? 0.5 : 0.2, 
          color: '#304441', 
          opacity: y % 100 === 0 ? 0.5 : 0.3 
        });
      }

      const addRoom = (room: Room) => {
        console.log('room', room);
        const group = draw.group().attr({ id: room.id });
        
        const rect = group.rect(room.width, room.height)
          .move(room.x, room.y)
          .radius(4)
          .fill(getStatusColor(room.status))
          .opacity(0.7)
          .stroke({ color: '#ffffff', width: 1, opacity: 0.6 });

        roomRects.current[String(room.id)] = rect;

        group.text(room.number)
          .font({ 
            family: 'Geist',
            size: 28, 
            weight: 'regular',
            anchor: 'middle'
          })
          .fill('#ffffff')
          .center(room.x + room.width / 2, room.y + room.height / 2);

        group.click(() => {
          setSelectedRoom(room);
        });
      };

      roomsData.forEach(addRoom);

      // Restore previous view state if it exists
      if (viewStateRef.current) {
        const panZoom = draw.panZoom();
        if (panZoom) {
          panZoom.zoom(viewStateRef.current.zoom);
          panZoom.move(viewStateRef.current.x, viewStateRef.current.y);
        }
      } else {
        // Initial viewbox setup if no previous state
        draw.viewbox({
          x: 0,
          y: 0,
          width: container.clientWidth,
          height: container.clientHeight
        });
      }
    }

    initializeSVG();

    if (!observerRef.current) {
      observerRef.current = new ResizeObserver(() => {
        initializeSVG();
      });
    }
    observerRef.current.observe(container);

    return () => {
      if (drawRef.current) {
        drawRef.current.remove();
        drawRef.current = null;
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      roomRects.current = {};
    };
  }, [roomsData]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div ref={svgContainer} className="w-full h-full" style={{ minHeight: '100vh' }} />
      <LayoutLegend />
      <RoomModal room={selectedRoom} onClose={handleCloseModal} />
    </div>
  );
}