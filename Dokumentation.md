# Landrup Dans  
Denisse Daugaard – WU13  

## Introduktion  

Landrup Dans er en moderne webapplikation udviklet til håndtering af dansehold, medlemmer og instruktører.  
Systemet gør det muligt for brugere at oprette sig, logge ind og tilmelde sig hold, mens instruktører kan oprette og administrere deres egne hold samt se deltagerlister.  

Applikationen er udviklet med fokus på brugervenlighed, performance og en struktureret kodebase.

---

## Tech Stack  

Projektet er udviklet med følgende teknologier:

- **Next.js**  
  Et React-baseret JavaScript framework, der er komponentbaseret og benytter file-based routing.  
  Next.js understøtter både client-side og server-side rendering samt API routes, hvilket gør det velegnet til fullstack-applikationer.

- **React**  
  Bruges til at opbygge genanvendelige UI-komponenter og håndtere applikationens state.

- **Tailwind CSS**  
  Et utility-first CSS framework, der gør det hurtigt og effektivt at style applikationen direkte i komponenterne.

- **Zod**  
  Et schema validation library, der bruges til validering af formularer og sikrer korrekt og typesikker datahåndtering.

- **REST API**  
  Applikationen kommunikerer med et eksternt API via flere requests til håndtering af brugere, hold og tilmeldinger.

---

## Hvorfor har vi valgt Next.js?

Vi har valgt Next.js af følgende grunde:

- **Indbygget API-håndtering**  
  Gør det nemt at arbejde med serverlogik og API-kald i samme projekt.

- **File-based routing**  
  Giver en overskuelig og struktureret måde at håndtere routing på.

- **Performance**  
  Mulighed for server-side rendering og optimering.

- **Skalerbarhed**  
  Velegnet til både små og større applikationer.

---

## Brugerroller

Systemet understøtter to typer brugere:

- **Medlem**
  - Kan oprette bruger
  - Kan logge ind
  - Kan tilmelde sig hold
  - Kan se egne tilmeldinger

- **Instruktør**
  - Kan logge ind
  - Kan oprette hold
  - Kan redigere og slette hold
  - Kan se deltagerliste

---


## CODE example !

```js
export async function getAllEvents(){

    const cookieStore = await cookies();
    //guard clause
    if(!cookieStore.has("authToken"))return redirect("/no-access");

    const response = await fetch('http://localhost:4000/events');
    const data = await response.json();
    return data;

}
```


### Here comes a description of the code 
THIS IS VERY IMPORTANT!!!! 

-what is this ?  this is server action finction

-what is the goal ?   get data from a web-api and return the data

-what happens here ?  we check if the is a token in thre coockies and granted access if such token exist.

**AFTER THIS WE ***HAVE TO GO INTO***  DETAILS ABOUT A SIGULAR ELEMENT OF THE CODE ABOVE**
add  link like this fx. [htt.js](./src/lib/http.js)

***to be able to get a 12 we also havetot be able to compare this app with other technologies or another framewoks that we have worked with . Along with the ability to escale the app in the future!!!!***

-the structure of the code
-the possibility of reuse the code 
-functions and components names
-plataforms 

# REMEMBER TO HAVE A PLAN OF HOW TO PRESEENT OUR ORAL EXAM !!
