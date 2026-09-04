import React from 'react';
import { Gem, Users, Star, ShieldCheck } from 'lucide-react';
import { CountUp } from './CountUp';

export const BottomTrustBar: React.FC = () => {
  const items = [
    {
      icon: <Gem size={22} strokeWidth={1.5} />,
      titleNode: (
        <>
          <CountUp end={22} suffix="+" duration={2} /> YEARS
        </>
      ),
      desc: 'Of Trust & Excellence',
    },
    {
      icon: <Users size={22} strokeWidth={1.5} />,
      titleNode: (
        <>
          <CountUp end={10000} suffix="+" separator="," duration={2.2} /> FAMILIES
        </>
      ),
      desc: 'Who Trust Us Every Day',
    },
    {
      icon: <Star size={22} strokeWidth={1.5} />,
      titleNode: (
        <>
          <CountUp end={4.9} decimals={1} duration={2} />/5 CUSTOMER RATING
        </>
      ),
      desc: (
        <>
          From <CountUp end={1500} suffix="+" duration={2} /> Happy Customers
        </>
      ),
    },
    {
      icon: <ShieldCheck size={22} strokeWidth={1.5} />,
      titleNode: <>100% AUTHENTIC</>,
      desc: 'Hallmarked & Certified',
    },
  ];

  return (
    <section
      className="w-full relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #DCC19A 0%, #D8BE99 50%, #C9AA82 100%)',
        borderBottom: '1px solid rgba(191, 160, 120, 0.4)',
        padding: '52px 0',
      }}
    >
      <div
        style={{
          width: 'min(100% - 32px, 1440px)',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            alignItems: 'center',
          }}
          className="bottom-trust-grid"
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3.5 justify-start"
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFFFF',
                  color: '#C0846A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #EDE4DC',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(30, 22, 16, 0.04)',
                }}
              >
                {item.icon}
              </div>
              <div className="flex flex-col">
                <h4
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#1E1610',
                    marginBottom: '2px',
                    lineHeight: 1.2,
                  }}
                >
                  {item.titleNode}
                </h4>
                <p
                  style={{
                    fontFamily: 'Jost, sans-serif',
                    fontSize: '12.5px',
                    fontWeight: 400,
                    color: '#5C4A3E',
                    lineHeight: 1.3,
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .bottom-trust-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
        }
        @media (max-width: 640px) {
          .bottom-trust-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  );
};
