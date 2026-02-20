import Link from "next/link";
import ErrorMessage from "@/app/components/errors/ErrorMesage";

export default function NoAccessPage() {
    return(
        <ErrorMessage 
            title="Ingen adgang" 
            message="For at få adgang til dette indhold skal du logge ind" 
            href="/login" 
            linkText="Gå til login side" 
        />
    )
}
