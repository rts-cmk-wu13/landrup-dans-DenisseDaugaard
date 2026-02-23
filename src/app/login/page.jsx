
import Link from "next/link"
import TopLogo from "@/app/components/login/TopLogo"
import LoginForm from "@/app/login/LoginForm"

export default  async function Login() {
 
    return(
      <article className="">
        <TopLogo />
        <section className="p-6">
          <h1 className="main_title">Log ind</h1>

            <LoginForm />

          <span className="mt-8 block">Er du endnu ikke bruger ? <Link className="underline" href="login/create-user"> Opret dig her.</Link></span>
        </section>

      </article>
 
    )
}