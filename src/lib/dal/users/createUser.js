export async function CreateUserRequest(url, body) {
  try {
    const res = await fetch(url, {

      method: "POST",
      // this says that the body of the request is in JSON format, and the server should expect JSON data.
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      //this converts the body object into a URL-encoded string format, which is suitable for form submissions.
      body: new URLSearchParams(body).toString(),
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    const data = isJson ? await res.json().catch(() => null) : null;
    const text = !isJson ? await res.text().catch(() => null) : null;

    if (!res.ok) {
      const message = (data && (data.message || data.error)) ||text || "Noget gik galt ved oprettelsen af data";
      return { ok: false, status: res.status, data, text: message };
    }

    return { ok: true, status: res.status, data, text };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      data: null,
      text: "Netværksfejl: kunne ikke oprette forbindelse til serveren",
    };
  }
}