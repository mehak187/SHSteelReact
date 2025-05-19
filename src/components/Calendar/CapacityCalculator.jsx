import React, { useState } from 'react'
import { Modal } from "@mui/material";
import EditCapacityCalculator from './EditCapacityCalculator';

const CapacityCalculator = () => {
    const [open, setOpen] = useState(false);
    const [modalopen, setmodalopen] = useState(false);
    const handlemodalopen = () => setmodalopen(true);
    const handlemodalclose = () => setmodalopen(false);
    return (
        <div>
            <div className='flex mt-5'>
                <div className='w-[40%]'>
                    <div className='flex justify-between'>
                        <div>
                            <h4 className='font-medium text-3xl '>Capacity Calculator</h4>
                        </div>
                        <div>
                            <button
                                onClick={handlemodalopen}
                                className="text-white text-sm font-medium bg-[#88191F] border border-[#88191F] rounded-[6px] py-2 px-4 shadow-[0px_2px_4px_0px_#2E263D29]"
                            >
                                Edit Capacity Calculator
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
                            <thead>
                                <tr className='border-r-4 border-[#F4F5FA] align-bottom text-left '>
                                    <th rowSpan={3} className='p-3 border-b-4 bg-white'>Structural</th>
                                </tr>
                                <tr>
                                    <th colSpan={2} className='p-3 border-b-4 bg-white'>Hrs/week</th>
                                </tr>
                                <tr>
                                    <th className='p-3 border-b-4 bg-white'>#EMP</th>
                                    <th className='p-3 border-b-4 bg-white'>40</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='p-3 text-[#828280] bg-white'>804</td>
                                    <td className='text-center p-3 text-[#828280] bg-white'>1</td>
                                    <td className='text-center p-3 text-[#828280] bg-white'>40</td>
                                </tr>
                                <tr>
                                    <td className='p-3 text-[#828280] bg-white'>total</td>
                                    <td className='text-center p-3 text-[#828280] bg-white'>14</td>
                                    <td className='text-center p-3 text-[#828280] bg-white'>560</td>
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
                                <tr>
                                    <th className='p-3 border-b-4 bg-white'>Misc</th>
                                    <th className='p-3 border-b-4 bg-white'>#EMP</th>
                                    <th className='p-3 border-b-4 bg-white'>40</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className='p-3 text-[#828280] bg-white'>Fit</td>
                                    <td className='text-center p-3 text-[#828280] bg-white'>4</td>
                                    <td className='text-center p-3 text-[#828280] bg-white'>160</td>
                                </tr>
                                <tr>
                                    <td className='p-3 text-[#828280] bg-white border-t-4 border-[#000]'>Total</td>
                                    <td className='text-center p-3 text-[#828280] bg-white border-t-4 border-[#000]'>4</td>
                                    <td className='text-center p-3 text-[#828280] bg-white border-t-4 border-[#000]'>160</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CapacityCalculator