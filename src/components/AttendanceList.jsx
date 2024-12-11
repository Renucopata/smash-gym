import React from 'react'

export default function AttendanceList() {
    return (
        <div className="flex-1 bg-white shadow rounded p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-4">Asistencias del dia</h2>
          <ul>
            {[
              { time: "8:00 AM", name: "John Doe" },
              { time: "9:00 AM", name: "Jane Smith" },
              // Add more sample data
            ].map((attendance, index) => (
              <li key={index} className="flex justify-between py-2 border-b">
                <span>{attendance.time}</span>
                <span>{attendance.name}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    }
