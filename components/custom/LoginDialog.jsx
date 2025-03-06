'use client'
import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup'
import { Button } from '../ui/button'
import { useGoogleLogin } from '@react-oauth/google'
import { UserDetailsContext } from '@/context/UserDetailsContext'
import axios from 'axios'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import uuid4 from 'uuid4'

const LoginDialog = ({ openDialog, setOpenDialog }) => {
    const { setUserDetails } = useContext(UserDetailsContext);
    const CreateUser = useMutation(api.users.CreateUser) 

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                console.log("Google Token:", tokenResponse);
                
                const { data } = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
                );

                console.log("User Info:", data);

                const user = {
                    name: data?.name,
                    email: data?.email,
                    picture: data?.picture,
                    uid: uuid4(),
                }
                
                await CreateUser({
                    name: user?.name,
                    email: user?.email,
                    picture: user?.picture,
                    uid: user?.uid,
                  });

                if(typeof window !== undefined){
                    localStorage.setItem('user', JSON.stringify(user))
                }
                setUserDetails(data);
                setOpenDialog(false); // Close the dialog after login success
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        },
        onError: (errorResponse) => console.error("Google Login Error:", errorResponse),
    });

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription>
                        <div className='items-center gap-3 flex flex-col'>
                            <h2 className='font-bold text-center text-2xl text-white'>{Lookup.SIGNIN_HEADING}</h2>
                            <p className='mt-2 text-center'>{Lookup.SIGNIN_SUBHEADING}</p>
                            <Button onClick={() => googleLogin()} className='bg-blue-500 text-white mt-3 hover:bg-blue-400'>
                                Sign in with Google
                            </Button>
                            <p>{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default LoginDialog;
