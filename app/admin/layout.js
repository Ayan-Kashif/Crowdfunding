import Navbar from './Navbar'

export default function HMDashboardLayout({ children }) {
    return (
      <>
        
        <body>
            <div className="font-roboto-condensed">
            <Navbar/>
            {children} {/* Render the page content here */}
            </div>
  
        </body>
        </>
   
    );
  }