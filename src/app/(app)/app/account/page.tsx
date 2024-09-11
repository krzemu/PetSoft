import Branding from "@/components/branding";
import ContentBlock from "@/components/content-block";
import H1 from "@/components/h1";
import React from "react";

export default function Page() {
  return (
    <main>
      <div className="flex justify-between items-center text-white py-8">
        <H1 className="mb-7">Account</H1>
      </div>
      <ContentBlock className="min-h-[600px] flex justify-center items-center">
        Logged in as ...
      </ContentBlock>
    </main>
  );
}
