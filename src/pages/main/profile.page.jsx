import React, { useEffect, useState } from 'react';
import ProfHead from '@/components/layout/profileUI/profHead';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthService } from '@/services/auth/auth.service';
import { $axios } from '@/api/accessor';
import { $api } from '@/api/api';
import { API } from '@/api/endpoints';
import toast from 'react-hot-toast';
import { RingLoader } from 'react-spinners';

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const refetchUser = async () => {
    try {
      setLoading(true);
      const response = await $axios.get($api(API['user-info']));
      if (response.data.success) {
        AuthService.userData = response.data.data;
        setUser(response.data.data);
      } else {
        toast.error("Yenidən daxil olun");
        navigate('/auth/login', { replace: true });
      }
    } catch (error) {
      console.log("Refetch error:", error);
      if (error.response) {
        if (error.response.status === 500) {
          setErrorMsg("İnternet bağlantınız yoxdur..");
        } else if (error.response.status === 503) {
          setErrorMsg("Server bağlıdır, backendçi ilə əlaqə saxlayın..");
        } else {
          setErrorMsg("Naməlum xəta baş verdi");
        }
      } else {
        setErrorMsg("Serverə qoşulmaq mümkün olmadı..");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      toast.error("Əvvəlcə hesaba daxil olun");
      navigate('/auth/login', { replace: true });
      return;
    }
    refetchUser();
  }, []);

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center bg-[#AA0000] bg-[radial-gradient(circle,rgba(170,0,0,1)_0%,rgba(31,28,24,1)_60%,rgba(0,0,0,1)_100%)]'>
        <div className="absolute m-0 inset-0 flex z-2 bg-linear-to-b from-[#10000050] to-transparent pointer-events-none"></div>
        <RingLoader color="#ffffff" size={100} speedMultiplier={1.5} className='z-5' />
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className='h-screen flex items-center justify-center px-6 text-center text-white text-2xl font-semibold
      bg-[#AA0000] bg-[radial-gradient(circle,rgba(170,0,0,1)_0%,rgba(31,28,24,1)_60%,rgba(0,0,0,1)_100%)]'>
        <div className="absolute m-0 inset-0 flex z-2 bg-linear-to-b from-[#10000050] to-transparent pointer-events-none"></div>
        <p className='z-5 text-white text-xl font-semibold text-center'>{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2 bg-[#AA0000] pt-[100px] bg-[radial-gradient(circle,rgba(170,0,0,1)_0%,rgba(31,28,24,1)_60%,rgba(0,0,0,1)_100%)] min-h-screen'>
      <div className="absolute m-0 inset-0 flex z-2 bg-linear-to-b from-[#10000050] to-transparent pointer-events-none"></div>
      <ProfHead user={user}/>
      <div className='container z-5 w-[90%] flex-1 mb-5 p-9 mx-auto bg-black/30 rounded-[0px_0px_50px_50px] border-2 border-white flex flex-col md:flex-col lg:flex-row items-center md:justify-center' style={{ borderStyle: "inset" }}>
        <Outlet context={{ user, setUser, refetchUser }} />
      </div>
    </div>
  )
}

export default ProfilePage;