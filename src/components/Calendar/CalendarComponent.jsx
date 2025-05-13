import React, { useState } from 'react';
import SingleSelect from './SingleSelect';

const CalendarComponent = () => {
    const selectManager = [
        "Shane",
        "Joe",
        "Root",
        "Martin",
        "Adam",
        "NAU Skydome",
    ];

    const generateDates = (startDate, numberOfDays) => {
        const dates = [];
        const days = [];
        const options = { day: 'numeric', month: 'short' }; // Format: "1, Jan"
        const dayOptions = { weekday: 'short' }; // Format: "Mon", "Tue"

        let currentDate = new Date(startDate);
        while (dates.length < numberOfDays) {
            const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
            if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip Sundays (0) and Saturdays (6)
                dates.push(currentDate.toLocaleDateString('en-US', options));
                days.push(currentDate.toLocaleDateString('en-US', dayOptions));
            }
            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }

        return { dates, days };
    };

    // Example: Start from January 1, 2025, and generate 10 days
    const { dates, days } = generateDates(new Date(2025, 5, 1), 10);

    // Example data for rows
    const rows = [
        {
            id: "001",
            name: "Orangewood",
            pc: "PC",
            departments: ["SHOP", "MISC", "FIELD"],
            manHours: [2227, 0, 0],
            scheduleType: "Standard",
            startDates: ["1, Jan", "15, Feb"],
            durationWeeks: [8, 5],
            hours: [105, 105, 105],
        },
        {
            id: "002",
            name: "Orangewood",
            pc: "PC",
            departments: ["SHOP", "MISC", "FIELD"],
            manHours: [2227, 0, 0],
            scheduleType: "Front",
            startDates: ["1, Jan", "15, Feb"],
            durationWeeks: [8, 5],
            hours: [105, 105, 105],
        },
        {
            id: "002",
            name: "Orangewood",
            pc: "PC",
            departments: ["SHOP", "MISC", "FIELD"],
            manHours: [2227, 0, 0],
            scheduleType: "Back",
            startDates: ["1, Jan", "15, Feb"],
            durationWeeks: [8, 5],
            hours: [105, 105, 105],
        },
    ];

    return (
        <div className="mt-4 max-w-[1300px] overflow-x-auto ">
            <table className="w-full h-full mb-3 border-separate">
                <thead>
                    <tr className="align-middle">
                        <th rowSpan={2} className="text-start bg-white p-2 rounded-t-lg ">
                            <SingleSelect placeholder="Select Project Manager" options={selectManager} />
                        </th>
                        <th rowSpan={2} className="text-[#FFFFFF99] bg-black p-2 text-lg rounded-t-lg ">PC</th>
                        <th rowSpan={2} className="text-[#FFFFFF99] bg-black p-2 text-lg rounded-tl-lg">Dept</th>
                        <th rowSpan={2} className="text-[#FFFFFF99] bg-black p-2 text-sm rounded-tr-lg">Man Hrs</th>
                        <th rowSpan={2} className="text-[#FFFFFF99] bg-black p-2 text-sm rounded-t-lg">Schedule Type</th>
                        <th rowSpan={2} className="text-[#FFFFFF99] bg-black p-2 text-sm rounded-t-lg">Start Date</th>
                        <th rowSpan={2} className="text-[#FFFFFF99] bg-black p-2 text-sm rounded-t-lg">Stop Duration Weeks</th>
                        {dates.map((date, index) => (
                            <th
                                key={index}
                                className="text-[#2E263DE5] bg-white p-2 text-nowrap border-2 border-t-0 border-[#2E263D1F]"
                            >
                                {date}
                            </th>
                        ))}
                    </tr>
                    <tr className="align-middle">
                        {days.map((day, index) => (
                            <th key={index} className="bg-[#D9D9D9] text-[#2E263DE5] font-medium p-2">
                                {day}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            <tr>
                                <td rowSpan={4} className={`text-start ${rowIndex % 2 === 0 ? 'bg-[#F5F5F5]' : 'bg-white'} p-2 `}>
                                    <div className="flex">
                                        {row.id} <p className="text-[#828280] ms-2">{row.name}</p>
                                    </div>
                                </td>
                            </tr>
                            <tr className="align-top border-b border-[#2E263D1F]">
                                <td rowSpan={3} className={`text-start ${rowIndex % 2 === 0 ? 'bg-[#F5F5F5]' : 'bg-white'} p-2 `}>
                                    <p className="text-[#828280]">{row.pc}</p>
                                </td>
                                <td rowSpan={3} className={`text-start ${rowIndex % 2 === 0 ? 'bg-[#F5F5F5]' : 'bg-white'} p-2 `}>
                                    <div>
                                        {row.departments.map((dept, index) => (
                                            <p
                                                className={`py-1 px-3 w-full rounded-lg mb-2 ${dept === "SHOP"
                                                    ? "text-white bg-[#88191F]"
                                                    : dept === "MISC"
                                                        ? "text-white bg-[#565654]"
                                                        : "text-black bg-[#D9D9D9]"
                                                    }`}
                                            >
                                                {dept}
                                            </p>
                                        ))}
                                    </div>
                                </td>
                                <td rowSpan={3} className={`text-start ${rowIndex % 2 === 0 ? 'bg-[#F5F5F5]' : 'bg-white'} p-2 `}>
                                    <div>
                                        {row.manHours.map((hour, index) => (
                                            <p key={index} className="border-b border-[#2E263D1F] p-2">
                                                {hour}
                                            </p>
                                        ))}
                                    </div>
                                </td>
                                <td rowSpan={3} className={`text-start ${rowIndex % 2 === 0 ? 'bg-[#F5F5F5]' : 'bg-white'} p-2 `}>
                                    <div>
                                        <p className={`py-1 px-3 w-full text-center rounded-lg mb-2 ${row.scheduleType === "Standard"
                                            ? "text-white bg-[#56CA00]"
                                            : row.scheduleType === "Front"
                                                ? "text-white bg-[#33BBFE]"
                                                : "text-white bg-[#FF4C51]"
                                            }`}
                                        >
                                            {row.scheduleType}
                                        </p>
                                    </div>
                                </td>
                                <td rowSpan={3} className={`text-start ${rowIndex % 2 === 0 ? 'bg-[#F5F5F5]' : 'bg-white'} p-2 `}>
                                    <div>
                                        {row.startDates.map((date, index) => (
                                            <p key={index} className="border-b border-[#2E263D1F] p-2 text-nowrap">
                                                {date}
                                            </p>
                                        ))}
                                    </div>
                                </td>
                                <td rowSpan={3} className={`text-start ${rowIndex % 2 === 0 ? 'bg-[#F5F5F5]' : 'bg-white'} p-2 `}>
                                    <div>
                                        {row.durationWeeks.map((week, index) => (
                                            <p key={index} className="border-b border-[#2E263D1F] p-2">
                                                {week}
                                            </p>
                                        ))}
                                    </div>
                                </td>
                                {[...Array(2)].map((_, index) => (
                                    <td key={index} colSpan={5} className={`text-center text-[#2E263DE5] text-sm ${rowIndex % 2 === 0 ? 'bg-[#F5F5F5]' : 'bg-white'} p-2 border-r-2 border-[#2E263D1F]`}>
                                        {row.hours[0]}hrs
                                    </td>
                                ))}
                            </tr>
                            <tr className='border-b border-[#2E263D1F]'>
                                {[...Array(2)].map((_, index) => (
                                    <td key={index} colSpan={5} className={`text-center text-[#2E263DE5] text-sm ${rowIndex % 2 === 0 ? 'bg-[#F5F5F5]' : 'bg-white'} p-2 border-r-2 border-[#2E263D1F]`}>
                                        {row.hours[0]}hrs
                                    </td>
                                ))}
                            </tr>
                            <tr className='border-b-2 border-[#2E263D1F]'>
                                {[...Array(10)].map((_, index) => (
                                    <td key={index} className={`text-center text-[#2E263DE5] text-sm ${rowIndex % 2 === 0 ? 'bg-[#F5F5F5]' : 'bg-white'} p-2 border-r-2 border-[#2E263D1F]`}>
                                        {row.hours[0]}hrs
                                    </td>
                                ))}
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CalendarComponent;