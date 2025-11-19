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

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        toast.error("Əvvəlcə hesaba daxil olun");
        navigate('/auth/login', { replace: true });
        return;
      }

      try {
        const response = await $axios.get($api(API['user-info']));

        if (response.data.success) {
          AuthService.userData = response.data.data;
          setUser(response.data.data);
          setLoading(false);
        } else {
          toast.error("Yenidən daxil olun");
          navigate('/auth/login', { replace: true });
        }
      }
      catch (error) {
        toast.error("Serverdə problem baş verdi. Yenidən daxil olun.");
        navigate('/auth/login', { replace: true });
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center bg-[#AA0000] bg-[radial-gradient(circle,rgba(170,0,0,1)_0%,rgba(31,28,24,1)_60%,rgba(0,0,0,1)_100%)]'>
        <RingLoader
          color="#ffffff"
          size={100}
          speedMultiplier={1.5}
        />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2 bg-[#AA0000] pt-[100px] bg-[radial-gradient(circle,rgba(170,0,0,1)_0%,rgba(31,28,24,1)_60%,rgba(0,0,0,1)_100%)] min-h-screen'>
      <ProfHead user={user} />
      <div className='container w-[99%] flex-1 mb-5 p-9 mx-auto bg-black/30 rounded-[0px_0px_50px_50px] border-2 border-white flex flex-col md:flex-col lg:flex-row items-center md:justify-center' style={{ borderStyle: "inset" }}>
        <Outlet context={{ user }}/>
      </div>
    </div>
  )
}

export default ProfilePage;