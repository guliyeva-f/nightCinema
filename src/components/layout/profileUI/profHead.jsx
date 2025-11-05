import React from "react";
import { AuthService } from "@/services/auth/auth.service";
import { useNavigate } from "react-router-dom";
import IconLabelTabs from "../../ui/tabs";
import { createTheme, ThemeProvider } from '@mui/material/styles';

function ProfHead({ user }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        AuthService.userData = {};
        navigate('/auth/login');
    };

    const capitalize = (str) =>
        str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

    const theme = createTheme({
        components: {
            MuiTab: {
                styleOverrides: {
                    root: {
                        "&.Mui-selected": {
                            color: "#fff",
                        },
                    },
                },
            },
        },
    });

    return (
        <>
            <div className='container mx-auto p-[10px] md:p-[10px_20px] bg-black/30 flex flex-col justify-between items-center rounded-[50px_50px_0px_0px] border-2 border-white'
                style={{ borderStyle: "inset", fontFamily: 'Outfit, sans-serif' }}>
                <div className="flex items-center justify-between w-full">
                    <div className='flex justify-center gap-3 items-center'>
                        <div className='w-[60px] h-[60px] md:w-[80px] md:h-[80px] md-h[80px]'>
                            <img className='rounded-full border-2 border-white'
                                src={user?.profilePhotoUrl} alt="profilePic"
                            />
                        </div>
                        <h2 className="text-[18px] md:text-[1.5rem] font-bold">
                            {user && `Hi, ${capitalize(user.username)}`}
                        </h2>
                    </div>
                    {/* bu desktopda gorunur */}
                    <div className="absolute left-1/2 hidden md:flex transform -translate-x-1/2">
                        <ThemeProvider theme={theme}>
                            <IconLabelTabs />
                        </ThemeProvider>
                    </div>

                    <button onClick={handleLogout}
                        className="bg-red-950 text-[14px] md:text-[16px] text-white cursor-pointer border border-red-200 border-b-4 font-medium overflow-hidden relative md:px-4 px-3 py-2 rounded-2xl mr-2 hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group flex justify-center" >
                        <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
                        Log out
                    </button>
                </div>

                <span className="border-b-1 border-white w-1/3 pt-2 mb-2 md:hidden"></span>

                <div className="md:hidden">
                    <ThemeProvider theme={theme}>
                        <IconLabelTabs />
                    </ThemeProvider>
                </div>
            </div>
        </>
    );
}

export default ProfHead;
