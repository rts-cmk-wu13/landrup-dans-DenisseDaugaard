import TopLogo from "@/app/components/login/TopLogo"
import CreateUserForm from "./CreateUserForm"

export default function createUser() {
     return(
      <article className="">
        <TopLogo />
        <section className="p-6">
          <h1 className="main_title">Opret bruger</h1>
           <CreateUserForm />
        </section>

      </article>
 
    )
}