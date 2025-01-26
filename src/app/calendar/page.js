// app/calendar/page.js
'use client'
import { useState, useEffect } from 'react';

export default function Calendar() {
    const [selectedDays, setSelectedDays] = useState([]);
    const [availableDays, setAvailableDays] = useState([]);
    const [userData, setUserData] = useState({
        name: '',
        phone: ''
    });

    useEffect(() => {
        // Generate next 12 days
        const days = [];
        const today = new Date();
        for (let i = 0; i < 12; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push(date);
        }
        setAvailableDays(days);
    }, []);

    const handleDaySelect = (date) => {
        if (selectedDays.includes(date.toDateString())) {
            setSelectedDays(selectedDays.filter(d => d !== date.toDateString()));
        } else if (selectedDays.length < 6) {
            setSelectedDays([...selectedDays, date.toDateString()]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch('/api/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    days: selectedDays,
                    ...userData
                })
            });
            alert('Reservation successful!');
        } catch (error) {
            alert('Failed to make reservation');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Select Days</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        className="p-2 border rounded"
                        value={userData.name}
                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                        required
                    />
                    <input
                        type="tel"
                        placeholder="Phone"
                        className="p-2 border rounded"
                        value={userData.phone}
                        onChange={(e) => setUserData({...userData, phone: e.target.value})}
                        required
                    />
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {availableDays.map((date) => (
                        <button
                            key={date.toDateString()}
                            type="button"
                            onClick={() => handleDaySelect(date)}
                            className={`p-4 rounded border ${
                                selectedDays.includes(date.toDateString())
                                    ? 'bg-blue-500 text-white'
                                    : 'hover:bg-gray-100'
                            }`}
                        >
                            {date.toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </button>
                    ))}
                </div>

                <div className="flex justify-between items-center">
                    <p>Selected: {selectedDays.length}/6 days</p>
                    <button
                        type="submit"
                        disabled={selectedDays.length === 0 || !userData.name || !userData.phone}
                        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
                    >
                        Reserve
                    </button>
                </div>
            </form>
        </div>
    );
}