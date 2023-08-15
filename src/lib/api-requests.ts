export async function getRequest(url: string) {
  const resp = await fetch(url);
  if (!resp.ok) {
    throw new Error(`Server responded with ${resp.status} code`);
  }
  return resp.json();
}

export async function deleteRequest(url: string) {
  const resp = await fetch(url, { method: "DELETE" });
  if (!resp.ok) {
    throw new Error(`Server responded with ${resp.status} code`);
  }
  return resp.json();
}

export async function updateRequest(
  url: string,
  updatedData: Record<string, any>
) {
  const resp = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  });
  if (!resp.ok) {
    throw new Error(`Server responded with ${resp.status} code`);
  }
  return resp.json();
}

export async function postRequest(url: string, postData: Record<string, any>) {
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  });
  const { status } = resp;

  if (status === 404 || status === 405) {
    throw new Error(`Server responded with ${resp.status} code`);
  }
  const data = await resp.json();
  if (status === 500) {
    throw new Error(data);
  }

  return {
    status,
    data,
  };
}
