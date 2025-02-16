
'use client'
export default function MultiWave() {
    return (
      <div className="relative w-full h-[300px] bg-gradient-to-r from-[#635bff] to-[#1b1bff] overflow-hidden">
        {/* First Wave */}
        <svg
          className="absolute bottom-0 left-0 w-[200%] h-[100px] animate-wavy opacity-50"
          viewBox="0 0 1440 320"
        >
          <path
            fill="white"
            fillOpacity="1"
            d="M0,160L48,144C96,128,192,96,288,112C384,128,480,192,576,213.3C672,235,768,213,864,186.7C960,160,1056,128,1152,144C1248,160,1344,224,1392,256L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
  
        {/* Second Wave (Different Speed) */}
        <svg
          className="absolute bottom-0 left-0 w-[200%] h-[100px] animate-wavy2 opacity-25"
          viewBox="0 0 1440 320"
        >
          <path
            fill="white"
            fillOpacity="1"
            d="M0,160L48,144C96,128,192,96,288,112C384,128,480,192,576,213.3C672,235,768,213,864,186.7C960,160,1056,128,1152,144C1248,160,1344,224,1392,256L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
  
        <style jsx>{`
          @keyframes wavy {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
            100% {
              transform: translateY(0);
            }
          }
  
          @keyframes wavy2 {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-30px);
            }
            100% {
              transform: translateY(0);
            }
          }
  
          .animate-wavy {
            animation: wavy 3s infinite ease-in-out;
          }
  
          .animate-wavy2 {
            animation: wavy2 4s infinite ease-in-out;
          }
        `}</style>
      </div>
    );
  }
  