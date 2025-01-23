"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "./_components/Header";
import { UserDetailContext } from "./_context/UserDetailContext";

function Provider({ children }) {
    const { user } = useUser();
    const [userDetail, setUserDetail] = useState();

    useEffect(() => {
        user && CheckUserAuth();
    }, [user]);

    //User Data
    const CheckUserAuth = async () => {
        try {
            const userName = user?.fullName;
            const userEmail = user?.primaryEmailAddress?.emailAddress;
            if (!userEmail) throw new Error("User email is undefined");

            const result = await axios.post("/api/users", {
                userName,
                userEmail,
            });
            console.log(result.data);
            setUserDetail(result.data);
        } catch (e) {}
    };

    return (
        <div>
            <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                <Header />
                <div className="px-10 lg:px-32 xl:px-48 p-4">{children}</div>
            </UserDetailContext.Provider>
        </div>
    );
}

export default Provider;
