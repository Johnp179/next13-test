"use client";

import type { Account } from "@prisma/client";
import { useState } from "react";
import { deleteRequest, updateRequest } from "@/lib/api-requests";
import { useRouter } from "next/navigation";

function EditButtons({ id }: { id: string }) {
  const [errorMsg, setError] = useState<string | null>(null);
  const router = useRouter();

  async function remove() {
    try {
      await deleteRequest(`/api/account/${id}`);
      router.refresh();
    } catch (error) {
      setError((error as Error).message);
    }
  }

  if (errorMsg) {
    throw new Error(errorMsg);
  }

  return (
    <div>
      <button onClick={remove}>Delete</button>
    </div>
  );
}

export default function Vault({ accounts }: { accounts: Account[] }) {
  return (
    <div>
      <h1 className="uppercase text-3xl font-bold">List of Accounts</h1>
      <section>
        {accounts.map(({ id, name, password }) => (
          <div className="flex justify-between" key={id}>
            <div>
              <span className="font-bold text-xl ">Account Name:{name}</span>
              <span>Account Password:{password}</span>
            </div>
            <EditButtons id={id} />
          </div>
        ))}
      </section>
    </div>
  );
}
