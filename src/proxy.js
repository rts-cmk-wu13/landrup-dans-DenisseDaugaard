import { NextResponse } from "next/server";

export function proxy(request) {
    console.log('proxy' , request);
    // request is an object that contains info about the incoming request
    // we can access cookies from the request
    // no need to import cookies from "next/headers" here

    if(!request.cookies.has("token")){
        return NextResponse.redirect(new URL("/no-access", request.url));
    }
}

    export const config = {
    matcher:["/landrupdans/:path*"],
    };