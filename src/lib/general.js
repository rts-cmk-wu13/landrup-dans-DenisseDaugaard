

export async function postJSON(url, body) {
  try {
    const res = await fetch(url, {
      method: "POST",
      // this says that the body of the request is in JSON format, and the server should expect JSON data.
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const contentType = res.headers.get("content-type") || "";
    let data = null;
    let text = null;

    //this checks if the response from the server is in JSON format
    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      text = await res.text();
    }

    return { ok: res.ok, status: res.status, data, text: text};
  } catch (error) {
    // this catch block will handle network errors or other unexpected issues during the fetch operation.
    return {
      ok: false,
      data: null, 
      message: "Der skete en fejl ved indlæsning af data" };
  }
}




export async function getJSON(url) {
  try{
    const res = await fetch(url, { cache: "no-store" });
    const contentType = res.headers.get("content-type") || "";
    let data = null;
    
    if (!res.ok) {
      throw new Error("Det var ikke muligt at hente data testimonials");
    }

    if (contentType.includes("application/json")) {
      data = await res.json();
    } else {
      data = await res.text();
    } 


    return { ok: res.ok, status: res.status, data };
  } catch (error) {
    console.log("☠️ Error fetching posts:", error.message);
    
    return {
      ok: false,
      data: null, 
      text: String(error)};
  }
}