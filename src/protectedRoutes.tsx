'use client'
import { Circles } from 'react-loader-spinner'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { checkAuth } from './utils/auth';
import { useTheme } from 'next-themes';

const ProtectedRoute = ({ children }: { children: any }) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme("dark");

    }, [setTheme]);

    useEffect(() => {
        const verifyAuth = async () => {
            const isAuthenticated = await checkAuth();
            if (!isAuthenticated) {
                router.push('/onboarding');
                setTimeout(() => setLoading(false), 1000)
            } else {
                router.push('/')
                setLoading(false);
            }
        };
        verifyAuth()
    }, []);

    if (loading) {
        return <div className='flex justify-center items-center min-h-screen w-full'>
            <Circles
                height="80"
                width="80"
                color="#1d1c68"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            /></div>
            ;
    }

    return children;
};

export default ProtectedRoute;