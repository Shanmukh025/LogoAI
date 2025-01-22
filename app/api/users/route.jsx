import { db } from "@/configs/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userEmail, userName } = await req.json();
        if (!userEmail || !userName) throw new Error("Invalid request data");

        const docRef = doc(db, "users", userEmail);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return NextResponse.json(docSnap.data());
        } else {
            const data = { name: userName, email: userEmail, credits: 5 };
            await setDoc(docRef, data);
            return NextResponse.json(data);
        }
    } catch (error) {
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
