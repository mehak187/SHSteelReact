import { useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddNewProject from './Calendar/AddNewProject';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function TabComponent({ tabs }) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = useState(false);

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 0, borderColor: 'divider', overflowX: 'auto', width: '100%' }}>
                <div className='sm:flex justify-between'>
                <Tabs
                    indicatorColor='transparent'
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ fontFamily: "inter", minHeight: "32px", }}
                    value={value}
                    onChange={handleChange}
                    aria-label="custom tabs example"
                >
                    {tabs?.map((tab, index) => (
                        <Tab
                            sx={{
                                fontFamily: "inter",
                                textTransform: "capitalize",
                                fontSize: { xs: "12px", sm: "14px" },
                                fontWeight: "500",
                                color: "#868789",
                                minWidth: "42px",
                                position: "relative",
                                minHeight: "32px",
                                padding: { xs: "5px 10px", sm: "5px 14px" },
                                borderBottom: "solid 1px #D4D5D9",
                                '&.Mui-selected': {
                                    color: "#000 !important",
                                    borderBottom: "solid 3px #000",
                                    fontFamily: "inter",
                                    fontWeight: "500",
                                    fontSize: "22px",
                                },
                                '& .MuiTabScrollButton-root': {
                                    width: '12px',
                                }
                            }}
                            key={index}
                            label={tab.label}
                            {...a11yProps(index)}
                        />
                    ))}
                </Tabs>
                <div className='flex justify-end sm:mt-0 mt-3'>
                    <div>
                        <button
                            className="text-white text-base font-medium bg-[#88191F] border border-[#88191F] rounded-[6px] py-2 px-4 shadow-[0px_2px_4px_0px_#2E263D29]"
                            onClick={() => setOpen(true)}
                        >
                            + Add New Project
                        </button>
                    </div>
                    <AddNewProject open={open} onOpenChange={setOpen} />
                </div>
                </div>
            </Box>
            {tabs?.map((tab, index) => (
                <CustomTabPanel key={index} value={value} index={index}>
                    {tab.content}
                </CustomTabPanel>
            ))}
        </Box>
    );
}
