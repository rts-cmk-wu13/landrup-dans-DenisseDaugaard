import LogoutAction from "./action";
import { cookies } from "next/headers";


export default async function LogoutButton() {

    const cookieStore = await cookies();
    const isLoggedInd = cookieStore.has("token");

    return(
        <form className="flex justify-center mt-6" action={LogoutAction}>
           {isLoggedInd ?(<button className="bg-red-500 rounded p-2 m-4" type="submit">Logout</button>) : null}
        </form>
    )
}