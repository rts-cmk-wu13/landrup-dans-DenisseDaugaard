import { getCookiesValues } from "@/lib/dal/users/cookieStore";

export async function updateActivityReq(url, body) {
  const { token } = await getCookiesValues();

  try {
    const formData = new FormData();

    // append all body fields
    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await fetch(url, {
      method: "PATCH",
      headers: { // Do not set Content-Type header when sending FormData, the browser will set it with the correct boundary
        Authorization: `Bearer ${token}` // Include the token in the Authorization header
      },
      body: formData
    });

    const contentType = res.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");

    const data = isJson ? await res.json().catch(() => null) : null;
    const text = !isJson ? await res.text().catch(() => null) : null;

    if (!res.ok) {
      const message =
        (data && (data.message || data.error)) ||
        text ||
        "Noget gik galt ved opdateringen af data";

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