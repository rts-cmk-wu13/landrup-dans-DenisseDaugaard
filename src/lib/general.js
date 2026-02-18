export async function postJSON(url, body) {
  
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const contentType = res.headers.get("content-type") || "";
  let data = null;
  let text = null;

  if (contentType.includes("application/json")) {
    // safe JSON parse
    data = await res.json();
  } else {
    // backend returned text/html/plain text (e.g. Internal Server Error)
    text = await res.text();
  }

  return {
    ok: res.ok,
    status: res.status,
    data,
    text,
  };
}