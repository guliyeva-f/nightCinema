import React, { useEffect, useState } from 'react';
import ProfHead from '@/components/layout/profileUI/profHead';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthService } from '@/services/auth/auth.service';
import { $axios } from '@/api/accessor';
import { $api } from '@/api/api';
import { API } from '@/api/endpoints';

function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        navigate('/auth/login');
        return;
      }

      try {
        const response = await $axios.get($api(API['user-info']));

        if (response.data.success) {
          AuthService.userData = response.data.data;
          setUser(response.data.data);
        }
        else {
          navigate('/auth/login');
        }
      }
      catch (error) {
        console.error('Auth check error:', error);
        navigate('/auth/login');
      }
      finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center bg-[#AA0000] bg-[radial-gradient(circle,_rgba(170,0,0,1)_0%,_rgba(31,28,24,1)_60%,_rgba(0,0,0,1)_100%)]'>
        <h2 className='text-2xl'>Loading...</h2>
      </div>
    );
  }

  return (
    <div className='h-screen flex flex-col gap-5 bg-[#AA0000] pt-[100px] bg-[radial-gradient(circle,_rgba(170,0,0,1)_0%,_rgba(31,28,24,1)_60%,_rgba(0,0,0,1)_100%)] pb-5'>
      <ProfHead user={user} />
      <div className='container p-9 mx-auto bg-black/30 rounded-[0px_0px_50px_50px] border-2 border-white h-full flex items-center justify-center' style={{ borderStyle: "inset" }}>
        <Outlet />
      </div>
    </div>
  )
}

export default ProfilePage