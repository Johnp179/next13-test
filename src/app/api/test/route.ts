import { NextResponse } from "next/server";

let connection = false;
//123

export function GET() {
  console.log(connection);
  if (!connection) {
    connection = true;
  }
  return NextResponse.json("heya");
}

// export function POST() {
//   total += 10;
//   return NextResponse.json("incremented");
// }
