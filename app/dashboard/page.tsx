"use client";


import Overview from "@/components/dashboard/overview";


export default function DashboardPage() {
  

    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900">
              {/* //  <DashboardHeader /> */}
                
             <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-8">
                    
                    <Overview />
                </div>

            
        </div>
    );
}