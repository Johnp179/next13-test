"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  function handleClick() {
    router.refresh();
  }
  return (
    <div>
      <h1>Test1</h1>
      <button onClick={handleClick}> Refresh</button>
    </div>
  );
}
