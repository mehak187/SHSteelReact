import React, { useState } from 'react'
import { Modal } from "@mui/material";
import EditCapacityCalculator from './EditCapacityCalculator';
import EditImg from "../../assets/images/edit.png"
import Eur from "../../assets/images/euro.png"
import CapacityTable from './CapacityTable';

const CapacityCalculator = () => {
    const [open, setOpen] = useState(false);
    const [modalopen, setmodalopen] = useState(false);
    const handlemodalopen = () => setmodalopen(true);
    const handlemodalclose = () => setmodalopen(false);

    const structuralData = [
        { label: "804", emp: 1, hours: 40 },
        { label: "Fabricator", emp: 1, hours: 40 },
        { label: "Parts", emp: 2, hours: 80 },
        { label: "Fitting", emp: 5, hours: 200 },
        { label: "Welding", emp: 5, hours: 200 },
    ];

    const miscData = [
        { label: "Fit", emp: 4, hours: 160 },
        { label: "Weld", emp: 3, hours: 120 },
    ];

    const annualData = [
        { label: "Total Yearly man Hours:", emp: "150,000",},
        { label: "Total Yearly Weight:", emp: "50,000", },
        { label: "Weight/Man Hr:", emp: "", },
    ];

    const monthlyData = [
        { label: "Total Yearly man Hours:", emp: "150,000",},
        { label: "Total Yearly Weight:", emp: "50,000", },
        { label: "Weight/Man Hr:", emp: "", },
    ];
    return (
        <div>
            <div className='2xl:flex mt-5 gap-12'>
                <div className='2xl:w-[40%]'>
                    <div className='flex justify-between'>
                        <div>
                            <h4 className='font-medium text-3xl '>Capacity Calculator</h4>
                        </div>
                        <div>
                            <button
                                onClick={handlemodalopen}
                                className="text-white text-sm font-medium bg-[#88191F] border border-[#88191F] rounded-[6px] py-2 px-2 shadow-[0px_2px_4px_0px_#2E263D29]"
                            >
                                <img src={EditImg} alt="" className='size-5' />
                            </button>
                            <Modal
                                open={modalopen}
                                onClose={handlemodalclose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                sx={{ m: 2 }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-1/2 w-full max-w-[500px] outline-0">
                                    <EditCapacityCalculator />
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <table className='w-full'>
                            <thead className='border-b-4'>
                                <tr className='align-bottom text-left '>
                                    <th rowSpan={3} className='p-3 border-r-8 border-[#F4F5FA] bg-white'>Structural</th>
                                </tr>
                                <tr>
                                    <th colSpan={2} className='p-3 border-b-4 bg-white'>Hrs/week</th>
                                </tr>
                                <tr>
                                    <th className='p-3 bg-white'>#EMP</th>
                                    <th className='p-3 bg-white'>40</th>
                                </tr>
                            </thead>
                            <tbody>
                                {structuralData.map((row, index) => (
                                    <tr key={index}>
                                        <td className="p-3 text-[#828280] bg-white border-r-8 border-[#F4F5FA]">{row.label}</td>
                                        <td className="text-center p-3 text-[#828280] bg-white">{row.emp}</td>
                                        <td className="text-center p-3 text-[#828280] bg-white">{row.hours}</td>
                                    </tr>
                                ))}
                                <tr className='border-t-4 border-[#000]'>
                                    <td className='p-3 text-[#000] font-medium bg-white border-r-8 border-[#F4F5FA]'>Total</td>
                                    <td className='text-center p-3 text-[#000] font-medium bg-white'>14</td>
                                    <td className='text-center p-3 text-[#000] bg-white font-medium'>560</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td className='p-3 text-center'> 760</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mt-10'>
                        <table className='w-full'>
                            <thead>
                                <tr className='border-b-4 border-[#000]'>
                                    <th className='p-3 bg-white text-left border-r-8 border-[#F4F5FA] w-[500px]'>Misc</th>
                                    <th className='p-3 border-b-4 bg-white'>#EMP</th>
                                    <th className='p-3 border-b-4 bg-white'>40</th>
                                </tr>
                            </thead>
                            <tbody>
                                {miscData.map((row, index) => (
                                    <tr key={index}>
                                        <td className={`p-3 text-[#828280] border-r-8 border-[#F4F5FA] bg-white ${row.label === "Total" ? "border-t-4 border-[#000]" : ""}`}>
                                            {row.label}
                                        </td>
                                        <td className={`text-center p-3 text-[#828280] bg-white ${row.label === "Total" ? "border-t-4 border-[#000]" : ""}`}>
                                            {row.emp}
                                        </td>
                                        <td className={`text-center p-3 text-[#828280] bg-white ${row.label === "Total" ? "border-t-4 border-[#000]" : ""}`}>
                                            {row.hours}
                                        </td>
                                    </tr>
                                ))}
                                <tr className='border-t-4 border-[#000]'>
                                    <td className='p-3 text-[#000] font-medium bg-white border-r-8 border-[#F4F5FA]'>Total</td>
                                    <td className='text-center p-3 text-[#000] font-medium bg-white'>4</td>
                                    <td className='text-center p-3 text-[#000] bg-white font-medium'>280</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="2xl:w-[60%] 2xl:mt-0 mt-4">
                    <div className='max-w-[2100px] w-full overflow-x-auto mx-auto pb-3 text-nowrap'>
                        <CapacityTable/>
                    </div>
                </div>
            </div>
            <div className='mt-7'>
                <h4 className='bg-[#88191F] text-white font-medium text-3xl py-2 px-4 w-full'>Metrics</h4>
                <div className='xl:w-[40%] mt-5 max-w-[2100px] overflow-x-auto pb-3 text-nowrap'>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className='p-3 border-b-4 bg-white text-left'>Annual:</th>
                                <th className='p-3 bg-white'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {annualData.map((row, index) => (
                                <tr key={index}>
                                    <td className={`p-3 text-[#828280] bg-white ${row.label === "Total" ? "border-t-4 border-[#000]" : ""}`}>
                                        {row.label}
                                    </td>
                                    <td className={`text-center p-3 text-[#828280] bg-white inset-shadow-sm ${row.label === "Total" ? "border-t-4 border-[#000]" : ""}`}>
                                        <div className='flex items-center gap-2'>
                                            <div>
                                                <img src={Eur} alt="" className='w-[20px] object-contain'/>
                                            </div>
                                            {row.emp || "------"}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th className='p-3 border-b-4 bg-white text-left'>Monthly:</th>
                                <th className='p-3 bg-white'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {monthlyData.map((row, index) => (
                                <tr key={index}>
                                    <td className={`p-3 text-[#828280] bg-white ${row.label === "Total" ? "border-t-4 border-[#000]" : ""}`}>
                                        {row.label}
                                    </td>
                                    <td className={`text-center p-3 text-[#828280] bg-white inset-shadow-sm ${row.label === "Total" ? "border-t-4 border-[#000]" : ""}`}>
                                        <div className='flex items-center gap-2'>
                                            <div>
                                                <img src={Eur} alt="" className='w-[20px] object-contain'/>
                                            </div>
                                            {row.emp || "------"}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CapacityCalculator